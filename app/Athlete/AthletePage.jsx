'use client'

import { useState, useMemo } from 'react'

export default function AthletePage() {
  // Mock data – replace with a fetch to your API when ready
  const coaches = [
    { id: 1, name: 'Anita Sharma', specialty: 'Sprint Coach' },
    { id: 2, name: 'Rajesh Patel', specialty: 'Strength Training' },
    { id: 3, name: 'Meena Singh', specialty: 'Endurance' },
    { id: 4, name: 'Vikram Desai', specialty: 'Yoga & Flexibility' },
  ]

  const [query, setQuery] = useState('')

  // Filter coaches by name or specialty
  const filtered = useMemo(
    () =>
      coaches.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.specialty.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Hero */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Find Your Perfect Coach
        </h1>
        <p className="text-gray-600">
          Search by name or specialty and connect instantly.
        </p>
      </header>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search coaches…"
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid of coach cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map(coach => (
            <div
              key={coach.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {coach.name}
                </h2>
                <p className="mt-1 text-gray-600">{coach.specialty}</p>
              </div>
              <button
                onClick={() => alert(`View profile of ${coach.name}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No coaches found for “{query}.”
          </p>
        )}
      </div>
    </div>
  )
}
