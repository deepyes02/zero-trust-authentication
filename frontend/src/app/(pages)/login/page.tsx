'use client';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return (
        <div style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "400px",
                background: "white",
                padding: "2.5rem",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                textAlign: "center",
                border: "1px solid #f0f0f0"
            }}>
                <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "1.75rem", fontWeight: "700", color: "#1a1a1a" }}>
                    Welcome Back
                </h1>
                <p style={{ margin: "0 0 2rem 0", color: "#666", fontSize: "0.95rem" }}>
                    Please sign in to access your secure environment.
                </p>

                <button
                    onClick={() => signIn("google", { callbackUrl })}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        padding: "0.75rem",
                        background: "white",
                        color: "#3c4043",
                        border: "1px solid #dadce0",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background 0.2s, box-shadow 0.2s",
                        outline: "none"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = "#f8f9fa";
                        e.currentTarget.style.border = "1px solid #d2e3fc";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.border = "1px solid #dadce0";
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.97 2.3c1.74-1.61 2.74-3.97 2.74-6.65z" fill="#4285F4" />
                        <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.97-2.3c-.82.55-1.87.88-2.99.88-2.3 0-4.25-1.55-4.94-3.64l-3.07 2.38C2.49 15.14 5.51 18 9 18z" fill="#34A853" />
                        <path d="M4.06 10.76c-.18-.55-.28-1.13-.28-1.76s.1-1.21.28-1.76V4.87l-3.07-2.38C.39 3.73 0 5.32 0 7c0 1.68.39 3.27 1.01 4.67l3.05-2.37z" fill="#FBBC05" />
                        <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0 5.51 0 2.49 2.86 1.01 6.13l3.07 2.38C4.75 5.13 6.7 3.58 9 3.58z" fill="#EA4335" />
                    </svg>
                    Sign in with Google
                </button>

                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f0f0f0", fontSize: "0.85rem", color: "#999" }}>
                    By signing in, you agree to our Terms of Service.
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
