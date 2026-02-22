# PrepForVISA

An AI-powered F-1 student visa interview preparation platform. Users generate personalized interview questions, practice live voice mock interviews with an AI consular officer, receive structured AI feedback, and track performance over time.

**Live:** [https://prepforvisa.com](https://prepforvisa.com)

---

## Features

### AI Question Generation
Users describe their profile — intended major, U.S. university, financial situation — and the app calls OpenRouter (Mistral 8x7b) to generate 10–15 realistic, tailored F-1 visa interview questions. Questions are saved automatically to Supabase and accessible from the Previous Interviews history.

### Live Mock Voice Interviews
Users start a live simulated visa interview with an AI voice agent (Officer Mitchell) powered by Vapi AI. The agent is strict and decisive — it asks one question at a time across 5–7 questions and issues a real verdict (approved or denied). The call ends automatically when the officer delivers the closing phrase. Each session is saved with the full transcript, duration, and outcome.

### AI Interview Feedback
After every mock session, the transcript is analyzed by OpenRouter (Mistral 8x7b) via the `/api/generate-feedback` endpoint. The model acts as an expert F-1 interview coach and returns a structured JSON report with:
- **Score** (1–10) based on answer quality and credibility
- **Summary** — 2–3 sentence overall assessment
- **Strong Points** — what the applicant did well
- **Weak Points** — gaps in clarity, credibility, or completeness
- **Improvements** — specific, actionable changes for future sessions

Feedback is displayed immediately on the post-interview screen and stored with the session so it can be reviewed later in Previous Interviews.

### Smart Interview Progression
Before each mock interview starts, the app fetches the user's previous session transcripts from Supabase and passes all previously asked questions to the Vapi agent via `assistantOverrides.variableValues`. The agent is instructed not to repeat those questions, so every practice session covers new ground.

### Dashboard
A real-time dashboard powered by live Supabase data:
- **Mocks completed** with week-over-week trend
- **Approval rate** across all sessions
- **Total practice time**
- **Performance chart** — last 7 days of sessions mapped to a score (approved = 100, denied = 30, unknown = 60)
- **Activity feed** — combined mock interviews and question banks sorted by recency
- **Latest interviews table** — all sessions with outcome badge, type, and duration

### Previous Interviews
A full history page with tabbed filtering — All, Mock Interviews, and Question Banks. Mock interview cards expand to show a full chat-style transcript (officer on the left, user on the right), the outcome badge, duration, and the stored AI feedback. Question bank cards expand to show the numbered list of generated questions.

### Billing & Plans
A billing page that shows the user's current plan, monthly usage across mock interviews and question banks, and the full plan comparison:

| Plan | Mock Interviews / mo | Question Banks / mo |
|------|---------------------|---------------------|
| Free | 2 | 2 |
| Pro *(coming soon)* | 7 | 5 |
| Max *(coming soon)* | 15 | 8 |

Usage is tracked against a rolling monthly window (reset on the 1st of each month). Users who hit their limit are blocked from starting new sessions and directed to the billing page. Paid plans are in development; all upgrades are free during the beta period.

### Expert Advice
A full-page guide covering how to answer F-1 visa interview questions — purpose, finances, home country ties, delivery style, example answers, and a day-before checklist.

### Support & Legal
A tabbed page with:
- **Contact Us** — direct email links with pre-filled subjects for billing, account deletion, and bug reports
- **Privacy Policy** — what data is collected, how it is stored, third-party services used, and user rights
- **Terms of Service** — acceptable use, payments, IP, liability, and the no-guarantee-of-visa-approval disclaimer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 18, JavaScript |
| Auth | Supabase Google OAuth |
| Database | Supabase (PostgreSQL) |
| Voice AI | Vapi AI (`@vapi-ai/web`) |
| LLM | OpenRouter — Mistral 8x7b via `openai` SDK |
| UI | shadcn/ui (new-york) + Tailwind CSS v4 + Radix UI |
| Icons | Lucide React |

---

## Project Structure

```
app/
  page.js                          # Public landing page
  layout.js                        # Root layout (fonts, metadata)
  Provider.jsx                     # Root provider: fetches/creates user, sets UserDetailContext
  auth/page.jsx                    # Google OAuth login
  legal/page.jsx                   # Support & Legal (Contact / Privacy / Terms)
  api/
    ai-model/route.jsx             # POST: generates interview questions via OpenRouter
    generate-feedback/route.jsx    # POST: generates AI feedback from session transcript
  (main)/                          # Authenticated route group — shared sidebar layout
    layout.jsx                     # Dashboard layout with AppSideBar
    Provider.jsx                   # DashboardProvider
    dashboard/
      page.jsx                     # Dashboard — KPIs, chart, activity feed, session table
      create-interview/            # AI question generation flow
      create-mock/                 # Live Vapi voice interview flow
    previous-interviews/
      page.jsx                     # Session history with tabs and feedback viewer
    our-advise/
      page.jsx                     # Expert F-1 interview advice guide
    billing/
      page.jsx                     # Plan management and usage tracking
    donate-us/
      page.jsx                     # Support the project

components/
  features/
    dashboard/                     # DashboardKPIs, PerformanceChart, ActivityFeed,
                                   # LatestInterviewList, WelcomeContainer, CreateOptions
    create-interview/              # FormContainer, QuestionList, QuestionListContainer,
                                   # InterviewLink
    create-mock/                   # InterviewIntro (plan check), Interview (Vapi),
                                   # PostInterviewComponent, FeedbackCard
  layout/
    AppSideBar.jsx                 # Sidebar navigation
    TopHeader.jsx                  # Top header
  ui/                              # shadcn/ui primitives

lib/
  constants.js                     # SidebarOptions nav array + QUESTIONS_PROMPT template
  supabase.js                      # Supabase client singleton
  utils.js                         # cn() helper (clsx + tailwind-merge)

hooks/
  use-mobile.js                    # Mobile breakpoint detection
```

---

## Database

**`Users`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | From Google OAuth |
| email | text | Unique |
| picture | text | Profile photo URL |
| plan | text | `free` / `pro` / `max` — defaults to `free` |
| created_at | timestamptz | |

**`Interviews`** — AI-generated question banks
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| interview_id | uuid | Public identifier |
| user_email | text | |
| country | text | Always `"USA"` (F-1 only) |
| description | text | User's profile description |
| questions | jsonb | Array of question strings |
| created_at | timestamptz | |

**`MockInterviews`** — Live Vapi voice sessions
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| call_id | text | Vapi call ID |
| user_email | text | |
| duration_seconds | integer | |
| outcome | text | `approved` / `denied` / `unknown` |
| transcript | jsonb | Array of `{ role, text }` objects |
| feedback | jsonb | AI feedback report (`score`, `summary`, `strongPoints`, `weakPoints`, `improvements`) |
| created_at | timestamptz | |

---

## Key Flows

**Auth**
`/auth` → Google OAuth → Supabase session → `app/Provider.jsx` checks `Users` table, inserts a new row on first login → subscribes to `onAuthStateChange` for account switching → user object available via `useUser()` hook throughout the app.

**Question Generation**
`/dashboard/create-interview` → user fills in a description → POST `/api/ai-model` → OpenRouter (Mistral 8x7b) returns a JSON array of 10–15 questions → auto-saved to `Interviews` table → "View in History" navigates to `/previous-interviews`.

**Mock Interview**
`/dashboard/create-mock` → plan limit check (monthly usage vs. plan tier) → fetch last 3 session transcripts → extract officer questions → `v.start(agentId, { variableValues: { previousTopics } })` → live voice call with Officer Mitchell → outcome detected from keyword matching on agent speech → call auto-ends on closing phrase → session saved to `MockInterviews` with transcript, duration, and outcome → `PostInterviewComponent` shown.

**AI Feedback**
After the session is saved, `PostInterviewComponent` calls `/api/generate-feedback` with the transcript and outcome. The endpoint authenticates the request via Supabase Bearer token, sends the transcript to OpenRouter, parses the JSON response, and returns the structured report. The feedback is displayed immediately on-screen; the session record in Supabase is updated with the stored report so it appears in Previous Interviews.

**Outcome Detection**
The app listens to Vapi `message` events. When the officer says a phrase matching `APPROVED_KEYWORDS` or `DENIED_KEYWORDS`, the outcome ref is set. When the officer says `"this concludes your interview"`, the call ends after a 3-second delay, preserving the final outcome before saving.

---

## Vapi Agent — Officer Mitchell

The `VISA Officer` agent on Vapi is configured to:
- Conduct strict, efficient F-1 visa interviews capped at 5–7 questions
- Genuinely approve well-prepared applicants and deny weak ones — early denial if two consecutive answers are weak
- Never repeat questions from the user's previous sessions (passed in via `variableValues.previousTopics`)
- End the interview with the exact phrase `"This concludes your interview. Have a good day."` — the client listens for this to trigger auto call-end
- Speak at a measured pace and ask one question at a time

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENROUTER_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
NEXT_PUBLIC_VAPI_AGENT_ID=
```

| Variable | Exposure | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase anonymous key |
| `OPENROUTER_API_KEY` | Server only | Used in `api/ai-model` and `api/generate-feedback` routes |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Client | Vapi SDK initialisation |
| `NEXT_PUBLIC_VAPI_AGENT_ID` | Client | ID of the Officer Mitchell agent |

---

## Getting Started

```bash
git clone https://github.com/PallavKhanal/PrepForVISA.git
cd prep-for-visa-interview
npm install

# Add required environment variables to .env.local
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Contact

**prepforvisainterview@gmail.com**
Built by [Pallav Khanal](https://github.com/PallavKhanal)
