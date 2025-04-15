# Bluegrass Dashboard

A modern full-stack dashboard application built with:

- ✅ Next.js 13 App Router
- 🔐 Supabase email/password authentication (no OAuth)
- 🧠 PostgreSQL via Supabase for persistent storage
- 🧱 Modular components, clean architecture, and custom SCSS styling
- 🧪 TypeScript throughout

---

## 📁 Folder Structure

```
bluegrass-dashboard/
├── .next/                         # Build artifacts
├── node_modules/                  # Dependencies
├── public/                        # Static assets
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (dashboard)/           # Authenticated dashboard routes
│   │   │   ├── logs/
│   │   │   ├── practices/
│   │   │   ├── profile/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── logout/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── logout.tsx
│   │   ├── not-found.tsx
│   │   └── layout.tsx             # Root layout
│   ├── components/                # Reusable UI
│   │   └── common/
│   ├── context/                   # React context (e.g. user)
│   ├── data/                      # Static/mock data
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Utils (e.g., supabaseClient)
│   ├── store/                     # Zustand/Redux state
│   ├── styles/                    # SCSS stylesheets
│   ├── types/                     # Type definitions
│   └── utils/                     # Global utilities
├── .env.local                     # Env variables
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Set environment variables** in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

3. **Run locally**  
   ```bash
   npm run dev
   ```

4. **Login with email/password**  
   Authentication is handled by Supabase with custom login and signup pages.

---

## ✅ Features

- Supabase authentication (email/password)
- Reusable SCSS-styled UI components
- CRUD for "Practices" module
- User activity logs stored in Supabase `logs` table
- Responsive, clean dashboard layout
- Custom 404 page with animated UI

---

## 📦 Deployment

This app is Vercel-ready:  
Just push to GitHub and link the repo on [vercel.com](https://vercel.com).

---

## 📄 License

MIT