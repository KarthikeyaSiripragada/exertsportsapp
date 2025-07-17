// app/register/page.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase }  from '@/lib/supabaseClient'
import '@/styles/register.css'

export default function RegisterPage() {
  const router = useRouter()

  // form state
  const [username,       setUsername]       = useState('')
  const [firstName,      setFirstName]      = useState('')
  const [lastName,       setLastName]       = useState('')
  const [phone,          setPhone]          = useState('')
  const [dateOfBirth,    setDateOfBirth]    = useState('')
  const [gender,         setGender]         = useState('')      // can be 'male','female','other'
  const [role,           setRole]           = useState('athlete')
  const [email,          setEmail]          = useState('')
  const [password,       setPassword]       = useState('')
  const [confirmPass,    setConfirmPass]    = useState('')
  const [acceptedTerms,  setAcceptedTerms]  = useState(false)
  const [error,          setError]          = useState(null)
  const [loading,        setLoading]        = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // client‐side validations...
    if (password !== confirmPass) {
      return setError('Passwords do not match.')
    }
    if (!acceptedTerms) {
      return setError('You must accept the Terms & Conditions.')
    }

    setLoading(true)

    // just signUp—no manual profiles.insert()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    }, {
      data: { username, firstName, lastName, phone, dateOfBirth, gender, role }
    })

    setLoading(false)

    if (signUpError) {
      return setError(signUpError.message)
    }

    router.push('/login')
  }


  return (
    <div className="register-card">
      <h1>Create an account</h1>

      {/* Role switcher */}
      <div className="role-switch">
        {['athlete', 'coach'].map((r) => (
          <button
            key={r}
            type="button"
            className={role === r ? 'active' : ''}
            onClick={() => setRole(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {error && <p className="register-footer" style={{ color: 'red' }}>{error}</p>}

        <div className="form-field">
          <label>Username</label>
          <input
            type="text"
            required
            placeholder="johndoe123"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>First Name</label>
          <input
            type="text"
            required
            placeholder="John"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            required
            placeholder="Doe"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="tel"
            required
            placeholder="+1 555-555-5555"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Date of Birth</label>
          <input
            type="date"
            required
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Gender</label>
          <select
            required
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="" disabled>Select…</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
            />{' '}
            I accept the <a href="/terms" target="_blank">Terms &amp; Conditions</a>
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <div className="register-footer">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  )
}
