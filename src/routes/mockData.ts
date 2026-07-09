// src/routes/mockData.ts
import type { PortfolioManifest } from '$lib/schema/manifest';

// v1 mock data source — shaped to match the manifest a real backend
// would eventually serve. Swap out for a live fetch in +layout.server.ts
// once the backend is ready.
export const mockManifest: PortfolioManifest = {
    // Status labels available for the profile "status" field (used wherever
    // a status badge/indicator is rendered).
    miscellaneous: {
        profileStatusOptions: [`comeback`, `blazing`, `hot`, `warm`, `cooling`, `cold`, `ghost`]
    },

    // Core identity + hero section content.
    profile: {
        name: ['John', 'Doe'],
        title: 'Software Developer',
        status: 'hot', // must be one of profileStatusOptions above
        avatar: '/avatar.webp',
        profileBackground: '/profile-bg.webp',

        // Hero quote — short, first-person tagline shown prominently on the hero section.
        quote: 'I turn ideas into working software — clean code, solid architecture, and systems built to hold up under real use. Then I make sure they keep working.',

        // Short highlight cards, typically rendered as a grid near the hero/about area.
        focusAreas: [
            {
                label: 'Web Development',
                description: 'Building responsive, accessible web applications across the stack.'
            },
            {
                label: 'APIs & Services',
                description: 'Designing clean, well-documented APIs and backend services.'
            },
            {
                label: 'Cloud & DevOps',
                description: 'Deploying and maintaining applications on modern cloud infrastructure.'
            }
        ],

        // bio[0] = short version (e.g. used in previews/cards)
        // bio[1] = long-form version, rendered as raw HTML on the About section.
        bio: [
            `I'm a software developer who enjoys building things end to end, from database to UI.`,
            `<p>I'm a software developer with a few years of experience building web applications, APIs, and the infrastructure that supports them. I like working across the stack — there's always something new to learn, whether it's a database query that needs tuning or a UI interaction that needs polishing.</p>
             <p>I've worked on projects ranging from small internal tools to public-facing products used by thousands of people. Along the way I've picked up a habit of writing things down — documentation, comments, postmortems — because future-me is usually the one who benefits most.</p>
             <p>Outside of my main projects, I like experimenting with new frameworks and tools, contributing to small open-source projects, and occasionally tinkering with hardware and automation as a change of pace from writing code all day. I also spend time mentoring newer developers and writing the occasional blog post about things I've learned the hard way.</p>
             <p>I'm always looking to improve and take on new challenges. Feel free to reach out if you'd like to collaborate or just talk shop.</p>
            `
        ],

        // Social/contact links rendered in the footer/contact section.
        // `platform` drives which icon is shown — keep values lowercase and
        // consistent with whatever the footer/contact component switches on.
        contact: [
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'github', url: 'https://github.com' },
            { platform: 'email', url: 'mailto:hello@example.com' },
            { platform: 'x', url: 'https://x.com' },
        ]
    },

    // Skills section content — feeds the tech stack summary, detailed lists,
    // and the icon grid (imgs) shown on the Skills section of the site.
    skills: {
        // High-level tech stack summary, likely rendered as tags/pills.
        techStack: [
            'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Vue', 'Node.js',
            'Express', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
            'AWS', 'Google Cloud', 'REST APIs', 'GraphQL'
        ],
        languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL', 'HTML', 'CSS', 'Go'],
        frameworks: ['React', 'Vue', 'Angular', 'Express', 'Django', 'Flask', 'Spring Boot', 'Next.js'],
        databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite', 'Firebase'],

        // Cloud/platform providers, each with the specific services used —
        // likely rendered as expandable cards or a detailed breakdown.
        technologies: [
            { name: 'AWS', services: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFront'] },
            { name: 'Docker', services: ['Containerization', 'Docker Compose'] },
            { name: 'Kubernetes', services: ['Orchestration', 'Helm'] },
            { name: 'Google Cloud', services: ['Cloud Run', 'Firestore', 'Cloud Functions'] },
            { name: 'GitHub', services: ['Actions', 'Pages', 'Packages'] },
            { name: 'Vercel', services: ['Hosting', 'Edge Functions'] }
        ],
        tools: ['Git', 'Linux', 'Postman', 'Figma', 'Jira', 'VS Code', 'DBeaver', 'Notion'],

        // Icon assets for the Skills grid. `url` paths are relative to the
        // static assets directory — make sure each referenced svg actually
        // exists there before this list is trusted to render correctly.
        imgs: [
            { name: 'JavaScript', url: 'imgs/javascript.svg' },
            { name: 'TypeScript', url: 'imgs/typescript.svg' },
            { name: 'Python', url: 'imgs/python.svg' },
            { name: 'Java', url: 'imgs/java.svg' },
            { name: 'C#', url: 'imgs/csharp.svg' },
            { name: 'Go', url: 'imgs/go.svg' },
            { name: 'SQL', url: 'imgs/sql.svg' },
            { name: 'HTML', url: 'imgs/html.svg' },
            { name: 'CSS', url: 'imgs/css.svg' },
            { name: 'React', url: 'imgs/react.svg' },
            { name: 'Vue', url: 'imgs/vue.svg' },
            { name: 'Angular', url: 'imgs/angular.svg' },
            { name: 'Node.js', url: 'imgs/nodejs.svg' },
            { name: 'Express', url: 'imgs/express.svg' },
            { name: 'Django', url: 'imgs/django.svg' },
            { name: 'Flask', url: 'imgs/flask.svg' },
            { name: 'Spring Boot', url: 'imgs/springboot.svg' },
            { name: 'Next.js', url: 'imgs/nextjs.svg' },
            { name: 'PostgreSQL', url: 'imgs/postgresql.svg' },
            { name: 'MongoDB', url: 'imgs/mongodb.svg' },
            { name: 'MySQL', url: 'imgs/mysql.svg' },
            { name: 'Redis', url: 'imgs/redis.svg' },
            { name: 'SQLite', url: 'imgs/sqlite.svg' },
            { name: 'Firebase', url: 'imgs/firebase.svg' },
            { name: 'Docker', url: 'imgs/docker.svg' },
            { name: 'Kubernetes', url: 'imgs/kubernetes.svg' },
            { name: 'AWS', url: 'imgs/aws.svg' },
            { name: 'Google Cloud', url: 'imgs/googlecloud.svg' },
            { name: 'Vercel', url: 'imgs/vercel.svg' },
            { name: 'Git & GitHub', url: 'imgs/github.svg' },
            { name: 'Linux', url: 'imgs/linux.svg' },
            { name: 'Figma', url: 'imgs/figma.svg' }
        ]
    },

    // Project listings, split into "active" (currently being worked on) and
    // "recent" (recently shipped/completed) — drives the Projects section.
    projects: {
        // NOTE: `currentProjects` in the UI is derived as the first 2 entries
        // of activeProjects (via .slice(0, 2)), not filtered by status — so
        // order here matters for what shows up "current" on the homepage.
        activeProjects: [
            {
                id: 'recipe-hub',
                name: 'RecipeHub',
                summary: 'a community-driven recipe sharing platform',
                description: 'Full-stack web app for sharing and rating recipes, with user profiles, search, and image uploads.',
                status: 'active',
                tags: ['React', 'Node.js', 'PostgreSQL', 'Open Source'],
                url: 'https://github.com/'
            },
            {
                id: 'budget-tracker',
                name: 'BudgetTracker',
                summary: '',
                description: 'Personal finance app for tracking expenses, budgets, and spending trends with data visualization.',
                status: 'active',
                tags: ['Vue', 'Python', 'Django', 'Chart.js'],
                url: 'https://github.com/'
            },
            {
                id: 'task-board',
                name: 'TaskBoard',
                summary: 'a lightweight kanban-style project tracker',
                description: 'Collaborative task management tool with drag-and-drop boards, real-time updates, and team workspaces.',
                status: 'active',
                tags: ['React', 'Node.js', 'WebSockets', 'MongoDB'],
                url: 'https://github.com/'
            },
            {
                id: 'linkstash',
                name: 'LinkStash',
                summary: '',
                description: 'Bookmark manager with tagging, full-text search, and browser extension support.',
                status: 'active',
                tags: ['TypeScript', 'Express', 'Redis', 'Chrome Extension'],
                url: 'https://github.com/'
            },
            {
                id: 'habitloop',
                name: 'HabitLoop',
                summary: 'a habit-tracking app with streaks and reminders',
                description: 'Mobile-first habit tracker with streak tracking, daily reminders, and progress charts.',
                status: 'active',
                tags: ['React Native', 'Firebase', 'Expo'],
                url: 'https://github.com/'
            }
        ],
        recentProjects: [
            {
                id: 'weather-now',
                name: 'WeatherNow',
                summary: '',
                description: 'Simple weather dashboard pulling live forecasts from a public API, with saved locations and alerts.',
                status: 'recent',
                tags: ['JavaScript', 'REST API', 'AWS'],
                url: 'https://github.com/'
            },
            {
                id: 'shortly',
                name: 'Shortly',
                summary: 'a minimal URL shortener',
                description: 'URL shortening service with click analytics, custom slugs, and QR code generation.',
                status: 'recent',
                tags: ['Go', 'PostgreSQL', 'Docker'],
                url: 'https://github.com/'
            },
            {
                id: 'notegarden',
                name: 'NoteGarden',
                summary: '',
                description: 'Markdown-based note-taking app with linked notes and a graph view of connections.',
                status: 'recent',
                tags: ['Next.js', 'SQLite', 'Markdown'],
                url: 'https://github.com/'
            },
            {
                id: 'pixelboard',
                name: 'PixelBoard',
                summary: 'a collaborative pixel art canvas',
                description: 'Real-time collaborative pixel art board with live cursors and rate-limited placement.',
                status: 'recent',
                tags: ['WebSockets', 'Canvas API', 'Redis'],
                url: 'https://github.com/'
            },
            {
                id: 'invoicezen',
                name: 'InvoiceZen',
                summary: '',
                description: 'Simple invoicing tool for freelancers with PDF generation and payment tracking.',
                status: 'recent',
                tags: ['Django', 'PostgreSQL', 'Stripe API'],
                url: 'https://github.com/'
            },
            {
                id: 'quizly',
                name: 'Quizly',
                summary: 'a quiz platform for classrooms',
                description: 'Interactive quiz platform with live sessions, leaderboards, and question banks.',
                status: 'recent',
                tags: ['React', 'Express', 'MongoDB', 'WebSockets'],
                url: 'https://github.com/'
            }
        ]
    }
};