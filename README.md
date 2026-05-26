# Adalet Yönetim - Backend Foundation

Production-ready backend foundation using **Node.js + Express + Prisma + PostgreSQL** with JWT auth and RBAC.

## Features
- JWT access tokens + HttpOnly refresh token cookie sessions
- Login-only auth flow (no registration endpoint)
- RBAC roles: `user`, `moderator`, `admin`, `superadmin`, `owner`
- Prisma `User` model with secure password hashing (`bcrypt`)
- Rate-limited login endpoint
- Protected routes middleware
- CORS configured for Next.js frontend connection

## Folder Structure
```
backend/
  prisma/schema.prisma
  scripts/seedOwner.js
  src/
    app.js
    server.js
    config/
    controllers/
    middleware/
    routes/
    utils/
frontend/
  src/lib/api.ts
```

## Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Then update secrets and DB URL.
3. Initialize database:
   ```bash
   npx prisma migrate dev --name init_auth
   npx prisma generate
   ```
4. Create owner user:
   ```bash
   npm run seed
   ```
5. Run backend:
   ```bash
   npm run dev
   ```

## API Routes
- `POST /auth/login` body: `{ "email": "...", "password": "..." }`
- `GET /auth/me` (Bearer access token required)
- `GET /users` (Bearer token + role in `moderator|admin|superadmin|owner`)

## Frontend Connection
Set in Next.js `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Use `apiFetch('/auth/me', { headers: { Authorization: `Bearer ${token}` } })` from `frontend/src/lib/api.ts`.

## Security Notes
- Passwords stored only as bcrypt hashes.
- Login endpoint rate-limited.
- Refresh token stored in HttpOnly cookie and hashed in DB.
- `helmet` for secure headers and strict CORS with credentials.
