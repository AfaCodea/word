# GitHub API Integration

This portfolio integrates with the GitHub API to automatically fetch and display your tech stack based on your repositories.

## Setup

### 1. Update Your GitHub Username

Edit `data/portfolio.ts`:

```typescript
export const contactInfo = {
  // ... other fields
  githubUsername: "your-actual-github-username", // Replace with your username
};
```

### 2. How It Works

The `GitHubTechStack` component:
1. Fetches your public repositories using GitHub API
2. Analyzes languages used across all repos
3. Extracts repository topics (frameworks, tools)
4. Displays top 15 technologies dynamically

### 3. Features

- **Auto-detection**: Automatically discovers tech from your repos
- **Smart caching**: Results cached for 1 hour (Next.js ISR)
- **Fallback**: Shows manual list if API fails
- **Loading state**: Smooth loading animation during fetch
- **No auth required**: Uses public API endpoints

### 4. API Limits

GitHub API (unauthenticated):
- 60 requests/hour per IP
- Public data only

To increase limits, add a GitHub token:

Edit `lib/github.ts`:

```typescript
headers: {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `token ${process.env.GITHUB_TOKEN}`, // Add this
}
```

Then add to `.env.local`:
```
GITHUB_TOKEN=your_personal_access_token
```

### 5. Customization

#### Change Fallback Tech Stack

Edit `app/page.tsx`:

```tsx
<GitHubTechStack 
  username={contactInfo.githubUsername}
  fallbackTech={["Your", "Custom", "Tech", "Stack"]}
/>
```

#### Adjust Tech Limit

Edit `components/github-tech-stack.tsx`:

```tsx
setTechStack(tech.slice(0, 20)); // Show 20 instead of 15
```

## Troubleshooting

**Tech stack not loading?**
- Check GitHub username in `data/portfolio.ts`
- Verify repos are public
- Check browser console for errors
- Wait for API rate limit reset (1 hour)

**Want to disable GitHub integration?**

Replace component with static badges:

```tsx
<div className="flex flex-wrap gap-3">
  {["Tech1", "Tech2"].map((tech) => (
    <Badge key={tech}>{tech}</Badge>
  ))}
</div>
```
