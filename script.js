document.addEventListener('DOMContentLoaded', () => {
  
  // ================= LOADER =================
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loader-text');
  
  // Simulate loading sequence
  setTimeout(() => { loaderText.innerText = "AUTHENTICATING CREDENTIALS..."; }, 500);
  setTimeout(() => { loaderText.innerText = "DECRYPTING ASSETS..."; }, 1000);
  setTimeout(() => { loaderText.innerText = "ACCESS GRANTED."; }, 1500);
  
  setTimeout(() => {
    loader.classList.add('fade-out');
    document.body.classList.remove('loading');
    
    // Trigger initial reveals after load
    setTimeout(triggerReveals, 300);
    initCounters();
  }, 1800);

  // ================= HEADER SCROLL =================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // ================= MOBILE NAVIGATION =================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavApply = document.getElementById('mobile-nav-apply');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });
    
    // Close menu on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
      });
    });
    
    if (mobileNavApply) {
      mobileNavApply.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
  }

  // ================= SCROLL REVEALS =================
  const reveals = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-fade, .reveal-text');
  
  const triggerReveals = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('is-visible');
      }
    });
  };
  
  window.addEventListener('scroll', triggerReveals);

  // ================= PARALLAX BACKGROUND =================
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  window.addEventListener('scroll', () => {
    const scrollVal = window.scrollY;
    parallaxBgs.forEach(bg => {
      bg.style.transform = `translateY(${scrollVal * 0.4}px)`;
    });
  });

  // ================= ANIMATED COUNTERS =================
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%','');
        
        // Calculate increment
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
        }
      };

      // Only start if visible
      const elementTop = counter.getBoundingClientRect().top;
      if (elementTop < window.innerHeight) {
        updateCount();
      } else {
        // Wait for scroll
        window.addEventListener('scroll', function scrollHandler() {
          if (counter.getBoundingClientRect().top < window.innerHeight) {
            updateCount();
            window.removeEventListener('scroll', scrollHandler);
          }
        });
      }
    });
  }

  // ================= ACTIVE NAV HIGHLIGHTING =================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ================= SMOOTH SCROLL =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if(targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ================= FULLSCREEN MODAL =================
  const modal = document.getElementById('app-modal');
  const openBtns = [document.getElementById('nav-apply-btn'), document.getElementById('hero-apply-btn')];
  const closeBtn = document.getElementById('modal-close-btn');

  openBtns.forEach(btn => {
    if(btn) {
      btn.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  // 3D Tilt removed as per user request

  // ================= CYBER CANVAS PARTICLES =================
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

});
