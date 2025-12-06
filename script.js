// DevBattleground: Trials of Merlin - Complete JavaScript with ₹250 Entry

// ==================== PARTICLE SYSTEM ====================
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }
    
    draw() {
        this.ctx.save();
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = `rgba(139, 92, 246, ${this.opacity})`;
        this.ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// ==================== NAVIGATION ====================
let mobileMenuOpen = false;

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        navMenu.classList.add('active');
        mobileToggle.classList.add('active');
        
        // Animate hamburger
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        
        // Reset hamburger
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOpen) {
                toggleMenu();
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
    // Set deadline to Dec 20, 2025 17:00 IST
    const deadline = new Date('December 16, 2025 17:00:00 GMT+0530').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = deadline - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==================== HOUSE SELECTION ====================
let selectedHouse = null;

function selectHouse(house) {
    selectedHouse = house;
    console.log(`Selected house: ${house}`);
    
    // Capitalize house name
    const houseName = house.charAt(0).toUpperCase() + house.slice(1);
    
    // Show notification
    showNotification(`⚡ ${houseName} Chosen!  Entry Fee: ₹250`);
    
    // Open registration after short delay
    setTimeout(() => {
        openRegistration();
    }, 1500);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)';
    notification.style.color = 'white';
    notification.style.padding = '20px 32px';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 10px 40px rgba(139, 92, 246, 0.6)';
    notification.style.zIndex = '9999';
    notification.style.fontWeight = '700';
    notification.style.fontSize = '16px';
    notification.style.animation = 'slideInRight 0.5s ease-out';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(notificationStyle);

// ==================== SEATS COUNTER ====================
function updateSeatsCounters() {
    const seatsElements = document.querySelectorAll('.seats-left');
    
    seatsElements.forEach(element => {
        const currentSeats = parseInt(element.getAttribute('data-seats'));
        element.textContent = currentSeats;
        
        // Change color based on availability
        if (currentSeats === 0) {
            element.style.color = '#EF4444'; // Red
            element.textContent = 'FULL';
            
            // Disable button
            const houseCard = element.closest('.house-card');
            const button = houseCard.querySelector('.btn-house');
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        } else if (currentSeats <= 1) {
            element.style.color = '#EF4444'; // Red
        } else if (currentSeats <= 2) {
            element.style.color = '#F59E0B'; // Orange
        } else {
            element.style.color = '#10B981'; // Green
        }
    });
}

// Simulate seat decrease (for demo purposes)
setInterval(() => {
    const seatsElements = document.querySelectorAll('.seats-left');
    const randomElement = seatsElements[Math.floor(Math.random() * seatsElements.length)];
    const currentSeats = parseInt(randomElement.getAttribute('data-seats'));
    
    if (currentSeats > 0 && Math.random() > 0.95) {
        randomElement.setAttribute('data-seats', currentSeats - 1);
        updateSeatsCounters();
        
        // Show notification
        const houseCard = randomElement.closest('.house-card');
        const houseName = houseCard.getAttribute('data-house');
        const capitalized = houseName.charAt(0).toUpperCase() + houseName.slice(1);
        showNotification(`🔥 ${capitalized}: Only ${currentSeats - 1} seats left!`);
    }
}, 30000); // Every 30 seconds

// ==================== FAQ ACCORDION ====================
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ==================== MODAL FUNCTIONS ====================
function openRegistration() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        selectedHouse = null; // Reset selection
    }
}

function redirectToForm() {
    // Replace with your actual Google Form URL
    let formURL = 'https://forms.gle/hxg9CByqCgtA5BUFA';
    
    
    
    window.open(formURL, '_blank');
    closeModal();
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==================== SMOOTH SCROLL ====================
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-box, .house-card, .step-card, .prize-tier, .value-card, .faq-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        observer.observe(el);
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < 800) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
}

// ==================== CURSOR TRAIL ====================
function initCursorTrail() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursorGlow = document.createElement('div');
    cursorGlow.style.position = 'fixed';
    cursorGlow.style.width = '500px';
    cursorGlow.style.height = '500px';
    cursorGlow.style.borderRadius = '50%';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)';
    cursorGlow.style.pointerEvents = 'none';
    cursorGlow.style.transition = 'transform 0.2s ease-out';
    cursorGlow.style.zIndex = '0';
    cursorGlow.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-nav, .btn-primary-large, .btn-house, .btn-cta-mega, .btn-modal');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== HOUSE CARD EFFECTS ====================
function initHouseEffects() {
    const houseCards = document.querySelectorAll('.house-card');
    
    houseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const house = this.getAttribute('data-house');
            createHouseParticles(this, house);
        });
    });
}

function createHouseParticles(element, house) {
    const colors = {
        'gryffindor': '#D3A625',
        'slytherin': '#5D5D5D',
        'ravenclaw': '#946B2D',
        'hufflepuff': '#ECB939'
    };
    
    const color = colors[house] || '#8B5CF6';
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.zIndex = '10';
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.style.transition = 'all 1s ease-out';
                particle.style.opacity = '0';
                particle.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * -50}px) scale(2)`;
            }, 50);
            
            setTimeout(() => particle.remove(), 1050);
        }, i * 100);
    }
}

// ==================== PRICE TAG ANIMATION ====================
function initPriceAnimation() {
    const priceTag = document.querySelector('.price-tag');
    if (!priceTag) return;
    
    // Add extra glow on scroll into view
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pricePulse 2s ease-in-out infinite, priceGlow 1s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    priceObserver.observe(priceTag);
}

// Add price glow animation
const priceGlowStyle = document.createElement('style');
priceGlowStyle.textContent = `
    @keyframes priceGlow {
        from {
            box-shadow: 0 10px 40px rgba(211, 166, 37, 0.4);
        }
        to {
            box-shadow: 0 10px 40px rgba(211, 166, 37, 0.4), 0 0 60px rgba(211, 166, 37, 0.6);
        }
    }
`;
document.head.appendChild(priceGlowStyle);

// ==================== PAGE LOAD ANIMATION ====================
function initPageLoad() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎮 DEVBATTLEGROUND: TRIALS OF MERLIN', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 10px 20px; border-radius: 8px;');
    console.log('%c⚔️ Entry Fee: ₹250 per team', 'font-size: 16px; color: #D3A625; font-weight: bold;');
    console.log('%c⚡ Initializing Battle Systems...', 'font-size: 14px; color: #8B5CF6;');
    
    // Initialize all systems
    new ParticleSystem();
    initCountdown();
    initScrollAnimations();
    initParallax();
    initCursorTrail();
    initButtonRipples();
    initHouseEffects();
    initPriceAnimation();
    updateSeatsCounters();
    
    console.log('%c✅ All Systems Operational', 'font-size: 14px; color: #10B981;');
    console.log('%c🏰 Welcome to the Arena!', 'font-size: 14px; color: #EC4899;');
    console.log('%c💰 20 Teams | ₹4,000 Prize Pool | ₹250 Entry', 'font-size: 14px; color: #F59E0B;');
});

// ==================== PERFORMANCE OPTIMIZATION ====================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const debouncedScroll = debounce(() => {
    // Scroll optimizations already handled
});

window.addEventListener('scroll', debouncedScroll);

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('⚠️ Error detected:', e.message);
});

// ==================== EASTER EGGS ====================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎮 CHEAT CODE: Free Entry! (Just kidding, still ₹250) 🎮');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ==================== CONSOLE ART ====================
console.log(`
    ⚔️═══════════════════════════════════════⚔️
    
          DEVBATTLEGROUND
          TRIALS OF MERLIN
          
          Entry Fee: ₹250 per team
          Prize Pool: ₹4,000
          
          Four Houses Battle
          Twenty Teams Compete
          Eight Winners Rewarded
          
    ⚔️═══════════════════════════════════════⚔️
`);

// ==================== ANALYTICS TRACKING (Optional) ====================
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking here
    console.log(`Event: ${eventName}`, eventData);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track house selection
const originalSelectHouse = selectHouse;
selectHouse = function(house) {
    trackEvent('house_selected', { house: house, fee: 250 });
    originalSelectHouse(house);
};

// Track registration open
const originalOpenRegistration = openRegistration;
openRegistration = function() {
    trackEvent('registration_opened', { fee: 250 });
    originalOpenRegistration();
};

// ==================== EXPORT FUNCTIONS ====================
window.DevBattleground = {
    openRegistration,
    closeModal,
    selectHouse,
    toggleFAQ,
    toggleMenu
};

console.log('⚡ DevBattleground Systems Loaded');
console.log('🎯 Type "DevBattleground" in console to access functions');
console.log('💰 Entry Fee: ₹250 | Prize Pool: ₹4,000');

// Add this to your script.js file

// ==================== REVIEWER SECTION ANIMATIONS ====================
function initReviewerAnimations() {
    const criteriaFills = document.querySelectorAll('.criteria-fill');
    
    const criteriaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && ! entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                // Trigger animation
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    criteriaFills.forEach(fill => {
        criteriaObserver.observe(fill);
    });
}

// Update the DOMContentLoaded section to include this:
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Add this line
    initReviewerAnimations();
    
    // ...rest of existing code ...
});