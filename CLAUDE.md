# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Environment Variables

Required in `.env.local`:

| Variable | Exposure | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase anonymous key |
| `OPENROUTER_API_KEY` | Server-only | LLM API key (used in API routes only) |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Client | Vapi AI voice service key |
| `NEXT_PUBLIC_VAPI_AGENT_ID` | Client | Vapi agent ID for mock interviews |

## Architecture

### Tech Stack
- **Next.js 15** (App Router), **React 18**, JavaScript (not TypeScript)
- **Supabase** — auth (Google OAuth) + database
- **Vapi AI** (`@vapi-ai/web`) — real-time voice interview
- **OpenRouter** (Mistral 8x7b via `openai` SDK) — question generation
- **shadcn/ui** (new-york style) + **Tailwind CSS v4** + **Radix UI**

### Directory Layout

```
app/
  layout.js              # Root layout (fonts, metadata)
  page.js                # Public landing page
  Provider.jsx           # Root provider: fetches/creates user in Supabase, sets UserDetailContext
  api/ai-model/route.jsx # POST endpoint: calls OpenRouter to generate visa interview questions
  auth/page.jsx          # Google OAuth login via Supabase
  (main)/                # Route group: all authenticated pages share sidebar layout
    layout.jsx           # Dashboard layout wrapping DashboardProvider + AppSideBar
    Provider.jsx         # DashboardProvider
    _components/AppSideBar.jsx
    dashboard/           # Main dashboard + sub-features
      create-interview/  # Form → AI question generation → question list display
      create-mock/       # Vapi-powered live voice mock interview
services/
  supabaseClient.js      # Supabase client singleton
  Constants.jsx          # Sidebar nav options + QUESTIONS_PROMPT template
UserDetailContext.jsx    # React Context definition for user state
components/ui/           # shadcn/ui primitives
lib/utils.js             # cn() helper (clsx + tailwind-merge)
hooks/use-mobile.js      # Mobile breakpoint detection
```

### Key Data Flows

**Auth:** `app/auth/page.jsx` triggers Google OAuth → Supabase stores session → `app/Provider.jsx` checks `Users` table, inserts new row if first login → user `{name, email, picture}` stored in `UserDetailContext` → available via `useUser()` hook throughout the app.

**Question Generation:** `create-interview/` form collects country + description + duration → POST to `/api/ai-model` → OpenRouter (Mistral) with `QUESTIONS_PROMPT` from `services/Constants.jsx` → returns JSON array of 10–15 questions → displayed in `QuestionList`.

**Mock Interview:** `create-mock/` initializes Vapi SDK with public key + agent ID → requests camera/mic → live voice conversation → auto-ends at 3 minutes → `PostInterviewComponent` shown.

### Conventions
- Route groups like `(main)/` organize protected routes with shared layout without affecting the URL.
- Page-specific components live in `_components/` subdirectories alongside their `page.jsx`.
- `NEXT_PUBLIC_` prefix exposes variables to the browser; `OPENROUTER_API_KEY` is server-only and used only in `app/api/`.
- Path alias `@/` maps to the project root (configured in `jsconfig.json`).
- shadcn/ui components are installed into `components/ui/` and are plain `.jsx` files (not `.tsx`).
