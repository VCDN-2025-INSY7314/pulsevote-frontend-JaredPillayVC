import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { cleanEmail, cleanPassword, isStrongEnough } from '../utils/sanitize';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, loading, message, setMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setMessage('');
    const emailC = cleanEmail(email);
    const passC = cleanPassword(password);
    if (!isStrongEnough(passC)) {
      setMessage('Password must be at least 8 characters.');
      return;
    }
    const ok = await register(emailC, passC);
    if (ok) nav('/dashboard', { replace: true });
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ marginBottom: 8, color: '#2563eb', fontWeight: 700, letterSpacing: 1 }}>Register</h2>
      {message && (
        <div
          style={{
            color: message.includes('failed') || message.includes('use') ? '#b91c1c' : '#166534',
            background: message.includes('failed') || message.includes('use') ? '#fee2e2' : '#dcfce7',
            border: `2px solid ${(message.includes('failed') || message.includes('use')) ? '#ef4444' : '#22c55e'}`,
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
          {(message.includes('failed') || message.includes('use')) ? (
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
      <small style={{ color: '#6b7280', marginTop: -8 }}>At least 8 characters.</small>
      <button disabled={loading} type="submit" style={{ marginTop: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Please wait…' : 'Create account'}</button>
    </form>
  );
}
