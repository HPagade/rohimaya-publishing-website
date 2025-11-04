import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

/**
 * P2: Stripe Webhook Proxy - Securely forward to n8n workflow
 * This acts as a security layer, verifying Stripe signatures before
 * forwarding validated events to the temporary n8n webhook
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      )
    }

    // Verify Stripe webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Forward verified event to n8n webhook
    const n8nWebhookUrl = process.env.N8N_STRIPE_WEBHOOK_URL
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: event.type,
            data: event.data,
            created: event.created,
          }),
        })
      } catch (error) {
        console.error('Failed to forward to n8n:', error)
        // Continue processing even if n8n forward fails
      }
    }

    // Return success immediately to Stripe
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook proxy error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
