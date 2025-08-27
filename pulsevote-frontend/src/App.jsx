import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [api, setApi] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://localhost:5000/test');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        setApi(json);
      } catch (e) {
        setError('Could not reach backend. Is it running on :5000?');
      }
    };
    load();
  }, []);

  return (
    <>
      <h2>Welcome to PulseVote</h2>
      {api && (
        <pre style={{ background:'#111', color:'#0f0', padding:'8px', borderRadius:'6px' }}>
{JSON.stringify(api, null, 2)}
        </pre>
      )}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </>
  );
}
export default App;
