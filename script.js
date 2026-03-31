/**
 * FRIEND & FRIENDS — Main Script
 * script.js
 *
 * 1. Sticky navbar state
 * 2. Scroll-triggered fade-in animations
 * 3. Mobile navigation toggle
 * 4. Requirement form submission + toast
 * 5. Smooth scroll for anchor links
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     1. STICKY NAVBAR
  ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  /* ──────────────────────────────────────────────
     2. SCROLL-TRIGGERED FADE-IN
  ────────────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));

  // Trigger hero elements immediately (above fold)
  document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 80);
  });


  /* ──────────────────────────────────────────────
     3. MOBILE NAV TOGGLE
  ────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    // Close menu on nav link click
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }


  /* ──────────────────────────────────────────────
     4. REQUIREMENT FORM + TOAST
  ────────────────────────────────────────────── */
  const form  = document.getElementById('reqForm');
  const toast = document.getElementById('toast');

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll('[required]');
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      // Simulate submission
      const btn = form.querySelector('.btn-submit');
      const originalContent = btn.innerHTML;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="spin">
          <path d="M9 2a7 7 0 010 14A7 7 0 019 2z" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
          <path d="M9 2a7 7 0 017 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Submitting...
      `;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled  = false;
        form.reset();
        showToast();
      }, 1800);
    });
  }


  /* ──────────────────────────────────────────────
     5. SMOOTH SCROLL FOR ANCHOR LINKS
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ──────────────────────────────────────────────
     6. SPIN ANIMATION for loading state
  ────────────────────────────────────────────── */
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    .spin {
      animation: spin-anim 0.8s linear infinite;
    }
    @keyframes spin-anim {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);

})();
