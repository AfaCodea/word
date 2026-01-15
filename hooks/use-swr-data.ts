import useSWR from "swr";

// Generic fetcher function
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

// GitHub repository data
interface GitHubRepo {
    name: string;
    language: string | null;
    stargazers_count: number;
    html_url: string;
    description: string | null;
    fork: boolean;
}

// GitHub user data
interface GitHubUser {
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    name: string;
    bio: string | null;
}

// Hook for fetching GitHub repositories
export function useGitHubRepos(username: string) {
    const { data, error, isLoading, mutate } = useSWR<GitHubRepo[]>(
        username ? `https://api.github.com/users/${username}/repos?per_page=100&sort=updated` : null,
        fetcher,
        {
            revalidateOnFocus: false, // Don't refetch on window focus
            revalidateOnReconnect: true, // Refetch on reconnect
            dedupingInterval: 60000, // 1 minute deduplication
            refreshInterval: 300000, // Refresh every 5 minutes
            errorRetryCount: 3, // Retry 3 times on error
        }
    );

    return {
        repos: data,
        isLoading,
        isError: error,
        mutate, // Function to manually refetch
    };
}

// Hook for fetching GitHub user profile
export function useGitHubUser(username: string) {
    const { data, error, isLoading, mutate } = useSWR<GitHubUser>(
        username ? `https://api.github.com/users/${username}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
            refreshInterval: 300000,
            errorRetryCount: 3,
        }
    );

    return {
        user: data,
        isLoading,
        isError: error,
        mutate,
    };
}

// Hook for fetching GitHub contribution data (events)
interface GitHubEvent {
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
}

export function useGitHubEvents(username: string) {
    const { data, error, isLoading, mutate } = useSWR<GitHubEvent[]>(
        username ? `https://api.github.com/users/${username}/events/public?per_page=100` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
            refreshInterval: 300000,
            errorRetryCount: 3,
        }
    );

    return {
        events: data,
        isLoading,
        isError: error,
        mutate,
    };
}

// Hook for extracting tech stack from repos
export function useGitHubTechStack(username: string, fallbackTech: string[] = []) {
    const { repos, isLoading, isError } = useGitHubRepos(username);

    // Extract unique languages from repos
    const techStack = repos
        ? [...new Set(repos.filter((r) => r.language && !r.fork).map((r) => r.language as string))]
        : fallbackTech;

    return {
        techStack: techStack.length > 0 ? techStack : fallbackTech,
        isLoading,
        isError,
    };
}

// Custom hook for Spotify Now Playing (if you have a backend API)
interface SpotifyTrack {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export function useSpotifyNowPlaying() {
    const { data, error, isLoading, mutate } = useSWR<SpotifyTrack>(
        "/api/spotify/now-playing",
        fetcher,
        {
            revalidateOnFocus: true, // Refetch when user returns
            refreshInterval: 30000, // Refresh every 30 seconds
            errorRetryCount: 2,
            fallbackData: { isPlaying: false },
        }
    );

    return {
        track: data,
        isLoading,
        isError: error,
        mutate,
    };
}
