"use client";

import { useEffect, useState } from "react";
import { fetchContributionData, ContributionData } from "@/lib/github";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface GithubHeatmapProps {
    username: string;
}

export function GithubHeatmap({ username }: GithubHeatmapProps) {
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const result = await fetchContributionData(username);
            setData(result);
            setLoading(false);
            console.log(result);
        }
        if (username) loadData();
    }, [username]);

    if (loading) return <div className="h-24 w-full animate-pulse bg-white/5 rounded-xl mt-4" />;
    if (!data) return null;

    // Render only last 150 days to fit nicely
    const recentContributions = data.contributions.slice(-140);

    // Calculate total contributions
    const totalContributions = data.total.lastYear;

    // Color mapping function
    const getLevelColor = (level: number) => {
        switch (level) {
            case 0: return "bg-white/5";
            case 1: return "bg-neon-blue/30";
            case 2: return "bg-neon-blue/50";
            case 3: return "bg-neon-blue/80";
            case 4: return "bg-neon-blue shadow-[0_0_10px_#38bdf8]";
            default: return "bg-white/5";
        }
    };

    return (
        <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">
                    {totalContributions} contributions in the last year
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <span>Less</span>
                    <div className="w-2 h-2 rounded-sm bg-white/5" />
                    <div className="w-2 h-2 rounded-sm bg-neon-blue/30" />
                    <div className="w-2 h-2 rounded-sm bg-neon-blue/50" />
                    <div className="w-2 h-2 rounded-sm bg-neon-blue/80" />
                    <div className="w-2 h-2 rounded-sm bg-neon-blue" />
                    <span>More</span>
                </div>
            </div>

            <div className="flex gap-[2px] flex-wrap justify-end md:justify-start">
                <TooltipProvider delayDuration={0}>
                    {recentContributions.map((day, i) => (
                        <Tooltip key={day.date}>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-[2px] transition-all hover:scale-125 hover:z-10",
                                        getLevelColor(day.level)
                                    )}
                                />
                            </TooltipTrigger>
                            <TooltipContent className="text-xs bg-slate-900 border-white/10">
                                {day.count} contributions on {day.date}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
        </div>
    );
}
