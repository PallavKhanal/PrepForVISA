"use client"
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./_components/AppSideBar"

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      
      <div className="flex w-full min-h-screen">
        
        <AppSidebar />

        
        <main className="flex-1 p-8">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
