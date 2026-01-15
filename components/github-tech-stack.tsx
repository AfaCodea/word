"use client";

import { Badge } from "@/components/ui/badge";
import { useGitHubTechStack } from "@/hooks/use-swr-data";
import { Loader2 } from "lucide-react";

interface GitHubTechStackProps {
    username: string;
    fallbackTech?: string[];
}

export function GitHubTechStack({ username, fallbackTech = [] }: GitHubTechStackProps) {
    const { techStack, isLoading, isError } = useGitHubTechStack(username, fallbackTech);

    // Limit to 15 items
    const displayTech = techStack.slice(0, 15);

    // Only show full loader if we have NO data to show
    if (isLoading && displayTech.length === 0) {
        return (
            <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading from GitHub...</span>
            </div>
        );
    }

    if (isError && displayTech.length === 0) {
        return (
            <div className="text-slate-500 text-sm">
                Using fallback tech stack
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-3">
            {displayTech.map((tech) => (
                <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-white/5 border-white/5 text-slate-300 hover:text-neon-blue hover:bg-neon-blue/10 transition-colors cursor-default"
                >
                    {tech}
                </Badge>
            ))}
            {!isLoading ? (
                <Badge
                    variant="outline"
                    className="border-white/5 text-xs text-slate-500"
                >
                    via GitHub API ✓ (SWR)
                </Badge>
            ) : (
                <Badge
                    variant="outline"
                    className="border-white/5 text-xs text-slate-500 flex gap-1 items-center"
                >
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Refreshing...
                </Badge>
            )}
        </div>
    );
}
