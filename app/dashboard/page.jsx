// app/dashboard/page.jsx
'use client'

import { useEffect }   from 'react'
import { useRouter }   from 'next/navigation'
import {
  useSession,
  useSupabaseClient
} from '@supabase/auth-helpers-react'

export default function DashboardPage() {
  const session  = useSession()
  const supabase = useSupabaseClient()
  const router   = useRouter()

  useEffect(() => {
    if (!session) router.push('/login')
  }, [session])

  if (!session) return null

  const role = session.user.user_metadata.role

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>
        <button
          className="px-4 py-1 bg-red-600 text-white rounded"
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
        >
          Logout
        </button>
      </div>

      {role === 'coach' ? (
        <p className="text-lg">This is your coach dashboard.</p>
      ) : (
        <p className="text-lg">This is your athlete dashboard.</p>
      )}
    </div>
  )
}
