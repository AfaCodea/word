import { SpotlightCard } from "@/components/spotlight-card";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { CloudArchitecture } from "@/components/cloud-architecture";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { GitHubTechStack } from "@/components/github-tech-stack";
import { GithubHeatmap } from "@/components/github-heatmap";
import { Database, Server } from "lucide-react";
import { projects, contactInfo } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      <Hero />

      <section className="container mx-auto px-4 -mt-20 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Tech Stack from GitHub API (Span 2) */}
          <SpotlightCard index={0} className="md:col-span-2 row-span-1 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Core Stack</h3>
              <span className="text-xs text-slate-600">Live from GitHub</span>
            </div>
            <GitHubTechStack
              username={contactInfo.githubUsername}
              fallbackTech={["Next.js 14", "TypeScript", "Tailwind CSS", "AWS CDK", "PostgreSQL", "Docker", "GraphQL"]}
            />
            <GithubHeatmap username={contactInfo.githubUsername} />
          </SpotlightCard>

          {/* Cloud Architecture Interactive (Span 2) */}
          <div className="md:col-span-2 row-span-1">
            <CloudArchitecture />
          </div>

          {/* Featured Project (Span 2, Row 2 - Large Card) */}
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} featured={project.featured} index={index} />
          ))}

          {/* Stats / Dashboard (Span 1) */}
          <SpotlightCard index={1} className="p-6 flex flex-col justify-center items-center text-center gap-2 group">
            <div className="p-3 rounded-full bg-neon-indigo/10 text-neon-indigo group-hover:scale-110 transition-transform">
              <Database className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold text-white">50+</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Deployments</span>
          </SpotlightCard>

          <SpotlightCard index={2} className="p-6 flex flex-col justify-center items-center text-center gap-2 group">
            <div className="p-3 rounded-full bg-neon-blue/10 text-neon-blue group-hover:scale-110 transition-transform">
              <Server className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold text-white">99.9%</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Uptime</span>
          </SpotlightCard>

          {/* Experience Timeline (Span 4 - Full Width) */}
          <div className="md:col-span-4 mt-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-neon-blue rounded-full"></span>
              Career Journey
            </h3>
            <SpotlightCard index={3} className="p-8 md:p-12">
              <ExperienceTimeline />
            </SpotlightCard>
          </div>

        </div>
      </section>

      {/* Footer / Contact CTA included in layout or separate component */}
      <footer className="mt-32 text-center text-slate-600 pb-10 border-t border-white/5 pt-10">
        <p className="text-sm">© 2026 Future Portfolio. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
