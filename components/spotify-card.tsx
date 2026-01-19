"use client";

import { motion } from "framer-motion";
import { Music, Play } from "lucide-react";
import { useEffect, useState } from "react";


interface SpotifyTrack {
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    isPlaying: boolean;
    url: string;
}

export function SpotifyCard() {
    const [track, setTrack] = useState<SpotifyTrack | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current playing track from Spotify API
        // For now, using mock data - replace with actual API call
        const fetchNowPlaying = async () => {
            try {
                // TODO: Replace with actual Spotify API endpoint
                // const response = await fetch('/api/spotify/now-playing');
                // const data = await response.json();

                // Mock data for demonstration
                setTrack({
                    title: "Now Playing",
                    artist: "Your Favorite Artist",
                    album: "Latest Album",
                    albumArt: "/images/spotify-placeholder.jpg",
                    isPlaying: true,
                    url: "https://open.spotify.com"
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch Spotify data:", error);
                setLoading(false);
            }
        };

        fetchNowPlaying();
        // Poll every 60 seconds (reduced from 30)
        const interval = setInterval(fetchNowPlaying, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !track) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }} // Reduced for faster load
            className="fixed top-8 right-8 z-50 hidden lg:block"
        >
            <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
            >
                <div className="relative backdrop-blur-xl bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(56,189,248,0.3)] transition-all duration-300 hover:scale-105 w-[320px]">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-indigo/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Spotify green accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-t-2xl" />

                    <div className="relative flex items-center gap-4">
                        {/* Album Art */}
                        <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 shadow-lg">
                                <img
                                    src={track.albumArt}
                                    alt={track.album}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to music icon if image fails to load
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Playing animation */}
                            {track.isPlaying && (
                                <div className="absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full p-1.5 shadow-lg">
                                    <div className="flex items-center gap-0.5">
                                        <div className="w-0.5 bg-white rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                                        <div className="w-0.5 bg-white rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }} />
                                        <div className="w-0.5 bg-white rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <Music className="w-3 h-3 text-[#1DB954]" />
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                                    {track.isPlaying ? "Now Playing" : "Last Played"}
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold text-white truncate mb-0.5 group-hover:text-neon-blue transition-colors">
                                {track.title}
                            </h3>

                            <p className="text-xs text-slate-400 truncate">
                                {track.artist}
                            </p>
                        </div>

                        {/* Play icon */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-5 h-5 text-neon-blue fill-neon-blue" />
                        </div>
                    </div>

                    {/* Spotify logo watermark */}
                    <div className="absolute bottom-2 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}
