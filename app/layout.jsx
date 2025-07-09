import '@/styles/globals.css'
import SupabaseProvider from '@/components/SupabaseProvider'

export const metadata = {
  title: 'Exert Sports App',
  description: 'Find coaches & training spots'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* This is a Server Component, but SupabaseProvider will run only on the client */}
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
