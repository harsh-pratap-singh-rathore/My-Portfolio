/* ─────────────────────────────────────────────
   script.js — Production Full-Stack Architecture Engine
   ───────────────────────────────────────────── */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── Elements ──────────────────────────────────────
  const introScene    = document.getElementById('intro-scene');
  const mainContent   = document.getElementById('main-content');
  const brandFirst    = document.getElementById('intro-brand-first');
  const brandSecond   = document.getElementById('intro-brand-second');
  const watermark     = document.getElementById('intro-watermark');
  const counterVal    = document.getElementById('intro-counter');
  const skipBtn       = document.getElementById('skip-intro-btn');

  // Cursor Elements
  const cursorDot     = document.querySelector('.cursor-dot');
  const cursorRing    = document.querySelector('.cursor-ring');
  const lensFlare     = document.querySelector('.lens-flare');

  // Spelling details
  const nameToSpell   = "HARSH";
  const nameLength    = nameToSpell.length;

  // Timing variables (Cinematic 2.3s high-performance intro)
  const letterIntervalMs = 240;
  let letterTimeout   = null;
  let counterTimer    = null;
  let impactTimeouts  = [];
  let startTimeout    = null;
  let isIntroFinished = false;

  // Set inert accessibility attribute during preloader
  if (mainContent) {
    mainContent.setAttribute('inert', '');
  }

  // Animation synchronization hook
  let typingStarted = false;
  let startTypingAnimation = () => {};
  let refreshNavCapsule = () => {};

  // ── 1. Spells out 'HARSH' letter-by-letter ────────
  let currentLetterIdx = 0;

  function revealNextLetter() {
    if (isIntroFinished) return;
    if (currentLetterIdx < nameLength) {
      currentLetterIdx++;
      const currentString = nameToSpell.substring(0, currentLetterIdx);

      if (brandFirst) {
        brandFirst.textContent = currentString;

        if (typeof brandFirst.animate === 'function') {
          brandFirst.animate([
            { filter: 'blur(4px)', transform: 'translate3d(0, 14px, 0) scale(0.97)', opacity: 0 },
            { filter: 'blur(0px)', transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 }
          ], {
            duration: 320,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          });
        }
      }

      letterTimeout = setTimeout(revealNextLetter, letterIntervalMs);
    }
  }

  // ── 2. Cinematic Loading Counter 00 -> 100% via requestAnimationFrame ──
  const counterDurationMs = 2300;
  let startTimestamp = null;

  function runCounter(timestamp) {
    if (isIntroFinished) return;
    if (!startTimestamp) startTimestamp = timestamp;
    const elapsed = timestamp - startTimestamp;

    const linearProgress = Math.min(elapsed / counterDurationMs, 1);
    // Smooth quadratic ease-out for natural deceleration
    const easedProgress = linearProgress * (2 - linearProgress);
    const currentCount = Math.min(100, Math.floor(easedProgress * 100));

    if (counterVal) {
      counterVal.textContent = currentCount.toString().padStart(2, '0');
    }

    if (linearProgress < 1) {
      counterTimer = requestAnimationFrame(runCounter);
    } else {
      if (counterVal) counterVal.textContent = '100';
      triggerCinematicImpact();
    }
  }

  // Start sequence immediately
  startTimeout = setTimeout(() => {
    revealNextLetter();
    counterTimer = requestAnimationFrame(runCounter);
  }, 60);

  // ── 3. Skip Intro Action (Instant & Smooth) ────────
  function skipIntro() {
    if (isIntroFinished) return;
    isIntroFinished = true;

    // Clear all active timers
    clearTimeout(letterTimeout);
    if (counterTimer) cancelAnimationFrame(counterTimer);
    clearTimeout(startTimeout);
    impactTimeouts.forEach(t => clearTimeout(t));

    document.body.classList.remove('shake-active', 'flash-active');

    if (introScene) {
      introScene.classList.add('exit-aperture');
    }

    if (mainContent) {
      mainContent.classList.remove('content-hidden');
      mainContent.classList.add('content-visible');
      mainContent.removeAttribute('inert');
    }

    // Immediately start hero typing
    startTypingAnimation();
    setTimeout(() => refreshNavCapsule(true), 150);

    setTimeout(() => {
      if (introScene) {
        introScene.style.display = 'none';
      }
    }, 800);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      skipIntro();
    });
  }

  // Keyboard shortcut: Escape skips preloader
  window.addEventListener('keydown', (e) => {
    if (!isIntroFinished && (e.key === 'Escape' || e.code === 'Space')) {
      skipIntro();
    }
  });

  // ── 4. Climax Impact Transition at 100% (Snappy & Fluid) ────────────
  function triggerCinematicImpact() {
    if (isIntroFinished) return;
    document.body.classList.add('flash-active', 'shake-active');

    if (brandFirst) brandFirst.classList.add('brand-zoom-out');
    if (watermark) watermark.classList.add('watermark-revealed');

    impactTimeouts.push(setTimeout(() => {
      document.body.classList.remove('shake-active');
    }, 180));

    impactTimeouts.push(setTimeout(() => {
      if (brandSecond) brandSecond.classList.add('rise-active');
    }, 60));

    impactTimeouts.push(setTimeout(() => {
      if (introScene) introScene.classList.add('exit-aperture');
      if (mainContent) {
        mainContent.classList.remove('content-hidden');
        mainContent.classList.add('content-visible');
        mainContent.removeAttribute('inert');
      }
      isIntroFinished = true;
      startTypingAnimation();
      setTimeout(() => {
        refreshNavCapsule(true);
        if (typeof window.refreshBottomDockCapsule === 'function') {
          window.refreshBottomDockCapsule(true);
        }
      }, 100);

      impactTimeouts.push(setTimeout(() => {
        if (introScene) introScene.style.display = 'none';
      }, 500));
    }, 320));
  }

  // ── 5. Hero Typing Animation (Full-Stack & MERN Stack Phrasing) ──
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const phrases = [
      "MERN & Agentic AI Systems",
      "Autonomous LLM Pipelines",
      "React 19 & Scalable Node.js",
      "Vector Embeddings & RAG",
      "Low-Latency Cloud APIs"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;
    let typeTimer = null;

    function typeCycle() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        charIdx = Math.max(0, charIdx - 1);
        typingTextEl.textContent = currentPhrase.substring(0, charIdx);
        typingSpeed = 35;
      } else {
        charIdx = Math.min(currentPhrase.length, charIdx + 1);
        typingTextEl.textContent = currentPhrase.substring(0, charIdx);
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of sentence
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 450; // Pause before typing next
      }

      typeTimer = setTimeout(typeCycle, typingSpeed);
    }

    startTypingAnimation = () => {
      if (typingStarted) return;
      typingStarted = true;
      typeCycle();
    };

    // Auto-start fallback
    setTimeout(startTypingAnimation, 3600);
  }

  // ── 6. Scroll Reveal & Intersection Observer ───────
  const revealTargets = document.querySelectorAll(
    '.hero-title-area, .hero-canvas-frame, .hero-statement-area, .editorial-section, .projects-deck-stage, .project-deck-card, .progress-card, .expertise-column, .contact-grid'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Staggered delay for grid elements
          const parent = target.parentElement;
          if (parent && (parent.classList.contains('expertise-grid') || parent.classList.contains('progress-grid'))) {
            const index = Array.from(parent.children).indexOf(target);
            target.style.setProperty('--delay', `${index * 0.12}s`);
          }

          target.classList.add('visible');

          // If progress card, animate progress bar fill width
          if (target.classList.contains('progress-card')) {
            const fill = target.querySelector('.progress-bar-fill');
            const percent = target.getAttribute('data-percentage');
            if (fill && percent) {
              fill.style.width = `${percent}%`;
            }
          }

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  // ── 7. Luxury Cursor & Precision Magnetic Hover Engine ──
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouchDevice && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let ringScale = 1;
    let targetScale = 1;
    let hasMoved = false;

    // Show cursor on first pointer movement
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorRing) cursorRing.style.opacity = '1';
      }
    }, { passive: true });

    // LERP math
    const lerp = (start, end, factor) => start + (end - start) * factor;

    function renderCursor() {
      // 1. Instant dot position
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // 2. Trailing ring with smooth easing
      ringX = lerp(ringX, mouseX, 0.16);
      ringY = lerp(ringY, mouseY, 0.16);
      ringScale = lerp(ringScale, targetScale, 0.16);

      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0) scale(${ringScale})`;
      }

      // 3. Subtle lens flare parallax
      if (lensFlare) {
        const flareX = (ringX / window.innerWidth - 0.5) * 30;
        const flareY = (ringY / window.innerHeight - 0.5) * 30;
        lensFlare.style.transform = `translate3d(${flareX}px, ${flareY}px, 0)`;
      }

      requestAnimationFrame(renderCursor);
    }

    requestAnimationFrame(renderCursor);

    // Discrete interactive targets for magnetic interaction (excludes large cards to preserve native scrolling and CSS 3D float keyframes)
    const interactiveElements = document.querySelectorAll(
      '.editorial-btn, .btn-cinematic-contact, .btn-contact-resume, .inquire-glass-capsule, .btn-copy-email-pill, .intent-pill, .dispatch-send-btn, .capsule-chip-copy, .capsule-arrow-box, .telemetry-pill, .btn-card-primary, .btn-card-secondary, .deck-nav-btn, .deck-pill-dot, .preview-blur-toggle, .browser-open-btn, .skip-intro-btn, .menu-toggle, .nav-item, .proj-dock-tab, .proj-launch-btn, .tech-icon-pill, .card-feat-capsule'
    );

    interactiveElements.forEach(el => {
      let elRect = null;
      let elRaf = null;

      el.addEventListener('mouseenter', () => {
        targetScale = 1.8;
        if (cursorRing) cursorRing.classList.add('hover');
        elRect = el.getBoundingClientRect();
      });

      el.addEventListener('mouseleave', () => {
        targetScale = 1.0;
        if (cursorRing) cursorRing.classList.remove('hover');
        if (elRaf) cancelAnimationFrame(elRaf);
        elRect = null;
        el.style.transform = 'translate3d(0, 0, 0)';
      });

      el.addEventListener('mousemove', (e) => {
        if (!elRect) elRect = el.getBoundingClientRect();
        if (elRaf) cancelAnimationFrame(elRaf);
        elRaf = requestAnimationFrame(() => {
          if (!elRect) return;
          const centerX = elRect.left + elRect.width / 2;
          const centerY = elRect.top + elRect.height / 2;
          const pullX = (e.clientX - centerX) * 0.22;
          const pullY = (e.clientY - centerY) * 0.22;
          el.style.transform = `translate3d(${pullX.toFixed(2)}px, ${pullY.toFixed(2)}px, 0)`;
        });
      });
    });
  } else {
    document.body.classList.add('disable-custom-cursor');
  }

  // ── 8. iOS Liquid Glass Floating Bottom Dock Engine (Mobile / Tablet) ──
  function initBottomDock() {
    const dock = document.getElementById('iosBottomDock');
    const glass = dock ? dock.querySelector('.bottom-dock-glass') : null;
    const capsule = document.getElementById('bottomDockCapsule');
    const dockLinks = document.querySelectorAll('.bottom-dock-link');

    if (!dock || !glass || !capsule || !dockLinks.length) return;

    let activeLink = document.querySelector('.bottom-dock-link.is-active') || dockLinks[0];
    let isClickScrolling = false;
    let scrollTimeout = null;

    function moveBottomCapsule(targetEl, animate = true) {
      if (!targetEl) return;
      const glassRect = glass.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      if (glassRect.width === 0 || targetRect.width === 0) return;

      const leftOffset = targetRect.left - glassRect.left;
      const targetWidth = targetRect.width;

      if (!animate) {
        capsule.style.transition = 'none';
      } else {
        capsule.style.transition = 'transform 0.44s cubic-bezier(0.34, 1.35, 0.64, 1), width 0.44s cubic-bezier(0.34, 1.35, 0.64, 1), opacity 0.25s ease';
      }

      capsule.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
      capsule.style.width = `${targetWidth}px`;
      capsule.style.opacity = '1';
    }

    function setActiveDockLink(link, animate = true) {
      if (!link) return;
      dockLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      activeLink = link;
      moveBottomCapsule(link, animate);
    }

    window.refreshBottomDockCapsule = (animate = false) => {
      const cur = document.querySelector('.bottom-dock-link.is-active') || activeLink;
      moveBottomCapsule(cur, animate);
    };

    // Initial calculation after render
    setTimeout(() => {
      setActiveDockLink(activeLink, false);
      requestAnimationFrame(() => {
        capsule.style.transition = '';
      });
    }, 150);

    // Tab Click: smooth spring glide + smooth scroll to target section
    dockLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        if (targetHref && targetHref.startsWith('#')) {
          const targetSection = document.querySelector(targetHref);
          if (targetSection) {
            e.preventDefault();
            isClickScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              isClickScrolling = false;
            }, 850);

            setActiveDockLink(link, true);

            // Synchronize with desktop nav if active
            const desktopLink = document.querySelector(`.editorial-nav a[href="${targetHref}"]`);
            if (desktopLink && typeof refreshNavCapsule === 'function') {
              document.querySelectorAll('.editorial-nav .nav-item').forEach(n => n.classList.remove('active'));
              desktopLink.classList.add('active');
              refreshNavCapsule(true);
            }

            const headerOffset = 64;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = Math.max(0, elementPosition - headerOffset);

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Resize calculation for responsive docks
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 820) {
        window.refreshBottomDockCapsule(false);
      }
    }, { passive: true });

    // Dynamic hook for ScrollSpy to glide the capsule on scroll
    window.updateBottomDockActive = (targetId) => {
      if (isClickScrolling) return;
      const matching = document.querySelector(`.bottom-dock-link[href="#${targetId}"]`);
      if (matching && !matching.classList.contains('is-active')) {
        setActiveDockLink(matching, true);
      }
    };
  }

  initBottomDock();

  // ── 9. Live India (IST) Status HUD Clock ─────
  const hudTimeEl = document.getElementById('hud-time');
  if (hudTimeEl) {
    function updateHUDTime() {
      try {
        const istFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        hudTimeEl.textContent = `${istFormatter.format(new Date())} GMT+0530 (IST)`;
      } catch (err) {
        // Fallback calculation
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ist = new Date(utc + (3600000 * 5.5));
        const h = ist.getHours().toString().padStart(2, '0');
        const m = ist.getMinutes().toString().padStart(2, '0');
        const s = ist.getSeconds().toString().padStart(2, '0');
        hudTimeEl.textContent = `${h}:${m}:${s} GMT+0530 (IST)`;
      }
    }

    updateHUDTime();
    setInterval(updateHUDTime, 1000);
  }

  // ── 10. iOS Liquid Glass Floating Dock & Dynamic Capsule Engine ──
  function initLiquidGlassNav() {
    const track = document.getElementById('glass-pill-track');
    const capsule = document.getElementById('nav-active-capsule');
    const navItems = document.querySelectorAll('.editorial-nav .nav-item');

    if (!track || !capsule || !navItems.length) return;

    let activeItem = document.querySelector('.editorial-nav .nav-item.active') || navItems[0];
    let isClickScrolling = false;
    let scrollTimeout = null;

    function moveCapsule(targetEl, animate = true) {
      if (!targetEl) return;
      const trackRect = track.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      // Ensure elements have rendered dimensions
      if (trackRect.width === 0 || targetRect.width === 0) return;

      const leftOffset = targetRect.left - trackRect.left;
      const targetWidth = targetRect.width;

      if (!animate) {
        capsule.style.transition = 'none';
      } else {
        capsule.style.transition = 'transform 0.44s cubic-bezier(0.34, 1.35, 0.64, 1), width 0.44s cubic-bezier(0.34, 1.35, 0.64, 1), opacity 0.25s ease';
      }

      capsule.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
      capsule.style.width = `${targetWidth}px`;
      capsule.style.opacity = '1';
    }

    refreshNavCapsule = (animate = false) => {
      const currentActive = document.querySelector('.editorial-nav .nav-item.active') || activeItem;
      moveCapsule(currentActive, animate);
    };

    // Initial calculation
    setTimeout(() => {
      moveCapsule(activeItem, false);
      requestAnimationFrame(() => {
        capsule.style.transition = '';
      });
    }, 150);

    // Click event on any nav item: slide capsule with spring animation and set active
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        isClickScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isClickScrolling = false;
        }, 850);

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        activeItem = item;
        moveCapsule(item, true);

        const href = item.getAttribute('href');
        if (href && typeof window.updateBottomDockActive === 'function') {
          window.updateBottomDockActive(href.replace('#', ''));
        }
      });

      // Subtle hover preview gliding
      item.addEventListener('mouseenter', () => {
        moveCapsule(item, true);
      });
    });

    // When mouse leaves the track, return smoothly to active item
    track.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('.editorial-nav .nav-item.active') || activeItem;
      moveCapsule(currentActive, true);
    });

    // Window resize: recompute position
    window.addEventListener('resize', () => {
      refreshNavCapsule(false);
    }, { passive: true });

    // ScrollSpy: auto-glide capsule as sections scroll into view
    const sectionIds = ['about', 'projects', 'progress', 'skills', 'contact'];
    const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if ('IntersectionObserver' in window && sectionElements.length) {
      const spyObserver = new IntersectionObserver((entries) => {
        if (isClickScrolling) return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const matchingLink = document.querySelector(`.editorial-nav a[href="#${targetId}"]`);
            if (matchingLink && !matchingLink.classList.contains('active')) {
              navItems.forEach(nav => nav.classList.remove('active'));
              matchingLink.classList.add('active');
              activeItem = matchingLink;
              moveCapsule(matchingLink, true);
            }
            if (typeof window.updateBottomDockActive === 'function') {
              window.updateBottomDockActive(targetId);
            }
          }
        });
      }, {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1
      });

      sectionElements.forEach(sec => spyObserver.observe(sec));
    }
  }

  initLiquidGlassNav();

  /* ─────────────────────────────────────────────
     8. 3D Stacked Project Deck Slider (iOS Style)
     ───────────────────────────────────────────── */
  /* ─────────────────────────────────────────────
     8. iOS 27 Liquid Glass Project Deck Slider
     ───────────────────────────────────────────── */
  function initIosDeckSlider() {
    const deck = document.getElementById('iosProjectsDeck');
    if (!deck) return;

    const cards = Array.from(deck.querySelectorAll('.ios-project-card'));
    const prevBtn = document.getElementById('iosPrevBtn');
    const nextBtn = document.getElementById('iosNextBtn');
    const dots = Array.from(deck.querySelectorAll('.ios-dot'));

    if (!cards.length) return;

    let current = 0;
    const total = cards.length;
    let isTransitioning = false;

    function updateDeck(newIndex, direction) {
      const prev = current;
      current = ((newIndex % total) + total) % total;

      cards.forEach((card) => {
        card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden', 'exit-left', 'exit-right');
      });

      // Exit animation on outgoing card
      if (direction === 'next' && cards[prev]) {
        cards[prev].classList.add('exit-left');
      } else if (direction === 'prev' && cards[prev]) {
        cards[prev].classList.add('exit-right');
      }

      // Re-assign positions
      cards.forEach((card, i) => {
        const offset = ((i - current) % total + total) % total;
        if (offset === 0) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
        } else if (offset === 1) {
          card.classList.add('is-next');
          card.setAttribute('aria-hidden', 'true');
        } else if (offset === total - 1) {
          card.classList.add('is-prev');
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }

    function goTo(index, direction) {
      if (isTransitioning) return;
      isTransitioning = true;
      updateDeck(index, direction);
      setTimeout(() => { isTransitioning = false; }, 600);
    }

    // Button events
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1, 'prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1, 'next'));

    // Dot events
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i, i > current ? 'next' : 'prev'));
    });

    // Touch swipe
    let tx = 0, ty = 0;
    deck.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    }, { passive: true });
    deck.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        dx < 0 ? goTo(current + 1, 'next') : goTo(current - 1, 'prev');
      }
    }, { passive: true });

    // Mouse drag
    let mx = 0, dragging = false;
    deck.addEventListener('mousedown', e => {
      if (e.target.closest('a, button')) return;
      dragging = true;
      mx = e.clientX;
      deck.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', e => {
      if (!dragging) return;
      dragging = false;
      deck.style.cursor = '';
      const dx = e.clientX - mx;
      if (Math.abs(dx) > 50) {
        dx < 0 ? goTo(current + 1, 'next') : goTo(current - 1, 'prev');
      }
    });

    // Keyboard
    window.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const r = deck.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        e.key === 'ArrowRight' ? goTo(current + 1, 'next') : goTo(current - 1, 'prev');
      }
    });

    // Init
    updateDeck(0, null);
  }

  initIosDeckSlider();



    function initScrollProgressBars() {
    const progressSection = document.getElementById('progress');
    const fills = document.querySelectorAll('.progress-bar-fill');
    const numberEls = document.querySelectorAll('.progress-number');
    if (!progressSection) return;

    let hasAnimated = false;

    function animateNumbers() {
      numberEls.forEach(el => {
        const text = el.textContent || '';
        const match = text.match(/\d+/);
        if (!match) return;
        const target = parseInt(match[0], 10);
        const unit = el.querySelector('.unit') ? el.querySelector('.unit').outerHTML : '%';
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function updateCount(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          current = Math.round(easeOut * target);
          el.innerHTML = `${current}${unit}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.innerHTML = `${target}${unit}`;
          }
        }
        requestAnimationFrame(updateCount);
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            fills.forEach(fill => {
              const targetWidth = fill.style.getPropertyValue('--target-width');
              if (targetWidth) {
                fill.style.width = targetWidth;
              }
            });
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(progressSection);
    } else {
      fills.forEach(fill => {
        const targetWidth = fill.style.getPropertyValue('--target-width');
        if (targetWidth) fill.style.width = targetWidth;
      });
    }
  }

  initScrollProgressBars();

  /* ─────────────────────────────────────────────
     11. Cinematic Scroll Reveal Suite
     ───────────────────────────────────────────── */
  function initScrollReveals() {
    const revealTargets = document.querySelectorAll(
      '.reveal-up, .reveal-scale, .section-header-brutalist, .tech-pipeline-flow, .manifesto-glass-canvas'
    );
    if (!revealTargets.length) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealTargets.forEach(el => revealObserver.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add('is-revealed', 'in-view'));
    }
  }

  initScrollReveals();

  /* ─────────────────────────────────────────────
     12. Interactive Tech Logo Tiles (Desktop Hover & Mobile Touch)
     ───────────────────────────────────────────── */
  function initTechLogoTiles() {
    const tiles = document.querySelectorAll('.tech-logo-tile');
    if (!tiles.length) return;

    tiles.forEach(tile => {
      // Mobile tap feedback
      tile.addEventListener('touchstart', () => {
        tiles.forEach(t => {
          if (t !== tile) t.classList.remove('is-touched');
        });
        tile.classList.toggle('is-touched');
      }, { passive: true });

      // Click / Keypress on desktop & mobile
      tile.addEventListener('click', () => {
        const title = tile.querySelector('.tile-title')?.textContent?.trim() || 'TECH';
        const sub = tile.querySelector('.tile-sub')?.textContent?.trim() || '';
        showToast(`⚡ ${title} // ${sub}`);
      });
    });

    // Reset touched state when tapping outside
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.tech-logo-tile')) {
        tiles.forEach(t => t.classList.remove('is-touched'));
      }
    }, { passive: true });
  }

  initTechLogoTiles();

  /* ─────────────────────────────────────────────
     13. Interactive Toast Notification & Citation Copy
     ───────────────────────────────────────────── */
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 2800);
  }

  /* ─────────────────────────────────────────────
     14. iOS 27 Liquid Glass Inquire Engine
     ───────────────────────────────────────────── */
  function initInquireInteractions() {
    const defaultEmail = 'harshpratapsinghrathore555@gmail.com';

    // 1-Tap Copy Email Button
    const copyPillBtn = document.getElementById('btn-copy-direct-email');
    if (copyPillBtn) {
      copyPillBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(defaultEmail);
          const badge = copyPillBtn.querySelector('.btn-copy-badge');
          const originalBadge = badge ? badge.textContent : '1-TAP';
          if (badge) badge.textContent = 'COPIED!';
          showToast(`COPIED TO CLIPBOARD // ${defaultEmail}`);
          setTimeout(() => {
            if (badge) badge.textContent = originalBadge;
          }, 2000);
        } catch (err) {
          showToast(`DISPATCH TARGET // ${defaultEmail}`);
        }
      });
    }

    // Capsule Chip Copy Buttons
    const copyChips = document.querySelectorAll('.capsule-chip-copy');
    copyChips.forEach(chip => {
      chip.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textToCopy = chip.getAttribute('data-copy') || defaultEmail;
        try {
          await navigator.clipboard.writeText(textToCopy);
          const span = chip.querySelector('span');
          const original = span ? span.textContent : 'COPY';
          if (span) span.textContent = 'COPIED';
          showToast(`COPIED // ${textToCopy}`);
          setTimeout(() => {
            if (span) span.textContent = original;
          }, 2000);
        } catch (err) {
          showToast(`COPIED // ${textToCopy}`);
        }
      });
    });

    // Fast Dispatch Transmitter Intent Pills & Form
    const intentPills = document.querySelectorAll('.intent-pill');
    let selectedSubject = 'Full-Stack Engineering Project Inquiry';

    intentPills.forEach(pill => {
      pill.addEventListener('click', () => {
        intentPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSubject = pill.getAttribute('data-subject') || selectedSubject;
        showToast(`INTENT SELECTED // ${pill.textContent.trim()}`);
      });
    });

    const dispatchForm = document.getElementById('fast-dispatch-form');
    const dispatchInput = document.getElementById('dispatch-message-input');

    if (dispatchForm) {
      dispatchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = dispatchInput ? dispatchInput.value.trim() : '';
        const subjectEncoded = encodeURIComponent(selectedSubject);
        const bodyEncoded = encodeURIComponent(
          message
            ? `${message}\n\n---\nSent via Portfolio Fast Dispatch Console`
            : `Hello Harsh,\n\nI would like to discuss a project regarding ${selectedSubject}.\n\nLooking forward to connecting.`
        );
        const mailtoUrl = `mailto:${defaultEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
        showToast('INITIALIZING DIRECT DISPATCH SESSION ↗');
        window.location.href = mailtoUrl;
      });
    }
  }

  /* ─────────────────────────────────────────────
     15. iOS 27 Liquid Glass Projects Showcase Engine
     ───────────────────────────────────────────── */
  /* ─────────────────────────────────────────────
     15. iOS 27 Liquid Glass Swipable Projects Deck Engine
     ───────────────────────────────────────────── */
  function initProjectsShowcase() {
    const dockTabs = document.querySelectorAll('.proj-dock-tab');
    const projectCards = document.querySelectorAll('.project-liquid-card.deck-slide');
    const prevBtn = document.getElementById('projPrevBtn');
    const nextBtn = document.getElementById('projNextBtn');
    const stepPills = document.querySelectorAll('.deck-step-pill');
    const deckStage = document.getElementById('projectsDeckStage');

    if (!projectCards.length) return;

    let currentSlide = 0;
    const totalSlides = projectCards.length;

    function goToSlide(newIndex) {
      if (newIndex < 0) newIndex = totalSlides - 1;
      if (newIndex >= totalSlides) newIndex = 0;

      currentSlide = newIndex;

      // Update Slides
      projectCards.forEach((card, idx) => {
        if (idx === currentSlide) {
          card.classList.add('is-active');
          card.style.display = 'block';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate3d(0, 0, 0) scale(1)';
          });
        } else {
          card.classList.remove('is-active');
          card.style.opacity = '0';
          card.style.transform = idx < currentSlide ? 'translate3d(-24px, 0, 0) scale(0.985)' : 'translate3d(24px, 0, 0) scale(0.985)';
          setTimeout(() => {
            if (!card.classList.contains('is-active')) {
              card.style.display = 'none';
            }
          }, 350);
        }
      });

      // Update Swiper HUD Step Pills
      stepPills.forEach((pill, idx) => {
        if (idx === currentSlide) {
          pill.classList.add('is-active');
        } else {
          pill.classList.remove('is-active');
        }
      });

      // Update Top Segmented Dock
      dockTabs.forEach((tab, idx) => {
        if (idx === currentSlide + 1) {
          dockTabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
        }
      });
    }

    // Initialize first slide
    goToSlide(0);

    // Prev / Next Navigation Click
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      });
    }

    // Indicator Step Pills Click
    stepPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const slideIdx = parseInt(pill.getAttribute('data-slide'), 10);
        if (!isNaN(slideIdx)) {
          goToSlide(slideIdx);
        }
      });
    });

    // Top Quick-Jump Navigation Dock
    dockTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        if (filter === 'all' || filter === 'shree-karni') {
          goToSlide(0);
        } else if (filter === 'code-canvas') {
          goToSlide(1);
        } else if (filter === 'my-voice') {
          goToSlide(2);
        }
      });
    });

    // Mobile Touch Swipe Gesture Support
    if (deckStage) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      deckStage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }, { passive: true });

      deckStage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Horizontal swipe threshold
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            goToSlide(currentSlide + 1);
          } else {
            goToSlide(currentSlide - 1);
          }
        }
      }, { passive: true });
    }

    // 3D Specular Tilt on Desktop Hover — Optimized with Cached Rect & rAF
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      projectCards.forEach(card => {
        let cardRect = null;
        let cardRaf = null;

        card.addEventListener('mouseenter', () => {
          cardRect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
          if (!cardRect) cardRect = card.getBoundingClientRect();
          if (cardRaf) cancelAnimationFrame(cardRaf);
          cardRaf = requestAnimationFrame(() => {
            if (!cardRect) return;
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2.5;
            const rotateY = ((x - centerX) / centerX) * 2.5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
          });
        });

        card.addEventListener('mouseleave', () => {
          if (cardRaf) cancelAnimationFrame(cardRaf);
          cardRect = null;
          card.style.transform = '';
        });
      });
    }
  }

  initInquireInteractions();
  initProjectsShowcase();

});

