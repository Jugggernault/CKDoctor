import type React from "react"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    showText?: boolean
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
    return (
        <div className={cn("flex items-center", className)}>
            <div className="text-ckd-primary mr-2">
                <Activity size={28} className="text-ckd-primary" />
            </div>
            {showText && <span className="text-lg font-bold text-ckd-primary">CKD Predictor</span>}
        </div>
    )
}

export default Logo
