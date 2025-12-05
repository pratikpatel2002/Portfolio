// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update toggle button based on current theme
if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme function
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
} else {
    console.error('Hamburger menu elements not found');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu on window resize if screen becomes larger
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic form validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send this data to a server
        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgressBar');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// Throttle scroll events for better performance
let scrollTimeout;
function throttledScroll() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateScrollProgress();
            scrollTimeout = null;
        }, 10);
    }
}

window.addEventListener('scroll', throttledScroll);
window.addEventListener('load', updateScrollProgress);

// Add loading animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // Uncomment the line below to enable typing effect
        // typeWriter(heroSubtitle, 'Full Stack Developer');
    }
});

// Navigate to project details page
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details') || e.target.closest('.view-details')) {
        e.preventDefault();
        const button = e.target.classList.contains('view-details') ? e.target : e.target.closest('.view-details');
        const projectCard = button.closest('.project-card');
        const projectId = button.getAttribute('data-project');
        
        // Remove hover state by blurring the card
        if (projectCard) {
            projectCard.blur();
            // Force remove any active states
            projectCard.style.transform = '';
            projectCard.style.boxShadow = '';
        }
        
        if (projectId) {
            window.location.href = `project-details.html?id=${projectId}`;
        }
    }
});

// Ensure hover states are properly removed when mouse leaves
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        // Reset any transform or shadow that might persist
        card.style.transform = '';
        card.style.boxShadow = '';
        card.classList.remove('touch-active');
    });
    
    // Remove hover state when clicking on buttons
    const buttons = card.querySelectorAll('.project-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            card.blur();
            card.style.transform = '';
            card.style.boxShadow = '';
            card.classList.remove('touch-active');
        });
    });
    
    // Handle touch events for mobile
    card.addEventListener('touchstart', () => {
        card.classList.add('touch-active');
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.classList.remove('touch-active');
        }, 300);
    });
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});
