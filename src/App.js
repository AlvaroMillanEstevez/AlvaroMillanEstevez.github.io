import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  Gamepad2,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Play,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Wrench,
  X,
  Zap
} from 'lucide-react';

// The address is assembled at runtime so it never appears as plain text in the HTML or the bundle.
const getContactEmail = () =>
  [['alvaro', 'mye'].join(''), ['gmail', 'com'].join('.')].join(String.fromCharCode(64));

const navigationItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const mobileNavigationItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

const App = () => {
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const [selectedVideoProject, setSelectedVideoProject] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [navIndicator, setNavIndicator] = useState(null);
  const [cvMenuOpensUp, setCvMenuOpensUp] = useState(false);

  const lenisRef = useRef(null);
  const cvMenuRef = useRef(null);
  const timelineRef = useRef(null);
  const navButtonRefs = useRef({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };

  const cvFiles = {
    en: '/assets/alvaro_millan_fullstack_en.pdf',
    es: '/assets/alvaro_millan_fullstack_es.pdf'
  };

  useEffect(() => {
    if (!EMAILJS_CONFIG.PUBLIC_KEY) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;

    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [EMAILJS_CONFIG.PUBLIC_KEY]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll-linked effects write CSS variables instead of React state, so scrolling never re-renders the page.
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const documentHeight = root.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
      const heroProgress = Math.min(1, scrollTop / Math.max(1, window.innerHeight));

      root.style.setProperty('--scroll-progress', Math.min(1, Math.max(0, progress)).toFixed(4));
      root.style.setProperty('--hero-progress', heroProgress.toFixed(4));

      const timeline = timelineRef.current;
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const timelineProgress = (window.innerHeight * 0.65 - rect.top) / Math.max(1, rect.height);
        timeline.style.setProperty('--timeline-progress', Math.min(1, Math.max(0, timelineProgress)).toFixed(4));
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (selectedVideoProject || selectedGallery) lenis.stop();
    else lenis.start();
  }, [selectedVideoProject, selectedGallery]);

  useEffect(() => {
    if (!isCvMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target)) {
        setIsCvMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isCvMenuOpen]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const button = navButtonRefs.current[activeSection];
      if (button) setNavIndicator({ left: button.offsetLeft, width: button.offsetWidth });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!('IntersectionObserver' in window)) return undefined;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6]
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedVideoProject(null);
        setSelectedGallery(null);
        setIsCvMenuOpen(false);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const step = event.key === 'ArrowLeft' ? -1 : 1;

        setSelectedGallery((gallery) => {
          if (!gallery) return gallery;
          const total = gallery.project.screenshots.length;
          return { ...gallery, index: (gallery.index + step + total) % total };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      const headerOffset = window.innerWidth < 1024 ? 64 : 80;

      const targetTop =
        element.getBoundingClientRect().top + window.scrollY - headerOffset;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(Math.max(0, targetTop), { duration: 1.4 });
        setIsCvMenuOpen(false);
        return;
      }

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });
    }

    setIsCvMenuOpen(false);
  };

  const handleCardPointerMove = (event) => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleCopyEmail = async () => {
    const email = getContactEmail();

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = email;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }

    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2200);
  };

  const isEmailJsConfigured =
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID &&
    EMAILJS_CONFIG.PUBLIC_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    if (!isEmailJsConfigured || !window.emailjs) {
      const mailtoSubject = encodeURIComponent(formData.subject);
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );

      window.location.href = `mailto:${getContactEmail()}?subject=${mailtoSubject}&body=${mailtoBody}`;
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      );

      if (result.status !== 200) {
        throw new Error('EmailJS did not return a successful status.');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const experiences = [
    {
      period: 'Jun 2025 — Present',
      role: 'Software Developer & Technical QA',
      company: 'Confidential Software Product',
      meta: 'Freelance · Part-time',
      icon: Briefcase,
      description:
        'Current collaboration inside an existing development team and codebase. Client and product details are withheld due to confidentiality.',
      bullets: [
        'Investigated, reproduced or resolved 200+ issues across frontend, API integration and end-to-end application flows.',
        'Built and debugged Vue/TypeScript interfaces, REST API integrations and Socket.IO real-time communication.',
        'Worked on user chat, authentication, roles and permissions, payment-provider integrations and RAG-assisted functionality.',
        'Combined technical QA, regression testing and root-cause analysis with practical UX and technical improvement proposals.'
      ],
      tech: ['Vue 3', 'TypeScript', 'REST APIs', 'Socket.IO', 'Git', 'Technical QA']
    },
    {
      period: 'Mar 2025 — Jun 2025',
      role: 'Full-Stack Developer Intern',
      company: 'Comunica.dk Translations S.L.',
      meta: 'Final-degree internship',
      icon: Code2,
      description:
        'Owned a real internal business problem from workflow analysis and technical research through proposal and implementation.',
      bullets: [
        'Designed and developed an AI-powered plugin integrated with the company CRM and employee workflow.',
        'Implemented analysis of employee-client email threads with summaries, contextual insights and response assistance.',
        'Added automatic draft correction and language transformation/translation features.',
        'Worked across full-stack development, integrations and deployment/DevOps-related tasks.'
      ],
      tech: ['Full-Stack', 'AI Integration', 'CRM', 'APIs', 'DevOps']
    },
    {
      period: 'Project-based',
      role: 'Freelance Web Developer',
      company: 'Asociación Respira',
      meta: 'Internal management system',
      icon: Database,
      description:
        'Delivered a database-driven internal tool adapted to the organisation’s real operational workflow.',
      bullets: [
        'Developed a PHP/MySQL system for registering, consulting and managing social-intervention records.',
        'Implemented authentication, access control and data-driven management screens.',
        'Validated core flows, form submissions, permissions and data consistency before delivery.'
      ],
      tech: ['PHP', 'MySQL', 'Authentication', 'Data Validation']
    }
  ];

  const coreSkills = [
    { name: 'Vue 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ];

  const capabilityGroups = [
    {
      icon: Server,
      title: 'APIs & Integration',
      items: ['REST APIs', 'Postman', 'Swagger / OpenAPI', 'Webhooks', 'Socket.IO', 'Third-party integrations']
    },
    {
      icon: TestTube2,
      title: 'Quality & Debugging',
      items: ['Technical QA', 'Regression testing', 'API validation', 'Root-cause debugging', 'End-to-end flows', 'Vitest']
    },
    {
      icon: Bot,
      title: 'Applied AI',
      items: ['OpenAI API', 'Claude API', 'RAG', 'LLM workflows', 'Agentic development (Claude Code)', 'AI-generated assets']
    },
    {
      icon: Terminal,
      title: 'Engineering Workflow',
      items: ['Git / GitHub', 'Docker Compose', 'Linux', 'Vite', 'NPM', 'Composer']
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      items: ['Phaser 4', 'TypeScript game logic', 'Level generation', 'Simulation & balancing', 'Web Audio', 'Touch + desktop input']
    }
  ];

  const projects = [
    {
      title: 'Nusa: Warung Sort',
      subtitle: 'Published web puzzle game set in an Indonesian street-food stall.',
      status: 'Published game',
      statusClass: 'bg-cyan-300/90 text-slate-900',
      featured: true,
      description:
        'Complete triple-match sorting game designed, built and published as a solo developer — from game design and architecture to testing, art direction and release on web game portals.',
      highlights: [
        'Framework-free TypeScript game core, tested with Vitest; Phaser 4 scenes only render state',
        '50 levels built by a recipe-based level generator and balanced with a simulated player',
        'Own mechanics: fresh-food countdowns, Javanese market days and a bilingual collection book',
        'Agentic AI coding and AI-generated assets, with every result reviewed, debugged and validated',
        'Optimised production build (under 11 MB), EN/ID i18n and desktop + mobile layouts'
      ],
      tech: ['TypeScript', 'Phaser 4', 'Vite', 'Vitest', 'Web Audio', 'Python tooling', 'Agentic AI'],
      code: 'https://github.com/AlvaroMillanEstevez/nusa-sorting',
      demo: 'https://kokeskill.itch.io/nusa-warung-sort',
      demoLabel: 'Play on itch.io',
      image: 'assets/screenshot-3-belt-combo.png',
      video: 'assets/videos/warungsortvideo.mp4',
      screenshots: [
        { src: 'assets/screenshot-3-belt-combo.png', caption: 'Night market level: conveyor belts and a x5 combo' },
        { src: 'assets/screenshot-1-fresh-food.png', caption: 'Fresh food with a move countdown before it spoils' },
        { src: 'assets/screenshot-2-budaya-jawa.png', caption: 'Javanese culture themed island' },
        { src: 'assets/screenshot-4-island-map.png', caption: 'Illustrated island map with 50 levels' }
      ]
    },
    {
      title: 'Nusa Creator Studio',
      subtitle: 'Open-source AI content studio for social-commerce sellers and creators.',
      status: 'Open source',
      statusClass: 'bg-emerald-400/90 text-slate-900',
      description:
        'Turns a product brief, photos or raw footage into ready-to-use marketing content — campaign angles, hooks, scripts, captions, voiceovers, try-on images and short videos — inside one project workspace.',
      highlights: [
        'Laravel REST API + Vue 3 / TypeScript SPA with Sanctum cookie authentication',
        'Queued generations with transactional, idempotent credits and automatic refunds',
        'Six AI providers (OpenAI, Gemini, Veo, ElevenLabs, FASHN, Shotstack) behind adapters, mock-first',
        'Plan-gated tools, private media library, admin panel and EN/ID/ES interface',
        '360 backend + 232 frontend tests; agent-written code reviewed and tested by me'
      ],
      tech: ['Vue 3', 'TypeScript', 'Laravel', 'PostgreSQL', 'Pinia', 'Tailwind CSS', 'Queues', 'AI providers'],
      code: 'https://github.com/AlvaroMillanEstevez/nusa-creator-studio',
      image: 'assets/demoNusaCreatorStudio.png',
      video: 'assets/videos/videoDemoNusaCreatorStudio.mp4',
      screenshots: [
        { src: 'assets/nusa-creator-studio-dashboard.png', caption: 'Dashboard with projects, credits and recent generations' },
        { src: 'assets/nusa-creator-studio-project-actions.png', caption: 'Project workspace with plan-gated actions and credit costs' },
        { src: 'assets/nusa-creator-studio-campaign-result.png', caption: 'Product Content Kit result: hooks and TikTok script (mock mode)' },
        { src: 'assets/nusa-creator-studio-pricing.png', caption: 'Plans and credits priced in Indonesian Rupiah' }
      ]
    },
    {
      title: 'Warung Kita',
      subtitle: 'Browser management game about running an Indonesian street restaurant.',
      status: 'Work in progress',
      statusClass: 'bg-amber-400/90 text-slate-900',
      description:
        'My second Phaser game: reopen and grow a small warung — cook nasi goreng, serve customers, buy supplies and reinvest in tables, staff and upgrades until it runs largely on its own.',
      highlights: [
        'Game rules in a Phaser-free simulation layer, covered by 124 rule tests',
        'Staff AI: cooks batch towards a shared target and reserve resources so they never collide',
        'Physical economy: supplier cash or credit, debt repaid from sales, cash tray to collect',
        'Keyboard + touch-drag controls, versioned local save and ES/EN/ID localisation',
        'All art drawn procedurally in code — no downloaded assets'
      ],
      tech: ['TypeScript', 'Phaser 4', 'Vite', 'node:test', 'Procedural art', 'Agentic AI'],
      code: 'https://github.com/AlvaroMillanEstevez/warung-game',
      image: 'assets/warung-kita-kitchen-and-dining.png',
      video: 'assets/videos/warungKitaDemo.mp4',
      screenshots: [
        { src: 'assets/warung-kita-kitchen-and-dining.png', caption: 'Kitchen, counter and dining room with cooks, cashier and customers' },
        { src: 'assets/warung-kita-dining-room-staff.png', caption: 'Dining room with cleaning staff' },
        { src: 'assets/warung-kita-office-upgrades.png', caption: 'Office upgrades panel' },
        { src: 'assets/warung-kita-mobile-counter.png', caption: 'Mobile portrait view with touch controls' }
      ]
    },
    {
      title: 'AI / RAG Knowledge Assistant',
      subtitle: 'Document-grounded assistant with retrieval and source-aware responses.',
      status: 'Prototype',
      statusClass: 'bg-violet-400/90 text-slate-900',
      description:
        'RAG application designed to answer questions using private or business-specific documentation instead of relying only on general LLM knowledge.',
      highlights: [
        'Document ingestion and chunking workflow',
        'Semantic retrieval and context construction',
        'Local LLM experimentation with Ollama',
        'Response validation and source-aware answers'
      ],
      tech: ['FastAPI', 'LlamaIndex', 'Ollama', 'Chroma', 'Vue', 'RAG'],
      code: 'https://github.com/AlvaroMillanEstevez/rag-chatbot-agent',
      image: 'assets/RAGChatbot.png',
      video: 'assets/videos/RagChatbotPorfolio.mp4'
    },
    {
      title: 'E-commerce Admin Dashboard',
      subtitle: 'Full-stack administration panel for products, orders and users.',
      status: 'Demo',
      statusClass: 'bg-emerald-400/90 text-slate-900',
      description:
        'Full-stack dashboard focused on authenticated management flows, API integration, reusable UI components and responsive administration screens.',
      highlights: [
        'JWT authentication and protected routes',
        'Product, order and user management',
        'Laravel REST API integration',
        'CRUD flow and API-response validation'
      ],
      tech: ['Vue 3', 'TypeScript', 'Laravel', 'MySQL', 'JWT', 'REST APIs'],
      code: 'https://github.com/AlvaroMillanEstevez/VueShop-Admin',
      image: 'assets/EcommerceAdminPanel.png',
      video: 'assets/videos/videoDemoEcommerceAdminPanel.mp4'
    }
  ];

  const strengths = [
    {
      icon: Sparkles,
      title: 'Business → Technical',
      text: 'I analyse real business needs, investigate alternatives and translate them into practical implementation decisions.'
    },
    {
      icon: ShieldCheck,
      title: 'Build + Validate',
      text: 'Development and technical QA go together: implementation, API validation, regression checks and root-cause debugging.'
    },
    {
      icon: Zap,
      title: 'Fast Adaptation',
      text: 'I become productive quickly in unfamiliar codebases, technologies and team workflows without losing attention to quality.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-300 selection:text-slate-900">
      <div className="scroll-progress-bar fixed top-0 left-0 right-0 z-[10000] h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

      <header className="portfolio-fixed-header">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full gap-2 lg:gap-4">
            <button
              onClick={() => scrollToSection('home')}
              className="brand-logo group shrink-0 flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              aria-label="Back to home"
              title="Back to home"
            >
              <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-lg shadow-cyan-500/10 overflow-hidden">
                <img
                  src="/favicon.ico"
                  alt=""
                  aria-hidden="true"
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                />
              </span>

              <span className="hidden md:block text-sm font-semibold tracking-wide text-white group-hover:text-cyan-200 transition-colors whitespace-nowrap">
                Álvaro Millán Estevez
              </span>
            </button>

            {/* Mobile/tablet: the logo is Home; the remaining sections fit on one row. */}
            <div className="lg:hidden flex-1 min-w-0">
              <div className="mobile-primary-nav flex items-center justify-start gap-0.5">
                {mobileNavigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={item.ariaLabel || item.label}
                    title={item.ariaLabel || item.label}
                    className={`mobile-nav-button min-w-0 px-1.5 py-1.5 rounded-lg text-[9px] min-[360px]:text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold tracking-[-0.01em] transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-cyan-400/15 text-cyan-200 border border-cyan-300/25'
                        : 'text-slate-300 border border-transparent hover:text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop navigation. */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="relative flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1 backdrop-blur-xl">
                {navIndicator && (
                  <span
                    aria-hidden="true"
                    className="nav-indicator absolute top-1 bottom-1 left-0 rounded-full bg-white/10 shadow-inner shadow-white/5 ring-1 ring-white/10"
                    style={{ width: navIndicator.width, transform: `translateX(${navIndicator.left}px)` }}
                  />
                )}
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    ref={(element) => {
                      navButtonRefs.current[item.id] = element;
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative z-10 px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                      activeSection === item.id ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href="https://github.com/AlvaroMillanEstevez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center transition-all hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-cyan-100 transition-all hover:-translate-y-0.5"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="relative z-30 min-h-screen flex items-center pt-24 lg:pt-24 pb-20"
      >
        {/* Decorative layers are clipped here, not on the section, so the CV menu can overflow below it. */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="hero-parallax-slow absolute -top-40 -left-28 w-[34rem] h-[34rem] rounded-full bg-cyan-500/20 blur-[120px] animate-orbit-slow" />
          <div className="hero-parallax-fast absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full bg-violet-600/20 blur-[140px] animate-orbit-reverse" />
          <div className="hero-parallax-slow absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center">
            <div className="hero-copy relative z-20">
              <div className="hero-stagger inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Open to full-time Software Engineering opportunities
              </div>

              <p className="hero-stagger text-cyan-300 uppercase tracking-[0.24em] text-xs sm:text-sm font-semibold mb-4" style={{ '--i': 1 }}>
                Full-Stack Developer · Software Engineer
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.3rem] font-black tracking-[-0.04em] leading-[0.96] text-white mb-7">
                <span className="line-mask">
                  <span className="line-inner" style={{ '--i': 0 }}>Building software that</span>
                </span>
                <span className="line-mask">
                  <span className="line-inner gradient-text" style={{ '--i': 1 }}>solves real problems.</span>
                </span>
              </h1>

              <p className="hero-stagger text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8" style={{ '--i': 4 }}>
                I build and improve web products with Vue, TypeScript, Laravel and REST APIs —
                combining software development, technical QA, root-cause debugging and practical AI
                integration with a strong understanding of business needs. I have also designed and
                published my own web game with TypeScript and Phaser.
              </p>

              <div className="hero-stagger flex flex-wrap gap-2.5 mb-9" style={{ '--i': 5 }}>
                {['Vue 3', 'TypeScript', 'Laravel', 'REST APIs', 'MySQL', 'Phaser', 'RAG / AI'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-slate-200 backdrop-blur"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="hero-stagger flex flex-col sm:flex-row flex-wrap gap-3" style={{ '--i': 6 }}>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="press group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-semibold hover:bg-cyan-100 transition-all hover:-translate-y-0.5 shadow-xl shadow-black/10"
                >
                  View Experience
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative" ref={cvMenuRef}>
                  <button
                    type="button"
                    onClick={(event) => {
                      const spaceBelow = window.innerHeight - event.currentTarget.getBoundingClientRect().bottom;
                      setCvMenuOpensUp(spaceBelow < 190);
                      setIsCvMenuOpen((value) => !value);
                    }}
                    aria-expanded={isCvMenuOpen}
                    aria-haspopup="true"
                    className="press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-300/25 text-cyan-100 px-6 py-3.5 font-semibold hover:bg-cyan-400/15 transition-all hover:-translate-y-0.5"
                  >
                    <Download size={18} />
                    Download CV
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isCvMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`cv-menu absolute left-0 z-[70] w-full ${
                      cvMenuOpensUp ? 'bottom-full mb-2 opens-up' : 'top-full mt-2'
                    } min-w-[260px] rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 ${
                      isCvMenuOpen ? 'is-open' : ''
                    }`}
                    inert={!isCvMenuOpen}
                  >
                      <a
                        href={cvFiles.en}
                        download="alvaro_millan_fullstack_en.pdf"
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span>
                          <span className="block font-semibold text-white">English CV</span>
                          <span className="block text-xs text-slate-400">Professional · PDF</span>
                        </span>
                        <FileText size={18} className="text-cyan-300" />
                      </a>
                      <a
                        href={cvFiles.es}
                        download="alvaro_millan_fullstack_es.pdf"
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span>
                          <span className="block font-semibold text-white">CV en español</span>
                          <span className="block text-xs text-slate-400">Profesional · PDF</span>
                        </span>
                        <FileText size={18} className="text-violet-300" />
                      </a>
                  </div>
                </div>

                <a
                  href="https://github.com/AlvaroMillanEstevez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>

            <div className="hero-portrait relative z-10 max-w-md mx-auto lg:max-w-none w-full">
              <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/10 to-violet-500/30 blur-2xl scale-95" />
              <div
                className="premium-card hero-portrait-card relative rounded-[2.25rem] border border-white/15 bg-white/[0.06] backdrop-blur-xl p-4 shadow-2xl transition-transform duration-200"
                onMouseMove={handleCardPointerMove}
              >
                <div className="rounded-[1.75rem] overflow-hidden bg-slate-900 aspect-[4/5]">
                  <img
                    src="/assets/AlvaroMillanEstevez2.jpg"
                    alt="Álvaro Millán Estevez"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-4">
                    <div className="text-2xl font-black text-white">200+</div>
                    <div className="text-xs text-slate-400 mt-1">issues investigated / resolved</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-4">
                    <div className="text-2xl font-black text-white">Full-Stack</div>
                    <div className="text-xs text-slate-400 mt-1">development + technical QA</div>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/10 bg-slate-900/55 p-4 flex items-center gap-3">
                  <Globe2 size={19} className="text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-white">Mijas (Málaga), Spain</div>
                    <div className="text-xs text-slate-400">Remote · Spain / EU opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-500 text-xs">
          <span>Explore</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      <section id="about" className="scroll-mt-32 lg:scroll-mt-20 relative py-24 sm:py-28 bg-white text-slate-900 overflow-hidden max-w-full">
        <div className="absolute inset-0 subtle-grid pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="reveal grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="section-kicker">About</p>
              <h2 className="section-title text-slate-900">
                Engineering with a
                <span className="block text-blue-700">business perspective.</span>
              </h2>
            </div>

            <div>
              <p className="text-xl text-slate-700 leading-relaxed mb-5">
                I am a Full-Stack Developer and Software Engineer focused on building, debugging and
                improving web applications, APIs and business-oriented software.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                My background combines software development with technical QA, business management
                and practical product thinking. I enjoy understanding why a workflow exists, where
                friction appears and how technology can turn that problem into a maintainable,
                useful solution.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                I work with AI-assisted and agentic development every day while owning the design,
                code review, testing and delivery — most recently shipping Nusa: Warung Sort, a web
                puzzle game I built and published as a solo developer.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {strengths.map((strength, index) => (
                  <div
                    key={strength.title}
                    className="reveal premium-card group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300"
                    onMouseMove={handleCardPointerMove}
                    style={{ '--reveal-delay': `${index * 80}ms` }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#020617] text-cyan-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <strength.icon size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{strength.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{strength.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-32 lg:scroll-mt-20 py-24 sm:py-28 bg-[#020617] relative overflow-hidden">
        <div className="absolute -left-40 top-28 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="reveal max-w-3xl mb-14">
            <p className="section-kicker text-cyan-300">Experience</p>
            <h2 className="section-title text-white">Real product work, not just demo projects.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mt-5">
              Development, integration, technical QA and problem-solving across real business
              workflows and existing software products.
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            <div className="absolute left-[21px] sm:left-[27px] top-4 bottom-4 w-px bg-white/[0.06]" />
            <div className="timeline-line absolute left-[21px] sm:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500/40" />

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="reveal relative pl-14 sm:pl-20"
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >
                  <div className="timeline-dot absolute left-0 top-5 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-white/10 text-cyan-300 flex items-center justify-center shadow-xl">
                    <experience.icon size={21} />
                  </div>

                  <div
                    className="premium-card group rounded-3xl border border-white/10 bg-white/[0.045] hover:bg-white/[0.065] p-6 sm:p-8 transition-all duration-300 hover:border-cyan-300/20"
                    onMouseMove={handleCardPointerMove}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{experience.role}</h3>
                        <p className="text-cyan-300 font-medium mt-1">{experience.company}</p>
                        <p className="text-sm text-slate-500 mt-1">{experience.meta}</p>
                      </div>
                      <span className="text-sm text-slate-400 lg:text-right whitespace-nowrap">
                        {experience.period}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-5">{experience.description}</p>

                    <ul className="grid gap-2.5 mb-6">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                          <CheckCircle size={17} className="text-emerald-400 mt-1 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {experience.tech.map((tech, techIndex) => (
                        <span
                          key={tech}
                          style={{ '--i': techIndex }}
                          className="chip rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-32 lg:scroll-mt-20 py-24 sm:py-28 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="section-kicker">Technical profile</p>
              <h2 className="section-title text-slate-900">Core stack & engineering capabilities.</h2>
            </div>
            <p className="text-slate-600 max-w-xl leading-relaxed">
              Strongest around Vue/TypeScript + Laravel/PHP, with API integration, data-driven
              workflows, debugging, QA, applied AI and browser game development as complementary
              strengths.
            </p>
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {coreSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="reveal premium-card group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300"
                onMouseMove={handleCardPointerMove}
                style={{ '--reveal-delay': `${index * 55}ms` }}
              >
                <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-slate-50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <div className="font-semibold text-sm">{skill.name}</div>
              </div>
            ))}
          </div>

          <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {capabilityGroups.map((group, index) => (
              <div
                key={group.title}
                className="reveal premium-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300"
                onMouseMove={handleCardPointerMove}
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#020617] text-cyan-300 flex items-center justify-center mb-5">
                  <group.icon size={21} />
                </div>
                <h3 className="font-bold text-lg mb-4">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIndex) => (
                    <span
                      key={item}
                      style={{ '--i': itemIndex }}
                      className="chip px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-6 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Wrench size={21} className="text-slate-500 shrink-0" />
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Additional working knowledge:</strong> AWS
              fundamentals, Kubernetes fundamentals and CI/CD concepts. I treat these as areas of
              familiarity rather than production-level expertise.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-32 lg:scroll-mt-20 py-24 sm:py-28 bg-white text-slate-900 relative overflow-hidden max-w-full">
        <div className="absolute right-0 top-0 w-[36rem] h-[36rem] bg-cyan-100/60 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="reveal max-w-3xl mb-14">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title text-slate-900">Projects that show how I build.</h2>
            <p className="text-slate-600 text-lg leading-relaxed mt-5">
              Two browser games, an open-source AI product and full-stack work — each one owned end
              to end, from idea and architecture to testing and delivery.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`reveal premium-card project-card group rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-sm transition-[box-shadow,transform] duration-500 ${
                  project.featured ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.2fr_1fr]' : 'flex flex-col'
                }`}
                onMouseMove={handleCardPointerMove}
                style={{ '--reveal-delay': `${project.featured ? 0 : ((index - 1) % 2) * 120}ms` }}
              >
                <div className={project.featured ? 'lg:flex lg:flex-col lg:pb-7' : ''}>
                <div
                  className={`project-media relative overflow-hidden bg-[#020617] ${
                    project.featured ? 'h-72 sm:h-96 lg:h-auto lg:flex-1 lg:min-h-[24rem]' : 'h-64 sm:h-72'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-cover w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${project.statusClass}`}>
                      {project.status}
                    </span>
                  </div>

                  {project.video && (
                    <button
                      type="button"
                      onClick={() => setSelectedVideoProject(project)}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-2xl opacity-100 scale-100 group-hover:scale-110 group-hover:bg-cyan-100 transition-all duration-300 ring-1 ring-black/5"
                      aria-label={`Watch ${project.title} demo`}
                    >
                      <Play size={24} fill="currentColor" />
                    </button>
                  )}

                </div>

                {project.screenshots && (
                  <div className="grid grid-cols-4 gap-2 px-6 sm:px-7 pt-5">
                    {project.screenshots.map((screenshot, screenshotIndex) => (
                      <button
                        key={screenshot.src}
                        type="button"
                        onClick={() => setSelectedGallery({ project, index: screenshotIndex })}
                        style={{ '--i': screenshotIndex }}
                        className="chip aspect-video rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label={`Open screenshot: ${screenshot.caption}`}
                      >
                        <img
                          src={screenshot.src}
                          alt={screenshot.caption}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                </div>

                <div className={`p-6 sm:p-7 ${project.featured ? 'lg:py-10 lg:pr-10' : 'flex flex-col flex-1'}`}>
                  <div className="mb-4">
                    <h3 className={`${project.featured ? 'text-2xl sm:text-3xl' : 'text-xl'} font-black text-slate-900`}>
                      {project.title}
                    </h3>
                    <p className="text-blue-700 font-semibold text-sm mt-1.5">{project.subtitle}</p>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-5">{project.description}</p>

                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm text-slate-700 flex items-start gap-2.5">
                        <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={tech}
                        style={{ '--i': techIndex }}
                        className="chip bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideoProject(project)}
                        className="press inline-flex items-center gap-2 bg-[#020617] hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl transition-all font-semibold text-sm"
                      >
                        <Play size={14} />
                        Video Demo
                      </button>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2.5 px-4 rounded-xl transition-all font-semibold text-sm"
                      >
                        <Gamepad2 size={14} />
                        {project.demoLabel || 'Live Demo'}
                      </a>
                    )}

                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 py-2.5 px-4 rounded-xl transition-all font-semibold text-sm"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}

                    {!project.code && (
                      <span className="inline-flex items-center gap-2 text-sm text-slate-500 px-1">
                        <ShieldCheck size={14} />
                        Private product
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedGallery && (
        <div
          className="modal-backdrop fixed inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center z-[10001] p-4"
          onClick={() => setSelectedGallery(null)}
          data-lenis-prevent
        >
          <div
            className="modal-panel bg-slate-900 border border-white/10 rounded-[2rem] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300 mb-1">
                  Screenshot {selectedGallery.index + 1} / {selectedGallery.project.screenshots.length}
                </p>
                <h3 className="text-lg font-bold text-white">{selectedGallery.project.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGallery(null)}
                className="text-slate-400 hover:text-white w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center"
                aria-label="Close screenshot viewer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative p-4 sm:p-5">
              <img
                key={selectedGallery.index}
                src={selectedGallery.project.screenshots[selectedGallery.index].src}
                alt={selectedGallery.project.screenshots[selectedGallery.index].caption}
                className="gallery-image w-full h-auto max-h-[68vh] object-contain rounded-2xl bg-black"
              />

              {[
                { step: -1, icon: ChevronLeft, label: 'Previous screenshot', position: 'left-6 sm:left-8' },
                { step: 1, icon: ChevronRight, label: 'Next screenshot', position: 'right-6 sm:right-8' }
              ].map((control) => (
                <button
                  key={control.label}
                  type="button"
                  onClick={() =>
                    setSelectedGallery((gallery) => {
                      const total = gallery.project.screenshots.length;
                      return { ...gallery, index: (gallery.index + control.step + total) % total };
                    })
                  }
                  className={`absolute top-1/2 -translate-y-1/2 ${control.position} w-11 h-11 rounded-full bg-white/90 text-slate-900 hover:bg-cyan-100 flex items-center justify-center shadow-xl transition-colors`}
                  aria-label={control.label}
                >
                  <control.icon size={22} />
                </button>
              ))}
            </div>

            <div className="p-5 border-t border-white/10 bg-white/[0.03] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-slate-300">
                {selectedGallery.project.screenshots[selectedGallery.index].caption}
              </p>

              {selectedGallery.project.demo && (
                <a
                  href={selectedGallery.project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <ExternalLink size={16} />
                  {selectedGallery.project.demoLabel || 'Live Demo'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedVideoProject && (
        <div
          className="modal-backdrop fixed inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center z-[10001] p-4"
          onClick={() => setSelectedVideoProject(null)}
          data-lenis-prevent
        >
          <div
            className="modal-panel bg-slate-900 border border-white/10 rounded-[2rem] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300 mb-1">Project demo</p>
                <h3 className="text-lg font-bold text-white">{selectedVideoProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideoProject(null)}
                className="text-slate-400 hover:text-white w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center"
                aria-label="Close video modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[68vh] rounded-2xl bg-black"
                poster={selectedVideoProject.image}
              >
                <source src={selectedVideoProject.video} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>

            <div className="p-5 border-t border-white/10 bg-white/[0.03] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-slate-300 max-w-3xl">{selectedVideoProject.description}</p>

              {selectedVideoProject.code && (
                <a
                  href={selectedVideoProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <Github size={16} />
                  View repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <section id="contact" className="scroll-mt-32 lg:scroll-mt-20 py-24 sm:py-28 bg-[#020617] relative overflow-hidden">
        <div className="absolute -right-40 bottom-0 w-[32rem] h-[32rem] bg-violet-600/10 rounded-full blur-[130px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="reveal grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="section-kicker text-cyan-300">Contact</p>
              <h2 className="section-title text-white">Let’s talk about the next product challenge.</h2>
              <p className="text-slate-400 mt-5 leading-relaxed">
                I am currently looking for full-time Software Engineer / Full-Stack opportunities,
                especially in remote or international teams. I am also open to selected technical
                collaborations.
              </p>

              <div className="space-y-3 mt-8">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="press w-full text-left flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] text-cyan-300 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-sm text-slate-200" aria-live="polite">
                      {isEmailCopied ? 'Copied to clipboard' : 'Copy email address'}
                    </div>
                  </div>
                  {isEmailCopied ? (
                    <Check size={18} className="text-emerald-400 shrink-0" />
                  ) : (
                    <Copy size={18} className="text-slate-400 shrink-0" />
                  )}
                </button>

                {[
                  {
                    icon: Linkedin,
                    title: 'LinkedIn',
                    info: 'linkedin.com/in/alvaro-millan-estevez-27b814375',
                    href: 'https://www.linkedin.com/in/alvaro-millan-estevez-27b814375'
                  },
                  { icon: MapPin, title: 'Location', info: 'Mijas (Málaga), Spain · Remote', href: null }
                ].map((contact) => (
                  <a
                    key={contact.title}
                    href={contact.href || undefined}
                    target={contact.href?.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 ${
                      contact.href ? 'hover:bg-white/[0.07] hover:border-white/20 transition-all' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] text-cyan-300 flex items-center justify-center shrink-0">
                      <contact.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500">{contact.title}</div>
                      <div className="text-sm text-slate-200 break-all">{contact.info}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 sm:p-8 relative shadow-2xl"
              onMouseMove={handleCardPointerMove}
            >
              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-400/20 text-emerald-200'
                      : 'bg-red-500/10 border border-red-400/20 text-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message sent successfully. I’ll get back to you soon.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      <span>Please check the fields and try again.</span>
                    </>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', type: 'text', placeholder: 'Your name *' },
                  { name: 'email', type: 'email', placeholder: 'Your email *' },
                  { name: 'subject', type: 'text', placeholder: 'Subject *' }
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full p-4 bg-slate-900/55 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5 transition-all"
                  />
                ))}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message *"
                  rows={6}
                  required
                  className="w-full p-4 bg-slate-900/55 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5 transition-all resize-y"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                      : 'bg-white hover:bg-cyan-100 text-slate-900 hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Álvaro Millán Estevez</p>
            <p className="text-slate-500 text-sm mt-1">
              Software engineering · product thinking · practical problem-solving
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/AlvaroMillanEstevez"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/alvaro-millan-estevez-27b814375"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Copy email address"
              title={isEmailCopied ? 'Copied' : 'Copy email address'}
            >
              {isEmailCopied ? <Check size={18} className="text-emerald-400" /> : <Mail size={18} />}
            </button>
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
          --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #020617;
          color: #e2e8f0;
        }

        .portfolio-fixed-header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
          height: 64px;
          z-index: 9999 !important;
          margin: 0 !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          translate: none !important;
          background: rgba(2, 6, 23, 0.96);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 34px rgba(2, 6, 23, 0.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          backface-visibility: visible !important;
          -webkit-backface-visibility: visible !important;
          contain: none !important;
        }

        .mobile-primary-nav {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          padding: 1px 0;
          white-space: nowrap;
        }

        .mobile-nav-button {
          min-height: 32px;
          white-space: nowrap;
          flex: 0 1 auto;
          max-width: max-content;
        }

        .brand-logo {
          width: auto;
          min-width: 0;
          max-width: none;
          overflow: visible;
        }

        .brand-logo > span:first-child {
          flex: 0 0 auto;
        }

        @media (max-width: 767px) {
          .portfolio-fixed-header {
            height: 60px;
          }

          .brand-logo {
            width: 38px;
            min-width: 38px;
            max-width: 38px;
            margin-right: 2px;
          }

          .brand-logo > span:first-child {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }

          .mobile-nav-button {
            min-height: 30px;
          }
        }

        @media (max-width: 350px) {
          .mobile-nav-button {
            font-size: 8.5px;
            padding-left: 4px;
            padding-right: 4px;
          }

          .brand-logo {
            width: 34px;
            min-width: 34px;
            max-width: 34px;
          }

          .brand-logo > span:first-child {
            width: 32px;
            height: 32px;
          }
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
        }

        .subtle-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.025) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #67e8f9 0%, #60a5fa 48%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .section-kicker {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.75rem;
          line-height: 1rem;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 0.9rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.75rem);
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 900;
        }

        /* Progress bar and hero parallax read the CSS variables written on scroll. */
        .scroll-progress-bar {
          transform: scaleX(var(--scroll-progress, 0));
          transform-origin: left center;
          will-change: transform;
        }

        .nav-indicator {
          transition:
            transform 520ms var(--ease-out-expo),
            width 520ms var(--ease-out-expo);
        }

        .hero-parallax-slow {
          translate: 0 calc(var(--hero-progress, 0) * 140px);
        }

        .hero-parallax-fast {
          translate: 0 calc(var(--hero-progress, 0) * -90px);
        }

        .hero-portrait {
          animation: heroPortraitIn 1400ms var(--ease-out-expo) 380ms backwards;
        }

        @media (min-width: 1024px) {
          .hero-copy {
            translate: 0 calc(var(--hero-progress, 0) * 70px);
            opacity: calc(1 - var(--hero-progress, 0) * 0.85);
          }

          .hero-portrait {
            translate: 0 calc(var(--hero-progress, 0) * -50px);
          }
        }

        .hero-stagger {
          animation: heroIn 1100ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--i, 0) * 90ms + 120ms);
        }

        .line-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .line-inner {
          display: block;
          animation: lineUp 1200ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--i, 0) * 110ms + 260ms);
        }

        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(8px);
          }
        }

        @keyframes lineUp {
          from {
            transform: translateY(105%) rotate(2deg);
          }
        }

        @keyframes heroPortraitIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.94);
            filter: blur(12px);
          }
        }

        /*
         * Scroll reveals use animations with backwards fill instead of transitions:
         * the stagger delay only applies to the entrance, never to later hover transitions.
         */
        .reveal:not(.is-visible) {
          opacity: 0;
        }

        .reveal.is-visible {
          animation: revealIn 1000ms var(--ease-out-expo) backwards;
          animation-delay: var(--reveal-delay, 0ms);
        }

        @keyframes revealIn {
          from {
            opacity: 0;
            transform: translateY(36px) scale(0.985);
            filter: blur(6px);
          }
        }

        .reveal.is-visible .section-title {
          animation: titleWipe 1200ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--reveal-delay, 0ms) + 90ms);
        }

        @keyframes titleWipe {
          from {
            clip-path: inset(0 0 100% 0);
            transform: translateY(0.4em);
          }
          to {
            clip-path: inset(-20% -5% -20% -5%);
            transform: none;
          }
        }

        .reveal.is-visible .section-kicker {
          animation: kickerIn 900ms var(--ease-out-expo) backwards;
          animation-delay: var(--reveal-delay, 0ms);
        }

        @keyframes kickerIn {
          from {
            opacity: 0;
            letter-spacing: 0.5em;
          }
        }

        .reveal:not(.is-visible) .chip {
          opacity: 0;
        }

        .reveal.is-visible .chip {
          animation: chipIn 700ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--reveal-delay, 0ms) + 260ms + var(--i, 0) * 40ms);
        }

        @keyframes chipIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.94);
          }
        }

        .reveal.is-visible .project-media {
          animation: mediaReveal 1300ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--reveal-delay, 0ms) + 100ms);
        }

        .reveal.is-visible .project-cover {
          animation: coverZoom 1800ms var(--ease-out-expo) backwards;
          animation-delay: calc(var(--reveal-delay, 0ms) + 100ms);
        }

        @keyframes mediaReveal {
          from {
            clip-path: inset(10% 7% 10% 7% round 28px);
          }
          to {
            clip-path: inset(0 0 0 0 round 0);
          }
        }

        @keyframes coverZoom {
          from {
            scale: 1.18;
          }
        }

        .timeline-line {
          transform: scaleY(var(--timeline-progress, 0));
          transform-origin: top center;
          will-change: transform;
          box-shadow: 0 0 18px rgba(34, 211, 238, 0.45);
        }

        .reveal.is-visible .timeline-dot {
          animation: dotPop 800ms var(--ease-spring) backwards;
          animation-delay: calc(var(--reveal-delay, 0ms) + 120ms);
        }

        @keyframes dotPop {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-12deg);
          }
        }

        /* Press feedback: quick, subtle and only on press. */
        .press:active {
          scale: 0.97;
        }

        .press {
          transition-property: color, background-color, border-color, box-shadow, transform, scale;
        }

        .cv-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px) scale(0.96);
          transform-origin: top center;
          transition:
            opacity 160ms ease-out,
            transform 160ms ease-out,
            visibility 0s linear 160ms;
        }

        .cv-menu.opens-up {
          transform: translateY(6px) scale(0.96);
          transform-origin: bottom center;
        }

        .cv-menu.is-open {
          opacity: 1;
          visibility: visible;
          transform: none;
          transition:
            opacity 220ms var(--ease-out-quart),
            transform 260ms var(--ease-out-expo),
            visibility 0s;
        }

        .modal-backdrop {
          animation: backdropIn 280ms ease-out both;
        }

        .modal-panel {
          animation: panelIn 520ms var(--ease-out-expo) both;
        }

        .gallery-image {
          animation: galleryIn 420ms var(--ease-out-expo) both;
        }

        @keyframes backdropIn {
          from {
            opacity: 0;
          }
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
            filter: blur(6px);
          }
        }

        @keyframes galleryIn {
          from {
            opacity: 0;
            transform: scale(0.985);
          }
        }

        .brand-logo > span:first-child {
          transition:
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms ease,
            border-color 420ms ease;
        }

        .brand-logo:hover > span:first-child {
          transform: translateY(-1px) rotate(-4deg) scale(1.06);
          border-color: rgba(103, 232, 249, 0.35);
          box-shadow: 0 12px 30px rgba(34, 211, 238, 0.16);
        }

        .brand-logo img {
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .brand-logo:hover img {
          transform: scale(1.06);
        }

        .premium-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative;
          isolation: isolate;
          transform-style: preserve-3d;
        }

        .premium-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background:
            radial-gradient(
              420px circle at var(--mouse-x) var(--mouse-y),
              rgba(34, 211, 238, 0.11),
              rgba(96, 165, 250, 0.045) 28%,
              transparent 62%
            );
          opacity: 0;
          transition: opacity 350ms ease;
          z-index: 4;
        }

        .hero-portrait-card::after {
          background:
            radial-gradient(
              360px circle at var(--mouse-x) var(--mouse-y),
              rgba(103, 232, 249, 0.15),
              rgba(139, 92, 246, 0.055) 32%,
              transparent 64%
            );
        }

        .project-card {
          will-change: transform, box-shadow;
        }

        @media (hover: hover) and (pointer: fine) {
          .premium-card:hover::after {
            opacity: 1;
          }

          .project-card:hover {
            transform: translateY(-8px) scale(1.006);
            box-shadow:
              0 28px 70px rgba(15, 23, 42, 0.14),
              0 0 0 1px rgba(59, 130, 246, 0.05);
          }

          .premium-card:not(.project-card):hover {
            transform: translateY(-4px);
          }
        }

        @keyframes orbitSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(55px, 35px, 0) scale(1.08);
          }
        }

        @keyframes orbitReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-45px, 25px, 0) scale(1.06);
          }
        }

        .animate-orbit-slow {
          animation: orbitSlow 14s ease-in-out infinite;
        }

        .animate-orbit-reverse {
          animation: orbitReverse 17s ease-in-out infinite;
        }

        @keyframes softFloat {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -6px;
          }
        }

        .hero-portrait-card {
          animation: softFloat 7s ease-in-out infinite;
        }

        .project-card .project-cover {
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 500ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .project-card:hover .project-cover {
            transform: scale(1.055);
            filter: saturate(1.04) contrast(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .reveal:not(.is-visible),
          .reveal:not(.is-visible) .chip {
            opacity: 1;
          }

          .hero-portrait-card {
            animation: none;
          }

          .hero-copy,
          .hero-portrait,
          .hero-parallax-slow,
          .hero-parallax-fast {
            translate: none;
            opacity: 1;
          }

          .timeline-line {
            transform: none;
          }

          .premium-card,
          .project-card {
            transform: none !important;
          }

        }
      `}</style>
    </div>
  );
};

export default App;
