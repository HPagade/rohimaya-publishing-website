/**
 * Create Stripe Checkout Session with Free Trial Support
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles checkout session creation
 * - Dependency Inversion: Uses SubscriptionService for business logic
 *
 * POST /api/stripe/create-checkout
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Free trial configuration
const TRIAL_DAYS = 7

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId, billingInterval = 'monthly', enableTrial = true } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 })
    }

    // Check if user has already had a trial
    const { data: existingSubscriptions } = await supabase
      .from('subscriptions')
      .select('id, trial_end')
      .eq('user_id', user.id)
      .not('trial_end', 'is', null)

    const hasHadTrial = existingSubscriptions && existingSubscriptions.length > 0

    // Only offer trial if user hasn't had one and it's enabled
    const offerTrial = enableTrial && !hasHadTrial

    // Create or get Stripe customer
    let customerId: string | undefined

    const { data: existingUser } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (existingUser?.stripe_customer_id) {
      customerId = existingUser.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to database
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Prepare subscription data
    const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {
      metadata: {
        user_id: user.id,
      },
    }

    // Add trial if eligible
    if (offerTrial) {
      subscriptionData.trial_period_days = TRIAL_DAYS
      subscriptionData.trial_settings = {
        end_behavior: {
          missing_payment_method: 'cancel',
        },
      }
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      payment_method_collection: offerTrial ? 'if_required' : 'always',
      subscription_data: subscriptionData,
      success_url: `${request.headers.get('origin')}/dashboard?success=true${offerTrial ? '&trial=true' : ''}`,
      cancel_url: `${request.headers.get('origin')}/pricing?canceled=true`,
      metadata: {
        user_id: user.id,
        has_trial: offerTrial ? 'true' : 'false',
      },
    })

    return NextResponse.json({
      url: session.url,
      hasTrial: offerTrial,
      trialDays: offerTrial ? TRIAL_DAYS : 0,
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
