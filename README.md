# PrepForVISA

A web application that helps students and professionals prepare for visa interviews using AI-generated practice questions and a live voice mock interview experience.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## About

PrepForVISA is a full-stack Next.js application designed to reduce the stress and uncertainty of visa interviews. Users sign in with Google, generate a personalized set of interview questions powered by an LLM, and then practice in a live voice mock interview session — all in one place.

---

## Features

- **Google OAuth Authentication** — Secure sign-in via Supabase Auth.
- **AI Question Generation** — Submits country, study/travel description, and duration to generate 10–15 tailored visa interview questions via OpenRouter (Mistral 8x7b).
- **Live Voice Mock Interview** — Real-time voice conversation powered by Vapi AI, auto-ending after 3 minutes with a post-interview summary.
- **Dashboard** — Central hub to access all features.
- **Expert Advice Page** — Curated tips on body language, documentation, and interview etiquette.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript (React 18) |
| Auth & Database | Supabase (Google OAuth + PostgreSQL) |
| AI / LLM | OpenRouter — Mistral 8x7b (via `openai` SDK) |
| Voice AI | Vapi AI (`@vapi-ai/web`) |
| UI | shadcn/ui (new-york) + Tailwind CSS v4 + Radix UI |
| Icons | Lucide React |

---

## Project Structure

```
prep-for-visa-interview/
├── app/
│   ├── layout.js                   # Root layout (fonts, metadata)
│   ├── page.js                     # Public landing page
│   ├── Provider.jsx                # Root provider: user auth + context
│   ├── globals.css
│   ├── api/
│   │   └── ai-model/route.jsx      # POST: generates visa questions via OpenRouter
│   ├── auth/
│   │   └── page.jsx                # Google OAuth login
│   └── (main)/                     # Protected route group (shared sidebar layout)
│       ├── layout.jsx
│       ├── Provider.jsx            # Dashboard context provider
│       ├── dashboard/
│       │   ├── page.jsx            # Main dashboard
│       │   ├── create-interview/   # AI question generation flow
│       │   └── create-mock/        # Vapi voice mock interview
│       ├── our-advise/page.jsx     # Expert tips
│       ├── about-me/page.jsx
│       └── donate-us/page.jsx
├── components/
│   └── ui/                         # shadcn/ui primitives
├── services/
│   ├── supabaseClient.js           # Supabase client singleton
│   └── Constants.jsx               # Nav options + AI prompt template
├── hooks/
│   └── use-mobile.js               # Mobile breakpoint hook
├── lib/
│   └── utils.js                    # cn() helper (clsx + tailwind-merge)
├── UserDetailContext.jsx            # React Context for user state
└── supabase/                        # Supabase config / migrations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project with Google OAuth enabled
- An [OpenRouter](https://openrouter.ai) API key
- A [Vapi AI](https://vapi.ai) account with a configured agent

### Installation

```bash
git clone https://github.com/PallavKhanal/PrepForVISA.git
cd prep-for-visa-interview
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
NEXT_PUBLIC_VAPI_AGENT_ID=your_vapi_agent_id
```

> `OPENROUTER_API_KEY` is server-only and never exposed to the browser. All `NEXT_PUBLIC_` variables are accessible client-side.

### Running the App

```bash
npm run dev       # Start development server → http://localhost:3000
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Usage

1. Visit the app and sign in with your Google account.
2. From the dashboard, go to **Create Interview** — enter your destination country, a brief description of your purpose, and intended duration.
3. The app generates a personalized set of visa interview questions.
4. Go to **Create Mock** to start a live voice mock interview session. The session auto-ends after 3 minutes.
5. Review the post-interview summary and refine your answers.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

**Pallav Khanal** — [GitHub](https://github.com/PallavKhanal)

Project Link: [https://github.com/PallavKhanal/PrepForVISA](https://github.com/PallavKhanal/PrepForVISA)
