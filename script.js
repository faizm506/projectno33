document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. ULTRA-PREMIUM PRELOADER
    ========================================= */
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('loaded');
            body.style.overflowY = 'auto'; 
            body.style.height = 'auto';

            setTimeout(() => {
                document.querySelectorAll('.reveal-on-load').forEach(el => {
                    el.classList.add('active');
                });
            }, 400); 

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1200); 
        }
    }, 2200); 

    /* =========================================
       2. MOBILE MENU TOGGLE
    ========================================= */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinksLeft = document.getElementById('nav-links-left');
    const navItems = document.querySelectorAll('.nav-link');

    if (menuBtn && navLinksLeft) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinksLeft.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuBtn && menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinksLeft.classList.remove('active');
            }
        });
    });

    /* =========================================
       3. SMOOTH SCROLL REVEAL (APPLE-STYLE)
    ========================================= */
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

    /* =========================================
       4. HERO PARALLAX (60FPS SMOOTHED)
    ========================================= */
    const heroMedia = document.getElementById('hero-media');
    let ticking = false;

    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        
        // requestAnimationFrame prevents scroll-jittering
        if (!ticking && heroMedia && scrollPos < window.innerHeight) {
            window.requestAnimationFrame(() => {
                heroMedia.style.transform = `translateY(${scrollPos * 0.08}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    /* =========================================
       5. LUXURY CUSTOM CURSOR
    ========================================= */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const interactables = document.querySelectorAll('a, button, .product-card, input, .accordion-header');

        if (cursorDot && cursorOutline) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                requestAnimationFrame(() => {
                    cursorOutline.style.left = `${posX}px`;
                    cursorOutline.style.top = `${posY}px`;
                });
            });

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
    }

    /* =========================================
       6. PRESS QUOTE ROTATOR (AHMEDABAD EDITION)
    ========================================= */
    const quotes = [
        '"Redefining Ahmedabad\'s rich jewelry heritage with modern, breathtaking elegance." — VOGUE INDIA',
        '"The new standard for bespoke luxury and generational craftsmanship in Gujarat." — Harper\'s BAZAAR',
        '"Where traditional Indian artistry meets contemporary, ethical diamond design." — ELLE',
        '"Ahmedabad\'s crown jewel for flawlessly executed, sustainable fine jewelry." — GQ INDIA'
    ];
    
    let quoteIndex = 0;
    const quoteElement = document.getElementById('press-quote');

    if (quoteElement) {
        setInterval(() => {
            quoteElement.classList.remove('active');
            
            setTimeout(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                quoteElement.innerText = quotes[quoteIndex];
                quoteElement.classList.add('active');
            }, 1000); 
            
        }, 5500);
    }

    /* =========================================
       7. FROSTED GLASS ACCORDION (CARE GUIDE)
    ========================================= */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open clicked
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 30 + 'px';
            }
        });
    });

    /* =========================================
       10. INTERACTIVE BESPOKE SLIDER
    ========================================= */
    const bespokeSlider = document.getElementById('bespoke-slider');
    const afterImageWrap = document.getElementById('after-image-container');
    const sliderHandle = document.getElementById('slider-handle');

    if (bespokeSlider && afterImageWrap && sliderHandle) {
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = bespokeSlider.getBoundingClientRect();
            // Calculate mouse position relative to the container
            let x = clientX - rect.left;
            
            // Constrain the slider within the box
            x = Math.max(0, Math.min(x, rect.width));
            
            // Convert to percentage
            const percentage = (x / rect.width) * 100;
            
            // Apply to the image mask and the handle
            afterImageWrap.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Desktop Mouse Events
        bespokeSlider.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                // Prevent text highlighting while dragging
                e.preventDefault(); 
                moveSlider(e.clientX);
            }
        });

        // Mobile Touch Events
        bespokeSlider.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                moveSlider(e.touches[0].clientX);
            }
        }, { passive: true });
    }

}); // <-- ALL CODE MUST STAY INSIDE THIS CLOSING BRACKET


