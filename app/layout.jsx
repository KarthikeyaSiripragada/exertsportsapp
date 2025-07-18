// app/layout.jsx
import '../styles/globals.css'
import '../styles/layout.css'
import Link from 'next/link'

export const metadata = {
  title: 'Exert',
  description: 'Your all-in-one athlete companion platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="app-wrapper">
          <aside className="sidebar">
            <div className="logo">Exert</div>
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/athlete/dashboard">Athlete</Link>
              <Link href="/coach/dashboard">Coach</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </nav>
          </aside>

          <div className="main-content">
            <header className="header">
              <h1>🗂️ Exert Dashboard</h1>
            </header>

            <section className="page-container">
              {children}
            </section>

            <footer className="footer">
              <p>© {new Date().getFullYear()} Exert. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
