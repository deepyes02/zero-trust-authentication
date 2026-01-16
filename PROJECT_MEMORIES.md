# Project Memories & Gotchas

This document tracks non-obvious technical hurdles and solutions encountered during development.

## 1. Docker & Next.js Environment Variables
**Problem**: NextAuth failed because it couldn't see `GOOGLE_CLIENT_ID` inside the container.
**Lesson**: Docker containers do not automatically inherit the host's `.env` variables. You **must** explicitly reference the `.env` file in `docker-compose.yml`:
```yaml
services:
  frontend:
    env_file:
      - .env
```

## 2. Conflicting Next.js Rewrites
**Problem**: A generic rewrite for `/api/:path*` intercepted NextAuth's internal routes (`/api/auth/*`), leading to a `CLIENT_FETCH_ERROR` with an "Internal Server Error" (actually an HTML error page being parsed as JSON).
**Lesson**: Avoid broad rewrites in `next.config.ts` if using NextAuth. Instead, use specific endpoint proxies or handle backend communication via Next.js Route Handlers.

## 3. Google Auth Backend Dependencies
**Problem**: FastAPI crashed with `ImportError: The requests library is not installed` despite `google-auth` being present.
**Lesson**: `google-auth` requires `requests` as a transport layer for verifying ID tokens against Google's public keys. Always include both in `requirements.txt`:
```text
google-auth==2.37.0
requests==2.32.3
```

## 4. Internal vs External Communication
**Lesson**: 
- **Server-to-Server** (Next.js Route Handler → FastAPI): Use Docker service name: `http://backend:8000`.
- **Client-to-Server** (Browser → FastAPI): Use `http://localhost:8000` (or the public domain).
