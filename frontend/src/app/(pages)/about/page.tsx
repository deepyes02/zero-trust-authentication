"use client"
import { useEffect } from "react";
import styles from "./about.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
export default function About() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The middleware handles redirection, but this is a secondary guard
      signIn('google');
    },
  });

  return (
    <div className={styles.about} style={{ padding: '2rem' }}>
      <h1>About Us (Protected)</h1>
      <p>We are a team of developers who are passionate about building great software.</p>

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #d4edda', background: '#d4edda', color: '#155724', borderRadius: '4px' }}>
        <p>✓ Access Granted: Welcome back, <strong>{session?.user?.name}</strong>!</p>
        <p>You can see this page because your Google session is verified.</p>
      </div>
    </div>
  );
}

