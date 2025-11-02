import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

/**
 * Get Supabase client with service role key (lazy initialization)
 */
function getSupabaseAdmin(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Get Stripe client (lazy initialization)
 */
function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })
}

/**
 * Stripe Webhook Handler
 * POST /api/stripe/webhook
 *
 * Handles subscription lifecycle events:
 * - checkout.session.completed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.payment_succeeded
 * - invoice.payment_failed
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!
  const stripe = getStripe()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session, stripe, supabase)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription, supabase)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription, supabase)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice, stripe, supabase)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice, supabase)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

/**
 * Handle successful checkout
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session, stripe: Stripe, supabase: SupabaseClient) {
  const userId = session.metadata?.user_id
  if (!userId) return

  const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: session.customer as string,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  })
}

/**
 * Handle subscription creation or update
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription, supabase: SupabaseClient) {
  const customerId = subscription.customer as string

  // Find user by customer ID
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  await supabase.from('subscriptions').upsert({
    user_id: user.id,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  })
}

/**
 * Handle subscription deletion/cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription, supabase: SupabaseClient) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice, stripe: Stripe, supabase: SupabaseClient) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId)
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice, supabase: SupabaseClient) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) return

  await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
    })
    .eq('stripe_subscription_id', subscriptionId)
}
