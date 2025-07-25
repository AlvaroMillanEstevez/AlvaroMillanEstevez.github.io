// ===== EXPANDABLE PARAGRAPHS FUNCTIONALITY =====
function toggleParagraph(header) {
    const paragraph = header.parentElement;
    const content = paragraph.querySelector('.paragraph-content');
    const preview = paragraph.querySelector('.preview-text');
    
    // Toggle expanded class
    paragraph.classList.toggle('expanded');
    
    // Hide/show preview text
    if (paragraph.classList.contains('expanded')) {
        preview.style.display = 'none';
        content.classList.add('expanded');
    } else {
        preview.style.display = 'block';
        content.classList.remove('expanded');
    }
}

// Optional: Close other paragraphs when opening one (accordion style)
function toggleParagraphExclusive(header) {
    const allParagraphs = document.querySelectorAll('.expandable-paragraph');
    const currentParagraph = header.parentElement;
    
    allParagraphs.forEach(paragraph => {
        if (paragraph !== currentParagraph && paragraph.classList.contains('expanded')) {
            paragraph.classList.remove('expanded');
            paragraph.querySelector('.preview-text').style.display = 'block';
            paragraph.querySelector('.paragraph-content').classList.remove('expanded');
        }
    });
    
    toggleParagraph(header);
}

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR BACKGROUND CHANGE ON SCROLL =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== TYPEWRITER EFFECT FOR TITLE (OPTIONAL) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Activate typewriter effect on name (optional - uncomment if desired)
// window.addEventListener('load', function() {
//     const heroTitle = document.querySelector('.hero h1');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 100);
// });

// ===== ANIMATED SKILLS COUNTER =====
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// ===== PARTICLE EFFECT FOR HERO (OPTIONAL) =====
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    hero.appendChild(particlesContainer);
    hero.querySelector('.hero-content').style.position = 'relative';
    hero.querySelector('.hero-content').style.zIndex = '2';

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== EXPANDABLE PARAGRAPHS HOVER EFFECTS =====
function initExpandableParagraphs() {
    document.querySelectorAll('.expandable-paragraph').forEach(paragraph => {
        const header = paragraph.querySelector('.paragraph-header');
        
        header.addEventListener('mouseenter', function() {
            if (!paragraph.classList.contains('expanded')) {
                paragraph.style.transform = 'translateY(-2px)';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            paragraph.style.transform = 'translateY(0)';
        });
    });
}

// ===== ACTIVATE EFFECTS WHEN PAGE LOADS =====
window.addEventListener('load', function() {
    // Initialize expandable paragraphs hover effects
    initExpandableParagraphs();
    
    // Activate skills animation when scrolling to that section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Create particles (uncomment if desired)
    // createParticles();
});

// ===== HOVER EFFECTS FOR PROJECT CARDS =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== FORM VALIDATION AND SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you can add your form submission logic
            // For example, using Formspree, EmailJS, or your own backend
            
            // Temporary success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // You can replace the above with actual form submission code like:
            // submitToFormspree(formData);
            // or
            // submitToEmailJS(formData);
        });
    }
});

// ===== FORMSPREE SUBMISSION FUNCTION (OPTIONAL) =====
// Uncomment and modify this function if you're using Formspree
/*
function submitToFormspree(formData) {
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Oops! There was a problem submitting your form.');
        }
    })
    .catch(error => {
        alert('Oops! There was a problem submitting your form.');
    });
}
*/

// ===== EMAILJS SUBMISSION FUNCTION (OPTIONAL) =====
// Uncomment and modify this function if you're using EmailJS
/*
function submitToEmailJS(formData) {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    })
    .then(function(response) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    }, function(error) {
        alert('Oops! There was a problem submitting your form.');
    });
}
*/

// ===== LOADING EFFECT FOR IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});

// ===== MOBILE MENU TOGGLE (IF NEEDED FOR RESPONSIVE) =====
// You can add a mobile hamburger menu here if desired
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.color = '#4f46e5';
    
    // Add hamburger to navbar
    document.querySelector('.nav-container').appendChild(hamburger);
    
    // Toggle menu on mobile
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            navMenu.style.display = navMenu.classList.contains('mobile-active') ? 'flex' : 'none';
        } else {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu (uncomment if needed)
// createMobileMenu();

// ===== CONSOLE MESSAGE FOR RECRUITERS =====
console.log(`
🚀 Hello! I see you're curious about the code

If you're seeing this, you're probably a recruiter
or developer checking out my work.

I love meeting people like that! 
Don't hesitate to contact me: alvaromye@gmail.com

Made with ❤️ and vanilla JavaScript
`);

// ===== SCROLL TO TOP BUTTON (OPTIONAL) =====
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-to-top');
    
    // Styles for scroll button
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '30px';
    scrollButton.style.right = '30px';
    scrollButton.style.width = '50px';
    scrollButton.style.height = '50px';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.background = '#4f46e5';
    scrollButton.style.color = 'white';
    scrollButton.style.border = 'none';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.fontSize = '1.2rem';
    scrollButton.style.opacity = '0';
    scrollButton.style.visibility = 'hidden';
    scrollButton.style.transition = 'all 0.3s ease';
    scrollButton.style.zIndex = '1000';
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(79, 70, 229, 0.3)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
}

// Create scroll to top button (uncomment if desired)
// createScrollToTopButton();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedScrollHandler = debounce(function() {
    // Any scroll-heavy operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);