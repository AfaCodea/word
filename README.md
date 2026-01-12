# Future Minimalist Portfolio

A modern, hyper-functional portfolio website for Software Engineers specializing in Cloud & Full-stack development.

## ✨ Features

### Implemented Features
- ✅ **Command Center (⌘K)** - Keyboard-driven navigation
- ✅ **Particle Network Background** - Animated neural network effect
- ✅ **Typing Animation** - Dynamic role rotation in hero section
- ✅ **Dark/Light Theme Toggle** - Smooth theme switching
- ✅ **Glassmorphism UI** - Modern, frosted glass effects
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Bento Grid Layout** - Modern card-based layout
- ✅ **Interactive Cloud Architecture** - AWS & GCP visualization
- ✅ **Experience Timeline** - Vertical career journey display

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## ✏️ Content Customization

### 1. Update Portfolio Data

Edit `data/portfolio.ts` to customize your content:

```typescript
// Personal information
export const personalInfo = {
  name: "Your Name",
  roles: ["Cloud Architect", "Full-stack Developer", ...],
  bio: "Your bio here",
  tagline: "Your tagline",
  location: "Your Location",
  available: true,
};

// Contact information
export const contactInfo = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
};

// Projects
export const projects: Project[] = [
  {
    id: "1",
    title: "Your Project",
    description: "Short description",
    tags: ["Next.js", "TypeScript"],
    image: "/projects/your-image.png",
    links: {
      demo: "https://your-demo.com",
      repo: "https://github.com/you/project"
    },
    featured: true
  }
];
```

### 2. Add Project Screenshots

Place your project images in the `/public/projects/` folder:
- `finance-dashboard.png`
- `cloudkeeper.png`
- `ai-assistant.png`

Recommended image size: 1200x630px (landscape)

### 3. Update Experience Timeline

Edit `components/experience-timeline.tsx` to add your work history.

### 4. Customize Cloud Skills

Edit `components/cloud-architecture.tsx` to update:
- `awsServices` array
- `gcpServices` array

### 5. Update Tech Stack

Edit `app/page.tsx` to modify the tech stack badges:
```tsx
{["Next.js 14", "TypeScript", "Your Tech"].map((tech) => ...)}
```

## 🎨 Theme Customization

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --color-neon-blue: #38bdf8;  /* Primary accent */
  --color-neon-indigo: #818cf8; /* Secondary accent */
  --color-deep-bg: #020617;     /* Background */
}
```

### Fonts

The portfolio uses **Geist Sans** by default. To change:

1. Update `app/layout.tsx`:
```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

2. Update the className in the body tag

## ⌨️ Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Open command menu
- `ESC` - Close command menu
- Arrow keys - Navigate command menu

## 📁 Project Structure

```
app/
  ├── layout.tsx          # Root layout with providers
  ├── page.tsx            # Main page
  └── globals.css         # Global styles & theme

components/
  ├── hero.tsx            # Hero section
  ├── project-card.tsx    # Project cards
  ├── cloud-architecture.tsx
  ├── experience-timeline.tsx
  ├── command-menu.tsx
  ├── particle-network.tsx
  ├── theme-toggle.tsx
  └── ui/                 # Shadcn components

data/
  └── portfolio.ts        # Your portfolio data

hooks/
  ├── use-typing-effect.ts
  └── use-mouse-position.ts
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Credits

Built with modern web technologies and best practices.
- Design inspiration: Apple, Linear, Vercel
- UI Components: Shadcn/UI
- Icons: Lucide React

---

**Made with ❤️ for developers who code the future**
