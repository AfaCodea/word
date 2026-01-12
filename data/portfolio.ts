// Project data type
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    image?: string;
    links: {
        demo?: string;
        repo?: string;
    };
    featured?: boolean;
    category?: string;
}

// Your portfolio data - EDIT THIS!
export const projects: Project[] = [
    {
        id: "1",
        title: "Neon Finance Dashboard",
        description: "Real-time crypto tracking platform with WebSockets and minimalist data visualization.",
        longDescription: "A comprehensive cryptocurrency tracking dashboard built with Next.js 14, featuring real-time price updates via WebSockets, interactive charts using Recharts, and a clean, modern UI with Tailwind CSS.",
        tags: ["Next.js", "TypeScript", "Tailwind", "WebSocket", "Supabase"],
        image: "/projects/finance-dashboard.png", // Add your screenshot here
        links: {
            demo: "https://your-demo-link.com",
            repo: "https://github.com/AfaCodea"
        },
        featured: true,
        category: "Web Development"
    },
    {
        id: "2",
        title: "CloudKeeper",
        description: "Serverless file management system using AWS S3 and Lambda triggers.",
        longDescription: "Enterprise-grade file management solution leveraging AWS services. Features include automatic file processing, thumbnail generation, and secure presigned URL generation.",
        tags: ["AWS", "Lambda", "S3", "Node.js", "React"],
        image: "/projects/cloudkeeper.png",
        links: {
            demo: "https://your-demo-link.com",
            repo: "https://github.com/AfaCodea"
        },
        featured: false,
        category: "Cloud Infrastructure"
    },
    {
        id: "3",
        title: "AI Code Assistant",
        description: "VS Code extension powered by Gemini API for inline code generation.",
        longDescription: "Intelligent code assistant that helps developers write better code faster. Integrates directly into VS Code with context-aware suggestions.",
        tags: ["TypeScript", "AI", "VS Code API", "Gemini"],
        image: "/projects/ai-assistant.png",
        links: {
            demo: "https://marketplace.visualstudio.com/items?itemName=yourname.extension",
            repo: "https://github.com/AfaCodea"
        },
        featured: false,
        category: "Developer Tools"
    }
];

// Contact information - EDIT THIS!
export const contactInfo = {
    email: "your.email@example.com",
    github: "https://github.com/AfaCodea",
    githubUsername: "AfaCodea", // GitHub username for API (without @)
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
};

// Personal information - EDIT THIS!
export const personalInfo = {
    name: "Your Name",
    roles: [
        "Cloud Computing",
        "Frontend Developer",
        "DevOps Engineer",
        "Software Engineer",
        "UI/UX Designer"
    ],
    bio: "Specializing in cloud-native solutions, scalable architectures, and cutting-edge web technologies.",
    tagline: "Building the future, one commit at a time.",
    location: "Jakarta, Indonesia",
    available: true,
};
