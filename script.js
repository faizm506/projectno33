document.addEventListener("DOMContentLoaded", () => {
    
    
    // 1. Handle Ultra-Premium Preloader (FIXED: No longer gets stuck)
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // We use a strict timer now instead of waiting for heavy videos to download.
    // It will guarantee the preloader disappears after exactly 2.2 seconds.
    setTimeout(() => {
        if (preloader) {
            // Add 'loaded' class to trigger the curtain slide-up
            preloader.classList.add('loaded');
            
            // Restore scrolling immediately as the curtain rises
            body.style.overflowY = 'auto'; 
            body.style.height = 'auto';

            // Trigger the hero section text to slide in *while* the curtain is moving up
            setTimeout(() => {
                document.querySelectorAll('.reveal-on-load').forEach(el => {
                    el.classList.add('active');
                });
            }, 400); // 400ms into the slide-up animation

            // Completely remove the preloader from the DOM after the transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1200); // Matches the 1.2s CSS transition time
        }
    }, 2200); // Force execution 2.2s after HTML loads

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinksLeft = document.getElementById('nav-links-left');
    const navItems = document.querySelectorAll('.nav-link');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinksLeft.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(menuBtn && menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinksLeft.classList.remove('active');
            }
        });
    });

    // 3. Smooth Scroll Reveal (Apple-style glide up)
    const scrollElements = document.querySelectorAll('.reveal-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    scrollElements.forEach(el => revealObserver.observe(el));

    // 4. Hero Parallax (Subtle push down on scroll)
    const heroMedia = document.getElementById('hero-media');
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        if(heroMedia && scrollPos < window.innerHeight) {
            heroMedia.style.transform = `translateY(${scrollPos * 0.08}px)`;
        }
    });
});

// 5. Luxury Custom Cursor Logic
    // Only run this on non-touch devices (desktops/laptops)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const interactables = document.querySelectorAll('a, button, .product-card, input');

        // Track Mouse Movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with a slight smooth delay (handled by CSS transition + JS)
            // Using requestAnimationFrame for ultimate smoothness
            requestAnimationFrame(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            });
        });

        // Add magnetic expansion effect when hovering over links/buttons
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovering');
                cursorDot.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovering');
                cursorDot.classList.remove('hovering');
            });
        });
    }

    