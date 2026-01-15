// GitHub API types
export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
    updated_at: string;
}

export interface GitHubLanguageStats {
    [language: string]: number;
}

export interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
}

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;
let cache: { data: any; timestamp: number } | null = null;

/**
 * Fetch GitHub user data
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            if (response.status === 403 || response.status === 429) {
                console.warn(`GitHub API rate limit exceeded for user ${username}`);
                return null;
            }
            if (response.status === 404) {
                console.warn(`GitHub user ${username} not found`);
                return null;
            }
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.warn('Error fetching GitHub user:', error);
        return null;
    }
}

/**
 * Fetch user's public repositories
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
                next: { revalidate: 3600 }
            }
        );

        if (!response.ok) {
            if (response.status === 403 || response.status === 429) {
                console.warn(`GitHub API rate limit exceeded for repos of ${username}`);
                return [];
            }
            if (response.status === 404) {
                console.warn(`GitHub repos for ${username} not found`);
                return [];
            }
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.warn('Error fetching GitHub repos:', error);
        return [];
    }
}

/**
 * Get language statistics from all repositories
 */
export async function getLanguageStats(username: string): Promise<string[]> {
    try {
        const repos = await fetchGitHubRepos(username);

        // Count language usage
        const languageCounts: { [key: string]: number } = {};

        repos.forEach(repo => {
            if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
        });

        // Sort by usage and get top languages
        const sortedLanguages = Object.entries(languageCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([lang]) => lang);

        return sortedLanguages;
    } catch (error) {
        console.error('Error fetching language stats:', error);
        return [];
    }
}

/**
 * Get top repositories (by stars)
 */
export async function getTopRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
    try {
        const repos = await fetchGitHubRepos(username);

        return repos
            .filter(repo => !repo.name.includes('fork'))
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching top repos:', error);
        return [];
    }
}

/**
 * Get tech stack from repositories (languages + topics)
 */
export async function getTechStack(username: string): Promise<string[]> {
    try {
        const repos = await fetchGitHubRepos(username);

        const techSet = new Set<string>();

        repos.forEach(repo => {
            // Add language
            if (repo.language) {
                techSet.add(repo.language);
            }

            // Add topics (frameworks, tools)
            repo.topics?.forEach(topic => {
                // Normalize topic names
                const normalizedTopic = topic
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                techSet.add(normalizedTopic);
            });
        });

        return Array.from(techSet);
    } catch (error) {
        console.error('Error fetching tech stack:', error);
        return [];
    }
}

// -- Contribution Data Types --
export interface ContributionData {
    total: {
        [year: string]: number;
        lastYear: number;
    };
    contributions: Array<{
        date: string;
        count: number;
        level: 0 | 1 | 2 | 3 | 4;
    }>;
}

/**
 * Fetch GitHub contribution data using public API
 */
export async function fetchContributionData(username: string): Promise<ContributionData | null> {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
            next: { revalidate: 3600 * 24 } // Revalidate daily
        });

        if (!response.ok) {
            // Return null silently to avoid breaking UI
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching contributions:', error);
        return null;
    }
}
