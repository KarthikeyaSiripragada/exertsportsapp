'use client'

import { useState, useMemo } from 'react'

export default function CoachRoute() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    name: '',
    specialty: '',
    bio: ''
  })
  const [spots, setSpots] = useState([])
  const [newSpot, setNewSpot] = useState({
    title: '',
    location: '1600 Amphitheatre Parkway, Mountain View, CA'
  })

  const handleProfileChange = e => {
    const { name, value } = e.target
    setProfile(p => ({ ...p, [name]: value }))
  }

  const saveProfile = () => {
    alert(`Profile saved!\n${JSON.stringify(profile, null, 2)}`)
  }

  const handleNewSpotChange = e => {
    const { name, value } = e.target
    setNewSpot(s => ({ ...s, [name]: value }))
  }

  const addSpot = () => {
    if (!newSpot.title || !newSpot.location) return
    setSpots(s => [...s, newSpot])
    setNewSpot(s => ({ ...s, title: '' }))
  }

  const removeSpot = idx => {
    setSpots(s => s.filter((_, i) => i !== idx))
  }

  // simple embed URL (no API key)
  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(
        newSpot.location
      )}&output=embed`,
    [newSpot.location]
  )

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-48 bg-white border-r">
        <nav className="flex flex-col">
          {['profile', 'spots'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                'py-3 px-4 text-left hover:bg-gray-50 transition ' +
                (activeTab === tab
                  ? 'bg-gray-200 font-semibold'
                  : 'text-gray-600')
              }
            >
              {tab === 'profile' ? '🏋️ My Profile' : '📍 Training Spots'}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Specialty</label>
                <input
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleProfileChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Strength Training"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="A little about yourself..."
                />
              </div>
              <button
                onClick={saveProfile}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
              >
                Save Profile
              </button>
            </div>
          </section>
        )}

        {/* Spots Tab */}
        {activeTab === 'spots' && (
          <section className="space-y-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">My Training Spots</h2>
              <iframe
                title="Map Preview"
                src={mapSrc}
                className="w-full h-64 rounded border"
                loading="lazy"
              />
              <ul className="mt-4 space-y-2">
                {spots.length > 0 ? (
                  spots.map((spot, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded"
                    >
                      <div>
                        <strong>{spot.title}</strong>
                        <p className="text-sm text-gray-600">
                          {spot.location}
                        </p>
                      </div>
                      <button
                        onClick={() => removeSpot(i)}
                        className="text-red-500 hover:text-red-600"
                      >
                        &times;
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No spots yet. Add one below!</p>
                )}
              </ul>

              <div className="mt-6 space-y-4">
                <input
                  name="title"
                  value={newSpot.title}
                  onChange={handleNewSpotChange}
                  className="w-full border rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Spot Name"
                />
                <input
                  name="location"
                  value={newSpot.location}
                  onChange={handleNewSpotChange}
                  className="w-full border rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Address or place"
                />
                <button
                  onClick={addSpot}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow"
                >
                  Add Spot
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
