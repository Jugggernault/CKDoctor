"use client"

import type React from "react"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/Logo"
import { useToast } from "@/hooks/use-toast"
import { useSidebar } from "@/components/ui/sidebar"
import {cn} from "@/lib/utils.ts";

const AppHeader: React.FC<{className?: string}> = ({className}) => {
    const { toast } = useToast()
    const { openMobile, setOpenMobile } = useSidebar()

    const handleNotificationClick = () => {
        toast({
            title: "Notifications",
            description: "You have no new notifications",
        })
    }

    const toggleMobileSidebar = () => {
        setOpenMobile(!openMobile)
    }

    return (
        <header className={cn(
            "bg-white h-16 flex items-center px-4 sticky top-0 z-10",
            className
        )}>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
            </Button>

            <div className="md:hidden">
                <Logo />
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">0</Badge>
                </Button>
            </div>
        </header>
    )
}

export default AppHeader
