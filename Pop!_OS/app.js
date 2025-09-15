// Pop!_OS Website Authentic JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');
    
    // Add loaded class to body for smooth entrance animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Mobile Navigation Toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate  menu
        const burgers = navToggle.querySelectorAll('.nav__burger');
        if (navToggle.classList.contains('active')) {
            burgers[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            burgers[1].style.opacity = '0';
            burgers[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            burgers[0].style.transform = 'none';
            burgers[1].style.opacity = '1';
            burgers[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const burgers = navToggle.querySelectorAll('.nav__burger');
        burgers[0].style.transform = 'none';
        burgers[1].style.opacity = '1';
        burgers[2].style.transform = 'none';
        document.body.style.overflow = '';
    }
    
    // Smooth scrolling for navigation links
    function smoothScrollToSection(event) {
        const href = event.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            closeMobileMenu();
        }
    }
    
    // Header background effect on scroll
    function updateHeaderOnScroll() {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 100, 1);
        
        if (scrollY > 50) {
            header.style.background = `rgba(26, 26, 26, ${0.95 + (opacity * 0.05)})`;
            header.style.borderBottomColor = `rgba(255, 255, 255, ${0.1 + (opacity * 0.1)})`;
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        }
    }
    
    // Highlight active navigation link
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        let activeSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.getAttribute('id');
            }
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.color = '#ffffff';
            link.style.background = 'none';
        });
        
        // Add active class to current section link
        if (activeSection) {
            const activeLink = document.querySelector(`.nav__link[href="#${activeSection}"]`);
            if (activeLink && !activeLink.classList.contains('nav__link--cta')) {
                activeLink.classList.add('active');
                activeLink.style.color = '#48b9c7';
                activeLink.style.background = 'rgba(72, 185, 199, 0.1)';
            }
        }
    }
    
    // Intersection Observer for animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe animated elements
        const animatedElements = document.querySelectorAll('.feature-card, .other-feature, .hardware-item, .testimonial');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Button ripple effect
    function addButtonRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - (size / 2);
        const y = event.clientY - rect.top - (size / 2);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Add ripple animation styles
    function addRippleStyles() {
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Parallax effect for hero section
    function parallaxHero() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero && scrolled < window.innerHeight) {
            const heroContent = hero.querySelector('.hero__content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        }
    }
    
    // Throttle function for performance
    function throttle(func, wait) {
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
    
    // Card hover effects
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .other-feature, .hardware-item, .testimonial');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Typing animation for hero title
    function typewriterEffect() {
        const title = document.querySelector('.hero__title');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid #48b9c7';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 500);
                }
            }, 100);
        }
    }
    
    // Image lazy loading
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize everything
    function init() {
        // Add ripple styles
        addRippleStyles();
        
        // Initialize scroll animations
        if ('IntersectionObserver' in window) {
            initializeScrollAnimations();
            lazyLoadImages();
        }
        
        // Add card hover effects
        addCardHoverEffects();
        
        // Add typing effect with delay
        setTimeout(typewriterEffect, 500);
    }
    
    // Event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    // Button click effects
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn')) {
            addButtonRippleEffect(event.target, event);
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Scroll events with throttling
    const throttledScrollHandler = throttle(() => {
        updateHeaderOnScroll();
        highlightActiveNavLink();
        parallaxHero();
    }, 16);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Focus management for accessibility
    function manageFocus() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #48b9c7';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // Performance monitoring
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            });
        }
    }
    
    // Error handling
    window.addEventListener('error', function(event) {
        console.error('JavaScript error:', event.error);
    });
    
    // Initialize all functionality
    init();
    manageFocus();
    monitorPerformance();
    
    // Initial calls
    updateHeaderOnScroll();
    highlightActiveNavLink();
    
    // Smooth page entrance
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Custom cursor for interactive elements
    function addCustomCursor() {
        const interactiveElements = document.querySelectorAll('a, button, .nav__link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                document.body.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', function() {
                document.body.style.cursor = 'default';
            });
        });
    }
    
    addCustomCursor();
    
    // Preload images for better performance
    function preloadImages() {
        const imageUrls = [
            'https://pplx-res.cloudinary.com/image/upload/v1757862979/pplx_project_search_images/000c83e59594450af47c7d8820610134acc2ad6d.png',
            'https://pplx-res.cloudinary.com/image/upload/v1757862979/pplx_project_search_images/bad59bc47ff22120ad0b75819b47d0f128f9b992.png',
            'https://pplx-res.cloudinary.com/image/upload/v1757864842/pplx_project_search_images/adf2fa0a6f768b5b0b78187916a361bd56ad2002.png'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    // Add loading states for buttons
    function addButtonLoadingStates() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (!this.classList.contains('loading')) {
                    const originalText = this.textContent;
                    this.classList.add('loading');
                    this.style.opacity = '0.7';
                    this.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        this.classList.remove('loading');
                        this.style.opacity = '1';
                        this.style.pointerEvents = 'auto';
                    }, 1000);
                }
            });
        });
    }
    
    addButtonLoadingStates();
});
