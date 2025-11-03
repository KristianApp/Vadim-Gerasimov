/**
 * Lightbox Module
 * Handles image lightbox/modal functionality
 */

(function() {
    'use strict';

    // Lightbox state
    let currentImageIndex = 0;
    let images = [];

    /**
     * Initialize lightbox with image array
     * @param {Array} imageArray - Array of image URLs
     */
    function initLightbox(imageArray) {
        images = imageArray;
        setupEventListeners();
    }

    /**
     * Open lightbox with specific image
     * @param {number} index - Index of the image to display
     */
    function openLightbox(index) {
        currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        
        if (!lightbox || !img || !images[index]) {
            console.error('Lightbox elements or image not found');
            return;
        }

        img.src = images[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * Change image in lightbox
     * @param {number} direction - Direction to move (1 for next, -1 for previous)
     */
    function changeLightboxImage(direction) {
        currentImageIndex += direction;
        
        // Wrap around if at the end/beginning
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        
        const img = document.getElementById('lightbox-img');
        if (img && images[currentImageIndex]) {
            img.src = images[currentImageIndex];
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    function handleKeyboard(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }

    /**
     * Handle click outside image to close
     * @param {MouseEvent} e - Mouse event
     */
    function handleBackdropClick(e) {
        const lightbox = document.getElementById('lightbox');
        if (e.target === lightbox) {
            closeLightbox();
        }
    }

    /**
     * Setup event listeners for lightbox
     */
    function setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Click outside to close
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', handleBackdropClick);
        }
    }

    /**
     * Get current lightbox index
     * @returns {number} Current image index
     */
    function getCurrentIndex() {
        return currentImageIndex;
    }

    /**
     * Get images array
     * @returns {Array} Images array
     */
    function getImages() {
        return images;
    }

    // Expose functions to global scope
    window.Lightbox = {
        init: initLightbox,
        open: openLightbox,
        close: closeLightbox,
        change: changeLightboxImage,
        getCurrentIndex: getCurrentIndex,
        getImages: getImages
    };

    // For backwards compatibility with inline onclick
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.changeLightboxImage = changeLightboxImage;

})();
