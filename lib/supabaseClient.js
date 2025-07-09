const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
console.log(
  'supabase anon key code points:',
  [...rawKey].map(ch => ch.codePointAt(0))
)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE URL or ANON KEY in environment')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
