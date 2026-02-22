"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, ChevronRight, Sun, Moon } from "lucide-react";
import { useUser } from "@/app/Provider";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const TopHeader = () => {
    const { user } = useUser();
    const { theme, setTheme } = useTheme();

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
                        placeholder="Search interviews..."
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
                <button className="relative text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-foreground border-2 border-background"></span>
                </button>

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
