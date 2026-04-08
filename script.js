// ================================
// 动画和特效相关函数
// ================================

// 开场动效 - 粒子系统
function createParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;
    
    // 根据设备类型调整粒子数量
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 30 : 100;
    
    // 页面加载后立即开始
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // 随机大小
        const size = Math.random() * 5 + 7;
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
        // 检查设备性能，在移动设备上减少粒子生成
        const isMobile = window.innerWidth <= 768;
        if (isMobile && Math.random() > 0.5) return; // 移动设备上减少50%的粒子
        
        const ash = document.createElement('div');
        ash.className = 'ash-particle';
        
        // 随机大小，更大且不统一
        const size = Math.random() * 6 + 7; // 3-9px
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
    }, 300); // 增加间隔时间，减少粒子生成频率
}

// 鼠标拖尾特效
function createMouseTrail() {
    const container = document.createElement('div');
    container.className = 'mouse-trail-container';
    document.body.appendChild(container);
    
    // 检查是否为移动设备
    const isMobile = window.innerWidth <= 768;
    
    // 移动设备上禁用鼠标拖尾特效
    if (isMobile) return;
    
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
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// 视差滚动效果（处理parallax-bg元素）
function handleParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || 0.5);
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // 处理hero区域的视差效果
    const heroParallaxLayers = document.querySelectorAll('#hero .parallax-layer');
    heroParallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || 0.5);
        const yPos = -(window.pageYOffset * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
}

// 弹性滚动效果
function handleElasticScroll() {
    const elasticElements = document.querySelectorAll('.elastic-element');
    
    elasticElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
    
    // 为卡片元素添加进入动画
    const cardElements = document.querySelectorAll('.work-card, .character-card, .item-card, .game-item, .blog-card');
    cardElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
}

// 加载动画效果
function createLoadingEffect() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    
    // 检查元素是否存在
    if (!loadingBar || !loadingText) {
        return; // 如果元素不存在，直接返回
    }
    
    // 模拟加载过程
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loadingBar.style.width = progress + '%';
        
        // 更新加载文本
        if (progress < 30) {
            loadingText.textContent = '加载资源中...';
        } else if (progress < 60) {
            loadingText.textContent = '初始化页面...';
        } else if (progress < 90) {
            loadingText.textContent = '准备就绪...';
        } else {
            loadingText.textContent = '加载完成！';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 20);
}

// ================================
// 初始化和加载相关函数
// ================================

// 页面初始化
function initPage() {
    // 启动加载动画
    createLoadingEffect();
    
    // 启动前景灰烬特效
    createAshEffect();
    
    // 启动鼠标拖尾特效
    createMouseTrail();
    
    // 初始化视差效果
    updateParallax();
    handleParallax();
    
    // 初始化弹性滚动效果
    handleElasticScroll();
    
    // 初始化事件监听器
    initEventListeners();
    
    // 加载动画结束后启用页面滚动
    setTimeout(function() {
        document.body.classList.add('loaded');
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
        
        // 加载动画结束后添加飘动的小圆点
        createParticles();
    }, 2000);
}

// 初始化事件监听器
function initEventListeners() {
    // 滚动事件监听器（使用requestAnimationFrame优化性能）
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                handleParallax();
                handleElasticScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 作品分类功能
    const categoryBtns = document.querySelectorAll('.category-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            workCards.forEach(card => {
                if (category === '全部') {
                    card.style.display = 'block';
                } else {
                    // 获取作品的分类（这里假设作品卡片有一个data-category属性）
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // 角色卡片点击放大和翻转功能
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 检查点击的是否是详情按钮，如果是则不执行翻转逻辑
            if (e.target.classList.contains('character-detail-btn')) {
                return;
            }
            
            // 检查当前卡片是否已经有active类
            if (this.classList.contains('active')) {
                // 如果已经有active类，则移除它（收缩）
                this.classList.remove('active');
                this.classList.remove('flipped');
            } else {
                // 如果没有active类，则移除所有卡片的active类和flipped类，然后给当前卡片添加active类（放大）和flipped类（翻转）
                characterCards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('flipped');
                });
                this.classList.add('active');
                this.classList.add('flipped');
            }
        });
    });
    
    // 道具卡片翻转功能
    const itemCards = document.querySelectorAll('.item-card');
    
    itemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 检查点击的是否是详情按钮，如果是则不执行翻转逻辑
            if (e.target.classList.contains('item-detail-btn')) {
                return;
            }
            
            // 检查当前卡片是否已经有active类
            if (this.classList.contains('active')) {
                // 如果已经有active类，则移除它（收缩）
                this.classList.remove('active');
                this.classList.remove('flipped');
            } else {
                // 如果没有active类，则移除所有卡片的active类和flipped类，然后给当前卡片添加active类（放大）和flipped类（翻转）
                itemCards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('flipped');
                });
                this.classList.add('active');
                this.classList.add('flipped');
            }
        });
    });
    
    // 全局平滑滚动效果
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为所有可交互元素添加悬停动画
    const interactiveElements = document.querySelectorAll('button, a, .work-card, .game-card, .blog-card, .character-card');
    
    interactiveElements.forEach(element => {
        // 确保元素没有现有的悬停动画类
        if (!element.classList.contains('hover-animate')) {
            element.classList.add('hover-animate');
        }
    });
}

// 时间更新功能
const weekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekCn = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

function updateTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const day = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();

  document.getElementById('hour').textContent = hour;
  document.getElementById('minute').textContent = minute;
  document.getElementById('date-en').textContent = `${weekEn[day]}, ${monthEn[month]} ${date}`;
  document.getElementById('date-cn').textContent = weekCn[day];
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    initPage();
    updateTime();
    setInterval(updateTime, 1000);
});

// 鼠标拖尾特效
function createMouseTrail() {
    const container = document.createElement('div');
    container.className = 'mouse-trail-container';
    document.body.appendChild(container);
    
    // 检查是否为移动设备
    const isMobile = window.innerWidth <= 768;
    
    // 移动设备上禁用鼠标拖尾特效
    if (isMobile) return;
    
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
    if (heroSlider && heroItems.length > 0) {
        heroSlideIndex++;
        if (heroSlideIndex >= heroItems.length) {
            heroSlideIndex = 0;
        }
        heroSlider.style.transform = `translateX(-${heroSlideIndex * 100}%)`;
    }
}

// Auto slide hero every 3 seconds
if (heroSlider && heroItems.length > 0) {
    setInterval(slideHero, 3000);
}

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

// 角色数据
const charactersData = [
    {
        id: 1,
        name: '玫露露',
        subtitle: 'LULU',
        description: '穿梭茶会花园间传递甜意的信使少女',
        image: 'images/chahuixinshi2.png',
        attributes: {
            attack: 85,
            defense: 70,
            life: 75,
            speed: 60
        },
        rarity: 'SSR',
        type: '战士',
        element: '科幻',
        number: 'NO.001',
        backstory: '玫露露是穿梭茶会花园间传递甜意的信使少女，她拥有可爱的粉色外表和温柔的性格。她的使命是为人们带来快乐和甜蜜，是茶会花园中最受欢迎的角色之一。'
    },
    {
        id: 2,
        name: '凌川',
        subtitle: 'LingChuan',
        description: '行走江湖的年轻剑客，性情沉静，剑意凌厉',
        image: 'images/lingchuan.png',
        attributes: {
            attack: 65,
            defense: 45,
            life: 55,
            speed: 80
        },
        rarity: 'SR',
        type: '剑客',
        element: '风',
        number: 'NO.002',
        backstory: '凌川是一位行走江湖的年轻剑客，性情沉静，剑意凌厉。他从小习武，练就了一身精湛的剑术。他的剑法如风般迅猛，能够在瞬间击败对手。他游历四方，寻找更强的对手，不断提升自己的剑术。'
    },
    {
        id: 11,
        name: '绮瑶',
        subtitle: 'QIYAO',
        description: '气质温婉的古风少女，衣袂轻扬如云霞，举止端雅从容。',
        image: 'images/QIYAO.png',
        attributes: {
            attack: 95,
            defense: 60,
            life: 65,
            speed: 95
        },
        rarity: 'UR',
        type: '忍者',
        element: '赛博',
        number: 'NO.003',
        backstory: '绮瑶是一位气质温婉的古风少女，衣袂轻扬如云霞，举止端雅从容。她拥有神秘的力量，能够操控元素，是团队中的重要成员。'
    },
    {
        id: 4,
        name: '厄萨隆',
        subtitle: 'ESALONG',
        description: '深渊中苏醒的古老主宰，是战场尽头最令人畏惧的存在。',
        image: 'images/ESALONG.png',
        attributes: {
            attack: 80,
            defense: 50,
            life: 60,
            speed: 85
        },
        rarity: 'SSR',
        type: '主宰',
        element: '深渊',
        number: 'NO.004',
        backstory: '厄萨隆是深渊中苏醒的古老主宰，是战场尽头最令人畏惧的存在。他拥有强大的黑暗力量，能够操控深渊中的怪物。他的出现往往意味着毁灭和灾难，是所有生命的敌人。'
    },
    {
        id: 5,
        name: '格洛姆',
        subtitle: 'GELUOMU',
        description: '久经战阵的矮人战士，身披厚甲、手执战斧，以沉默与力量守护同伴。',
        image: 'images/GELUOMU2.png',
        attributes: {
            attack: 98,
            defense: 40,
            life: 50,
            speed: 70
        },
        rarity: 'UR',
        type: '战士',
        element: '力量',
        number: 'NO.005',
        backstory: '格洛姆是一位久经战阵的矮人战士，身披厚甲、手执战斧，以沉默与力量守护同伴。他经历过无数次战斗，积累了丰富的战斗经验。他的力量强大，能够轻松挥舞沉重的战斧，是团队中的坚实后盾。'
    },
    {
        id: 6,
        name: '埃里克',
        subtitle: 'AILIKE',
        description: '两国领土战争的雇佣兵，常年在秩序相对混乱的西部沙漠地区游荡。',
        image: 'images/AILIKE.png',
        attributes: {
            attack: 90,
            defense: 45,
            life: 55,
            speed: 92
        },
        rarity: 'SSR',
        type: '刺客',
        element: '暗影',
        number: 'NO.006',
        backstory: '埃里克是两国领土战争的雇佣兵，常年在秩序相对混乱的西部沙漠地区游荡。他身手敏捷，能够在复杂的环境中迅速行动。他的战斗经验丰富，是战场上最危险的杀手之一。'
    },
    {
        id: 7,
        name: '皮提亚',
        subtitle: 'PITIYA',
        description: '中东地区萨满部落的祭司，负责预测未来、解读神谕等工作。',
        image: 'images/PITIYA.png',
        attributes: {
            attack: 75,
            defense: 95,
            life: 90,
            speed: 50
        },
        rarity: 'UR',
        type: '祭司',
        element: '神谕',
        number: 'NO.007',
        backstory: '皮提亚是中东地区萨满部落的祭司，负责预测未来、解读神谕等工作。他拥有神秘的力量，能够与神灵沟通，预知未来的走向。他的智慧和洞察力是部落中最宝贵的财富。'
    },
    {
        id: 8,
        name: '库巴姬',
        subtitle: 'KUBAJI',
        description: '魔王血裔的支配者，以烈焰统御黑曜王城。',
        image: 'images/KUBAJI2.png',
        attributes: {
            attack: 92,
            defense: 80,
            life: 85,
            speed: 65
        },
        rarity: 'UR',
        type: '战士',
        element: '龙族',
        number: 'NO.008',
        backstory: '库巴姬是魔王血裔的支配者，以烈焰统御黑曜王城。她拥有强大的火焰力量，能够焚烧一切敌人。她的统治力强大，是黑曜王城的绝对主宰。她是龙族的后裔，继承了龙族的强大力量和统治本能。'
    },
    {
        id: 9,
        name: '莱昂',
        subtitle: 'LEON',
        description: '行走于废墟战场的孤锋战士，面对失序与烈火，他始终以钢铁意志守住最后的防线。',
        image: 'images/LAIANG.png',
        attributes: {
            attack: 88,
            defense: 55,
            life: 60,
            speed: 75
        },
        rarity: 'SSR',
        type: '战士',
        element: '火',
        number: 'NO.009',
        backstory: '莱昂是行走于废墟战场的孤锋战士，面对失序与烈火，他始终以钢铁意志守住最后的防线。他经历了无数次战斗，身上布满了伤痕，但他的意志从未动摇。他的剑术精湛，能够在战场上所向披靡，是团队中的核心力量。'
    },
    {
        id: 3,
        name: '墨芽',
        subtitle: 'MOYA',
        description: '一位热爱记录与探索的少年学者。',
        image: 'images/moya2.png',
        attributes: {
            attack: 65,
            defense: 45,
            life: 55,
            speed: 80
        },
        rarity: 'SR',
        type: '学者',
        element: '民族风',
        number: 'NO.010',
        backstory: '墨芽是一位热爱记录与探索的少年学者，他游历四方，记录各地的风土人情和历史文化。他随身携带一本厚重的笔记本，里面记载着他的所见所闻。虽然他没有强大的战斗能力，但他的知识和智慧是团队中不可或缺的财富。'
    },
    {
        id: 10,
        name: '赫洛斯',
        subtitle: 'HELUOSI',
        description: '斯巴达战火中锤炼而成的勇士，以赤红战袍与钢铁意志背负城邦荣耀。',
        image: 'images/HELUOSI2.png',
        attributes: {
            attack: 85,
            defense: 60,
            life: 70,
            speed: 75
        },
        rarity: 'SSR',
        type: '战士',
        element: '光明',
        number: 'NO.010',
        backstory: '赫洛斯是斯巴达战火中锤炼而成的勇士，以赤红战袍与钢铁意志背负城邦荣耀。他经历了无数次战斗，在血与火的洗礼中成长为一名真正的战士。他的勇气和力量激励着他的战友，是斯巴达城邦的骄傲。'
    }
];

// 关于我数据
const aboutData = [
    {
        id: 1,
        title: '实习经历',
        subtitle: '前端开发实习生',
        date: '2025年7月 - 2025年9月',
        company: '科技有限公司',
        description: '负责公司官网和内部系统的前端开发，使用React、Vue等框架，参与了多个项目的开发和维护。',
        details: '在实习期间，我参与了公司官网的改版项目，使用React和TypeScript开发了新的前端界面，提高了网站的性能和用户体验。同时，我还参与了内部管理系统的开发，负责用户权限管理和数据可视化模块的实现。通过这次实习，我不仅提高了前端开发技能，还学习了团队协作和项目管理的经验。'
    },
    {
        id: 2,
        title: '实习经历',
        subtitle: '游戏开发实习生',
        date: '2024年7月 - 2024年8月',
        company: '游戏工作室',
        description: '参与了一款休闲游戏的开发，负责游戏逻辑和界面的实现，使用Unity引擎和C#语言。',
        details: '在实习期间，我参与了一款休闲游戏的开发，负责游戏核心逻辑的实现和UI界面的设计。我使用Unity引擎和C#语言，实现了游戏的主要功能，包括玩家控制、敌人AI、碰撞检测和分数系统等。同时，我还参与了游戏的测试和优化工作，确保游戏的稳定性和流畅性。通过这次实习，我对游戏开发的流程有了更深入的了解，提高了自己的编程能力和问题解决能力。'
    },
    {
        id: 3,
        title: '项目经历',
        subtitle: '个人作品集',
        date: '2025年1月 - 2026年',
        company: '个人项目',
        description: '使用HTML、CSS、JavaScript开发的个人作品集网站，展示了我的作品、小游戏和开发日志。',
        details: '个人作品集网站是我从2025年1月开始开发的一个项目，旨在展示我的个人作品和技能。网站使用了现代的前端技术，包括HTML5、CSS3和JavaScript，实现了响应式设计和交互效果。网站包含了作品展示、角色展示、小游戏和开发日志等多个模块，每个模块都有详细的内容和交互功能。通过这个项目，我不仅提高了前端开发技能，还学习了网站设计和用户体验的知识。'
    },
    {
        id: 4,
        title: '项目经历',
        subtitle: '像素忍者',
        date: '2025年10月 - 2025年11月',
        company: '个人项目',
        description: '使用Unity开发的像素风格横版动作游戏，包含20个关卡和多种敌人类型。',
        details: '《像素忍者》是我在2025年10月开发的一款横版动作游戏，使用Unity引擎和C#语言。游戏采用像素风格的美术设计，包含20个精心设计的关卡和多种敌人类型。玩家需要控制忍者角色，通过跳跃、攻击和躲避障碍物来完成关卡。游戏还包含了道具系统和成就系统，增加了游戏的可玩性。通过这个项目，我学习了游戏开发的基本流程和技术，提高了自己的编程能力和游戏设计能力。'
    },
    {
        id: 5,
        title: '项目经历',
        subtitle: '智能家居App UI设计',
        date: '2025年8月 - 2025年9月',
        company: '个人项目',
        description: '为智能家居系统设计的移动应用界面，注重用户体验和功能完整性。',
        details: '智能家居App UI设计是我在2025年8月完成的一个UI设计项目，旨在为智能家居系统设计一个直观、易用的移动应用界面。我使用Figma和Adobe XD等设计工具，设计了应用的整体布局、色彩方案和交互流程。设计中注重用户体验和功能完整性，确保用户能够轻松控制家中的智能设备。通过这个项目，我学习了UI设计的基本原理和方法，提高了自己的设计能力和审美水平。'
    },
    {
        id: 6,
        title: '教育经历',
        subtitle: '计算机科学与技术',
        date: '2022年9月 - 2026年6月',
        company: '大学',
        description: '主修课程：数据结构、算法设计、计算机网络、操作系统、数据库原理、软件工程等。',
        details: '在大学期间，我学习了计算机科学与技术专业的核心课程，包括数据结构、算法设计、计算机网络、操作系统、数据库原理和软件工程等。通过这些课程的学习，我掌握了计算机科学的基本理论和方法，为我的职业发展打下了坚实的基础。同时，我还积极参与了各种实践活动和项目，提高了自己的实际应用能力。'
    },
    {
        id: 7,
        title: '毕业论文',
        subtitle: '基于深度学习的游戏AI行为规划研究',
        date: '2026年3月 - 2026年6月',
        company: '大学',
        description: '研究了如何使用深度学习技术改进游戏中AI角色的行为决策，提高游戏的可玩性和挑战性。',
        details: '我的毕业论文研究了如何使用深度学习技术改进游戏中AI角色的行为决策。通过实验验证了方法的有效性，取得了良好的研究成果。论文主要探讨了使用深度强化学习算法来训练游戏AI，使其能够根据游戏环境和玩家行为做出更加智能的决策。研究结果表明，使用深度学习技术可以显著提高游戏AI的表现，使游戏更加具有挑战性和可玩性。'
    },
    {
        id: 8,
        title: '校园经历',
        subtitle: '计算机协会会长',
        date: '2024年9月 - 2025年6月',
        company: '大学',
        description: '组织了多次技术讲座和编程竞赛，提高了协会成员的技术水平和团队协作能力。',
        details: '在担任计算机协会会长期间，我组织了多次技术讲座和编程竞赛，邀请了行业专家和学长学姐分享经验和知识。同时，我还带领协会成员参加了各种编程比赛和项目开发，提高了大家的技术水平和团队协作能力。通过这些活动，我不仅锻炼了自己的组织能力和领导能力，还建立了良好的人际关系。'
    },
    {
        id: 9,
        title: '校园经历',
        subtitle: '校运动会志愿者',
        date: '2023年10月',
        company: '大学',
        description: '参与了校运动会的组织和服务工作，负责运动员的签到和赛事安排。',
        details: '在2023年校运动会期间，我作为志愿者参与了运动会的组织和服务工作。我的主要职责包括运动员的签到、赛事安排和场地维护等。通过这次志愿者经历，我学习了如何在团队中协作，提高了自己的沟通能力和服务意识。'
    },
    {
        id: 10,
        title: '兴趣爱好',
        subtitle: '游戏开发',
        date: '2022年至今',
        company: '个人爱好',
        description: '利用课余时间开发小型游戏，学习游戏引擎和游戏设计原理。',
        details: '游戏开发是我最大的兴趣爱好之一，我利用课余时间学习Unity和Unreal Engine等游戏引擎，开发小型游戏项目。通过这些项目，我不仅学习了游戏开发的技术，还培养了自己的创造力和解决问题的能力。我相信，通过不断的学习和实践，我可以在游戏开发领域取得更大的成就。'
    },
    {
        id: 11,
        title: '兴趣爱好',
        subtitle: '前端开发',
        date: '2023年至今',
        company: '个人爱好',
        description: '学习最新的前端技术和框架，开发个人项目和网站。',
        details: '前端开发是我的另一个兴趣爱好，我关注最新的前端技术和框架，如React、Vue和Angular等。我通过开发个人项目和网站来实践所学的知识，不断提高自己的前端开发技能。我相信，前端开发是一个充满创造力和挑战的领域，我会继续努力学习和实践。'
    },
    {
        id: 12,
        title: '兴趣爱好',
        subtitle: '阅读',
        date: '一直以来',
        company: '个人爱好',
        description: '喜欢阅读技术书籍和科幻小说，不断扩展自己的知识领域。',
        details: '阅读是我一直以来的爱好，我喜欢阅读技术书籍和科幻小说。通过阅读技术书籍，我可以学习最新的技术知识和行业动态；通过阅读科幻小说，我可以拓展自己的想象力和思维方式。我相信，阅读是获取知识和灵感的重要途径，我会继续保持阅读的习惯。'
    },
    {
        id: 13,
        title: '兴趣爱好',
        subtitle: '运动',
        date: '一直以来',
        company: '个人爱好',
        description: '定期进行篮球、跑步等运动，保持身体健康。',
        details: '运动是我保持身体健康的重要方式，我定期进行篮球、跑步等运动。通过运动，我不仅可以保持身体健康，还可以缓解学习和工作的压力。我相信，健康的身体是实现人生目标的基础，我会继续保持运动的习惯。'
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



// 打开作品详情
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
        
        // 获取作品模态框
        const modal = document.getElementById('workDetailModal');
        
        // 添加动画效果
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭作品详情
function closeWorkDetail() {
    const modal = document.getElementById('workDetailModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// 打开角色详情
function openCharacterDetail(characterId) {
    const character = charactersData.find(item => item.id === characterId);
    if (character) {
        document.getElementById('characterTitle').textContent = character.name;
        document.getElementById('characterSubtitle').textContent = character.subtitle;
        document.getElementById('characterDescription').textContent = character.description;
        document.getElementById('characterImage').src = character.image;
        
        // 更新属性
        const attributes = document.querySelectorAll('.character-attributes-modal .attr-value');
        attributes[0].textContent = character.attributes.attack;
        attributes[1].textContent = character.attributes.defense;
        attributes[2].textContent = character.attributes.life;
        attributes[3].textContent = character.attributes.speed;
        
        // 更新角色信息
        document.getElementById('characterRarity').textContent = character.rarity;
        document.getElementById('characterType').textContent = character.type;
        document.getElementById('characterElement').textContent = character.element;
        document.getElementById('characterNumber').textContent = character.number;
        
        // 更新背景故事
        document.getElementById('characterBackstory').textContent = character.backstory;
        
        // 获取角色模态框
        const characterModal = document.getElementById('characterDetailModal');
        
        // 移除所有角色特定的模态框类
        characterModal.classList.remove('lingchuan-modal', 'lulu-modal', 'moya-modal', 'qiyao-modal', 'glomu-modal', 'ersalong-modal', 'eric-modal', 'pitiya-modal', 'kubaji-modal', 'leon-modal', 'character-modal-new');
        
        // 根据角色ID添加对应的模态框类
        if (characterId === 2) {
            characterModal.classList.add('lingchuan-modal');
        } else if (characterId === 1) {
            characterModal.classList.add('lulu-modal');
        } else if (characterId === 3) {
            characterModal.classList.add('moya-modal');
        } else if (characterId === 10) {
            characterModal.classList.add('character-modal-new');
        } else if (characterId === 11) {
            characterModal.classList.add('qiyao-modal');
        } else if (characterId === 5) {
            characterModal.classList.add('glomu-modal');
        } else if (characterId === 4) {
            characterModal.classList.add('ersalong-modal');
        } else if (characterId === 6) {
            characterModal.classList.add('eric-modal');
        } else if (characterId === 7) {
            characterModal.classList.add('pitiya-modal');
        } else if (characterId === 8) {
            characterModal.classList.add('kubaji-modal');
        } else if (characterId === 9) {
            characterModal.classList.add('leon-modal');
        }
        
        // 添加动画效果
        characterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭角色详情
function closeCharacterDetail() {
    const characterModal = document.getElementById('characterDetailModal');
    if (characterModal) {
        characterModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// 打开关于我详情
function openAboutDetail(aboutId) {
    const aboutItem = aboutData.find(item => item.id === aboutId);
    if (aboutItem) {
        document.getElementById('aboutTitle').textContent = aboutItem.title;
        document.getElementById('aboutSubtitle').textContent = aboutItem.subtitle;
        document.getElementById('aboutDate').textContent = aboutItem.date;
        document.getElementById('aboutCompany').textContent = aboutItem.company;
        document.getElementById('aboutDescription').textContent = aboutItem.description;
        
        // 更新详细内容
        document.getElementById('aboutDetailsContent').innerHTML = `<p>${aboutItem.details}</p>`;
        
        // 获取关于我模态框
        const aboutModal = document.getElementById('aboutDetailModal');
        
        // 添加动画效果
        aboutModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭关于我详情
function closeAboutDetail() {
    const aboutModal = document.getElementById('aboutDetailModal');
    if (aboutModal) {
        aboutModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('workDetailModal');
    const characterModal = document.getElementById('characterDetailModal');
    const aboutModal = document.getElementById('aboutDetailModal');
    
    if (event.target == modal) {
        closeWorkDetail();
    }
    if (event.target == characterModal) {
        closeCharacterDetail();
    }
    if (event.target == aboutModal) {
        closeAboutDetail();
    }
};

// 键盘ESC关闭
window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeWorkDetail();
        closeCharacterDetail();
        closeAboutDetail();
    }
};

// 作品分类功能
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            workCards.forEach(card => {
                if (category === '全部') {
                    card.style.display = 'block';
                } else {
                    // 获取作品的分类（这里假设作品卡片有一个data-category属性）
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// 视差滚动效果
function handleParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || 0.5);
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // 处理hero区域的视差效果
    const heroParallaxLayers = document.querySelectorAll('#hero .parallax-layer');
    heroParallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || 0.5);
        const yPos = -(window.pageYOffset * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
}

// 监听滚动事件
window.addEventListener('scroll', handleParallax);

// 初始调用一次
window.addEventListener('load', handleParallax);

// 弹性滚动效果
function handleElasticScroll() {
    const elasticElements = document.querySelectorAll('.elastic-element');
    
    elasticElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
}

// 监听滚动事件
window.addEventListener('scroll', handleElasticScroll);

// 初始调用一次
window.addEventListener('load', handleElasticScroll);



// 道具数据
const itemsData = [
    {
        id: 1,
        name: '魔法剑',
        subtitle: 'MAGIC SWORD',
        description: '一把蕴含强大魔法力量的剑，能够释放元素攻击',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20sword%20fantasy%20weapon%2C%20glowing%20blade%2C%20ornate%20design&image_size=square',
        attributes: {
            attack: 50,
            magic: 20,
            rarity: 'SSR'
        },
        rarity: 'SSR',
        type: '武器',
        element: '魔法',
        number: 'NO.001',
        backstory: '这把魔法剑由古代魔法师打造，剑身蕴含着强大的魔法力量。当持有者挥动它时，能够释放出元素攻击，对敌人造成巨大伤害。'
    },
    {
        id: 2,
        name: '魔法盾',
        subtitle: 'MAGIC SHIELD',
        description: '能够吸收魔法攻击的盾牌，提供强大的防御能力',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20shield%20fantasy%20defense%2C%20glowing%20runestones%2C%20ornate%20design&image_size=square',
        attributes: {
            defense: 40,
            magicResist: 30,
            rarity: 'SR'
        },
        rarity: 'SR',
        type: '防具',
        element: '魔法',
        number: 'NO.002',
        backstory: '魔法盾是由矮人工匠精心打造的防御装备，能够吸收和反弹魔法攻击。它的表面刻有古老的符文，赋予了它强大的魔法抗性。'
    },
    {
        id: 3,
        name: '生命药水',
        subtitle: 'HEALTH POTION',
        description: '能够瞬间恢复大量生命值的神奇药水',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20potion%20fantasy%20item%2C%20red%20liquid%2C%20magical%20glow&image_size=square',
        attributes: {
            health: 200,
            uses: 1,
            rarity: 'R'
        },
        rarity: 'R',
        type: '消耗品',
        element: '生命',
        number: 'NO.003',
        backstory: '生命药水是由炼金术士用稀有草药和魔法水晶制作的神奇药剂。饮用后能够瞬间恢复大量生命值，是冒险者必备的物品。'
    },
    {
        id: 4,
        name: '魔法卷轴',
        subtitle: 'MAGIC SCROLL',
        description: '记载着强大魔法咒语的古老卷轴',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magic%20scroll%20fantasy%20item%2C%20ancient%20paper%2C%20glowing%20runes&image_size=square',
        attributes: {
            magicDamage: 100,
            uses: 1,
            rarity: 'SR'
        },
        rarity: 'SR',
        type: '消耗品',
        element: '魔法',
        number: 'NO.004',
        backstory: '魔法卷轴是由古代魔法师撰写的，上面记载着强大的魔法咒语。使用时会释放出卷轴中蕴含的魔法能量，对敌人造成巨大伤害。'
    },
    {
        id: 5,
        name: '魔法戒指',
        subtitle: 'ENCHANTED RING',
        description: '能够增强魔法能力的神奇戒指',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=enchanted%20ring%20fantasy%20jewelry%2C%20glowing%20gems%2C%20ornate%20design&image_size=square',
        attributes: {
            magic: 30,
            magicRegen: 10,
            rarity: 'SSR'
        },
        rarity: 'SSR',
        type: '饰品',
        element: '魔法',
        number: 'NO.005',
        backstory: '魔法戒指是由精灵工匠用魔法水晶打造的饰品。佩戴后能够增强持有者的魔法能力，加快魔法值的恢复速度，是魔法师的最爱。'
    },
    {
        id: 6,
        name: '魔法 armor',
        subtitle: 'ENCHANTED ARMOR',
        description: '能够提供强大防御能力的魔法 armor',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=enchanted%20armor%20fantasy%20defense%2C%20glowing%20runes%2C%20ornate%20design&image_size=square',
        attributes: {
            defense: 50,
            magicResist: 25,
            rarity: 'SSR'
        },
        rarity: 'SSR',
        type: '防具',
        element: '魔法',
        number: 'NO.006',
        backstory: '魔法 armor是由矮人铁匠用稀有金属和魔法符文打造的防具。穿戴后能够提供强大的防御能力和魔法抗性，是战士的理想选择。'
    },
    {
        id: 7,
        name: '魔法靴子',
        subtitle: 'MAGIC BOOTS',
        description: '能够提升移动速度的魔法靴子',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20boots%20fantasy%20footwear%2C%20glowing%20gems%2C%20ornate%20design&image_size=square',
        attributes: {
            speed: 30,
            agility: 20,
            rarity: 'SR'
        },
        rarity: 'SR',
        type: '防具',
        element: '魔法',
        number: 'NO.007',
        backstory: '魔法靴子是由精灵鞋匠用魔法皮革制作的 footwear。穿戴后能够提升移动速度和敏捷度，使穿戴者行动更加迅速。'
    },
    {
        id: 8,
        name: '魔法护身符',
        subtitle: 'MAGIC AMULET',
        description: '能够提供额外魔法保护的护身符',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20amulet%20fantasy%20jewelry%2C%20glowing%20gems%2C%20ornate%20design&image_size=square',
        attributes: {
            magicResist: 35,
            health: 100,
            rarity: 'SSR'
        },
        rarity: 'SSR',
        type: '饰品',
        element: '魔法',
        number: 'NO.008',
        backstory: '魔法护身符是由祭司用神圣水晶制作的饰品。佩戴后能够提供额外的魔法保护和生命值，是冒险者的重要保障。'
    },
    {
        id: 9,
        name: '魔法药水',
        subtitle: 'MAGIC POTION',
        description: '能够瞬间恢复大量魔法值的神奇药水',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magic%20potion%20fantasy%20item%2C%20blue%20liquid%2C%20magical%20glow&image_size=square',
        attributes: {
            magic: 150,
            uses: 1,
            rarity: 'R'
        },
        rarity: 'R',
        type: '消耗品',
        element: '魔法',
        number: 'NO.009',
        backstory: '魔法药水是由炼金术士用魔法草药和蓝色水晶制作的药剂。饮用后能够瞬间恢复大量魔法值，是魔法师的必备物品。'
    }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();
    
    // 道具卡片翻转功能
    const itemCards = document.querySelectorAll('.item-card');
    
    itemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 检查点击的是否是详情按钮，如果是则不执行翻转逻辑
            if (e.target.classList.contains('item-detail-btn')) {
                return;
            }
            
            // 检查当前卡片是否已经有active类
            if (this.classList.contains('active')) {
                // 如果已经有active类，则移除它（收缩）
                this.classList.remove('active');
                this.classList.remove('flipped');
            } else {
                // 如果没有active类，则移除所有卡片的active类和flipped类，然后给当前卡片添加active类（放大）和flipped类（翻转）
                itemCards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('flipped');
                });
                this.classList.add('active');
                this.classList.add('flipped');
            }
        });
    });
});



function openItemDetail(itemId) {
    const item = itemsData.find(item => item.id === itemId);
    if (item) {
        document.getElementById('itemTitle').textContent = item.name;
        document.getElementById('itemSubtitle').textContent = item.subtitle;
        document.getElementById('itemDescription').textContent = item.description;
        document.getElementById('itemImage').src = item.image;
        
        // 更新属性
        const attributes = document.querySelectorAll('.item-attributes-modal .attr-value');
        // 清空现有属性
        const attributesContainer = document.querySelector('.item-attributes-modal');
        attributesContainer.innerHTML = '';
        
        // 添加道具属性
        for (const [key, value] of Object.entries(item.attributes)) {
            if (key !== 'rarity') {
                const attrElement = document.createElement('div');
                attrElement.className = 'attribute';
                attrElement.innerHTML = `
                    <span class="attr-name">${getAttrName(key)}</span>
                    <span class="attr-value">${value}</span>
                `;
                attributesContainer.appendChild(attrElement);
            }
        }
        
        // 更新道具信息
        document.getElementById('itemRarity').textContent = item.rarity;
        document.getElementById('itemType').textContent = item.type;
        document.getElementById('itemElement').textContent = item.element;
        document.getElementById('itemNumber').textContent = item.number;
        
        // 更新背景故事
        document.getElementById('itemBackstory').textContent = item.backstory;
        
        // 获取道具模态框
        const itemModal = document.getElementById('item-detail-modal');
        
        // 添加动画效果
        itemModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function getAttrName(key) {
    const attrNames = {
        attack: '攻击力',
        defense: '防御力',
        magic: '魔法值',
        magicResist: '魔法抗性',
        health: '生命值',
        uses: '使用次数',
        magicDamage: '魔法伤害',
        magicRegen: '魔法回复'
    };
    return attrNames[key] || key;
}

function closeItemDetail() {
    const itemModal = document.getElementById('item-detail-modal');
    if (itemModal) {
        itemModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('workDetailModal');
    const characterModal = document.getElementById('characterDetailModal');
    const aboutModal = document.getElementById('aboutDetailModal');
    const itemModal = document.getElementById('item-detail-modal');
    
    if (event.target == modal) {
        closeWorkDetail();
    }
    if (event.target == characterModal) {
        closeCharacterDetail();
    }
    if (event.target == aboutModal) {
        closeAboutDetail();
    }
    if (event.target == itemModal) {
        closeItemDetail();
    }
};

// 键盘ESC关闭
window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeWorkDetail();
        closeCharacterDetail();
        closeAboutDetail();
        closeItemDetail();
    }
};

// 角色卡片点击放大和翻转功能
document.addEventListener('DOMContentLoaded', function() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 检查点击的是否是详情按钮，如果是则不执行翻转逻辑
            if (e.target.classList.contains('character-detail-btn')) {
                return;
            }
            
            // 检查当前卡片是否已经有active类
            if (this.classList.contains('active')) {
                // 如果已经有active类，则移除它（收缩）
                this.classList.remove('active');
                this.classList.remove('flipped');
            } else {
                // 如果没有active类，则移除所有卡片的active类和flipped类，然后给当前卡片添加active类（放大）和flipped类（翻转）
                characterCards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('flipped');
                });
                this.classList.add('active');
                this.classList.add('flipped');
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

// 全局平滑滚动效果
document.addEventListener('DOMContentLoaded', function() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为所有可交互元素添加悬停动画
    const interactiveElements = document.querySelectorAll('button, a, .work-card, .game-card, .blog-card, .character-card');
    
    interactiveElements.forEach(element => {
        // 确保元素没有现有的悬停动画类
        if (!element.classList.contains('hover-animate')) {
            element.classList.add('hover-animate');
        }
    });
});

// 导航图标拖动功能
document.addEventListener('DOMContentLoaded', function() {
    const navToggleBtn = document.getElementById('navToggleBtn');
    let isDragging = false;
    let offsetX, offsetY;
    
    navToggleBtn.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - navToggleBtn.getBoundingClientRect().left;
        offsetY = e.clientY - navToggleBtn.getBoundingClientRect().top;
        navToggleBtn.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // 限制在视窗内
            const maxX = window.innerWidth - navToggleBtn.offsetWidth;
            const maxY = window.innerHeight - navToggleBtn.offsetHeight;
            
            const constrainedX = Math.max(0, Math.min(maxX, x));
            const constrainedY = Math.max(0, Math.min(maxY, y));
            
            navToggleBtn.style.left = constrainedX + 'px';
            navToggleBtn.style.top = constrainedY + 'px';
            navToggleBtn.style.position = 'fixed';
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            navToggleBtn.style.cursor = 'grab';
        }
    });
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
        // 始终保持导航按钮可见
        sideNav.classList.add('visible');
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

// 动态背景切换效果
function initBackgroundSlider() {
    const slider = document.getElementById('backgroundSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.background-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function nextSlide() {
        // 隐藏当前幻灯片
        slides[currentSlide].classList.remove('active');
        
        // 切换到下一张幻灯片
        currentSlide = (currentSlide + 1) % slideCount;
        
        // 显示下一张幻灯片
        slides[currentSlide].classList.add('active');
    }
    
    // 每5秒切换一次背景
    setInterval(nextSlide, 5000);
}

// 页面加载完成后初始化背景切换
// initBackgroundSlider();
// initMessageBoard();

// 初始化留言板功能
function initMessageBoard() {
    // 获取DOM元素
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messagesContainer');
    
    if (!messageForm || !messagesContainer) return;
    
    // 添加示例留言
    addSampleMessages();
    
    // 监听表单提交事件
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 创建新留言
        const newMessage = createMessageItem(name, message);
        
        // 添加到留言列表
        messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
        
        // 清空表单
        messageForm.reset();
        
        // 显示成功提示
        alert('留言提交成功！');
    });
}

// 创建留言元素
function createMessageItem(name, content) {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    
    // 获取当前日期
    const now = new Date();
    const dateString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    messageItem.innerHTML = `
        <div class="message-header">
            <span class="message-name">${name}</span>
            <span class="message-date">${dateString}</span>
        </div>
        <p class="message-content">${content}</p>
    `;
    
    return messageItem;
}

// 添加示例留言
function addSampleMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    const sampleMessages = [
        {
            name: '张三',
            content: '网站设计得非常漂亮，特别是角色展示部分的交互效果，很有创意！'
        },
        {
            name: '李四',
            content: '小游戏板块的详情页面做得很用心，希望能看到更多作品。'
        },
        {
            name: '王五',
            content: '开发日志写得很详细，学到了很多东西，感谢分享！'
        }
    ];
    
    sampleMessages.forEach(message => {
        const messageItem = createMessageItem(message.name, message.content);
        messagesContainer.appendChild(messageItem);
    });
}