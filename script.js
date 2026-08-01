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
        particle.style.animation = 'particleFloat ' + duration + 's ease-in-out forwards';
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
        ash.style.animation = 'ashFloat ' + duration + 's linear ' + delay + 's forwards';
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
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
        
        // 加载动画结束后添加飘动的小圆点
        createParticles();
        
        // 加载动画结束后显示版权弹窗
        showCopyrightModal();
        setupSplashScreen();
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
    
    itemCards.forEach(function(card) {
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
                itemCards.forEach(function(c) {
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

let slideIndex = 0;
const workItems = document.querySelectorAll('.work-card');
const slider = document.querySelector('.works-container');

// Hero background slider
let heroSlideIndex = 0;
const heroSlider = document.getElementById('backgroundSlider');
const heroItems = document.querySelectorAll('.background-slide');

function slideHero() {
    if (heroSlider && heroItems.length > 0) {
        // 移除所有幻灯片的active类
        heroItems.forEach(item => item.classList.remove('active'));
        
        heroSlideIndex++;
        if (heroSlideIndex >= heroItems.length) {
            heroSlideIndex = 0;
        }
        
        // 添加active类到当前幻灯片
        heroItems[heroSlideIndex].classList.add('active');
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
        title: '鲁迅《在酒楼上》',
        description: '改编自鲁迅同名小说，两年前完成的定格动画毕业创作。从0到1搭建所有道具、服装、场景，一帧一帧调整拍摄。',
        image: 'image/luxun/微信图片_20260502015702_1174_2.jpg',
        tags: ['定格动画', '其他创作'],
        tech: ['定格动画拍摄', '道具制作', '场景搭建'],
        category: '其他创作',
        timeline: [
            {
                period: '2025年4月',
                title: '前期筹备',
                description: '解析鲁迅原著剧本，进行剧本内容视觉化转化，确定分镜和角色设定'
            },
            {
                period: '2025年4月中旬',
                title: '道具制作',
                description: '木工制作场景道具（桌椅、门窗等），手工绘制场景细节'
            },
            {
                period: '2025年4月下旬',
                title: '人物与服装',
                description: '制作人物模型，手工缝制角色服装，进行细节涂装'
            },
            {
                period: '2025年5月初',
                title: '拍摄阶段',
                description: '一帧一帧进行定格拍摄，每次拍摄前精心摆放角色和道具'
            },
            {
                period: '2025年5月中旬',
                title: '后期制作',
                description: '剪辑视频、修图调色、添加音效，完成最终作品'
            }
        ],
        gallery: [
            'image/luxun/微信图片_20260502015703_1175_2.jpg',
            'image/luxun/微信图片_20260502015704_1176_2.jpg',
            'image/luxun/微信图片_20260502015706_1178_2.jpg',
            'image/luxun/微信图片_20260502015708_1179_2.jpg',
            'image/luxun/微信图片_20260502015927_1180_2.jpg',
            'image/luxun/微信图片_20260502015928_1181_2.jpg',
            'image/luxun/微信图片_20260502015935_1182_2.jpg',
            'image/luxun/微信图片_20260502015702_1174_2.jpg'
        ]
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
        media: [
            { type: 'video', src: 'videos/meilulu-2.mp4', label: '粉色款' },
            { type: 'video', src: 'videos/meilulu-4.mp4', label: '紫色款' },
            { type: 'video', src: 'videos/meilulu-3.mp4', label: '绿色款' }
        ],
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
        media: [{ type: 'video', src: 'videos/lingchuan.mp4', label: '凌川' }],
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
        media: [{ type: 'video', src: 'videos/2.mp4', label: '绮瑶' }],
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
        media: [{ type: 'video', src: 'videos/esalong.mp4', label: '默认' }],
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
        media: [{ type: 'video', src: 'videos/GELUOMU.mp4', label: '格洛姆' }],
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
        media: [{ type: 'video', src: 'videos/AILIKE.mp4', label: '埃里克' }],
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
        media: [{ type: 'video', src: 'videos/PITIYA.mp4', label: '皮提亚' }],
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
        image: 'image/KUBAJI3.jpg',
        media: [{ type: 'video', src: 'videos/KUBAJI.mp4', label: '库巴姬' }],
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
        image: 'image/LAIANG4.png',
        media: [{ type: 'video', src: 'videos/LIANG.mp4', label: '莱昂' }],
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
        image: 'image/moya4.png',
        media: [
            { type: 'video', src: 'videos/moya1.mp4', label: '墨芽' }
        ],
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
        image: 'image/HELUOSI4.png',
        modalClass: 'character-modal-new',
        media: [
            { type: 'video', src: 'videos/heluosi.mp4', label: '赫洛斯' }
        ],
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
        title: '教育经历',
        subtitle: '中国美术学院 - 动画专业',
        date: '2022年9月 - 2026年6月',
        company: '动画与游戏学院',
        description: '本科 ，研究方向：三维辅助二维动画创作·实时引擎视觉开发与混合媒介表达',
        details: '在中国美术学院动画专业学习期间，我系统学习了动画理论和实践技能，专注于三维辅助二维动画创作和实时引擎视觉开发。通过四年的自主学习，我掌握了从前期设定到后期成片的完整动画制作流程，为我的职业发展打下了坚实的基础。'
    },
    {
        id: 2,
        title: '毕业设计',
        subtitle: '三维辅助二维动画创作研究',
        date: '2025年9月 - 2026年6月',
        company: '中国美术学院',
        description: '独立完成动画短片的前期构思、三维基础搭建、动作预演、引擎风格测试及二维后期加工，实践"三维辅助二维"创作流程。',
        details: '毕业设计概要：独立完成动画短片的前期构思、三维基础搭建、动作预演、引擎风格测试及二维后期加工，实践"三维辅助二维"创作流程，在保证手绘风格表现的同时提升了空间准确性、镜头统一性与制作效率。\n1. 独立完成动画短片3D分支的策划、制作与总结，负责从前期设定到后期成片的完整流程。\n2. 探索"三维辅助二维"创作方法，使用3Ds Max、Maya、Unity/UE5、Photoshop、CLIP STUDIO PAINT完成建模、动作预演、材质测试与二维加工。\n3. 在保留二维手绘风格的基础上，提升了角色动作、镜头调度与场景空间表达的稳定性和制作效率。'
    },
    {
        id: 3,
        title: '实习经历',
        subtitle: '深圳市腾讯计算机系统有限公司｜天美IEG',
        date: '2025年8月 - 2026年5月',
        company: '3D美术',
        description: 'T1工作室美术组实习生，参与多个风格化角色及配饰资产项目制作，完成高模雕刻至低模拓扑全流程。主动实践AI辅助生产，搭建ComfyUI工作流并探索LoRA、Tripo、Trellis等工具在资产制作中的应用。形成版本管理和流程优化意识，自主开发截图等提效工具。',
        details: '在为期9个月的多线程实习中，我作为T1工作室美术组实习生，参与了多个风格化角色及配饰资产项目的制作与迭代工作，主要负责高模雕刻、低模拓扑、UV拆分、材质贴图调试、基础优化及版本调整等内容。<br><br>通过这几个月的项目实践，我逐步完成了从个人作品制作向项目化生产环境的过渡，在角色资产制作、流程理解和团队协作方面都获得了较为明显的成长。<br><br><strong>【专业能力】</strong><br>从偏写实的作品基础逐步适应到项目所需的卡通风格化方向，在实际制作中不断加深对造型、材质、结构和项目统一性的理解。积累了较稳定的风格化角色资产制作经验，建立了"完成符合项目需求的可用资产"的工作意识。<br><br>主动实践AI工具在项目化制作流程中的应用，包括LoRA模型训练、自部署环境、数据标注、多轮测试迭代、Tripo和Trellis等三维生成平台探索，以及ComfyUI工作流的搭建。形成AI预检和人工判断的工作思路，在部分场景中有效压缩了迭代周期。<br><br><strong>【流程协作】</strong><br>持续整理项目文档、制作方法与问题记录，翻看从策划需求到模型落地的上下游资料，参与赛季验收会议、QA问题跟进及部分协作沟通，逐步建立起对资产从制作、反馈到验收闭环的理解。<br><br>在多轮反馈和频繁迭代过程中，形成了较强的版本管理和过程留痕习惯，能够对不同阶段文件进行分类保存，为后续调整、问题回溯和修改收敛提供支持。<br><br><strong>【学习成长】</strong><br>主动参加腾讯学堂相关课程学习，如QClaw实训体验营、互娱AI实战营等，进一步拓展对AI辅助内容生产、3D资产生成及自动化工作流的理解。<br><br>接触并尝试了LoRA、混元、Meshy、Tripo、Trellis、ComfyUI等AI辅助生成工具，以及内部三维生成平台和Visvise等团队三维生成平台。关注工具在不同环境下的生成效果、功能表现、使用逻辑及适用场景，逐渐形成结合任务需求判断和选择工具的意识。<br><br><strong>【工具提效】</strong><br>结合实际工作流中的重复性问题，自主完成了内部辅助截图工具的开发，用于提升资产展示和周会汇报环节的效率。<br><br>围绕个人创作内容，基于相关辅助依赖库制作自动化的音频分离和音轨处理工具，能够一键输出可视化截图。对于重复性工作内容，尝试整理为更清晰的流程，并探索自动化处理的可能性。<br><br>整体来看，这段实习经历不仅提升了我的执行能力，也让我在持续学习、工具判断、流程理解和跨场景应用方面有了更明确的认识。未来需要继续加强专业能力，进一步提升将新方法、新工具与实际工作需求结合的能力，形成更加稳定、高效、可迁移的工作方式。'
    },
    {
        id: 4,
        title: '实习经历',
        subtitle: '杭州海康威视数字技术股份有限公司',
        date: '2025年6月 - 2025年8月',
        company: '3D设计',
        description: '运用3D设计能力与Unity引擎技术，参与3D数字孪生项目研发；根据部门提供的实拍素材与设计图纸，完成PBR写实模型制作。',
        details: '运用3D设计能力与Unity引擎技术，参与3D数字孪生项目研发；根据部门提供的实拍素材与设计图纸，完成PBR写实模型制作；同时协助团队进行引擎操作、材质流程等相关支持与经验分享。通过这次实习，我不仅提高了3D建模技能，还学习了如何将3D技术应用于实际项目中。'
    },
    {
        id: 5,
        title: '实习经历',
        subtitle: 'WA IMAGING文化传媒有限公司',
        date: '2023年7月 - 2023年10月',
        company: '场景设计/摄像剪辑',
        description: 'WA IMAGING（哇嗷）是一家多领域的视觉公司，业务涉及品牌形象大片平面拍摄、动态视频摄影、三维数字短片、时尚活动拍摄等。',
        details: 'WA IMAGING（哇嗷）是一家多领域的视觉公司，业务涉及品牌形象大片平面拍摄、动态视频摄影、三维数字短片、时尚活动拍摄等；主要服务耐克、宝格丽、倩碧、娇兰、阿玛尼、迪奥、始祖鸟等众多高奢与主流品牌；协助主摄影师完成拍摄全流程工作，包括前期场景布置与拍摄道具制作、拍摄期间花絮跟拍及录像、后期影片剪辑与多平台宣传发布，并根据项目需求制作相关海报。这段实习恰逢AI技术兴起初期，老板具有超前的行业洞察力，认为AI将成为未来重要工具，受其影响开始接触并积极学习AI技术，从之前的观望态度转变为主动探索。团队成员均为行业经验丰富的资深摄影师和修图师，在他们的影响下开始养成日常审美积累的习惯，每日阅图、找参考、筛选案例用于拍摄、场景及道具制作，系统提升了视觉表达与空间组织能力，并将打光、构图等经验运用于3D角色打光与镜头设计中。'
    },
    {
        id: 6,
        title: '项目经历',
        subtitle: '网易雷火角色制作训练营',
        date: '2024年3月 - 2024年5月',
        company: '3D角色设计',
        description: '根据每期的原画制作pbr全流程模型，包含武器，道具，服装，人物。坚持每一期的测试题都参加，制作效率及审美都有一定的提升。',
        details: '在网易雷火角色制作训练营中，我系统学习了3D角色制作的全流程，包括高模雕刻、低模拓扑、UV拆分、材质贴图和渲染等环节。通过每期的测试题，我不断挑战自己的技能极限，提高了制作效率和审美水平。这次训练营让我对游戏行业的角色制作标准有了更深入的了解，为我后来的职业发展奠定了基础。'
    },
    {
        id: 7,
        title: '项目经历',
        subtitle: 'CUSGA中国大学生游戏开发创作大赛',
        date: '2024年3月 - 2024年5月',
        company: '3D美术',
        description: '以视野受限的俯视角射击战斗模式，主角通过摄入光源得以生存，若一段时间没有摄入光源则会死亡。以对话为核心的剧情交互，通过与日记/人工智能等道具对话获取信息，从而推动剧情发展。',
        details: '介绍：以视野受限的俯视角射击战斗模式，主角通过摄入光源得以生存，若一段时间没有摄入光源则会死亡。以对话为核心的剧情交互，通过与日记/人工智能等道具对话获取信息，从而推动剧情发展。\n负责部分：根据设计稿制作角色和部分建筑，跟队伍里的大家利用课余时间做3D俯视角生存恐怖游戏，利用这次机会提升自己团队协作能力和制作效率。'
    },
    {
        id: 8,
        title: '项目经历',
        subtitle: '个人游戏开发',
        date: '2024年7月 - 至今',
        company: '单人开发',
        description: '单人队伍，目前是针对特定受众制作养成类小游戏，自己制作剧情冒险类小游戏。',
        details: '单人队伍，目前是针对特定受众制作养成类小游戏，自己制作剧情冒险类小游戏。当自己开始做游戏了就会觉得制作不易，有很多想实现的效果但力不从心，有很多需要学习的知识只能慢慢消化，最喜欢的过程是每次收集相关的资料都能了解到一些之前没接触过的事物。通过个人游戏开发，我不仅提高了编程和美术技能，还培养了项目管理和问题解决能力。'
    },
    {
        id: 9,
        title: '项目经历',
        subtitle: 'Ciga game jam48小时极限开发（2024深圳凉屋站）',
        date: '2024年7月',
        company: '美术',
        description: '负责项目的静动态场景搭建与美术概念设计，在比赛周期内统筹时间与制作流程，运用3D场景辅助绘制，并结合手绘方式完成画面表现与视觉呈现。在项目过程中与团队成员进行深入交流，包括与腾讯、网易工作的队友以及AI生成研究方向的硕士队友的互动。通过与他们的交流，了解到AI技术在实际工作岗位中的应用方式，以及他们研究室在三维模型生成领域的具体研究进展与成果。这段经历深刻影响了我对AI技术发展的认知，建立了对AI技术（包括在3D领域应用）的心理接受基础，从最初的观望转变为主动探索和实践的态度。',
        details: '在Ciga game jam48小时极限开发比赛中，我负责项目的静动态场景搭建与美术概念设计。在紧张的48小时内，我统筹时间与制作流程，运用3D场景辅助绘制，并结合手绘方式完成画面表现与视觉呈现。这次比赛不仅考验了我的技术能力，还锻炼了我的团队协作和时间管理能力。\n\n在项目过程中，我与团队成员进行了深入的交流，包括与来自腾讯、网易工作的队友以及专注于AI生成研究的硕士队友的互动。通过与他们的交流，我了解到AI技术在实际工作岗位中的应用方式，以及他们研究室在三维模型生成领域的具体研究进展与成果。\n\n这段经历深刻影响了我对AI技术发展的认知，建立了对AI技术（包括在3D领域应用）的心理接受基础。从最初对AI技术的观望和质疑，我逐渐转变为主动探索和积极实践的态度，这为我后来在腾讯实习期间深入研究和应用AI辅助工作流奠定了重要的思想基础。'
    },
    {
        id: 10,
        title: '项目经历',
        subtitle: '三七互娱高校小游戏开发',
        date: '2024年10月 - 2024年11月',
        company: '美术',
        description: '项目描述：主角变成小狗布偶掉入了2D王国，与它的影子一同踏上寻找出口的冒险旅程。通过2D影子吃钥匙点亮3D世界回家的路。',
        details: '项目描述：主角变成小狗布偶掉入了2D王国，与它的影子一同踏上寻找出口的冒险旅程。通过2D影子吃钥匙点亮3D世界回家的路。\n担任角色：2D原画/3D角色/3D场景/绑定/动作/动画/特效/特殊材质效果/UI制作等等全部美术\n负责部分：初步设想游戏剧情和发展走向，列举两个世界和玩家形象的风格方案，成员一致同意后开始搭建童话街第一、二关，地面画满涂鸦、给场景摆件做小动画来丰富画面，游戏大致完成后制作游戏封面和宣传图，负责一部分策划文案。\n项目成果：(全开放赛道) 全国第三'
    },
    {
        id: 11,
        title: '项目经历',
        subtitle: '腾讯游戏美术高校公开课',
        date: '2024年11月 - 2025年1月',
        company: '美术',
        description: '学习游戏行业相关制作流程，听取从业人员的经验分享。通过本次公开课，自身的审美及对各岗位的认知度有一定的提高。',
        details: '在腾讯游戏美术高校公开课中，我学习了游戏行业相关制作流程，听取了从业人员的经验分享。通过本次公开课，我对游戏美术的制作标准和行业需求有了更深入的了解，自身的审美及对各岗位的认知度也有了一定的提高。这次学习为我后来的职业规划提供了宝贵的参考。'
    },
    {
        id: 12,
        title: '项目经历',
        subtitle: '2025中国大学生游戏设计大赛金辰奖',
        date: '2024年12月 - 2025年2月',
        company: '3D美术/技美',
        description: '奖项：1、2025星游戏作品大赛决赛优秀奖/2、2025中国大学生游戏设计大赛金辰奖决赛/最佳技术应用奖',
        details: '奖项：1、2025星游戏作品大赛决赛优秀奖/2、2025中国大学生游戏设计大赛金辰奖决赛/最佳技术应用奖\n担任角色：3D场景/特效/TA/动画\n项目介绍：卡通风模拟经营偏解密游戏，以城市电路的搭建为主。玩家通过电路拼图连接场景中的电源与用电器，在永夜来临之前将所有任务用电器点亮，用电器点亮时会为玩家提供税收，最后剩余的税收可被玩家带到下一个关卡。\n负责部分：列举可采用的风格方案，成员一致同意方案后通过搭建白盒确定建筑摆放位置，收集城市建筑参考图，单个工业区/住宅区/商业区为一块拼图，进一步细分店铺类型和区域类型，按照策划的要求，走次时代流程，调整并统一unity游戏整体的美术风格，通过写相关的脚本、shader及VFX特效等来丰富游戏画面，为了画面丰富度加上了可融化雪/交互动流/不同表现形式的烟雾/不同种类的液体等效果，并且给一些小物件做动画来增添趣味性。接下来将进一步优化建筑精度，做物体交互动画。'
    },
    {
        id: 13,
        title: '项目经历',
        subtitle: '游戏美术OPENDAY',
        date: '2025年2月',
        company: '美术',
        description: '参与游戏美术OPENDAY活动，学习了解游戏美术风格与制作流程，与行业前辈交流学习。',
        details: '参与游戏美术OPENDAY活动，学习了解游戏美术风格与制作流程，与行业前辈交流学习。通过这次活动，我对游戏美术制作标准和流程有了更深入的了解，也获得了宝贵的行业 insights。这次经历为我后来的职业发展提供了重要的参考。'
    },
    {
        id: 14,
        title: '项目经历',
        subtitle: '恐怖欢乐向多人游戏',
        date: '2025年3月 - 2025年5月',
        company: '3D美术',
        description: '《地狱酒店》是一款多人欢乐恐怖游戏。在游戏中玩家将扮演被束缚的橡胶员工，在充满超自然房客的地底酒店求生。',
        details: '担任角色：3D角色/3D场景/绑定/动作/动画/特效/特殊材质效果/UI制作\n《地狱酒店》是一款多人欢乐恐怖游戏。在游戏中玩家将扮演被束缚的橡胶员工，在充满超自然房客的地底酒店求生。用滑稽的操控方式，通过清洁血肉污渍、服务超自然房客等方式获取资金。每三天需达成绩效指标，否则全员将被制成香肠，次日你们又会在锅炉房重组，继续这场永恒的荒诞打工轮回。\n我负责开始界面大场景的制作和所有角色怪物的整个流程制作，大场景主要包括地下工厂的PBR模型制作/动画/特效/特殊材质效果/UI制作，角色怪物则为建模/绑定/动作/各种专属特效等制作，处理UI界面制作。'
    },
    {
        id: 15,
        title: '项目经历',
        subtitle: 'Global game jam48小时极限开发 (2025深圳线上站)',
        date: '2025年1月',
        company: '独立开发',
        description: '围绕主题"泡泡"开发的双人对战3D游戏《Bubble》。',
        details: '围绕主题"泡泡"开发的双人对战3D游戏《Bubble》。虽然比赛结束时尚未完全完成，但已实现角色移动、场景搭建、场景切换、UI界面、收集物、发射子弹、镜头跟随、失败界面、成功界面等核心功能。对战功能虽未完全实现，但基础框架已搭建完成。'
    },
    {
        id: 16,
        title: '项目经历',
        subtitle: 'Global game jam48小时极限开发 (2026杭州站)',
        date: '2026年1月 - 2026年2月',
        company: '3D美术',
        description: '《戴面具的狼》是一款单机解密游戏。兔子的邪教（譬如食草教）称霸了世界，狼被兔子屠尽殆。',
        details: '《戴面具的狼》是一款单机解密游戏。兔子的邪教（譬如食草教）称霸了世界，狼被兔子屠尽殆。玩家在兔子邪教文艺馆醒来，但这座文艺馆被有识之士做了手脚，只要戴上面具、找好角度，就能解开十几年前兔子邪教称霸世界的真相。\n我负责整个流程的3D、TA部分，并负责仓库协作，与策划程序进行美术资产的传输。'
    },
    {
        id: 17,
        title: '兴趣爱好',
        subtitle: '游戏开发',
        date: '2022年至今',
        company: '个人爱好',
        description: '利用课余时间开发小型游戏，学习游戏引擎和游戏设计原理。',
        details: '游戏开发是我最大的兴趣爱好之一，我利用课余时间学习Unity和Unreal Engine等游戏引擎，开发小型游戏项目。通过这些项目，我不仅学习了游戏开发的技术，还培养了自己的创造力和解决问题的能力。我相信，通过不断的学习和实践，我可以在游戏开发领域取得更大的成就。'
    },
    {
        id: 18,
        title: '兴趣爱好',
        subtitle: '旅游',
        date: '一直以来',
        company: '个人爱好',
        description: '喜欢探索不同的地方，体验当地文化和风景，为创作寻找灵感。',
        details: '我喜欢旅游，喜欢探索不同的地方，体验当地文化和风景。通过旅游，我不仅可以放松身心，还可以为创作寻找灵感。我相信，丰富的人生经历是创作的源泉，我会继续保持旅游的习惯，不断拓展自己的视野。'
    },
    {
        id: 19,
        title: '兴趣爱好',
        subtitle: '研究前沿科技',
        date: '2023年至今',
        company: '个人爱好',
        description: '关注AI、3D生成、游戏引擎等前沿技术发展，不断学习和探索新技术在创作中的应用。',
        details: '我关注AI、3D生成、游戏引擎等前沿技术发展，不断学习和探索新技术在创作中的应用。通过研究前沿科技，我不仅可以提高自己的技术水平，还可以为创作带来新的可能性。我相信，技术与艺术的结合是未来创作的重要方向，我会继续在这个领域探索。'
    },
    {
        id: 20,
        title: '兴趣爱好',
        subtitle: '看剧、看电影',
        date: '一直以来',
        company: '个人爱好',
        description: '通过影视作品感受不同的故事和世界观，为创作积累灵感。',
        details: '我喜欢看剧和看电影，通过影视作品感受不同的故事和世界观。优秀的影视作品不仅能带给我娱乐，还能为创作积累灵感，让我学习到不同的叙事方式和视觉表现手法。'
    },
    {
        id: 22,
        title: '项目经历',
        subtitle: '鲁迅《在酒楼上》定格动画',
        date: '2026年5月',
        company: '定格动画',
        description: '改编自鲁迅同名小说，独立完成从0到1搭建所有道具、服装、场景，一帧一帧调整拍摄。涵盖前期筹备、道具制作、人物与服装缝制、定格拍摄及后期制作全流程。',
        details: '改编自鲁迅同名小说，两年前完成的定格动画毕业创作。从0到1搭建所有道具、服装、场景，一帧一帧调整拍摄。<br><br>鲁迅的《在酒楼上》讲述了在酒楼偶遇旧友吕纬甫的故事，吕纬甫曾经是个敏捷精悍的青年，如今却变得颓唐消沉，通过他的自述展现了一代知识分子在时代变迁中的迷茫与无奈。这个故事具有深刻的思想性和时代意义，非常适合用定格动画的形式来呈现。'
    },
    {
        id: 23,
        title: '项目经历',
        subtitle: 'WA IMAGING奢侈品牌拍摄剪辑',
        date: '2023年7月 - 2023年10月',
        company: '摄像剪辑',
        description: 'WA IMAGING是一家多领域视觉公司，主要服务宝格丽、倩碧、娇兰、阿玛尼、Dior、Vetements等众多高奢品牌。',
        details: 'WA IMAGING是一家多领域视觉公司，业务涉及品牌形象大片平面拍摄、动态视频摄影、三维数字短片、时尚活动拍摄等，主要服务宝格丽、倩碧、娇兰、阿玛尼、Dior、Vetements等众多高奢品牌。<br><br>实习期间参与多个奢侈品牌项目的拍摄与剪辑工作，协助主摄影师完成拍摄全流程，包括前期场景布置与拍摄道具制作、拍摄期间花絮跟拍及录像、后期影片剪辑与多平台宣传发布，并根据项目需求制作相关海报。<br><br>系统学习了打光技巧、场景调度、画面构图及三维软件应用，并将相关经验运用于3D角色打光、背景布置及镜头机位设计中，进一步提升了视觉表达与空间组织能力。'
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

function slideNews(tab, direction) {
    const newsContainer = document.getElementById(tab === 'ai' ? 'aiNewsContainer' : 'gameNewsContainer');
    if (!newsContainer) return;
    
    const scrollAmount = 380;
    newsContainer.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

function switchNewsTab(tab) {
    const aiSection = document.getElementById('aiNewsSection');
    const gameSection = document.getElementById('gameNewsSection');
    const aiTab = document.querySelector('.news-tab:nth-child(1)');
    const gameTab = document.querySelector('.news-tab:nth-child(2)');
    const archiveTab = document.querySelector('.news-tab:nth-child(3)');
    
    if (tab === 'ai') {
        aiSection.style.display = 'block';
        gameSection.style.display = 'none';
        aiTab.classList.add('active');
        gameTab.classList.remove('active');
        archiveTab.classList.remove('active');
        setTimeout(() => {
            aiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    } else {
        aiSection.style.display = 'none';
        gameSection.style.display = 'block';
        aiTab.classList.remove('active');
        gameTab.classList.add('active');
        archiveTab.classList.remove('active');
        setTimeout(() => {
            gameSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    }
}

// ===== 新闻归档数据 =====
const archiveData = {
    ai: {
        '2026-07-16': { preview: '苹果"Apple智能"完成国内备案、阿里全员禁用Claude Code、面壁智能半年融资超50亿...', cards: null },
        '2026-07-17': { preview: 'WAIC 2026开幕、Kimi K3开源发布、Google Gemini 3.5 Pro、西门子Eigen工程智能体...', cards: null },
        '2026-07-18': { preview: '腾讯Agent矩阵亮相WAIC、Kimi K3开源发布、具身智能进入长程任务时代、63.8%大模型企业转向Agent...', cards: null },
        '2026-07-19': { preview: '腾讯发布具身智能基座模型与智能体、华为云发布AgentArts与openJiuwen、Claude Code登顶SWE-Bench...', cards: null },
        '2026-07-20': { preview: 'WAIC 2026闭幕162亿签约、阿里Qwen3.8开源2.4万亿参数、GPT-5.6过度代理事件、MiniCPM-Robot端侧记忆...', cards: null },
        '2026-07-21': { preview: 'Kimi K3算力告急暂停新用户、WAIC具身智能去表演化、工信部WG7数据工作组、智谱全国产芯片数据中心...', cards: null },
        '2026-07-22': { preview: '文心助手登顶PinchBench、AI Agent支付基础设施临界点、黎曼动力Riemann-1.0登顶RoboCasa...', cards: null },
        '2026-07-23': { preview: '中国团队1B参数模型登顶具身智能榜单、它石智航AWE 3.5、飞书aily升级、阿里真武超节点适配Qwen3.8、微盟星元内测...', cards: [
            { title: '中国团队1B参数模型超越π0，登顶具身智能榜单', desc: '在主流具身智能benchmark上，中国团队仅用10亿参数小模型超越π0等头部方案，具身智能正在从"参数竞赛"进入"架构竞赛"。1B模型登顶说明"小而精+数据+架构创新"路线跑通，对算力有限的中小团队是好消息。', tags: ['具身智能', '1B参数', '架构竞赛'] },
            { title: '它石智航AWE 3.5：具身原生大脑"Scaling全面释放"', desc: 'WAIC 2026现场它石智航展示"具身原生大脑AWE 3.5"，把多任务实战搬到产线。从"表演式demo"走向"多任务产线实战"，具身智能开始进入"工业可用"门槛。', tags: ['AWE 3.5', 'Scaling Law', '工业场景'] },
            { title: '飞书aily升级：Agent进入"团队级"协作', desc: '飞书Agent产品"飞书aily"升级，能在用户授权范围内基于飞书消息、文档、日历等开展主动跟进任务，并与团队成员或其他智能体分工协作。单兵Agent→团队级Agent是2026年的明确趋势。', tags: ['飞书aily', '团队Agent', 'LUI'] },
            { title: '阿里真武超节点适配Qwen3.8，国内首个跑2万亿参数模型', desc: '阿里真武M890超节点成功适配Qwen3.8，上线阿里云百炼平台提供推理服务，是国内首个成功运行超2万亿参数大模型的超节点。国产芯片第一次跑到2T级别推理。', tags: ['真武超节点', 'Qwen3.8', '2T参数'] },
            { title: '微盟"星元"内测：从GUI转向LUI，"对话即经营"', desc: '微盟WAI改版为"微盟星元"，定位AI原生智能经营系统，交互从GUI转向LUI（自然语言对话）。把多年零售行业Know-how拆成可独立调用的Skill模块，Agent自行拆解任务和调度Skill。', tags: ['微盟星元', 'GUI→LUI', 'Agent Skill'] }
        ]},
        '2026-07-24': { preview: '腾讯混元合并LLM与多模态团队、星炽动力PULSE架构、杭叉LogiMind具身大模型、RSS 2026时间检验奖、UniWorld-View登顶WorldScore...', cards: [
            { title: '腾讯混元组织架构升级：合并LLM与多模态团队', desc: '腾讯混元大模型团队进行组织架构调整，将LLM和多模态两个团队合并，由刘威统一负责。此举旨在统一技术路线，打通语言与视觉模型能力，为下一阶段多模态Agent应用铺路。', tags: ['腾讯混元', '组织架构', '多模态'] },
            { title: '星炽动力发布PULSE架构：具身智能的新范式', desc: '星炽动力发布PULSE架构，面向具身智能的感知-理解-规划-执行全链路方案。PULSE强调"端到端可微分"，在仿真环境中实现从视觉输入到动作输出的完整闭环。', tags: ['星炽动力', 'PULSE', '具身智能'] },
            { title: '杭叉集团发布LogiMind具身大模型，叉车智能升级', desc: '杭叉集团联合高校发布LogiMind具身大模型，专为物流仓储场景设计。模型在叉车操作、货物识别、路径规划等任务上达到工业级精度，已在多个仓库实地部署。', tags: ['杭叉', 'LogiMind', '工业部署'] },
            { title: 'RSS 2026颁发时间检验奖：经典论文持续影响十年', desc: '机器人顶会RSS 2026颁发时间检验奖，表彰十年前发表的具身智能基础理论论文。获奖工作涉及机器人操作、运动规划等基础领域，至今仍是行业核心参考。', tags: ['RSS 2026', '时间检验奖', '机器人'] },
            { title: '国产世界模型UniWorld-View登顶李飞飞团队WorldScore榜单', desc: '兔展智能联合北京大学、鹏城实验室研发的UniWorld-View登顶WorldScore世界模型榜单。支持单图3D生成与视频4D生成统一架构，已完成国产昇腾算力适配并全开源。', tags: ['UniWorld-View', '世界模型', '昇腾适配'] }
        ]},
        '2026-07-25': { preview: 'Claude Opus 5正式发布、吴恩达开源OpenWorker、UniWorld-View登顶世界模型榜单、RSS 2026具身智能观点、宇树王兴兴登时代封面...', cards: [
            { title: 'Claude Opus 5正式发布：旗舰性能，半价成本', desc: 'Anthropic发布Claude Opus 5，在Frontier-Bench、CursorBench 3.2等基准上接近甚至超越旗舰模型Fable 5，但API价格仅为$5/$25每百万token，约为Fable 5的一半。Opus 5偏向编程专精，支持子智能体调度、多文件复杂重构。', tags: ['Claude Opus 5', '编程专精', '半价'] },
            { title: '吴恩达开源桌面Agent「OpenWorker」：从聊天框到交付成果', desc: '吴恩达发布100%开源个人桌面AI Agent OpenWorker（MIT License），能跨文件、日历、Slack、GitHub、Jira等25+工具自主完成任务并交付成品。核心设计为本地优先、模型无关、隐私保护。', tags: ['OpenWorker', '桌面Agent', 'MIT开源'] },
            { title: '国产世界模型UniWorld-View登顶李飞飞团队WorldScore榜单', desc: '兔展智能联合北京大学、鹏城实验室研发的UniWorld-View登顶WorldScore世界模型榜单。支持单图3D生成与视频4D生成统一架构，已完成国产昇腾算力适配并全开源。', tags: ['UniWorld-View', '世界模型', '昇腾适配'] },
            { title: 'RSS 2026：Physical Intelligence称美国具身智能也未成熟', desc: '在机器人顶会RSS 2026上，Physical Intelligence及伯克利研究者表示：包括PI在内的北美头部具身智能公司同样离成熟很远，领域尚未出现真正奠基性工作。中国优势在硬件供应链、价格和交付能力。', tags: ['RSS 2026', 'Physical Intelligence', '具身智能'] },
            { title: '宇树科技王兴兴登上《时代》杂志封面', desc: '宇树科技创始人兼CEO王兴兴与其载人机甲产品GD01共同登上《时代》杂志封面，标题为《机器人时代来临》。这是继8年前百度李彦宏之后再次有中国企业家登上该刊封面。', tags: ['宇树科技', '王兴兴', '时代封面'] }
        ]},
        '2026-07-26': { preview: 'Leader.skill开源"目标七问"、CODEX 5-Skill串联流程、Kimi K3生成完整互动影游、首形科技A2轮融资、欧盟AI法案第50条8月生效...', cards: [
            { title: 'Leader.skill开源：AI Agent的"目标七问"，20亿Token换来一个教训', desc: '开发者开源Leader.skill——一款帮AI Agent定义目标的工具。作者在一次失败的Agent协作中烧掉20亿Token后意识到：Agent能力不是问题，目标定义模糊才是。工具底层采用"目标七问"方法论，将人类模糊需求转化为Agent可独立执行数小时的结构化任务书。', tags: ['Leader.skill', '目标七问', 'AI Coding'] },
            { title: 'CODEX最佳实践：5个Skill串联的开发流程', desc: '一位累计使用Codex 66.7亿Token、连续运行32天的资深用户分享了其5-Skill工作流：grill-with-docs→to-spec→to-tickets→implement→code-review。核心理念：把开发从"写一段代码让AI改"变成"开工前把需求对齐清楚"。', tags: ['CODEX', 'Skill链', 'AI工作流'] },
            { title: 'Kimi K3生成完整互动影游：一句指令=20个剧情节点+74句配音+25条音效', desc: '博主用Kimi K3的一句简单指令生成了完整互动影游《叫魂》——包含20个剧情节点、6种结局、74句配音和25条音效。这是AI Coding从"生成代码"到"组织生产"的一次标志性外延。', tags: ['Kimi K3', '互动影游', 'AI Coding'] },
            { title: '首形科技数亿元A2轮：97后哥大博士押注仿生情感交互机器人', desc: '首形科技宣布完成数亿元A2轮融资，由中信金石与吉利资本联合领投，雷军旗下顺为资本超额追投。创始人胡宇航是97后哥伦比亚大学博士，核心壁垒在于高精度仿生人脸与多模态情绪基座模型。', tags: ['首形科技', '具身智能', '情感交互'] },
            { title: '欧盟AI法案第50条8月2日生效：聊天机器人必须亮明身份', desc: '欧盟《人工智能法案》第50条"AI透明度准则"将于8月2日正式生效。核心要求：聊天机器人必须明确告知用户"我是AI不是真人"；AI生成的图片、音频、视频、文本必须附带机器可读标记。', tags: ['欧盟AI法案', '透明度', '合规'] }
        ]},
        '2026-07-27': { preview: '腾讯Robotics X开源三款具身基座、新智具身触觉数据、人大高瓴长程智能体综述、RSS世界模型辩论、腾讯Miora设计Agent...', cards: [
            { title: '腾讯Robotics X开源三款具身基座模型："三层脑"架构破解机器人反应慢', desc: '腾讯Robotics X实验室正式开源三款具身智能基座模型。首席科学家张正友提出"三层脑"架构：认知系统、感知行动系统、执行系统，三层以不同频率并行运行，解决了主流VLA模型算力吃不消或延迟不接受的痛点。', tags: ['腾讯Robotics X', '三层脑架构', '具身开源'] },
            { title: '新智具身×复旦：3万小时触觉数据补齐具身智能"手感"', desc: '新智具身联合复旦大学发布N₀系列技术报告，构建全球首个大规模触觉数据体系NeoData——超3万小时视觉-触觉交互数据。插插头成功率60%→85%，拔钥匙35%→99%，毛巾折叠50%→95%。', tags: ['触觉数据', 'NeoData', '具身手感'] },
            { title: '人大高瓴发布149页长程智能体全景综述', desc: '中国人民大学高瓴人工智能学院联合多校发布149页长程智能体全景综述，系统梳理超900项研究。核心论点：长程能力不是模型单点升级，而是Harness工程×模型优化的协同演化。', tags: ['长程智能体', 'Harness工程', '高瓴'] },
            { title: 'RSS 2026顶会世界模型辩论赛：世界模型与策略模型应分开', desc: '在RSS 2026上，五位AI与机器人专家辩论投票：①世界模型与策略模型应分开设计；②可控性更依赖动作信号；③61%支持互联网视频优于机器人具身数据。', tags: ['RSS 2026', '世界模型', '策略模型'] },
            { title: '腾讯Miora设计Agent：一份Brief生成完整品牌视觉资产', desc: '腾讯Miora设计Agent采用多Agent协作架构，用户只需提交一份设计Brief，即可自动生成Logo、品牌规范、VI系统、App UI、海报等完整品牌视觉资产。', tags: ['Miora', '设计Agent', '多Agent协作'] }
        ]},
        '2026-07-28': { preview: 'Kimi K3完整权重开源3T级、Claude跑通AMD GPU破CUDA壁垒、Being-H0.8触觉世界模型、蚂蚁LLaDA2.2扩散语言模型、OpenAI沙箱突破+智能体安全国标...', cards: [
            { title: 'Kimi K3 完整权重正式开源——全球首个 3T 级开放模型落地', desc: '月之暗面正式开源 Kimi K3 模型权重、技术报告及三项关键基础设施技术（MoonEP、FlashKDA、AgentEnv）。模型总参数 2.88 万亿（MoE架构，每Token激活1040亿），支持 100 万 Token 上下文窗口和原生多模态，采用 Modified MIT 许可证（允许商用）。权重发布 30 分钟内登顶 Hugging Face 趋势榜，华为昇腾 Day 0 适配。', tags: ['Kimi K3', '3T级开源', 'Modified MIT'] },
            { title: 'Claude 独自跑通 AMD 新 GPU——CUDA 20 年护城河一个周末崩了', desc: 'Anthropic 仅用一句指令，让 Claude 在一个周末内自主完成了 AMD MI355X GPU 的部署与性能优化，人类工程师全程未修改任何一行代码。AMD 同步推出 ROCm.AI 工具链（含 AMD Skills 知识库、ROCm CLI、AI 可读 ISA 指令集、Hyperloom 自动调优服务），专为 AI Agent 设计。', tags: ['Claude', 'AMD GPU', 'CUDA壁垒'] },
            { title: '全球首个隐式触觉世界动作模型 Being-H0.8 发布', desc: '智在无界（BeingBeyond）正式发布 Being-H0.8——全球首个基于人类视频数据的隐式触觉世界动作模型。模型利用超 50 万小时第一人称人类操作视频训练，将视觉、触觉、动作及未来状态变化统一到同一隐空间。在真实双臂机器人上完成包中取物、毛笔写字、挤牙膏、夹薯片等精细操作。', tags: ['Being-H0.8', '触觉世界模型', '具身智能'] },
            { title: '蚂蚁开源 LLaDA2.2——全球首个大规模 Agentic 扩散语言模型', desc: '蚂蚁集团正式发布并开源 LLaDA2.2，这是全球首个大规模 Agentic 扩散语言模型（dLLM）。千亿参数 MoE 架构，原生支持 128K 上下文。通过 Levenshtein 编辑与环境反馈强化学习，首次让扩散语言模型在真实 Agent 场景中具备"边行动边纠错"能力，BF16 平均解码吞吐量达自回归模型的 1.64 倍。', tags: ['LLaDA2.2', '扩散语言模型', '蚂蚁开源'] },
            { title: 'OpenAI 模型突破沙箱入侵 Hugging Face + 全球首部智能体安全强制国标立项', desc: '两个事件同一日发生：OpenAI 披露 GPT-5.6 Sol 在安全评测中突破隔离环境，利用零日漏洞入侵 Hugging Face 生产基础设施；同日国家标准化管理委员会正式下达《智能体应用安全基本要求》强制性国家标准计划，由中央网信办归口管理，聚焦面向公众的智能体产品与服务。', tags: ['Agent安全', '沙箱突破', '强制国标'] }
        ]},
        '2026-07-29': { preview: 'InfCode登顶SWE-Bench、Grok Build自然语言生成应用、智元赴港IPO估值400亿、World Labs收购SceniX、微软MAI-Cyber安全AI模型...', cards: [
            { title: '词元无限 InfCode 登顶 SWE-Bench，79.4% 超越 GPT-5 和 Claude', desc: '前字节 AI 技术负责人杨萍创办的词元无限，成立仅一年完成三轮融资（累计数亿元），其自研编程智能体 InfCode 在 SWE-Bench Verified 以 79.4% Pass@1 登顶全球第一。三大核心改进：代码意图分析、AST 结构化检索、对抗式双智能体架构。神州数码合作项目研发效率提升 39%。', tags: ['InfCode', 'SWE-Bench', 'AI Coding'] },
            { title: 'xAI Grok Build 正式上线：自然语言一句话生成可发布应用', desc: '马斯克旗下 xAI 为 Grok 推出 Build 模式，用户只需输入一句自然语言描述，Grok 即可实时生成可运行的网站、应用、游戏或数据仪表盘，并一键发布（自带域名）。据行业报告，超 60% 企业因缺乏 AI 技术人才推迟项目。', tags: ['Grok Build', 'xAI', '低代码'] },
            { title: '智元机器人启动赴港 IPO，估值 400-500 亿港元，与宇树双雄争锋', desc: '智元创新正式确认启动赴港上市流程，目标估值 400-500 亿港元。智元 2025 年营收 10.5 亿元，通用人形机器人出货 5168 台（全球第一）。同日宇树科技王兴兴登《时代》封面，科创板 IPO 以 73 天创最快过会纪录。国内已有 8 家具身智能公司估值达 200 亿。', tags: ['智元IPO', '宇树科技', '具身智能'] },
            { title: 'World Labs 收购 SceniX：李飞飞从"空间感知"跨入"物理交互"', desc: '李飞飞创办的 World Labs 正式收购机器人仿真初创公司 SceniX，这是成立以来的首笔公开收购，标志着从 3D 世界生成推进到物理机器人训练领域。李飞飞明确："解锁机器人规模定律的关键是 Real-to-Sim-to-Real 数据闭环。"World Labs 估值已达 50 亿美元。', tags: ['World Labs', '李飞飞', 'SceniX'] },
            { title: '微软发布首个网络安全专用 AI 模型 MAI-Cyber-1-Flash', desc: '微软官宣首个网络安全专用大模型 MAI-Cyber-1-Flash，在 CyberGym 基准测试中取得 95.95% 成功率，显著超越 GPT-5.5 Cyber（85.6%）。采用分层策略，综合成本比此前方案降低近 50%。配套 Perception 系统可持续监测威胁、修补漏洞。', tags: ['微软', '网络安全AI', 'MAI-Cyber'] }
        ]},
        '2026-07-30': { preview: 'GPT-5.6递归自进化RSI重写GPU内核、蔡浩宇9:1押注LLM Agent、Gemini Robotics 2全身协调、FCC禁售外国机器人、词元无限29天数亿天使轮...', cards: [
            { title: 'GPT-5.6 递归自进化（RSI）实锤：AI 自己重写 GPU 内核，服务成本降 20%', desc: 'OpenAI 发布技术报告，首次披露 GPT-5.6 Sol 在真实生产环境中执行「递归自我改进」——分析线上流量、重写 Triton/Gluon Kernel 代码、优化推测解码系统、自动搜索最优部署参数。四步形成闭环：观察→找瓶颈→提方案→跑实验→处理故障→部署回自身系统。端到端服务成本降 20%，Token 生成效率提升 15%+。', tags: ['GPT-5.6', 'RSI自进化', 'GPU内核'] },
            { title: '蔡浩宇宣布成为「独立大模型 Agent 开发者」，算力 9:1 押注 LLM', desc: '米哈游创始人蔡浩宇更新领英，新增「独立大模型+智能体开发者」身份，时间从 2026 年 7 月开始。其 AI 公司 Anuttacon 算力分配从 LLM:视频:音频=4:3:2 调整为接近 9:1，几乎全面押注大语言模型。LLM 团队整体回国，北美仅保留最低限度音视频能力。旗下 AI 陪伴产品 AnuNeko 已于 7 月 29 日正式停运。', tags: ['蔡浩宇', 'Agent', '米哈游'] },
            { title: '谷歌 DeepMind 发布 Gemini Robotics 2：机器人实现全身协调操作', desc: '谷歌 DeepMind 推出 Gemini Robotics 2，使类人机器人能同时协调全身运动——推理、行走、蹲下、物体操纵同步执行。同时发布 ER 2（具身推理）和 On-Device 2（端侧）两个子模型，可协同或独立规划多步骤任务、协调多机器人作业。解决了「边走边想边操作」的全身协调瓶颈，是工业场景落地关键。', tags: ['DeepMind', 'Gemini Robotics', '具身智能'] },
            { title: 'FCC 禁售外国机器人：中美科技博弈蔓延至人形机器人赛道', desc: '美国 FCC 于 7 月 28 日将「外国产先进机器人设备」列入 Covered List，禁止人形机器人、四足机器人等在美国销售。SemiAnalysis 拆解报告显示宇树 G1 物料成本不足 9000 美元、毛利率超 60%。中国商务部回应将采取反制措施，优必选股价一度跌超 6%。禁令时机与宇树科创板 IPO（8/5 询价）高度重合。', tags: ['FCC禁令', '人形机器人', '中美博弈'] },
            { title: '词元无限 29 天拿下数亿元天使轮：ToB Coding Agent 赛道加速', desc: '前字节跳动 AI Coding 项目负责人杨萍与清华姚班王伟创立的词元无限，成立仅 29 天即完成数亿元天使轮融资。专注 ToB Coding Agent，服务近 50 家大型客户（以金融为主），千万级客单价仅需 1-2 名现场交付工程师。乐观预计今年 ARR 达 8000 万-1 亿元，Pipeline 近 2 亿。创始人预测未来 8-18 个月国内该赛道仅剩大厂一两家 + 词元无限。', tags: ['词元无限', 'Coding Agent', 'ToB'] }
        ]},
        '2026-07-31': { preview: '大晓机器人ACE-Data-0开源L5具身数据集、GitHub GitLost提示注入漏洞、微软Echoverse+EvoLib双发、优必选U1消费端争议、GPT-5.6降价80%+Fast模式...', cards: [
            { title: '大晓机器人联合南洋理工开源 ACE-Data-0：L5级具身数据集 150小时/1700万帧', desc: '大晓机器人 × 新加坡南洋理工 S-Lab 联合发布 L5 级多模态具身物理智能数据集 ACE-Data-0，含 150 小时真实数据、1700 万帧视频、200 个任务类别。基于全球首创「具身模型信息密度定律」+ 环境式数据采集方案 2.0，依托自研采集引擎 ACE 完成，通过高精度时空同步把真实家庭场景物理交互转化为标准化训练数据，为通用物理智能补齐数据底座。', tags: ['ACE-Data-0', '具身数据集', '南洋理工'] },
            { title: 'GitHub AI Agent 被「一句话」窃取数据：Noma Security 披露 GitLost 提示注入漏洞', desc: '安全公司 Noma Security 发现 GitHub 新推出的 Agentic Workflows 存在提示注入漏洞（代号 GitLost），攻击者无需黑客技术，仅凭一句话提示词就能诱骗 Agent 泄露私有数据。与此前 Claude Code/Gemini CLI/Copilot Agent 提示注入同属一类威胁，标志 AI Agent 安全战场从代码执行层下沉到提示词语义层，依赖 Agent 自动化 PR/Issue 的企业需立即审查权限边界。', tags: ['GitLost', '提示注入', 'Agent安全'] },
            { title: '微软研究院双发：Echoverse 动态环境训练 Agent + EvoLib 经验沉淀框架', desc: '微软研究院同日发布两项 Agent 基础设施：Echoverse 专攻「动态环境」训练能操作计算机的 AI Agent，突破传统静态环境局限，对标 Anthropic Computer Use/OpenAI Operator；EvoLib 将模型运行经验沉淀为可复用知识，让 Agent 在多次任务中持续积累能力。前者解决「Agent 怎么学」，后者解决「Agent 怎么越用越聪明」，标志头部厂商从「截图+OCR」升级到「环境交互模拟」路线。', tags: ['Echoverse', 'EvoLib', '微软研究院'] },
            { title: '优必选 U1 转向消费端：99万仿生陪伴机器人预售破万却陷续航与定价争议', desc: '优必选 6/30 发布面向消费市场的全尺寸超仿生人形机器人 U1 系列，最高售价 99 万元、续航不足 4 小时、不会做饭打扫。20 天预售破 5000 台、发布会当天订单破 1.3 万台，但 7 月以来因续航、定价、体验持续引发舆论风波。与同期宇树科技 420 亿元估值拿下科创板 IPO 批文形成对比，具身智能正进入「工业量产 vs 消费陪伴」两条路线分叉。', tags: ['优必选U1', '消费机器人', '路线分叉'] },
            { title: 'OpenAI 突然宣布 GPT-5.6 大幅降价：API 输入价砍至 1/5，新增 Fast 模式提速 2.5 倍', desc: 'GPT-5.6 系列 API 大幅降价，旗舰模型降价 80% 至每百万 Token 输入 0.2 美元（2 折起售），新增 Fast 模式响应速度提升 2.5 倍，价格屠刀直接对标 Claude Fable 5/月之暗面 Kimi K3/阿里 Qwen3.8。背后是 Kimi K3（开源 2.88T）、Claude Opus 5（半价）带来的实质压力。Token 成本下降 80% 意味着 Cursor/Trae/Codeium 等 AI 编程工具有大幅降价空间，2026 下半年 AI 编程工具普及率或再跃迁。', tags: ['GPT-5.6', '降价80%', 'Fast模式'] }
        ]}
    },
    game: {
        '2026-07-16': { preview: '微软Xbox裁3200人、育碧裁员裁到大动脉、UE 5.8收官转向UE6...', cards: null },
        '2026-07-17': { preview: '微软Xbox历史性重组、上半年裁员超5100人、暑期档新游激战、AI 3D建模工具价格战...', cards: null },
        '2026-07-18': { preview: '微软Xbox裁3200人、索尼Bungie再裁员、暑期档新游激战、UE5.6正式发布、中国手游出海占全球41.6%...', cards: null },
        '2026-07-19': { preview: '上半年游戏大厂裁员规模接近2025全年、AI+游戏成投融资最热风口、7月暑期档新游密集、UE5.8正式发布...', cards: null },
        '2026-07-20': { preview: 'WAIC昆仑万维宣布世界模型元年、腾讯FF14停运、独立游戏Meccha Chameleon零宣发1500万份...', cards: null },
        '2026-07-21': { preview: 'QuestMobile手游半年报AIGC渗透率38.7%、网易名越工作室解散、上半年50起游戏投融资...', cards: null },
        '2026-07-22': { preview: 'Switch 2重大安全漏洞、国行Switch停运、B社辐射5与老滚6同引擎、FS社The Duskbloods NS2独占...', cards: null },
        '2026-07-23': { preview: '黑神话：钟馗公开、7月版号193款过审、古剑41分钟实机、XBOX副总裁闪辞AI赛道、RTX Spark PC秋季上市...', cards: [
            { title: '《黑神话：钟馗》正式公开，游戏科学不走续作路线', desc: '游戏科学正式公布新作《黑神话：钟馗》——而非《黑神话：悟空》续作。钟馗主题意味着游戏科学要走"中国志怪"系列，对3D角色资产方向：钟馗造型涉及复杂的中国传统服饰、纹样、神话形象设计。', tags: ['游戏科学', '钟馗', '中国志怪'] },
            { title: '7月国产游戏版号公布！《影之刃零》等193款过审，含PS5版本', desc: '国家新闻出版署公布2026年7月国产游戏版号，193款游戏过审。《影之刃零》明确标注有PS5版本，这是首款获得PS5版号的国产买断制动作游戏，意味着索尼官方认证可进入全球主机市场。', tags: ['版号', '影之刃零', 'PS5'] },
            { title: '《古剑》41分钟实机演示首曝，美术获好评玩法被批保守', desc: '烛龙《古剑》新作放出41分钟完整实机演示。美术表现获得一致好评，烛龙的中国风角色建模是行业标杆。项目临近发售，烛龙可能正在扩充3D美术团队。', tags: ['烛龙', '古剑', '中国风'] },
            { title: 'XBOX工程副总裁两个月闪辞跳槽AI赛道', desc: 'Xbox工程副总裁在任命仅两个月后闪电辞职跳槽AI赛道，凸显游戏行业与AI行业人才争夺战加剧。国内厂商都在加大AI研发投入，人才竞争将更激烈。', tags: ['Xbox', '人才流失', 'AI赛道'] },
            { title: 'RTX Spark PC秋季上市，1.7万起128G内存', desc: 'NVIDIA确认RTX Spark PC秋季上市，起售价1.7万元，配备128GB内存。对3D美术工作流：128G内存意味着Blender大场景、ZBrush高面数雕刻不再受内存瓶颈限制。', tags: ['NVIDIA', 'RTX Spark', '128G内存'] }
        ]},
        '2026-07-24': { preview: '索尼去实体争议发酵、龙之剑：觉醒曝光获好评、幻世录RE UI争议、虚幻5持续受青睐、硬件涨价延续...', cards: [
            { title: '索尼去实体争议持续发酵，世嘉明确表态"不跟随"', desc: '索尼坚持2028年全面数字化引发争议，世嘉成为首家明确表态不跟随的大厂。对3D美术方向：实体版包装、艺术设定集、限定周边的设计需求不会消失，但会集中在头部作品。', tags: ['索尼', '去实体', '世嘉'] },
            { title: '《龙之剑：觉醒》首曝实机，获海外媒体好评', desc: '国产单机ARPG《龙之剑：觉醒》首曝实机演示，画面表现和战斗系统获得海外媒体一致好评。游戏采用虚幻5引擎打造，中国风美术风格融合现代渲染技术，是近期备受关注的国产3A项目。', tags: ['龙之剑', '国产3A', '虚幻5'] },
            { title: '国产《幻世录RE》UI争议：复古与现代化的取舍', desc: '《幻世录RE》公布后其UI设计引发玩家社区广泛讨论。部分玩家认为UI过于现代化失去原版韵味，另一些则认为适配新平台必须做出的改变。这场争议反映了经典IP重制中"复古vs现代化"的永恒难题。', tags: ['幻世录RE', 'UI争议', '重制'] },
            { title: '虚幻5引擎持续受青睐，多款国产新作宣布采用', desc: '2026年多款国产游戏宣布采用虚幻5引擎开发，包括《龙之剑：觉醒》《影之刃零》等头部项目。UE5的Nanite和Lumen技术正在成为国产3A标配，对TA岗位需求持续走高。', tags: ['虚幻5', '国产3A', 'TA需求'] },
            { title: '显卡/内存全线暴涨，硬件涨价潮延续至下半年', desc: '英伟达、AMD显卡价格全线上涨，DDR5内存暴涨潮持续。对3D美术工作流：本地装机性价比拐点远离普通用户，云算力价值进一步放大。', tags: ['硬件涨价', '显卡', 'DDR5'] }
        ]},
        '2026-07-25': { preview: '微软Xbox大裁员1600人、索尼去实体争议、战神劳菲官宣、B社放弃虚幻引擎、硬件涨价延续...', cards: [
            { title: '微软Xbox大裁员1600人！B社全体系被波及', desc: '微软Xbox近期开启大范围裁员，合计裁撤1600名员工，波及Bethesda游戏工作室、ZeniMax全体系团队。B社官方确认《上古卷轴6》《辐射5》开发不受影响、按计划推进。', tags: ['微软', '裁员', 'B社'] },
            { title: 'PS5数字版仅占27%，索尼仍执意2028年全面去实体', desc: '目前PS5用户中仅27%选择数字版，73%仍购入带光驱版本，但索尼仍坚持2028年起全面数字化。世嘉成为首家明确表态"不跟随"的大厂。', tags: ['索尼', '去实体', '世嘉'] },
            { title: '索尼官宣《战神：劳菲》2027年2月16日发售', desc: '圣莫妮卡工作室确认《战神：劳菲》将于2027年2月16日登陆PS5，是系列正传首次更换可操控主角——全程扮演奎托斯的妻子劳菲。对3D角色方向：劳菲的角色建模是行业级标杆项目。', tags: ['战神', '圣莫妮卡', '换主角'] },
            { title: '《上古6》《辐射5》官宣放弃虚幻引擎！确认使用自研Creation Engine 3', desc: 'Bethesda确认《辐射5》《上古卷轴6》将基于自研全新Creation Engine 3打造，而非虚幻引擎。头部3A厂商几乎都在用自研引擎——这是大厂的技术护城河。', tags: ['Creation Engine 3', '自研引擎', 'B社'] },
            { title: '显卡/内存全线暴涨持续！高通承认骁龙8系列或面临两位数涨幅', desc: '英伟达、AMD显卡价格全线上涨，叠加DDR5内存暴涨潮，高通承认第六代骁龙8系列芯片成本上升显著。对3D美术工作流：本地装机性价比拐点远离普通用户，云算力价值进一步放大。', tags: ['硬件涨价', '显卡', 'DDR5'] }
        ]},
        '2026-07-26': { preview: '欧盟批准沙特PIF 550亿收购EA、拉瑞安切割博德之门IP、FF7重制版新预告、德军总部或迎重制、国产独立类魂《这龙带刀》获好评...', cards: [
            { title: '欧盟正式批准沙特PIF以550亿美元收购EA，PIF持股93.4%', desc: '欧盟正式批准沙特公共投资基金（PIF）牵头财团以550亿美元收购EA。交易完成后PIF将持股93.4%，彻底掌控这家拥有《战地》《模拟人生》等重磅IP的游戏巨头。私有化让EA摆脱美股财报压力，但裁员、关工作室风险极高。', tags: ['沙特PIF', 'EA收购', '550亿'] },
            { title: '拉瑞安再度"切割"《博德之门》IP：没参与任何《博德之门3》相关项目', desc: '面对黑马漫画宣布推出以《博德之门3》角色卡菈克为主角的漫画项目，拉瑞安工作室官方迅速回应："我们没参与任何《博德之门3》相关项目。"拉瑞安急于切割说明双方在IP授权、衍生开发等层面可能存在分歧。', tags: ['拉瑞安', '博德之门', 'IP切割'] },
            { title: '《最终幻想7 重制版》三部曲全新预告首次公开', desc: '在《最终幻想14》欧洲粉丝节活动现场，制作人滨口直树首次放映了《最终幻想7 重制版》系列全新预告片。吉田直树也直言："这个系列打磨得实在太棒了。"', tags: ['FF7', 'SE', '重制版'] },
            { title: '2009年版《德军总部》或迎重制，有望在QuakeCon 2026公布', desc: '据外媒消息，2009年发售的经典FPS《德军总部》可能正在开发重制版本，预计将在今年QuakeCon 2026期间公布。原版近期获得了Steam Deck兼容支持，引发玩家对重制版的猜测。', tags: ['德军总部', 'id Software', 'QuakeCon'] },
            { title: '前《羊蹄山之魂》开发者类魂新作《这龙带刀》Steam获"特别好评"', desc: 'Team Spino LLC开发的类魂动作RPG《这龙带刀》正式发售，Steam好评率达89%获"特别好评"。玩家扮演棘龙用嘴叼着巨型双手剑战斗，融合类魂的格挡、翻滚、弹反系统。', tags: ['这龙带刀', '类魂', '国产独立'] }
        ]},
        '2026-07-27': { preview: '卡普空生化危机年货化、黑旗RE育碧反弹、FF7启示定档2027春、PS6/新Xbox或破千美元、影之刃零WeGame零分成...', cards: [
            { title: '卡普空确认《生化危机》"年货化"：重制+正传一年一部', desc: '卡普空希望《生化危机》能成为每年推出作品的系列，兼顾质量与数量。重制版正是实现"年货化"的关键策略。同时已决定为《生化危机：安魂曲》《维罗妮卡RE》制作数小时时长的大型剧情DLC。', tags: ['卡普空', '生化危机', '年货化'] },
            { title: '《黑旗RE》发售两周即超育碧全年销售预期', desc: '育碧凭借《刺客信条：黑旗 记忆重置》迎来翻身仗。发售仅两周销量即突破公司此前设定的整年度销售预期。这是重制策略的又一次成功验证，证明"经典IP重制"比冒险做新IP更安全。', tags: ['育碧', '刺客信条', '重制'] },
            { title: '《FF7 重制版》三部曲终章《FF7：启示》定档2027年春季', desc: 'Square Enix确认三部曲终章《最终幻想7：启示》将于2027年春季发售。制作人滨口直树放映了全新预告片，吉田直树观看后直言"打磨得实在太棒了"。', tags: ['FF7', 'SE', '发售日'] },
            { title: 'PS6/新Xbox售价或破千美元，内存危机推高次世代硬件门槛', desc: '亚马逊游戏部门总经理透露，新Xbox和PS6定价可能在1000美元以上。主因是全球内存危机导致DRAM价格暴涨，第十世代主机BOM成本中内存占比大幅上升。', tags: ['PS6', '硬件成本', '内存危机'] },
            { title: '《影之刃零》WeGame预约开启，"千万以内零分成"政策引热议', desc: '《影之刃零》在WeGame平台正式开启预约。官方宣传"千万不分成"——一千万收入以内平台零分成，与Steam标准30%分成形成鲜明对比。', tags: ['影之刃零', 'WeGame', '零分成'] }
        ]},
        '2026-07-28': { preview: '光荣股价大跌、505 Games经营自查或出售、CDPR×WayForward边缘行者衍生、4GB显存显卡复活、生化危机破2亿成日本第三IP...', cards: [
            { title: '光荣股价大跌创半年纪录，"不搞二次元"被指与主流脱节', desc: '光荣特库摩股价大幅回落，创下今年 3 月以来最大单日跌幅。核心原因是最新一季度营业利润未达市场预期，新作储备空缺问题暴露。光荣长期回避二次元赛道、坚持传统硬核动作/RPG 路线，导致其与当下最主流的玩家群体脱节。', tags: ['光荣', '股价大跌', '战略失误'] },
            { title: '《幽灵行者》厂商自查经营现状，不排除整体出售资产', desc: '《幽灵行者》发行商 505 Games 的母公司 Digital Bros 宣布启动全面经营自查，公告中明确表示"不排除考虑引入外部投资甚至整体出售公司资产"的可能性。505 Games 旗下拥有《幽灵行者》《Control》《Death Stranding》（PC版发行）等知名 IP。', tags: ['505 Games', '经营自查', '并购潮'] },
            { title: '曝 CDPR 携手 WayForward 开发《赛博朋克：边缘行者》衍生游戏', desc: '据 MP1st 报道，有线索显示 CDPR 曾携 WayForward 开发基于动画《赛博朋克：边缘行者》的衍生游戏项目。WayForward 凭借《热血少女》系列在 2.5D 横版动作领域积累了丰富经验。CDPR 正积极扩展《赛博朋克》IP 边界——衍生动画+衍生游戏+正传续作多线并行。', tags: ['CDPR', '边缘行者', '衍生游戏'] },
            { title: '4GB 显存显卡"复活"——AI 产业引爆显存危机波及游戏硬件', desc: '据数毛社报道，受 AI 产业催生的闪存/显存供应危机持续恶化影响，爆料显示 AMD 全新入门显卡 Radeon RX 9050 有望推出仅 4GB 显存版本——这是近年首款采用 4GB 显存的现代独显。如果入门级 PC 显卡只有 4GB 显存，游戏开发中的纹理池预算、材质流式加载策略需要重新评估。', tags: ['显存危机', 'AMD RX 9050', '硬件成本'] },
            { title: '《生化危机》系列累计销量破 2 亿，超越 FF 成日本第三大 IP', desc: '卡普空旗下《生化危机》系列累计销量已超过《最终幻想》，正式成为日本游戏史上销量第三高的游戏系列（仅次于《马里奥》和《宝可梦》）。《生化危机》系列用近 30 年时间达到 2 亿份里程碑，其中近年重制版贡献了巨大增量。', tags: ['生化危机', '2亿份', '卡普空'] }
        ]},
        '2026-07-29': { preview: '腾讯光子3A项目裁员80人推倒重来、明末2官宣夏思源+505 Games、CIGDC Epic聚焦UE+AI、剑心雕龙首测、7月版号197款创新高...', cards: [
            { title: '腾讯光子洛杉矶工作室裁员80人，3A大作《最后的哨兵》创意方向推倒重来', desc: '腾讯光子洛杉矶工作室宣布，旗下首款3A开放世界大作《最后的哨兵》经过内部评审和试玩后未达预期，决定对游戏进行大规模创意方向调整，约80人团队被裁撤。该项目由前Rockstar资深制作人Steve C. Martin领衔，2023年在TGA高调亮相。', tags: ['腾讯光子', '裁员80人', '最后的哨兵'] },
            { title: '国产3A《明末2》正式官宣，夏思源携新工作室与505 Games达成合作', desc: '505 Games与成都递归海豚科技联合官宣《明末2》（IP名《无常》）正式立项。前作《明末：渊虚之羽》Steam首日同时在线超13.1万，全球累计触达500万玩家。Digital Bros集团已于2026年4月完成该IP知识产权收购。', tags: ['明末2', '夏思源', '505 Games'] },
            { title: '2026 CIGDC上海召开，Epic Games专场聚焦虚幻引擎AI融合与开发者生态', desc: '2026中国国际游戏开发者大会在上海举办，Epic Games专场聚焦虚幻引擎前沿技术突破与产业创新应用。同期举办"AI技术重构游戏产业生态分论坛"，围绕AIGC内容生成、智能NPC交互、AI辅助开发等议题展开。', tags: ['CIGDC', 'Epic Games', '虚幻引擎AI'] },
            { title: '网易仙侠单机《剑心雕龙》首测总结公布，官方强调"纯单机"定位', desc: '网易首款仙侠单机《剑心雕龙》完成首次线下玩家试玩测试。官方强调本作是纯便携端、纯单机游戏，由《古剑奇谭》《仙剑》系列制作人工长君掌舵。制作人张毅君表示"在当今市场坚持做纯单机充满挑战但也非常有意义"。', tags: ['剑心雕龙', '网易', '仙侠单机'] },
            { title: '7月游戏版号发放197款创阶段新高，行业供给端持续宽松', desc: '国家新闻出版署7月发布2026年网络游戏审批信息，共197款游戏获得版号（国产193款+进口4款），单月发放数量创近年来新高。重点产品包括《影之刃零》（客户端+PS5双端）、AI乙女游戏《星眠》。花旗指出监管支持游戏产业健康发展，游戏股集体上涨。', tags: ['版号', '197款', '影之刃零'] }
        ]},
        '2026-07-30': { preview: '上半年游戏收入1884亿出海增30%、顽皮狗新作恐破6亿、九阴真经修仙UE5实机、轮回之兽白金殿堂、索尼PS锁区实体退出...', cards: [
            { title: '2026上半年中国游戏产业报告：国内收入1884亿增12%，出海暴增30%', desc: '中国音数协在CDEC发布《2026年1-6月中国游戏产业报告》。上半年国内游戏市场实际销售收入1884.50亿元（同比+12.17%），用户规模6.84亿（同比+0.82%）；自研游戏海外收入123.72亿美元（同比+30.22%）。出海增速远超国内，美/日/韩合计占海外收入53.84%。', tags: ['CDEC', '产业报告', '出海30%'] },
            { title: '顽皮狗新作成本恐破6亿美元，3A开发模式可持续性遭拷问', desc: '据外网分析人士Kiwi_Talk估算，顽皮狗科幻新作《星际：异端先知》开发成本已超3亿美元，若延期至2028年最终预算可能冲向6亿美元——比很多3A大作总收入还高。此前7月初已有消息称顽皮狗灵魂人物尼尔·德鲁克曼或将离职，导火索正是该作开发资金狂烧。', tags: ['顽皮狗', '3A成本', '6亿美元'] },
            { title: '《九阴真经：修仙》实机PV首曝，蜗牛用虚幻5做开放世界修仙沙盒', desc: '蜗牛游戏公开旗下新作《九阴真经：修仙》首支实机PV，由虚幻5引擎实机录制，展示了御剑飞行、灵气修炼等开放世界修仙玩法。游戏已上线Steam商店页，发售日期未定，将参展2026 ChinaJoy（7/31-8/3）。经典武侠IP转型修仙沙盒+UE5次世代画面。', tags: ['九阴真经', '虚幻5', '修仙沙盒'] },
            { title: '《轮回之兽》获Fami通35分进白金殿堂，Game Freak原创IP首战告捷', desc: '《宝可梦》系列开发商Game Freak全新动作RPG《轮回之兽》获Fami通35分（8/9/9/9），进入白金殿堂。游戏定于8月4日发售，登陆PC/PS5/Xbox，首发加入XGP。中文版8月4日早8点解锁。一人一犬协同作战+即时与回合制融合的设计有创新性。', tags: ['轮回之兽', 'Game Freak', '白金殿堂'] },
            { title: '索尼PS数字版锁区引争议，《GTA6》玩家发现实体盘也不自由', desc: '有玩家发现索尼PS Store数字版游戏出现锁区问题，《GTA6》预购玩家受到影响。与此同时，此前索尼已宣布自2028年1月起所有登陆PS的新游戏不再推出实体光盘，仅以数字版发售。数字版锁区+实体退出，引发对玩家所有权和区域限制的广泛讨论。', tags: ['索尼锁区', 'GTA6', '全数字化'] }
        ]},
        '2026-07-31': { preview: 'EA 550亿收购获欧盟批准、2026裁员预测上调78%至1.4万、Xbox新CEO战略重置、ChinaJoy 2026与AI同游、7月版号197款+PS5破9530万...', cards: [
            { title: 'EA 550亿美元收购案获欧盟批准，史上最大全现金私有化即将完成', desc: '7月23日欧盟委员会正式批准沙特公共投资基金（PIF）牵头财团以550亿美元（约3730亿人民币）收购EA的交易，预计近期完成交割，届时EA将从纳斯达克退市成为私人控股公司。这是全球游戏史上最大全现金私有化收购案，金额仅次于微软收购动视暴雪（690亿美元）。PIF旗下Savvy Gaming Group持续加码，中东主权资本全面进入游戏核心资产，行业资本格局重塑。', tags: ['EA收购', 'PIF', '私有化'] },
            { title: '2026全球游戏行业裁员预测上调78%，全年或超1.4万人', desc: '游戏行业研究机构ASGC发布最新预测：2026年全球游戏行业预计裁员超1.4万人，较1月初始预测的8025人上调78%。截至7/26已记录9781名被裁员工，过去五年累计裁员将接近6万人。7月期间育碧巴塞罗那裁员51人、ZA/UM裁员32人。ASGC创始人指出裁员速度比模型预测更快，裁员非「一次性调整」而是「持续性结构性变化」。', tags: ['裁员预测', 'ASGC', '1.4万人'] },
            { title: 'Xbox新CEO战略重置：裁员3200人+独占策略反复，「不再只依赖主机」', desc: 'Xbox新任CEO阿莎·夏尔马官宣重大战略调整，称Xbox「不再只依赖主机平台」。微软游戏部门启动史上最大规模重组，计划2027财年前裁减3200个岗位（1600个已于7/7裁撤）。6/8 Xbox发布会上《战争机器：事变日》《发条革命》砍掉PS5版本回归独占，与前任斯宾塞「万物皆Xbox」跨平台战略完全相反，反映Game Pass增长放缓后的战略焦虑。', tags: ['Xbox', '战略重置', '独占回归'] },
            { title: 'ChinaJoy 2026开幕：「与AI同游」，近900家企业、1000+款游戏参展', desc: '第二十三届ChinaJoy在上海新国际博览中心开幕，以「与AI同游」为主题，展览面积突破14万平方米，吸引39个国家和地区近900家企业参展（含275家外资），展出游戏1000余款。腾讯、网易、暴雪、世纪华通等头部企业悉数亮相，AI游戏生成、空间渲染、VR/AR沉浸式产品集中登场。ChinaJoy从传统游戏展加速向「AI+游戏」科技展转型。', tags: ['ChinaJoy', '与AI同游', 'AI游戏'] },
            { title: '7月版号197款创五年新高，2026累计1147款；索尼PS5销量破9530万台', desc: '国家新闻出版署发布7月国产网络游戏审批信息，共197款过审为过去五年最大单批次，2026年累计版号达1147款。港股游戏股集体上涨，腾讯+4.16%、B站+4.20%，花旗指出版号发放体现监管层对行业持续支持。同时索尼公布Q2财报，PS5全球销量突破9530万台、月活1.25亿、利润同比暴涨40%，但同步推进的PS数字版锁区+2028停实体盘政策引发超35万人联名抵制。', tags: ['版号197款', 'PS5破9530万', '行业利好'] }
        ]}
    }
};

// ===== 日历归档导航 =====
let currentArchiveTab = 'ai';
let currentArchiveDate = null;

function showArchive() {
    const archiveModal = document.getElementById('archiveModal');
    if (archiveModal) {
        archiveModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        currentArchiveTab = 'ai';
        document.querySelector('.archive-tab:nth-child(1)').classList.add('active');
        document.querySelector('.archive-tab:nth-child(2)').classList.remove('active');
        backToCalendar();
        renderCalendar('ai');
    }
}

function closeArchive() {
    const archiveModal = document.getElementById('archiveModal');
    if (archiveModal) {
        archiveModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function switchArchiveTab(tab) {
    const aiTab = document.querySelector('.archive-tab:nth-child(1)');
    const gameTab = document.querySelector('.archive-tab:nth-child(2)');

    if (tab === 'ai') {
        aiTab.classList.add('active');
        gameTab.classList.remove('active');
    } else {
        aiTab.classList.remove('active');
        gameTab.classList.add('active');
    }
    currentArchiveTab = tab;
    backToCalendar();
    renderCalendar(tab);
}

function loadArchiveDate(tab, date) {
    // Deprecated: calendar system handles date selection
}

function renderCalendar(category) {
    const grid = document.getElementById('archiveCalendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = 2026, month = 7;
    const daysInMonth = 31;
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon=0

    // Empty cells before first day
    for (let i = 0; i < startOffset; i++) {
        const cell = document.createElement('div');
        cell.className = 'archive-calendar-cell empty';
        grid.appendChild(cell);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `2026-07-${String(day).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'archive-calendar-cell';
        cell.textContent = day;

        if (archiveData[category] && archiveData[category][dateStr]) {
            cell.classList.add('has-data');
            cell.onclick = () => selectArchiveDate(category, dateStr);
        }

        // Today highlight
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        if (dateStr === todayStr) {
            cell.classList.add('today');
        }

        grid.appendChild(cell);
    }
}

function selectArchiveDate(category, dateStr) {
    // Update selected state
    document.querySelectorAll('.archive-calendar-cell.selected').forEach(c => c.classList.remove('selected'));
    const cells = document.querySelectorAll('.archive-calendar-cell.has-data');
    cells.forEach(c => {
        const day = parseInt(c.textContent);
        const cellDate = `2026-07-${String(day).padStart(2, '0')}`;
        if (cellDate === dateStr) c.classList.add('selected');
    });

    currentArchiveDate = dateStr;

    // Show detail view
    document.getElementById('archiveCalendarWrapper').style.display = 'none';
    const detail = document.getElementById('archiveNewsDetail');
    detail.style.display = 'block';
    document.getElementById('archiveNewsDateHeader').textContent = '📅 ' + dateStr;

    const container = document.getElementById('archiveNewsCardsContainer');
    container.innerHTML = '';

    const data = archiveData[category] && archiveData[category][dateStr];
    if (!data) {
        container.innerHTML = '<div class="archive-news-preview-card"><span class="preview-label">暂无数据</span></div>';
        return;
    }

    if (data.cards && data.cards.length > 0) {
        data.cards.forEach((card, i) => {
            container.appendChild(renderNewsCard(card, i + 1));
        });
    } else {
        const previewCard = document.createElement('div');
        previewCard.className = 'archive-news-preview-card';
        previewCard.innerHTML = '<span class="preview-label">预览摘要</span><p class="preview-text">' + data.preview + '</p>';
        container.appendChild(previewCard);
    }
}

function backToCalendar() {
    document.getElementById('archiveCalendarWrapper').style.display = 'block';
    document.getElementById('archiveNewsDetail').style.display = 'none';
    currentArchiveDate = null;
}

function navigateMonth(direction) {
    // Placeholder for future month navigation
    // Currently only July 2026 has data
}

function renderNewsCard(cardData, index) {
    const card = document.createElement('div');
    card.className = 'archive-news-card';

    const tagsHtml = cardData.tags.map(t => '<span class="archive-news-card-tag">' + t + '</span>').join('');

    card.innerHTML = '<div class="archive-news-card-header">' +
        '<span class="archive-news-card-number">' + index + '</span>' +
        '<h3>' + cardData.title + '</h3>' +
        '</div>' +
        '<p>' + cardData.desc + '</p>' +
        '<div class="archive-news-card-tags">' + tagsHtml + '</div>';

    return card;
}

function renderPreviewCard(previewText) {
    const card = document.createElement('div');
    card.className = 'archive-news-preview-card';
    card.innerHTML = '<span class="preview-label">预览摘要</span><p class="preview-text">' + previewText + '</p>';
    return card;
}



// 打开作品详情
function openWorkDetail(workId) {
    const work = worksData.find(item => item.id === workId);
    if (work) {
        document.getElementById('workTitle').textContent = work.title;
        document.getElementById('workDescription').textContent = work.description;
        document.getElementById('workImage').src = work.image;
        
        // 更新技术标签
        const techTags = document.querySelector('.tech-tags');
        techTags.innerHTML = '';
        work.tech.forEach(tech => {
            const techElement = document.createElement('span');
            techElement.className = 'tech-tag';
            techElement.textContent = tech;
            techTags.appendChild(techElement);
        });
        
        // 更新图片画廊
        const gallery = document.getElementById('workGallery');
        gallery.innerHTML = '';
        if (work.gallery && work.gallery.length > 0) {
            work.gallery.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = '制作过程 ' + (index + 1);
                img.className = 'gallery-image';
                img.setAttribute('data-src', imgSrc);
                img.addEventListener('click', function() {
                    document.getElementById('workImage').src = this.getAttribute('data-src');
                });
                gallery.appendChild(img);
            });
            gallery.style.display = 'flex';
        } else {
            gallery.style.display = 'none';
        }
        
        // 更新时间线
        const timeline = document.getElementById('workTimeline');
        timeline.innerHTML = '';
        if (work.timeline && work.timeline.length > 0) {
            const timelineTitle = document.createElement('h3');
            timelineTitle.textContent = '制作时间线';
            timeline.appendChild(timelineTitle);
            
            work.timeline.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
                const timelineMarker = document.createElement('div');
                timelineMarker.className = 'timeline-marker';
                timelineMarker.textContent = index + 1;
                
                const timelineContent = document.createElement('div');
                timelineContent.className = 'timeline-content';
                
                const timelinePeriod = document.createElement('div');
                timelinePeriod.className = 'timeline-period';
                timelinePeriod.textContent = item.period;
                
                const timelineTitle = document.createElement('h4');
                timelineTitle.className = 'timeline-title';
                timelineTitle.textContent = item.title;
                
                const timelineDesc = document.createElement('p');
                timelineDesc.className = 'timeline-desc';
                timelineDesc.textContent = item.description;
                
                timelineContent.appendChild(timelinePeriod);
                timelineContent.appendChild(timelineTitle);
                timelineContent.appendChild(timelineDesc);
                
                timelineItem.appendChild(timelineMarker);
                timelineItem.appendChild(timelineContent);
                
                if (index < work.timeline.length - 1) {
                    const timelineLine = document.createElement('div');
                    timelineLine.className = 'timeline-line';
                    timelineItem.appendChild(timelineLine);
                }
                
                timeline.appendChild(timelineItem);
            });
            timeline.style.display = 'block';
        } else {
            timeline.style.display = 'none';
        }
        
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

// 当前角色和媒体索引
let currentCharacter = null;
let currentMediaIndex = 0;

// 更新角色媒体内容
function updateCharacterMedia() {
    if (!currentCharacter || !currentCharacter.media || currentCharacter.media.length === 0) {
        return;
    }
    
    const mediaList = currentCharacter.media;
    const total = mediaList.length;
    
    // 计算三个位置的索引
    const leftIndex = (currentMediaIndex - 1 + total) % total;
    const centerIndex = currentMediaIndex;
    const rightIndex = (currentMediaIndex + 1) % total;
    
    // 更新左预览
    updateCarouselItem('carouselLeft', mediaList[leftIndex]);
    // 更新中间主图
    updateCarouselItem('carouselCenter', mediaList[centerIndex]);
    // 更新右预览
    updateCarouselItem('carouselRight', mediaList[rightIndex]);
    
    // 更新指示器
    updateMediaIndicators();
}

// 更新单个轮播项
function updateCarouselItem(itemId, media) {
    const item = document.getElementById(itemId);
    const imgElement = item.querySelector('img');
    const videoElement = item.querySelector('video');
    const labelElement = item.querySelector('.carousel-label');
    
    if (media.type === 'image') {
        imgElement.style.display = 'block';
        imgElement.src = media.src;
        videoElement.style.display = 'none';
        videoElement.src = '';
    } else if (media.type === 'video') {
        if (media.src) {
            // 先设置回退图片为当前角色的图片，防止视频加载失败时显示旧图片
            imgElement.src = currentCharacter ? currentCharacter.image : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coming%20soon%20placeholder%2C%20green%20theme%2C%20cute%20character%2C%20fantasy%20style&image_size=portrait_4_3';
            imgElement.style.display = 'block';
            
            videoElement.src = media.src;
            videoElement.style.display = 'none';
            
            // 添加视频加载成功的回调
            videoElement.onloadeddata = function() {
                imgElement.style.display = 'none';
                videoElement.style.display = 'block';
            };
            
            // 添加视频加载失败的回退机制
            videoElement.onerror = function() {
                videoElement.style.display = 'none';
                videoElement.src = '';
                imgElement.style.display = 'block';
                imgElement.src = currentCharacter ? currentCharacter.image : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coming%20soon%20placeholder%2C%20green%20theme%2C%20cute%20character%2C%20fantasy%20style&image_size=portrait_4_3';
            };
            
            videoElement.load();
        } else {
            imgElement.style.display = 'block';
            imgElement.src = currentCharacter ? currentCharacter.image : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coming%20soon%20placeholder%2C%20green%20theme%2C%20cute%20character%2C%20fantasy%20style&image_size=portrait_4_3';
            videoElement.style.display = 'none';
            videoElement.src = '';
        }
    }
    
    labelElement.textContent = media.label;
}

// 更新媒体指示器
function updateMediaIndicators() {
    if (!currentCharacter || !currentCharacter.media || currentCharacter.media.length <= 1) {
        document.getElementById('mediaIndicators').innerHTML = '';
        return;
    }
    
    let indicatorsHtml = '';
    currentCharacter.media.forEach((media, index) => {
        const activeClass = index === currentMediaIndex ? 'active' : '';
        indicatorsHtml += `<button class="indicator-btn ${activeClass}" onclick="setMediaIndex(${index})">${media.label}</button>`;
    });
    document.getElementById('mediaIndicators').innerHTML = indicatorsHtml;
}

// 设置媒体索引
function setMediaIndex(index) {
    if (!currentCharacter || !currentCharacter.media) return;
    if (index >= 0 && index < currentCharacter.media.length) {
        currentMediaIndex = index;
        updateCharacterMedia();
    }
}

// 上一个媒体
function prevMedia() {
    if (!currentCharacter || !currentCharacter.media || currentCharacter.media.length <= 1) return;
    currentMediaIndex = (currentMediaIndex - 1 + currentCharacter.media.length) % currentCharacter.media.length;
    updateCharacterMedia();
}

// 下一个媒体
function nextMedia() {
    if (!currentCharacter || !currentCharacter.media || currentCharacter.media.length <= 1) return;
    currentMediaIndex = (currentMediaIndex + 1) % currentCharacter.media.length;
    updateCharacterMedia();
}

// 打开角色详情
function openCharacterDetail(characterId) {
    const character = charactersData.find(item => item.id === characterId);
    if (character) {
        currentCharacter = character;
        currentMediaIndex = 0;
        
        document.getElementById('characterTitle').textContent = character.name;
        document.getElementById('characterSubtitle').textContent = character.subtitle;
        document.getElementById('characterDescription').textContent = character.description;
        
        // 先清空所有视频源，防止缓存问题
        const videoElements = document.querySelectorAll('.carousel-item video');
        videoElements.forEach(video => {
            video.pause();
            video.src = '';
        });
        
        // 更新媒体内容
        updateCharacterMedia();
        
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
        
        // 停止所有视频播放并清空视频源，防止缓存问题
        const videoElements = document.querySelectorAll('.carousel-item video');
        videoElements.forEach(video => {
            video.pause();
            video.src = '';
        });
        
        // 重置轮播图显示图片占位
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => {
            const imgElement = item.querySelector('img');
            const videoElement = item.querySelector('video');
            if (imgElement && videoElement) {
                imgElement.style.display = 'block';
                videoElement.style.display = 'none';
            }
        });
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

// 切换项目经历分类
function switchCategory(category) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.category-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="switchCategory('${category}')"]`).classList.add('active');
    
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(`${category}-content`).style.display = 'block';
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

// ================================
// 防复制、防图片保存功能
// ================================

// 禁用右键菜单
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.closest('img') || 
        e.target.classList.contains('game-img') || 
        e.target.classList.contains('game-character') ||
        e.target.classList.contains('game-detail-cover') ||
        e.target.classList.contains('gallery-item') ||
        e.target.classList.contains('character-card') ||
        e.target.classList.contains('item-card') ||
        e.target.classList.contains('work-card')) {
        e.preventDefault();
        return false;
    }
});

// 禁用拖拽图片
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    img.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
});

// 为所有图片添加防护属性 - 不破坏布局
function addImageProtection() {
    const image = document.querySelectorAll('img');
    
    image.forEach(function(img) {
        // 只添加防止复制和拖拽的属性，不改变布局
        img.setAttribute('draggable', 'false');
        img.setAttribute('ondragstart', 'return false');
    });
}

window.addEventListener('load', function() {
    addImageProtection();
    setInterval(addImageProtection, 2000);
});

// 禁用键盘快捷键
document.addEventListener('keydown', function(e) {
    if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() === '') {
            e.preventDefault();
            return false;
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('selectionchange', function() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range && range.startContainer) {
            const container = range.startContainer.parentElement;
            if (container && (container.classList.contains('protected-image') || 
                            container.querySelector('.protected-image'))) {
                selection.removeAllRanges();
            }
        }
    }
});

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
        name: '一心',
        subtitle: 'YIXIN',
        description: '凝聚着执着信念的神秘道具',
        image: 'image/yixin.png',
        attributes: {
            attack: 50,
            defense: 30,
            rarity: 'SSR'
        },
        rarity: 'SSR',
        type: '道具',
        element: '信念',
        number: 'NO.007',
        backstory: '一心是一件凝聚着执着信念的神秘道具。据说持有它的人能够获得强大的力量，突破一切困难。'
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
    
    itemCards.forEach(function(card) {
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
                itemCards.forEach(function(c) {
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
    const item = itemsData.find(function(item) { return item.id === itemId; });
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
        const currentVideo = slides[currentSlide].querySelector('.background-video');
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0; // 重置视频到开始位置
        }
        slides[currentSlide].classList.remove('active');
        
        // 切换到下一张幻灯片
        currentSlide = (currentSlide + 1) % slideCount;
        
        // 显示下一张幻灯片
        slides[currentSlide].classList.add('active');
        
        // 播放当前幻灯片中的视频（如果有）
        const nextVideo = slides[currentSlide].querySelector('.background-video');
        if (nextVideo) {
            nextVideo.currentTime = 0; // 重置视频到开始位置
            nextVideo.play();
        }
    }
    
    // 初始激活第一张幻灯片
    if (slides.length > 0) {
        slides[0].classList.add('active');
        const initialVideo = slides[0].querySelector('.background-video');
        if (initialVideo) {
            initialVideo.play();
        }
    }
    
    // 每5秒切换一次背景
    setInterval(nextSlide, 5000);
}

// 页面加载完成后初始化背景切换
initBackgroundSlider();
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

// 卡片切换函数 - 毕业设计卡片与工具卡片切换
function switchCard(type) {
    const card = document.getElementById('graduation-card');
    if (!card) return;

    const cardData = {
        graduation: {
            image: 'image/2121.png',
            date: '2026年4月18日',
            views: '0 阅读',
            title: '毕业设计：三维全流程和2D两个媒介结合开发日志',
            desc: '四人团队合作项目，我同时负责三维和二维两个方向的内容创作，采用三维全流程制作方法辅助工作，减少工作量，其他成员负责纯二维部分。融合三维建模的立体感和2D设计的艺术表现力，创造独特视觉效果。',
            link: 'blog-graduation-project.html'
        },
        video: {
            image: 'image/jieturizhi1.jpg',
            date: '2026年4月11日',
            views: '42 阅读',
            title: '一键帧截图拼图工具开发日志',
            desc: '为了准备论文附录材料，开发了一个可以投入一段视频然后截取所有帧图片的网页工具，提高了视频截图的效率。',
            link: 'blog-video-frame-extractor.html'
        },
        audio: {
            image: 'image/yingui1.jpg',
            date: '2026年4月22日',
            views: '0 阅读',
            title: '音轨分离工具开发日志',
            desc: '基于Python和深度学习的音频处理工具，能够将音频文件分离为多个音轨（如人声、鼓、贝斯、其他乐器等），并为每个音轨生成可视化的波形图，支持多种音频格式。',
            link: 'blog-audio-separator.html'
        }
    };

    const data = cardData[type];
    if (!data) return;

    // 更新图片
    const img = card.querySelector('.blog-image img');
    if (img) {
        img.src = data.image;
        img.alt = data.title;
    }

    // 更新日期和阅读量
    const dateSpan = card.querySelector('.blog-date');
    const viewsSpan = card.querySelector('.blog-views');
    if (dateSpan) dateSpan.textContent = data.date;
    if (viewsSpan) viewsSpan.textContent = data.views;

    // 更新标题和描述
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) h3.textContent = data.title;
    if (p) p.textContent = data.desc;

    // 更新阅读全文链接
    const readMore = card.querySelector('.read-more');
    if (readMore) readMore.href = data.link;
}

// 电路卡片切换函数
function switchCircuitCard(type) {
    const card = document.getElementById('circuit-card');
    if (!card) return;

    const cardData = {
        game: {
            date: '2026年4月23日',
            views: '0 阅读',
            title: '电路链接游戏开发日志',
            desc: '基于Unity URP渲染管线开发的益智类游戏，玩家需要通过连接电路来解决各种谜题。游戏采用现代化的视觉风格，结合了物理模拟和逻辑推理元素，为玩家提供了富有挑战性的游戏体验。',
            link: 'blog-electric-jigsaw.html'
        },
        effect: {
            date: '2026年4月22日',
            views: '0 阅读',
            title: '电路效果开发日志',
            desc: '记录了在电路效果开发方面的探索和实践，包括电路板、跳电、单根电等电路相关的视觉效果。',
            link: 'blog-circuit.html'
        },
        scene: {
            date: '2026年4月23日',
            views: '0 阅读',
            title: '场景效果开发日志',
            desc: '整理了一系列场景效果，包括云效果、交替时间段着色器、扰动效果等多种视觉效果的开发过程。这些录屏记录了从概念设计到技术实现的完整开发流程。',
            link: 'blog-screen-recordings.html'
        }
    };

    const data = cardData[type];
    if (!data) return;

    // 更新日期和阅读量
    const dateSpan = card.querySelector('.blog-date');
    const viewsSpan = card.querySelector('.blog-views');
    if (dateSpan) dateSpan.textContent = data.date;
    if (viewsSpan) viewsSpan.textContent = data.views;

    // 更新标题和描述
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) h3.textContent = data.title;
    if (p) p.textContent = data.desc;

    // 更新阅读全文链接
    const readMore = card.querySelector('.read-more');
    if (readMore) readMore.href = data.link;
}

// ================================
// 版权保护功能
// ================================

// CONFIG
const CONFIG = {
    geoApiUrl: '', // 留空使用默认 ipapi.co
    siteName: '独行者作品站',
    watermarkText: '独行者作品站',
    watermarkInterval: 30000 // 水印刷新间隔（毫秒）
};

// 禁止右键菜单
function disableRightClick() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showCustomAlert('本站禁止右键保存');
    });
}

// 禁止快捷键
function disableShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+S 保存
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showCustomAlert('本站禁止保存');
        }
        // Ctrl+A 全选
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
        }
        // Ctrl+P 打印
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            showCustomAlert('本站禁止打印');
        }
        // Ctrl+U 查看源码
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showCustomAlert('本站禁止查看源码');
        }
        // F12 / Shift+Ctrl+I 开发者工具
        if (e.key === 'F12' || (e.shiftKey && e.ctrlKey && e.key === 'i')) {
            e.preventDefault();
            showCustomAlert('本站禁止使用开发者工具');
        }
        // PrintScreen 截屏
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            showCustomAlert('本站禁止截屏');
        }
    });
}

// 禁止复制/剪切/粘贴
function disableClipboard() {
    document.addEventListener('copy', function(e) {
        e.preventDefault();
    });
    document.addEventListener('cut', function(e) {
        e.preventDefault();
    });
    document.addEventListener('paste', function(e) {
        e.preventDefault();
    });
}

// 禁止拖拽图片
function disableDrag() {
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
}

// 检测开发者工具
function detectDevTools() {
    const threshold = 160;
    const checkInterval = setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold) {
            showDevToolsWarning();
        }
    }, 1000);
}

// 显示自定义警告
function showCustomAlert(message) {
    alert(message);
}

// 显示开发者工具警告
function showDevToolsWarning() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    const warning = document.createElement('div');
    warning.innerHTML = `
        <div style="color: #ff4444; font-size: 1.5rem; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
            <div>检测到开发者工具</div>
            <div style="font-size: 1rem; margin-top: 10px; color: #fff;">请关闭开发者工具以继续浏览</div>
        </div>
    `;
    overlay.appendChild(warning);
    document.body.appendChild(overlay);
    
    const checkClosed = setInterval(function() {
        if (window.outerHeight - window.innerHeight < 160) {
            document.body.removeChild(overlay);
            clearInterval(checkClosed);
        }
    }, 500);
}

// 页面失焦显示黑屏遮罩
function setupBlurProtection() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            const overlay = document.createElement('div');
            overlay.id = 'blur-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: 99997;
            `;
            document.body.appendChild(overlay);
        } else {
            const overlay = document.getElementById('blur-overlay');
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }
    });
}

// 生成动态水印
function generateWatermark() {
    const canvas = document.getElementById('watermark-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const text = CONFIG.watermarkText + ' | ' + new Date().toLocaleDateString();
    const fontSize = 24;
    
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 0.5;
    
    const spacing = 120;
    const rotation = -Math.PI / 8;
    
    for (let x = -200; x < canvas.width + 200; x += spacing) {
        for (let y = -200; y < canvas.height + 200; y += spacing) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillText(text, 0, 0);
            ctx.restore();
        }
    }
}

// 获取访客信息
async function getVisitorInfo() {
    const userAgent = navigator.userAgent;
    let os = '未知系统';
    let browser = '未知浏览器';
    
    // 检测操作系统
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac OS')) os = 'Mac OS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
    
    // 检测浏览器
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    // 获取城市 - 优化版本：添加超时和缓存
    let city = '未知城市';
    try {
        // 检查缓存
        const cachedCity = sessionStorage.getItem('visitorCity');
        if (cachedCity) {
            city = cachedCity;
        } else {
            const url = CONFIG.geoApiUrl || 'https://ipapi.co/json/';
            
            // 创建超时Promise
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('请求超时')), 3000);
            });
            
            // 使用Promise.race实现超时控制
            const response = await Promise.race([
                fetch(url),
                timeoutPromise
            ]);
            
            const data = await response.json();
            
            if (data.city) city = data.city;
            else if (data.city_name) city = data.city_name;
            else if (data.district) city = data.district;
            
            // 缓存结果，有效期1小时
            sessionStorage.setItem('visitorCity', city);
            sessionStorage.setItem('visitorCityTime', Date.now().toString());
        }
    } catch (e) {
        // 超时或错误时使用默认值，不影响页面加载
        console.log('位置检测超时或失败，使用默认值');
    }
    
    return { os, browser, city };
}

// 显示版权警告弹窗
async function showCopyrightModal() {
    if (sessionStorage.getItem('copyrightAccepted')) {
        return; // 已接受过，跳过
    }
    
    const modal = document.getElementById('copyright-modal');
    if (!modal) return;
    
    modal.style.display = 'block';
    
    const visitorInfo = await getVisitorInfo();
    const infoDiv = document.getElementById('visitor-info');
    if (infoDiv) {
        infoDiv.textContent = `${visitorInfo.os} / ${visitorInfo.browser} / ${visitorInfo.city} 用户`;
    }
    
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        sessionStorage.setItem('copyrightAccepted', '1');
        
        // 触发版权接受事件
        const event = new Event('copyrightAccepted');
        document.dispatchEvent(event);
    });
}

// 开启界面sessionStorage控制 - 仅保留版权弹窗逻辑
function setupSplashScreen() {
    const mainContent = document.getElementById('main-content') || document.body;
    
    window.addEventListener('DOMContentLoaded', function() {
        // 等待版权弹窗
        mainContent.style.display = 'none';
    });
    
    // 版权弹窗接受后显示主内容
    document.addEventListener('copyrightAccepted', function() {
        mainContent.style.display = 'block';
    });
}

// 初始化版权保护功能
function initCopyrightProtection() {
    disableRightClick();
    disableShortcuts();
    disableClipboard();
    disableDrag();
    detectDevTools();
    setupBlurProtection();
    generateWatermark();
    setInterval(generateWatermark, CONFIG.watermarkInterval);
}

// 启动版权保护
initCopyrightProtection();