"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, ChevronRight } from "lucide-react";
import { useUser } from "@/app/Provider";
import Image from "next/image";

const TopHeader = () => {
    const { user } = useUser();

    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-sm px-8">
            <div className="flex items-center gap-6">
                <SidebarTrigger className="text-gray-500 hover:text-black transition-colors cursor-pointer" />

                {/* Breadcrumb */}
                <div className="hidden md:flex items-center text-xs font-semibold uppercase tracking-widest text-gray-400">
                    <span className="hover:text-black cursor-pointer transition-colors">Platform</span>
                    <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
                    <span className="text-gray-900">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Search */}
                <div className="relative hidden md:block w-72">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search interviews..."
                        className="w-full pl-10 pr-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                    />
                </div>

                {/* Notifications */}
                <button className="relative text-gray-400 hover:text-black transition-colors cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#0a0a0a] border-2 border-white"></span>
                </button>

                {/* User Avatar */}
                <div className="flex items-center gap-4 pl-8 border-l border-gray-100 cursor-pointer group">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-sm font-semibold text-[#0a0a0a] leading-none mb-1 group-hover:text-gray-600 transition-colors">
                            {user?.name || "User"}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-gray-400 leading-none">
                            Account
                        </span>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-gray-200 overflow-hidden shrink-0 group-hover:border-gray-400 transition-all bg-[#fafafa]">
                        {user?.picture ? (
                            <Image src={user.picture} alt="Avatar" width={40} height={40} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500 font-semibold text-sm">
                                {(user?.name || "U")[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
