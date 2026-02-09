// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const serviceButtons = document.querySelectorAll('.service-action');
const glowButtons = document.querySelectorAll('.glow-btn');

// ========================================
// NAVIGATION & SCROLL HANDLING
// ========================================

/**
 * Update active navigation link on scroll
 */
function updateActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

/**
 * Smooth scroll to section
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Close mobile menu
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

/**
 * Setup navigation links
 */
function setupNavigation() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================

/**
 * Add scroll effects to navbar and hero
 */
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        // Update active nav
        updateActiveNav();

        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax effect on hero
        const hero = document.querySelector('.hero');
        if (hero && window.pageYOffset < window.innerHeight) {
            hero.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
        }
    });
}

// ========================================
// SERVICE MODAL
// ========================================

/**
 * Service data
 */
const serviceData = {
    'ui-ux-design': {
        title: 'UI/UX Design Services',
        description: 'Membuat antarmuka pengguna yang intuitif dan indah yang meningkatkan pengalaman pengguna dan mendorong keterlibatan.',
        details: `
            <h3>Yang Saya Tawarkan:</h3>
            <ul>
                <li><strong>📱 Grafis Media Sosial</strong> - Postingan, story, banner yang menarik perhatian</li>
                <li><strong>🎨 Desain Identitas Merek</strong> - Logo, skema warna, tipografi, dan panduan merek</li>
                <li><strong>✨ Desain Visual</strong> - Menciptakan antarmuka yang menawan dan modern dengan konsistensi merek</li>
                <li><strong>📊 Pengujian Kegunaan</strong> - Memastikan pengalaman pengguna yang optimal melalui pengujian</li>
                <li><strong>🔄 Sistem Desain</strong> - Membangun kerangka desain yang dapat diskalakan dan mudah dipelihara</li>
            </ul>
            <h3 style="margin-top: 20px;">Manfaat Utama:</h3>
            <ul>
                <li>Peningkatan keterlibatan dan retensi pengguna</li>
                <li>Peningkatan tingkat konversi</li>
                <li>Persepsi merek yang lebih baik</li>
                <li>Pengurangan biaya pengembangan melalui pengujian sejak awal</li>
            </ul>
        `
    },
    'graphic-design': {
        title: 'Graphic Design Services',
        description: 'Membuat konten visual yang menarik yang menyampaikan pesan merek Anda secara efektif dan mudah diingat.',
        details: `
            <h3>Yang Saya Tawarkan:</h3>
            <ul>
                <li><strong>🎨 Desain Identitas Merek</strong> - Logo, skema warna, tipografi, dan panduan merek</li>
                <li><strong>📱 Grafis Media Sosial</strong> - Postingan, story, dan banner yang menarik perhatian</li>
                <li><strong>📄 Materi Pemasaran</strong> - Brosur, flyer, kartu nama, dan presentasi</li>
                <li><strong>🖼️ Ilustrasi & Ikon</strong> - Karya visual dan elemen grafis kustom</li>
                <li><strong>🎬 Motion Graphics</strong> - Konten animasi untuk platform digital</li>
            </ul>
            <h3 style="margin-top: 20px;">Alat Desain:</h3>
            <p>Adobe Creative Suite, Figma, Canva Pro, Procreate, Blender (3D)</p>
        `
    },
    'frontend-dev': {
        title: 'Frontend Development Services',
        description: 'Membangun aplikasi web yang responsif, interaktif, dan berkinerja tinggi menggunakan teknologi modern.',
        details: `
            <h3>Yang Saya Tawarkan:</h3>
            <ul>
                <li><strong>💻 Responsive Web Development</strong> - Website berprinsip mobile-first yang berfungsi dengan baik di semua perangkat</li>
                <li><strong>⚛️ React & Modern Frameworks</strong> - Aplikasi single-page yang dinamis</li>
                <li><strong>🎨 CSS & Animation</strong> - Animasi dan transisi yang indah serta halus</li>
                <li><strong>⚡ Performance Optimization</strong> - Waktu muat cepat dan pengalaman pengguna yang lancar</li>
                <li><strong>🔍 SEO Implementation</strong> - Struktur kode yang ramah mesin pencari</li>
            </ul>
            <h3 style="margin-top: 20px;">Teknologi:</h3>
            <p>HTML, CSS, JavaScript, React, Vue.js, TypeScript</p>
        `
    }
};

/**
 * Create and show service modal
 */
function createServiceModal(data) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        color: #f1f5f9;
        padding: 2.5rem;
        border-radius: 20px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
        position: relative;
        animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕ Close';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(99, 102, 241, 0.2);
        border: 2px solid #6366f1;
        color: #f1f5f9;
        padding: 8px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    `;

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.transform = 'scale(1.1)';
    });

    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.transform = 'scale(1)';
    });

    // Modal content
    modalContent.innerHTML = `
        <h1 style="
            font-size: 2.2rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        ">${data.title}</h1>
        <p style="
            font-size: 1.1rem;
            color: #cbd5e1;
            margin-bottom: 2rem;
            line-height: 1.8;
        ">${data.description}</p>
        <div style="
            background: rgba(99, 102, 241, 0.1);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #334155;
            margin-bottom: 1.5rem;
        ">${data.details}</div>
        <div style="
            text-align: center;
            padding: 1.5rem;
            background: rgba(6, 182, 212, 0.1);
            border-radius: 12px;
            border: 1px solid #06b6d4;
        ">
            <h3 style="color: #06b6d4; margin-bottom: 1rem;">Ready to Start Your Project?</h3>
            <p style="color: #cbd5e1; margin-bottom: 1.5rem;">Contact me today to discuss your requirements and get a custom quote.</p>
            <button style="
                background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Contact Me</button>
        </div>
    `;

    modalContent.insertBefore(closeButton, modalContent.firstChild);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close handlers
    closeButton.addEventListener('click', () => closeModal(modal));
    modalContent.querySelector('button:last-child').addEventListener('click', () => {
        closeModal(modal);
        setTimeout(() => smoothScroll('#contact'), 300);
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(modal);
    });

    function closeModal(modalElement) {
        modalElement.style.animation = 'fadeOut 0.3s ease forwards';
        document.body.style.overflow = '';
        setTimeout(() => modalElement.remove(), 300);
    }
}

/**
 * Setup service buttons
 */
function setupServiceButtons() {
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service');
            if (serviceData[serviceType]) {
                createServiceModal(serviceData[serviceType]);
            }
        });
    });
}

// ========================================
// ANIMATIONS
// ========================================

/**
 * Setup scroll animations with Intersection Observer
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-text, .fade-in-card').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

/**
 * Animate progress bars
 */
function animateProgressBars() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress-fill').forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 300);
                    }
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
}

/**
 * Draw donut chart for soft skills
 */
function drawDonutChart() {
    const chartContainer = document.getElementById('donutChart');
    if (!chartContainer) return;

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const skillPercentage = 85;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (skillPercentage / 100 * 2 * Math.PI);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 32px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${skillPercentage}%`, centerX, centerY);

    chartContainer.appendChild(canvas);
}

// ========================================
// BUTTON EFFECTS
// ========================================

/**
 * Setup glow button effects
 */
function setupGlowButtons() {
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            
            // Glow effect
            const glow = document.createElement('span');
            glow.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, transparent 70%);
                border-radius: 8px;
                animation: glowPulse 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(glow);
            setTimeout(() => glow.remove(), 600);
        });

        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

/**
 * Setup contact form
 */
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (name && email && message) {
            const button = this.querySelector('.btn');
            const originalText = button.textContent;

            // Success state
            button.textContent = '✓ Message Sent!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            button.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.6)';

            // Toast notification
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 1rem 2rem;
                border-radius: 12px;
                z-index: 2000;
                animation: slideInRight 0.5s ease-out;
                font-weight: 600;
                box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
            `;
            toast.textContent = '✓ Pesan Anda telah terkirim!';
            document.body.appendChild(toast);

            this.reset();

            // Reset after delay
            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.5s ease-out forwards';
                setTimeout(() => toast.remove(), 500);
            }, 2500);

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.boxShadow = '';
            }, 2500);
        }
    });
}

// ========================================
// PAGE INITIALIZATION
// ========================================

/**
 * Initialize all features on page load
 */
function init() {
    setupNavigation();
    setupScrollEffects();
    setupServiceButtons();
    setupScrollAnimations();
    setupGlowButtons();
    setupContactForm();
    
    // Initialize animations
    window.addEventListener('load', () => {
        animateProgressBars();
        drawDonutChart();
        
        // Stagger card animations
        document.querySelectorAll('.fade-in-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Hero title word animations
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const words = heroTitle.querySelectorAll('.word');
            words.forEach((word, index) => {
                word.style.animationDelay = `${index * 0.15}s`;
            });
        }
        
        console.log('%cJesqueen Portfolio', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
        console.log('%c✓ All systems loaded successfully!', 'font-size: 13px; color: #10b981;');
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);