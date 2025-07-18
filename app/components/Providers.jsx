// components/Providers.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

const AuthContext = createContext({ session: null })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { subscription } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
