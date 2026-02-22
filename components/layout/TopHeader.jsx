"use client";

import React, { useState, useEffect, useRef } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, ChevronRight, Sun, Moon, Mic, FileText, X } from "lucide-react";
import { useUser } from "@/app/Provider";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const TopHeader = () => {
    const { user } = useUser();
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    /* ── Search ── */
    const [searchValue, setSearchValue] = useState("");

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter" && searchValue.trim()) {
            router.push("/previous-interviews?q=" + encodeURIComponent(searchValue.trim()));
            setSearchValue("");
        }
    };

    /* ── Notifications ── */
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifRead, setNotifRead] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notifLoading, setNotifLoading] = useState(false);
    const notifRef = useRef(null);

    // Close on click-outside
    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const fetchNotifications = async () => {
        if (!user?.email) return;
        setNotifLoading(true);
        const [{ data: mocks }, { data: ints }] = await Promise.all([
            supabase.from("MockInterviews").select("id, outcome, created_at").eq("user_email", user.email).order("created_at", { ascending: false }).limit(5),
            supabase.from("Interviews").select("interview_id, id, country, created_at").eq("user_email", user.email).order("created_at", { ascending: false }).limit(5),
        ]);
        const items = [
            ...(mocks || []).map((m) => ({
                id: `mock-${m.id}`,
                icon: Mic,
                title: "Completed Mock Interview",
                description: m.outcome === "approved" ? "F1 Visa — Approved" : m.outcome === "denied" ? "F1 Visa — Denied" : "F1 Visa — Session ended",
                time: m.created_at,
            })),
            ...(ints || []).map((i) => ({
                id: `int-${i.interview_id || i.id}`,
                icon: FileText,
                title: "Generated Question Bank",
                description: `${i.country || "F1"} Visa questions`,
                time: i.created_at,
            })),
        ]
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(0, 5);
        setNotifications(items);
        setNotifLoading(false);
    };

    const handleBellClick = () => {
        const opening = !notifOpen;
        setNotifOpen(opening);
        if (opening) {
            setNotifRead(true);
            fetchNotifications();
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-8">
            <div className="flex items-center gap-6">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />

                {/* Breadcrumb */}
                <div className="hidden md:flex items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer transition-colors">Platform</span>
                    <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
                    <span className="text-foreground">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Search */}
                <div className="relative hidden md:block w-72">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search interviews… (Enter)"
                        className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-input focus:bg-background transition-all text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Toggle dark mode"
                >
                    <Sun className="h-5 w-5 hidden dark:block" />
                    <Moon className="h-5 w-5 dark:hidden" />
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={handleBellClick}
                        className="relative text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <Bell className="h-5 w-5" />
                        {!notifRead && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-foreground border-2 border-background" />
                        )}
                    </button>

                    {/* Notification panel */}
                    {notifOpen && (
                        <div className="absolute right-0 top-8 w-80 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground">Notifications</p>
                                <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="max-h-72 overflow-y-auto divide-y divide-border">
                                {notifLoading ? (
                                    <div className="py-8 flex items-center justify-center">
                                        <div className="h-4 w-4 rounded-full border-2 border-border border-t-foreground animate-spin" />
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="py-10 flex flex-col items-center justify-center text-muted-foreground">
                                        <Bell className="w-6 h-6 mb-2 text-border" />
                                        <p className="text-sm">No activity yet</p>
                                    </div>
                                ) : (
                                    notifications.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
                                                    <Icon size={13} className="text-muted-foreground" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-medium text-foreground leading-snug">{item.title}</p>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.description}</p>
                                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mt-1">{timeAgo(item.time)}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2.5 border-t border-border">
                                <button
                                    onClick={() => { setNotifOpen(false); router.push("/previous-interviews"); }}
                                    className="w-full text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    View all activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                <Link href="/settings" className="flex items-center gap-4 pl-8 border-l border-border cursor-pointer group">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-sm font-semibold text-foreground leading-none mb-1 group-hover:text-muted-foreground transition-colors">
                            {user?.name || "User"}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground leading-none">
                            Account
                        </span>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-border overflow-hidden shrink-0 group-hover:border-input transition-all bg-muted">
                        {user?.picture ? (
                            <Image src={user.picture} alt="Avatar" width={40} height={40} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground font-semibold text-sm">
                                {(user?.name || "U")[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default TopHeader;
