/* ─────────────────────────────────────────────
   script.js — Immersive Cinema Luxury Engine (Optimized)
   ───────────────────────────────────────────── */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Elements
  const introScene    = document.getElementById('intro-scene');
  const mainContent   = document.getElementById('main-content');
  const brandFirst    = document.getElementById('intro-brand-first');
  const brandSecond   = document.getElementById('intro-brand-second');
  const watermark     = document.getElementById('intro-watermark');
  const counterVal    = document.getElementById('intro-counter');

  // Cursor Elements
  const cursorDot     = document.querySelector('.cursor-dot');
  const cursorRing    = document.querySelector('.cursor-ring');
  const lensFlare     = document.querySelector('.lens-flare');

  // Spelling details
  const nameToSpell   = "HARSH";
  const nameLength    = nameToSpell.length;

  // Timing variables (Intentional, highly polished cinematic 3.0s loading sequence)
  const letterIntervalMs = 600; // Total 3000ms duration (5 letters * 600ms = 3000ms)

  // Track timeouts & intervals for robust instant skipping
  let letterTimeout = null;
  let counterTimer = null;
  let impactTimeout1 = null;
  let impactTimeout2 = null;
  let impactTimeout3 = null;
  let impactTimeout4 = null;
  let startTimeout = null;
  let isIntroFinished = false;

  // Start Intro sequence automatically on every reload
  startTimeout = setTimeout(() => {
    revealNextLetter();
    runCounter();
  }, 300);

  // ── 1. Spells out 'HARSH' letter by letter ──────
  let currentLetterIdx = 0;

  function revealNextLetter() {
    if (isIntroFinished) return;
    if (currentLetterIdx < nameLength) {
      currentLetterIdx++;
      const currentString = nameToSpell.substring(0, currentLetterIdx);

      brandFirst.textContent = currentString;

      // Trigger animation using hardware accelerated transforms & minimal layout impact
      brandFirst.classList.remove('letter-reveal-active');
      brandFirst.offsetHeight; // Minimum reflow to reset animation
      brandFirst.classList.add('letter-reveal-active');

      letterTimeout = setTimeout(revealNextLetter, letterIntervalMs);
    }
  }

  // ── 2. Loading Counter counting naturally from 00 to 100 in 3.0s ────────────────────────
  let currentCount = 0;
  const counterTickInterval = 30; // 30ms interval = 100 ticks over 3000ms
  const tickAmount = 1; // 1% natural increment per tick

  function runCounter() {
    if (isIntroFinished) return;
    counterTimer = setInterval(() => {
      currentCount += tickAmount;
      if (currentCount >= 100) {
        currentCount = 100;
        clearInterval(counterTimer);
        triggerCinematicImpact();
      }

      const formatted = Math.floor(currentCount).toString().padStart(2, '0');
      counterVal.textContent = formatted;
    }, counterTickInterval);
  }

  // ── 3. Skip Intro Action ──────────────────────────────────────────
  function skipIntro() {
    if (isIntroFinished) return;
    isIntroFinished = true;

    // Clear all active timers
    clearTimeout(letterTimeout);
    clearInterval(counterTimer);
    clearTimeout(impactTimeout1);
    clearTimeout(impactTimeout2);
    clearTimeout(impactTimeout3);
    clearTimeout(impactTimeout4);
    clearTimeout(startTimeout);

    // Perform smooth, snappy aperture exit animation
    introScene.classList.add('exit-aperture');
    mainContent.classList.remove('content-hidden');
    mainContent.classList.add('content-visible');

    setTimeout(() => {
      introScene.style.display = 'none';
    }, 1200);
  }

  // Wire up Skip Intro Button
  const skipBtn = document.getElementById('skip-intro-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      skipIntro();
    });
  }

  // ── 4. Cinematic Impact Climax Transition at 100% ───────────────────────────────────
  function triggerCinematicImpact() {
    if (isIntroFinished) return;
    document.body.classList.add('flash-active', 'shake-active');
    brandFirst.classList.add('brand-zoom-out');
    watermark.classList.add('watermark-revealed');

    impactTimeout1 = setTimeout(() => {
      document.body.classList.remove('shake-active');
    }, 350);

    impactTimeout2 = setTimeout(() => {
      brandSecond.classList.add('rise-active');
    }, 100);

    impactTimeout3 = setTimeout(() => {
      introScene.classList.add('exit-aperture');
      mainContent.classList.remove('content-hidden');
      mainContent.classList.add('content-visible');
      isIntroFinished = true;

      impactTimeout4 = setTimeout(() => {
        introScene.style.display = 'none';
      }, 1200);
    }, 1000); // Exquisite transition timings matching premium art campaign standards
  }

  // ── 5. Main Portfolio Interactivity (Scroll Reveals) ──────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.hero-title-area, .hero-canvas-frame, .hero-statement-area, .editorial-section, .project-strip, .expertise-column, .contact-grid'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Handle staggered reveal if part of a grid/list
          const parent = entry.target.parentElement;
          if (parent && (parent.classList.contains('expertise-grid') || parent.classList.contains('projects-list-brutalist'))) {
            const index = Array.from(parent.children).indexOf(entry.target);
            entry.target.style.setProperty('--delay', `${index * 0.1}s`);
          }

          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  // ── 6. Hero Typing Animation (Universal across Mobile and Desktop) ───────────────────
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const phrases = [
      "custom e-commerce engines.",
      "high-performance PHP & JS systems.",
      "interactive visual canvases.",
      "secure MySQL data pipelines.",
      "robust Node.js environments."
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeCycle() {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        typingTextEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40; // Fast deletion
      } else {
        typingTextEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90; // Balanced typing speed
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2200; // Deep luxury pause at the end
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }

      setTimeout(typeCycle, typingSpeed);
    }

    // Delay start to sync with aperture open transition
    setTimeout(typeCycle, 3500);
  }

  // ── 7. GPU-Accelerated Cursor & Magnetic Engine (60fps Optimized) ───────────────────

  if (!window.matchMedia('(pointer: coarse)').matches) {
    let mouseX = 0, mouseY = 0; // Target position
    let ringX = 0, ringY = 0;   // LERP position
    let ringScale = 1;          // Current LERP scale factor
    let targetScale = 1;        // Target scale factor

    const magneticElements = document.querySelectorAll('a, .editorial-btn, .nav-item, .code-shell-float');
    magneticElements.forEach(el => el.classList.add('magnetic-element'));

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Cache magnetic coordinates initially and on scroll/resize to completely eliminate Layout Thrashing
    let magneticBounds = [];
    function cacheMagneticBounds() {
      magneticBounds = Array.from(magneticElements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          el: el,
          centerX: rect.left + rect.width / 2 + window.scrollX,
          centerY: rect.top + rect.height / 2 + window.scrollY
        };
      });
    }

    cacheMagneticBounds();
    window.addEventListener('resize', cacheMagneticBounds);
    window.addEventListener('scroll', cacheMagneticBounds, { passive: true });

    // LERP easing factor (0.15 = smooth/controlled, 1 = instant)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    function updateAnimations() {
      // 1. Update Dot (Instant GPU Translate3d)
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;

      // 2. LERP Ring position & scale (Pure GPU accelerated matrices)
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      ringScale = lerp(ringScale, targetScale, 0.15);
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0) scale(${ringScale})`;

      // 3. Lens Flare Parallax (Slow GPU Translate3d)
      if (lensFlare) {
        const flareX = (ringX / window.innerWidth - 0.5) * 40;
        const flareY = (ringY / window.innerHeight - 0.5) * 40;
        lensFlare.style.transform = `translate3d(${flareX}px, ${flareY}px, 0)`;
      }

      // 4. Super-Smooth Magnetic Pull using Cached Math
      const currentScrollX = window.scrollX;
      const currentScrollY = window.scrollY;

      magneticBounds.forEach(bound => {
        const centerX = bound.centerX - currentScrollX;
        const centerY = bound.centerY - currentScrollY;
        const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

        if (dist < 100) {
          const pullX = (mouseX - centerX) * 0.18;
          const pullY = (mouseY - centerY) * 0.18;
          bound.el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        } else {
          bound.el.style.transform = `translate3d(0, 0, 0)`;
        }
      });

      requestAnimationFrame(updateAnimations);
    }

    // Handle Cursor Hover States by adjusting GPU target scale
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        targetScale = 2.0; // GPU double scale multiplier
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        targetScale = 1.0;
        cursorRing.classList.remove('hover');
      });
    });

    requestAnimationFrame(updateAnimations);
  }

  // ── 7. Cinematic Mobile Navigation Overlay Engine ────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      mobileNav.classList.toggle('active', isOpen);
      
      // Prevent body scrolling when fullscreen overlay is active
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Elegant auto-close when mobile nav overlay item is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 8. Real-Time Delhi India local time update for status HUD ─────────────────────
  const hudTimeEl = document.getElementById('hud-time');
  if (hudTimeEl) {
    function updateHUDTime() {
      // Calculate India Standard Time (GMT+5.30)
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5)); // IST is UTC + 5.5 hours
      
      let hours = istTime.getHours();
      let minutes = istTime.getMinutes();
      let seconds = istTime.getSeconds();
      
      // Zero padding
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      
      hudTimeEl.textContent = `${hours}:${minutes}:${seconds} GMT+0530 (IST)`;
    }
    
    // Update immediately and then every second
    updateHUDTime();
    setInterval(updateHUDTime, 1000);
  }

  // ── 9. Resilient Breakpoint Resize Watcher ───────────────────────────────────────
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      if (mobileNav) {
        mobileNav.classList.remove('active');
      }
    }
  });

});
