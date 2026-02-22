"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/dashboard");
    });
  }, []);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setEmailSent(false);
    setShowPassword(false);
    setShowConfirm(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: fullName.trim() } },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else if (data.session) {
        router.replace("/dashboard");
      } else {
        setEmailSent(true);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(
          signInError.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : signInError.message
        );
      } else {
        router.replace("/dashboard");
      }
    }

    setLoading(false);
  };

  const inputClass =
    "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30 transition-all";

  return (
    <div className="min-h-screen flex bg-background">

      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex w-[44%] shrink-0 bg-foreground flex-col p-14">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/Logo.png"
            alt="PrepForVISA"
            width={30}
            height={30}
            className="invert dark:invert-0"
          />
          <span className="text-background text-[16px] font-semibold tracking-tight">PrepForVISA</span>
        </div>

        {/* Center copy */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-background/35 text-[11px] font-semibold uppercase tracking-widest mb-5">
            F-1 Visa Interview Prep
          </p>
          <h1 className="text-[2.6rem] font-bold text-background leading-[1.2] mb-6">
            Walk in prepared.<br />Walk out approved.
          </h1>
          <div className="w-8 h-px bg-background/20 mb-6" />
          <p className="text-background/45 text-[15px] leading-relaxed max-w-[300px]">
            AI-powered mock interviews tailored to your university, major, and financial background.
          </p>
        </div>

        {/* Footer */}
        <p className="text-background/20 text-[11px]">
          © {new Date().getFullYear()} PrepForVISA
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <Image src="/Logo.png" alt="PrepForVISA" width={28} height={28} />
          <span className="text-foreground text-base font-semibold">PrepForVISA</span>
        </div>

        <div className="w-full max-w-[360px]">

          {emailSent ? (
            /* ── Email confirmation sent ── */
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-6 h-6 text-foreground" />
              </div>
              <h2 className="text-[22px] font-bold text-foreground mb-2">Check your inbox</h2>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                We sent a confirmation link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Click it to activate your account, then sign in.
              </p>
              <button
                onClick={() => switchMode("signin")}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              {/* ── Heading ── */}
              <div className="mb-7">
                <h2 className="text-[22px] font-bold text-foreground">
                  {mode === "signin" ? "Welcome back" : "Create your account"}
                </h2>
                <p className="text-[13.5px] text-muted-foreground mt-1">
                  {mode === "signin"
                    ? "Sign in to continue your interview prep."
                    : "Start preparing for your F-1 visa interview — it's free."}
                </p>
              </div>

              {/* ── Mode toggle ── */}
              <div className="flex bg-muted rounded-lg p-1 mb-7 border border-border">
                {["signin", "signup"].map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-2 rounded-md text-[13px] font-medium transition-all ${
                      mode === m
                        ? "bg-background text-foreground shadow-sm border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {mode === "signup" && (
                  <div>
                    <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide mb-1.5 block">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                )}

                <div>
                  <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide mb-1.5 block">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide">
                      Password
                    </label>
                    {mode === "signup" && (
                      <span className="text-[11px] text-muted-foreground">Min. 8 characters</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Create a password" : "Your password"}
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide mb-1.5 block">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`${inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Error banner */}
                {error && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 px-3.5 py-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-red-600 dark:text-red-400 leading-snug">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-lg py-2.5 text-[14px] font-medium hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-1"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {mode === "signin" ? "Sign in" : "Create account"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Legal */}
              <p className="text-center text-[11.5px] text-muted-foreground mt-7 leading-relaxed">
                By continuing, you agree to our{" "}
                <a
                  href="/legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Terms of Service & Privacy Policy
                </a>
                .
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
