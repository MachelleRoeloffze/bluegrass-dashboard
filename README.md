# Bluegrass Dashboard

A modern full-stack dashboard application built with:

- ✅ Next.js 13 App Router
- 🔐 Supabase Authentication with Google OAuth
- 🧠 PostgreSQL via Supabase for persistent storage
- 🧱 Modular components, clean architecture, and custom SCSS styling
- 🧪 TypeScript everywhere

---

## 📁 Folder Structure

```
bluegrass-dashboard/
├── .next/                         # Build artifacts (auto-generated)
├── node_modules/                  # Project dependencies
├── public/                        # Static assets
│   ├── fonts/
│   │   ├── icomoon.eot
│   │   ├── icomoon.svg
│   │   ├── icomoon.ttf
│   │   └── icomoon.woff
│   └── images/                    # Image assets
├── src/
│   ├── app/
│   │   ├── (dashboard)/           # Authenticated dashboard routes
│   │   │   ├── logs/
│   │   │   ├── practices/
│   │   │   ├── profile/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/                   # API route handlers
│   │   │   ├── auth/
│   │   │   │   ├── callback/
│   │   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── logout/
│   │   │       └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Root layout
│   │   ├── logout.tsx
│   │   └── not-found.tsx
│   ├── components/                # Reusable UI components
│   │   └── common/
│   │       ├── Badge.tsx
│   │       └── Card.tsx
│   ├── context/                   # React context (e.g. auth/user)
│   ├── data/                      # Mock data (optional)
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions (e.g., Supabase client, logging)
│   ├── store/                     # Global state (if Redux/Zustand used)
│   ├── styles/                    # SCSS modules
│   ├── types/                     # TypeScript types (e.g., Practice, Supabase)
│   └── utils/                     # Global utility helpers
├── .env.local                     # Environment variables
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

1. **Install dependencies**  
   `npm install`

2. **Set environment variables** in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3. **Run locally**  
   `npm run dev`

4. **Login via Google** (OAuth must be configured in Supabase & Google Console)

---

## ✅ Features

- Google OAuth via Supabase
- Reusable SCSS-styled components
- CRUD for "Practices"
- Logs user actions to Supabase `logs` table
- Responsive layout and clean dashboard UI

---

## 📦 Deployment

This app is Vercel-ready. Push to GitHub + link to Vercel = 🚀

---

## 📄 License

MIT
