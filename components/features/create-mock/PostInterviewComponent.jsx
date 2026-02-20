"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, LayoutDashboard } from "lucide-react";

const PostInterviewComponent = () => {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-[#0a0a0f] overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-emerald-900/15 blur-[140px]" />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-xl text-center">

          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-3 block">
            Session Complete
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            Interview Finished
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            Your mock visa interview has ended. Review your performance on the dashboard.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] font-semibold text-sm py-4 rounded-2xl shadow-lg hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInterviewComponent;
