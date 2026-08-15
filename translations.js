// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2026 巴拿拿猫 (BananaCat) · Banana.design
// BANANA_DESIGN_BUILD_SIGNATURE_bananacat_001
// 中英文翻译字典与切换逻辑 · Banana.design i18n

const BANANA_DESIGN_BUILD_SIGNATURE_bananacat_002 = 'i18n-module';

const translations = {
    zh: {
        // 侧边导航
        'nav.title': '导航目录',
        'nav.home': '首页',
        'nav.works': '作品展示',
        'nav.characters': '角色展示',
        'nav.items': '道具展示',
        'nav.games': '游戏展示',
        'nav.blog': '开发日志',
        'nav.about': '关于我',

        // 顶部导航
        'topnav.works': '作品展示',
        'topnav.characters': '角色展示',
        'topnav.items': '道具展示',
        'topnav.games': '小游戏',
        'topnav.blog': '开发日志',
        'topnav.about': '关于我',

        // Hero
        'hero.subtitle': '该网站正在施工中~制作不易，请见谅。',
        'hero.btn.works': '查看作品',
        'hero.btn.about': '了解更多',

        // 作品展示
        'works.title': '作品展示',
        'works.desc': '日常创作总览',
        'works.cat.all': '全部',
        'works.cat.game': '游戏开发',
        'works.cat.character': '角色设计',
        'works.cat.prop': '道具设计',
        'works.cat.other': '其他创作',

        // 角色展示
        'characters.title': '人工手搓角色展示',
        'characters.desc': '鼠标悬停查看角色详情，点击卡片翻转',

        // 道具展示
        'items.title': '人工手搓道具展示',
        'items.desc': '探索我设计的各种道具和武器',

        // 小游戏
        'games.title': '小游戏',
        'games.desc': '目前展示的都是课余时间制作的小游戏！欢迎大家玩看看~',
        'games.detail': '查看详情',

        // 开发日志
        'blog.title': '开发日志',
        'blog.desc': '分享开发心得、技术文章和创作故事',
        'blog.cat.all': '全部',
        'blog.cat.llm': '大模型',
        'blog.readmore': '阅读全文',
        'blog.related': '相关日志',

        // 关于我
        'about.title': '关于我',
        'about.desc1': '专注于三维与二维、游戏开发和视觉设计等方面',
        'about.desc2': '点击卡片了解详情内容！',
        'about.edu': '教育经历',
        'about.internship': '实习经历',
        'about.projects': '项目经历',
        'about.cat.games': '🎮 游戏',
        'about.cat.ai': '🤖 AI Coding',
        'about.cat.other': '📱 其他',
        'about.thesis.toggle': '详情信息/毕业论文/设计概要',

        // 页脚
        'footer.tagline': '探索技术与创作的边界',
        'footer.building': '这个小家正在装修中噢',
        'footer.contact': '联系方式',
        'footer.phone': '电话',
        'footer.email': '邮箱',
        'footer.location': '所在地',
        'footer.location.val': '广东深圳',
        'footer.social': '社交媒体',
        'footer.copyright': '© 2026 我的作品集',

        // 模态框
        'modal.back': '← 返回',

        // 语言切换
        'lang.switch': 'EN',
        'lang.label': '中文'
    },

    en: {
        // Side Navigation
        'nav.title': 'Navigation',
        'nav.home': 'Home',
        'nav.works': 'Portfolio',
        'nav.characters': 'Characters',
        'nav.items': 'Props',
        'nav.games': 'Games',
        'nav.blog': 'Dev Log',
        'nav.about': 'About',

        // Top Navigation
        'topnav.works': 'Portfolio',
        'topnav.characters': 'Characters',
        'topnav.items': 'Props',
        'topnav.games': 'Mini Games',
        'topnav.blog': 'Dev Log',
        'topnav.about': 'About',

        // Hero
        'hero.subtitle': 'This website is currently under construction. Thank you for your patience.',
        'hero.btn.works': 'View Portfolio',
        'hero.btn.about': 'Learn More',

        // Portfolio
        'works.title': 'Portfolio',
        'works.desc': 'A showcase of daily creative work',
        'works.cat.all': 'All',
        'works.cat.game': 'Game Development',
        'works.cat.character': 'Character Design',
        'works.cat.prop': 'Prop Design',
        'works.cat.other': 'Other Works',

        // Characters
        'characters.title': 'Handcrafted Characters',
        'characters.desc': 'Hover for details, click to flip the card',

        // Props
        'items.title': 'Handcrafted Props',
        'items.desc': 'Explore various props and weapons I designed',

        // Mini Games
        'games.title': 'Mini Games',
        'games.desc': 'These are mini games made in my spare time. Enjoy!',
        'games.detail': 'View Details',

        // Development Log
        'blog.title': 'Development Log',
        'blog.desc': 'Sharing development insights, technical articles, and creative stories',
        'blog.cat.all': 'All',
        'blog.cat.llm': 'LLM',
        'blog.readmore': 'Read More',
        'blog.related': 'Related Logs',

        // About Me
        'about.title': 'About Me',
        'about.desc1': 'Focused on 3D and 2D art, game development, and visual design',
        'about.desc2': 'Click the cards for more details',
        'about.edu': 'Education',
        'about.internship': 'Internship Experience',
        'about.projects': 'Project Experience',
        'about.cat.games': '🎮 Games',
        'about.cat.ai': '🤖 AI Coding',
        'about.cat.other': '📱 Other',
        'about.thesis.toggle': 'Details / Thesis / Design Summary',

        // Footer
        'footer.tagline': 'Exploring the boundary between technology and creation',
        'footer.building': 'This little home is still under renovation',
        'footer.contact': 'Contact',
        'footer.phone': 'Phone',
        'footer.email': 'Email',
        'footer.location': 'Location',
        'footer.location.val': 'Shenzhen, Guangdong',
        'footer.social': 'Social Media',
        'footer.copyright': '© 2026 My Portfolio',

        // Modal
        'modal.back': '← Back',

        // Language Switch
        'lang.switch': '中文',
        'lang.label': 'EN'
    }
};

const BANANA_DESIGN_BUILD_SIGNATURE_bananacat_003 = 'i18n-translate-fn';

// 当前语言
let currentLang = localStorage.getItem('banana-lang') || 'zh';

// 语言下拉菜单展开/收起
function toggleLangDropdown() {
    const menu = document.getElementById('langDropdownMenu');
    if (!menu) return;
    const isOpen = menu.style.opacity === '1';
    if (isOpen) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-4px)';
    } else {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
    }
}

// 点击页面其他位置关闭下拉菜单
function _banana_lang_init_outside_click() {
    document.addEventListener('click', function(e) {
        const btn = document.getElementById('langDropdownBtn');
        const menu = document.getElementById('langDropdownMenu');
        if (!btn || !menu) return;
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-4px)';
        }
    });
}

// 选择语言
function selectLanguage(lang) {
    // 关闭下拉菜单
    const menu = document.getElementById('langDropdownMenu');
    if (menu) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-4px)';
    }
    applyLanguage(lang);
}

// 应用翻译
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('banana-lang', lang);

    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 基于 class 选择器自动翻译重复文本（无需逐个加 data-i18n）
    // 阅读全文按钮
    document.querySelectorAll('a.read-more').forEach(el => {
        el.textContent = translations[lang]['blog.readmore'];
    });

    // 相关日志标题（在 blog-card 内包含"相关日志"的 p 标签）
    document.querySelectorAll('.blog-card p, .blog-content p').forEach(el => {
        if (el.textContent.trim() === '相关日志' || el.textContent.trim() === 'Related Logs') {
            el.textContent = translations[lang]['blog.related'];
        }
    });

    // 更新 html lang 属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // 更新下拉菜单按钮文字：中文环境显示「中文」，英文环境显示「English」
    const currentLabel = document.getElementById('langCurrentLabel');
    if (currentLabel) {
        currentLabel.textContent = lang === 'zh' ? '中文' : 'English';
    }

    // 同步更新下拉菜单选项文字
    const optZh = document.getElementById('langOptZh');
    const optEn = document.getElementById('langOptEn');
    const optSoon = document.getElementById('langOptSoon');
    if (optZh) {
        optZh.textContent = lang === 'zh' ? '🇨🇳 中文' : '🇨🇳 Chinese';
    }
    if (optEn) {
        optEn.textContent = lang === 'zh'
            ? '🇺🇸 English（未翻译完全😢）'
            : '🇺🇸 English (Partially Translated 😢)';
    }
    if (optSoon) {
        optSoon.textContent = lang === 'zh' ? '✨ 敬请期待' : '✨ Coming Soon';
    }
}

// 兼容旧的语言切换函数
function toggleLanguage() {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage(newLang);
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(currentLang);
    _banana_lang_init_outside_click();
});

