/* ==========================================================
   main.js — Adrián Takano Portfolio
   - Intersection Observer reveal animations
   - Sticky nav scroll detection
   - Mobile hamburger menu
   ========================================================== */

(function () {
    'use strict';

    // ---------- REVEAL ON SCROLL ----------
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach((el) => el.classList.add('reveal--visible'));
    }

    // ---------- NAV SCROLL STATE ----------
    const nav = document.getElementById('nav');

    function handleNavScroll() {
        if (window.scrollY > 40) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ---------- MOBILE MENU ----------
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('nav__toggle--active');
            menu.classList.toggle('nav__menu--open');
            document.body.style.overflow = menu.classList.contains('nav__menu--open') ? 'hidden' : '';
        });

        // Close menu on link click
        menu.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                toggle.classList.remove('nav__toggle--active');
                menu.classList.remove('nav__menu--open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- ACTIVE NAV LINK ON SCROLL ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
})();
