'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CoachPage   from '../Coaches/CoachPage.jsx'
import AthletePage from '../Athlete/AthletePage.jsx'

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1. While loading, show a placeholder
  if (status === 'loading') return <p className="p-4">Loading...</p>;

  // 2. If not signed in, redirect to /login
  if (!session) {
    router.push('/login');
    return null;
  }

  const { email, role } = session.user;

  return (
    <div className="p-6 font-sans">
      {/* Header with Logout */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {email}</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Logout
        </button>
      </header>

      {/* Render according to role */}
      {role === 'coach' ? <CoachPage /> : <AthletePage />}
    </div>
  );
}
