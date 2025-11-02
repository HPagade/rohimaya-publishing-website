import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { createServerClient } from '@/lib/supabase/server'
import AuthButton from '@/components/AuthButton'

export const metadata: Metadata = {
  title: 'PhoenixForge - AI Book Formatter & Audiobook Generator',
  description: 'Format your manuscript and create audiobooks in minutes with AI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        <nav className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              PhoenixForge
            </a>
            <div className="flex items-center gap-4">
              <a href="/pricing" className="hover:text-orange-500">Pricing</a>
              {user && <a href="/dashboard" className="hover:text-orange-500">Dashboard</a>}
              <AuthButton user={user} />
            </div>
          </div>
        </nav>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
