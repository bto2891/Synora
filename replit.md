# Synora — Industrial Operations

## Overview
Synora is a mobile-first React app for industrial operations on the GM Silao project. It uses role-based access with five user roles (Site Manager, Supervisor, Technician, Warehouse Manager, Project Manager). Each role sees a tailored Home, Tasks, Messages, Warehouse, and Profile view.

## Tech Stack
- React 19 + React Router 7
- Vite 8 (dev/build)
- Tailwind CSS v4 (via `@tailwindcss/vite`, tokens declared in `src/index.css`)
- lucide-react for icons

## Design System
- Background `#0f1117`, surfaces `#161a23` / `#1d2230`, borders `#262c3a`
- Primary blue `#60a5fa`, alert orange `#f97316`
- Role accents: Site Manager `#60a5fa`, Supervisor `#34d399`, Technician `#e2e8f0`, Warehouse Manager `#fbbf24`, Project Manager `#a78bfa`
- Mobile-first; minimum 48px touch targets on interactive controls

## Auth
- `src/auth/AuthContext.jsx` — React context, persists logged-in user in `localStorage` under `synora.user`
- `src/auth/roles.js` — role definitions (`ROLES`, `ROLE_LIST`) and `DEMO_USERS`
- `RequireAuth` wrapper in `src/App.jsx` redirects unauthenticated visitors to `/login`
- `Login` supports `?as=<role_id>` query param to fast-login as any demo user

## Routing
- `/splash` — splash screen, auto-redirects after a short delay
- `/login` — email/password/role form + 5 demo-mode buttons
- `/` (layout) — `Home`, `/tasks`, `/messages`, `/messages/:channelId`, `/warehouse`, `/profile`

## Project Layout
- `src/main.jsx` — bootstraps React + AuthProvider + Router
- `src/App.jsx` — route table
- `src/components/layout/` — `Layout`, `Header` (role-accent bar/badge), `BottomNav` (5 tabs)
- `src/pages/Splash`, `Login`, `Home`, `Tasks`, `Messages`, `Warehouse`, `Profile`
- `src/pages/Home/` — dispatcher + 5 role-specific home files
- `src/data/sample.js` — sample zones, technicians, tasks, approvals, channels, messages, warehouse stock

## Replit Setup
- Workflow `Start application` runs `npm run dev` and serves the app on port 5000
- `vite.config.js` binds the dev/preview server to `0.0.0.0:5000` and sets `allowedHosts: true` for the Replit proxy

## Deployment
- Configured as a `static` deployment
- Build: `npm run build` → `dist/`
