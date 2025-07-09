// app/login/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter }             from 'next/navigation'
import {
  useSupabaseClient,
  useSession
} from '@supabase/auth-helpers-react'

export default function LoginPage() {
  const session  = useSession()
  const supabase = useSupabaseClient()
  const router   = useRouter()
  const [email, setEmail]     = useState('')
  const [pass,  setPass]      = useState('')
  const [err,   setErr]       = useState(null)

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session])

  const onSubmit = async e => {
    e.preventDefault()
    setErr(null)
    const { error } = await supabase.auth.signInWithPassword({
      email, password: pass
    })
    if (error) setErr(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-white text-2xl text-center">
          Log in to your account
        </h1>
        {err && <p className="text-red-400">{err}</p>}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />

        <button className="w-full bg-green-500 py-2 rounded text-white">
          Log in
        </button>

        <p className="text-gray-400 text-center text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-green-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  )
}
