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

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Project data
const projects = {
    1: {
        title: 'E-Commerce Platform',
        tech: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
        description: 'A comprehensive full-stack e-commerce platform built with modern technologies. Features include user authentication, product catalog management, shopping cart functionality, secure payment processing, order management, and admin dashboard.',
        features: [
            'User registration and authentication with JWT',
            'Product catalog with search and filtering',
            'Shopping cart with persistent storage',
            'Secure payment processing with Stripe integration',
            'Order history and tracking',
            'Admin dashboard for inventory management',
            'Responsive design for all devices',
            'Real-time inventory updates'
        ],
        github: '#',
        live: '#'
    },
    2: {
        title: 'Task Management App',
        tech: ['React', 'Redux', 'Express.js', 'PostgreSQL', 'Socket.io', 'Material-UI'],
        description: 'A collaborative task management application designed for teams to organize, track, and complete projects efficiently. Includes real-time updates, team collaboration features, and comprehensive project analytics.',
        features: [
            'Real-time collaboration with Socket.io',
            'Drag-and-drop task organization',
            'Team member assignment and permissions',
            'Project timeline and milestone tracking',
            'File attachment and commenting system',
            'Progress analytics and reporting',
            'Email notifications and reminders',
            'Mobile-responsive design'
        ],
        github: '#',
        live: '#'
    }
};

// Open modal with project details
function openProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <div class="modal-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-body">
            <p class="modal-description">${project.description}</p>

            <div class="modal-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-links">
                <a href="${project.github}" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.live}" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for project buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details')) {
        const projectId = e.target.getAttribute('data-project');
        openProjectModal(projectId);
    }
});

// Close modal when clicking the close button
closeModal.addEventListener('click', closeProjectModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});
