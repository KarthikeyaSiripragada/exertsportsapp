// components/AuthListener.jsx
'use client'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthListener() {
  const supabase = useSupabaseClient()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // check if profile already exists:
          const { data: prof } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .single()

          if (!prof) {
            // now safe to insert
            await supabase.from('profiles').insert({
              id: session.user.id,
              username: session.user.user_metadata.username,
              first_name: session.user.user_metadata.firstName,
              last_name: session.user.user_metadata.lastName,
              phone: session.user.user_metadata.phone,
              date_of_birth: session.user.user_metadata.dateOfBirth,
              gender: session.user.user_metadata.gender,
              role: session.user.user_metadata.role
            })
          }
        }
      }
    )
    return () => listener.subscription.unsubscribe()
  }, [supabase])

  return null
}
