"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const PostInterviewComponent = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="w-full max-w-md mx-4">

        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">

          {/* Header strip */}
          <div className="bg-[#fafafa] border-b border-gray-100 px-8 py-5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Session Complete
            </p>
          </div>

          <div className="px-8 py-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#0a0a0a] mb-2">
              Interview Finished
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs mx-auto">
              Your mock F-1 visa interview has ended. Review your session history on the dashboard.
            </p>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInterviewComponent;
