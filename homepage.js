/**
 * Homepage Module
 * Cookie Banner & Contact Form
 */

(function() {
    'use strict';

    // Cookie Banner Management
    const CookieBanner = {
        init: function() {
            // Check if user already made a choice
            if (!localStorage.getItem('cookieConsent')) {
                setTimeout(() => {
                    this.show();
                }, 1000);
            }
        },

        show: function() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.add('active');
            }
        },

        hide: function() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.remove('active');
            }
        },

        accept: function() {
            localStorage.setItem('cookieConsent', 'accepted');
            this.hide();
            console.log('Cookies akzeptiert');
        },

        decline: function() {
            localStorage.setItem('cookieConsent', 'declined');
            this.hide();
            console.log('Cookies abgelehnt');
        }
    };

    // Contact Form Handling
    const ContactForm = {
        init: function() {
            const form = document.getElementById('contactForm');
            if (form) {
                form.addEventListener('submit', this.handleSubmit.bind(this));
            }
        },

        handleSubmit: function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            
            // Get form values
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate
            if (!this.validate(data)) {
                return;
            }

            // Here you would normally send to a backend
            // For now, we just show a success message
            this.showSuccess();
            form.reset();
        },

        validate: function(data) {
            if (!data.name || data.name.trim() === '') {
                alert('Bitte geben Sie Ihren Namen ein.');
                return false;
            }

            if (!data.email || !this.isValidEmail(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return false;
            }

            if (!data.message || data.message.trim() === '') {
                alert('Bitte geben Sie eine Nachricht ein.');
                return false;
            }

            return true;
        },

        isValidEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        showSuccess: function() {
            alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.');
        }
    };

    // Smooth Scroll for Anchor Links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll to Top Button
    const ScrollToTop = {
        init: function() {
            // Create button if it doesn't exist
            let button = document.getElementById('scrollToTopBtn');
            if (!button) {
                button = document.createElement('button');
                button.id = 'scrollToTopBtn';
                button.className = 'scroll-to-top';
                button.innerHTML = '<i class="fas fa-arrow-up"></i>';
                button.setAttribute('aria-label', 'Nach oben scrollen');
                document.body.appendChild(button);
            }

            // Show/hide button on scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    button.classList.add('visible');
                } else {
                    button.classList.remove('visible');
                }
            });

            // Scroll to top on click
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // Initialize everything when DOM is ready
    function init() {
        CookieBanner.init();
        ContactForm.init();
        initSmoothScroll();
        ScrollToTop.init();

        // Expose functions for inline onclick
        window.acceptCookies = () => CookieBanner.accept();
        window.declineCookies = () => CookieBanner.decline();
    }

    // Run init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();