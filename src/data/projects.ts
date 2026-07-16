/**
 * Project list: assets live under `public/images/projects/<folder>/`.
 * Each folder uses ss1 as the card + case-study hero; ss2+ are gallery shots (counts differ per project).
 * If your files use .jpg or .webp, change `SHOT_EXT` below (or rename files to match).
 */
import type { Project } from '../config';

/** File extension for ss1, ss2, … in each screenshot folder */
const SHOT_EXT = '.png';

function shot(folder: string, n: number): string {
  return `/images/projects/${folder}/ss${n}${SHOT_EXT}`;
}

/** Gallery paths ss2 … ss`to` (inclusive). Omit missing numbers so the UI does not request 404s. */
function shots(folder: string, from: number, to: number): string[] {
  const out: string[] = [];
  for (let i = from; i <= to; i++) out.push(shot(folder, i));
  return out;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'java-pos-system',
    title: 'Java POS System',
    description:
      'Enterprise-grade point of sale system with offline-first architecture',
    longDescription:
      'A comprehensive desktop POS solution built with Java, featuring wholesale management, repair tracking, and advanced inventory control. Designed for retail environments requiring reliable offline operation.',
    techStack: ['Java', 'JavaFX', 'MySQL', 'JasperReports'],
    features: [
      'Offline-first architecture',
      'Wholesale management module',
      'Repair tracking system',
      'Advanced inventory control',
      'Multi-user support',
      'Receipt printing integration',
    ],
    image: shot('pos_java', 1),
    coverImage: shot('pos_java', 1),
    screenshots: shots('pos_java', 2, 7),
    githubUrl: 'https://github.com/chathuka55/easy_pos',
    category: 'desktop',
    highlights: ['Retail-ready', 'Offline-first', 'Multi-role workflows'],
    problem: 'Shops needed reliable checkout and inventory when connectivity drops.',
    solution: 'A JavaFX desktop client with local persistence and sync-friendly data design.',
  },
  {
    id: 2,
    slug: 'sentinel-website',
    title: 'Sentinel 24/7 Website',
    description: 'Corporate web presence with service showcase and client portal',
    longDescription:
      'A professional corporate website featuring modern design, service showcases, and integrated client portal. Built with performance and security as top priorities.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Corporate web presence',
      'Service showcase platform',
      'Client portal integration',
      'Responsive design',
      'SEO optimization',
      'Contact form with validation',
    ],
    image: shot('24_7_sentinel', 1),
    coverImage: shot('24_7_sentinel', 1),
    screenshots: shots('24_7_sentinel', 2, 7),
    githubUrl: 'https://github.com/Dulaj007/SENTINEL_WEB_APP',
    liveUrl: 'https://sentinel24-7.com/',
    category: 'web',
    highlights: ['Brand-led UI', 'Secure client area', 'Fast marketing pages'],
    problem: 'The business needed a credible online presence and a simple client entry point.',
    solution: 'A React front end with an Express API and MongoDB for dynamic content and auth.',
  },
  {
    id: 3,
    slug: 'cafe-pos',
    title: 'Café POS System',
    description: 'Modern web-based POS with real-time order management',
    longDescription:
      'A full-stack café management system with real-time order processing, payment gateway integration, and comprehensive analytics dashboard for business insights.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe'],
    features: [
      'Real-time order management',
      'Payment gateway integration',
      'Analytics dashboard',
      'Table management',
      'Kitchen display system',
      'Customer loyalty program',
    ],
    image: shot('coffe_me_pos', 1),
    coverImage: shot('coffe_me_pos', 1),
    screenshots: shots('coffe_me_pos', 2, 7),
    githubUrl: 'https://github.com/chathuka55/coffee-me-pos',
    category: 'web',
    highlights: ['Live orders', 'Stripe payments', 'Ops analytics'],
    problem: 'Café staff juggled paper tickets and slow payment flows during peak hours.',
    solution: 'A real-time web POS with sockets for the floor and kitchen, plus Stripe checkout.',
  },
  {
    id: 4,
    slug: 'cctv-monitoring',
    title: 'CCTV Monitoring System',
    description: 'AI-powered surveillance with multi-camera dashboard',
    longDescription:
      'An intelligent CCTV monitoring solution featuring RTSP stream integration, ONVIF protocol support, and AI-powered motion detection for enhanced security surveillance.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'ONVIF'],
    features: [
      'RTSP stream integration',
      'ONVIF protocol support',
      'AI-powered motion detection',
      'Multi-camera dashboard',
      'Recording and playback',
      'Alert notifications',
    ],
    image: shot('cctv', 1),
    coverImage: shot('cctv', 1),
    screenshots: shots('cctv', 2, 6),
    githubUrl: 'https://github.com/chathuka55/hikvision-cloud-cctv',
    category: 'ai',
    highlights: ['Multi-cam', 'Motion AI', 'ONVIF-ready'],
    problem: 'Operators needed one place to watch many streams and catch events quickly.',
    solution: 'A Python stack with OpenCV/TensorFlow pipelines and a Flask-backed control UI.',
  },
  {
    id: 5,
    slug: 'salon-management-system',
    title: 'Salon Management System',
    description:
      'MERN stack salon operations: bookings, e-commerce, inventory, staff, customers, billing, and analytics.',
    longDescription:
      'A comprehensive MERN stack application for managing salon operations including bookings, e-commerce, inventory, staff management, and customer relations. The codebase is organized as a monorepo with a Vite + React client, Express API server, optional shared utilities, documentation, and helper scripts. Real-time features use Socket.IO; payments use Stripe; media uses Cloudinary; transactional email uses Nodemailer and SMS uses Twilio.',
    techStack: [
      'React',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'Vite',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Socket.IO',
      'Stripe',
      'Cloudinary',
      'Nodemailer',
      'Twilio',
    ],
    features: [
      'Booking system — multi-step flow with service selection, beautician assignment, and time slots',
      'E-commerce — product catalog, cart, and checkout',
      'Chat and chatbot — real-time messaging with AI-assisted bot',
      'Staff management — beautician profiles, schedules, and performance tracking',
      'Inventory management — stock levels, alerts, and supplier tracking',
      'Billing and invoicing — invoices and payment processing',
      'Analytics and reports — dashboards and operational reporting',
      'Settings — configurable business and app settings',
    ],
    image: shot('saloon', 1),
    coverImage: shot('saloon', 1),
    screenshots: shots('saloon', 2, 9),
    githubUrl: 'https://github.com/chathuka55/saloon_management_system',
    category: 'web',
    highlights: ['MERN monorepo', 'Real-time + Stripe', 'Salon-ready workflows'],
    problem: 'Salons juggle bookings, retail, staff rotas, and stock in separate tools with no single source of truth.',
    solution:
      'A unified MERN application with Redux Toolkit on the client, REST + Socket.IO on the server, MongoDB for persistence, and integrations for payments, media, email, and SMS.',
    repositoryOverview: `salon-management-system/
├── client/          # React frontend (Vite)
├── server/          # Node.js / Express API
├── shared/          # Shared code between client and server
├── docs/            # Documentation
└── scripts/         # Utility scripts`,
    setupGuide: `Prerequisites: Node.js v18+, MongoDB v6+, npm or yarn.

1. Clone the repository (replace with your repo URL).
   git clone <repository-url>
   cd salon-management-system

2. Install root dependencies: npm install

3. Client — cd client && npm install
   Copy client/.env.example to client/.env and fill values.

4. Server — cd server && npm install
   Copy server/.env.example to server/.env and fill values.

5. Run dev — Terminal 1: cd server && npm run dev
   Terminal 2: cd client && npm run dev`,
    documentationNotes:
      'Documentation in docs/: API documentation, setup guide, deployment guide, and database schema. Wire URLs in your repo when published.',
    licenseLine: 'chathukajayaseakra@2026 all rights reserved',
  },
  {
    id: 6,
    slug: 'hotel-analytics-scraper',
    title: 'Hotel Check-in Data Scraper',
    description:
      'Educational multi-source hotel check-in scraper and Sri Lanka hotel analytics dashboard.',
    longDescription:
      'A complete learning project that teaches web scraping architecture from beginner to production: modular scrapers for Booking.com, Agoda, Expedia, SLTDA, and data.gov.lk; parsers and storage layers; rate limiting, retries, and structured logging; plus an analytics surface for hotel check-in and occupancy insights. Designed for educational use with ethical scraping practices—robots.txt respect, rate limits, and no CAPTCHA bypass.',
    techStack: [
      'Python',
      'Playwright',
      'BeautifulSoup',
      'requests',
      'Pydantic',
      'Pandas',
      'SQLAlchemy',
      'FastAPI',
      'pytest',
      'Docker',
      'loguru',
      'tenacity',
    ],
    features: [
      'Multi-source scrapers — Booking, Agoda, Expedia, SLTDA, and data.gov.lk',
      'Modular pipeline — CLI → scrapers → parsers → CSV/JSON/DB storage',
      'Rate limiting, proxy/UA rotation, and retry with backoff',
      'Pydantic data models for hotel check-in records',
      'Unit, integration, selector health, and data-quality tests',
      'Analytics dashboard for check-ins and occupancy insights',
    ],
    image: shot('hotel_scraper', 1),
    coverImage: shot('hotel_scraper', 1),
    screenshots: shots('hotel_scraper', 2, 6),
    githubUrl: 'https://github.com/chathuka55/hotel-analytics-scraper',
    liveUrl: 'https://hotel-analytics-scraper.vercel.app/',
    category: 'web',
    highlights: [
      'Educational scraper architecture',
      'Sri Lanka hotel analytics',
      'Ethical rate-limited design',
    ],
    problem:
      'Learning production-grade scraping needs a realistic domain: multi-source hotel check-in data with rate limits, brittle selectors, and analytics—not a toy single-file script.',
    solution:
      'A layered Python system with abstract scrapers/parsers/storage, config-driven selectors, ethical rate limiting, tests, and a hosted analytics UI for Sri Lanka hotel insights.',
    repositoryOverview: `hotel-scraper/
├── src/
│   ├── main.py              # CLI entry point
│   ├── config/              # Settings + selectors.yaml
│   ├── scrapers/            # Booking, Agoda, Expedia, SLTDA, data.gov.lk
│   ├── parsers/             # Hotel + review parsers
│   ├── storage/             # CSV, JSON, SQLite/Postgres
│   ├── utils/               # Proxies, rate limit, retry, sessions
│   └── monitoring/          # Logging + metrics
├── tests/                   # Unit, integration, fixtures
├── scripts/                 # Run-all, Docker, seed DB
├── data/                    # Raw + processed outputs
└── docs/                    # Architecture + maintenance guides`,
    setupGuide: `Prerequisites: Python 3.10+, pip, Playwright browsers.

1. Clone and create a virtualenv
   git clone https://github.com/chathuka55/hotel-analytics-scraper
   cd hotel-scraper
   python -m venv venv
   source venv/bin/activate   # Windows: venv\\Scripts\\activate

2. Install dependencies
   pip install -r requirements.txt
   playwright install chromium

3. Run a scraper
   python src/main.py --source booking --city Colombo --checkin 2026-07-01 --checkout 2026-07-03

4. Run tests
   pytest tests/ -v --cov=src

5. Run all scrapers
   bash scripts/run_all.sh`,
    documentationNotes:
      'Educational purpose only. Check robots.txt, rate-limit to ~1 request per 3–5 seconds, use a descriptive User-Agent, and stop if blocked by CAPTCHA. Government sources (SLTDA, data.gov.lk) are public. Do not republish scraped data or use commercially without permission. See docs/ for architecture, selector maintenance, and anti-block guidance.',
    licenseLine: 'Educational use only — respect site ToS, robots.txt, and rate limits',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
