/**
 * Room Tours Module
 * Handles 360° room tour functionality
 */

(function() {
    'use strict';

    // Configuration for different tour providers
    const TOUR_PROVIDERS = {
        MATTERPORT: 'matterport',
        KUULA: 'kuula',
        THREESIXTY_VISTA: '3dvista',
        ROUNDME: 'roundme'
    };

    /**
     * Open a 360° room tour
     * @param {string} tourUrl - URL of the tour to open
     * @param {Object} options - Additional options for opening the tour
     */
    function openRoomTour(tourUrl, options = {}) {
        const defaults = {
            width: 1200,
            height: 800,
            target: '_blank'
        };

        const settings = { ...defaults, ...options };

        // Check if tourUrl is a placeholder
        if (!tourUrl || tourUrl.includes('TOUR_URL')) {
            showTourPlaceholderMessage();
            return;
        }

        // Open tour in new window with specified dimensions
        const features = `width=${settings.width},height=${settings.height},resizable=yes,scrollbars=yes`;
        window.open(tourUrl, settings.target, features);
    }

    /**
     * Show placeholder message for demo purposes
     */
    function showTourPlaceholderMessage() {
        const message = `
Hier wird die 360° Room Tour geöffnet.

Ersetzen Sie die URLs in der openRoomTour() Funktion mit Ihren tatsächlichen Tour-Links.

Unterstützte Anbieter:
• Matterport (https://matterport.com)
• Kuula (https://kuula.co)
• 3DVista (https://www.3dvista.com)
• Roundme (https://roundme.com)

Beispiel-URL Format:
• Matterport: https://my.matterport.com/show/?m=TOUR_ID
• Kuula: https://kuula.co/share/TOUR_ID
        `.trim();

        alert(message);
    }

    /**
     * Detect tour provider from URL
     * @param {string} url - Tour URL
     * @returns {string|null} Provider name or null
     */
    function detectProvider(url) {
        if (url.includes('matterport.com')) return TOUR_PROVIDERS.MATTERPORT;
        if (url.includes('kuula.co')) return TOUR_PROVIDERS.KUULA;
        if (url.includes('3dvista.com')) return TOUR_PROVIDERS.THREESIXTY_VISTA;
        if (url.includes('roundme.com')) return TOUR_PROVIDERS.ROUNDME;
        return null;
    }

    /**
     * Initialize room tours with configuration
     * @param {Object} config - Configuration object with tour URLs
     */
    function initRoomTours(config = {}) {
        console.log('Room Tours initialized with config:', config);
    }

    // Expose functions to global scope
    window.RoomTours = {
        open: openRoomTour,
        init: initRoomTours,
        detectProvider: detectProvider,
        PROVIDERS: TOUR_PROVIDERS
    };

    // For backwards compatibility with inline onclick
    window.openRoomTour = openRoomTour;

})();
