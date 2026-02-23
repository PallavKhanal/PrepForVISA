"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, Camera } from "lucide-react";

/* ── Password strength ── */
function getStrength(pwd) {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return Math.min(s, 4);
}
const STRENGTH_META = [
  { label: "", color: "bg-border" },
  { label: "Weak", color: "bg-red-400" },
  { label: "Fair", color: "bg-orange-400" },
  { label: "Good", color: "bg-yellow-400" },
  { label: "Strong", color: "bg-green-500" },
];

function StrengthBar({ password }) {
  const s = getStrength(password);
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= s ? STRENGTH_META[s].color : "bg-border"
            }`}
          />
        ))}
      </div>
      {s > 0 && (
        <p className={`text-[11px] font-medium transition-colors ${
          s === 1 ? "text-red-400" : s === 2 ? "text-orange-400" : s === 3 ? "text-yellow-500" : "text-green-500"
        }`}>
          {STRENGTH_META[s].label}
        </p>
      )}
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("signup");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/dashboard");
    });
  }, []);

  const reset = () => {
    setFullName(""); setEmail(""); setPassword(""); setConfirmPassword("");
    setError(""); setEmailSent(false); setShowPassword(false); setShowConfirm(false);
    setAvatarFile(null); setAvatarPreview(null);
  };

  const handleAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const uploadAvatarAfterSignup = async (userEmail, file) => {
    try {
      const ext = file.name.split(".").pop();
      const path = `${userEmail}/avatar.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (uploadErr) return;
      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.from("Users").update({ picture: publicUrl }).eq("email", userEmail);
    } catch (_) {
      // Silent — user can update from Settings
    }
  };

  const switchMode = (m) => { setMode(m); reset(); };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (err) setError(err.message);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (!fullName.trim()) return setError("Please enter your full name.");
      if (password.length < 8) return setError("Password must be at least 8 characters.");
      if (password !== confirmPassword) return setError("Passwords do not match.");
    }
    setLoading(true);
    if (mode === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email, password,
        options: { data: { name: fullName.trim() } },
      });
      if (err) {
        setError(err.message);
      } else {
        if (avatarFile) await uploadAvatarAfterSignup(email, avatarFile);
        if (data.session) router.replace("/dashboard");
        else setEmailSent(true);
      }
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message === "Invalid login credentials"
        ? "Incorrect email or password."
        : err.message);
      else router.replace("/dashboard");
    }
    setLoading(false);
  };

  const field =
    "w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-400/10 transition-all";

  return (
    <>
      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -50px) scale(1.08); }
          66%       { transform: translate(-30px, 30px) scale(0.94); }
        }
        @keyframes orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-50px, 40px) scale(0.92); }
          66%       { transform: translate(35px, -35px) scale(1.1); }
        }
        @keyframes orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(25px, 45px) scale(1.05); }
        }
      `}</style>

      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

        {/* ── Background orbs ── */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
          {/* Top-right — blue */}
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 dark:opacity-15 blur-[80px]"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, #818cf8 40%, transparent 70%)",
              animation: "orb-1 18s ease-in-out infinite",
            }}
          />
          {/* Bottom-left — violet */}
          <div
            className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full opacity-20 dark:opacity-12 blur-[90px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, #c084fc 40%, transparent 70%)",
              animation: "orb-2 22s ease-in-out infinite 4s",
            }}
          />
          {/* Center-bottom — subtle warm */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-15 dark:opacity-8 blur-[70px]"
            style={{
              background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
              animation: "orb-3 26s ease-in-out infinite 8s",
            }}
          />
        </div>

        {/* ── Grid texture ── */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]"
          style={{
            maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 25%, black 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 25%, black 100%)",
          }}
        />

        {/* ── Content ── */}
        <div className="w-full max-w-[368px] relative z-10">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-9">
            <Image src="/logo.svg" alt="PrepForVISA" width={28} height={28} />
            <span className="text-[15px] font-semibold text-foreground tracking-tight">PrepForVISA</span>
          </div>

          {emailSent ? (
            /* ── Email sent ── */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl shadow-black/8">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-foreground/70" />
              </div>
              <h1 className="text-[18px] font-semibold text-foreground mb-2">Check your inbox</h1>
              <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-6">
                We sent a confirmation link to{" "}
                <span className="text-foreground font-medium">{email}</span>.
                Click it to activate your account, then sign in.
              </p>
              <button
                onClick={() => switchMode("signin")}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            /* ── Form card (frosted glass) ── */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl shadow-black/8">

              <h1 className="text-[20px] font-semibold text-foreground mb-1">
                {mode === "signin" ? "Sign in" : "Create an account"}
              </h1>
              <p className="text-[13px] text-muted-foreground mb-7">
                {mode === "signin"
                  ? "Welcome back. Enter your credentials to continue."
                  : "Fill in your details to get started — it's free."}
              </p>

              {/* Google OAuth button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg py-2.5 text-[13.5px] font-medium text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-700/60 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                <span className="text-[11px] text-muted-foreground/50 font-medium">or</span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Optional avatar picker (signup only) */}
                {mode === "signup" && (
                  <div className="flex flex-col items-center gap-1.5 pb-2">
                    <label className="relative w-16 h-16 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-600 cursor-pointer overflow-hidden group hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
                      {avatarPreview ? (
                        <Image src={avatarPreview} alt="Preview" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <Camera className="w-5 h-5 text-zinc-400" />
                        </div>
                      )}
                      {avatarPreview && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
                    </label>
                    <span className="text-[11px] text-muted-foreground/60">Profile photo (optional)</span>
                  </div>
                )}

                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground/80">Full name</label>
                    <input
                      type="text" required autoComplete="name"
                      value={fullName} onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Smith" className={field}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-foreground/80">Email address</label>
                  <input
                    type="email" required autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" className={field}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-foreground/80">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} required
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Create a password" : "••••••••"}
                      className={`${field} pr-10`}
                    />
                    <button type="button" tabIndex={-1}
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {mode === "signup" && <StrengthBar password={password} />}
                </div>

                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground/80">Confirm password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"} required
                        autoComplete="new-password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`${field} pr-10`}
                      />
                      <button type="button" tabIndex={-1}
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/80 dark:bg-red-950/20 px-3.5 py-2.5 backdrop-blur-sm">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[12.5px] text-red-600 dark:text-red-400 leading-snug">{error}</p>
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-lg py-2.5 text-[13.5px] font-medium hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-1"
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : mode === "signin" ? "Sign in" : "Create account"}
                </button>

              </form>
            </div>
          )}

          {/* Mode switch */}
          {!emailSent && (
            <p className="text-center text-[13px] text-muted-foreground mt-5">
              {mode === "signin" ? "No account yet? " : "Already have an account? "}
              <button
                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                className="text-foreground font-medium hover:underline underline-offset-4 transition-all"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
          )}

          <p className="text-center text-[11px] text-muted-foreground/40 mt-4">
            By continuing you agree to our{" "}
            <a href="/legal" target="_blank" rel="noopener noreferrer"
              className="hover:text-muted-foreground/70 underline underline-offset-2 transition-colors">
              Terms & Privacy Policy
            </a>.
          </p>

        </div>
      </div>
    </>
  );
}
