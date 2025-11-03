'use client'

import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthButton({ user }: { user: User | null }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className="px-4 py-2 hover:text-orange-500">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">{user.email}</span>
      <button
        onClick={handleLogout}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    </div>
  )
}
