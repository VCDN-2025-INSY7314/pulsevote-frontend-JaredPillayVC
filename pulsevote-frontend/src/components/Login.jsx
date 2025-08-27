import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { cleanEmail, cleanPassword } from '../utils/sanitize';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loading, message, setMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const loc = useLocation();
  const needAuth = loc.state?.needAuth;

  async function onSubmit(e) {
    e.preventDefault();
    setMessage('');
    const ok = await login(cleanEmail(email), cleanPassword(password));
    if (ok) {
      const dest = loc.state?.from?.pathname || '/dashboard';
      nav(dest, { replace: true });
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ marginBottom: 8, color: '#2563eb', fontWeight: 700, letterSpacing: 1 }}>Login</h2>
      {needAuth && <p style={{ color: '#b45309', background: '#fef3c7', padding: 8, borderRadius: 6 }}>Please log in to continue.</p>}
      {message && (
        <div
          style={{
            color: message.includes('failed') ? '#b91c1c' : '#166534',
            background: message.includes('failed') ? '#fee2e2' : '#dcfce7',
            border: `2px solid ${message.includes('failed') ? '#ef4444' : '#22c55e'}`,
            padding: '12px 14px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 17,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
            boxShadow: '0 2px 8px #0001',
          }}
        >
          {message.includes('failed') ? (
            <span style={{ fontSize: 22, marginRight: 6 }}>❌</span>
          ) : (
            <span style={{ fontSize: 22, marginRight: 6 }}>✅</span>
          )}
          {message}
        </div>
      )}
      <label style={{ fontWeight: 500 }}>Email</label>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
      <label style={{ fontWeight: 500 }}>Password</label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
      <button disabled={loading} type="submit" style={{ marginTop: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Please wait…' : 'Login'}</button>
    </form>
  );
}
