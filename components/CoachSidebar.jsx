// components/CoachSidebar.jsx
'use client'
import React from 'react'

export default function CoachSidebar({ active, onSelect }) {
  const items = [
    { key: 'profile', label: 'My Profile' },
    { key: 'spots',   label: 'Training Spots' },
    // …etc…
  ]
  return (
    <aside className="w-64 bg-gray-200 min-h-screen p-4">
      {items.map(item => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className={`block w-full text-left py-2 px-3 mb-2 rounded ${
            active === item.key
              ? 'bg-gray-400 text-white'
              : 'hover:bg-gray-300'
          }`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  )
}
