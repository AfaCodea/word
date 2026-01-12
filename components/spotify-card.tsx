"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type SpotifyData = {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
};

export function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/now-playing");
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching Spotify data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Placeholder for when loading or no data yet (avoid hydration mismatch if possible, though this is client side)
    const isPlaying = data?.isPlaying ?? false;
    const song = {
        name: data?.title ?? "Not Playing",
        artist: data?.artist ?? "Spotify",
        link: data?.songUrl ?? "https://spotify.com",
        image: data?.albumImageUrl ?? ""
    };

    if (loading) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="fixed bottom-8 right-8 z-40 hidden lg:flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-3 pr-6 rounded-full shadow-2xl hover:bg-slate-900/90 transition-colors group cursor-pointer"
        >
            <Link href={song.link} target="_blank" className="flex items-center gap-4">
                {/* Album Art / Icon */}
                <div className="relative w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5 group-hover:scale-105 transition-transform">
                    {isPlaying && song.image ? (
                        <div className="w-full h-full relative">
                            {/* Album Art */}
                            <img src={song.image} alt={song.name} className="w-full h-full object-cover animate-[spin_4s_linear_infinite]" />
                            <div className="absolute inset-0 bg-black/20" />
                            <Music className="absolute inset-0 m-auto w-4 h-4 text-white/90 relative z-10 drop-shadow-md" />
                        </div>
                    ) : (
                        <Music className="w-5 h-5 text-slate-400" />
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white max-w-[120px] truncate">
                            {song.name}
                        </span>
                        {isPlaying && (
                            <div className="flex gap-[2px] items-end h-3">
                                <span className="w-0.5 h-2 bg-green-500 rounded-full animate-[music-bar_1s_ease-in-out_infinite]" />
                                <span className="w-0.5 h-3 bg-green-500 rounded-full animate-[music-bar_1.5s_ease-in-out_infinite_0.1s]" />
                                <span className="w-0.5 h-1.5 bg-green-500 rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.2s]" />
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] text-slate-400 max-w-[120px] truncate">
                        {song.artist}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
