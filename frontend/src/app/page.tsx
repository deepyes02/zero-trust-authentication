'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<{ Hello?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      try {
        const response = await fetch('/api/hello');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setData({ error: 'Failed to fetch from API' });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!mounted) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Next.js + FastAPI</h1>
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Next.js + FastAPI is here</h1>

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        {loading ? (
          <p>Loading.....</p>
        ) : data?.error ? (
          <p style={{ color: 'red' }}>{data.error}</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </main>
  );
}
