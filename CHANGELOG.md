# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-01-16
### Changed
- **Branding Refresh**: Updated application title to "ZERO Trust" and footer to "It's been securely locked" to align with the core security principles.

## [1.5.0] - 2026-01-16
### Added
- **Site-Wide Protection**: Extended Next.js Middleware to protect the entire application, including the home page.
- **Simplified UI**: Streamlined the home page UI now that authentication is guaranteed by the global route guard.

## [1.4.0] - 2026-01-16
### Added
- **Custom Login Page**: Designed and implemented a dedicated premium login page at `/login` to replace the default NextAuth sign-in screen.
- **Improved UX**: Integrated automatic redirection to the custom login page for unauthorized access to protected routes.

## [1.3.0] - 2026-01-16
### Added
- **Route Protection**: Implemented Next.js Middleware to globally protect the `/about` route.
- **Enhanced Guard**: Updated the `About` page component to strictly require a valid session, providing a secondary layer of protection and automatic redirection.

## [1.2.0] - 2026-01-16
### Added
- **OAuth Flexibility**: Added `prompt: "select_account"` to the Google Provider to allow users to switch accounts easily.
- **Improved UX**: Added a "Visual Showcase" section to the README with screenshots of both authenticated and restricted states.

### Changed
- **Performance Optimization**: Set `use_cache=True` (default) for dependency verification within a single request, but kept the logic modular for future adjustments.

## [1.1.0] - 2026-01-16
### Added
- **Zero-Trust Security**: Implemented a mandatory `get_current_user` dependency in the FastAPI backend that cryptographically verifies the Google `id_token` on every request.
- **Secure Proxy Layer**: Refactored Next.js API routes to securely retrieve tokens from the server-side session and forward them to the backend via `Authorization: Bearer` headers.
- **Frontend Error Handling**: Updated the UI to display security-specific errors (401 Unauthorized) returned by the backend.
- **Session Policy**: Restricted session duration to 24 hours (`maxAge: 24h`) for enhanced security.

### Fixed
- **Security Gap**: Fixed a critical vulnerability where the backend was serving data without verifying the user's identity.

## [1.0.0] - 2026-01-16
### Added
- **Initial Authentication**: Basic Google Sign-In integration using `next-auth`.
- **Project Structure**: Organized files into the `(pages)` route group for common layout sharing.
- **Docker Orchestration**: Set up `docker-compose` for local development with hot-reloading for both frontend and backend.
- **Layout Consolidation**: Implemented a shared layout with Global Header, Navigation, and Footer.
- **Technical Docs**: Created `AUTHENTICATION.md` and initial `README.md`.

---
*End of day milestones achieved. Mission accomplished.* 🛡️🚀
