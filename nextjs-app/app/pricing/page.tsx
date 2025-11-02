'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    price: 0,
    priceId: null,
    description: 'Try PhoenixForge with essential features',
    features: [
      '3 formats per month',
      '1 audiobook chapter',
      'Basic support',
      'Standard quality',
    ],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Creator',
    price: 29,
    priceId: 'price_creator_monthly', // Replace with actual Stripe Price ID
    description: 'Perfect for individual authors',
    features: [
      '50 formats per month',
      '10 audiobook chapters',
      '5 AI covers',
      '10 AI images',
      'Priority support',
      'HD quality',
      'Commercial license',
    ],
    cta: 'Start Creating',
    featured: true,
  },
  {
    name: 'Professional',
    price: 79,
    priceId: 'price_professional_monthly', // Replace with actual Stripe Price ID
    description: 'For serious publishers',
    features: [
      'Unlimited formats',
      'Unlimited audiobooks',
      '20 AI covers',
      '50 AI images',
      '10 cookbook formats',
      '20 health content pieces',
      '30 marketing assets',
      'Premium support',
      'Ultra HD quality',
      'Extended commercial license',
      'API access',
    ],
    cta: 'Go Professional',
    featured: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    if (!priceId) {
      // Free tier - just redirect to signup
      window.location.href = '/signup'
      return
    }

    setLoading(tierName)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          billingInterval,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const getPrice = (basePrice: number) => {
    if (billingInterval === 'yearly') {
      // 20% discount for yearly
      return Math.floor(basePrice * 12 * 0.8)
    }
    return basePrice
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the perfect plan for you
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Start free, upgrade as you grow. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <span className={billingInterval === 'monthly' ? 'font-semibold' : 'text-gray-500'}>
            Monthly
          </span>
          <button
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-600"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={billingInterval === 'yearly' ? 'font-semibold' : 'text-gray-500'}>
            Yearly
          </span>
          {billingInterval === 'yearly' && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              <Zap size={14} />
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.featured
                  ? 'ring-2 ring-orange-600 shadow-2xl scale-105'
                  : 'ring-1 ring-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                {tier.featured && (
                  <p className="rounded-full bg-orange-600 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    Most Popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  ${tier.price === 0 ? 0 : getPrice(tier.price)}
                </span>
                {tier.price > 0 && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /{billingInterval === 'yearly' ? 'year' : 'month'}
                  </span>
                )}
              </p>
              <button
                onClick={() => handleSubscribe(tier.priceId, tier.name)}
                disabled={loading !== null}
                className={`mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-orange-600'
                    : 'bg-white text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === tier.name ? 'Loading...' : tier.cta}
              </button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-orange-600" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change plans later?</h4>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or cancel anytime. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and other payment methods via Stripe.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600">
                Yes! Our Free tier gives you access to core features forever. No credit card required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What happens if I exceed my limits?</h4>
              <p className="text-gray-600">
                You'll be notified when you're approaching your limit. You can upgrade anytime to continue using the service.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <Link href="/contact" className="text-orange-600 hover:text-orange-500 font-semibold">
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
