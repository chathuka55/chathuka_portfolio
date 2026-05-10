// =============================================================================
// Portfolio Configuration - Chathuka Jayasekara
// Yellow & Black Theme with Japanese Aesthetics
// =============================================================================

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
  sectionId: string;
  icon: string;
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
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  image: string;
  /** Optional looping background video (uses <video> when set, otherwise image) */
  videoUrl?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "desktop" | "web" | "ai" | "security";
}

export const projectsConfig = {
  sectionLabel: "FEATURED WORK",
  sectionTitle: "PROJECTS",
  kanjiAccent: "作品",
  projects: [
    {
      id: 1,
      title: "Java POS System",
      description: "Enterprise-grade point of sale system with offline-first architecture",
      longDescription: "A comprehensive desktop POS solution built with Java, featuring wholesale management, repair tracking, and advanced inventory control. Designed for retail environments requiring reliable offline operation.",
      techStack: ["Java", "JavaFX", "MySQL", "JasperReports"],
      features: [
        "Offline-first architecture",
        "Wholesale management module",
        "Repair tracking system",
        "Advanced inventory control",
        "Multi-user support",
        "Receipt printing integration"
      ],
      image: "/images/projects/pos-card.svg",
      screenshots: ["/images/projects/pos-1.svg", "/images/projects/pos-2.svg", "/images/projects/pos-3.svg"],
      githubUrl: "https://github.com",
      category: "desktop"
    },
    {
      id: 2,
      title: "Sentinel 24/7 Website",
      description: "Corporate web presence with service showcase and client portal",
      longDescription: "A professional corporate website featuring modern design, service showcases, and integrated client portal. Built with performance and security as top priorities.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      features: [
        "Corporate web presence",
        "Service showcase platform",
        "Client portal integration",
        "Responsive design",
        "SEO optimization",
        "Contact form with validation"
      ],
      image: "/images/projects/sentinel-card.svg",
      screenshots: ["/images/projects/sentinel-1.svg", "/images/projects/sentinel-2.svg"],
      liveUrl: "https://example.com",
      category: "web"
    },
    {
      id: 3,
      title: "Café POS System",
      description: "Modern web-based POS with real-time order management",
      longDescription: "A full-stack café management system with real-time order processing, payment gateway integration, and comprehensive analytics dashboard for business insights.",
      techStack: ["React", "Node.js", "PostgreSQL", "Socket.io", "Stripe"],
      features: [
        "Real-time order management",
        "Payment gateway integration",
        "Analytics dashboard",
        "Table management",
        "Kitchen display system",
        "Customer loyalty program"
      ],
      image: "/images/projects/cafe-card.svg",
      screenshots: ["/images/projects/cafe-1.svg", "/images/projects/cafe-2.svg"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      category: "web"
    },
    {
      id: 4,
      title: "CCTV Monitoring System",
      description: "AI-powered surveillance with multi-camera dashboard",
      longDescription: "An intelligent CCTV monitoring solution featuring RTSP stream integration, ONVIF protocol support, and AI-powered motion detection for enhanced security surveillance.",
      techStack: ["Python", "OpenCV", "TensorFlow", "Flask", "ONVIF"],
      features: [
        "RTSP stream integration",
        "ONVIF protocol support",
        "AI-powered motion detection",
        "Multi-camera dashboard",
        "Recording and playback",
        "Alert notifications"
      ],
      image: "/images/projects/cctv-card.svg",
      screenshots: ["/images/projects/cctv-1.svg", "/images/projects/cctv-2.svg"],
      githubUrl: "https://github.com",
      category: "ai"
    }
  ] as Project[],
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
  cvUrl: "/cv-chathuka-jayasekara.pdf",
};

// -- Contact Section ----------------------------------------------------------
export const contactConfig = {
  sectionLabel: "GET IN TOUCH",
  sectionTitle: "CONTACT ME",
  kanjiAccent: "連絡",
  email: "chathukajayasekara@gmail.com",
  location: "Sri Lanka",
  locationKanji: "スリランカ",
  socialLinks: [
    { platform: "github", url: "https://github.com", label: "GitHub" },
    { platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
    { platform: "twitter", url: "https://twitter.com", label: "Twitter" },
    { platform: "instagram", url: "https://instagram.com", label: "Instagram" },
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
export const footerConfig = {
  brandName: "CHATHUKA JAYASEKARA",
  brandSubtitle: "チャトゥカ・ジャヤセカラ",
  tagline: "Crafting Digital Excellence Through Code",
  kanjiAccent: "コード",
  quickLinks: ["Home", "Projects", "Skills", "About", "Contact"],
  copyright: "© 2025 Chathuka Jayasekara. All rights reserved.",
  copyrightKanji: "著作権所有",
  backToTop: "Back to Top",
  backToTopKanji: "トップへ",
};
