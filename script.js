document.addEventListener('DOMContentLoaded', function() {
    // 初始化技能条
    initializeSkillBars();
    
    // 添加滚动动画
    addScrollAnimation();
    
    // 添加导航栏滚动效果
    handleNavigation();
});

// 初始化技能条
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.setProperty('--percent', `${percent}%`);
    });
}

// 添加滚动动画
function addScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.achievement-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    skillItems.forEach(item => observer.observe(item));
}

// 处理导航
function handleNavigation() {
    const nav = document.querySelector('.nav-bar');
    let lastScroll = 0;
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 添加视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled * 0.003);
    }
});

// 添加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后的额外效果
window.addEventListener('load', () => {
    // 添加加载动画
    document.body.classList.add('loaded');
    
    // 为标题添加打字机效果
    const title = document.querySelector('.title');
    if (title) {
        typeWriter(title, title.textContent);
    }
});
