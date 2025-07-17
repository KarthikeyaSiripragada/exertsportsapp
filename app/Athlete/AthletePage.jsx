// app/athlete/page.jsx
'use client'
import { useAuth } from '@/components/Providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AthletePage() {
  const { session } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!session || session.user.user_metadata.role !== 'athlete') {
      router.push('/')
    }
  }, [session, router])
  if (!session) return nulla
  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">🏃 Athlete Dashboard</h2>
      {/* … your athlete UI … */}
    </div>
  )
}

// app/coach/page.jsx
'use client'
import { useAuth } from '@/components/Providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CoachPage() {
  const { session } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!session || session.user.user_metadata.role !== 'coach') {
      router.push('/')
    }
  }, [session, router])
  if (!session) return null
  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">🏋️ Coach Dashboard</h2>
      {/* … your coach UI … */}
    </div>
  )
}
