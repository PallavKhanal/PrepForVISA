"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import {
  User, Mail, Camera, Mic, Download, Shield,
  LogOut, Trash2, Check, AlertTriangle,
} from "lucide-react";

/* ── Toggle component ── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#0a0a0a]" : "bg-neutral-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ── Section wrapper ── */
function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-neutral-100">
        <h2 className="text-[15px] font-semibold text-[#0a0a0a]">{title}</h2>
        {description && <p className="text-[13px] text-neutral-500 mt-0.5">{description}</p>}
      </div>
      <div className="divide-y divide-neutral-100">{children}</div>
    </section>
  );
}

/* ── Row inside a section ── */
function Row({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4">
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-neutral-800">{label}</p>
        {hint && <p className="text-[12px] text-neutral-400 mt-0.5">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();

  /* Profile */
  const [displayName, setDisplayName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [nameSaving, setNameSaving] = useState(false);

  /* Interview defaults (localStorage) */
  const [cameraDefault, setCameraDefault] = useState(true);
  const [micDefault, setMicDefault] = useState(true);

  /* Delete account */
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* Export */
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (user?.name) setDisplayName(user.name);
    const prefs = localStorage.getItem("interviewPrefs");
    if (prefs) {
      const parsed = JSON.parse(prefs);
      setCameraDefault(parsed.camera ?? true);
      setMicDefault(parsed.mic ?? true);
    }
  }, [user]);

  const savePrefs = (camera, mic) => {
    localStorage.setItem("interviewPrefs", JSON.stringify({ camera, mic }));
  };

  const handleCameraToggle = (val) => {
    setCameraDefault(val);
    savePrefs(val, micDefault);
  };

  const handleMicToggle = (val) => {
    setMicDefault(val);
    savePrefs(cameraDefault, val);
  };

  const handleSaveName = async () => {
    if (!user?.email || !displayName.trim()) return;
    setNameSaving(true);
    await supabase.from("Users").update({ name: displayName.trim() }).eq("email", user.email);
    setNameSaving(false);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  const handleExport = async () => {
    if (!user?.email) return;
    setExporting(true);
    const [{ data: mocks }, { data: interviews }] = await Promise.all([
      supabase.from("MockInterviews").select("*").eq("user_email", user.email),
      supabase.from("Interviews").select("*").eq("user_email", user.email),
    ]);
    const payload = {
      exported_at: new Date().toISOString(),
      account: { name: user.name, email: user.email },
      mock_interviews: mocks || [],
      question_banks: interviews || [],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prepforvisa-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE" || !user?.email) return;
    setDeleting(true);
    await Promise.all([
      supabase.from("MockInterviews").delete().eq("user_email", user.email),
      supabase.from("Interviews").delete().eq("user_email", user.email),
    ]);
    await supabase.from("Users").delete().eq("email", user.email);
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto max-w-2xl px-6 py-10 space-y-6">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#0a0a0a]">Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your account and preferences.</p>
        </div>

        {/* ── PROFILE ── */}
        <Section title="Profile" description="Your public identity on PrepForVISA.">
          <div className="px-6 py-5 flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-neutral-200 shrink-0">
              {user?.picture ? (
                <Image src={user.picture} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-neutral-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-[14px] font-medium text-neutral-800">{user?.name || "—"}</p>
              <p className="text-[12px] text-neutral-400">{user?.email}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Signed in via Google</p>
            </div>
          </div>

          <Row label="Display name" hint="Shown on your dashboard and interview history.">
            <div className="flex items-center gap-2">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 w-44 focus:outline-none focus:border-neutral-400 transition-colors"
                placeholder="Your name"
              />
              <button
                onClick={handleSaveName}
                disabled={nameSaving || !displayName.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0a] text-white text-[12px] font-medium hover:bg-neutral-800 disabled:opacity-40 transition-all"
              >
                {nameSaved ? <><Check className="w-3 h-3" /> Saved</> : nameSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </Row>

          <Row label="Email address" hint="Managed by Google — cannot be changed here.">
            <div className="flex items-center gap-2 text-[13px] text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5">
              <Mail className="w-3.5 h-3.5" />
              {user?.email}
            </div>
          </Row>
        </Section>

        {/* ── INTERVIEW DEFAULTS ── */}
        <Section
          title="Interview Defaults"
          description="Choose what's on when you start a mock interview. Saved locally on this device."
        >
          <Row
            label="Camera on by default"
            hint="Your camera will start enabled when you begin a session."
          >
            <Toggle enabled={cameraDefault} onChange={handleCameraToggle} />
          </Row>
          <Row
            label="Microphone on by default"
            hint="Your mic will start unmuted when you begin a session."
          >
            <Toggle enabled={micDefault} onChange={handleMicToggle} />
          </Row>
        </Section>

        {/* ── DATA & PRIVACY ── */}
        <Section
          title="Data & Privacy"
          description="Access, export, or review how your data is handled."
        >
          <Row
            label="Export your data"
            hint="Download all your mock interviews and question banks as a JSON file."
          >
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-[#0a0a0a] disabled:opacity-50 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {exporting ? "Exporting…" : "Export JSON"}
            </button>
          </Row>
          <Row
            label="Privacy Policy & Terms"
            hint="Read how we collect, store, and use your data."
          >
            <Link
              href="/legal"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-[#0a0a0a] transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              View Legal
            </Link>
          </Row>
        </Section>

        {/* ── ACCOUNT ── */}
        <Section title="Account">
          <Row label="Sign out" hint="You will be redirected to the login page.">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-[#0a0a0a] transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </Row>
        </Section>

        {/* ── DANGER ZONE ── */}
        <section className="rounded-2xl border border-red-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-red-100">
            <h2 className="text-[15px] font-semibold text-red-600">Danger Zone</h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">These actions are permanent and cannot be undone.</p>
          </div>

          <div className="px-6 py-4 flex items-center justify-between gap-6">
            <div>
              <p className="text-[14px] font-medium text-neutral-800">Delete account</p>
              <p className="text-[12px] text-neutral-400 mt-0.5">
                Permanently removes all your data — interviews, transcripts, and profile.
              </p>
            </div>
            <button
              onClick={() => setDeleteOpen(true)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:border-red-400 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete account
            </button>
          </div>
        </section>

        {/* ── Delete confirmation modal ── */}
        {deleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl border shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0a0a0a]">Delete your account</h3>
                  <p className="text-[12px] text-neutral-400">This cannot be undone.</p>
                </div>
              </div>
              <p className="text-[13.5px] text-neutral-600 leading-6 mb-4">
                All your mock interviews, transcripts, question banks, and profile data will be
                permanently deleted. Type <strong>DELETE</strong> below to confirm.
              </p>
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 transition-colors mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setDeleteOpen(false); setDeleteConfirm(""); }}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:border-neutral-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== "DELETE" || deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {deleting ? "Deleting…" : "Delete forever"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
