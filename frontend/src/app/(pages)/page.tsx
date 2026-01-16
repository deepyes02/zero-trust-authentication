'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google');
    },
  });
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

    if (session) {
      fetchData();
    }
  }, [session]);

  if (!mounted) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Now loading....</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Next.js + FastAPI + Google Auth</h1>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f9fa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {session?.user?.image && (
              <img src={session.user.image} alt="Profile" style={{ borderRadius: '50%', width: '40px' }} />
            )}
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{session?.user?.name}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>Backend Data (Zero-Trust)</h3>
        {loading ? (
          <p>Loading from backend...</p>
        ) : data?.error ? (
          <div style={{ color: '#721c24', background: '#f8d7da', padding: '1rem', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
            <strong>Security Error:</strong> {data.error}
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              The backend rejected this request. This means your browser session is not verified or the token is invalid.
            </p>
          </div>
        ) : (
          <div>
            <p style={{ color: '#155724', background: '#d4edda', padding: '0.5rem', borderRadius: '4px', display: 'inline-block' }}>
              ✓ Backend Verified Successfully
            </p>
            <pre style={{ background: '#f8f9fa', padding: '1rem', overflow: 'auto', border: '1px solid #eee' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}

