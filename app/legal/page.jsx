"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shield, Mail, FileText, ExternalLink, Info, ArrowLeft } from "lucide-react";
import { useUser } from "@/app/Provider";

const TABS = [
  { label: "Terms of Service", icon: FileText },
  { label: "Privacy Policy", icon: Shield },
  { label: "Contact Us", icon: Mail },
];

export default function LegalPage() {
  const [active, setActive] = useState(0);
  const { user } = useUser();
  const backHref = user ? "/dashboard" : "/";
  const backLabel = user ? "Back to dashboard" : "Back to home";

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">

        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            PrepForVISA
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Support & Legal</h1>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
            Contact us, read our privacy policy, or review our terms of service.
          </p>
        </div>

        <div className="mb-8 flex gap-1 rounded-xl border border-border bg-background/70 p-1 shadow-sm backdrop-blur">
          {TABS.map(({ label, icon: Icon }, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                active === i
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {active === 0 && <TermsPage />}
        {active === 1 && <PrivacyPage />}
        {active === 2 && <ContactPage />}

      </div>
    </div>
  );
}

/* ─────────────── TERMS OF SERVICE ─────────────── */

function TermsPage() {
  return (
    <div className="rounded-2xl border border-border bg-background/70 shadow-sm backdrop-blur">
      {/* Document header */}
      <div className="border-b border-border px-8 py-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">PrepForVISA</p>
        <h2 className="text-2xl font-semibold tracking-tight">Terms of Service</h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Effective date: <strong className="text-foreground">February 22, 2026</strong>
        </p>
        <p className="mt-4 text-[15px] leading-7 text-foreground/80">
          These Terms of Service ("Terms") govern your access to and use of PrepForVISA ("the Service"), an AI-powered F-1 student
          visa interview preparation platform operated by Pallav Khanal ("we," "us," or "our"). By creating an account or otherwise
          using the Service, you agree to be legally bound by these Terms. If you do not agree, you must not use the Service.
        </p>
        <div className="mt-5 rounded-xl border border-border bg-muted px-5 py-4">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Important Notice</p>
          <p className="text-[14.5px] leading-7 text-foreground">
            PrepForVISA is a practice tool only. Nothing on this platform constitutes legal advice, immigration advice, or any
            form of professional guidance. We make no representation, warranty, or guarantee that using this Service will result
            in a successful visa interview or visa approval. All visa decisions are made solely by U.S. consular officers.
            PrepForVISA is not affiliated with, endorsed by, or connected to the U.S. Department of State, U.S. Citizenship and
            Immigration Services (USCIS), any U.S. embassy or consulate, or any other government authority.
          </p>
        </div>
      </div>

      {/* Document body */}
      <div className="px-8 py-8 space-y-8 text-[15px] leading-7 text-foreground/80">

        <Section num="1" title="Description of Service">
          <p>
            PrepForVISA is an AI-powered preparation platform that generates personalized F-1 student visa interview question
            banks and conducts simulated voice-based mock interviews. The Service is intended solely for personal preparation
            and educational purposes. It is not a legal service, an immigration consultancy, or an official government resource.
            The F-1 visa interview process, required documentation, and consular practices may change at any time without notice;
            the Service may not always reflect the most current requirements. For authoritative guidance, consult a licensed
            immigration attorney or the official U.S. Department of State website.
          </p>
        </Section>

        <Divider />

        <Section num="2" title="Eligibility and Account Registration">
          <p>
            You must be at least 13 years old to use the Service. If you are under 18, you represent that you have obtained
            verifiable consent from a parent or legal guardian. We do not knowingly collect personal data from children under 13.
            If we become aware that we have done so, we will delete that information promptly.
          </p>
          <p className="mt-4">
            When you create an account, you agree to provide accurate and complete information. You are responsible for
            maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
            You agree to notify us immediately at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>{" "}
            if you believe your account has been accessed without authorization. We reserve the right to disable any account
            that we reasonably believe has been compromised or is being misused.
          </p>
        </Section>

        <Divider />

        <Section num="3" title="AI-Generated Content — Disclaimer">
          <p>
            PrepForVISA uses large language models (specifically Mistral 8x7b via OpenRouter) to generate interview questions
            and AI feedback. These outputs are produced by automated systems and may be inaccurate, incomplete, outdated, or
            unsuitable for your specific situation. You acknowledge and agree that:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
            <li>AI-generated content does not constitute legal, immigration, or any other form of professional advice.</li>
            <li>You rely on AI-generated outputs entirely at your own risk.</li>
            <li>PrepForVISA does not warrant the accuracy, reliability, completeness, or suitability of any AI-generated content.</li>
            <li>AI outputs may reflect the training data of the underlying model and may not represent current visa interview practices.</li>
            <li>
              Where laws require transparency about AI interactions (including under the EU AI Act), you are hereby informed that
              the voice-based mock interview is entirely AI-generated and not a human interviewer.
            </li>
          </ul>
        </Section>

        <Divider />

        <Section num="4" title="Voice and Audio Processing">
          <p>
            The mock interview feature requires access to your device microphone. By activating a mock interview session, you
            explicitly consent to the real-time capture and transmission of your voice audio to Vapi AI, our third-party voice
            processing provider. Vapi processes this audio to generate transcriptions and AI responses in real time.
          </p>
          <p className="mt-4">
            We do not permanently store your raw audio recordings on our servers. Transcriptions of your interview session are
            saved to your account history so you can review them later. You may delete your session history at any time by
            contacting us. You can withdraw your consent to audio capture at any time by ending the session or declining
            microphone access in your browser settings, though doing so will prevent you from using the mock interview feature.
          </p>
          <p className="mt-4">
            You acknowledge that voice processing is governed by Vapi AI's own terms of service and privacy policy in addition
            to these Terms. If you are located in a jurisdiction where voice or biometric data is subject to heightened legal
            protections (including Illinois, Texas, Washington, or EU member states), your explicit consent to this Section
            constitutes your informed, opt-in authorization for the processing described above.
          </p>
        </Section>

        <Divider />

        <Section num="5" title="License Grant">
          <p>
            Subject to your compliance with these Terms, we grant you a limited, personal, non-exclusive, non-transferable,
            non-sublicensable, revocable license to access and use the Service for your own personal, non-commercial
            preparation purposes. This license does not include any right to: resell or commercially exploit the Service or
            its contents; copy, reproduce, distribute, or publicly display any part of the Service; modify or create
            derivative works based on the Service; or use the Service on behalf of any third party for commercial gain.
          </p>
          <p className="mt-4">
            All rights not expressly granted in these Terms are reserved by us.
          </p>
        </Section>

        <Divider />

        <Section num="6" title="Acceptable Use">
          <p>
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
            <li>Use the Service to prepare fraudulent, misleading, or deceptive responses for an actual visa interview.</li>
            <li>Represent AI-generated content as official advice, legal counsel, or government guidance.</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation with any organization.</li>
            <li>
              Attempt to probe, scan, test, or reverse-engineer the security of the Service or the AI models and prompts
              underlying it.
            </li>
            <li>Scrape, harvest, or systematically extract data from the Service using automated means.</li>
            <li>Submit content that is unlawful, harmful, defamatory, or that infringes any third-party rights.</li>
            <li>Use the Service in any manner that could damage, disable, overburden, or impair our infrastructure.</li>
            <li>Circumvent or attempt to circumvent any usage limits or access controls.</li>
          </ul>
          <p className="mt-4">
            We reserve the right to investigate suspected violations and to take any action we deem appropriate, including
            immediate suspension of your access without notice.
          </p>
        </Section>

        <Divider />

        <Section num="7" title="Intellectual Property">
          <p>
            All content, code, branding, design, trademarks, and proprietary materials on PrepForVISA are owned by or licensed
            to Pallav Khanal and are protected by applicable intellectual property laws. You may not reproduce, distribute,
            modify, publicly display, or create derivative works from any part of the Service without our prior written permission.
          </p>
          <p className="mt-4">
            You retain ownership of any personal information or descriptions you submit through the Service. By submitting
            content, you grant us a limited, non-exclusive license to use that content solely to the extent necessary to
            provide the Service to you.
          </p>
          <p className="mt-4">
            AI-generated interview questions and feedback are provided solely for your personal preparation use. As purely
            AI-generated content, these outputs are not subject to copyright protection under current U.S. Copyright Office
            guidance, and we make no copyright claims over them.
          </p>
        </Section>

        <Divider />

        <Section num="8" title="Subscription and Payments">
          <p>
            PrepForVISA currently offers a free tier with limited monthly usage. Paid subscription plans (Pro and Max) are
            in development and will be announced before launch. When paid plans become available, the following terms will apply:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
            <li>Subscription fees are billed in advance for the applicable billing period.</li>
            <li>All payments will be processed securely by a third-party payment processor.</li>
            <li>Fees are non-refundable except where required by applicable law.</li>
            <li>
              You may cancel a paid subscription at any time; your access will continue until the end of the current billing period.
            </li>
            <li>
              We will provide at least 14 days' advance notice before introducing or changing paid pricing, and updated terms
              will require your re-acceptance before charges apply.
            </li>
          </ul>
          <p className="mt-4">
            During the current beta period, all plan upgrades and tier access are provided free of charge. This may change
            with reasonable advance notice.
          </p>
        </Section>

        <Divider />

        <Section num="9" title="Termination">
          <p>
            We may suspend or terminate your access to the Service at any time, with or without notice, if we reasonably
            believe you have violated these Terms, engaged in behavior that is harmful to the platform or other users, or
            for any other reason at our sole discretion. Upon termination, your right to use the Service ceases immediately.
          </p>
          <p className="mt-4">
            You may stop using the Service at any time. To request deletion of your account and associated data, email us
            at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>{" "}
            with the subject line "Account Deletion Request." We will process your request within 7 business days.
          </p>
          <p className="mt-4">
            Sections 3 (AI Disclaimer), 7 (Intellectual Property), 11 (Disclaimer of Warranties), 12 (Limitation of Liability),
            13 (Indemnification), and 14 (Governing Law) survive termination.
          </p>
        </Section>

        <Divider />

        <Section num="10" title="Third-Party Services">
          <p>
            The Service relies on third-party providers to function. These providers have their own terms of service and privacy
            policies, which govern their handling of your data independently of these Terms. The primary third-party services
            integrated into PrepForVISA are: Supabase (authentication and database), Google (OAuth sign-in), Vapi AI
            (real-time voice processing), OpenRouter and Mistral AI (AI text generation), and Vercel (hosting). We are not
            responsible for the acts or omissions of these providers.
          </p>
        </Section>

        <Divider />

        <Section num="11" title="Disclaimer of Warranties">
          <p>
            The Service is provided "as is" and "as available" without warranty of any kind. To the fullest extent permitted
            by applicable law, we expressly disclaim all warranties, whether express, implied, or statutory, including but
            not limited to: implied warranties of merchantability, fitness for a particular purpose, title, and
            non-infringement; any warranty that the Service will be uninterrupted, error-free, or secure; any warranty
            regarding the accuracy, reliability, or completeness of any AI-generated content; and any warranty that the
            Service reflects current visa interview requirements or consular practices.
          </p>
        </Section>

        <Divider />

        <Section num="12" title="Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law, Pallav Khanal and PrepForVISA shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of,
            or inability to use, the Service — including but not limited to visa denial, loss of educational opportunity,
            travel costs, loss of data, or service interruption — even if advised of the possibility of such damages.
          </p>
          <p className="mt-4">
            Our total aggregate liability to you for any claims arising from or relating to these Terms or the Service shall
            not exceed the total amount you have paid to us in the twelve months preceding the event giving rise to the claim,
            or USD $10, whichever is greater.
          </p>
          <p className="mt-4">
            Some jurisdictions do not permit the exclusion or limitation of certain warranties or liabilities. In such cases,
            our liability will be limited to the maximum extent permitted by law.
          </p>
        </Section>

        <Divider />

        <Section num="13" title="Indemnification">
          <p>
            You agree to defend, indemnify, and hold harmless Pallav Khanal and PrepForVISA from and against any claims,
            damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your
            use of the Service; (b) your violation of these Terms; (c) your violation of any applicable law or regulation;
            or (d) any claim by a third party that content you submitted through the Service infringes their rights.
          </p>
        </Section>

        <Divider />

        <Section num="14" title="Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by and construed in accordance with the laws of the United States and the state in which
            Pallav Khanal is domiciled, without regard to conflict of law principles. Any dispute arising from or relating
            to these Terms or the Service shall first be submitted to informal resolution by contacting us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>
            . We will work in good faith to resolve the dispute within 30 days of receiving written notice.
          </p>
          <p className="mt-4">
            If informal resolution fails, any legal proceeding shall be brought exclusively in the state or federal courts
            located in the applicable jurisdiction, and both parties consent to personal jurisdiction in those courts.
            Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of
            competent jurisdiction to prevent irreparable harm.
          </p>
        </Section>

        <Divider />

        <Section num="15" title="Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we make material changes, we will update the effective date
            at the top of this page and, where reasonably practicable, notify you by email or through an in-app notice at
            least 14 days before the changes take effect. Your continued use of the Service after the effective date of
            any update constitutes your acceptance of the revised Terms. If you do not agree with the revised Terms, you
            must stop using the Service.
          </p>
          <p className="mt-4">
            Questions about these Terms? Email us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>
            .
          </p>
        </Section>

      </div>
    </div>
  );
}

/* ─────────────── PRIVACY POLICY ─────────────── */

function PrivacyPage() {
  return (
    <div className="rounded-2xl border border-border bg-background/70 shadow-sm backdrop-blur">
      {/* Document header */}
      <div className="border-b border-border px-8 py-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">PrepForVISA</p>
        <h2 className="text-2xl font-semibold tracking-tight">Privacy Policy</h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Effective date: <strong className="text-foreground">February 22, 2026</strong>
        </p>
        <p className="mt-4 text-[15px] leading-7 text-foreground/80">
          This Privacy Policy describes how PrepForVISA, operated by Pallav Khanal ("we," "us," or "our"), collects, uses,
          stores, and shares your personal information when you use our Service. We are committed to protecting your privacy
          and handling your data with transparency and care.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-foreground/80">
          We never sell your personal information to any third party. We collect only what is necessary to provide the Service,
          and you can request deletion of your data at any time.
        </p>
      </div>

      {/* Document body */}
      <div className="px-8 py-8 space-y-8 text-[15px] leading-7 text-foreground/80">

        <Section num="1" title="Who We Are (Data Controller)">
          <p>
            The data controller responsible for your personal information is Pallav Khanal, operating PrepForVISA. For all
            privacy-related questions, data access requests, or deletion requests, please contact us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>
            . We will respond to all requests within 30 days.
          </p>
        </Section>

        <Divider />

        <Section num="2" title="What Personal Data We Collect">
          <p>We collect the following categories of personal information:</p>
          <p className="mt-4 font-medium text-foreground">Account Data</p>
          <p className="mt-1">
            When you sign in with Google, we receive your name, email address, and profile picture from Google OAuth.
            This information is stored in your PrepForVISA user record.
          </p>
          <p className="mt-4 font-medium text-foreground">Interview and Preparation Data</p>
          <p className="mt-1">
            When you generate a question bank, we collect the personal description you provide (intended major, university,
            financial situation) and the AI-generated questions produced from it. When you complete a mock interview, we
            store the full session transcript, the interview outcome (approved / denied / unknown), and the duration of the session.
            We also store the AI feedback report generated after each session.
          </p>
          <p className="mt-4 font-medium text-foreground">Voice and Audio Data</p>
          <p className="mt-1">
            During mock interview sessions, your voice audio is captured by your browser and transmitted in real time to Vapi AI
            for transcription and AI response generation. We do not store your raw audio recordings on our servers. The
            resulting text transcript is saved to your account. See Section 6 for full details.
          </p>
          <p className="mt-4 font-medium text-foreground">Usage and Technical Data</p>
          <p className="mt-1">
            We collect session timestamps, feature usage (sessions started, questions generated), and interview outcomes.
            Standard technical data — such as IP address, browser type, and device type — may be recorded in server logs
            maintained by our hosting provider (Vercel) and database provider (Supabase). We do not use third-party
            analytics or advertising trackers.
          </p>
        </Section>

        <Divider />

        <Section num="3" title="How We Collect Your Data">
          <p>
            We collect data in three ways. First, directly from you — when you sign in, fill out an interview description,
            or start a mock session. Second, automatically — session tokens and cookies are set to maintain your signed-in
            state; server infrastructure logs standard request metadata. Third, from third parties — Google provides your
            name, email, and profile picture when you authenticate via Google OAuth.
          </p>
        </Section>

        <Divider />

        <Section num="4" title="Legal Basis for Processing (GDPR)">
          <p>
            If you are located in the European Economic Area (EEA) or UK, we process your personal data under the following
            lawful bases:
          </p>
          <ul className="mt-4 space-y-3 list-disc list-outside ml-5">
            <li>
              <strong className="text-foreground">Contract performance (Article 6(1)(b)):</strong> Account data (name, email)
              is processed because it is necessary to provide the Service to you — without it, we cannot create or maintain
              your account.
            </li>
            <li>
              <strong className="text-foreground">Legitimate interests (Article 6(1)(f)):</strong> Usage data and technical
              logs are processed for platform security, fraud prevention, and service improvement. These interests do not
              override your fundamental rights.
            </li>
            <li>
              <strong className="text-foreground">Explicit consent (Article 6(1)(a) and Article 9):</strong> Voice and audio
              data is processed only on the basis of your explicit, opt-in consent given before each mock interview session.
              You may withdraw this consent at any time by ending the session or declining microphone access. Withdrawal does
              not affect the lawfulness of processing that occurred before withdrawal.
            </li>
          </ul>
          <p className="mt-4">
            You have the right not to be subject to solely automated decision-making that produces legal or similarly
            significant effects. Our AI question generation and feedback are recommendations only and require no automated
            decisions that affect your legal status or rights.
          </p>
        </Section>

        <Divider />

        <Section num="5" title="How We Use Your Data">
          <p>We use your personal information solely for the following purposes:</p>
          <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
            <li>To create and maintain your PrepForVISA account.</li>
            <li>To generate AI-powered interview questions personalized to your profile description.</li>
            <li>To conduct real-time voice mock interviews and produce session transcripts.</li>
            <li>To generate AI feedback reports on your interview performance.</li>
            <li>To power your dashboard (KPIs, performance chart, session history).</li>
            <li>To prevent repeated interview questions across your sessions.</li>
            <li>To respond to your support, billing, and data rights requests.</li>
            <li>To improve the Service based on aggregated, anonymized usage patterns.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
          <p className="mt-4">
            We do not use your data for advertising, marketing profiling, or any purpose not listed above.
          </p>
        </Section>

        <Divider />

        <Section num="6" title="Voice and Audio Data">
          <p>
            Voice data is personal data and, depending on your jurisdiction, may be classified as biometric data subject
            to heightened legal protections. We treat all voice data with the highest level of care.
          </p>
          <p className="mt-4">
            When you start a mock interview, your browser requests microphone access. You must explicitly grant this permission
            — we never capture audio without your active consent. Once granted, your voice audio is streamed in real time to
            Vapi AI, which transcribes your speech and generates the AI officer's responses. Vapi processes this audio on its
            own servers; their data handling is governed by Vapi AI's Privacy Policy.
          </p>
          <p className="mt-4">
            We do not store your raw audio. The text transcript produced by Vapi is saved in your account after the session ends.
            You may request deletion of any or all session transcripts at any time by contacting us. You can revoke microphone
            access at any time through your browser settings, which will prevent the mock interview feature from functioning.
          </p>
          <p className="mt-4">
            If you are located in Illinois, Texas, Washington, or another jurisdiction with biometric privacy laws, you are
            hereby informed that your explicit consent at the start of each session constitutes your written release authorizing
            the collection and processing of your voice data for the purpose of conducting an AI-simulated interview, in
            compliance with applicable biometric and voice data laws.
          </p>
        </Section>

        <Divider />

        <Section num="7" title="Third-Party Processors and Subprocessors">
          <p>
            We work with the following third-party service providers, each of which may receive or process your personal data
            as necessary to provide the Service. All subprocessors are contractually required to handle your data only as
            directed by us and in accordance with applicable data protection law.
          </p>
          <div className="mt-5 space-y-4">
            {[
              {
                name: "Supabase (United States)",
                desc: "Provides our authentication infrastructure and PostgreSQL database. Your account data, interview history, and session records are stored on Supabase servers hosted on AWS in the United States. Supabase enforces row-level security so only your own data is accessible to your account.",
              },
              {
                name: "Google (United States)",
                desc: "Provides OAuth sign-in. When you authenticate with Google, Google shares your name, email address, and profile picture with us. Google's data handling is governed by Google's Privacy Policy.",
              },
              {
                name: "Vapi AI (United States)",
                desc: "Processes your voice audio in real time during mock interview sessions. Audio is transmitted directly from your browser to Vapi's servers for transcription and AI response generation. We do not receive or store the raw audio.",
              },
              {
                name: "OpenRouter / Mistral AI (United States / France)",
                desc: "Routes AI inference requests to Mistral AI's language model. Your profile description and session transcripts are sent to these services to generate interview questions and feedback. Mistral AI is based in France and subject to EU data protection law.",
              },
              {
                name: "Vercel (United States)",
                desc: "Hosts and serves the PrepForVISA web application. Vercel may log standard request metadata (IP address, browser type, request path) in the ordinary course of serving web traffic.",
              },
            ].map(({ name, desc }) => (
              <div key={name} className="border-l-2 border-border pl-4">
                <p className="font-semibold text-foreground text-[14.5px]">{name}</p>
                <p className="mt-1 text-[14px] text-foreground/70 leading-6">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        <Section num="8" title="International Data Transfers">
          <p>
            PrepForVISA is operated from and stores data in the United States. If you access the Service from the European
            Economic Area, the United Kingdom, or another jurisdiction with data transfer restrictions, please be aware that
            your personal data will be transferred to and processed in the United States, which may not provide the same level
            of data protection as your home country.
          </p>
          <p className="mt-4">
            We rely on our processors' participation in Standard Contractual Clauses (SCCs) and other applicable transfer
            mechanisms to ensure adequate protection for your data when transferred internationally. Mistral AI, based in
            France, is subject to the GDPR and EU-level data protection standards. For questions about our transfer mechanisms,
            please contact us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>
            .
          </p>
        </Section>

        <Divider />

        <Section num="9" title="Data Retention">
          <p>
            We retain your personal data for as long as your account remains active. Specifically:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
            <li>
              <strong className="text-foreground">Account data</strong> (name, email, profile picture) — retained while your
              account is active and deleted within 30 days of a verified deletion request.
            </li>
            <li>
              <strong className="text-foreground">Interview and session records</strong> (question banks, transcripts, feedback)
              — retained while your account is active and deleted within 30 days of a deletion request.
            </li>
            <li>
              <strong className="text-foreground">Voice audio</strong> — not retained by us. Any retention by Vapi AI is
              governed by their data retention policy.
            </li>
            <li>
              <strong className="text-foreground">Server logs</strong> (Vercel) — typically retained for up to 90 days in
              accordance with Vercel's standard log retention policies.
            </li>
          </ul>
          <p className="mt-4">
            When you close your account, we will delete or anonymize all personal data we hold about you within 30 days,
            except where we are required to retain it for legal compliance purposes.
          </p>
        </Section>

        <Divider />

        <Section num="10" title="Security">
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized
            access, loss, or disclosure. These measures include: HTTPS/TLS encryption for all data in transit; Supabase
            row-level security policies that isolate each user's data; and authentication managed through Google OAuth,
            which means we never store passwords. While we take security seriously, no system is completely secure, and
            we cannot guarantee the absolute security of your data.
          </p>
        </Section>

        <Divider />

        <Section num="11" title="Cookies and Tracking">
          <p>
            We use session cookies to keep you signed in to your account. These are strictly necessary cookies and cannot
            be disabled without preventing the Service from functioning. We do not use advertising cookies, behavioral
            tracking cookies, or any third-party analytics or marketing cookies.
          </p>
          <p className="mt-4">
            Google OAuth may set its own cookies as part of the sign-in process. These are governed by Google's Cookie
            Policy. You can manage cookie settings in your browser, but disabling cookies will prevent you from using
            the Service.
          </p>
        </Section>

        <Divider />

        <Section num="12" title="Children's Privacy">
          <p>
            The Service is not directed to children under 13 years of age, and we do not knowingly collect personal data
            from children under 13. If you are a parent or guardian and believe your child under 13 has provided us with
            personal information, please contact us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>{" "}
            and we will delete that information promptly. Users between 13 and 18 must have parental consent to use the Service.
            In GDPR jurisdictions, the minimum age for digital consent without parental authorization may be 16 depending on
            member state law.
          </p>
        </Section>

        <Divider />

        <Section num="13" title="Your Rights">
          <p>
            Depending on where you are located, you may have the following rights regarding your personal data. To exercise
            any of these rights, email us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>{" "}
            with a description of your request. We will respond within 30 days.
          </p>
          <ul className="mt-4 space-y-3 list-disc list-outside ml-5">
            <li>
              <strong className="text-foreground">Right of access:</strong> Request a copy of the personal data we hold about
              you. Much of your data is already accessible directly within the Service (dashboard, session history).
            </li>
            <li>
              <strong className="text-foreground">Right to rectification:</strong> Request correction of any inaccurate or
              incomplete personal data we hold about you.
            </li>
            <li>
              <strong className="text-foreground">Right to erasure ("right to be forgotten"):</strong> Request deletion of your
              personal data. We will process account deletion requests within 7 business days.
            </li>
            <li>
              <strong className="text-foreground">Right to restrict processing:</strong> Request that we limit how we use your
              data while a dispute is being resolved.
            </li>
            <li>
              <strong className="text-foreground">Right to data portability:</strong> Request your personal data in a structured,
              machine-readable format (GDPR and CCPA).
            </li>
            <li>
              <strong className="text-foreground">Right to object:</strong> Object to processing based on legitimate interests.
              We will cease such processing unless we can demonstrate compelling legitimate grounds that override your interests.
            </li>
            <li>
              <strong className="text-foreground">Right to withdraw consent:</strong> For voice and audio data processed on the
              basis of your consent, you may withdraw that consent at any time by ending the session or revoking microphone access.
            </li>
          </ul>
        </Section>

        <Divider />

        <Section num="14" title="California Residents (CCPA / CPRA)">
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA)
            as amended by the California Privacy Rights Act (CPRA). Categories of personal information we collect are listed
            in Section 2. We collect this information for the business purposes described in Section 5.
          </p>
          <p className="mt-4">
            <strong className="text-foreground">We do not sell or share your personal information</strong> with any third party
            for cross-context behavioral advertising or any commercial purpose. You have the right to know, access, correct,
            and delete your personal information, and to opt out of any future sale or sharing — though no such sale or sharing
            currently occurs.
          </p>
          <p className="mt-4">
            To exercise your CCPA rights, contact us at{" "}
            <a href="mailto:prepforvisainterview@gmail.com" className="underline font-medium text-foreground">
              prepforvisainterview@gmail.com
            </a>
            . We will not discriminate against you for exercising any of your privacy rights.
          </p>
        </Section>

        <Divider />

        <Section num="15" title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in the Service, applicable law, or our data
            practices. When we make material changes, we will update the effective date at the top of this page and notify
            you by email or in-app notice at least 14 days before the changes take effect. Continued use of the Service after
            the effective date of any update constitutes your acceptance of the revised Policy.
          </p>
        </Section>

        <Divider />

        <Section num="16" title="Supervisory Authority Complaints (EEA / UK Users)">
          <p>
            If you are located in the European Economic Area or the United Kingdom and believe we have processed your personal
            data in violation of applicable data protection law, you have the right to lodge a complaint with your national
            data protection supervisory authority. In the UK, this is the Information Commissioner's Office (ICO). In EU member
            states, you should contact your relevant national data protection authority (DPA). We encourage you to contact us
            first so we can address your concern directly.
          </p>
        </Section>

      </div>
    </div>
  );
}

/* ─────────────── CONTACT ─────────────── */

function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-background/70 p-8 shadow-sm backdrop-blur">
        <h2 className="text-2xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="mt-3 text-[15px] leading-7 text-foreground/80">
          A real person reads every message. Whether you have a billing issue, a bug to report, or need your account
          deleted — email us and we will get back to you within two business days.
        </p>

        <div className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-muted p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foreground">
            <Mail className="h-5 w-5 text-background" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Primary support email</p>
            <p className="text-[15px] font-semibold text-foreground truncate">prepforvisainterview@gmail.com</p>
          </div>
          <a
            href="mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20Support"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-colors"
          >
            Send email
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background/70 p-8 shadow-sm backdrop-blur">
        <h2 className="text-xl font-semibold tracking-tight">Common Requests</h2>
        <p className="mt-2 text-[14.5px] leading-7 text-muted-foreground">
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
              className="group rounded-xl border border-border bg-background/70 p-4 backdrop-blur hover:border-input hover:shadow-sm transition-all"
            >
              <p className="text-[14px] font-semibold text-foreground group-hover:underline">{label}</p>
              <p className="mt-1 text-[13px] leading-6 text-muted-foreground">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background/70 p-8 shadow-sm backdrop-blur">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <h3 className="text-[15px] font-semibold">Privacy and data requests</h3>
            <p className="mt-1 text-[14.5px] leading-7 text-foreground/80">
              For account deletion or data access requests, include the email address linked to your account so we can
              locate your records. We process all data requests within 7 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── Shared components ─────────────── */

function Section({ num, title, children }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold text-foreground tracking-tight mb-3">
        {num}. {title}
      </h3>
      <div className="text-[15px] leading-7 text-foreground/80">
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="border-border" />;
}
