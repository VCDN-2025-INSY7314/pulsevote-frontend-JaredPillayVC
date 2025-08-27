import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { token } = useAuth();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', background: '#f6f7fb' }}>
      <header style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        marginBottom: 32,
        padding: '18px 32px',
        background: '#fff',
        boxShadow: '0 2px 8px 0 #0001',
        borderRadius: '0 0 16px 16px',
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 24, color: '#2563eb', textDecoration: 'none', letterSpacing: 1 }}>PulseVote</Link>
        <nav style={{ display: 'flex', gap: 18 }}>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#2563eb' : '#222', fontWeight: isActive ? 600 : 400, textDecoration: 'none', padding: '4px 10px', borderRadius: 6 })}>Home</NavLink>
          {token ? (
            <>
              <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? '#2563eb' : '#222', fontWeight: isActive ? 600 : 400, textDecoration: 'none', padding: '4px 10px', borderRadius: 6 })}>Dashboard</NavLink>
              <NavLink to="/logout" style={({ isActive }) => ({ color: isActive ? '#2563eb' : '#222', fontWeight: isActive ? 600 : 400, textDecoration: 'none', padding: '4px 10px', borderRadius: 6 })}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" style={({ isActive }) => ({ color: isActive ? '#2563eb' : '#222', fontWeight: isActive ? 600 : 400, textDecoration: 'none', padding: '4px 10px', borderRadius: 6 })}>Register</NavLink>
              <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#2563eb' : '#222', fontWeight: isActive ? 600 : 400, textDecoration: 'none', padding: '4px 10px', borderRadius: 6 })}>Login</NavLink>
            </>
          )}
        </nav>
      </header>
      <main style={{ maxWidth: 420, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px 0 #0002', padding: 32, minHeight: 320 }}>
        <Outlet />
      </main>
    </div>
  );
}
