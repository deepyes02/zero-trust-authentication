import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../globals.scss"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

import { AuthProvider } from "../_components/AuthProvider";

export const metadata: Metadata = {
  title: "Google Authentication",
  description: "Google Authentication",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={nunitoSans.className}>
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "1rem 2rem", background: "#f8f9fa", borderBottom: "1px solid #ddd", display: "flex", gap: "2rem", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>ZERO Trust</h2>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#007bff" }}>Home</Link>
            <Link href="/about" style={{ textDecoration: "none", color: "#007bff" }}>About</Link>
          </nav>
        </header>
        <main style={{ flex: 1 }}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
        <footer style={{ padding: "1rem 2rem", background: "#f8f9fa", borderTop: "1px solid #ddd", textAlign: "center", color: "#666" }}>
          It&apos;s been securely locked
        </footer>
      </body>
    </html>
  );
}

