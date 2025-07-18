// app/layout.jsx
'use client'

import '../styles/globals.css'
import '../styles/layout.css'
import Providers from './providers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const metadata = {
  title: 'Exert',
  description: 'Your all-in-one athlete companion platform',
}

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const navItems = [
    { label: 'Home',      href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Athlete',   href: '/athlete/dashboard' },
    { label: 'Coach',     href: '/coach/dashboard' },
    { label: 'Login',     href: '/login' },
    { label: 'Register',  href: '/register' },
  ]

  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <div className="app-wrapper">
            <aside className="sidebar">
              <div className="logo">Exert</div>
              <nav className="nav-links">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <main className="main-content">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
