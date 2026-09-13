import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Code2,
  Database,
  Download,
  FileText,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
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

const App = () => {
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const [selectedVideoProject, setSelectedVideoProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };

  const cvFiles = {
    en: '/assets/alvaro_millan_fullstack_en_photo.docx',
    es: '/assets/alvaro_millan_fullstack_es_photo.docx'
  };

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setScrollOffset(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setIsCvMenuOpen(false);
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

      window.location.href = `mailto:alvaromye@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
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
      period: '2025 — Present',
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
      items: ['Technical QA', 'Regression testing', 'API validation', 'Root-cause debugging', 'End-to-end flows']
    },
    {
      icon: Bot,
      title: 'Applied AI',
      items: ['OpenAI API', 'Claude API', 'RAG', 'LLM workflows', 'Dynamic prompts', 'AI-assisted automation']
    },
    {
      icon: Terminal,
      title: 'Engineering Workflow',
      items: ['Git / GitHub', 'Docker Compose', 'Linux', 'Vite', 'NPM', 'Composer']
    }
  ];

  const projects = [
    {
      title: 'Nusa Creator Studio',
      subtitle: 'AI-powered SaaS for social-commerce content workflows.',
      status: 'In development',
      statusClass: 'bg-amber-400/90 text-slate-900',
      description:
        'Independent full-stack SaaS product built around AI-assisted content generation, structured workflows and subscription-style product rules.',
      highlights: [
        'Laravel REST API + Vue 3 / TypeScript frontend',
        'Projects, generation history, credits and plan-based feature gating',
        'Decoupled AI providers and dynamic prompts',
        'API/frontend tests including ownership, credit rules and multilingual inputs'
      ],
      tech: ['Vue 3', 'TypeScript', 'Laravel', 'Pinia', 'Tailwind CSS', 'REST APIs', 'AI'],
      code: null,
      image: 'assets/demoNusaCreatorStudio.png',
      video: 'assets/videos/videoDemoNusaCreatorStudio.mp4'
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
      <div
        className="fixed top-0 left-0 z-[70] h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

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
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1 backdrop-blur-xl">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-white bg-white/10 shadow-inner shadow-white/5'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.07]'
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
        className="relative z-10 min-h-screen flex items-center overflow-x-hidden overflow-y-visible pt-24 lg:pt-24 pb-20"
      >
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -left-28 w-[34rem] h-[34rem] rounded-full bg-cyan-500/20 blur-[120px] animate-orbit-slow pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full bg-violet-600/20 blur-[140px] animate-orbit-reverse pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Open to full-time Software Engineering opportunities
              </div>

              <p className="text-cyan-300 uppercase tracking-[0.24em] text-xs sm:text-sm font-semibold mb-4">
                Full-Stack Developer · Software Engineer
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.3rem] font-black tracking-[-0.04em] leading-[0.96] text-white mb-7">
                Building software that
                <span className="block gradient-text">solves real problems.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
                I build and improve web products with Vue, TypeScript, Laravel and REST APIs —
                combining software development, technical QA, root-cause debugging and practical AI
                integration with a strong understanding of business needs.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-9">
                {['Vue 3', 'TypeScript', 'Laravel', 'REST APIs', 'MySQL', 'Docker', 'RAG / AI'].map(
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

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection('experience')}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-semibold hover:bg-cyan-100 transition-all hover:-translate-y-0.5 shadow-xl shadow-black/10"
                >
                  View Experience
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCvMenuOpen((value) => !value)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-300/25 text-cyan-100 px-6 py-3.5 font-semibold hover:bg-cyan-400/15 transition-all hover:-translate-y-0.5"
                  >
                    <Download size={18} />
                    Download CV
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isCvMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isCvMenuOpen && (
                    <div className="absolute z-[70] mt-2 w-full min-w-[240px] rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-2">
                      <a
                        href={cvFiles.en}
                        download="alvaro_millan_fullstack_en_photo.docx"
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span>
                          <span className="block font-semibold text-white">English CV</span>
                          <span className="block text-xs text-slate-400">Professional · DOCX</span>
                        </span>
                        <FileText size={18} className="text-cyan-300" />
                      </a>
                      <a
                        href={cvFiles.es}
                        download="alvaro_millan_fullstack_es_photo.docx"
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span>
                          <span className="block font-semibold text-white">CV en español</span>
                          <span className="block text-xs text-slate-400">Profesional · DOCX</span>
                        </span>
                        <FileText size={18} className="text-violet-300" />
                      </a>
                    </div>
                  )}
                </div>

                <a
                  href="https://github.com/AlvaroMillanEstevez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>

            <div className="reveal relative max-w-md mx-auto lg:max-w-none w-full">
              <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/10 to-violet-500/30 blur-2xl scale-95" />
              <div
                className="premium-card hero-portrait-card relative rounded-[2.25rem] border border-white/15 bg-white/[0.06] backdrop-blur-xl p-4 shadow-2xl transition-transform duration-200"
                onMouseMove={handleCardPointerMove}
                style={{ transform: `translate3d(0, ${Math.min(scrollOffset * 0.025, 18)}px, 0)` }}
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
                    <div className="text-sm font-semibold text-white">Spain / Indonesia</div>
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
              <p className="text-slate-600 leading-relaxed mb-8">
                My background combines software development with technical QA, business management
                and practical product thinking. I enjoy understanding why a workflow exists, where
                friction appears and how technology can turn that problem into a maintainable,
                useful solution.
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

          <div className="relative">
            <div className="absolute left-[21px] sm:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400/70 via-blue-500/40 to-transparent" />

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="reveal relative pl-14 sm:pl-20"
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >
                  <div className="absolute left-0 top-5 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-white/10 text-cyan-300 flex items-center justify-center shadow-xl">
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
                      {experience.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5 text-xs text-slate-300"
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
              workflows, debugging, QA and applied AI as complementary strengths.
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

          <div className="reveal grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
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
              A focused selection covering product architecture, full-stack development and applied
              AI — with Nusa Creator Studio first because it best represents my current direction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`reveal premium-card project-card group rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-500 ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
                onMouseMove={handleCardPointerMove}
                style={{ '--reveal-delay': `${index * 100}ms` }}
              >
                <div className={`${index === 0 ? 'h-72 sm:h-96' : 'h-64'} relative overflow-hidden bg-[#020617]`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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

                <div className="p-6 sm:p-7">
                  <div className="mb-4">
                    <h3 className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} font-black text-slate-900`}>
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
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideoProject(project)}
                        className="inline-flex items-center gap-2 bg-[#020617] hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl transition-all font-semibold text-sm"
                      >
                        <Play size={14} />
                        Video Demo
                      </button>
                    )}

                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 py-2.5 px-4 rounded-xl transition-all font-semibold text-sm"
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

      {selectedVideoProject && (
        <div
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center z-[80] p-4"
          onClick={() => setSelectedVideoProject(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-[2rem] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl"
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
                {[
                  { icon: Mail, title: 'Email', info: 'alvaromye@gmail.com', href: 'mailto:alvaromye@gmail.com' },
                  { icon: Phone, title: 'Phone / WhatsApp', info: '+34 610 017 065', href: 'tel:+34610017065' },
                  {
                    icon: Linkedin,
                    title: 'LinkedIn',
                    info: 'linkedin.com/in/alvaro-millan-estevez-27b814375',
                    href: 'https://www.linkedin.com/in/alvaro-millan-estevez-27b814375'
                  },
                  { icon: MapPin, title: 'Location', info: 'Indonesia / Spain · Remote', href: null }
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
            <a
              href="mailto:alvaromye@gmail.com"
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
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

        .reveal {
          opacity: 0;
          transform: translateY(28px) scale(0.992);
          filter: blur(3px);
          transition:
            opacity 760ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 760ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 760ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
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

        .project-card img {
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 500ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .project-card:hover img {
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

          .reveal {
            opacity: 1;
            transform: none;
            filter: none;
          }

          .hero-portrait-card {
            animation: none;
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
