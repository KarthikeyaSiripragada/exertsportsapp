// app/athlete/dashboard/page.jsx
'use client'

import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export default function AthleteDashboard() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  // Redirect to login only if session explicitly null (not just loading)
  React.useEffect(() => {
    if (session === null) {
      router.replace('/login')
    }
  }, [session, router])

  // Show a loading state while the session is being determined
  if (session === undefined) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🏃 Athlete Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
      {/* TODO: your athlete‐specific UI here */}
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
      >
        Sign Out
      </button>
    </div>
  )
}
