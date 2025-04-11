// AppLayout.tsx
"use client"

import type React from "react"
import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppHeader from "@/components/AppHeader"
import AppSidebar from "@/components/AppSidebar"
import { Toaster } from "@/components/ui/toaster"

const AppLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <div className="grid grid-cols-[auto,1fr] w-full grid-rows-[auto,1fr] min-h-screen bg-gray-50">
                <AppSidebar />
                <AppHeader className="col-start-2 border-b border-gray-200" />
                <main className="col-start-2 row-start-1 w-full p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </SidebarProvider>
    )
}

export default AppLayout