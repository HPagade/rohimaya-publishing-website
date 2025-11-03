/**
 * Track Referral API
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles referral tracking
 * - Dependency Inversion: Uses ReferralService
 *
 * POST /api/referrals/track
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ReferralService } from '@/lib/services/referral.service'
import { ReferralRepository } from '@/lib/repositories/referral.repository'
import { ValidationError } from '@/lib/core/types'

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

    const { referralCode } = await request.json()

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code required' }, { status: 400 })
    }

    // Create service
    const referralRepo = new ReferralRepository(supabase)
    const referralService = new ReferralService(referralRepo)

    try {
      // Track the referral
      await referralService.trackReferral(referralCode, user.id)

      return NextResponse.json({
        success: true,
        message: 'Referral tracked successfully',
      })
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      throw error
    }
  } catch (error: any) {
    console.error('Referral tracking error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to track referral' },
      { status: 500 }
    )
  }
}
