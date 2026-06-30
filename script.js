/* ===================================
   Game Việt Mobile – JavaScript
   =================================== */

// =============================
// Particle System
// =============================
(function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(245,158,11,',
    'rgba(239,68,68,',
    'rgba(124,58,237,',
    'rgba(59,130,246,',
    'rgba(236,72,153,'
  ];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.5 + 0.1;
    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color}${opacity});
      animation-duration: ${Math.random() * 20 + 10}s;
      animation-delay: ${Math.random() * -20}s;
    `;
    container.appendChild(el);
  }
})();

// =============================
// Navbar Scroll Effect
// =============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sTop = section.offsetTop - 120;
    if (window.scrollY >= sTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// =============================
// Hamburger Menu
// =============================
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});

navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// =============================
// Smooth Scroll Helper
// =============================
function scrollToGames() {
  document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

// =============================
// Scroll Reveal Animation
// =============================
const revealEls = document.querySelectorAll(
  '.game-card, .feature-card, .news-card, .section-header, .contact-info, .contact-form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =============================
// Download Modal
// =============================
const downloadModal = document.getElementById('downloadModal');
const modalGameName = document.getElementById('modalGameName');
const progressBar = document.getElementById('progressBar');

function showDownload(btn, gameName) {
  // Animate button
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
    Đang xử lý...
  `;
  btn.disabled = true;
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';

    // Show modal
    modalGameName.textContent = gameName;
    downloadModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate progress bar
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 100);
  }, 800);
}

function closeModal() {
  downloadModal.classList.remove('active');
  document.body.style.overflow = '';
  progressBar.style.width = '0%';
}

downloadModal.addEventListener('click', (e) => {
  if (e.target === downloadModal) closeModal();
});

// =============================
// Code Modal
// =============================
const codeModal = document.getElementById('codeModal');
const codeGameName = document.getElementById('codeGameName');

// Zalo and Facebook links
const zaloLink = "https://zalo.me/0367948006"; // Thay bằng số điện thoại/link zalo của bạn
const fbLink = "https://www.facebook.com/profile.php?id=61583939816663"; // Thay bằng link Fanpage của bạn

function showCodeModal(gameName) {
  codeGameName.textContent = gameName;
  codeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-zalo').href = zaloLink;
  document.getElementById('modal-facebook').href = fbLink;
}

function closeCodeModal() {
  codeModal.classList.remove('active');
  document.body.style.overflow = '';
}

codeModal.addEventListener('click', (e) => {
  if (e.target === codeModal) closeCodeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCodeModal();
  }
});

// Game name → APK download path mapping
const gameDownloadMap = {
  'Trấn Thi Hàng Quỷ': 'https://github.com/Hien160402/game-viet-mobile/releases/download/v1.0.0/TRANTHIHANGQUY.apk',
  'Thần Ma Giáng Thế': 'https://github.com/Hien160402/game-viet-mobile/releases/download/v1.0.0/THANMAGIANGTHE.apk',
  'Phù Sinh Mộng': 'https://github.com/Hien160402/game-viet-mobile/releases/download/v1.0.0/PHUSINHMONG.apk',
  'Huyết Cảnh Chi Vực': 'https://github.com/Hien160402/game-viet-mobile/releases/download/v1.0.0/HUYETCANHCHIVUC.apk',
  'Tân Binh Thức Tỉnh': 'https://github.com/Hien160402/game-viet-mobile/releases/download/v1.0.0/TANBINHTHUCTINH.apk',
};

// Download handler for both Android & iOS
function triggerDownload(gameName) {
  const apkPath = gameDownloadMap[gameName];
  if (apkPath) {
    const link = document.createElement('a');
    link.href = apkPath;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Đang tải ${gameName}...`);
  } else {
    showToast(`Không tìm thấy file tải cho ${gameName}`);
  }
  closeModal();
}

document.getElementById('modal-android').addEventListener('click', function (e) {
  e.preventDefault();
  triggerDownload(modalGameName.textContent);
});
document.getElementById('modal-ios').addEventListener('click', function (e) {
  e.preventDefault();
  triggerDownload(modalGameName.textContent);
});

// =============================
// Toast Notification
// =============================
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
let toastTimeout;

function showToast(message, duration = 3500) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}

// =============================
// Contact Form
// =============================
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const original = btn.innerHTML;
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
    Đang gửi...
  `;
  btn.disabled = true;
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Đã Gửi Thành Công!
    `;
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    showToast('✅ Tin nhắn của bạn đã được gửi thành công!');
    e.target.reset();

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      btn.style.opacity = '1';
    }, 3000);
  }, 1500);
}

// =============================
// Nav Link Active on Click
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================
// Card Tilt Effect (Desktop)
// =============================
if (window.innerWidth > 768) {
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// =============================
// Stats Counter Animation
// =============================
function animateCounter(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();
  const startVal = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = [5, 1000000, 4.9];
      const suffixes = ['+', '+', '★'];
      statNums.forEach((el, i) => {
        if (i === 1) {
          // Handle "1M+"
          let count = 0;
          const interval = setInterval(() => {
            count += 50000;
            if (count >= 1000000) {
              el.textContent = '1M+';
              clearInterval(interval);
            } else {
              el.textContent = (count / 1000).toFixed(0) + 'K+';
            }
          }, 30);
        } else if (i === 2) {
          el.textContent = '4.9★';
        } else {
          animateCounter(el, targets[i], suffixes[i]);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// =============================
// Lazy Loading Images (Fade-in)
// =============================
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    img.addEventListener('error', () => {
      img.classList.add('loaded');
    });
  }
});


// =============================
// Fetch Facebook News
// =============================
async function fetchFacebookNews() {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;

  try {
    const res = await fetch('/api/news');
    const data = await res.json();

    if (data.success && data.posts && data.posts.length > 0) {
      // Clear existing fallback cards
      newsGrid.innerHTML = '';

      data.posts.forEach((post, index) => {
        const article = document.createElement('article');
        article.className = `news-card${index === 0 ? ' news-featured' : ''}`;

        // Fallback gradients for placeholder graphics
        const gradients = [
          'linear-gradient(135deg, #7c3aed, #dc2626)',
          'linear-gradient(135deg, #2563eb, #12b981)',
          'linear-gradient(135deg, #f59e0b, #e11d48)',
          'linear-gradient(135deg, #db2777, #4f46e5)',
          'linear-gradient(135deg, #0984e3, #d63031)'
        ];
        const selectedGradient = gradients[index % gradients.length];

        const imageHTML = post.image 
          ? `<img src="${post.image}" alt="${post.title}" loading="lazy" onload="this.classList.add('loaded')" />`
          : `<div class="news-img-placeholder" style="background: ${selectedGradient}"><span>📰</span></div>`;

        let cardHTML = '';
        if (index === 0) {
          cardHTML = `
            <div class="news-image">
              ${imageHTML}
            </div>
            <div class="news-body">
              <span class="news-tag">Hot</span>
              <h3>${post.title}</h3>
              <p>${post.desc}</p>
              <div class="news-footer">
                <span class="news-date">${post.date}</span>
                <a href="${post.link}" target="_blank" class="news-read">Xem chi tiết →</a>
              </div>
            </div>
          `;
        } else {
          cardHTML = `
            <div class="news-body">
              <span class="news-tag">Tin tức</span>
              <h3>${post.title}</h3>
              <p>${post.desc}</p>
              <div class="news-footer">
                <span class="news-date">${post.date}</span>
                <a href="${post.link}" target="_blank" class="news-read">Xem chi tiết →</a>
              </div>
            </div>
          `;
        }

        article.innerHTML = cardHTML;
        newsGrid.appendChild(article);
      });
    }
  } catch (err) {
    console.warn('Failed to load Facebook news feed. Using static fallback cards.', err);
  }
}

// =============================
// Footer Year
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.querySelectorAll('.footer-bottom p').forEach(p => {
    p.innerHTML = p.innerHTML.replace('2025', year);
  });
  
  // Call Facebook news fetch
  fetchFacebookNews();
});
