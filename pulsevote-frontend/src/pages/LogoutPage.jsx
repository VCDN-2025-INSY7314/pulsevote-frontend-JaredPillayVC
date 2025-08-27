import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const { logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    logout();
    nav('/', { replace: true });
  }, [logout, nav]);

  return <p>Signing you out…</p>;
}
