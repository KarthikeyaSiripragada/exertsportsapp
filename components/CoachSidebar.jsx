import React from 'react';
'use client';
export default function CoachSidebar({ active, onSelect }) {
  const items = [
    { key: 'profile', label: 'My Profile' },
    { key: 'spots',   label: 'Training Spots' },
  ];

  return (
    <nav style={nav}>
      <ul style={ul}>
        {items.map(item => (
          <li key={item.key} style={li}>
            <button
              onClick={() => onSelect(item.key)}
              style={{
                ...button,
                ...(active === item.key ? activeButton : {})
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Inline styles
const nav = {
  width: 180,
  borderRight: '1px solid #ddd',
  boxSizing: 'border-box',
  padding: '1rem 0',
};

const ul = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const li = {
  marginBottom: '0.5rem',
};

const button = {
  background: 'none',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
  color: '#333',
};

const activeButton = {
  backgroundColor: '#f0f0f0',
  fontWeight: 'bold',
};
