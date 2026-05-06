import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  X,
  Play,
  Send,
  CheckCircle,
  AlertCircle,
  Code2,
  Bot,
  ShoppingCart,
  Server,
  Wrench,
  Rocket,
  Globe2,
  ShieldCheck
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState('technical');
  const [selectedVideoProject, setSelectedVideoProject] = useState(null);

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

  const cvPath = '/assets/CV_Alvaro_Millan_Estevez_Remote_FullStack_EN.pdf';

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
      const navbar = document.querySelector('.navbar');

      if (!navbar) return;

      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  };

  const closeVideoModal = () => {
    setSelectedVideoProject(null);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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

  const navigationItems = ['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'];

  const skills = [
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
      name: 'Vue.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
      name: 'Laravel',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    },
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },
    {
      name: 'GitHub',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    }
  ];

  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Web Applications',
      description:
        'Practical web apps, internal tools and CRUD platforms built with Laravel, Vue, React, PHP and MySQL.'
    },
    {
      icon: Server,
      title: 'Laravel APIs & Backend',
      description:
        'REST APIs, authentication flows, database structures, protected routes and backend logic.'
    },
    {
      icon: Bot,
      title: 'AI Integrations',
      description:
        'Chatbots, AI-powered content tools and workflow automations using modern AI APIs.'
    },
    {
      icon: ShoppingCart,
      title: 'Ecommerce Tools',
      description:
        'Admin dashboards, product pages, product data workflows and ecommerce-focused landing pages.'
    },
    {
      icon: Wrench,
      title: 'Bug Fixing & Improvements',
      description:
        'Frontend fixes, API connection issues, responsive improvements, form fixes and project cleanup.'
    },
    {
      icon: Rocket,
      title: 'Deployment Support',
      description:
        'Project setup, GitHub workflow, Docker Compose, VPS deployment and production preparation.'
    }
  ];

  const projects = [
    {
      title: 'RAG Chatbot Agent',
      subtitle: 'AI website assistant trained on custom documentation with source citations.',
      description:
        'A local RAG chatbot built with FastAPI, LlamaIndex, Ollama, Chroma and Vue. It can ingest documents, answer questions using a custom knowledge base and show the sources used for each response.',
      highlights: [
        'RAG document-based question answering',
        'Local LLM integration with Ollama',
        'Chroma vector database',
        'Source citations for generated answers'
      ],
      tech: ['FastAPI', 'LlamaIndex', 'Ollama', 'Chroma', 'Vue'],
      code: 'https://github.com/AlvaroMillanEstevez/rag-chatbot-agent',
      image: 'RAGChatbot.png',
      video: 'videos/RagChatbotPorfolio.mp4'
    },
    {
      title: 'E-commerce Admin Dashboard',
      subtitle: 'Full-stack admin panel for managing products, orders and users.',
      description:
        'Built with Vue 3, TypeScript and Laravel. Includes authenticated API access, responsive management screens and reusable frontend components.',
      highlights: [
        'JWT authentication',
        'Product, order and user management',
        'REST API integration',
        'Responsive dashboard UI'
      ],
      tech: ['Vue 3', 'TypeScript', 'Laravel', 'MySQL', 'JWT'],
      code: 'https://github.com/AlvaroMillanEstevez/VueShop-Admin',
      image: 'assets/EcommerceAdminPanel.png',
      video: 'assets/videos/videoDemoEcommerceAdminPanel.mp4'
    },
    {
      title: 'Task Management System',
      subtitle: 'Task management platform with users, roles and task workflows.',
      description:
        'A Vue + Laravel application focused on task organization, authentication, user roles and CRUD operations.',
      highlights: [
        'User authentication',
        'Task CRUD operations',
        'Role-based logic',
        'Docker/VPS deployment'
      ],
      tech: ['Vue 3', 'Laravel', 'MySQL', 'Tailwind CSS', 'Docker'],
      code: 'https://github.com/AlvaroMillanEstevez/Task-Management-System',
      image: 'assets/TaskManagerDashboard.png',
      video: 'assets/videos/videoDemoTaskManager.mp4'
    },
    {
      title: 'Event Review & Booking App',
      subtitle: 'Event discovery and booking platform using external API data.',
      description:
        'Laravel + React project integrating the Ticketmaster API to display events, manage bookings and support event reviews.',
      highlights: [
        'Ticketmaster API integration',
        'Booking flow',
        'Review system',
        'Database-driven features'
      ],
      tech: ['Laravel', 'React', 'MySQL', 'Ticketmaster API'],
      code: null,
      image: null,
      video: null
    }
  ];

  const aboutSections = [
    {
      id: 'technical',
      title: 'Technical Focus',
      icon: '💻',
      preview: 'Laravel, Vue, React, APIs, databases and practical business tools.',
      content:
        'I build full-stack web applications using Laravel, Vue.js, React, PHP and MySQL. I focus on clean interfaces, API-driven architecture, authentication, CRUD systems and practical tools that solve real business problems.'
    },
    {
      id: 'freelance',
      title: 'Freelance & Client Experience',
      icon: '🤝',
      preview: 'Experience delivering real projects and understanding client needs.',
      content:
        'I have delivered freelance and independent projects, including an internal management system for Asociación Respira and several full-stack applications. My previous professional background also helps me communicate clearly, understand business needs and work with responsibility.'
    },
    {
      id: 'remote',
      title: 'Remote Work & Direction',
      icon: '🌍',
      preview: 'Available for remote work, freelance projects and international collaboration.',
      content:
        'I am currently based between Indonesia and Spain, looking for remote opportunities, freelance collaborations and projects related to web development, ecommerce and AI-powered automation.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950">
      <nav className="navbar fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-blue-700"
            >
              Álvaro Millán
            </button>

            <div className="hidden md:flex space-x-7">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-700 transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-700"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 font-medium w-full text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden pt-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8 relative">
            <img
              src="/assets/AlvaroMillanEstevez2.jpg"
              alt="Álvaro Millán Estevez"
              className="w-44 h-44 sm:w-56 sm:h-56 mx-auto rounded-full border-4 border-white/30 object-cover shadow-2xl"
            />
          </div>

          <p className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-5">
            <Globe2 size={16} />
            Available for remote work and freelance projects worldwide
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fadeInUp">
            Álvaro Millán Estevez
          </h1>

          <p className="text-xl sm:text-2xl mb-4 opacity-95 animate-fadeInUp delay-200">
            Full-Stack Web Developer | Laravel · Vue · React · AI Integrations
          </p>

          <p className="text-base sm:text-lg mb-6 max-w-3xl mx-auto opacity-90 leading-relaxed animate-fadeInUp delay-300">
            I build responsive web applications, admin dashboards and API-driven platforms using
            Laravel, Vue.js, React and MySQL. I also create AI-powered tools and automations for
            businesses looking to save time and improve their workflows.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fadeInUp delay-400">
            {['Laravel', 'Vue 3', 'React', 'PHP', 'MySQL', 'REST APIs', 'AI Integrations'].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 animate-fadeInUp delay-400">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Mail size={18} />
              <span>alvaromye@gmail.com</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Phone size={18} />
              <span>+34 610 017 065</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <MapPin size={18} />
              <span>Indonesia / Spain</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-500">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ExternalLink size={20} />
              View Projects
            </button>

            <a
              href={cvPath}
              download="CV_Alvaro_Millan_Estevez_Remote_FullStack_EN.pdf"
              className="bg-white/15 hover:bg-white hover:text-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-white/30"
            >
              <Download size={20} />
              Download CV
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-white/50"
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-1/3 -right-8 w-32 h-32 bg-white/5 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float delay-2000"></div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-700 mx-auto mb-12"></div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-5">
              Web developer focused on practical digital products
            </h3>

            <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-10">
              I am a web application developer focused on building practical digital products with
              Laravel, Vue.js, React and MySQL. My background includes freelance work, independent
              full-stack projects and previous experience managing clients and projects in other
              industries.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aboutSections.map((section) => (
                <div
                  key={section.id}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-600 hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4 cursor-pointer flex justify-between items-center hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 w-full"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-semibold text-sm sm:text-base">{section.title}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {expandedSection !== section.id && (
                    <div className="p-4 bg-gray-50 text-gray-600 text-sm italic">
                      {section.preview}
                    </div>
                  )}

                  {expandedSection === section.id && (
                    <div className="p-4 bg-white animate-fadeInUp">
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Services
          </h2>
          <div className="w-16 h-1 bg-blue-700 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <service.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Looking for a practical web or AI solution?
              </h3>
              <p className="text-blue-100 leading-relaxed max-w-3xl">
                I can help with small business tools, ecommerce workflows, dashboards, API
                integrations, bug fixing and automation projects.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Send size={18} />
              Start a conversation
            </button>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Technical Skills</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center p-2">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <div className="font-semibold text-sm sm:text-base">{skill.name}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: ShieldCheck,
                title: 'Authentication',
                text: 'JWT flows, protected routes and role-aware interfaces.'
              },
              {
                icon: Server,
                title: 'API Integration',
                text: 'REST APIs, third-party data sources and frontend/backend communication.'
              },
              {
                icon: Bot,
                title: 'AI Workflows',
                text: 'AI-assisted tools, chatbots and business automation ideas.'
              }
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <item.icon className="text-blue-400 mb-4" size={28} />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Selected Projects
          </h2>
          <div className="w-16 h-1 bg-blue-700 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="h-48 relative overflow-hidden group">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />

                      {project.video && (
                        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setSelectedVideoProject(project)}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors transform hover:scale-105"
                          >
                            <Play size={20} />
                            <span>Watch Demo</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <Code2 size={46} className="mx-auto mb-3" />
                        <div className="font-semibold">Case Study Project</div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Live Project
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-blue-700 font-medium text-sm mb-3">{project.subtitle}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{project.description}</p>

                  <ul className="space-y-1 mb-5">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideoProject(project)}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm"
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
                        className="flex-1 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}

                    {!project.video && !project.code && (
                      <button
                        type="button"
                        onClick={() => scrollToSection('contact')}
                        className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        <Mail size={14} />
                        Ask for details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideoProject && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeVideoModal}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedVideoProject.title} - Demo
              </h3>
              <button
                type="button"
                onClick={closeVideoModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close video modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh] rounded-lg"
                poster={selectedVideoProject.image}
              >
                <source src={selectedVideoProject.video} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>

            <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Technologies:</strong> {selectedVideoProject.tech.join(', ')}
                </p>
                <p className="text-sm text-gray-700">{selectedVideoProject.description}</p>
              </div>

              {selectedVideoProject.code && (
                <a
                  href={selectedVideoProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center gap-1 px-4 py-2 border border-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <section id="contact" className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Contact</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Let's build something useful</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Do you have a web project, ecommerce idea, automation need or remote opportunity?
                I would be happy to hear from you.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', info: 'alvaromye@gmail.com' },
                  { icon: Phone, title: 'Phone / WhatsApp', info: '+34 610 017 065' },
                  {
                    icon: Linkedin,
                    title: 'LinkedIn',
                    info: 'linkedin.com/in/alvaro-millan-estevez-27b814375'
                  },
                  { icon: MapPin, title: 'Location', info: 'Indonesia / Spain - Remote available' }
                ].map((contact) => (
                  <div
                    key={contact.title}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center shrink-0">
                      <contact.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{contact.title}</h4>
                      <p className="text-gray-300 text-sm break-all">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                {[
                  { icon: Github, href: 'https://github.com/AlvaroMillanEstevez', label: 'GitHub' },
                  {
                    icon: Linkedin,
                    href: 'https://www.linkedin.com/in/alvaro-millan-estevez-27b814375',
                    label: 'LinkedIn'
                  },
                  { icon: Mail, href: 'mailto:alvaromye@gmail.com', label: 'Email' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={social.label}
                    className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 relative">
              {submitStatus && (
                <div
                  className={`absolute top-4 left-4 right-4 p-4 rounded-lg flex items-center gap-3 z-10 ${submitStatus === 'success'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message sent successfully. I'll get back to you soon.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      <span>Error sending message. Please check the fields and try again.</span>
                    </>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name *"
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email *"
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject *"
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message *"
                  rows={5}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200 resize-y"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-700 hover:bg-blue-800 transform hover:-translate-y-1'
                    } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Fields marked with * are required. If the form is not configured, your email app
                  will open automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2">&copy; 2026 Álvaro Millán Estevez. All rights reserved.</p>
          <p className="text-gray-400">Made with code, curiosity and practical problem-solving.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .delay-2000 {
          animation-delay: 2000ms;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default App;