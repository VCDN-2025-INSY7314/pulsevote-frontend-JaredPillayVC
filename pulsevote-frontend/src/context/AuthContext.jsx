import { createContext, useContext, useEffect, useState } from 'react';
import client from '../api/client';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('pv_token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('pv_userId') || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // global info/error

  // Persist to localStorage
  useEffect(() => {
    if (token) localStorage.setItem('pv_token', token);
    else localStorage.removeItem('pv_token');

    if (userId) localStorage.setItem('pv_userId', userId);
    else localStorage.removeItem('pv_userId');
  }, [token, userId]);

  const register = async (email, password) => {
    setLoading(true); setMessage('');
    try {
      const { data } = await client.post('/api/auth/register', { email, password });
      setToken(data.token);
      setUserId(data.userId ?? '');
      setMessage('Registered successfully.');
      return true;
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Registration failed');
      return false;
    } finally { setLoading(false); }
  };

  const login = async (email, password) => {
    setLoading(true); setMessage('');
    try {
      const { data } = await client.post('/api/auth/login', { email, password });
      setToken(data.token);
      setUserId(data.userId ?? '');
      setMessage('Logged in.');
      return true;
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Login failed');
      return false;
    } finally { setLoading(false); }
  };

  const logout = () => {
    setToken('');
    setUserId('');
    setMessage('Logged out.');
  };

  const value = { token, userId, loading, message, register, login, logout, setMessage };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
