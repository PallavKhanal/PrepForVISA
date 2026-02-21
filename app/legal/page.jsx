"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shield, Mail, FileText, Check, ExternalLink, Info, ArrowLeft } from "lucide-react";

const TABS = [
  { label: "Contact Us", icon: Mail },
  { label: "Privacy Policy", icon: Shield },
  { label: "Terms of Service", icon: FileText },
];

export default function LegalPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">

        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-neutral-600">
            <Shield className="h-3.5 w-3.5" />
            PrepForVISA
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Support & Legal</h1>
          <p className="mt-3 text-[15px] leading-7 text-neutral-600">
            Contact us, read our privacy policy, or review our terms of service.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex gap-1 rounded-xl border bg-white/70 p-1 shadow-sm backdrop-blur">
          {TABS.map(({ label, icon: Icon }, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                active === i
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {active === 0 && <ContactPage />}
        {active === 1 && <PrivacyPage />}
        {active === 2 && <TermsPage />}

      </div>
    </div>
  );
}

/* ─────────────── CONTACT ─────────────── */

function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <h2 className="text-2xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="mt-3 text-[15px] leading-7 text-neutral-700">
          A real person reads every message. Whether you have a billing issue, a bug to report, or
          need your account deleted — email us and we will get back to you within two business days.
        </p>

        {/* Email card */}
        <div className="mt-6 flex items-center gap-4 rounded-xl border bg-neutral-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-black">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Primary support email</p>
            <p className="text-[15px] font-semibold text-neutral-900 truncate">prepforvisainterview@gmail.com</p>
          </div>
          <a
            href="mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20Support"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Send email
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* Quick actions */}
      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <h2 className="text-xl font-semibold tracking-tight">Common Requests</h2>
        <p className="mt-2 text-[14.5px] leading-7 text-neutral-600">
          Click a topic to open your email app with the subject pre-filled.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Billing Issue",
              desc: "Wrong charge, failed payment, or refund.",
              subject: "PrepForVISA%20-%20Billing%20Issue",
            },
            {
              label: "Delete My Account",
              desc: "Full removal of your account and all data.",
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
      </section>

      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
          <div>
            <h3 className="text-[15px] font-semibold">Privacy & data requests</h3>
            <p className="mt-1 text-[14.5px] leading-7 text-neutral-700">
              For account deletion or data access requests, include the email address linked to
              your account so we can locate your records. We process all data requests within 7
              business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── PRIVACY POLICY ─────────────── */

function PrivacyPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Privacy Policy</div>
        <h2 className="text-2xl font-semibold tracking-tight">How We Handle Your Data</h2>
        <p className="mt-3 text-[15px] leading-7 text-neutral-700">
          Last updated: <strong>February 2026</strong>. We collect only what is necessary to run
          the service, we never sell your data, and you can request deletion at any time.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat label="Data sold to third parties" value="Never" />
          <Stat label="Storage location" value="United States" />
          <Stat label="Deletion response" value="Within 7 days" />
        </div>
      </section>

      <DocSection title="1. Who We Are">
        <p>
          PrepForVISA is an AI-powered F-1 visa interview preparation platform operated by Pallav
          Khanal. For any privacy-related questions, contact us at{" "}
          <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium">
            prepforvisainterview@gmail.com
          </a>
          .
        </p>
      </DocSection>

      <DocSection title="2. Information We Collect">
        <CheckList
          items={[
            { label: "Account information", detail: "Your name, email address, and profile picture provided by Google when you sign in via Google OAuth." },
            { label: "Interview data", detail: "The personal description you enter for question generation, the AI-generated questions, and the transcript of your mock voice interviews." },
            { label: "Usage data", detail: "Session timestamps, interview outcomes, and practice session durations used to power your dashboard." },
          ]}
        />
      </DocSection>

      <DocSection title="3. How We Use Your Information">
        <CheckList
          items={[
            { detail: "Personalise and deliver the PrepForVISA service." },
            { detail: "Generate AI interview questions tailored to your profile description." },
            { detail: "Store your practice history so you can review sessions and track progress." },
            { detail: "Avoid repeating the same interview questions across multiple practice sessions." },
            { detail: "Respond to your support, billing, and legal requests." },
          ]}
        />
      </DocSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <DocSection title="4. Data Storage & Security">
          <p>
            All data is stored in Supabase, hosted on AWS infrastructure in the United States.
            Your data is isolated to your account using row-level security policies. We do not
            store your Google password — authentication is handled entirely by Google.
          </p>
        </DocSection>

        <DocSection title="5. Data Sharing">
          <p>
            We do not sell, rent, or share your personal information with any third party for
            marketing purposes. Data is only shared with the service providers below and only as
            necessary to operate the platform.
          </p>
        </DocSection>
      </div>

      <DocSection title="6. Third-Party Services">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Google OAuth", role: "Sign-in only. We receive your name, email, and profile picture." },
            { name: "Vapi AI", role: "Processes your voice in real time during mock interviews. Audio is not stored by us." },
            { name: "OpenRouter / Mistral", role: "Generates interview questions from the description you provide." },
            { name: "Stripe", role: "Handles all payment processing. We never store your card details." },
          ].map(({ name, role }) => (
            <div key={name} className="rounded-xl border p-4">
              <p className="text-[14px] font-semibold text-neutral-900">{name}</p>
              <p className="mt-1 text-[13.5px] leading-6 text-neutral-600">{role}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="7. Your Rights">
        <CheckList
          items={[
            { label: "Access", detail: "View all your interview history directly inside the app at any time." },
            { label: "Deletion", detail: "Request full account and data deletion by emailing us. We will process it within 7 business days." },
            { label: "Correction", detail: "Contact us to correct any inaccurate personal information we hold." },
          ]}
        />
      </DocSection>

      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
          <div>
            <h3 className="text-[15px] font-semibold">Cookies & Policy Updates</h3>
            <p className="mt-1 text-[14.5px] leading-7 text-neutral-700">
              We use session cookies only to keep you signed in. No advertising or third-party
              tracking cookies are used. We may update this Privacy Policy from time to time — the
              date above will reflect any changes. Continued use of PrepForVISA after an update
              constitutes your acceptance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── TERMS OF SERVICE ─────────────── */

function TermsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Terms of Service</div>
        <h2 className="text-2xl font-semibold tracking-tight">Rules Governing Your Use</h2>
        <p className="mt-3 text-[15px] leading-7 text-neutral-700">
          Last updated: <strong>February 2026</strong>. By accessing or using PrepForVISA, you
          agree to be bound by these Terms. If you do not agree, please do not use the platform.
        </p>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-neutral-300 bg-neutral-50 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">Important disclaimer</p>
          <p className="text-[14.5px] leading-7 font-medium text-neutral-900">
            PrepForVISA is a practice tool only. We make no representation, warranty, or guarantee
            that using this platform will result in a successful visa interview or visa approval.
            Visa decisions are made solely by U.S. consular officers. We are not affiliated with
            the U.S. Department of State or any government agency.
          </p>
        </div>
      </section>

      <DocSection title="1. Description of Service">
        <p>
          PrepForVISA is an AI-powered practice tool that generates F-1 student visa interview
          questions and conducts simulated voice mock interviews. It is intended solely for
          personal preparation and educational purposes.
        </p>
      </DocSection>

      <DocSection title="2. Eligibility">
        <p>
          You must be at least 18 years old, or at least 13 years old with verifiable parental
          consent, to use PrepForVISA. By signing in, you confirm that you meet this requirement.
        </p>
      </DocSection>

      <DocSection title="3. Account Responsibility">
        <p>
          You are responsible for maintaining the security of your Google account used to sign in,
          and for all activity that occurs under your account. Notify us immediately at{" "}
          <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium">
            prepforvisainterview@gmail.com
          </a>{" "}
          if you suspect unauthorised use of your account.
        </p>
      </DocSection>

      <DocSection title="4. Acceptable Use">
        <p className="mb-3">You agree not to:</p>
        <CheckList
          items={[
            { detail: "Use the platform for any unlawful purpose or in violation of these Terms." },
            { detail: "Attempt to scrape, reverse-engineer, or extract the AI models or prompts." },
            { detail: "Impersonate any person or entity, or misrepresent your identity." },
            { detail: "Submit content that is illegal, harmful, or violates third-party rights." },
            { detail: "Abuse the platform in ways that incur disproportionate infrastructure costs." },
          ]}
        />
      </DocSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <DocSection title="5. Payments & Refunds">
          <p>
            Paid plans are billed in advance. All payments are processed securely via Stripe.
            Subscription fees are non-refundable except where required by applicable law. You may
            cancel at any time; access continues until the end of the billing period.
          </p>
        </DocSection>

        <DocSection title="6. Intellectual Property">
          <p>
            All content, branding, and code on PrepForVISA are owned by or licensed to Pallav
            Khanal. AI-generated interview questions are provided for your personal use only. You
            may not reproduce, distribute, or sell any platform content without prior written
            permission.
          </p>
        </DocSection>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <DocSection title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, PrepForVISA and its operator shall not be
            liable for any indirect, incidental, special, or consequential damages arising from
            your use of the platform, including but not limited to visa denial, loss of data, or
            service interruption.
          </p>
        </DocSection>

        <DocSection title="8. Termination">
          <p>
            We reserve the right to suspend or terminate your account at any time if you violate
            these Terms or engage in behaviour that is harmful to the platform or other users.
            You may stop using PrepForVISA at any time.
          </p>
        </DocSection>
      </div>

      <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
          <div>
            <h3 className="text-[15px] font-semibold">Changes to These Terms</h3>
            <p className="mt-1 text-[14.5px] leading-7 text-neutral-700">
              We may update these Terms from time to time. The date at the top of this page will
              reflect any changes. Continued use of PrepForVISA after an update constitutes your
              acceptance of the revised Terms. Questions? Email{" "}
              <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium">
                prepforvisainterview@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── Shared components ─────────────── */

function DocSection({ title, children }) {
  return (
    <section className="rounded-2xl border bg-white/70 p-8 shadow-sm backdrop-blur">
      <h2 className="text-[17px] font-semibold tracking-tight text-neutral-900">{title}</h2>
      <div className="mt-3 text-[15px] leading-7 text-neutral-700 space-y-3">{children}</div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
      <div className="text-base font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map(({ label, detail }, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] leading-7 text-neutral-800">
          <Check className="mt-1 h-4 w-4 shrink-0 text-neutral-500" />
          <span>{label ? <><strong>{label}:</strong> {detail}</> : detail}</span>
        </li>
      ))}
    </ul>
  );
}
