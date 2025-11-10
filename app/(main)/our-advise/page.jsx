// app/(main)/our-advise/page.jsx
import { Check, X, Info, ArrowRight, FileText, Shield } from "lucide-react";

export default function OurAdvisePage() {
  return (
    <div className="relative">
      {/* Subtle background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_280px] lg:gap-16 lg:px-8 lg:py-16">
        {/* Main */}
        <main className="space-y-10">
          {/* Hero / Intro */}
          <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-neutral-600">
              <Shield className="h-3.5 w-3.5" />
              F-1 Interview Preparation
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Our Advise to F-1 Visa Applicants
            </h1>

            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-700">
              This page is designed to feel like a one-to-one mentor session. You’ll find what to
              say, how to say it, and how to present your finances and intent with complete clarity.
              Keep your answers short, factual, and personal. Confidence comes from preparation, not
              memorization.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat label="Interview Length" value="60–120 sec" />
              <Stat label="Answer Style" value="Short • Direct" />
              <Stat label="Primary Risk" value="Weak Finances" />
            </div>
          </section>

          {/* Purpose */}
          <Section id="purpose" title="Define a Clear Purpose">
            <p>
              The officer is checking that your plan makes sense. Link{" "}
              <strong>your background → your major → this university → a role back home</strong>.
              Use your real story; avoid generic lines.
            </p>

            <Card title="Answer Frame">
              <Bullets
                items={[
                  "Who you are and what you’ve done so far.",
                  "Why this major is a logical next step.",
                  "Why this specific university (curriculum, labs, location, cost).",
                  "How the program connects to a role you can actually pursue at home.",
                ]}
              />
            </Card>

            <Card title="Personal Template">
              <Mono>
                {`I completed [background]. I chose [major] to build [specific skills].
This university fits because of [2 concrete reasons].
After graduation, I will return to [home country] to work as [role] at [type of org],
where these skills are directly required.`}
              </Mono>
            </Card>
          </Section>

          {/* Finances */}
          <Section id="finances" title="Present Finances Without Gaps">
            <p>
              Your financials must be self-contained for year one and credible for the full
              program. Explain sources, stability, and access. Do not imply dependence on U.S.
              employment.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="What to State Clearly">
                <Checklist
                  items={[
                    "Who is sponsoring you (name and relationship).",
                    "How they earn (job title, business, years, typical annual income).",
                    "Liquid funds available for Year 1 fees and living.",
                    "Scholarships or tuition reductions (exact amounts).",
                    "Any fixed deposits or education loans (with sanction).",
                  ]}
                />
              </Card>

              <Card title="What to Avoid">
                <Crosslist
                  items={[
                    "Depending on part-time work to fund tuition.",
                    "Vague business income with no scale or duration.",
                    "Totals that do not cover I-20 estimate.",
                    "Contradicting numbers across statements vs. what you say.",
                  ]}
                />
              </Card>
            </div>

            <Card title="Concise Finance Script">
              <Mono>
                {`My sponsor is [name], my [relation], employed as [title] at [company] for [years].
Annual income is about [amount]. We have [amount] in savings for Year 1.
My I-20 shows [tuition] + [living]. I also have a scholarship of [amount].
We are not relying on income in the U.S. to fund my studies.`}
              </Mono>
            </Card>
          </Section>

          {/* Ties */}
          <Section id="ties" title="Show Natural Ties to Home">
            <p>
              Do not over-explain. State what already exists in your life and plan. The degree is a
              step, not an escape.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <MiniCard title="Personal" items={["Immediate family", "Community roots"]} />
              <MiniCard title="Professional" items={["Role aligned to degree", "Market demand"]} />
              <MiniCard title="Practical" items={["Property or responsibilities", "Existing network"]} />
            </div>

            <Card title="One-Line Tie">
              <Mono>
                {`My plan requires U.S. training in [specific area], then I’m returning to [home city]
to work as [role] where these skills are in demand.`}
              </Mono>
            </Card>
          </Section>

          {/* Delivery */}
          <Section id="delivery" title="Deliver Answers Like a Professional">
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Style">
                <Bullets
                  items={[
                    "Stand straight, be still, maintain natural eye contact.",
                    "Keep answers 1–2 sentences; stop when finished.",
                    "If unclear, ask to repeat once, then answer.",
                    'If you don’t know, say “I will verify that.”',
                  ]}
                />
              </Card>
              <Card title="Practice Prompt">
                <Mono>
                  {`Explain your choice of university in 15 seconds.
Mention 2 specific program features and 1 career link.
Stop talking once you’ve answered.`}
                </Mono>
              </Card>
            </div>
          </Section>

          {/* Core Script */}
          <Section id="script" title="Core Interview Track (90 Seconds)">
            <ol className="list-decimal space-y-3 pl-6 text-[15px] leading-7 text-neutral-800">
              <li>Who you are and recent background.</li>
              <li>Why this major now, in one sentence.</li>
              <li>Why this university, with two concrete academic reasons.</li>
              <li>How you are paying (sponsor, income, liquid funds, scholarship).</li>
              <li>What you will do after graduation and where.</li>
            </ol>
          </Section>

          {/* Examples */}
          <Section id="examples" title="Concise Example Answers">
            <div className="grid gap-4 md:grid-cols-2">
              <Example
                q="Why this university?"
                a="It offers a structured track in [focus] with [lab/professor/course],
and the capstone aligns with the tools used by [industry in home country]."
              />
              <Example
                q="How will you fund your studies?"
                a="My mother, a senior accountant at [company] for 12 years, sponsors me.
Annual income is about [amount]. We’ve allocated [amount] for Year 1 and I have a
[amount] scholarship. We’re not relying on U.S. income."
              />
              <Example
                q="What after graduation?"
                a="Return to [home country] for a [role] at [type of company], where this program’s
tools are standard. My goal is to build expertise and lead projects in [area]."
              />
              <Example
                q="Do you plan to work in the U.S.?"
                a="My purpose is education. If the program offers authorized practical training,
I’ll use it to gain project exposure, then return to [home country] for my role."
              />
            </div>
          </Section>

          {/* Checklist */}
          <Section id="checklist" title="Day-Before Checklist">
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Carry">
                <Checklist
                  items={[
                    "Passport, I-20 (signed), SEVIS fee receipt, DS-160 confirmation.",
                    "Admission and scholarship letters.",
                    "Bank statements/letters, loan sanction (if any), income proofs.",
                    "Academic transcripts, test scores if requested by university.",
                  ]}
                />
              </Card>
              <Card title="Prepare">
                <Checklist
                  items={[
                    "Numbers you will actually say (tuition, living, totals).",
                    "Two program details you can state quickly.",
                    "Sponsor occupation, tenure, and income.",
                    "One clear post-graduation plan in home country.",
                  ]}
                />
              </Card>
            </div>
          </Section>

          {/* Closing */}
          <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Info className="mt-1 h-5 w-5 text-neutral-700" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Final Guidance</h3>
                <p className="mt-2 text-[15px] leading-7 text-neutral-700">
                  Speak like a person who has already made a sound decision. Be brief, factual, and
                  consistent with your documents. Confidence comes from clarity and practice.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  Rehearse your three core answers: university, finances, and post-graduation plan.
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Sidebar / TOC */}
        <aside className="top-20 hidden h-max lg:sticky lg:block">
          <nav className="rounded-xl border bg-white/70 p-5 text-sm shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4" />
              On this page
            </div>
            <ul className="space-y-2">
              <TocLink href="#purpose" label="Define a Clear Purpose" />
              <TocLink href="#finances" label="Present Finances" />
              <TocLink href="#ties" label="Ties to Home" />
              <TocLink href="#delivery" label="Delivery" />
              <TocLink href="#script" label="Core Track" />
              <TocLink href="#examples" label="Example Answers" />
              <TocLink href="#checklist" label="Day-Before Checklist" />
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Small Presentational Components ---------- */

function Section({ id, title, children }) {
  return (
    <section id={id} className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="prose mt-3 max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-li:marker:text-neutral-400">
        {children}
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border p-5">
      {title ? <h3 className="mb-2 text-[15px] font-semibold tracking-tight">{title}</h3> : null}
      <div className="text-[15px] leading-7 text-neutral-800">{children}</div>
    </div>
  );
}

function MiniCard({ title, items }) {
  return (
    <div className="rounded-xl border p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-2 list-disc pl-5 text-[14.5px] leading-7 text-neutral-800">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul className="list-disc pl-5 text-[15px] leading-7 text-neutral-800">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function Checklist({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-[15px] leading-7">
          <Check className="mt-1 h-4 w-4 shrink-0" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Crosslist({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-[15px] leading-7">
          <X className="mt-1 h-4 w-4 shrink-0" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Example({ q, a }) {
  return (
    <div className="rounded-xl border p-5">
      <div className="text-[13px] font-semibold uppercase tracking-wide text-neutral-500">Example</div>
      <div className="mt-1 text-[15px] font-medium">Q: {q}</div>
      <pre className="mt-2 whitespace-pre-wrap rounded-md border bg-neutral-50 p-3 text-[14px] leading-7">
        {`A: ${a}`}
      </pre>
    </div>
  );
}

function Mono({ children }) {
  return (
    <pre className="whitespace-pre-wrap rounded-md border bg-neutral-50 p-3 text-[14px] leading-7">
      {children}
    </pre>
  );
}

function TocLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="block rounded-md px-2 py-1.5 text-neutral-700 transition hover:bg-neutral-100"
      >
        {label}
      </a>
    </li>
  );
}
