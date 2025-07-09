'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import '@/styles/register.css';

export default function RegisterPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('athlete');
  const [error,    setError]    = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: { role } }
    );
    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }
  };

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

      {/* OAuth */}
      <div className="oauth-buttons">
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
        >
          <img src="/images/github.svg" alt="GitHub" />
          GitHub
        </button>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
        >
          <img src="/images/google.svg" alt="Google" />
          Google
        </button>
      </div>

      {/* Divider */}
      <div className="divider">or continue with</div>

      {/* Email/password form */}
      <form onSubmit={onSubmit}>
        {error && <p className="register-footer" style={{ color: 'red' }}>{error}</p>}

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

        <button type="submit" className="submit-btn">
          Create account
        </button>
      </form>

      <div className="register-footer">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}
