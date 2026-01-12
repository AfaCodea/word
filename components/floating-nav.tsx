"use client";

import { motion } from "framer-motion";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function FloatingNav() {
    const navItems = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Stack", icon: Code2, href: "#stack" },
        { name: "Work", icon: Briefcase, href: "#projects" },
        { name: "Experience", icon: User, href: "#experience" },
        { name: "Contact", icon: Mail, href: "#contact" },
    ];

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
            >
                <TooltipProvider delayDuration={0}>
                    {navItems.map((item) => (
                        <Tooltip key={item.name}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
                                >
                                    <item.icon className="w-5 h-5" />
                                    {/* Active/Hover Dot */}
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border-white/10 text-white text-xs mb-2">
                                {item.name}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>

                {/* Separator */}
                <div className="w-px h-6 bg-white/10 mx-2" />

                {/* Resume/CV Button */}
                <button className="px-4 py-2 rounded-full bg-neon-blue text-deep-bg text-xs font-bold hover:bg-neon-blue/80 transition-colors">
                    Resume
                </button>
            </motion.div>
        </div>
    );
}
