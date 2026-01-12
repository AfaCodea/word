"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getTechStack } from "@/lib/github";
import { Loader2 } from "lucide-react";

interface GitHubTechStackProps {
    username: string;
    fallbackTech?: string[];
}

export function GitHubTechStack({ username, fallbackTech = [] }: GitHubTechStackProps) {
    const [techStack, setTechStack] = useState<string[]>(fallbackTech);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTechStack() {
            try {
                setLoading(true);
                const tech = await getTechStack(username);

                if (tech.length > 0) {
                    setTechStack(tech.slice(0, 15)); // Limit to 15 items
                }
            } catch (err) {
                console.error('Failed to fetch tech stack:', err);
                setError('Failed to load from GitHub');
            } finally {
                setLoading(false);
            }
        }

        if (username) {
            fetchTechStack();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading from GitHub...</span>
            </div>
        );
    }

    if (error && techStack.length === 0) {
        return (
            <div className="text-slate-500 text-sm">
                Using fallback tech stack
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
                <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-white/5 border-white/5 text-slate-300 hover:text-neon-blue hover:bg-neon-blue/10 transition-colors cursor-default"
                >
                    {tech}
                </Badge>
            ))}
            {!loading && (
                <Badge
                    variant="outline"
                    className="border-white/5 text-xs text-slate-500"
                >
                    via GitHub API ✓
                </Badge>
            )}
        </div>
    );
}
