"use client";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSideBar";
import TopHeader from "@/components/layout/TopHeader";

const DashboardProvider = ({ children }) => {
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
