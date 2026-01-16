# Google Authentication Setup Guide

This document outlines the steps required to set up Google Sign-In for the project using Google Cloud Console.

## 1. Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click on the project dropdown in the top left and select **New Project**.
3. Name your project (e.g., `next-js-fastapi-auth`) and click **Create**.

## 2. Configure OAuth Consent Screen
1. In the sidebar, go to **APIs & Services > OAuth consent screen**.
2. Select **External** and click **Create**.
3. Fill in the **App Information**:
   - **App name**: Your Application Name
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click **Save and Continue** until you reach the dashboard.

## 3. Create OAuth 2.0 Credentials
1. In the sidebar, go to **APIs & Services > Credentials**.
2. Click **+ Create Credentials** and select **OAuth client ID**.
3. Select **Web application** as the application type.
4. Add the following to **Authorized JavaScript origins**:
   - `http://localhost:3000`
5. Add the following to **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
6. Click **Create**.
7. **IMPORTANT**: Copy the **Client ID** and **Client Secret**. You will need these for your environment variables.

## 4. Environment Variables
Update your `.env` file with the following:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 5. Backend Verification
The Next.js frontend sends an `id_token` in the session. You can use this token to authenticate with the FastAPI backend.

1. **Endpoint**: `GET http://localhost:8000/verify-token`
2. **Header**: `Authorization: Bearer <ID_TOKEN_FROM_SESSION>`

The backend uses `google-auth` to verify that the token is valid and issued by your Google Cloud project.

---

# Technical Implementation Details

This section explains how the code components work together to provide a secure authentication flow.

## 1. Architecture Overview
The system uses a **Bilateral Authentication Flow**:
- **Frontend (Next.js)**: Handles the user-facing OAuth flow with Google via `next-auth`. It acquires an `id_token` (JWT) from Google.
- **Backend (FastAPI)**: Validates the `id_token` sent by the frontend to ensure the user is who they claim to be before fulfilling sensitive requests.

## 2. Frontend Implementation (`next-auth`)

### Configuration (`src/app/api/auth/[...nextauth]/route.ts`)
We use the `GoogleProvider` to handle the initial handshake. Crucially, we customize the `jwt` and `session` callbacks to preserve the Google `id_token`. By default, NextAuth doesn't expose the raw token to the client for security, but we need it for backend verification.

```typescript
callbacks: {
  async jwt({ token, account }) {
    if (account) {
      token.id_token = account.id_token; // Attach the raw ID token from Google
    }
    return token;
  },
  async session({ session, token }: any) {
    session.id_token = token.id_token; // Expose it to the client session
    return session;
  },
}
```

### Auth Provider (`src/app/_components/AuthProvider.tsx`)
The `SessionProvider` from `next-auth/react` is wrapped in a Client Component to provide session context to the entire application tree without making the `layout.tsx` a Client Component itself.

### Client Usage (`src/app/page.tsx`)
We use `signIn('google')` to start the flow and `useSession()` to access the `session.id_token`.

## 3. Backend Verification (FastAPI)

### Dependencies
Added `google-auth` and `requests` to `requirements.txt`. The `requests` library is required as a transport layer for the Google Auth library to communicate with Google's public key servers.

### Verification Logic (`backend/app/main.py`)
The backend exposes a `/verify-token` endpoint that performs a cryptographic check:

```python
from google.oauth2 import id_token
from google.auth.transport import requests

# Verify the ID token against Google's public keys
id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
```

This verification ensures:
1. The token was issued by Google.
2. The token was intended for **our** application (`GOOGLE_CLIENT_ID` check).
3. The token has not expired.

## 4. End-to-End Sequence Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Next.js (Client)
    participant AuthAPI as Next.js (API)
    participant Google as Google OAuth
    participant Backend as FastAPI

    User->>Frontend: Clicks "Sign In"
    Frontend->>Google: Redirects for Consent
    User->>Google: Authenticates
    Google->>AuthAPI: Returns Account Codes
    AuthAPI->>Google: Exchanges for id_token
    AuthAPI->)Frontend: Stores session (with id_token)
    Frontend->>Backend: Request with Bearer <id_token>
    Backend->>Google: Fetch Public Keys
    Backend->)Backend: Verify Token Signature
    Backend-->>Frontend: Returns Authenticated Data
```

## 5. Critical Troubleshooting Notes
When implementing this in a Dockerized Next.js environment, keep these pitfalls in mind:

- **Next.js Rewrites**: Avoid using broad rewrites like `source: '/api/:path*'` in `next.config.ts` if you are using NextAuth, as it will intercept and break the `/api/auth` internal routes.
- **Docker Environment**: Ensure your frontend service in `docker-compose.yml` has `env_file: [.env]`. Unlike local runs, Docker containers cannot automatically see host environment variables.
- **Internal vs External URLs**: Use `http://backend:8000` for server-side fetches inside Docker, but use `http://localhost:8000` for client-side browser fetches.
