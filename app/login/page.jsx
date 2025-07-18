'use client'

import React, { useState, useEffect } from 'react'
import { useRouter }                   from 'next/navigation'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import '../../styles/login.css'

export default function LoginPage() {
  const session  = useSession()
  const supabase = useSupabaseClient()
  const router   = useRouter()

  const [email, setEmail]             = useState('')
  const [pass,  setPass]              = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp]                 = useState('')
  const [phoneStep, setPhoneStep]     = useState('request')
  const [err,   setErr]               = useState('')
  const [loading, setLoading]         = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (session === undefined) return
    if (session) router.replace('/dashboard')
  }, [session, router])

  // Loading state
  if (session === undefined) {
    return (
      <div className="login-container">
        <p>Loading…</p>
      </div>
    )
  }

  // Don't render form if signed in
  if (session) return null

  const fullPhone = `${countryCode}${phoneNumber}`

  // Phone OTP: request via Supabase
  const handlePhoneSend = async () => {
    setErr(''); setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone })
    setLoading(false)
    if (error) setErr(error.message)
    else setPhoneStep('otpSent')
  }

  // Phone OTP: verify via Supabase
  const handlePhoneVerify = async () => {
    setErr(''); setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone, token: otp })
    setLoading(false)
    if (error) setErr(error.message)
    else router.replace('/dashboard')
  }

  // Email/password sign-in
  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setErr(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    setLoading(false)
    if (error) setErr(error.message)
    else router.replace('/dashboard')
  }

  // Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    setErr(''); setLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    setLoading(false)
    if (error) setErr(error.message)
    else if (data?.url) window.location.href = data.url
  }

  return (
    <div className="login-container">
      <form onSubmit={handleEmailSignIn} className="login-card">
        <img src="/exert-info.png" alt="Exert info" className="info-pic" />
        <p className="info-text">
          Exert: find top coaches & athletes. Sign in to continue.
        </p>

        {/* Email Login */}
        <div className="form-header"><h1>Log in to your account</h1></div>
        {err && <p className="error-text">{err}</p>}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required value={pass}
            onChange={e => setPass(e.target.value)} />
        </div>
        <a href="/forgot-password" className="forgot-link">Forgot password?</a>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in…' : 'Log In'}
        </button>

        {/* OAuth */}
        <div className="divider">or continue with</div>
        <button type="button" className="social-btn"
          onClick={handleGoogleSignIn} disabled={loading}>
          <img src="/icons/google.svg" alt="Google" /> Sign in with Google
        </button>

        {/* Phone OTP */}
        <div className="divider">or sign in with phone</div>
        {phoneStep === 'request' ? (
          <>
            <div className="input-container">
              <label htmlFor="country">Country Code</label>
              <select id="country" value={countryCode}
                onChange={e => setCountryCode(e.target.value)}>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (AU)</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" required value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)} />
            </div>
            <button type="button" className="login-btn"
              onClick={handlePhoneSend} disabled={loading}>
              {loading ? 'Sending OTP…' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="input-container">
              <label htmlFor="otp">Enter OTP</label>
              <input id="otp" type="text" required value={otp}
                onChange={e => setOtp(e.target.value)} />
            </div>
            <button type="button" className="login-btn"
              onClick={handlePhoneVerify} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify OTP'}
            </button>
          </>
        )}

        {/* Register */}
        <p className="register-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  )
}
