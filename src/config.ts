// =============================================================================
// Portfolio Configuration - Chathuka Jayasekara
// Yellow & Black Theme with Japanese Aesthetics
// =============================================================================

import { projects as projectsData } from './data/projects';

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Chathuka Jayasekara | Full-Stack Developer",
  description: "Software Engineering Undergraduate & Full-Stack Developer crafting digital excellence through code. Specializing in full-stack systems, 3D interfaces, and enterprise applications.",
  language: "en",
};

// -- Navigation ---------------------------------------------------------------
export interface NavItem {
  label: string;
  icon: string;
  /** In-page section on the home view */
  sectionId?: string;
  /** Standalone route (e.g. project showcase) */
  to?: string;
}

export const navConfig = {
  brandName: "CJ",
  brandSubtitle: "コード",
  navItems: [
    { label: "Home", sectionId: "hero", icon: "home" },
    { label: "Projects", sectionId: "projects", icon: "code" },
    { label: "Skills", sectionId: "skills", icon: "zap" },
    { label: "About", sectionId: "about", icon: "user" },
    { label: "Contact", sectionId: "contact", icon: "mail" },
  ] as NavItem[],
};

// -- Hero Section -------------------------------------------------------------
export interface HeroConfig {
  name: string;
  role: string;
  tagline: string;
  decodeChars: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  kanjiDecorations: string[];
}

export const heroConfig: HeroConfig = {
  name: "CHATHUKA JAYASEKARA",
  role: "Software Engineering Undergraduate | Full-Stack Developer",
  tagline: "Crafting Digital Excellence Through Code",
  decodeChars: "アイウエオカキクケコ0123456789",
  ctaPrimary: "View Projects",
  ctaPrimaryTarget: "projects",
  ctaSecondary: "Get in Touch",
  ctaSecondaryTarget: "contact",
  kanjiDecorations: ["技術", "コード", "未来", "創造", "革新"],
};

// -- Projects Section ---------------------------------------------------------
export interface ProjectGalleryItem {
  src: string;
  alt?: string;
  caption?: string;
}

export interface Project {
  id: number;
  /** URL segment for /projects/:slug */
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  image: string;
  /** Detail hero; falls back to `image` in UI when unset */
  coverImage?: string;
  highlights?: string[];
  problem?: string;
  solution?: string;
  gallery?: ProjectGalleryItem[];
  /** Optional looping background video (uses <video> when set, otherwise image) */
  videoUrl?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "desktop" | "web" | "ai" | "security";
  /** Monorepo / folder layout (plain text), shown on detail page when set */
  repositoryOverview?: string;
  /** Prerequisites, install, and run commands (plain text) */
  setupGuide?: string;
  /** Documentation topics or links description (plain text) */
  documentationNotes?: string;
  /** License / attribution line */
  licenseLine?: string;
}

export const projectsConfig = {
  sectionLabel: "FEATURED WORK",
  sectionTitle: "PROJECTS",
  kanjiAccent: "作品",
  projects: projectsData,
};

// -- Skills Section -----------------------------------------------------------
export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  icon: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  kanji: string;
}

export const skillsConfig = {
  sectionLabel: "EXPERTISE",
  sectionTitle: "SKILLS & TECHNOLOGIES",
  kanjiAccent: "技術",
  categories: [
    { id: "frontend", label: "Frontend", kanji: "前端" },
    { id: "backend", label: "Backend", kanji: "後端" },
    { id: "database", label: "Database", kanji: "データ" },
    { id: "tools", label: "Tools", kanji: "工具" },
    { id: "languages", label: "Languages", kanji: "言語" },
  ] as SkillCategory[],
  skills: [
    // Frontend
    { name: "React", level: 90, category: "frontend", icon: "react" },
    { name: "TypeScript", level: 85, category: "frontend", icon: "typescript" },
    { name: "Three.js", level: 80, category: "frontend", icon: "threejs" },
    { name: "Tailwind CSS", level: 95, category: "frontend", icon: "tailwind" },
    { name: "Next.js", level: 75, category: "frontend", icon: "nextjs" },
    // Backend
    { name: "Node.js", level: 88, category: "backend", icon: "nodejs" },
    { name: "Express", level: 85, category: "backend", icon: "express" },
    { name: "Java", level: 82, category: "backend", icon: "java" },
    { name: "Python", level: 80, category: "backend", icon: "python" },
    // Database
    { name: "PostgreSQL", level: 85, category: "database", icon: "postgresql" },
    { name: "MongoDB", level: 80, category: "database", icon: "mongodb" },
    { name: "MySQL", level: 78, category: "database", icon: "mysql" },
    // Tools
    { name: "Git", level: 90, category: "tools", icon: "git" },
    { name: "Docker", level: 75, category: "tools", icon: "docker" },
    { name: "Linux", level: 80, category: "tools", icon: "linux" },
    { name: "Postman", level: 82, category: "tools", icon: "postman" },
    { name: "Selenium IDE", level: 76, category: "tools", icon: "selenium" },
    { name: "Testing (Jest)", level: 78, category: "tools", icon: "jest" },
    // Languages
    { name: "JavaScript", level: 95, category: "languages", icon: "javascript" },
    { name: "SQL", level: 85, category: "languages", icon: "sql" },
  ] as Skill[],
};

// -- Timeline Section ---------------------------------------------------------
export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: "education" | "project" | "skill" | "milestone";
}

export const timelineConfig = {
  sectionLabel: "JOURNEY",
  sectionTitle: "EXPERIENCE TIMELINE",
  kanjiAccent: "経歴",
  events: [
    {
      id: 1,
      date: "2022",
      title: "Started Software Engineering Degree",
      description: "Began undergraduate studies in Software Engineering, focusing on full-stack development and system architecture.",
      type: "education"
    },
    {
      id: 2,
      date: "2023",
      title: "Java POS System",
      description: "Developed a comprehensive point of sale system with offline-first architecture for retail environments.",
      type: "project"
    },
    {
      id: 3,
      date: "2023",
      title: "Mastered React & Node.js",
      description: "Advanced proficiency in modern JavaScript frameworks and backend development with Node.js ecosystem.",
      type: "skill"
    },
    {
      id: 4,
      date: "2024",
      title: "Sentinel 24/7 Website",
      description: "Built a professional corporate website with client portal integration and modern web technologies.",
      type: "project"
    },
    {
      id: 5,
      date: "2024",
      title: "Café POS System",
      description: "Created a full-stack café management system with real-time features and payment integration.",
      type: "project"
    },
    {
      id: 6,
      date: "2025",
      title: "AI-Powered CCTV System",
      description: "Developed an intelligent surveillance system with motion detection and multi-camera support.",
      type: "project"
    },
    {
      id: 7,
      date: "2025",
      title: "Three.js & 3D Graphics",
      description: "Expanded expertise into 3D web graphics and interactive interfaces using Three.js and WebGL.",
      type: "skill"
    },
    {
      id: 8,
      date: "2026",
      title: "Salon Management System (MERN)",
      description:
        "Built a full MERN monorepo for salon bookings, e-commerce, inventory, staff, billing, analytics, and real-time chat with Stripe, Socket.IO, and Cloudinary.",
      type: "project"
    }
  ] as TimelineEvent[],
};

// -- About Section ------------------------------------------------------------
export const aboutConfig = {
  sectionLabel: "ABOUT ME",
  sectionTitle: "WHO I AM",
  kanjiAccent: "自己紹介",
  profileImage: "/images/profile.jpeg",
  bio: [
    "I'm a passionate Software Engineering undergraduate from Sri Lanka, dedicated to crafting exceptional digital experiences through clean, efficient code.",
    "My expertise spans full-stack development, from building responsive frontend interfaces with React and Three.js to designing robust backend systems with Node.js and Java.",
    "I specialize in creating enterprise-grade applications with a focus on security, performance, and user experience. My recent work includes POS systems, surveillance solutions, and interactive 3D web interfaces.",
    "When I'm not coding, I explore new technologies, contribute to open-source projects, and continuously expand my knowledge in software architecture and design patterns."
  ],
  stats: [
    { label: "Projects Completed", value: "15+", kanji: "完了" },
    { label: "Technologies Mastered", value: "20+", kanji: "習得" },
    { label: "Years of Experience", value: "3+", kanji: "経験" },
    { label: "Lines of Code", value: "50K+", kanji: "コード" },
  ],
};

// -- Contact Section ----------------------------------------------------------
export const contactConfig = {
  sectionLabel: "GET IN TOUCH",
  sectionTitle: "CONTACT ME",
  kanjiAccent: "連絡",
  email: "chathukajayaseakra@gmail.com",
  location: "Sri Lanka",
  locationKanji: "スリランカ",
  socialLinks: [
    { platform: "github", url: "https://github.com/chathuka55", label: "GitHub" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/chathuka-jayasekara-013595216/", label: "LinkedIn" },
    { platform: "facebook", url: "https://www.facebook.com/chathuka.jayasekara", label: "Facebook" },
    { platform: "instagram", url: "https://www.instagram.com/chathux_j/", label: "Instagram" },
  ],
  formFields: {
    name: { label: "Name", placeholder: "Your name", required: true },
    email: { label: "Email", placeholder: "your@email.com", required: true },
    subject: { label: "Subject", placeholder: "What's this about?", required: true },
    message: { label: "Message", placeholder: "Your message...", required: true },
  },
  submitButton: "Send Message",
  successMessage: "Message sent successfully! I'll get back to you soon.",
};

// -- Footer Section -----------------------------------------------------------
export interface FooterQuickLink {
  label: string;
  sectionId?: string;
  to?: string;
}

export const footerConfig = {
  brandName: "CHATHUKA JAYASEKARA",
  brandSubtitle: "チャトゥカ・ジャヤセカラ",
  tagline: "Crafting Digital Excellence Through Code",
  kanjiAccent: "コード",
  quickLinks: [
    { label: "Home", sectionId: "hero" },
    { label: "Projects", sectionId: "projects" },
    { label: "All projects", to: "/projects" },
    { label: "Skills", sectionId: "skills" },
    { label: "About", sectionId: "about" },
    { label: "Contact", sectionId: "contact" },
  ] as FooterQuickLink[],
  copyright: "© 2025 Chathuka Jayasekara. All rights reserved.",
  copyrightKanji: "著作権所有",
  backToTop: "Back to Top",
  backToTopKanji: "トップへ",
};
