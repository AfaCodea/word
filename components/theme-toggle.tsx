"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="fixed top-4 right-4 z-50 h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-neon-blue transition-all" />
            ) : (
                <Moon className="h-5 w-5 text-slate-600 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
