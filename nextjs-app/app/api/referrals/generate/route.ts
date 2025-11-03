/**
 * Generate Referral Code API
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles referral code generation
 * - Dependency Inversion: Uses ReferralService
 *
 * POST /api/referrals/generate
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ReferralService } from '@/lib/services/referral.service'
import { ReferralRepository } from '@/lib/repositories/referral.repository'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create service with dependency injection
    const referralRepo = new ReferralRepository(supabase)
    const referralService = new ReferralService(referralRepo)

    // Generate referral code
    const referralCode = await referralService.generateReferralCode(user.id)

    return NextResponse.json({
      success: true,
      referralCode,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${referralCode}`,
    })
  } catch (error: any) {
    console.error('Referral generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate referral code' },
      { status: 500 }
    )
  }
}

/**
 * Get user's referral stats
 * GET /api/referrals/generate
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create service
    const referralRepo = new ReferralRepository(supabase)
    const referralService = new ReferralService(referralRepo)

    // Get stats
    const stats = await referralService.getReferralStats(user.id)
    const referrals = await referralService.getUserReferrals(user.id)

    // Get user's referral code
    const { data: userProfile } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      success: true,
      stats,
      referrals,
      referralCode: userProfile?.referral_code,
      shareUrl: userProfile?.referral_code
        ? `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${userProfile.referral_code}`
        : null,
    })
  } catch (error: any) {
    console.error('Referral stats error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}
