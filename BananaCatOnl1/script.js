let slideIndex = 0;
const workItems = document.querySelectorAll('.work-item');
const slider = document.querySelector('.works-slider');

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
        return 940; // 900px width + 40px gap
    } else if (screenWidth >= 768) {
        return 940; // 保持相同宽度
    } else {
        return 320; // 280px width + 40px gap
    }
}

function slideWorks(direction) {
    const visibleItems = getVisibleItemsCount();
    const itemWidth = getItemWidth();
    const maxIndex = Math.max(0, workItems.length - visibleItems);
    slideIndex = Math.max(0, Math.min(maxIndex, slideIndex + direction));
    slider.style.transform = `translateX(-${slideIndex * itemWidth}px)`;
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