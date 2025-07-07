// File: src/Coaches/CoachPage.jsx
'use client';
import React, { useState } from 'react';
import CoachSidebar from '../../components/CoachSidebar.jsx';

export default function CoachPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const [profile, setProfile] = useState({
    name: 'Your Name',
    specialty: 'e.g., Strength Training',
    bio: ''
  });
  const [spots, setSpots] = useState([]);
  const [newSpot, setNewSpot] = useState({
    title: '',
    location: '1600 Amphitheatre Parkway, Mountain View, CA'
  });

  // Profile handlers
  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  };
  const saveProfile = () => {
    alert('Profile saved:\n' + JSON.stringify(profile, null, 2));
  };

  // Spots handlers
  const handleNewSpotChange = e => {
    const { name, value } = e.target;
    setNewSpot(n => ({ ...n, [name]: value }));
  };
  const addSpot = () => {
    if (!newSpot.title || !newSpot.location) return;
    setSpots(s => [...s, newSpot]);
    setNewSpot(n => ({ ...n, title: '' }));
  };
  const removeSpot = idx => {
    setSpots(s => s.filter((_, i) => i !== idx));
  };

  // Free Google embed URL
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    newSpot.location
  )}&output=embed`;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <CoachSidebar active={activeSection} onSelect={setActiveSection} />

      <main style={{ flex: 1, padding: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>
          {activeSection === 'profile' ? '🏋️ My Profile' : '📍 My Training Spots'}
        </h2>

        {activeSection === 'profile' && (
          <section style={card}>
            <div style={formRow}>
              <div style={field}>
                <label>Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>
              <div style={field}>
                <label>Specialty</label>
                <input
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                style={{ ...inputStyle, height: 80 }}
              />
            </div>
            <button onClick={saveProfile} style={buttonStyle}>
              Save Profile
            </button>
          </section>
        )}

        {activeSection === 'spots' && (
          <section style={card}>
            <div style={{ marginBottom: '1rem' }}>
              <iframe
                title="Spot Location"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 4 }}
                loading="lazy"
                src={mapSrc}
              />
            </div>

            <ul>
              {spots.map((spot, idx) => (
                <li key={idx} style={spotRow}>
                  <span>
                    <strong>{spot.title}</strong> — {spot.location}
                  </span>
                  <button onClick={() => removeSpot(idx)} style={removeBtn}>
                    ✕
                  </button>
                </li>
              ))}
              {spots.length === 0 && <p>No spots yet. Add one below!</p>}
            </ul>

            <div style={formRow}>
              <input
                name="title"
                placeholder="Spot Name"
                value={newSpot.title}
                onChange={handleNewSpotChange}
                style={inputStyle}
              />
              <input
                name="location"
                placeholder="Location (address)"
                value={newSpot.location}
                onChange={handleNewSpotChange}
                style={inputStyle}
              />
              <button onClick={addSpot} style={buttonStyle}>
                Add Spot
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// —— Shared Styles ——
const card = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '1rem',
  marginBottom: '2rem',
  background: '#fafafa'
};

const formRow = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

const field = {
  flex: 1,
  minWidth: 200
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: 4,
  marginTop: 4
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.6rem 1.2rem',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer'
};

const spotRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.4rem 0'
};

const removeBtn = {
  background: 'transparent',
  border: 'none',
  color: '#dc3545',
  fontSize: '1rem',
  cursor: 'pointer'
};
