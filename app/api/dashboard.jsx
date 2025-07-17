// app/dashboard/page.jsx
'use client'

import React, { useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export default function MainDashboard() {
  const session = useSession()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (session === null) {
      router.replace('/login')
    }
  }, [session, router])

  // Show loading while session is initializing
  if (session === undefined) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Loading...
      </div>
    )
  }

  const { user } = session
  const role = user.user_metadata?.role || 'athlete'

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🗂️ Exert Dashboard</h1>
      <p>Welcome back, {user.email}!</p>

      <div style={{ marginTop: '2rem' }}>
        {role === 'athlete' && (
          <button
            onClick={() => router.push('/athlete/dashboard')}
            className="login-btn"
          >
            Go to Athlete Dashboard
          </button>
        )}
        {role === 'coach' && (
          <button
            onClick={() => router.push('/coach/dashboard')}
            className="login-btn"
          >
            Go to Coach Dashboard
          </button>
        )}
      </div>
    </div>
  )
}
