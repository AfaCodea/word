"use client";

import { motion } from "framer-motion";

export function ExperienceTimeline() {
    const jobs = [
        {
            role: "Coming Soon - Software Engineer",
            company: "Coming Soon",
            period: "? - ?",
            description: "Leading the migration to serverless architecture on AWS. Optimized cost by 40% using spot instances and Lambda optimization.",
            skills: ["AWS", "Terraform", "Go"]
        },
        {
            role: "Coming Soon - Full Stack Web Developer",
            company: "Coming Soon",
            period: "? - ?",
            description: "Developed high-performance React dashboards for fintech clients. Implemented real-time WebSocket feeds handles 50k+ Ops.",
            skills: ["React", "Node.js", "Redis"]
        },
        {
            role: "Coming Soon - Cloud Computing Engineer",
            company: "Coming Soon",
            period: "? - ?",
            description: "Built award-winning marketing sites with WebGL and GSAP animations.",
            skills: ["Vue.js", "Three.js", "WebGL"]
        }
    ];

    return (
        <div className="relative pl-8 space-y-12 py-8">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-indigo to-transparent opacity-50" />

            {jobs.map((job, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                >
                    {/* Dot */}
                    <div className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-deep-bg border-2 border-neon-blue shadow-[0_0_10px_rgba(56,189,248,0.8)] z-10 box-content" />

                    <h4 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">{job.role}</h4>
                    <div className="text-sm text-neon-blue mb-2 font-mono tracking-wide">{job.company} <span className="text-slate-600">/</span> {job.period}</div>
                    <p className="text-slate-400 mb-4 max-w-2xl leading-relaxed">{job.description}</p>
                    <div className="flex gap-2 flex-wrap">
                        {job.skills.map(skill => (
                            <span key={skill} className="text-xs px-2.5 py-0.5 rounded-full bg-neon-blue/5 border border-neon-blue/20 text-neon-blue/80">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
