import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Headphones, Image, BookOpen, Heart, TrendingUp, Crown } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  // Fetch user subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  // Fetch current month usage
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
  const { data: usage } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', user.id)
    .eq('month', currentMonth)
    .single()

  // Fetch recent jobs
  const { data: recentJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Determine plan and limits
  const plan = subscription ? getPlanFromPriceId(subscription.price_id) : 'free'
  const limits = getPlanLimits(plan)

  const apps = [
    {
      name: 'AI Formatter',
      description: 'Format manuscripts to industry standards',
      href: '/formatter',
      icon: FileText,
      color: 'bg-blue-500',
      usage: usage?.formats_used || 0,
      limit: limits.formats,
      phase: 1,
    },
    {
      name: 'Audiobook Generator',
      description: 'Convert text to professional audiobooks',
      href: '/audiobook',
      icon: Headphones,
      color: 'bg-purple-500',
      usage: usage?.audiobooks_used || 0,
      limit: limits.audiobooks,
      phase: 1,
    },
    {
      name: 'AI Covers',
      description: 'Generate stunning book covers',
      href: '/covers',
      icon: Image,
      color: 'bg-pink-500',
      usage: usage?.covers_used || 0,
      limit: limits.covers,
      phase: 2,
      comingSoon: true,
    },
    {
      name: 'AI Images',
      description: 'Create custom illustrations',
      href: '/images',
      icon: Image,
      color: 'bg-indigo-500',
      usage: usage?.images_used || 0,
      limit: limits.images,
      phase: 2,
      comingSoon: true,
    },
    {
      name: 'Cookbook Formatter',
      description: 'Format cookbooks with recipes',
      href: '/cookbook',
      icon: BookOpen,
      color: 'bg-green-500',
      usage: usage?.cookbooks_used || 0,
      limit: limits.cookbooks,
      phase: 3,
      comingSoon: true,
    },
    {
      name: 'Health Content',
      description: 'Generate health & wellness content',
      href: '/health',
      icon: Heart,
      color: 'bg-red-500',
      usage: usage?.health_content_used || 0,
      limit: limits.health_content,
      phase: 3,
      comingSoon: true,
    },
    {
      name: 'Marketing Suite',
      description: 'Create marketing materials',
      href: '/marketing',
      icon: TrendingUp,
      color: 'bg-orange-500',
      usage: usage?.marketing_content_used || 0,
      limit: limits.marketing_content,
      phase: 3,
      comingSoon: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
          </h1>
          <p className="mt-2 text-gray-600">
            You're on the <span className="font-semibold capitalize">{plan}</span> plan
            {!subscription && (
              <Link href="/pricing" className="ml-2 text-orange-600 hover:text-orange-500">
                Upgrade to unlock more features →
              </Link>
            )}
          </p>
        </div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Formats Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usage?.formats_used || 0}
                  <span className="text-sm text-gray-500">
                    {limits.formats === -1 ? ' / ∞' : ` / ${limits.formats}`}
                  </span>
                </p>
              </div>
              <FileText className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Audiobooks Generated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usage?.audiobooks_used || 0}
                  <span className="text-sm text-gray-500">
                    {limits.audiobooks === -1 ? ' / ∞' : ` / ${limits.audiobooks}`}
                  </span>
                </p>
              </div>
              <Headphones className="h-12 w-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{recentJobs?.length || 0}</p>
              </div>
              <Crown className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
              const Icon = app.icon
              const usagePercent = app.limit === -1 ? 0 : (app.usage / app.limit) * 100

              return (
                <Link
                  key={app.name}
                  href={app.comingSoon ? '#' : app.href}
                  className={`bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow ${
                    app.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                  onClick={(e) => app.comingSoon && e.preventDefault()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${app.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {app.comingSoon && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        Phase {app.phase}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                  {!app.comingSoon && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage this month</span>
                        <span className="font-semibold">
                          {app.usage} / {app.limit === -1 ? '∞' : app.limit}
                        </span>
                      </div>
                      {app.limit !== -1 && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${app.color} h-2 rounded-full transition-all`}
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Jobs */}
        {recentJobs && recentJobs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Jobs</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {job.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.status === 'completed' && (
                          <Link
                            href={`/${job.type}?jobId=${job.id}`}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            View
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Get plan name from Stripe Price ID
 */
function getPlanFromPriceId(priceId: string): string {
  if (priceId.includes('creator')) return 'creator'
  if (priceId.includes('professional')) return 'professional'
  return 'free'
}

/**
 * Get plan limits
 */
function getPlanLimits(plan: string) {
  const limits = {
    free: {
      formats: 3,
      audiobooks: 1,
      covers: 0,
      images: 0,
      cookbooks: 0,
      health_content: 0,
      marketing_content: 0,
    },
    creator: {
      formats: 50,
      audiobooks: 10,
      covers: 5,
      images: 10,
      cookbooks: 0,
      health_content: 0,
      marketing_content: 0,
    },
    professional: {
      formats: -1, // unlimited
      audiobooks: -1,
      covers: 20,
      images: 50,
      cookbooks: 10,
      health_content: 20,
      marketing_content: 30,
    },
  }

  return limits[plan as keyof typeof limits] || limits.free
}
