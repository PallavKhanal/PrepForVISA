"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import FeedbackCard, { FeedbackSkeleton } from "./FeedbackCard";

const formatDuration = (seconds) => {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const PostInterviewComponent = ({ outcome = "unknown", durationSeconds = 0, feedback = null, feedbackLoading = false }) => {
  const router = useRouter();

  const isApproved = outcome === "approved";
  const isDenied = outcome === "denied";
  const duration = formatDuration(durationSeconds);

  return (
    <div className="flex items-start justify-center min-h-full py-10 px-4 w-full bg-background overflow-y-auto">
      <div className="w-full max-w-lg mx-4">

        <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">

          {/* Header strip */}
          <div className="bg-muted border-b border-border px-8 py-5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Session Complete
            </p>
          </div>

          <div className="px-8 py-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Interview Finished
            </h2>

            {/* Outcome badge */}
            {(isApproved || isDenied) && (
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4 ${
                isApproved
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400"
                  : "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400"
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
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Clock className="w-3.5 h-3.5" />
                <span>{duration}</span>
              </div>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs mx-auto">
              Your mock F-1 visa interview has ended. AI feedback is loading below — review your full session history on the dashboard.
            </p>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background text-sm font-medium py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback section */}
        {feedbackLoading && <FeedbackSkeleton />}
        {!feedbackLoading && feedback && <FeedbackCard feedback={feedback} className="mt-6" />}
        {!feedbackLoading && !feedback && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            Feedback could not be generated for this session.
          </p>
        )}

      </div>
    </div>
  );
};

export default PostInterviewComponent;
