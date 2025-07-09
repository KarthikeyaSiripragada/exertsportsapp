'use client'
import { useAuth } from '@/components/Providers'
import Link from 'next/link'

export default function HomePage() {
  const { session } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {!session ? (
        <>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Sports Companion
          </h1>
          <div className="space-x-4">
            {/* Directly style the Link, no inner <a> */}
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </>
      ) : (
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  )
}
