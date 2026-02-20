"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSideBar";
import TopHeader from "@/components/layout/TopHeader";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

const DashboardProvider = ({ children }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth");
      } else {
        setChecking(false);
      }
    });
  }, []);

  // While checking auth, render nothing (avoids flash of dashboard for logged-out users)
  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-white">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          <div className="flex-1 px-8 py-10 md:px-12 md:py-12 max-w-[1400px] w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
