// اسکرول نرم برای لینک‌های داخلی
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// مدیریت فعال بودن لینک‌های ناوبری
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// توقف انیمیشن اسکرول هنگام هاور
document.querySelectorAll('.gallery-scroll, .logos-scroll').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.animationPlayState = 'paused';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.animationPlayState = 'running';
  });
});

// افکت پارالاکس برای هرو
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
  
  updateActiveNavLink();
});

// مدیریت ریسپانسیو منو
function initMobileMenu() {
  const nav = document.querySelector('.nav-links');
  const menuToggle = document.createElement('button');
  menuToggle.innerHTML = '☰';
  menuToggle.className = 'menu-toggle';
  menuToggle.style.display = 'none';
  
  document.querySelector('.nav-wrap').appendChild(menuToggle);
  
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
  
  // مخفی کردن منو هنگام کلیک روی لینک
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
    });
  });
  
  // نمایش/مخفی کردن منو بر اساس سایز صفحه
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
      nav.classList.remove('show');
    }
  });
  
  // اجرای اولیه
  if (window.innerWidth <= 768) {
    menuToggle.style.display = 'block';
  }
}

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  initMobileMenu();
  
  // افزودن استایل برای منوی موبایل
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .nav-links {
        position: fixed;
        top: 60px;
        right: -100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        width: 80%;
        height: calc(100vh - 60px);
        flex-direction: column;
        padding: 20px;
        transition: right 0.3s ease;
        z-index: 1000;
      }
      
      .nav-links.show {
        right: 0;
      }
      
      .nav-links a {
        padding: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .menu-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
      }
    }
  `;
  document.head.appendChild(style);
});
