"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center p-8 cursor-default">

      {/* HEADER */}
      <header className="w-full flex items-center justify-between max-w-6xl mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight select-none cursor-pointer">
          PrepForVISA
        </h1>

        <Link href="/auth" className="cursor-pointer">
          <Button 
            variant="outline" 
            className="border border-black hover:bg-black hover:text-white transition-all px-5 py-2.5 text-sm cursor-pointer"
          >
            Login / Sign Up
          </Button>
        </Link>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-20 max-w-3xl">
        <h2 className="text-[3.6rem] font-extrabold leading-[1.05] tracking-tighter">
          Master Your <span className="underline decoration-[4px]">F-1 Visa Interview</span>.
        </h2>

        <p className="text-gray-600 text-lg mt-7 max-w-xl leading-relaxed">
          Train with a realistic AI visa officer that replicates real consular questioning.
          Prepare your Intent, Financial explanation, and Confidence with precision.
        </p>

        <Link href="/auth" className="mt-10 cursor-pointer">
          <Button className="bg-black text-white px-12 py-5 text-lg hover:bg-gray-800 transition-all flex items-center gap-2 uppercase tracking-wide cursor-pointer">
            Get Started <ArrowRight size={20} />
          </Button>
        </Link>
      </section>

      {/* VALUE GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full mt-28 mb-20">
        <FeatureCard 
          title="Realistic Mock Interviews" 
          desc="Live AI voice questioning that adapts to your tone, clarity, and reasoning."
        />
        <FeatureCard 
          title="Financial & Intent Readiness" 
          desc="Learn how to present your financial plan and academic purpose with confidence."
        />
        <FeatureCard 
          title="Past Interview Experiences" 
          desc="Study real cases — both approved and rejected — to understand what truly matters."
        />
      </section>

      {/* SECOND CTA */}
      <div className="w-full flex justify-center mb-16">
        <Link href="/auth" className="cursor-pointer">
          <Button className="border border-black bg-white text-black hover:bg-black hover:text-white px-10 py-4 text-base transition-all cursor-pointer">
            Get Started — Takes 30 Seconds
          </Button>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="text-gray-500 text-xs py-8 text-center select-none">
        © {new Date().getFullYear()} PrepForVISA — Built for students with ambition.
      </footer>

    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="border border-black p-8 rounded-lg hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-700 hover:text-white">
        {desc}
      </p>
    </div>
  );
}
