'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Home, Inbox, Search, Settings, User2, ChevronUp, ChevronDown } from "lucide-react"
import MenuService from '@/api/services/menu'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const router = useRouter()
  const [menus, setMenus] = useState<any[]>([])

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await MenuService.getAllMenu()
      setMenus(res)
    }
  
    fetchMenu()
  }, [])
  

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center p-4">
            App Name
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus?.map((item: any) => (
                <SidebarMenuItem key={item?.title}>
                  <SidebarMenuButton asChild>
                    <button 
                      className="flex items-center"
                      onClick={() => handleNavigation(item?.url)}
                    >
                      <span>{item?.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}