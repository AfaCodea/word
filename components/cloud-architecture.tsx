"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Cloud, Server, Database } from "lucide-react";

export function CloudArchitecture() {
    const awsServices = ["EC2", "Lambda", "S3", "DynamoDB", "Amplify"];
    const gcpServices = ["Cloud Run", "BigQuery", "Firebase", "GKE"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative w-full h-full min-h-[250px] bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 flex items-center justify-around overflow-hidden group hover:border-white/20 transition-colors"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* AWS Cloud */}
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="cursor-pointer flex flex-col items-center gap-3 z-10"
                        >
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-neon-blue/30 shadow-[0_0_20px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-shadow">
                                <Cloud className="h-8 w-8 text-neon-blue" />
                            </div>
                            <span className="font-bold text-xs tracking-widest text-slate-400 group-hover:text-neon-blue transition-colors">AWS</span>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-950/90 border-neon-blue/20 backdrop-blur-xl text-white p-3 shadow-xl">
                        <p className="font-semibold mb-2 text-neon-blue text-xs uppercase tracking-wider">AWS Stack</p>
                        <ul className="text-xs space-y-1 text-slate-300">
                            {awsServices.map(s => <li key={s}>+ {s}</li>)}
                        </ul>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Connection Line Animation */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[120px] -z-0 pointer-events-none opacity-60" viewBox="0 0 300 100" preserveAspectRatio="none">
                <motion.path
                    d="M 0 50 Q 150 15 300 50"
                    stroke="url(#gradient-line)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="6 6"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
            </svg>

            {/* GCP Cloud */}
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="cursor-pointer flex flex-col items-center gap-3 z-10"
                        >
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-neon-indigo/30 shadow-[0_0_20px_rgba(129,140,248,0.2)] group-hover:shadow-[0_0_30px_rgba(129,140,248,0.5)] transition-shadow">
                                <Cloud className="h-8 w-8 text-neon-indigo" />
                            </div>
                            <span className="font-bold text-xs tracking-widest text-slate-400 group-hover:text-neon-indigo transition-colors">GCP</span>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-950/90 border-neon-indigo/20 backdrop-blur-xl text-white p-3 shadow-xl">
                        <p className="font-semibold mb-2 text-neon-indigo text-xs uppercase tracking-wider">GCP Stack</p>
                        <ul className="text-xs space-y-1 text-slate-300">
                            {gcpServices.map(s => <li key={s}>+ {s}</li>)}
                        </ul>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    )
}
