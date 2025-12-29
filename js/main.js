// main.js
console.log('TPE Co Website Loaded');

// اسکرول نرم
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// تغییر رنگ ناوبری هنگام اسکرول
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.85)';
        nav.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.05)';
    }
});

// فعال کردن لینک فعلی
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === 'index.html' && currentPage.endsWith('/')) {
            link.classList.add('active');
        } else if (currentPage.includes(linkHref)) {
            link.classList.add('active');
        }
    });
});
