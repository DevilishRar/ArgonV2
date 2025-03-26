


document.addEventListener('DOMContentLoaded', function() {
    
    initApp();
});


function initApp() {
    
    initPreloader();
    initCustomCursor();
    initParticles();
    initScrollAnimation();
    initMobileNav();
    initStickyHeader();
    initScrollSpy();
    initTabSystem();
    initTestimonialSlider();
    initCounters();
    initFaqAccordion();
    initImageModal();
    initBackToTop();
    
    
    console.log('Argon Website Initialized');
}


function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingText = document.querySelector('.loading-text');
    
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            document.body.classList.add('loaded');
            
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        } else {
            width += Math.floor(Math.random() * 10) + 1;
            if (width > 100) width = 100;
            loadingBar.style.width = width + '%';
            
            
            if (width < 33) {
                loadingText.innerHTML = 'Injecting Power <span class="loading-dots">...</span>';
            } else if (width < 66) {
                loadingText.innerHTML = 'Bypassing Hyperion <span class="loading-dots">...</span>';
            } else {
                loadingText.innerHTML = 'Almost Ready <span class="loading-dots">...</span>';
            }
        }
    }, 200);
    
    
    setTimeout(() => {
        width = 100;
    }, 5000);
}


function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15
        });
        
        
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    
    document.querySelectorAll('a, button, .interactive').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
        });
    });
    
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}


function initParticles() {
    const particlesCanvas = document.getElementById('particles-js');
    
    if (!particlesCanvas) return;
    
    
    const particlesConfig = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#00b2ff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00b2ff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };
    
    
    try {
        if (window.particlesJS) {
            window.particlesJS('particles-js', particlesConfig);
        } else {
            console.warn('particles.js not loaded');
            
            createSimpleParticles();
        }
    } catch (error) {
        console.error('Error initializing particles:', error);
        createSimpleParticles();
    }
}


function createSimpleParticles() {
    const canvas = document.getElementById('particles-js');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: '#00b2ff',
            alpha: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 1 + 0.2,
            directionX: Math.random() * 2 - 1,
            directionY: Math.random() * 2 - 1
        });
    }
    
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 178, 255, ${p.alpha})`;
            ctx.fill();
            
            p.x += p.directionX * p.speed;
            p.y += p.directionY * p.speed;
            
            
            if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;
        }
    }
    
    animate();
}


function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}


function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (!mobileNavToggle || !mobileNav) return;
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('nav-open');
    });
    
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });
}


function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');
            
            
            tabContents.forEach(content => content.classList.remove('active'));
            
            
            const tabId = button.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}


function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length === 0) return;
    
    let currentSlide = 0;
    
    
    function showSlide(index) {
        testimonials.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }
    
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }
    
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    
    setInterval(nextSlide, 5000);
}


function initCounters() {
    const counterElements = document.querySelectorAll('.counter-number');
    let hasRun = false;
    
    function animateCounters() {
        if (hasRun) return;
        
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; 
            
            let current = 0;
            const increment = Math.ceil(target / (duration / 30)); 
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = current.toLocaleString();
            }, 30);
        });
        
        hasRun = true;
    }
    
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
}


function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            
            const isOpen = item.classList.contains('active');
            
            
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
}


function initImageModal() {
    const modal = document.querySelector('.image-preview-modal');
    const modalImg = document.getElementById('preview-image');
    const closeModal = document.querySelector('.close-modal');
    const modalCaption = document.querySelector('.modal-caption');
    const zoomIcons = document.querySelectorAll('.zoom-icon');
    
    if (!modal || !modalImg) return;
    
    zoomIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const imgContainer = this.closest('.showcase-image');
            const img = imgContainer.querySelector('img');
            const caption = imgContainer.closest('.showcase-item').querySelector('h3').textContent;
            
            modal.classList.add('active');
            modalImg.src = img.src;
            modalCaption.textContent = caption;
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        
        if (targetId === '#' || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


if (typeof gsap === 'undefined') {
    window.gsap = {
        to: (element, { x, y, duration }) => {
            if (element) {
                element.style.transform = `translate(${x}px, ${y}px)`;
                element.style.transition = `transform ${duration}s ease`;
            }
        }
    };
}


document.querySelectorAll('.primary-btn, .secondary-btn, .download-btn').forEach(button => {
    button.classList.add('ripple');
    
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.onload = () => {
                    img.removeAttribute('data-src');
                };
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imgObserver.observe(img);
    });
});


document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        let valid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (valid) {
            
            console.log('Form submitted successfully');
            this.reset();
        }
    });
});


document.querySelectorAll('.typing-text').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.width = 'auto';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
});


document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        
        if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
            e.preventDefault();
            alert('Argon Executor v3 download coming soon!');
        }
    });
});
