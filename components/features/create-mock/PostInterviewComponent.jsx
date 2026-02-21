"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";

const formatDuration = (seconds) => {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const PostInterviewComponent = ({ outcome = "unknown", durationSeconds = 0 }) => {
  const router = useRouter();

  const isApproved = outcome === "approved";
  const isDenied = outcome === "denied";
  const duration = formatDuration(durationSeconds);

  return (
    <div className="flex items-center justify-center h-full w-full bg-white">
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

            {/* Outcome badge */}
            {(isApproved || isDenied) && (
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4 ${
                isApproved
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {isApproved
                  ? <CheckCircle2 className="w-3.5 h-3.5" />
                  : <XCircle className="w-3.5 h-3.5" />
                }
                {isApproved ? "Visa Approved" : "Visa Denied"}
              </div>
            )}

            {/* Duration */}
            {duration && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-6">
                <Clock className="w-3.5 h-3.5" />
                <span>{duration}</span>
              </div>
            )}

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
