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
import React, { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SidebarOptions } from "@/services/Constants"
import Link from "next/link"
import { usePathname } from "next/navigation"


function AppSidebar() {

  const path = usePathname();
  
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center gap-3 p-4">
        <Image src="/Logo.png" alt="Logo" width={80} height={40} />
        <Button className="w-full flex items-center justify-center">
          <Plus className="mr-2 h-4 w-4" />
          Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className={'p-1'}>
                  <SidebarMenuButton asChild className={`p-3 ${path === option.path ? 'bg-gray-200' : ''}`}>
                    <Link href={option.path} className="flex items-center">
                      <option.icon className={`mr-2 h-4 w-4 ${path === option.path ? ' text-black' : ''}`} />
                      <span className={`text-[16px] ${path === option.path ? 'text-black font-medium' : ''}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
