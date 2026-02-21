"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shield, Mail, FileText, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

const TABS = ["Contact Us", "Privacy Policy", "Terms of Service"];

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-sm text-[#0a0a0a]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed space-y-2 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

const ContactTab = () => (
  <div className="space-y-6">
    <div className="rounded-xl border border-gray-100 bg-[#fafafa] p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email Support</p>
          <p className="text-sm font-semibold text-[#0a0a0a]">prepforvisainterview@gmail.com</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Have a question, a bug to report, or want to request account deletion? Send us an email and we will get back to you within 2 business days.
      </p>
      <a
        href="mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20Support"
        className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Send an Email
      </a>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Billing Issues", body: "Billing%20Issue" },
        { label: "Account Deletion", body: "Account%20Deletion%20Request" },
        { label: "Report a Bug", body: "Bug%20Report" },
      ].map(({ label, body }) => (
        <a
          key={label}
          href={`mailto:prepforvisainterview@gmail.com?subject=PrepForVISA%20-%20${body}`}
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-[#0a0a0a] transition-all"
        >
          {label}
        </a>
      ))}
    </div>
  </div>
);

const PrivacyTab = () => (
  <div className="space-y-3">
    <p className="text-xs text-gray-400">Last updated: February 2026</p>

    <Section title="1. Who We Are">
      <p>PrepForVISA ("we", "us", "our") is an AI-powered F-1 student visa interview preparation platform operated by Pallav Khanal. You can contact us at <a href="mailto:prepforvisainterview@gmail.com" className="underline text-[#0a0a0a]">prepforvisainterview@gmail.com</a>.</p>
    </Section>

    <Section title="2. Information We Collect">
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Account information:</strong> Your name, email address, and profile picture provided via Google OAuth when you sign in.</li>
        <li><strong>Interview data:</strong> The personal description you enter when generating questions, the AI-generated questions, and the transcript of your mock voice interviews.</li>
        <li><strong>Usage data:</strong> Session timestamps, interview outcomes, and duration of practice sessions.</li>
      </ul>
    </Section>

    <Section title="3. How We Use Your Information">
      <ul className="list-disc pl-4 space-y-1">
        <li>To provide and personalise the PrepForVISA service.</li>
        <li>To generate AI interview questions tailored to your profile.</li>
        <li>To store your practice history so you can review past sessions and track progress.</li>
        <li>To avoid repeating the same interview questions across sessions.</li>
        <li>To respond to support requests you send us.</li>
      </ul>
    </Section>

    <Section title="4. Data Storage & Security">
      <p>All data is stored securely in Supabase (hosted on AWS infrastructure in the United States). Access to your data is restricted to your account via row-level security policies. We do not store your Google password — authentication is handled entirely by Google OAuth.</p>
    </Section>

    <Section title="5. Third-Party Services">
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Google OAuth:</strong> Used for sign-in only. We receive your name, email, and profile picture.</li>
        <li><strong>Vapi AI:</strong> Processes your voice during mock interviews in real time. Audio is not stored by us.</li>
        <li><strong>OpenRouter / Mistral:</strong> Generates interview questions from the description you provide. Your description is sent to OpenRouter's API and is subject to their privacy policy.</li>
        <li><strong>Stripe:</strong> Handles all payment processing. We do not store your card details.</li>
      </ul>
    </Section>

    <Section title="6. Data Sharing">
      <p>We do not sell, rent, or share your personal information with any third party for marketing purposes. Data is only shared with the service providers listed above solely to operate the platform.</p>
    </Section>

    <Section title="7. Your Rights">
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Access:</strong> You can view all your interview history within the app.</li>
        <li><strong>Deletion:</strong> You may request deletion of your account and all associated data at any time by emailing <a href="mailto:prepforvisainterview@gmail.com?subject=Account%20Deletion%20Request" className="underline text-[#0a0a0a]">prepforvisainterview@gmail.com</a>.</li>
        <li><strong>Correction:</strong> Contact us to correct inaccurate personal information.</li>
      </ul>
    </Section>

    <Section title="8. Cookies">
      <p>We use session cookies to keep you signed in. We do not use third-party tracking or advertising cookies.</p>
    </Section>

    <Section title="9. Changes to This Policy">
      <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top will reflect any changes. Continued use of PrepForVISA after changes constitutes your acceptance of the updated policy.</p>
    </Section>

    <Section title="10. Contact">
      <p>For any privacy-related questions or requests, please email us at <a href="mailto:prepforvisainterview@gmail.com" className="underline text-[#0a0a0a]">prepforvisainterview@gmail.com</a>.</p>
    </Section>
  </div>
);

const TermsTab = () => (
  <div className="space-y-3">
    <p className="text-xs text-gray-400">Last updated: February 2026</p>

    <Section title="1. Acceptance of Terms">
      <p>By accessing or using PrepForVISA, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
    </Section>

    <Section title="2. Description of Service">
      <p>PrepForVISA is an AI-powered practice tool that generates F-1 student visa interview questions and conducts simulated voice mock interviews. It is intended solely for personal preparation and educational purposes.</p>
    </Section>

    <Section title="3. No Guarantee of Visa Approval">
      <p className="font-medium text-[#0a0a0a]">PrepForVISA is a practice tool only. We make no representation, warranty, or guarantee that using this platform will result in a successful visa interview or visa approval. Visa decisions are made solely by U.S. consular officers at U.S. embassies and consulates. We are not affiliated with the U.S. Department of State or any government agency.</p>
    </Section>

    <Section title="4. Eligibility">
      <p>You must be at least 18 years old, or 13 years or older with verifiable parental consent, to use PrepForVISA. By signing in, you confirm that you meet this requirement.</p>
    </Section>

    <Section title="5. Account Responsibility">
      <p>You are responsible for maintaining the security of your Google account used to sign in. You are responsible for all activity that occurs under your account. Notify us immediately at <a href="mailto:prepforvisainterview@gmail.com" className="underline text-[#0a0a0a]">prepforvisainterview@gmail.com</a> if you suspect unauthorised use.</p>
    </Section>

    <Section title="6. Acceptable Use">
      <p>You agree not to:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>Use the platform for any unlawful purpose or in violation of these terms.</li>
        <li>Attempt to scrape, reverse-engineer, or extract the AI models or prompts.</li>
        <li>Impersonate any person or entity or misrepresent your identity.</li>
        <li>Upload or submit any content that is illegal, harmful, or violates third-party rights.</li>
        <li>Abuse the platform in ways that incur disproportionate infrastructure costs.</li>
      </ul>
    </Section>

    <Section title="7. Payments & Refunds">
      <p>Paid plans are billed in advance. All payments are processed securely via Stripe. Subscription fees are non-refundable except where required by applicable law. You may cancel your subscription at any time; access continues until the end of the billing period.</p>
    </Section>

    <Section title="8. Intellectual Property">
      <p>All content, branding, and code on PrepForVISA are owned by or licensed to Pallav Khanal. AI-generated interview questions are provided for your personal use only. You may not reproduce, distribute, or sell any content from the platform without prior written permission.</p>
    </Section>

    <Section title="9. Limitation of Liability">
      <p>To the fullest extent permitted by law, PrepForVISA and its operator shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to visa denial, loss of data, or service interruption.</p>
    </Section>

    <Section title="10. Termination">
      <p>We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in behaviour that we determine to be harmful to the platform or other users.</p>
    </Section>

    <Section title="11. Governing Law">
      <p>These Terms are governed by the laws of the State of Texas, United States. Any disputes shall be resolved in the courts of Tarrant County, Texas.</p>
    </Section>

    <Section title="12. Changes to These Terms">
      <p>We may update these Terms from time to time. The "Last updated" date will reflect changes. Continued use of the platform constitutes acceptance of the revised Terms.</p>
    </Section>

    <Section title="13. Contact">
      <p>For questions about these Terms, email <a href="mailto:prepforvisainterview@gmail.com" className="underline text-[#0a0a0a]">prepforvisainterview@gmail.com</a>.</p>
    </Section>
  </div>
);

const TAB_CONTENT = [<ContactTab key="contact" />, <PrivacyTab key="privacy" />, <TermsTab key="terms" />];
const TAB_ICONS = [Mail, Shield, FileText];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#0a0a0a] transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0a0a0a]">Support & Legal</h1>
          </div>
          <p className="text-sm text-gray-500">
            Get help, read our privacy policy, or review our terms of service.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8">
          {TABS.map((tab, i) => {
            const Icon = TAB_ICONS[i];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === i
                    ? "bg-white text-[#0a0a0a] shadow-sm"
                    : "text-gray-500 hover:text-[#0a0a0a]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div>{TAB_CONTENT[activeTab]}</div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} PrepForVISA · Built for students with ambition
          </p>
        </div>
      </div>
    </div>
  );
}
