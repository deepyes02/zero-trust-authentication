'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
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
      <h1>Next.js + FastAPI + Google Auth</h1>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        {session ? (
          <div>
            <p>Signed in as <strong>{session.user?.email}</strong></p>
            {session.user?.image && (
              <img src={session.user.image} alt="User Profile" style={{ borderRadius: '50%', width: '50px' }} />
            )}
            <p>Name: {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <p>You are not signed in.</p>
            <button
              onClick={() => signIn('google')}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#4285F4', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>

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
