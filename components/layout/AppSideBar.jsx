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
import React, { useEffect, useState } from "react"
import { Plus, Zap, Crown, Sparkles } from "lucide-react"
import { SidebarOptions } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/app/Provider"
import supabase from "@/lib/supabase"

const PLAN_META = {
  free:  { label: "Free Plan",  icon: Sparkles, tagline: "Upgrade for more interviews." },
  pro:   { label: "Pro Plan",   icon: Zap,      tagline: "You're on the Pro plan." },
  max:   { label: "Max Plan",   icon: Crown,    tagline: "You're on the Max plan." },
};

function AppSidebar() {
  const path = usePathname();
  const { user } = useUser();
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    if (!user?.email) return;
    supabase.from("Users").select("plan").eq("email", user.email).single()
      .then(({ data }) => { if (data?.plan) setPlan(data.plan); });
  }, [user]);

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
        {(() => {
          const meta = PLAN_META[plan] || PLAN_META.free;
          const Icon = meta.icon;
          const isPaid = plan === "pro" || plan === "max";
          return (
            <div className="bg-[#fafafa] rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3.5 w-3.5 text-[#0a0a0a]" />
                <h4 className="text-sm font-bold text-[#0a0a0a]">{meta.label}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{meta.tagline}</p>
              <Link
                href="/billing"
                className="block w-full text-center bg-white text-[#0a0a0a] border border-gray-200 hover:border-gray-400 text-xs font-semibold py-2.5 rounded-lg transition-all duration-150"
              >
                {isPaid ? "Manage Plan" : "Upgrade Now"}
              </Link>
            </div>
          );
        })()}
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
