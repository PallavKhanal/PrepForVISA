import Link from "next/link";
import { Shield, Mail, FileText, Check, ExternalLink, Info, ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="relative">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_280px] lg:gap-16 lg:px-8 lg:py-16">

        {/* ── Main ── */}
        <main className="space-y-10">

          {/* Hero */}
          <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-neutral-600">
              <Shield className="h-3.5 w-3.5" />
              PrepForVISA
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Support, Privacy & Terms
            </h1>

            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-700">
              Everything in one place — how to reach us, how we handle your data, and the rules that
              govern your use of PrepForVISA. We keep these documents plain and readable on purpose.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat label="Support Response" value="≤ 2 business days" />
              <Stat label="Data Jurisdiction" value="United States" />
              <Stat label="Governing Law" value="Texas, USA" />
            </div>
          </section>

          {/* ── CONTACT US ── */}
          <Section id="contact" title="Contact Us">
            <p>
              Have a question, found a bug, or need your account deleted? Email us directly — a real
              person reads every message. Use the quick links below to pre-fill the subject line.
            </p>

            {/* Primary email card */}
            <div className="rounded-xl border bg-neutral-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Email</p>
                  <p className="text-[15px] font-semibold text-neutral-900">prepforvisainterview@gmail.com</p>
                </div>
              </div>
              <p className="text-[14.5px] leading-7 text-neutral-700 mb-5">
                This is our primary support channel. Whether it is a billing dispute, a technical
                issue, or a privacy request — send it here and we will respond within two business
                days.
              </p>
              <a
                href="mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20Support"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Open in Mail App
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>

            {/* Quick actions */}
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  label: "Billing Issue",
                  desc: "Wrong charge, failed payment, or refund request.",
                  subject: "PrepForVISA%20-%20Billing%20Issue",
                },
                {
                  label: "Delete My Account",
                  desc: "Request full removal of your account and all data.",
                  subject: "PrepForVISA%20-%20Account%20Deletion%20Request",
                },
                {
                  label: "Report a Bug",
                  desc: "Something is broken or behaving unexpectedly.",
                  subject: "PrepForVISA%20-%20Bug%20Report",
                },
              ].map(({ label, desc, subject }) => (
                <a
                  key={label}
                  href={`mailto:prepforvisainterview@gmail.com?subject=${subject}`}
                  className="group rounded-xl border bg-white/70 p-4 backdrop-blur hover:border-neutral-400 hover:shadow-sm transition-all"
                >
                  <p className="text-[14px] font-semibold text-neutral-900 group-hover:underline">{label}</p>
                  <p className="mt-1 text-[13px] leading-6 text-neutral-500">{desc}</p>
                </a>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-dashed p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              <p className="text-[14px] leading-6 text-neutral-600">
                For privacy-related requests such as data access or deletion, include the email
                address associated with your account so we can locate your records quickly.
              </p>
            </div>
          </Section>

          {/* ── PRIVACY POLICY ── */}
          <Section id="privacy" title="Privacy Policy">
            <p>
              Last updated: <strong>February 2026</strong>. We collect only what we need to run the
              service, we never sell your data, and you can delete everything at any time.
            </p>

            <Card title="1 · Who We Are">
              <p className="text-[15px] leading-7 text-neutral-800">
                PrepForVISA is an AI-powered F-1 visa interview preparation platform operated by
                Pallav Khanal. Contact:{" "}
                <a href="mailto:prepforvisainterview@gmail.com" className="underline">
                  prepforvisainterview@gmail.com
                </a>
                .
              </p>
            </Card>

            <Card title="2 · Information We Collect">
              <ul className="space-y-2">
                {[
                  { label: "Account info", detail: "Your name, email address, and profile picture provided by Google when you sign in via Google OAuth." },
                  { label: "Interview data", detail: "The personal description you enter for question generation, the AI-generated questions, and the transcript of your mock voice interviews." },
                  { label: "Usage data", detail: "Session timestamps, interview outcomes, and practice session duration — used to power your dashboard." },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-2 text-[15px] leading-7">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span><strong>{label}:</strong> {detail}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="3 · How We Use Your Data">
              <ul className="space-y-2">
                {[
                  "Personalise and deliver the PrepForVISA service.",
                  "Generate AI interview questions tailored to your profile.",
                  "Store your practice history so you can review past sessions and track progress.",
                  "Avoid repeating the same questions across multiple practice sessions.",
                  "Respond to your support and legal requests.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] leading-7">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="4 · Storage & Security">
                <p className="text-[15px] leading-7 text-neutral-800">
                  All data is stored in Supabase (hosted on AWS in the United States). Your data is
                  isolated to your account via row-level security. We do not store your Google
                  password — authentication is handled entirely by Google.
                </p>
              </Card>

              <Card title="5 · Third-Party Services">
                <ul className="space-y-1 text-[14.5px] leading-7 text-neutral-800">
                  <li><strong>Google OAuth</strong> — sign-in only.</li>
                  <li><strong>Vapi AI</strong> — real-time voice processing; audio not stored by us.</li>
                  <li><strong>OpenRouter / Mistral</strong> — question generation from your description.</li>
                  <li><strong>Stripe</strong> — payment processing; we never see card details.</li>
                </ul>
              </Card>
            </div>

            <Card title="6 · Data Sharing">
              <p className="text-[15px] leading-7 text-neutral-800">
                We do not sell, rent, or share your personal information with any third party for
                marketing purposes. Data is shared only with the service providers listed above, and
                only as necessary to operate the platform.
              </p>
            </Card>

            <Card title="7 · Your Rights">
              <ul className="space-y-2">
                {[
                  { label: "Access", detail: "View all your interview history directly inside the app." },
                  { label: "Deletion", detail: "Request full account deletion at any time by emailing prepforvisainterview@gmail.com. We will process it within 7 days." },
                  { label: "Correction", detail: "Contact us to correct any inaccurate personal information we hold." },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-2 text-[15px] leading-7">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span><strong>{label}:</strong> {detail}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex items-start gap-3 rounded-xl border border-dashed p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              <p className="text-[14px] leading-6 text-neutral-600">
                We use session cookies only to keep you signed in. No advertising or third-party
                tracking cookies are used. We may update this policy; the date above will reflect
                any changes.
              </p>
            </div>
          </Section>

          {/* ── TERMS OF SERVICE ── */}
          <Section id="terms" title="Terms of Service">
            <p>
              Last updated: <strong>February 2026</strong>. By using PrepForVISA, you agree to
              these terms. Please read the disclaimer below carefully.
            </p>

            <section className="rounded-xl border border-neutral-300 bg-neutral-50 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-neutral-500 mb-2">Important Disclaimer</p>
              <p className="text-[15px] leading-7 font-medium text-neutral-900">
                PrepForVISA is a practice tool only. We make no representation, warranty, or
                guarantee that using this platform will result in a successful visa interview or visa
                approval. Visa decisions are made solely by U.S. consular officers. We are not
                affiliated with the U.S. Department of State or any government agency.
              </p>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="1 · Acceptance">
                <p className="text-[15px] leading-7 text-neutral-800">
                  By accessing or using PrepForVISA, you agree to be bound by these Terms. If you
                  do not agree, please do not use the platform.
                </p>
              </Card>
              <Card title="2 · Eligibility">
                <p className="text-[15px] leading-7 text-neutral-800">
                  You must be at least 18 years old, or at least 13 years old with verifiable
                  parental consent, to use PrepForVISA. By signing in you confirm you meet this
                  requirement.
                </p>
              </Card>
            </div>

            <Card title="3 · Acceptable Use">
              <p className="text-[15px] leading-7 text-neutral-800 mb-2">You agree not to:</p>
              <ul className="space-y-1.5">
                {[
                  "Use the platform for any unlawful purpose.",
                  "Scrape, reverse-engineer, or extract the AI models or prompts.",
                  "Impersonate any person or misrepresent your identity.",
                  "Submit content that is illegal, harmful, or violates third-party rights.",
                  "Abuse the platform in ways that incur disproportionate infrastructure costs.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] leading-7">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="4 · Account Responsibility">
                <p className="text-[15px] leading-7 text-neutral-800">
                  You are responsible for all activity under your account. Notify us immediately at{" "}
                  <a href="mailto:prepforvisainterview@gmail.com" className="underline">
                    prepforvisainterview@gmail.com
                  </a>{" "}
                  if you suspect unauthorised access.
                </p>
              </Card>
              <Card title="5 · Payments & Refunds">
                <p className="text-[15px] leading-7 text-neutral-800">
                  Paid plans are billed in advance via Stripe. Subscription fees are non-refundable
                  except where required by law. You may cancel at any time; access continues until
                  the end of the billing period.
                </p>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="6 · Intellectual Property">
                <p className="text-[15px] leading-7 text-neutral-800">
                  All content, branding, and code are owned by or licensed to Pallav Khanal.
                  AI-generated questions are for your personal use only. You may not reproduce or
                  sell any platform content without written permission.
                </p>
              </Card>
              <Card title="7 · Limitation of Liability">
                <p className="text-[15px] leading-7 text-neutral-800">
                  To the fullest extent permitted by law, PrepForVISA shall not be liable for
                  indirect, incidental, or consequential damages including visa denial, data loss,
                  or service interruption.
                </p>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="8 · Termination">
                <p className="text-[15px] leading-7 text-neutral-800">
                  We reserve the right to suspend or terminate your account at any time if you
                  violate these Terms or engage in behaviour harmful to the platform or other users.
                </p>
              </Card>
              <Card title="9 · Governing Law">
                <p className="text-[15px] leading-7 text-neutral-800">
                  These Terms are governed by the laws of the State of Texas, United States. Any
                  disputes shall be resolved in the courts of Tarrant County, Texas.
                </p>
              </Card>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-dashed p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              <p className="text-[14px] leading-6 text-neutral-600">
                We may update these Terms from time to time. The date at the top of this section
                will reflect changes. Continued use of the platform after an update constitutes
                acceptance of the revised Terms.
              </p>
            </div>
          </Section>

          {/* Closing */}
          <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-neutral-700" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Still have questions?</h3>
                <p className="mt-2 text-[15px] leading-7 text-neutral-700">
                  If anything on this page is unclear, or if you have a request that is not covered
                  here, email us at{" "}
                  <a
                    href="mailto:prepforvisainterview@gmail.com"
                    className="font-medium underline"
                  >
                    prepforvisainterview@gmail.com
                  </a>
                  . We will get back to you within two business days.
                </p>
              </div>
            </div>
          </section>

        </main>

        {/* ── Sticky TOC ── */}
        <aside className="top-20 hidden h-max lg:sticky lg:block">
          <nav className="rounded-xl border bg-white/70 p-5 text-sm shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4" />
              On this page
            </div>
            <ul className="space-y-1">
              <TocSection label="Contact Us" href="#contact" />
              <TocSection label="Privacy Policy" href="#privacy" />
              <TocSection label="Terms of Service" href="#terms" />
            </ul>

            <div className="mt-5 border-t pt-4">
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-2">Quick contact</p>
              <a
                href="mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20Support"
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] text-neutral-700 hover:border-neutral-400 hover:text-black transition-all"
              >
                <Mail className="h-3.5 w-3.5" />
                Send us an email
              </a>
            </div>
          </nav>
        </aside>

      </div>
    </div>
  );
}

/* ── Shared components ── */

function Section({ id, title, children }) {
  return (
    <section id={id} className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="prose mt-4 max-w-none space-y-4 prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-li:marker:text-neutral-400">
        {children}
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border p-5">
      {title && <h3 className="mb-3 text-[15px] font-semibold tracking-tight">{title}</h3>}
      <div className="text-[15px] leading-7 text-neutral-800">{children}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}

function TocSection({ label, href }) {
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
