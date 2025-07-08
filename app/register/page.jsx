// app/register/page.jsx
'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter }        from 'next/navigation'
import { Github }           from 'lucide-react'
import { SiGoogle }         from 'react-icons/si'

export default function RegisterPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [role,  setRole]    = useState<'athlete'|'coach'>('athlete')
  const [email, setEmail]   = useState('')
  const [pass,  setPass]    = useState('')
  const [error, setError]   = useState('')

  // if already logged in, send to dashboard
  if (session) {
    router.push('/dashboard')
    return null
  }

  const onSubmit = async e => {
    e.preventDefault()
    setError('')

    // TODO: call your real registration API here,
    // passing `role` along with email+password
    // For demo we just auto–signIn via credentials:
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password: pass,
      role,             // pass role to your adapter
    })

    if (res?.error) {
      setError('Registration failed')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Create an account
        </h1>
        <p className="text-gray-400 text-center">
          Pick your role, then enter email & password
        </p>

        {/* Role toggle */}
        <div className="flex space-x-2 justify-center mb-4">
          {['athlete','coach'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={
                `px-4 py-2 rounded-t-lg font-medium transition-colors ` +
                (role === r
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600')
              }
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* OAuth */}
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
            <SiGoogle size={18}/> Google
          </button>
        </div>

        <div className="flex items-center text-gray-400 text-sm">
          <span className="flex-grow border-b border-gray-600"></span>
          <span className="px-3 lowercase">or continue with</span>
          <span className="flex-grow border-b border-gray-600"></span>
        </div>

        {/* Email / Password Form */}
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
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded"
          >
            Create account as{' '}
            {role.charAt(0).toUpperCase() + role.slice(1)}
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
