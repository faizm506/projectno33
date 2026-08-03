document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Handle Ultra-Premium Preloader
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Wait for the window to load
    window.addEventListener('load', () => {
        
        // We hold the preloader on screen for 2.2 seconds total 
        // to let the breathing animation and progress bar finish beautifully.
        setTimeout(() => {
            
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

            // Completely remove the preloader from the DOM after the transition to keep the site fast
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1200); // Matches the 1.2s CSS transition time

        }, 2200); 
    });

    // 3. Mobile Menu Toggle (Updated for new layout)
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
            if(menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinksLeft.classList.remove('active');
            }
        });
    });

    // 4. Smooth Scroll Reveal (Apple-style glide up)
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

    // 5. Hero Parallax
    const heroMedia = document.getElementById('hero-media');
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        if(scrollPos < window.innerHeight) {
            // Very subtle, smooth parallax push
            heroMedia.style.transform = `translateY(${scrollPos * 0.08}px)`;
        }
    });
});

