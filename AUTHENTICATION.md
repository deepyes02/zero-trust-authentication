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
