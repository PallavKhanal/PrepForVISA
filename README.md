# PrepForVISA

An AI-powered F-1 student visa interview preparation platform. Users generate personalized interview questions, practice live mock interviews with an AI voice agent, and track their performance over time.

**Live:** [https://github.com/PallavKhanal/PrepForVISA](https://github.com/PallavKhanal/PrepForVISA)

---

## What It Does

### AI Question Generation
Users describe their profile — intended major, university, financial situation — and the app calls OpenRouter (Mistral 8x7b) to generate 10–15 realistic, challenging F-1 visa interview questions tailored to their specific case. Questions are saved automatically to Supabase and appear in the Previous Interviews history.

### Live Mock Voice Interviews
Users start a live simulated visa interview with an AI voice agent (Officer Mitchell) powered by Vapi AI. The agent is strict and decisive — it asks one question at a time, evaluates answers across 5–7 questions, and issues a real verdict (approved or denied). The call ends automatically when the officer delivers the closing phrase. Each session is saved with the full transcript, duration, and outcome.

### Smart Interview Progression
Before each mock interview starts, the app fetches the user's previous session transcripts from Supabase and passes all previously asked questions to the Vapi agent via `assistantOverrides.variableValues`. The agent is instructed not to repeat those questions, so every practice session covers new angles.

### Dashboard
A real-time dashboard powered by live Supabase data:
- **Mocks completed** with week-over-week trend
- **Approval rate** across all sessions
- **Total practice time**
- **Performance chart** — last 7 days of sessions mapped to a score (approved = 100, denied = 30, unknown = 60)
- **Activity feed** — combined mock interviews and question banks sorted by recency
- **Latest interviews table** — all sessions with outcome badge, type, and duration

### Previous Interviews
A history page with two tabs — Mock Interviews and Question Banks. Mock interview cards expand to show a full chat-style transcript (officer on the left, user on the right) with outcome badge and duration. Question bank cards expand to show the numbered list of generated questions.

### Expert Advice
A full-page guide covering how to answer F-1 visa interview questions — purpose, finances, home country ties, delivery style, example answers, and a day-before checklist.

### Support & Legal
A tabbed page with three documents:
- **Contact Us** — direct email links to `prepforvisainterview@gmail.com` with pre-filled subjects for billing, account deletion, and bug reports
- **Privacy Policy** — what data is collected, how it is stored, third-party services used, and user rights
- **Terms of Service** — acceptable use, payments, IP, liability, and the no-guarantee-of-visa-approval disclaimer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 18, JavaScript |
| Auth | Supabase Google OAuth |
| Database | Supabase (PostgreSQL) with Row Level Security |
| Voice AI | Vapi AI (`@vapi-ai/web`) |
| Question AI | OpenRouter — Mistral 8x7b via `openai` SDK |
| Payments | Stripe |
| UI | shadcn/ui (new-york) + Tailwind CSS v4 + Radix UI |
| Icons | Lucide React |

---

## Project Structure

```
app/
  page.js                          # Public landing page
  layout.js                        # Root layout (fonts, metadata)
  Provider.jsx                     # Fetches/creates user in Supabase; sets UserDetailContext
  auth/page.jsx                    # Google OAuth login
  legal/page.jsx                   # Public Support & Legal page (Contact / Privacy / Terms tabs)
  api/
    ai-model/route.jsx             # POST: generates questions via OpenRouter (server only)
  (main)/                          # Authenticated route group — shared sidebar layout
    layout.jsx                     # Dashboard layout with AppSideBar
    dashboard/
      page.jsx                     # Dashboard — live data from Supabase
      create-interview/            # AI question generation flow
      create-mock/                 # Live Vapi voice interview flow
    previous-interviews/
      page.jsx                     # Session history (mock interviews + question banks)
    our-advise/
      page.jsx                     # Expert F-1 interview advice guide
    billing/                       # Billing / subscription management
    donate-us/                     # Donate page

components/
  features/
    dashboard/                     # DashboardKPIs, PerformanceChart, ActivityFeed,
                                   # LatestInterviewList, WelcomeContainer
    create-interview/              # FormContainer, QuestionList, QuestionListContainer
    create-mock/                   # Interview (Vapi call), PostInterviewComponent
  ui/                              # shadcn/ui primitives

lib/
  constants.jsx                    # SidebarOptions nav array + QUESTIONS_PROMPT template
  supabase.js                      # Supabase client singleton
  utils.js                         # cn() helper (clsx + tailwind-merge)
```

---

## Database

Both tables have Row Level Security enabled — users can only read and write their own rows.

**`Users`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | From Google OAuth |
| email | text | Unique |
| picture | text | Profile photo URL |
| created_at | timestamptz | |

**`Interviews`** — AI-generated question banks
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| interview_id | uuid | Public identifier |
| user_email | text | |
| country | text | Always "USA" (F-1 only) |
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
| created_at | timestamptz | |

---

## Key Flows

**Auth**
`/auth` → Google OAuth → Supabase session → `app/Provider.jsx` checks `Users` table, inserts a new row on first login → user object available via `useUser()` hook throughout the app.

**Question Generation**
`/dashboard/create-interview` → user fills in a description → POST `/api/ai-model` → OpenRouter (Mistral) returns a JSON array of 10–15 questions → auto-saved to `Interviews` table → "View in History" navigates to `/previous-interviews`.

**Mock Interview**
`/dashboard/create-mock` → fetch last 3 session transcripts from `MockInterviews` → extract officer questions → `v.start(agentId, { variableValues: { previousTopics } })` → live voice call with Officer Mitchell → outcome detected from keyword matching on agent speech → call auto-ends on closing phrase → session saved to `MockInterviews` with transcript, duration, and outcome → `PostInterviewComponent` shown with verdict badge.

**Outcome Detection**
The app listens to Vapi `message` events. When the officer says a phrase matching `APPROVED_KEYWORDS` or `DENIED_KEYWORDS`, the outcome ref is set. When the officer says `"this concludes your interview"`, the call ends after a 3-second delay, preserving the final outcome before saving to Supabase.

---

## Vapi Agent — Officer Mitchell

The `VISA Officer` agent on Vapi is configured to:
- Conduct strict, efficient F-1 visa interviews capped at 5–7 questions
- Genuinely approve well-prepared applicants and deny weak ones — early denial if two consecutive answers are weak
- Never repeat questions from the user's previous sessions (passed in via `variableValues.previousTopics`)
- End the interview with the exact phrase `"This concludes your interview. Have a good day."` which triggers auto call-end in the client
- Speak slowly and ask one question at a time

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
| `OPENROUTER_API_KEY` | Server only | Used only in `app/api/ai-model/route.jsx` |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Client | Vapi SDK initialisation |
| `NEXT_PUBLIC_VAPI_AGENT_ID` | Client | ID of the Officer Mitchell agent |

---

## Getting Started

```bash
git clone https://github.com/PallavKhanal/PrepForVISA.git
cd prep-for-visa-interview
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

---

## Contact

**prepforvisainterview@gmail.com**
Built by [Pallav Khanal](https://github.com/PallavKhanal)
