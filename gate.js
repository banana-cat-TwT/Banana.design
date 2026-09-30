/*
 * Banana.design 访问软门（客户端校验）
 * 说明：密码明文保存在本文件，属「防君子不防小人」的软门。
 * 通过后写入 localStorage（按域名共享），同一浏览器输一次全站通用。
 */
(function () {
    var GATE_PASSWORD = '7896';
    var STORAGE_KEY = 'bc_site_pass';

    var granted = false;
    try { granted = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
    if (granted) { return; }

    function createStyle() {
        var style = document.createElement('style');
        style.textContent =
            '#access-gate{position:fixed;inset:0;z-index:99999;background:#f7f1e8;display:flex;align-items:center;justify-content:center;padding:1rem;}' +
            '#access-gate .gate-card{background:#fffdf9;border:1px solid #ecd9c4;border-radius:14px;padding:2.5rem 2.25rem 2rem;text-align:center;box-shadow:0 10px 30px rgba(90,66,44,0.08);max-width:340px;width:100%;}' +
            '#access-gate h2{margin:0 0 0.5rem;font-size:1.35rem;color:#5a4634;}' +
            '#access-gate .gate-desc{margin:0 0 1.5rem;color:#9a8a76;font-size:0.9rem;}' +
            '#access-gate input{width:100%;text-align:center;font-size:1.7rem;letter-spacing:0.5em;padding:0.6rem 0 0.6rem 0.5em;border:1px solid #e0d2bd;border-radius:8px;outline:none;color:#5a4634;background:#fbf7f0;box-sizing:border-box;}' +
            '#access-gate input:focus{border-color:#e8833a;}' +
            '#access-gate button{margin-top:1.2rem;width:100%;padding:0.7rem;background:#e8833a;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:background .2s;}' +
            '#access-gate button:hover{background:#d4722e;}' +
            '#access-gate .gate-error{color:#d4722e;font-size:0.85rem;line-height:1.4;min-height:1.2em;margin-top:0.8rem;}' +
            '#access-gate .gate-note{margin:0.9rem 0 0;color:#9a8a76;font-size:0.78rem;line-height:1.6;}';
        document.head.appendChild(style);
    }

    function createGate() {
        var gate = document.createElement('div');
        gate.id = 'access-gate';
        gate.innerHTML =
            '<div class="gate-card">' +
            '<h2>请输入访问密码</h2>' +
            '<p class="gate-desc">输入密码后即可进入网站</p>' +
            '<p class="gate-note">本站自 2026年9月30日 起启用访问密码。此前收到分享链接的朋友，若还不知道密码，请来找我询问。</p>' +
            '<input id="gate-input" type="password" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off">' +
            '<button id="gate-btn" type="button">进入</button>' +
            '<div class="gate-error" id="gate-error"></div>' +
            '</div>';
        return gate;
    }

    createStyle();
    var gate = createGate();
    document.body.appendChild(gate);

    var input = document.getElementById('gate-input');
    var btn = document.getElementById('gate-btn');
    var err = document.getElementById('gate-error');

    function allow() {
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
        gate.style.display = 'none';
    }
    function deny() {
        err.textContent = '密码不正确，请重试';
        input.value = '';
        input.focus();
    }
    function check() {
        if (input.value === GATE_PASSWORD) { allow(); } else { deny(); }
    }

    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { check(); }
    });
    input.focus();
})();