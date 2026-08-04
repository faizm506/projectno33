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



    
// 6. Press Quote Rotator (Ahmedabad Heritage Edition)
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
            
        }, 5500); // 5.5 seconds gives the user plenty of time to read
    }


    // 7. Frosted Glass Accordion (Care Guide)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close all other accordions for a clean, luxury UI
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // If the clicked item was NOT active, open it using scrollHeight
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 30 + 'px'; // +30px accounts for the padding
            }
        });
    });


    