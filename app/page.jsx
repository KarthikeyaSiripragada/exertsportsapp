// app/page.jsx
'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  // If already signed in, jump straight to /dashboard
  if (session) {
    return (
      <main className="p-6">
        <Link href="/dashboard" className="text-blue-600 underline">
          Go to your Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl mb-4">Welcome to Exert Sports App</h1>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
        </Link>
      </div>
    </main>
  );
}
