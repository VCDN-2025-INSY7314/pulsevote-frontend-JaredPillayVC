import { useEffect, useState } from 'react';
import client from '../api/client';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await client.get('/api/protected');
        setData(data);
      } catch (e) {
        setErr(e?.response?.data?.message || 'Failed to load protected data');
      }
    })();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading…</p>}
    </div>
  );
}
