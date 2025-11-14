// ==================== WHATSAPP CONFIGURATION ==================== 
const WHATSAPP_NUMBER = '557491130003'; // Número do WhatsApp (com código do país)
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site e gostaria de agendar uma visita ao Colégio Adventista de Juazeiro. Poderia me fornecer mais informações sobre a parceria com a Prefeitura?';

// ==================== SMOOTH SCROLL & NAVIGATION ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR STICKY EFFECT ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            hamburger.classList.remove('active');
        });
    });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation || 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .benefit-card, .teaching-card, .gallery-item, .info-card').forEach(el => {
    observer.observe(el);
});

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        // Simple validation
        if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        // Create WhatsApp message with form data
        const formMessage = `Olá!Vim pelos site e meu nome é ${name.value}. Meu email é ${email.value}. Mensagem: ${message.value}`;
        const encodedMessage = encodeURIComponent(formMessage);
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappLink, '_blank');
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== CTA BUTTONS CLICK HANDLERS - WHATSAPP INTEGRATION ==================== 
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const text = this.textContent.toLowerCase();
        
        if (text.includes('agendar') || text.includes('visita')) {
            // Redirect to WhatsApp with pre-filled message
            e.preventDefault();
            const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            window.open(whatsappLink, '_blank');
        } else if (text.includes('saiba') || text.includes('mais')) {
            // Scroll to benefits section
            const benefitsSection = document.querySelector('#beneficios');
            if (benefitsSection) {
                benefitsSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (text.includes('coordenação')) {
            // Redirect to WhatsApp
            e.preventDefault();
            const encodedMessage = encodeURIComponent('Olá! vim pelo site e gostaria de falar com a coordenação do Colégio Adventista de Juazeiro.');
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            window.open(whatsappLink, '_blank');
        }
    });
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ==================== COUNTER ANIMATION ==================== 
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// ==================== SCROLL REVEAL ANIMATIONS ==================== 
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ==================== MOUSE FOLLOW EFFECT FOR CARDS ==================== 
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==================== RIPPLE EFFECT ON BUTTONS ==================== 
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
    });
});

// ==================== LAZY LOAD IMAGES ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== ACTIVE NAV LINK HIGHLIGHTING ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ==================== 
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== SCROLL TO TOP BUTTON ==================== 
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color) 0%, #003d99 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    font-weight: bold;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
        scrollToTopButton.style.alignItems = 'center';
        scrollToTopButton.style.justifyContent = 'center';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== TYPING ANIMATION ==================== 
const typeText = (element, text, speed = 50) => {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ==================== INITIALIZE ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Website loaded successfully!');
    
    // Trigger animations on page load
    document.querySelectorAll('.hero-text').forEach(el => {
        el.style.opacity = '1';
    });
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to hero
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'C' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        const contact = document.querySelector('#contato');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'W' to open WhatsApp
    if (e.key === 'w' || e.key === 'W') {
        const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    }
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for frequent events
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
