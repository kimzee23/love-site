document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  let currentPage = 'landing';
  let musicPlaying = false;
  let countdownMode = 'future'; // 'future' or 'past'
  let typingAnimationStarted = false; // Prevent multiple typing animations

  // Music control
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  // Make music autoplay with user interaction
  document.body.addEventListener('click', function() {
    if (!musicPlaying && bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, { once: true });

  if (musicToggle) {
    musicToggle.addEventListener('click', function() {
      if (!bgMusic) return;

      if (musicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music</span>';
      } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> <span>Music</span>';
      }
      musicPlaying = !musicPlaying;
    });
  }

  if (bgMusic) {
    bgMusic.addEventListener('play', function() {
      musicPlaying = true;
      if (musicToggle) {
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> <span>Music</span>';
      }
    });

    bgMusic.addEventListener('pause', function() {
      musicPlaying = false;
      if (musicToggle) {
        musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music</span>';
      }
    });
  }

  // Page navigation
  const navDots = document.querySelectorAll('.nav-dot');
  const pages = document.querySelectorAll('.page');
  const startJourneyBtn = document.getElementById('start-journey');

  // Smooth scroll to section
  function scrollToPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (!targetPage) return;

    window.scrollTo({
      top: targetPage.offsetTop,
      behavior: 'smooth'
    });

    // Update active page
    updateActivePage(pageId);
  }

  // Update active page
  function updateActivePage(pageId) {
    // Update nav dots
    navDots.forEach(dot => {
      if (dot.getAttribute('data-page') === pageId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update page visibility
    pages.forEach(page => {
      if (page.id === pageId) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    currentPage = pageId;

    // Special actions for specific pages
    if (pageId === 'love-letter' && !typingAnimationStarted) {
      typingAnimationStarted = true;
      setTimeout(() => {
        startTypingAnimation();
      }, 500);
    }
  }

  // Navigation dot click events
  navDots.forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      scrollToPage(pageId);
    });
  });

  // Start journey button
  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', function() {
      scrollToPage('how-we-met');
    });
  }

  // "I Choose You" button
  const chooseYouBtn = document.getElementById('choose-you');
  if (chooseYouBtn) {
    chooseYouBtn.addEventListener('click', function() {
      // Create heart explosion animation
      createHeartExplosion();

      // Show message
      setTimeout(() => {
        alert("I love you more than words can say. Thank you for being you. ❤️");
      }, 1000);
    });
  }

  // Heart explosion animation
  function createHeartExplosion() {
    const container = document.querySelector('#final-promise .container');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('exploding-heart');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = 'absolute';
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.color = ['#ff6b8b', '#6c5ce7', '#0984e3'][Math.floor(Math.random() * 3)];
      heart.style.fontSize = Math.random() * 20 + 15 + 'px';
      heart.style.opacity = '0';
      heart.style.zIndex = '1000';

      container.appendChild(heart);

      // Animate heart
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      const animation = heart.animate([
        {
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0) rotate(0deg)'
        },
        {
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(1) rotate(0deg)'
        },
        {
          opacity: 0,
          transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0) rotate(360deg)`
        }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      });

      animation.onfinish = () => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      };
    }
  }

  // Generate love reasons
  const loveReasons = [
    { icon: 'smile', text: 'Your smile that lights up any room' },
    { icon: 'heart', text: 'The way you care about everyone around you' },
    { icon: 'shield-heart', text: 'How you make me feel safe and loved' },
    { icon: 'mountain', text: 'Your strength during difficult times' },
    { icon: 'lightbulb', text: 'Your brilliant mind and curious spirit' },
    { icon: 'hand-holding-heart', text: 'The gentleness in your touch' },
    { icon: 'music', text: 'Your laugh - my favorite sound in the world' },
    { icon: 'star', text: 'The way you see the good in everything' },
    { icon: 'sun', text: 'How you bring warmth wherever you go' },
    { icon: 'infinity', text: 'Your endless capacity for love' },
    { icon: 'compass', text: 'The way you guide me to be better' },
    { icon: 'book-heart', text: 'Your wisdom and thoughtful perspective' }
  ];

  const loveReasonsContainer = document.querySelector('.love-reasons');
  if (loveReasonsContainer) {
    loveReasons.forEach(reason => {
      const reasonEl = document.createElement('div');
      reasonEl.className = 'reason-bubble';
      reasonEl.innerHTML = `
        <i class="fas fa-${reason.icon}"></i>
        <p>${reason.text}</p>
      `;
      loveReasonsContainer.appendChild(reasonEl);
    });
  }

  // Typing animation for love letter
  function startTypingAnimation() {
    const letterContent = document.getElementById('letter-content');

    if (!letterContent) {
      console.error('Letter content element not found!');
      return;
    }

    // Your personal love letter text - FIXED VERSION
    const letterText = `My dearest Arike,

Every day with you feels like a dream I never want to wake up from. Your smile, your laughter, and the way you look at me make my world brighter in ways I can't explain. You're cute, beautiful, and incredibly intelligent, and loving you feels effortless and right.

You've seen me at my best and my worst, yet you chose me every time. Arike, you are my peace, my safe place, and my greatest blessing. No matter what life brings, I promise to stand by you and love you more with each passing day.

I love you, always.`;

    // Clear existing content
    letterContent.innerHTML = '';

    // Apply proper styling
    letterContent.style.fontFamily = "'Dancing Script', cursive";
    letterContent.style.fontSize = "1.5rem";
    letterContent.style.lineHeight = "1.8";
    letterContent.style.whiteSpace = "pre-wrap";

    // Create a typed.js-like effect
    let i = 0;
    const speed = 40; // typing speed in ms

    function typeWriter() {
      if (i < letterText.length) {
        // Add current character
        letterContent.innerHTML = letterText.substring(0, i + 1);
        i++;

        // Scroll to keep text in view
        letterContent.scrollTop = letterContent.scrollHeight;

        setTimeout(typeWriter, speed);
      }
    }

    // Start typing
    setTimeout(typeWriter, 300);
  }

  // Countdown timer
  const countdownDate = new Date();
  // Set to your next special date (anniversary, birthday, etc.)
  // Example: Set to 3 months from now
  countdownDate.setMonth(countdownDate.getMonth() + 11);
  countdownDate.setHours(0, 0, 0, 0);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const toggleCountdownBtn = document.getElementById('toggle-countdown');

  // Days since you met (example date) - CHANGE THIS TO YOUR ACTUAL DATE
  const metDate = new Date('2026-11-22'); // Set to your actual met date

  function updateCountdown() {
    const now = new Date();

    if (countdownMode === 'future') {
      // Countdown to future date
      const diff = countdownDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
      } else {
        // Date has passed
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
      }
    } else {
      // Days since you met
      const diff = now - metDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (daysEl) daysEl.textContent = days.toString();
      if (hoursEl) hoursEl.textContent = '--';
      if (minutesEl) minutesEl.textContent = '--';
      if (secondsEl) secondsEl.textContent = '--';
    }
  }

  // Toggle countdown mode
  if (toggleCountdownBtn) {
    toggleCountdownBtn.addEventListener('click', function() {
      if (countdownMode === 'future') {
        countdownMode = 'past';
        toggleCountdownBtn.textContent = 'Until our next special date';
        const countdownText = document.querySelector('.countdown-text p');
        if (countdownText) {
          countdownText.textContent = 'Days since you became my person';
        }
      } else {
        countdownMode = 'future';
        toggleCountdownBtn.textContent = 'Days since you became my person';
        const countdownText = document.querySelector('.countdown-text p');
        if (countdownText) {
          countdownText.textContent = 'Until our next special date';
        }
      }
      updateCountdown();
    });
  }

  // Initialize countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Scroll-based page detection
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const scrollPos = window.scrollY + (window.innerHeight / 3);

      for (let i = pages.length - 1; i >= 0; i--) {
        const page = pages[i];
        if (page.offsetTop <= scrollPos) {
          updateActivePage(page.id);
          break;
        }
      }
    }, 100);
  });

  // Initial page setup
  updateActivePage('landing');

  // Add some interactive hover effects to elements
  const interactiveElements = document.querySelectorAll('.reason-bubble, .dream-card, .promise-item, .timeline-content');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });

  // Add a subtle parallax effect to landing page
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const landing = document.getElementById('landing');
    const hearts = document.querySelectorAll('.heart');

    if (landing) {
      const rate = scrolled * -0.5;
      landing.style.backgroundPosition = `0px ${rate}px`;
    }

    // Slow down floating hearts on scroll
    hearts.forEach((heart, index) => {
      const speed = 0.5 + (index * 0.1);
      heart.style.transform = `rotate(45deg) translateY(${scrolled * -speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
});