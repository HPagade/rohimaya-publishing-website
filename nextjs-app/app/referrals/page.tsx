/**
 * Referral Dashboard Page
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles referral UI display
 * - Separation of Concerns: API calls separated from presentation
 */

'use client'

import { useState, useEffect } from 'react'
import { Users, Gift, TrendingUp, Copy, Check, Share2 } from 'lucide-react'
import Link from 'next/link'

interface ReferralStats {
  total_referrals: number
  completed_referrals: number
  pending_referrals: number
  total_rewards_earned: number
  conversion_rate: number
}

interface Referral {
  id: string
  status: string
  created_at: string
  completed_at?: string | null
  reward_given: boolean
}

export default function ReferralsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchReferralData()
  }, [])

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referrals/generate')
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
        setReferrals(data.referrals || [])
        setReferralCode(data.referralCode)
        setShareUrl(data.shareUrl)
      }
    } catch (error) {
      console.error('Failed to fetch referral data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateReferralCode = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/referrals/generate', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.success) {
        setReferralCode(data.referralCode)
        setShareUrl(data.shareUrl)
        await fetchReferralData() // Refresh stats
      }
    } catch (error) {
      console.error('Failed to generate referral code:', error)
      alert('Failed to generate referral code. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOnSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    if (!shareUrl) return

    const text = 'Check out PhoenixForge - the AI-powered publishing platform for authors!'
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(text)

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }

    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-orange-600 hover:text-orange-500 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
          <p className="mt-2 text-gray-600">
            Earn 1 month free for every friend who signs up for a paid plan!
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_referrals}</p>
                </div>
                <Users className="h-12 w-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed_referrals}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending_referrals}</p>
                </div>
                <Users className="h-12 w-12 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rewards Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_rewards_earned}</p>
                </div>
                <Gift className="h-12 w-12 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Referral Link</h2>

          {!referralCode ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't generated a referral code yet.</p>
              <button
                onClick={generateReferralCode}
                disabled={generating}
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-500 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate Referral Code'}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Referral Link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl || ''}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Referral Code
                </label>
                <div className="inline-block px-4 py-2 bg-orange-50 text-orange-700 rounded-md font-mono text-lg font-semibold">
                  {referralCode}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Share on Social Media
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => shareOnSocial('twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Share2 className="h-4 w-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => shareOnSocial('facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  >
                    <Share2 className="h-4 w-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Share2 className="h-4 w-4" />
                    LinkedIn
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Your Link</h3>
              <p className="text-sm text-gray-600">
                Share your unique referral link with friends, family, or on social media
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">They Sign Up</h3>
              <p className="text-sm text-gray-600">
                When someone signs up using your link and subscribes to a paid plan
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">You Get Rewarded</h3>
              <p className="text-sm text-gray-600">
                You receive 1 month free of your current plan (they get 20% off for 3 months!)
              </p>
            </div>
          </div>
        </div>

        {/* Referral History */}
        {referrals.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Referral History</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          referral.status === 'completed' || referral.status === 'rewarded'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.reward_given ? (
                        <span className="text-green-600 font-semibold">✓ Rewarded</span>
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
