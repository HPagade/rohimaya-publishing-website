import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadToS3, generateS3Key } from '@/lib/aws'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs'

/**
 * P3: Audiobook Generation API - Proxy to Python Compute Environment
 * This route accepts manuscript uploads, stores them in S3, and triggers
 * external Python script execution for audiobook generation
 */
export async function POST(req: NextRequest) {
  try {
    // P0: Authentication check
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Check subscription tier and usage limits
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    })

    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    const usage = await prisma.usageStats.findUnique({
      where: { userId_month: { userId, month: currentMonth } },
    })

    // Usage limits by tier
    const limits = {
      SPARK: 0, // No audiobooks on free tier
      BLAZE: 1,
      INFERNO: 999,
    }

    const limit = limits[subscription?.tier as keyof typeof limits] || 0
    const used = usage?.audiobooksUsed || 0

    if (used >= limit) {
      return NextResponse.json(
        { error: 'Audiobook generation limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Parse multipart form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const voiceId = formData.get('voiceId') as string || 'default'

    if (!file || !title) {
      return NextResponse.json(
        { error: 'File and title are required' },
        { status: 400 }
      )
    }

    // Upload manuscript to S3 (privacy: user-isolated path)
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const s3Key = generateS3Key(userId, 'audiobook-source', file.name)
    
    await uploadToS3(s3Key, fileBuffer, file.type, userId)

    // Store manuscript record in database
    const manuscript = await prisma.manuscript.create({
      data: {
        userId,
        title,
        content: '', // Full content in S3
        s3Key,
        wordCount: fileBuffer.toString().split(/\s+/).length,
      },
    })

    // Trigger external Python compute environment
    const pythonComputeUrl = process.env.PYTHON_COMPUTE_URL
    if (!pythonComputeUrl) {
      throw new Error('PYTHON_COMPUTE_URL not configured')
    }

    const response = await fetch(pythonComputeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PYTHON_COMPUTE_SECRET}`,
      },
      body: JSON.stringify({
        userId,
        manuscriptId: manuscript.id,
        s3Key,
        title,
        voiceId,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/audio/callback`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to trigger audiobook generation')
    }

    const result = await response.json()

    // Update usage stats
    await prisma.usageStats.upsert({
      where: { userId_month: { userId, month: currentMonth } },
      update: { audiobooksUsed: { increment: 1 } },
      create: {
        userId,
        month: currentMonth,
        audiobooksUsed: 1,
      },
    })

    return NextResponse.json({
      jobId: result.jobId,
      status: 'processing',
      message: 'Audiobook generation started. You will be notified when complete.',
    })
  } catch (error) {
    console.error('Audiobook generation error:', error)
    return NextResponse.json(
      { error: 'Failed to start audiobook generation' },
      { status: 500 }
    )
  }
}
