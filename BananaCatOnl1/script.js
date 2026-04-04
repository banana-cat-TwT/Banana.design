// 开场动效 - 粒子系统
function createParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;
    
    const particleCount = 100;
    
    // 页面加载后立即开始
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // 随机大小
        const size = Math.random() * 5 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 随机颜色
        const colors = ['#ff6b6b', '#ff8e8e', '#ffcdd2', '#f48fb1'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 初始透明度为0，逐渐显示
        particle.style.opacity = 0;
        
        // 随机动画参数
        const duration = Math.random() * 3 + 2; // 较短的动画时间
        const rotate = Math.random() * 720;
        const translateX = (Math.random() - 0.5) * 200;
        const translateY = (Math.random() - 0.5) * 200;
        const delay = Math.random() * 0.5;
        
        // 设置动画，与三角形类似的效果
        particle.style.animation = `particleFloat ${duration}s ease-in-out forwards`;
        particle.style.animationDelay = delay + 's';
        particle.style.setProperty('--rotate', rotate + 'deg');
        particle.style.setProperty('--translate-x', translateX + 'px');
        particle.style.setProperty('--translate-y', translateY + 'px');
        
        container.appendChild(particle);
        
        // 逐渐显示粒子
        setTimeout(function() {
            particle.style.transition = 'opacity 0.5s ease';
            particle.style.opacity = Math.random() * 0.7 + 0.3;
        }, delay * 1000);
        
        // 0.5秒后开始逐渐消失
        setTimeout(function() {
            particle.style.transition = 'opacity 0.5s ease';
            particle.style.opacity = 0;
        }, (delay + 0.5) * 1000);
    }
}

// 前景灰烬特效
function createAshEffect() {
    const container = document.getElementById('ashContainer');
    if (!container) return;
    
    // 持续生成灰烬粒子
    setInterval(function() {
        const ash = document.createElement('div');
        ash.className = 'ash-particle';
        
        // 随机大小，更大且不统一
        const size = Math.random() * 6 + 3; // 3-9px
        ash.style.width = size + 'px';
        ash.style.height = size + 'px';
        
        // 随机位置（从整个顶部开始）
        ash.style.left = Math.random() * 100 + '%';
        ash.style.top = Math.random() * 10 + '%';
        
        // 随机动画参数，放慢0.5倍
        const duration = (Math.random() * 10 + 8) * 2; // 16-36秒，放慢0.5倍
        const delay = Math.random() * 2;
        const offsetX = (Math.random() - 0.5) * 200; // 左右摆动幅度
        const offsetY = (Math.random() - 0.5) * 100; // 上下摆动幅度
        
        // 设置动画和偏移量
        ash.style.animation = `ashFloat ${duration}s linear ${delay}s forwards`;
        ash.style.setProperty('--offset-x', offsetX + 'px');
        ash.style.setProperty('--offset-y', offsetY + 'px');
        
        container.appendChild(ash);
        
        // 动画结束后移除粒子
        setTimeout(function() {
            if (ash.parentNode) {
                ash.parentNode.removeChild(ash);
            }
        }, (duration + delay) * 1000);
    }, 200);
}

// 视差滚动效果
function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // 传统视差层
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
    
    // 几何形状视差
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
}

// 玻璃破碎效果
function createShatterEffect() {
    const shatterEffect = document.getElementById('shatterEffect');
    if (!shatterEffect) return;
    
    const pieceCount = 50;
    
    // 立即创建碎片
    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.className = 'shatter-piece';
        
        // 随机三角形大小
        const size = Math.random() * 20 + 15; // 15-35px
        const height = size * 1.732; // 等边三角形高度
        piece.style.width = '0';
        piece.style.height = '0';
        piece.style.borderLeft = size + 'px solid transparent';
        piece.style.borderRight = size + 'px solid transparent';
        piece.style.borderBottom = height + 'px solid rgba(255, 107, 107, 0.8)';
        
        // 居中定位
        piece.style.left = '50%';
        piece.style.top = '50%';
        piece.style.transform = 'translate(-50%, -50%)';
        
        // 随机动画参数
        const translateX = (Math.random() - 0.5) * 1000; // 飞散得更远
        const translateY = (Math.random() - 0.5) * 1000; // 飞散得更远
        const rotate = Math.random() * 720; // 旋转更多
        const delay = Math.random() * 0.5; // 延迟更长
        
        // 直接设置动画
        piece.style.animation = `shatterPiece 1s ease-out ${delay}s forwards`;
        piece.style.setProperty('--translate-x', translateX + 'px');
        piece.style.setProperty('--translate-y', translateY + 'px');
        piece.style.setProperty('--rotate', rotate + 'deg');
        
        shatterEffect.appendChild(piece);
    }
}

// 粒子消散特效
function createParticleDissolve() {
    const particleDissolve = document.getElementById('particleDissolve');
    if (!particleDissolve) return;
    
    const particleCount = 200;
    
    // 1.3秒后开始粒子消散
    setTimeout(function() {
        // 从文字位置生成粒子
        const titleChars = document.querySelectorAll('.title-char');
        titleChars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const splashRect = document.getElementById('splashScreen').getBoundingClientRect();
            
            const charX = rect.left - splashRect.left + rect.width / 2;
            const charY = rect.top - splashRect.top + rect.height / 2;
            
            // 为每个字符生成20个粒子
            for (let i = 0; i < 20; i++) {
                createParticle(particleDissolve, charX, charY);
            }
        });
        
        // 从三角形位置生成粒子
        const shatterPieces = document.querySelectorAll('.shatter-piece');
        shatterPieces.forEach(piece => {
            const rect = piece.getBoundingClientRect();
            const splashRect = document.getElementById('splashScreen').getBoundingClientRect();
            
            const pieceX = rect.left - splashRect.left + rect.width / 2;
            const pieceY = rect.top - splashRect.top + rect.height / 2;
            
            // 为每个三角形生成3个粒子
            for (let i = 0; i < 3; i++) {
                createParticle(particleDissolve, pieceX, pieceY);
            }
        });
    }, 1300);
}

// 创建单个粒子
function createParticle(container, x, y) {
    const particle = document.createElement('div');
    particle.className = 'dissolve-particle';
    
    // 随机大小
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // 从指定位置生成
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // 随机动画参数
    const translateX = (Math.random() - 0.5) * 600; // 与三角形不同的飞散距离
    const translateY = (Math.random() - 0.5) * 600; // 与三角形不同的飞散距离
    const rotate = Math.random() * 720; // 添加旋转效果，与三角形类似
    const delay = Math.random() * 0.5; // 与三角形类似的延迟
    
    // 直接设置动画
    particle.style.animation = `dissolveParticle 1.2s ease-out ${delay}s forwards`; // 与三角形类似的速度
    particle.style.setProperty('--translate-x', translateX + 'px');
    particle.style.setProperty('--translate-y', translateY + 'px');
    particle.style.setProperty('--rotate', rotate + 'deg');
    
    container.appendChild(particle);
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    createShatterEffect();
    
    // 启动前景灰烬特效
    createAshEffect();
    
    // 开场动画结束后启用页面滚动
    setTimeout(function() {
        document.body.classList.add('loaded');
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.remove();
        }
        
        // 开场动画结束后添加飘动的小圆点
        createParticles();
    }, 2000);
    
    // 使用requestAnimationFrame优化性能
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化
    updateParallax();
    
    // 启动鼠标拖尾特效
    createMouseTrail();
});

// 鼠标拖尾特效
function createMouseTrail() {
    const container = document.createElement('div');
    container.className = 'mouse-trail-container';
    document.body.appendChild(container);
    
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    let moveTimeout;
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // 计算移动距离
        const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
        
        // 只有当移动距离超过一定阈值时才生成粒子
        if (distance > 5) {
            createTrailParticle(container, x, y);
            lastX = x;
            lastY = y;
        }
        
        isMoving = true;
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(function() {
            isMoving = false;
        }, 100);
    });
}

// 创建拖尾粒子
function createTrailParticle(container, x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-trail-particle';
    
    // 随机大小
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // 设置位置
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // 随机颜色（粉色系）
    const colors = ['#ff6b6b', '#ff8e8e', '#ffcdd2', '#f48fb1', '#ffab91'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机动画参数
    const duration = Math.random() * 0.5 + 0.5;
    const delay = Math.random() * 0.2;
    
    // 设置动画
    particle.style.animation = `trailFade ${duration}s ease-out ${delay}s forwards`;
    
    container.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(function() {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

let slideIndex = 0;
const workItems = document.querySelectorAll('.work-card');
const slider = document.querySelector('.works-container');

// Hero slider
let heroSlideIndex = 0;
const heroSlider = document.querySelector('.hero-slider');
const heroItems = document.querySelectorAll('.hero-item');

function slideHero() {
    heroSlideIndex++;
    if (heroSlideIndex >= heroItems.length) {
        heroSlideIndex = 0;
    }
    heroSlider.style.transform = `translateX(-${heroSlideIndex * 100}%)`;
}

// Auto slide hero every 3 seconds
setInterval(slideHero, 3000);

const modal = document.getElementById('workDetailModal');

// 作品数据
const worksData = [
    {
        id: 1,
        title: '星际探险家',
        description: '一款融合Roguelike元素的太空探索游戏，玩家需要在随机生成的星系中生存并建立基地',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20exploration%20game%20cockpit%20view%2C%20futuristic%20UI%2C%20space%20scenery&image_size=landscape_16_9',
        tags: ['游戏开发', '2024'],
        tech: ['Unity', 'C#', 'Blender'],
        category: '游戏开发'
    },
    {
        id: 2,
        title: '现代UI设计',
        description: '一个现代简约风格的用户界面设计，注重用户体验和视觉美感',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20UI%20design%20dashboard%2C%20clean%20interface%2C%20minimalist&image_size=landscape_16_9',
        tags: ['UI设计', '2024'],
        tech: ['Figma', 'Adobe XD', 'Photoshop'],
        category: 'UI/UX设计'
    },
    {
        id: 3,
        title: '3D建模作品',
        description: '一个高质量的3D模型渲染，展示了逼真的材质和光照效果',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3D%20model%20render%2C%20realistic%20lighting%2C%20detailed%20textures&image_size=landscape_16_9',
        tags: ['3D建模', '2024'],
        tech: ['Blender', 'Substance Painter', 'Octane Render'],
        category: '3D设计'
    },
    {
        id: 4,
        title: '角色设计',
        description: '一个卡通风格的角色设计，具有独特的个性和造型',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20character%20design%2C%20colorful%2C%20stylized&image_size=landscape_16_9',
        tags: ['角色设计', '2024'],
        tech: ['Photoshop', 'Illustrator', 'Procreate'],
        category: '插画设计'
    },
    {
        id: 5,
        title: '游戏概念艺术',
        description: '一个奇幻世界的游戏概念艺术，展示了世界观和场景设计',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20world%20game%20concept%20art%2C%20magical%20landscape&image_size=landscape_16_9',
        tags: ['概念艺术', '2024'],
        tech: ['Photoshop', 'Blender', 'Maya'],
        category: '游戏美术'
    },
    {
        id: 6,
        title: '响应式网站设计',
        description: '一个响应式网站原型设计，适配不同设备屏幕尺寸',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=responsive%20website%20mockup%2C%20multiple%20devices%2C%20modern%20design&image_size=landscape_16_9',
        tags: ['网页设计', '2024'],
        tech: ['HTML/CSS', 'JavaScript', 'Figma'],
        category: '网页设计'
    }
];

function getVisibleItemsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
        return 1; // 桌面端显示1个
    } else if (screenWidth >= 768) {
        return 1; // 平板显示1个
    } else {
        return 1; // 移动端显示1个
    }
}

function getItemWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
        return 780; // 760px width + 20px gap
    } else if (screenWidth >= 768) {
        return 620; // 600px width + 20px gap
    } else {
        return 320; // 300px width + 20px gap
    }
}

function slideWorks(direction) {
    const visibleItems = getVisibleItemsCount();
    const itemWidth = getItemWidth();
    const maxIndex = Math.max(0, workItems.length - visibleItems);
    slideIndex = Math.max(0, Math.min(maxIndex, slideIndex + direction));
    slider.scrollLeft = slideIndex * itemWidth;
}

function openWorkDetail(workId) {
    const work = worksData.find(item => item.id === workId);
    if (work) {
        document.getElementById('workTitle').textContent = work.title;
        document.getElementById('workDescription').textContent = work.description;
        document.getElementById('workImage').src = work.image;
        
        // 更新标签
        const workTags = document.querySelector('.work-tags');
        workTags.innerHTML = '';
        work.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            workTags.appendChild(tagElement);
        });
        
        // 更新技术标签
        const techTags = document.querySelector('.tech-tags');
        techTags.innerHTML = '';
        work.tech.forEach(tech => {
            const techElement = document.createElement('span');
            techElement.className = 'tech-tag';
            techElement.textContent = tech;
            techTags.appendChild(techElement);
        });
        
        // 更新分类
        document.querySelector('.info-value').textContent = work.category;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeWorkDetail() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target == modal) {
        closeWorkDetail();
    }
}

// 键盘ESC关闭
window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeWorkDetail();
    }
};

// 角色切换功能
document.addEventListener('DOMContentLoaded', function() {
    const characterItems = document.querySelectorAll('.character-item');
    
    characterItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有角色项的active类
            characterItems.forEach(i => i.classList.remove('active'));
            // 添加当前角色项的active类
            this.classList.add('active');
        });
    });
});

// 角色卡片点击放大功能
document.addEventListener('DOMContentLoaded', function() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            // 检查当前卡片是否已经有active类
            if (this.classList.contains('active')) {
                // 如果已经有active类，则移除它（收缩）
                this.classList.remove('active');
            } else {
                // 如果没有active类，则移除所有卡片的active类，然后给当前卡片添加active类（放大）
                characterCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

// 视差滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // 使用requestAnimationFrame优化性能
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化
    updateParallax();
});

// 跟随导航功能
document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.getElementById('sideNav');
    const navToggleBtn = document.getElementById('navToggleBtn');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const navLinks = document.querySelectorAll('.side-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 切换导航展开/收起
    navToggleBtn.addEventListener('click', function() {
        sideNav.classList.add('expanded');
    });
    
    // 关闭导航
    navCloseBtn.addEventListener('click', function() {
        sideNav.classList.remove('expanded');
    });
    
    // 显示/隐藏导航按钮
    function toggleNav() {
        const scrolled = window.pageYOffset;
        const heroHeight = document.getElementById('hero').offsetHeight;
        
        if (scrolled > heroHeight * 0.3) {
            sideNav.classList.add('visible');
        } else {
            sideNav.classList.remove('visible');
            sideNav.classList.remove('expanded');
        }
    }
    
    // 高亮当前导航项
    function highlightNav() {
        const scrolled = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 点击导航链接后收起导航
                sideNav.classList.remove('expanded');
            }
        });
    });
    
    // 点击面板外部关闭导航
    document.addEventListener('click', function(e) {
        if (sideNav.classList.contains('expanded')) {
            if (!sideNav.contains(e.target) && !navToggleBtn.contains(e.target)) {
                sideNav.classList.remove('expanded');
            }
        }
    });
    
    // 监听滚动事件
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleNav();
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化
    toggleNav();
    highlightNav();
});