# Synora — Operations Management

## Overview
Synora is a single-page React application for automotive integration operations management. It includes pages for Dashboard, Projects, Inventory, Work Orders, and Settings.

## Tech Stack
- React 19 + React Router 7
- Vite 8 (dev/build)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- lucide-react for icons

## Project Layout
- `index.html` — Vite entry HTML
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — Routes / app shell
- `src/pages/` — Route-level pages
- `src/components/` — Shared UI components
- `src/index.css` — Tailwind styles
- `public/` — Static assets (favicon, icons)

## Replit Setup
- Workflow `Start application` runs `npm run dev` and serves the app on port 5000.
- `vite.config.js` binds the dev/preview server to `0.0.0.0:5000` and sets `allowedHosts: true` so the Replit preview iframe (proxied host) is accepted.

## Deployment
- Configured as a `static` deployment.
- Build: `npm run build` → outputs to `dist/`.
- Publish from the Replit Publishing tool.
