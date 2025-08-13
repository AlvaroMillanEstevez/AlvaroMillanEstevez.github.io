import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Menu, X, Play, Send, CheckCircle, AlertCircle } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedVideoProject, setSelectedVideoProject] = useState(null);
  
  // Contact form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // EmailJS configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_84vh1wt',
    TEMPLATE_ID: 'template_esnwq3k',
    PUBLIC_KEY: 'LjP58GRwq1uTxmjuJ'
  };

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init('LjP58GRwq1uTxmjuJ');
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array is fine since we're using the key directly

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideoProject(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      if (window.emailjs) {
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

        if (result.status === 200) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send email');
        }
      } else {
        throw new Error('EmailJS not loaded');
      }
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

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
      name: 'Vue.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
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
      name: 'GitHub',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    }
  ];

  const projects = [
    {
      title: "E-commerce Admin Panel",
      description: "Complete administrative dashboard for online store management. Features include order tracking, inventory management, customer analytics, and real-time stock control with comprehensive reporting.",
      tech: ["Vue.js", "TypeScript", "Laravel", "MySQL"],
      code: "https://github.com/AlvaroMillanEstevez/VueShop-Admin",
      image: "assets/EcommerceAdminPanel.png",
      video: "assets/videos/videoDemoEcommerceAdminPanel.mp4",
      status: "active"
    },
    {
      title: "Task Management System",
      description: "Advanced project management platform with real-time collaboration, task assignment, and progress tracking. Built for team productivity and workflow optimization.",
      tech: ["Vue.js", "JavaScript", "Laravel","MySQL", "Docker"],
      code: "https://github.com/AlvaroMillanEstevez/Task-Management-System",
      image: "assets/TaskManagerDashboard.png",
      video: "assets/videos/videoDemoTaskManager.mp4",
      status: "active"
    },
    {
      title: "Analytics Dashboard",
      description: "Business intelligence dashboard with interactive charts, data visualization, and automated reporting. Designed for data-driven decision making.",
      tech: ["JavaScript", "Laravel", "REST API"],
      demo: "#",
      code: "#",
      image: null,
      status: "coming-soon"
    }
  ];

  const aboutSections = [
    {
      id: 'education',
      title: 'Background & Education',
      icon: '🎓',
      preview: 'Click to learn about my educational foundation and early experience...',
      content: 'Completed a Higher Vocational Training degree in Web Application Development and gained practical experience working as a freelance developer. I\'ve created custom applications for various businesses, developing strong problem-solving skills and a deep understanding of client requirements and project delivery.'
    },
    {
      id: 'technical',
      title: 'Technical Expertise',
      icon: '💻',
      preview: 'Discover my full-stack development skills and preferred technologies...',
      content: 'I specialize in full-stack development using Laravel for backend, Vue.js for dynamic interfaces, and MySQL for database management. My toolkit includes PHP, JavaScript, HTML5, CSS3, Docker Compose, and Git. I focus on creating scalable solutions and enjoy transforming clean, efficient code into user-friendly applications.'
    },
    {
      id: 'goals',
      title: 'Career Goals & Vision',
      icon: '🚀',
      preview: 'Learn about my professional aspirations and ideal work environment...',
      content: 'I\'m seeking opportunities with forward-thinking companies that offer growth potential, financial stability, and remote work flexibility. My goal is to contribute to innovative projects that make a meaningful impact while continuously expanding my technical expertise in the evolving world of web development.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      {/* Navigation */}
      <nav className="navbar fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-blue-600">Alvaro Millan</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium w-full text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Profile Image */}
          <div className="mb-8 relative">
            <img
              src="/assets/AlvaroMillanEstevez2.jpg"
              alt="Alvaro Millan Estevez"
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full border-4 border-white/30 object-cover shadow-2xl"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fadeInUp">
            Alvaro Millan Estevez
          </h1>
          <p className="text-xl sm:text-2xl mb-6 opacity-95 animate-fadeInUp delay-200">
            Web Application Developer
          </p>
          <p className="text-base sm:text-lg mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed animate-fadeInUp delay-300">
            Motivated and adaptable professional with diverse experience across construction, hospitality,
            and technology sectors. Recently graduated with a Higher Degree in Web Application Development,
            bringing strong technical skills and international work experience.
          </p>

          {/* Quick Contact */}
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
              <span>Málaga, Spain</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-500">
            <a
              href="/assets/CV_Alvaro_Millan_Estevez_FullStack.pdf"
              download="CV_Alvaro_Millan_Estevez_FullStack.pdf"
              className="bg-white/20 hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-white/30"
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

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-1/3 -right-8 w-32 h-32 bg-white/5 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float delay-2000"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">About Me</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-12"></div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-8">
              Passionate Web Developer
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aboutSections.map((section) => (
                <div
                  key={section.id}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                >
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 cursor-pointer flex justify-between items-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-semibold text-sm sm:text-base">{section.title}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}
                    />
                  </div>

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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Technical Skills</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="text-center p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center p-2">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-semibold text-sm sm:text-base">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">My Projects</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Project Image */}
                <div className="h-48 relative overflow-hidden group">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      
                      {/* Video Overlay */}
                      {project.video && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => setSelectedVideoProject(project)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors transform hover:scale-105"
                          >
                            <Play size={20} />
                            <span>Watch Demo</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {project.status === 'coming-soon' ? (
                        <div className="text-center text-white">
                          <div className="text-4xl mb-2">🚧</div>
                          <div className="text-sm font-medium">Coming Soon</div>
                        </div>
                      ) : (
                        <div className="text-6xl text-white">💻</div>
                      )}
                    </div>
                  )}

                  {/* Status Badge */}
                  {project.status === 'active' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✨ Live
                    </div>
                  )}

                  {project.status === 'coming-soon' && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      🔜 Soon
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.status === 'active' ? (
                      <>
                        {/* Botón de Video Demo o Demo Link */}
                        {project.video ? (
                          <button
                            onClick={() => setSelectedVideoProject(project)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm"
                          >
                            <Play size={14} />
                            Video Demo
                          </button>
                        ) : project.demo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        ) : null}
                        
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
                        >
                          <Github size={14} />
                          Code
                        </a>
                      </>
                    ) : (
                      <div className="w-full text-center py-2 px-4 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium">
                        🚀 In Development
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideoProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedVideoProject.title} - Demo
              </h3>
              <button
                onClick={closeVideoModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Video Container */}
            <div className="p-4">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh]"
                poster={selectedVideoProject.image}
              >
                <source src={selectedVideoProject.video} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Technologies:</strong> {selectedVideoProject.tech.join(', ')}
                </p>
                <p className="text-sm text-gray-700">
                  {selectedVideoProject.description}
                </p>
              </div>
              <a
                href={selectedVideoProject.code}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Github size={16} />
                Ver en GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Contact</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Let's Talk!</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Do you have a project in mind? Want to collaborate?
                Don't hesitate to contact me. I'd be happy to hear from you.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', info: 'alvaromye@gmail.com' },
                  { icon: Phone, title: 'Phone', info: '+34 610 017 065' },
                  { icon: Linkedin, title: 'LinkedIn', info: 'linkedin.com/in/alvaro-millan-estevez-27b814375' },
                  { icon: MapPin, title: 'Location', info: 'Mijas, Málaga, Spain' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <contact.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{contact.title}</h4>
                      <p className="text-gray-300 text-sm">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {[
                  { icon: Github, href: 'https://github.com/AlvaroMillanEstevez' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/alvaro-millan-estevez-27b814375' },
                  { icon: Mail, href: 'mailto:alvaromye@gmail.com' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 relative">
              {/* Success/Error Messages */}
              {submitStatus && (
                <div className={`absolute top-4 left-4 right-4 p-4 rounded-lg flex items-center gap-3 z-10 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message sent successfully! I'll get back to you soon.</span>
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
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name *"
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email *"
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject *"
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message *"
                    rows={5}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-200 resize-vertical"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
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
                  Fields marked with * are required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2">&copy; 2025 Alvaro Millan Estevez. All rights reserved.</p>
          <p className="text-gray-400">Made with ❤️ and lots of code</p>
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
          0%, 100% {
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