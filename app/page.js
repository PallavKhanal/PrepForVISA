"use client";

import { useEffect } from "react";
import { ArrowRight, Brain, Check, ChevronRight, FileText, Mic, Shield, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/dashboard");
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight select-none">PrepForVISA</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </nav>
          <Link href="/auth">
            <button className="inline-flex items-center bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-8 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          AI-Powered Visa Interview Preparation
        </div>

        <h1 className="text-[3.75rem] font-extrabold tracking-tighter leading-[1.05] max-w-3xl mx-auto">
          Walk into your visa interview fully prepared.
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          PrepForVISA simulates real consular interviews using advanced AI — so you can sharpen
          your answers, build genuine confidence, and walk out approved.
        </p>

        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <Link href="/auth">
            <button className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-7 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer">
              Start Preparing Free <ArrowRight size={15} />
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black bg-white text-sm font-medium px-7 py-3 rounded-lg transition-all duration-150 cursor-pointer">
              See how it works <ChevronRight size={14} />
            </button>
          </a>
        </div>
      </section>

      {/* THE CHALLENGE */}
      <section className="border-y border-gray-100 py-20 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
              The Challenge
            </p>
            <h2 className="text-3xl font-bold tracking-tight leading-snug">
              Most applicants prepare by reading a list of questions. That is not enough.
            </h2>
            <p className="text-gray-500 mt-5 text-sm leading-relaxed">
              A consular interview typically lasts 60 to 120 seconds. In that window, the officer
              evaluates your intent, the credibility of your finances, your ties to your home
              country, and your ability to communicate clearly under pressure. Reading answers in
              your head does not replicate that environment.
            </p>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              PrepForVISA puts you in a realistic practice environment before the real one —
              so the interview feels familiar, not foreign.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <ChallengePoint
              label="Intent is everything"
              desc="Officers look for a clear, logical link between your background, your chosen program, and your post-graduation plan at home."
            />
            <ChallengePoint
              label="Finances must be self-contained"
              desc="You need to explain who is sponsoring you, how they earn, and that the funds cover the full I-20 estimate — without relying on U.S. employment."
            />
            <ChallengePoint
              label="Delivery matters"
              desc="Short, direct answers signal confidence. Over-explaining raises doubts. The right answer is one sentence, not a paragraph."
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Features
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              Everything you need to succeed
            </h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              From personalized question banks to live voice practice sessions — built
              specifically for F1 student visa applicants preparing for the U.S. consular interview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain size={18} />}
              title="AI Question Generation"
              desc="Get a custom set of 10–15 interview questions tailored specifically to your F1 study plan, financial situation, and intended U.S. university."
            />
            <FeatureCard
              icon={<Mic size={18} />}
              title="Live Voice Mock Interviews"
              desc="Practice answering out loud with a real-time AI interviewer that responds like a consular officer — no scripts, no shortcuts."
              featured
            />
            <FeatureCard
              icon={<FileText size={18} />}
              title="Expert Strategy & Advice"
              desc="Access curated guidance on documentation, body language, financial proof presentation, and the questions that trip people up."
            />
          </div>
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section className="bg-[#fafafa] border-y border-gray-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Coverage
            </p>
            <h2 className="text-4xl font-bold tracking-tight">Four areas that decide your outcome</h2>
            <p className="text-gray-500 mt-4 max-w-sm mx-auto text-sm leading-relaxed">
              Every visa interview question falls into one of these categories.
              PrepForVISA trains you across all of them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CoverageCard
              icon={<Target size={18} />}
              title="Intent & Academic Purpose"
              desc="Define a clear, logical chain from your background to your chosen major, your university selection, and your career plan back home. Officers approve candidates who have a coherent story."
            />
            <CoverageCard
              icon={<Shield size={18} />}
              title="Financial Explanation"
              desc="Learn to present your sponsor's income, liquid savings, and total funding in a way that is complete, consistent, and does not imply dependence on U.S. employment."
            />
            <CoverageCard
              icon={<Users size={18} />}
              title="Ties to Home Country"
              desc="Demonstrate that the degree is a step in your career, not a path to staying abroad. Personal, professional, and practical ties all contribute to this picture."
            />
            <CoverageCard
              icon={<TrendingUp size={18} />}
              title="Interview Delivery"
              desc="Short answers signal confidence. Over-explaining raises flags. PrepForVISA drills you on keeping responses to one or two sentences — and stopping when the answer is complete."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Process
            </p>
            <h2 className="text-4xl font-bold tracking-tight">Up and running in minutes</h2>
            <p className="text-gray-500 mt-4 max-w-sm mx-auto text-sm leading-relaxed">
              No complicated setup. Go from sign-up to live mock interview in under two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            <Step
              number="01"
              title="Create your profile"
              desc="Sign in with Google and tell us about your intended major, university, and how you plan to fund your F1 studies."
            />
            <Step
              number="02"
              title="Generate your interview"
              desc="Our AI builds a tailored question set matched precisely to your situation in seconds."
            />
            <Step
              number="03"
              title="Practice out loud"
              desc="Start a live voice mock session and get comfortable answering under realistic pressure."
            />
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="bg-[#fafafa] border-y border-gray-100 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Who It&apos;s For
            </p>
            <h2 className="text-3xl font-bold tracking-tight leading-snug">
              Built for applicants who take their interview seriously.
            </h2>
            <p className="text-gray-500 mt-5 text-sm leading-relaxed">
              PrepForVISA is designed for F1 visa applicants who want more than a generic
              question list — they want to practice the way the real U.S. consular interview
              actually works.
            </p>
            <Link href="/auth" className="inline-block mt-8">
              <button className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-7 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer">
                Get Started Free <ArrowRight size={15} />
              </button>
            </Link>
          </div>
          <ul className="space-y-4 pt-1">
            {[
              "You have an F-1 student visa interview coming up.",
              "You have never been interviewed by a consular officer before.",
              "You are not confident about how to present your financial situation.",
              "You want to practice speaking your answers out loud, not just reading them.",
              "You have been rejected before and want to understand what to fix.",
              "You would rather be overprepared than walk in hoping for the best.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <Check size={15} className="mt-0.5 shrink-0 text-gray-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-bold tracking-tight">Common questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            <FaqItem
              q="Which visa does PrepForVISA focus on?"
              a="PrepForVISA is focused exclusively on the F-1 student visa for the United States. Every question set and mock session is tailored specifically to the U.S. consular F1 interview."
            />
            <FaqItem
              q="Do I need any special setup for the voice mock interview?"
              a="Just a working microphone. The mock interview runs entirely in your browser — no downloads or extensions required."
            />
            <FaqItem
              q="How does question generation work?"
              a="You provide a brief description of your intended major, U.S. university, and how you plan to fund your studies. The AI uses this to generate 10–15 F1-specific questions tailored to your profile."
            />
            <FaqItem
              q="How long is the mock interview session?"
              a="Sessions are capped at 3 minutes to replicate the real interview window. After the session ends, a post-interview summary is shown."
            />
            <FaqItem
              q="Is it free to use?"
              a="Yes. Sign in with your Google account and you can start preparing immediately — no payment required to get started."
            />
            <FaqItem
              q="Can I run multiple practice sessions?"
              a="Yes. You can generate new question sets and start fresh mock interviews as many times as you need before your actual interview date."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#fafafa] border-t border-gray-100 py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Your interview is closer than it feels.
          </h2>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Sign in with Google and generate your first personalized question set in under a minute.
          </p>
          <Link href="/auth" className="inline-block mt-8">
            <button className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-8 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer">
              Start Preparing Free <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-bold text-sm select-none">PrepForVISA</span>
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} PrepForVISA. Built for students with ambition.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <Link href="/auth" className="hover:text-black transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function ChallengePoint({ label, desc }) {
  return (
    <div className="border border-gray-100 rounded-xl p-5 bg-white">
      <p className="font-semibold text-sm mb-1">{label}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, featured = false }) {
  return (
    <div
      className={`rounded-xl p-8 border transition-all duration-200 ${featured
        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
        : "bg-white border-gray-100 hover:border-gray-300"
        }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${featured ? "bg-white/10 text-white" : "bg-gray-50 text-gray-700"
          }`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <p className={`text-sm leading-relaxed ${featured ? "text-gray-300" : "text-gray-500"}`}>
        {desc}
      </p>
    </div>
  );
}

function CoverageCard({ icon, title, desc }) {
  return (
    <div className="bg-white border border-gray-100 hover:border-gray-300 rounded-xl p-8 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="bg-white p-10">
      <p className="text-5xl font-black text-gray-100 mb-5 leading-none select-none">{number}</p>
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div>
      <p className="font-semibold text-sm mb-2">{q}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
    </div>
  );
}
