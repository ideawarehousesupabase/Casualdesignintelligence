# KitchenIQ — Causal Decision Intelligence for Perishable Food Operations

An MVP prototype dashboard for commercial kitchens. Helps operators reduce
food waste, optimise production, and stay audit-ready in real time through
causal intelligence and digital kitchen workflow tracking.

> Note on stack: the spec asked for **Next.js**, but this project ships on
> **TanStack Start + React + Vite** (the platform-supported stack). All other
> requirements are honoured. Env vars use the Vite-required `VITE_` prefix
> instead of `NEXT_PUBLIC_`.

## Tech Stack
- React 19 + TanStack Start (file-based routing, SSR-ready)
- Tailwind CSS v4
- Firebase Firestore — **used only as a CRUD document store for users**
- Recharts for analytics
- Framer Motion for animations
- Lucide React icons

## Auth model (per spec)
- **No Firebase Auth SDK is used.**
- Signup writes a user document into the `users` Firestore collection.
- Login fetches the matching email document and compares the password manually.
- Session is persisted in `localStorage` under `kitchenai_session`.
- All dashboard routes are wrapped in a client-side `<Protected>` guard.

## Project setup
```bash
bun install      # or: npm install
bun dev          # or: npm run dev
```

## Environment setup
1. Copy `.env.example` → `.env`
2. Fill in your Firebase web-app keys (Project Settings → General → Your apps).
3. Restart the dev server.

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
`.env` is gitignored — never commit it.

## Firebase setup
1. Create a Firebase project at https://console.firebase.google.com.
2. Add a **Web app** to the project and copy its config into `.env`.
3. Enable **Cloud Firestore** in *Production mode* (or *Test mode* for local
   development).
4. Create a collection named `users` (it is created automatically on first
   signup if it doesn't exist).
5. Recommended Firestore rules (development only):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{doc} {
         allow read, write: if true; // tighten for production
       }
     }
   }
   ```

## Folder structure
```
src/
  components/      # Reusable UI (AppLayout, Protected, Kpi)
  routes/          # File-based pages (login, signup, dashboard, …)
  services/        # Firebase CRUD services (userService)
  firebase/        # Firebase init + config (env-driven)
  hooks/           # React hooks (useAuth)
  mock-data/       # Mock operational dataset (waste, alerts, etc.)
  styles.css       # Tailwind + design tokens
```

## Pages
- `/login`, `/signup`
- `/dashboard` — KPI cards, waste trend, triple cost, ingredient usage
- `/production` — Batch monitoring + production timeline
- `/alerts` — Prescriptive AI recommendations (mock)
- `/causal` — Root-cause drivers + causal chain + counterfactual
- `/digital-twin` — Ingredient lifecycle (Delivery → Disposal)
- `/inventory` — Perishable inventory + waste-risk
- `/waste` — Triple cost + waste category analytics
- `/esg` — UK Waste Regs, HACCP, NHS DTAC, GDPR
- `/integrations` — POS / ERP / API integration cards
- `/edge` — Offline & edge node health
- `/reports` — Downloadable report cards

## Notes
- All analytics use mock datasets in `src/mock-data/operations.ts`.
- No real AI model is wired — alerts/insights are static.
- No payment gateway, no admin panel, no Firebase Auth — per spec.
EOF