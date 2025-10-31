// js/animations.js
// Animation system using GSAP and Lenis

class SalonifyAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize micro-interactions
        this.initMicroInteractions();
        
        // Initialize mobile menu
        this.initMobileMenu();
    }

    initSmoothScroll() {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Update GSAP scroll trigger when Lenis updates
        lenis.on('scroll', ScrollTrigger.update);

        // Let GSAP handle the scroll proxy
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    initScrollAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        this.animateHeroSection();

        // Feature tiles animation
        this.animateFeatureTiles();

        // Steps animation
        this.animateSteps();

        // Testimonials animation
        this.animateTestimonials();

        // Trust badges animation
        this.animateTrustBadges();
    }

    animateHeroSection() {
        // Hero text animation
        gsap.from('.hero__title, .hero__subtitle', {
            duration: 1,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // CTA buttons animation
        gsap.from('.hero__cta-group', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: "power3.out"
        });

        // Hero visual animation
        gsap.from('.hero__mockup', {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            rotationY: 15,
            delay: 0.3,
            ease: "power3.out"
        });

        // Background gradient animation on scroll
        gsap.to('.hero__gradient', {
            scale: 1.2,
            opacity: 0.3,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    animateFeatureTiles() {
        gsap.from('.feature-tile', {
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    animateSteps() {
        gsap.from('.step', {
            duration: 0.6,
            y: 40,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.steps',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    animateTestimonials() {
        gsap.from('.testimonial', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    animateTrustBadges() {
        gsap.from('.trust-badge', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.trust',
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    initMicroInteractions() {
        // Add hover effects to all interactive elements
        this.addHoverEffects();
        
        // Add click animations
        this.addClickAnimations();
    }

    addHoverEffects() {
        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                gsap.to(e.target, {
                    duration: 0.3,
                    scale: 1.03,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', (e) => {
                gsap.to(e.target, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

        // Enhanced card hover effects
        const cards = document.querySelectorAll('.feature-tile, .testimonial');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                gsap.to(e.currentTarget, {
                    duration: 0.4,
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', (e) => {
                gsap.to(e.currentTarget, {
                    duration: 0.4,
                    y: 0,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    ease: "power2.out"
                });
            });
        });
    }

    addClickAnimations() {
        // Add click animation to CTA buttons
        const ctaButtons = document.querySelectorAll('.btn--primary, .btn--secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    gsap.to(e.target, {
                        duration: 0.1,
                        scale: 0.95,
                        ease: "power2.in",
                        yoyo: true,
                        repeat: 1
                    });
                    
                    // Smooth scroll to target
                    const targetId = e.target.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: {
                                y: targetElement,
                                offsetY: 80
                            },
                            ease: "power2.inOut"
                        });
                    }
                }
            });
        });
    }

    initMobileMenu() {
        const hamburger = document.querySelector('.nav__hamburger');
        const navMenu = document.querySelector('.nav__menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.classList.toggle('active');
                navMenu.classList.toggle('nav__menu--mobile');
                
                // Animate hamburger to X
                gsap.to(hamburger.querySelectorAll('span'), {
                    duration: 0.3,
                    rotation: isExpanded ? 45 : 0,
                    y: isExpanded ? 6 : 0,
                    stagger: 0.1,
                    ease: "power2.out"
                });
                
                gsap.to(hamburger.querySelectorAll('span')[1], {
                    duration: 0.3,
                    opacity: isExpanded ? 0 : 1,
                    ease: "power2.out"
                });
                
                gsap.to(hamburger.querySelectorAll('span')[2], {
                    duration: 0.3,
                    rotation: isExpanded ? -45 : 0,
                    y: isExpanded ? -6 : 0,
                    ease: "power2.out"
                });
                
                // Animate menu in/out
                if (isExpanded) {
                    gsap.fromTo(navMenu, 
                        { 
                            opacity: 0, 
                            y: -20,
                            display: 'flex'
                        },
                        { 
                            opacity: 1, 
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        }
                    );
                } else {
                    gsap.to(navMenu, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            navMenu.classList.remove('nav__menu--mobile');
                        }
                    });
                }
            });
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SalonifyAnimations();
});

// Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.5);
}
