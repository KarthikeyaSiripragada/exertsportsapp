'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Github, Google } from 'lucide-react'

export default function RegisterPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('athlete')
  const [error, setError] = useState('')

  // if already logged in, go to dashboard
  if (session) {
    router.push('/dashboard')
    return null
  }

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    // TODO: call your register API here
    // For demo, just auto-login via NextAuth
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    if (res?.error) {
      setError('Registration failed')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Create an account
        </h1>

        {/* OAuth Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => signIn('github')}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
          >
            <Github size={18}/> GitHub
          </button>
          <button
            onClick={() => signIn('google')}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
          >
            <Google size={18}/> Google
          </button>
        </div>

        <div className="flex items-center text-gray-400 text-sm">
          <span className="flex-grow border-b border-gray-600"></span>
          <span className="px-3">OR CONTINUE WITH</span>
          <span className="flex-grow border-b border-gray-600"></span>
        </div>

        {/* Registration Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">I am a</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            >
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded"
          >
            Create account
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm">
          Already have one?{' '}
          <a href="/login" className="text-green-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
