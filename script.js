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

function showArchive() {
    const archiveModal = document.getElementById('archiveModal');
    if (archiveModal) {
        archiveModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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
    const aiArchive = document.getElementById('aiArchiveList');
    const gameArchive = document.getElementById('gameArchiveList');
    const aiTab = document.querySelector('.archive-tab:nth-child(1)');
    const gameTab = document.querySelector('.archive-tab:nth-child(2)');
    
    if (tab === 'ai') {
        aiArchive.style.display = 'block';
        gameArchive.style.display = 'none';
        aiTab.classList.add('active');
        gameTab.classList.remove('active');
    } else {
        aiArchive.style.display = 'none';
        gameArchive.style.display = 'block';
        aiTab.classList.remove('active');
        gameTab.classList.add('active');
    }
}

function loadArchiveDate(tab, date) {
    closeArchive();
    if (date === '2026-07-16') {
        switchNewsTab(tab);
    }
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