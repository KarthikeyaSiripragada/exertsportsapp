// app/page.jsx
'use client'

import Link from 'next/link'
import '@/styles/page.css'

export default function HomePage() {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Exert empowers athletes to reach new heights.</h1>
          <p>Connect with verified coaches, register for competitions, and access essential resources—all in one place.</p>
          <Link href="/login">
            <button className="cta-button">Get Started—Join for Free</button>
          </Link>
        </div>
      </section>

      {/* About Exert Section */}
      <section className="info-card about-us">
        <h2>About Exert</h2>
        <p>
          Exert was built to bridge the gap between athletes and expert support. From personalized coaching to up-to-date competition schedules and anti-doping guidelines, we streamline your athletic journey.
        </p>
        <Link href="/about">
          <button className="learn-more">Learn More</button>
        </Link>
      </section>

      {/* Key Features Section */}
      <section className="info-card features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Verified Coaches:</strong> Browse and connect with certified professionals.
          </li>
          <li>
            <strong>Competition Hub:</strong> Register for events and track schedules seamlessly.
          </li>
          <li>
            <strong>Anti-Doping Info:</strong> Stay compliant with official guidelines and updates.
          </li>
          <li>
            <strong>Community Support:</strong> Join forums, share experiences, and grow together.
          </li>
        </ul>
      </section>
    </main>
  )
}
