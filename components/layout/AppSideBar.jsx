"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import React from "react"
import { Plus } from "lucide-react"
import { SidebarOptions } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="border-r border-gray-100 bg-white">
      <SidebarHeader className="flex flex-col gap-8 p-8 pb-4">
        <div className="w-full">
          <Link href="/dashboard" className="inline-block text-xl font-bold tracking-tight select-none text-[#0a0a0a] hover:opacity-80 transition-opacity">
            PrepForVISA
          </Link>
        </div>
        <button className="w-full flex items-center justify-center bg-[#0a0a0a] text-white text-sm font-medium px-4 py-3.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          <span>New Interview</span>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-5 pt-8">
        <SidebarGroup>
          <div className="px-3 pb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Main Menu
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {SidebarOptions.map((option, index) => {
                const isActive = path === option.path;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full rounded-lg transition-all duration-150 py-6 ${isActive
                        ? 'bg-[#fafafa] text-[#0a0a0a] font-semibold border border-gray-200'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50 border border-transparent'
                        }`}
                    >
                      <Link href={option.path} className="flex items-center px-4 py-3">
                        <option.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#0a0a0a]' : 'text-gray-400'}`} />
                        <span className="text-sm">
                          {option.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 mt-auto">
        <div className="bg-[#fafafa] rounded-xl p-6 border border-gray-100">
          <h4 className="text-sm font-bold text-[#0a0a0a] mb-2">Go Premium</h4>
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            Unlock unlimited mock interviews and advanced feedback.
          </p>
          <button className="w-full bg-white text-[#0a0a0a] border border-gray-200 hover:border-gray-400 text-xs font-semibold py-2.5 rounded-lg transition-all duration-150">
            Upgrade Now
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
