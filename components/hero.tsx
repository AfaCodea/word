"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { personalInfo } from "@/data/portfolio";

import { SpotifyCard } from "@/components/spotify-card";
import { MagneticButton } from "@/components/magnetic-button";

export function Hero() {
    const typingText = useTypingEffect(personalInfo.roles, 80, 50, 2000);
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden w-full">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-indigo/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8 lg:mt-0">

                {/* Text Content (Left) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                >
                    <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-xs font-medium tracking-widest uppercase text-neon-blue shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
                        </span>
                        Software Engineer
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight overflow-visible">
                        <span className="block text-2xl sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 filter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-2 leading-normal pb-1">
                            I'm Agil Prasunza
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-indigo filter drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] min-h-[1.2em] pb-1">
                            {typingText}
                            <span className="inline-block w-1 h-8 sm:h-12 lg:h-16 bg-neon-blue ml-2 animate-pulse align-middle" />
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 dark:text-slate-400 mb-8 max-w-xl leading-relaxed font-light">
                        {personalInfo.bio}
                        <br />
                        <span className="text-neon-blue/80 font-medium text-sm mt-3 block tracking-wide">{personalInfo.tagline}</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <MagneticButton className="h-14 px-8 rounded-full bg-neon-blue text-deep-bg font-bold flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] text-base">
                            Explore Work <ArrowRight className="ml-2 h-5 w-5" />
                        </MagneticButton>
                        <MagneticButton className="h-14 px-8 rounded-full border border-white/10 text-white bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-base">
                            <Terminal className="mr-2 h-5 w-5" /> View Tech Stack
                        </MagneticButton>
                    </div>
                </motion.div>

                {/* Profile Image (Right) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative flex justify-center lg:justify-end order-1 lg:order-2"
                >
                    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] group">
                        {/* Spinning Border Optimized */}
                        <div className="absolute inset-0 rounded-full border border-neon-blue/20 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-neon-indigo/20 animate-[spin_15s_linear_infinite_reverse]" />

                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-indigo opacity-20 blur-[60px] rounded-full group-hover:opacity-40 transition-opacity duration-500" />

                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10 opacity-40" />
                            <img
                                src="/images/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 -left-4 lg:bottom-14 lg:-left-8 z-20">
                            <div className="relative inline-flex overflow-hidden rounded-full p-[1px] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow duration-300">
                                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0F172A_0%,#10b981_50%,#0F172A_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl">
                                    <span className="relative flex h-2.5 w-2.5 mr-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                                    </span>
                                    <span className="tracking-wide text-slate-200">
                                        Open to <span className="text-white">Work</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Spotify Music Card */}
            <SpotifyCard />

            {/* Floating Tech Icons Grid Background */}
            <div className="absolute inset-0 -z-20 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>
        </section >
    )
}
