"use client"

import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Home,
  PlusCircle,
  History,
  Settings,
  HelpCircle,
  LogOut,
  User,
  BarChart4,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "New Prediction", icon: PlusCircle, href: "/prediction/new" },
  { name: "Prediction History", icon: History, href: "/predictions" },
  { name: "Analytics", icon: BarChart4, href: "/analytics" },
  { name: "Account", icon: User, href: "/account" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Help & FAQ", icon: HelpCircle, href: "/help" },
]

const adminItems = [{ name: "Admin Panel", icon: ShieldAlert, href: "/admin" }]

const AppSidebar = () => {
  const location = useLocation()
  const [isAdmin] = React.useState(false)
  const { open, setOpen, state } = useSidebar()

  // Use a more reliable toggle function
  const toggleSidebar = React.useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  return (
      <Sidebar variant="sidebar" collapsible="icon" className="border-r h-screen row-span-full border-gray-200 flex-shrink-0">
        {/* Fixed height to match AppHeader */}
        <SidebarHeader className="border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Logo showText={open} />
          </div>
          <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive =
                  location.pathname === item.href || (item.href !== "/dashboard" && location.pathname.startsWith(item.href))

              return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name} className="h-10">
                      <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                              cn(
                                  "flex items-center gap-3 w-full",
                                  isActive ? "text-[#03624c]" : "text-gray-600",
                                  state === "collapsed" && "justify-center px-0",
                              )
                          }
                      >
                        <item.icon className="size-5 flex-shrink-0" />
                        {open && <span className="truncate">{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              )
            })}

            {isAdmin &&
                adminItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild tooltip={item.name} className="h-10">
                        <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 w-full",
                                    isActive ? "text-[#03624c]" : "text-gray-600",
                                    state === "collapsed" && "justify-center px-0",
                                )
                            }
                        >
                          <item.icon className="size-5 flex-shrink-0" />
                          {open && <span>{item.name}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className={cn("flex items-center", open ? "justify-between" : "justify-center")}>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#03624c] flex items-center justify-center text-white font-medium">
                MD
              </div>
              {open && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Dr. Smith</p>
                    <p className="text-xs text-gray-500">Nephrologist</p>
                  </div>
              )}
            </div>
            {open && (
                <button className="text-gray-400 hover:text-gray-500">
                  <LogOut size={18} />
                </button>
            )}
          </div>
        </SidebarFooter>

        {/* Add the rail for better toggle experience */}
        <SidebarRail />
      </Sidebar>
  )
}

export default AppSidebar
