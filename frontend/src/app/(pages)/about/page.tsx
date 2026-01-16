"use client"
import { useEffect } from "react";
import styles from "./about.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
export default function About() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <div className={styles.about}>
      <h1>About Us</h1>
      <p>We are a team of developers who are passionate about building great software.</p>
      <p>Please login to see what we do....</p>
      {
        session ?
          <p>You are logged in</p>
          :
          <p>You are not logged in</p>
      }
    </div>
  );
}
