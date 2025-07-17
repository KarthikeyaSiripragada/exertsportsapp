import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
export const runtime = 'nodejs'

export async function POST(req) {
  const { phone, code } = await req.json()

  // fetch the stored code
  const { data, error } = await supabase
    .from('sms_otps')
    .select('code, expires_at')
    .eq('phone', phone)
    .single()

  if (error || data.code !== code || new Date() > new Date(data.expires_at)) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
  }

  // delete used code
  await supabase.from('sms_otps').delete().eq('phone', phone)

  await supabase.auth.admin.createUser({
    user_metadata: { phone },
    phone,                // requires Supabase enabled phone auth
    password: Math.random().toString(36).slice(-12)  // dummy password
  }).catch(() => {})      // ignore if already exists

  // 2. issue a JWT session
  const { data: session, error: sessErr } = await supabase.auth.admin.createUserJwt({
    phone
  })

  if (sessErr) {
    return NextResponse.json({ error: sessErr.message }, { status: 500 })
  }

  // return the session to the client
  return NextResponse.json({ session })
}
