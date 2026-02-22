"use client";
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSideBar";
import TopHeader from "@/components/layout/TopHeader";
import { useUser } from "@/app/Provider";
import { useRouter } from "next/navigation";

const DashboardProvider = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // user === null means the auth check completed and there's no session
    if (user === null) router.replace("/auth");
  }, [user]);

  // user === undefined means the root Provider is still checking auth
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (user === null) return null;

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
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
