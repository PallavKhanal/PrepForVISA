"use client";
import React from 'react'
import { Mic, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateOptions = () => {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

            {/* Featured action — dark, matches landing page FeatureCard "featured" variant */}
            <div
                className="group rounded-xl p-8 border border-[#0a0a0a] bg-[#0a0a0a] text-white transition-all duration-150 cursor-pointer hover:shadow-md hover:-translate-y-px active:translate-y-0 flex flex-col justify-between"
                onClick={() => router.push('/dashboard/create-mock')}
            >
                <div>
                    <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-6">
                        <Mic size={18} />
                    </div>
                    <h3 className="font-semibold text-base mb-2">Start Mock Interview</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Practice answering out loud with a real-time AI interviewer that responds like a consular officer — no scripts, no shortcuts.
                    </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white group-hover:gap-2.5 transition-all duration-150 mt-8">
                    Launch session <ArrowRight size={14} />
                </div>
            </div>

            {/* Secondary action — light, matches landing page CoverageCard */}
            <div
                className="group rounded-xl p-8 border border-gray-100 bg-white hover:border-gray-300 transition-all duration-150 cursor-pointer flex flex-col justify-between"
                onClick={() => router.push('/dashboard/create-interview')}
            >
                <div>
                    <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center mb-6">
                        <FileText size={18} />
                    </div>
                    <h3 className="font-semibold text-base text-[#0a0a0a] mb-2">Generate Questions</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Get a custom set of 10–15 F1-specific interview questions tailored to your intended major, U.S. university, and financial situation.
                    </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400 group-hover:text-[#0a0a0a] group-hover:gap-2.5 transition-all duration-150 mt-8">
                    Generate now <ArrowRight size={14} />
                </div>
            </div>

        </div>
    );
};

export default CreateOptions;
