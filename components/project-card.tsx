"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    links: { demo?: string; repo?: string };
    featured?: boolean;
}

export function ProjectCard({ title, description, tags, image, links, featured }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className={featured ? "md:col-span-2 md:row-span-2" : ""}
        >
            <Card className="h-full border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors duration-300 overflow-hidden group">
                <CardHeader className="p-0 relative h-64 overflow-hidden border-b border-white/5">
                    {/* Mock Image Placeholder or Real Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        ) : (
                            <Layers className="h-16 w-16 text-white/20" />
                        )}
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {links.demo && (
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        )}
                        {links.repo && (
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60">
                                <Github className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 text-2xl mb-2 font-bold group-hover:text-neon-blue transition-colors">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 mb-4 line-clamp-2">
                        {description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-white/10 bg-white/5 text-xs text-slate-300 group-hover:border-neon-blue/30 transition-colors">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
