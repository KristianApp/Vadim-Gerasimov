/**
 * Navigation Module
 * Mobile Menu & Scroll Behavior
 */

(function() {
    'use strict';

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    /**
     * Toggle mobile navigation menu
     */
    function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    }

    /**
     * Close mobile menu when clicking outside
     */
    function handleOutsideClick(event) {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navLinks && 
            navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }

    /**
     * Handle navigation behavior on scroll
     */
    function handleScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide when scrolling down, show when scrolling up
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        } else {
            nav.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    /**
     * Close mobile menu when clicking on a link
     */
    function handleLinkClick() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    }

    /**
     * Initialize navigation
     */
    function init() {
        // Expose toggleMenu to global scope for onclick attributes
        window.toggleMenu = toggleMenu;

        // Ensure navigation is visible on page load
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('hidden');
            nav.classList.remove('transparent');
        }

        // Add event listeners
        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('scroll', handleScroll);
        
        // Close menu when clicking on navigation links
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();