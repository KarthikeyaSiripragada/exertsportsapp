// app/layout.jsx
import '@/styles/globals.css'
import SupabaseProvider from '@/components/SupabaseProvider'
import AuthListener     from '@/components/AuthListener'

export const metadata = {
  title: 'Exert Sports App',
  description: 'Find coaches & training spots'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* SupabaseProvider is a client component that injects the auth context */}
        <SupabaseProvider>
          {/* AuthListener needs to live inside the provider so it can subscribe */}
          <AuthListener />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
