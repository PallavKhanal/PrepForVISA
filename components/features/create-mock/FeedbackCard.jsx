import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Skeleton shown while feedback is loading ─────────────────── */
export function FeedbackSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden animate-pulse mt-6">
      <div className="bg-muted border-b border-border px-6 py-4">
        <div className="h-3 w-44 bg-muted-foreground/20 rounded" />
      </div>
      <div className="px-6 py-6 space-y-5">
        {/* Score row */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-muted-foreground/20 rounded-lg shrink-0" />
          <div className="flex-1 h-3 bg-muted-foreground/20 rounded-full" />
        </div>
        {/* Summary */}
        <div className="space-y-2">
          <div className="h-3 bg-muted-foreground/20 rounded w-full" />
          <div className="h-3 bg-muted-foreground/20 rounded w-4/5" />
        </div>
        {/* Sections */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-28 bg-muted-foreground/20 rounded" />
            <div className="h-2.5 bg-muted-foreground/10 rounded w-full" />
            <div className="h-2.5 bg-muted-foreground/10 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Score color: red → orange → yellow → green ──────────────── */
const scoreColor = (score) => {
  if (score <= 3) return "text-red-500";
  if (score <= 5) return "text-orange-500";
  if (score <= 7) return "text-yellow-500";
  return "text-emerald-500";
};

/* ── Main FeedbackCard ────────────────────────────────────────── */
const FeedbackCard = ({ feedback, className }) => {
  if (!feedback) return null;

  const { score, summary, strongPoints = [], weakPoints = [], improvements = [] } = feedback;
  const dotPosition = `${((score - 1) / 9) * 100}%`;

  return (
    <div className={cn("rounded-xl border border-border bg-background overflow-hidden", className)}>

      {/* Header */}
      <div className="bg-muted border-b border-border px-6 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          AI Performance Feedback
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">

        {/* Score row */}
        <div className="flex items-center gap-4">
          <div className={cn("text-3xl font-bold tabular-nums leading-none shrink-0 w-10 text-center", scoreColor(score))}>
            {score}
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="relative h-2.5 rounded-full overflow-visible"
              style={{ background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e)" }}>
              {/* Dot indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-foreground shadow-sm -translate-x-1/2"
                style={{ left: dotPosition }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground/60 font-medium">
              <span>Needs Work</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="border-l-2 border-border pl-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Strong Points */}
        {strongPoints.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Strong Points</p>
            </div>
            <ul className="space-y-1.5 pl-6">
              {strongPoints.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed list-disc">{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Weak Points */}
        {weakPoints.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Areas of Concern</p>
            </div>
            <ul className="space-y-1.5 pl-6">
              {weakPoints.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed list-disc">{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {improvements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">How to Improve</p>
            </div>
            <ul className="space-y-1.5 pl-6">
              {improvements.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed list-disc">{point}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default FeedbackCard;
