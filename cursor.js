/*
 * Banana.design 全局自定义光标 + 拖尾
 * 用法：<script src="cursor.js"></script>
 * 可选配色：<script src="cursor.js" data-color="44,143,115"></script>（RGB，默认站点暖橙）
 * 触屏设备自动禁用，不影响手机操作。
 */
(function () {
    // 页面已有内联自定义光标时跳过，避免出现双光标/双拖尾
    var existing = document.querySelectorAll('style');
    for (var i = 0; i < existing.length; i++) {
        if (existing[i].textContent.indexOf('.custom-cursor') !== -1) return;
    }
    if (document.querySelector('.custom-cursor')) return;

    var script = document.currentScript;
    var rgb = (script && script.getAttribute('data-color')) || '236,123,53';

    var style = document.createElement('style');
    style.textContent =
        'body, a, button, input, textarea, select, label, summary, [role="button"] { cursor: none; }' +
        '.custom-cursor{position:fixed;left:0;top:0;width:20px;height:20px;' +
        'background:radial-gradient(circle,rgba(' + rgb + ',0.95) 0%,rgba(' + rgb + ',0.7) 50%,transparent 70%);' +
        'border-radius:50%;pointer-events:none;z-index:999999;transform:translate(-50%,-50%);' +
        'transition:transform .1s ease-out;box-shadow:0 0 12px rgba(' + rgb + ',0.6);}' +
        '.custom-cursor.clicking{transform:translate(-50%,-50%) scale(.8);}' +
        '.cursor-trail{position:fixed;width:10px;height:10px;' +
        'background:radial-gradient(circle,rgba(' + rgb + ',0.9) 0%,rgba(' + rgb + ',0.5) 50%,transparent 70%);' +
        'border-radius:50%;pointer-events:none;z-index:999998;animation:trailFade 1s ease-out forwards;}' +
        '@keyframes trailFade{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}' +
        '100%{opacity:0;transform:translate(-50%,-50%) scale(.2)}}' +
        '@media (hover:none),(pointer:coarse){body,a,button,input,textarea,select,label,summary,[role="button"]{cursor:auto;}' +
        '.custom-cursor,.cursor-trail{display:none;}}';
    document.head.appendChild(style);

    function init() {
        if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

        var cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.opacity = '0';
        document.body.appendChild(cursor);

        var trailCount = 0;
        var maxTrails = 40;
        var last = 0;

        document.addEventListener('mousemove', function (e) {
            cursor.style.opacity = '1';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            var now = Date.now();
            if (now - last < 30) return;
            last = now;
            if (trailCount >= maxTrails) return;

            var trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            var size = Math.random() * 6 + 4;
            trail.style.width = size + 'px';
            trail.style.height = size + 'px';
            document.body.appendChild(trail);
            trailCount++;
            setTimeout(function () {
                trail.remove();
                trailCount--;
            }, 600);
        });

        document.addEventListener('mousedown', function () { cursor.classList.add('clicking'); });
        document.addEventListener('mouseup', function () { cursor.classList.remove('clicking'); });
        document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });
    }

    if (document.body) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
