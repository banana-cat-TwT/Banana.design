/*
  SPDX-License-Identifier: MIT
  SPDX-FileCopyrightText: 2026 巴拿拿猫 (BananaCat) · Banana.design (https://banana.design)

  anti-bot.js · Banana.design 前端爬虫检测与拦截
  说明：本脚本仅能拦截“会执行 JS 的 headless / 自动化浏览器爬虫”；
        对于不执行 JS、直接抓取 HTML 源码的服务端爬虫，需在 Cloudflare 面板
        开启 Bot Fight Mode / WAF 才能真正拦截（见 _headers 注释）。
*/
(function () {
    'use strict';
    try {
        var ua = (navigator.userAgent || '').toLowerCase();

        // 本站为私域作品集：不设搜索引擎白名单，所有爬虫 UA 一律按黑名单拦截
        function hit(list) {
            for (var i = 0; i < list.length; i++) {
                if (ua.indexOf(list[i]) > -1) return true;
            }
            return false;
        }

        // —— 恶意 / 采集 / 搜索引擎爬虫 UA 黑名单（私域站：全部拦截）——
        var BLOCK = [
            'bot', 'spider', 'crawl', 'scrapy', 'curl', 'wget',
            'python', 'java/', 'okhttp', 'go-http-client', 'httpclient',
            'node-fetch', 'axios', 'phantomjs', 'headless',
            'selenium', 'puppeteer', 'playwright',
            'facebookexternalhit', 'twitterbot', 'embedly',
            'bytespider', 'toutiao', 'xigua', 'xiaohongshu', 'rednote'
        ];

        var blocked = false;
        if (hit(BLOCK)) blocked = true;

        // —— headless / 自动化浏览器特征评分（避免单一特征误伤正常用户）——
        if (!blocked) {
            var score = 0;
            if (navigator.webdriver === true) score += 3;            // Selenium/Playwright 标志性特征
            if (navigator.plugins && navigator.plugins.length === 0) score += 1;
            if (window.outerWidth === 0 && window.outerHeight === 0) score += 2;
            if (navigator.languages && navigator.languages.length === 0) score += 1;
            if (/chrome|chromium|crios/i.test(ua) && !window.chrome) score += 2;
            if (score >= 3) blocked = true;
        }

        if (!blocked) return;

        // —— 命中拦截：隐藏主体内容 + 显示保护提示 ——
        var css = document.createElement('style');
        css.textContent =
            'html,body{background:#FBF4E8!important;}' +
            'body>*{visibility:hidden!important;}' +
            '.ab-guard,.ab-guard *{visibility:visible!important;all:initial;}' +
            '.ab-guard{position:fixed!important;inset:0!important;z-index:2147483647!important;' +
            'display:flex!important;align-items:center!important;justify-content:center!important;' +
            'background:#FBF4E8!important;font-family:"Helvetica Neue","PingFang SC","Microsoft YaHei",sans-serif!important;}';
        (document.head || document.documentElement).appendChild(css);

        function mount() {
            if (document.querySelector('.ab-guard')) return;
            var box = document.createElement('div');
            box.className = 'ab-guard';
            box.innerHTML =
                '<div style="text-align:center;padding:40px;color:#4A3F33;">' +
                '<div style="font-size:52px;line-height:1;">🛡️</div>' +
                '<h2 style="font-size:20px;margin:14px 0 8px;letter-spacing:1px;">内容保护已启用</h2>' +
                '<p style="font-size:13px;color:#8A7A68;max-width:320px;line-height:1.7;margin:0 auto;">' +
                '本站内容受版权保护，禁止自动化抓取与转载。<br>' +
                '如您是真实访客，请使用常规浏览器访问 banana.design</p>' +
                '</div>';
            if (document.body) document.body.appendChild(box);
        }
        if (document.body) mount();
        else document.addEventListener('DOMContentLoaded', mount);

        // 尝试停止后续资源加载（不影响已加载内容）
        try { window.stop(); } catch (e) {}
    } catch (e) {
        // 检测异常时静默放行，绝不影响正常访客
    }
})();
