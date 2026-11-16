
        let THREE = null;
        try {
            THREE = await import('three');
        } catch (e) {
            console.warn('[gate3d] three 加载失败，密码功能不受影响', e);
        }
        if (THREE) initSandbox(THREE);

        function initSandbox(THREE) {
            const canvas = document.getElementById('scene-canvas');
            const probe = document.createElement('canvas');
            if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;

            /* ══════════ 渲染器 / 场景 / 相机 ══════════ */
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(innerWidth, innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0;
            if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(27, innerWidth / innerHeight, 1, 460);

            /* ══════════ 光照 ══════════ */
            scene.add(new THREE.HemisphereLight(0xFFF8EA, 0xC6B096, 0.55));
            const sun = new THREE.DirectionalLight(0xFFF1DC, 1.7);
            sun.position.set(17, 27, 13);
            sun.castShadow = true;
            sun.shadow.mapSize.set(1536, 1536);
            sun.shadow.camera.near = 4;
            sun.shadow.camera.far = 110;
            sun.shadow.camera.left = -24;
            sun.shadow.camera.right = 24;
            sun.shadow.camera.top = 24;
            sun.shadow.camera.bottom = -24;
            sun.shadow.camera.updateProjectionMatrix();
            sun.shadow.bias = -0.0006;
            sun.shadow.normalBias = 0.03;
            scene.add(sun);

            const fill = new THREE.DirectionalLight(0xD9ECF6, 0.5);
            fill.position.set(-19, 11, -15);
            scene.add(fill);

            /* ══════════ 材质 ══════════ */
            function mat(color, extra) {
                return new THREE.MeshStandardMaterial(Object.assign({ color: color, roughness: 0.9, metalness: 0 }, extra || {}));
            }
            const M = {
                sandTop: mat(0xEDD8B2), sandSide: mat(0xDFC49C), sandEdge: mat(0xCBAC82),
                grass: mat(0x93CB8B), grassB: mat(0x7CBB7B), grassC: mat(0xAED8A0),
                water: mat(0x6FC1E8, { roughness: 0.26, metalness: 0.02 }),
                waterBank: mat(0xC6A67C),
                cream: mat(0xFBF4E6), wall: mat(0xF8EBD8),
                roof: mat(0xE9A87C), roofB: mat(0xD98E63), accent: mat(0xF3BC84),
                wood: mat(0xBE9067), woodD: mat(0x9C7249),
                leaf: mat(0x8CC787), leafB: mat(0x6FB173), leafC: mat(0xB7D99F),
                pink: mat(0xF2B3AC), purple: mat(0xC3B0DE), yellow: mat(0xF7D882),
                ink: mat(0x6B5947), white: mat(0xFFFFFF),
                screen: mat(0xAFD9EB, { emissive: 0x5E9DBC, emissiveIntensity: 0.45 }),
                glow: new THREE.MeshStandardMaterial({ color: 0xFFE3B0, emissive: 0xFFB35E, emissiveIntensity: 1.5, roughness: 0.4 })
            };

            /* ══════════ 几何小工具 ══════════ */
            function mesh(geo, mt, cast) {
                const o = new THREE.Mesh(geo, mt);
                o.castShadow = cast !== false;
                o.receiveShadow = true;
                return o;
            }
            const box = (w, h, d, mt) => mesh(new THREE.BoxGeometry(w, h, d), mt);
            const cyl = (rt, rb, h, mt, seg) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 16), mt);
            const cone = (r, h, mt, seg) => mesh(new THREE.ConeGeometry(r, h, seg || 14), mt);
            const sph = (r, mt, seg) => mesh(new THREE.SphereGeometry(r, seg || 14, seg || 14), mt);
            const cap = (r, h, mt) => mesh(new THREE.CapsuleGeometry(r, h, 5, 12), mt);
            // 四坡屋顶：四段圆锥旋转 45 度，底面方形边长约为半径的 1.414 倍
            function prism(w, h, mt) {
                const o = mesh(new THREE.ConeGeometry(w * 0.712, h, 4), mt);
                o.rotation.y = Math.PI / 4;
                return o;
            }

            // 固定种子随机，保证每次刷新布局一致
            function rng(seed) {
                return function () {
                    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
                    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
                    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
                };
            }
            const rand = rng(20261116);
            const rr = (a, b) => a + rand() * (b - a);

            const world = new THREE.Group();
            scene.add(world);

            /* ══════════ 分层底座 ══════════ */
            const slabTop = box(30, 0.9, 22, M.sandTop);
            slabTop.position.y = -0.45;
            world.add(slabTop);
            const slabMid = box(29, 0.72, 21, M.sandSide);
            slabMid.position.y = -1.26;
            world.add(slabMid);
            const slabBot = box(27.8, 0.62, 19.8, M.sandEdge);
            slabBot.position.y = -1.93;
            world.add(slabBot);
            const rim = box(30.5, 0.18, 22.5, M.sandEdge);
            rim.position.y = -0.02;
            world.add(rim);

            // 底部柔和落影，避免沙盘像悬空
            (function groundShadow() {
                const cv = document.createElement('canvas');
                cv.width = cv.height = 256;
                const ctx = cv.getContext('2d');
                const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 126);
                grad.addColorStop(0, 'rgba(116,95,68,0.42)');
                grad.addColorStop(0.5, 'rgba(116,95,68,0.2)');
                grad.addColorStop(1, 'rgba(116,95,68,0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 256, 256);
                const tex = new THREE.CanvasTexture(cv);
                const plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(54, 44),
                    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
                );
                plane.rotation.x = -Math.PI / 2;
                plane.position.y = -2.3;
                world.add(plane);
            })();

            /* ══════════ 草地斑块 ══════════ */
            const grassPads = [
                [-9.5, -5.5, 4.6], [-10.4, 4.2, 4.0], [-3.2, 6.4, 3.4], [4.6, -6.2, 4.2],
                [10.4, -4.0, 3.8], [11.2, 5.6, 4.4], [2.2, 7.6, 2.8], [-14.2, -0.4, 2.6],
                [14.6, 1.2, 2.6], [-6.2, 1.2, 3.0], [6.8, 1.4, 2.8], [0.4, -3.4, 2.6],
                [-12.6, 8.0, 2.4], [13.4, -8.4, 2.4]
            ];
            grassPads.forEach(function (p, i) {
                const r = p[2] * 0.78;
                // 夹进底座范围内，避免草地圆片飘出沙盘边缘
                const cx = Math.min(14.2 - r, Math.max(-14.2 + r, p[0]));
                const cz = Math.min(10.2 - r, Math.max(-10.2 + r, p[1]));
                const pad = cyl(r, r * 1.04, 0.22, i % 3 === 0 ? M.grassC : (i % 3 === 1 ? M.grass : M.grassB), 26);
                pad.position.set(cx, 0.06, cz);
                world.add(pad);
            });

            /* ══════════ 河流（自定义带状网格） ══════════ */
            function ribbon(curve, opts) {
                const segs = opts.segments || 70;
                const pos = [], nor = [], idx = [];
                for (let i = 0; i <= segs; i++) {
                    const t = i / segs;
                    const p = curve.getPointAt(t);
                    const tg = curve.getTangentAt(t);
                    tg.y = 0; tg.normalize();
                    const nx = -tg.z, nz = tg.x;
                    const w = (opts.w0 + (opts.w1 - opts.w0) * t) * 0.5;
                    pos.push(p.x + nx * w, opts.y, p.z + nz * w);
                    pos.push(p.x - nx * w, opts.y, p.z - nz * w);
                    nor.push(0, 1, 0, 0, 1, 0);
                }
                for (let i = 0; i < segs; i++) {
                    const a = i * 2;
                    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
                }
                const g = new THREE.BufferGeometry();
                g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
                g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
                g.setIndex(idx);
                const mm = new THREE.Mesh(g, opts.mat);
                mm.receiveShadow = true;
                return mm;
            }

            const riverCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-13.4, 0, -7.2),
                new THREE.Vector3(-9.6, 0, -5.4),
                new THREE.Vector3(-5.0, 0, -2.8),
                new THREE.Vector3(-0.6, 0, 0.6),
                new THREE.Vector3(4.4, 0, 2.8),
                new THREE.Vector3(9.4, 0, 4.6),
                new THREE.Vector3(13.4, 0, 6.2)
            ]);
            world.add(ribbon(riverCurve, { y: 0.19, w0: 3.4, w1: 3.9, mat: M.waterBank, segments: 74 }));
            world.add(ribbon(riverCurve, { y: 0.235, w0: 2.5, w1: 2.9, mat: M.water, segments: 74 }));

            /* ══════════ 分区定义 ══════════ */
            const ZONES = [
                { key: 'portfolio', name: '作品展示', en: 'PORTFOLIO', ang: -144, r: 8.7, anchorY: 3.1 },
                { key: 'character', name: '角色展示', en: 'CHARACTERS', ang: -72, r: 8.7, anchorY: 2.9 },
                { key: 'games', name: '小游戏', en: 'MINI GAMES', ang: 0, r: 8.7, anchorY: 3.2 },
                { key: 'blog', name: '开发日志', en: 'DEV LOG', ang: 72, r: 8.7, anchorY: 4.4 },
                { key: 'about', name: '关于我', en: 'ABOUT ME', ang: 144, r: 8.7, anchorY: 3.4 }
            ];
            ZONES.forEach(function (z) {
                const a = z.ang * Math.PI / 180;
                z.x = Math.cos(a) * z.r;
                z.z = Math.sin(a) * z.r;
            });

            /* ══════════ 环形巡游虚线 ══════════ */
            const routeCurve = new THREE.CatmullRomCurve3(
                ZONES.map(function (z) { return new THREE.Vector3(z.x * 0.9, 0.31, z.z * 0.9); }), true
            );
            (function routeDashes() {
                const count = 96;
                for (let i = 0; i < count; i++) {
                    const t = i / count;
                    const p = routeCurve.getPointAt(t);
                    const tg = routeCurve.getTangentAt(t);
                    const d = box(0.32, 0.055, 0.11, M.sandEdge);
                    d.position.set(p.x, 0.31, p.z);
                    d.rotation.y = Math.atan2(-tg.z, tg.x);
                    world.add(d);
                }
            })();

            /* ══════════ 道具：树 / 灌木 / 石头 / 花 / 小人 ══════════ */
            function tree(x, z, s, kind) {
                const g = new THREE.Group();
                const h = 0.95 * s;
                const trunk = cyl(0.085 * s, 0.13 * s, h, M.woodD, 8);
                trunk.position.y = h / 2;
                g.add(trunk);
                if (kind === 0) {
                    const a = cone(0.52 * s, 0.92 * s, M.leaf, 12); a.position.y = h + 0.3 * s; g.add(a);
                    const b = cone(0.37 * s, 0.7 * s, M.leafB, 12); b.position.y = h + 0.74 * s; g.add(b);
                } else if (kind === 1) {
                    const a = sph(0.5 * s, M.leafB); a.position.y = h + 0.32 * s; a.scale.y = 0.9; g.add(a);
                    const b = sph(0.32 * s, M.leaf); b.position.set(0.3 * s, h + 0.12 * s, 0.12 * s); g.add(b);
                } else {
                    const a = sph(0.48 * s, M.leafC); a.position.y = h + 0.28 * s; g.add(a);
                }
                g.position.set(x, 0.15, z);
                world.add(g);
                return g;
            }
            function bush(x, z, s) {
                const g = new THREE.Group();
                const a = sph(0.34 * s, M.leaf); a.position.y = 0.26 * s; a.scale.y = 0.78; g.add(a);
                const b = sph(0.25 * s, M.leafB); b.position.set(0.32 * s, 0.2 * s, 0.1 * s); b.scale.y = 0.8; g.add(b);
                g.position.set(x, 0.15, z);
                world.add(g);
            }
            function rock(x, z, s) {
                const a = mesh(new THREE.IcosahedronGeometry(0.3 * s, 0), M.sandSide);
                a.position.set(x, 0.2 * s, z);
                a.rotation.set(rand() * 2, rand() * 3, rand() * 2);
                a.scale.set(1, 0.7, 1.1);
                world.add(a);
            }
            function flower(x, z) {
                const stem = cyl(0.016, 0.016, 0.2, M.leafB, 5);
                stem.position.set(x, 0.24, z);
                world.add(stem);
                const head = sph(0.065, rand() > 0.55 ? M.pink : (rand() > 0.5 ? M.yellow : M.white), 8);
                head.position.set(x, 0.36, z);
                head.castShadow = false;
                world.add(head);
            }
            function person(x, z, shirt) {
                const g = new THREE.Group();
                const body = cap(0.075, 0.16, shirt);
                body.position.y = 0.2;
                g.add(body);
                const head = sph(0.075, M.cream, 10);
                head.position.y = 0.38;
                g.add(head);
                g.position.set(x, 0.15, z);
                g.rotation.y = rand() * Math.PI * 2;
                world.add(g);
            }

            // 散落植被（避开分区中心）
            const treeSpots = [
                [-12.4, -8.2, 1.25, 0], [-6.6, -8.6, 1.0, 1], [-1.2, -8.0, 1.15, 0], [3.6, -8.8, 0.95, 2],
                [8.6, -8.2, 1.2, 1], [13.2, -6.6, 1.05, 0], [-13.8, 3.6, 1.1, 0], [-8.2, 8.4, 1.2, 1],
                [-2.4, 9.0, 1.0, 0], [3.4, 9.2, 1.15, 2], [9.0, 8.8, 1.05, 0], [14.0, 4.6, 1.0, 1],
                [-14.6, -3.4, 0.9, 2], [15.0, -1.6, 0.95, 0], [-11.2, 0.6, 0.85, 1], [11.6, 0.4, 0.9, 2]
            ];
            treeSpots.forEach(function (t) { tree(t[0], t[1], t[2], t[3]); });

            const bushSpots = [
                [-10.8, -3.0, 1.1], [-4.4, 4.6, 1.0], [1.6, 5.4, 1.15], [7.2, -3.0, 1.0],
                [12.4, 2.6, 1.05], [-6.8, 7.2, 0.95], [5.8, 6.8, 1.0], [-12.8, 6.2, 0.9], [9.8, -6.6, 0.95]
            ];
            bushSpots.forEach(function (b) { bush(b[0], b[1], b[2]); });

            const rockSpots = [[-8.0, -7.2, 1.2], [1.0, -6.0, 0.9], [9.4, 7.4, 1.1], [-14.0, 1.6, 0.8], [6.2, -8.4, 1.0]];
            rockSpots.forEach(function (r) { rock(r[0], r[1], r[2]); });

            for (let i = 0; i < 46; i++) {
                const a = rand() * Math.PI * 2;
                const rad = 3.4 + rand() * 11;
                const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
                if (Math.abs(x) > 14 || Math.abs(z) > 10) continue;
                flower(x, z);
            }

            const shirts = [M.pink, M.purple, M.yellow, M.grassB, M.roof, M.screen];
            for (let i = 0; i < 16; i++) {
                const a = rand() * Math.PI * 2;
                const rad = 2.6 + rand() * 11.4;
                const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
                if (Math.abs(x) > 13.6 || Math.abs(z) > 9.6) continue;
                person(x, z, shirts[i % shirts.length]);
            }

            /* ══════════ 五个分区建筑 ══════════ */
            function buildPortfolio(g) {
                const body = box(2.7, 1.5, 2.0, M.wall); body.position.y = 0.78; g.add(body);
                const roof = prism(2.5, 0.95, M.roof); roof.position.y = 1.98; g.add(roof);
                const awning = box(2.9, 0.1, 0.8, M.roofB); awning.position.set(0, 1.5, 1.28); awning.rotation.x = 0.07; g.add(awning);
                const frame = box(1.2, 0.9, 0.1, M.cream); frame.position.set(0, 0.86, 1.03); g.add(frame);
                const art = box(0.88, 0.6, 0.06, M.accent); art.position.set(0, 0.86, 1.09); g.add(art);
                const pole = cyl(0.04, 0.04, 1.5, M.woodD, 6); pole.position.set(-1.55, 2.2, -0.7); g.add(pole);
                const flag = box(0.62, 0.36, 0.04, M.pink); flag.position.set(-1.22, 2.65, -0.7); g.add(flag);
            }

            function buildCharacter(g) {
                const ped = cyl(1.02, 1.18, 0.52, M.cream); ped.position.y = 0.26; g.add(ped);
                const ped2 = cyl(0.88, 0.96, 0.12, M.accent); ped2.position.y = 0.58; g.add(ped2);
                const body = cap(0.3, 0.42, M.purple); body.position.y = 1.12; g.add(body);
                const head = sph(0.29, M.cream); head.position.y = 1.62; g.add(head);
                const hair = sph(0.31, M.ink); hair.position.y = 1.69; hair.scale.set(1, 0.72, 1); g.add(hair);
                [-1.75, 1.75].forEach(function (x) {
                    const p = box(0.1, 1.05, 0.08, M.woodD); p.position.set(x, 0.62, 0.1); g.add(p);
                    const scr = box(0.06, 0.72, 0.56, M.screen); scr.position.set(x, 0.92, 0.1); g.add(scr);
                    const base = box(0.34, 0.08, 0.34, M.wood); base.position.set(x, 0.1, 0.1); g.add(base);
                });
            }

            function buildGames(g) {
                const cab = box(2.4, 2.3, 1.4, M.wood); cab.position.y = 1.2; g.add(cab);
                const scr = box(1.8, 1.15, 0.08, M.screen); scr.position.set(0, 1.68, 0.73); g.add(scr);
                const panel = box(2.02, 0.34, 0.48, M.cream); panel.position.set(0, 0.95, 0.92); panel.rotation.x = -0.2; g.add(panel);
                const stick = cyl(0.05, 0.05, 0.3, M.ink, 6); stick.position.set(-0.46, 1.22, 0.94); stick.rotation.x = -0.16; g.add(stick);
                const knob = sph(0.11, M.pink); knob.position.set(-0.44, 1.38, 0.92); g.add(knob);
                [[0.16, M.water], [0.48, M.yellow]].forEach(function (b) {
                    const btn = cyl(0.1, 0.1, 0.07, b[1], 12);
                    btn.position.set(b[0], 1.16, 0.98);
                    btn.rotation.x = Math.PI / 2 - 0.2;
                    g.add(btn);
                });
                for (let i = 0; i < 6; i++) {
                    const stripe = box(0.42, 0.13, 1.02, i % 2 ? M.cream : M.pink);
                    stripe.position.set(-1.05 + i * 0.42, 2.62, 0.16);
                    g.add(stripe);
                }
                const post1 = cyl(0.05, 0.05, 0.3, M.woodD, 6); post1.position.set(-1.1, 2.46, -0.5); g.add(post1);
                const post2 = cyl(0.05, 0.05, 0.3, M.woodD, 6); post2.position.set(1.1, 2.46, -0.5); g.add(post2);
            }

            function buildBlog(g) {
                const tower = cyl(0.76, 0.96, 3.0, M.cream, 18); tower.position.y = 1.52; g.add(tower);
                for (let i = 0; i < 3; i++) {
                    const band = cyl(0.83, 0.91, 0.26, i % 2 ? M.roof : M.roofB, 18);
                    band.position.y = 0.62 + i * 0.86;
                    g.add(band);
                }
                const lampBase = cyl(0.96, 0.82, 0.2, M.ink, 18); lampBase.position.y = 3.13; g.add(lampBase);
                const lamp = sph(0.42, M.glow); lamp.position.y = 3.5; g.add(lamp);
                const capTop = cone(0.62, 0.56, M.roofB, 18); capTop.position.y = 3.98; g.add(capTop);
                const door = box(0.5, 0.82, 0.08, M.woodD); door.position.set(0, 0.42, 0.94); g.add(door);
                const step = box(0.9, 0.1, 0.4, M.sandSide); step.position.set(0, 0.06, 1.06); g.add(step);
            }

            function buildAbout(g) {
                const body = box(2.2, 1.2, 1.8, M.wall); body.position.set(-0.25, 0.62, 0); g.add(body);
                const roof = prism(2.15, 0.85, M.roofB); roof.position.set(-0.25, 1.4, 0); g.add(roof);
                const door = box(0.44, 0.7, 0.08, M.wood); door.position.set(-0.25, 0.36, 0.92); g.add(door);
                const win = box(0.4, 0.36, 0.08, M.glow); win.position.set(0.52, 0.78, 0.92); g.add(win);
                const trunk = cyl(0.16, 0.23, 1.6, M.woodD, 9); trunk.position.set(1.55, 0.82, 0.1); g.add(trunk);
                const c1 = sph(0.92, M.leafB); c1.position.set(1.55, 2.05, 0.1); g.add(c1);
                const c2 = sph(0.62, M.leaf); c2.position.set(2.1, 1.8, 0.4); g.add(c2);
                const c3 = sph(0.56, M.leafC); c3.position.set(1.0, 1.9, -0.42); g.add(c3);
                const bench = box(0.9, 0.08, 0.32, M.wood); bench.position.set(0.35, 0.36, 1.32); g.add(bench);
                const leg1 = box(0.08, 0.3, 0.28, M.woodD); leg1.position.set(0.02, 0.18, 1.32); g.add(leg1);
                const leg2 = box(0.08, 0.3, 0.28, M.woodD); leg2.position.set(0.68, 0.18, 1.32); g.add(leg2);
                const mailbox = box(0.22, 0.28, 0.22, M.pink); mailbox.position.set(-1.6, 0.62, 0.5); g.add(mailbox);
                const mpole = cyl(0.04, 0.04, 0.5, M.woodD, 6); mpole.position.set(-1.6, 0.26, 0.5); g.add(mpole);
            }

            const BUILDERS = [buildPortfolio, buildCharacter, buildGames, buildBlog, buildAbout];
            const zoneGroups = [];
            const rings = [];
            const anchors = [];

            ZONES.forEach(function (z, i) {
                const g = new THREE.Group();
                g.position.set(z.x, 0.16, z.z);
                // 地台
                const pad = cyl(2.95, 3.1, 0.3, i % 2 ? M.grassB : M.grass, 28);
                pad.position.y = 0.04;
                g.add(pad);
                const padTop = cyl(2.6, 2.7, 0.1, i % 2 ? M.grassC : M.grass, 28);
                padTop.position.y = 0.2;
                g.add(padTop);
                const bg = new THREE.Group();
                bg.scale.setScalar(1.16);
                BUILDERS[i](bg);
                g.add(bg);
                world.add(g);
                zoneGroups.push(g);

                // 地面光环
                const halo = new THREE.Mesh(
                    new THREE.CircleGeometry(3.05, 44),
                    new THREE.MeshBasicMaterial({ color: 0xF3BC84, transparent: true, opacity: 0.13, depthWrite: false })
                );
                halo.rotation.x = -Math.PI / 2;
                halo.position.set(z.x, 0.305, z.z);
                world.add(halo);

                const ring = new THREE.Mesh(
                    new THREE.TorusGeometry(3.05, 0.06, 8, 56),
                    new THREE.MeshStandardMaterial({ color: 0xF3BC84, emissive: 0xE08B5A, emissiveIntensity: 0.1, roughness: 0.6 })
                );
                ring.rotation.x = -Math.PI / 2;
                ring.position.set(z.x, 0.31, z.z);
                world.add(ring);
                rings.push(ring);

                anchors.push(new THREE.Vector3(z.x, z.anchorY + 0.16, z.z));
            });

            // 小菜园，填一下沙盘左边的空地
            (function garden() {
                const g = new THREE.Group();
                const soil = box(3.4, 0.14, 2.7, M.waterBank);
                soil.position.y = 0.1;
                g.add(soil);
                for (let i = 0; i < 4; i++) {
                    const row = box(3.0, 0.1, 0.26, M.grassB);
                    row.position.set(0, 0.2, -0.9 + i * 0.6);
                    g.add(row);
                    for (let k = 0; k < 5; k++) {
                        const crop = sph(0.1 + (k % 2) * 0.03, k % 2 ? M.leaf : M.leafC, 8);
                        crop.position.set(-1.2 + k * 0.6, 0.33, -0.9 + i * 0.6);
                        g.add(crop);
                    }
                }
                [-1.78, 1.78].forEach(function (x) {
                    const rail = box(0.08, 0.08, 2.9, M.woodD); rail.position.set(x, 0.44, 0); g.add(rail);
                });
                [-1.42, 1.42].forEach(function (z) {
                    const rail = box(3.6, 0.08, 0.08, M.woodD); rail.position.set(0, 0.44, z); g.add(rail);
                });
                for (let i = 0; i < 5; i++) {
                    const px = -1.8 + i * 0.9;
                    [-1.42, 1.42].forEach(function (pz) {
                        const post = cyl(0.05, 0.05, 0.52, M.woodD, 5);
                        post.position.set(px, 0.3, pz);
                        g.add(post);
                    });
                }
                g.position.set(-12.3, 0.15, 0.3);
                g.rotation.y = 0.12;
                world.add(g);
            })();

            /* ══════════ 场景里的小装饰 ══════════ */
            const floats = [];
            function addFloat(geo, mt, x, y, z, amp, speed, phase) {
                const o = new THREE.Mesh(geo, mt);
                o.position.set(x, y, z);
                o.castShadow = true;
                world.add(o);
                floats.push({ o: o, base: y, amp: amp, speed: speed, phase: phase });
            }
            addFloat(new THREE.BoxGeometry(0.34, 0.34, 0.34), M.accent, -3.4, 2.6, 5.4, 0.3, 1.2, 0);
            addFloat(new THREE.TorusGeometry(0.26, 0.09, 8, 20), M.roof, 5.2, 3.0, -3.4, 0.26, 1.5, 1.4);
            addFloat(new THREE.OctahedronGeometry(0.3), M.leafB, -6.6, 2.8, -1.6, 0.32, 1.1, 2.2);
            addFloat(new THREE.IcosahedronGeometry(0.26), M.water, 2.0, 3.2, -6.0, 0.28, 1.35, 0.7);

            // 河里的小船
            (function boats() {
                [[-8.4, -4.4], [2.4, 1.7], [11.0, 5.3]].forEach(function (b, i) {
                    const g = new THREE.Group();
                    const hull = box(0.72, 0.16, 0.34, M.roofB); hull.position.y = 0.06; g.add(hull);
                    const mast = cyl(0.022, 0.022, 0.6, M.woodD, 5); mast.position.y = 0.4; g.add(mast);
                    const sail = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.46, 3), i % 2 ? M.cream : M.pink);
                    sail.position.set(0.02, 0.44, 0); sail.rotation.y = Math.PI / 2; sail.castShadow = true; g.add(sail);
                    g.position.set(b[0], 0.24, b[1]);
                    g.rotation.y = -0.5 + i * 0.4;
                    world.add(g);
                    floats.push({ o: g, base: 0.24, amp: 0.03, speed: 1.1 + i * 0.2, phase: i * 1.7 });
                });
            })();

            // 河上小桥
            (function bridge() {
                const p = riverCurve.getPointAt(0.42);
                const g = new THREE.Group();
                const deck = box(1.0, 0.12, 3.0, M.wood); deck.position.y = 0.72; g.add(deck);
                for (let i = 0; i < 5; i++) {
                    const plank = box(1.06, 0.05, 0.42, M.woodD);
                    plank.position.set(0, 0.8, -1.2 + i * 0.6);
                    g.add(plank);
                }
                [-0.56, 0.56].forEach(function (x) {
                    const rail = box(0.07, 0.07, 3.0, M.woodD); rail.position.set(x, 1.12, 0); g.add(rail);
                    [-1.3, 0, 1.3].forEach(function (z) {
                        const post = cyl(0.045, 0.045, 0.5, M.woodD, 5);
                        post.position.set(x, 0.95, z);
                        g.add(post);
                    });
                });
                [-1.35, 1.35].forEach(function (z) {
                    const pier = box(0.9, 0.7, 0.18, M.woodD); pier.position.set(0, 0.38, z); g.add(pier);
                });
                const ang = Math.atan2(1, 1);
                g.position.set(p.x - 0.4, 0, p.z - 0.4);
                g.rotation.y = ang + 1.35;
                world.add(g);
            })();

            /* ══════════ 相机状态与取景 ══════════ */
            const HOME = { yaw: 0.62, pitch: 0.88 };
            const view = {
                yaw: HOME.yaw, pitch: HOME.pitch, dist: 52,
                tYaw: HOME.yaw, tPitch: HOME.pitch, tDist: 52,
                cx: 0, cz: 0, tcx: 0, tcz: 0
            };
            const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

            function fitDistance() {
                const tan = Math.tan(camera.fov * Math.PI / 360);
                const dH = 13.6 / tan;
                const dW = 17.8 / (tan * camera.aspect);
                let d = Math.max(dH, dW) * 1.04;
                // 竖屏时允许左右少量裁切，让沙盘撑满，别缩成一小块
                if (camera.aspect < 0.95) d *= 0.88;
                return d;
            }
            const minDist = () => fitDistance() * 0.56;
            const maxDist = () => fitDistance() * 1.5;

            view.dist = view.tDist = fitDistance();

            let auto = true;
            let dragging = false;
            let idle = 0;
            let mode = 'orbit';
            let active = 0;
            let celebrated = false;

            function resetView() {
                view.tYaw = HOME.yaw;
                view.tPitch = HOME.pitch;
                view.tDist = fitDistance();
                view.tcx = 0;
                view.tcz = 0;
            }

            /* ══════════ 指针交互（拖拽旋转 / 平移 / 双指缩放 / 滚轮） ══════════ */
            const pointers = new Map();
            let lastPinch = 0;

            canvas.addEventListener('pointerdown', function (e) {
                pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
                if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
                dragging = true;
                idle = 0;
                canvas.classList.add('grabbing');
                hideHint(true);
            });

            canvas.addEventListener('pointermove', function (e) {
                const p = pointers.get(e.pointerId);
                if (!p) return;
                const dx = e.clientX - p.x;
                const dy = e.clientY - p.y;
                p.x = e.clientX;
                p.y = e.clientY;
                idle = 0;

                if (pointers.size >= 2) {
                    const pts = Array.from(pointers.values());
                    const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
                    if (lastPinch) {
                        const ratio = lastPinch / Math.max(d, 1);
                        view.tDist = clamp(view.tDist * ratio, minDist(), maxDist());
                    }
                    lastPinch = d;
                    return;
                }
                if (!dragging) return;

                if (mode === 'orbit') {
                    view.tYaw -= dx * 0.006;
                    view.tPitch = clamp(view.tPitch + dy * 0.004, 0.52, 1.3);
                } else {
                    const k = view.dist * 0.0016;
                    view.tcx = clamp(view.tcx - dx * k * Math.cos(view.yaw) - dy * k * Math.sin(view.yaw), -9.5, 9.5);
                    view.tcz = clamp(view.tcz + dx * k * Math.sin(view.yaw) - dy * k * Math.cos(view.yaw), -8.5, 8.5);
                }
            });

            function endPointer(e) {
                pointers.delete(e.pointerId);
                if (pointers.size === 0) {
                    dragging = false;
                    canvas.classList.remove('grabbing');
                }
                lastPinch = 0;
            }
            canvas.addEventListener('pointerup', endPointer);
            canvas.addEventListener('pointercancel', endPointer);
            canvas.addEventListener('pointerleave', function (e) {
                if (pointers.size === 1) endPointer(e);
            });

            canvas.addEventListener('wheel', function (e) {
                e.preventDefault();
                view.tDist = clamp(view.tDist * (1 + e.deltaY * 0.0009), minDist(), maxDist());
                idle = 0;
            }, { passive: false });

            canvas.addEventListener('dblclick', resetView);

            /* ══════════ 标签投影 ══════════ */
            const pillEls = Array.from(document.querySelectorAll('.pill'));
            const stepEls = Array.from(document.querySelectorAll('.step'));
            const stepperEl = document.getElementById('stepper');
            const pencilEl = document.getElementById('pencil');
            const projV = new THREE.Vector3();
            let cardRect = null;
            let pillSizes = null;

            function measureCard() {
                const c = document.getElementById('gate-card');
                if (c) cardRect = c.getBoundingClientRect();
                pillSizes = pillEls.map(function (el) {
                    return { hw: el.offsetWidth / 2 || 64, hh: el.offsetHeight / 2 || 23 };
                });
            }
            pillEls.forEach(function (p) { p.style.opacity = '0'; });

            function updatePills() {
                const W = innerWidth, H = innerHeight;
                const list = [];
                for (let i = 0; i < pillEls.length; i++) {
                    const el = pillEls[i];
                    const v = projV.copy(anchors[i]).project(camera);
                    if (v.z > 1) { el.style.opacity = '0'; list.push(null); continue; }
                    const sz = (pillSizes && pillSizes[i]) || { hw: 64, hh: 23 };
                    const hw = sz.hw, hh = sz.hh;
                    const ax = (v.x * 0.5 + 0.5) * W;
                    const ay = (-v.y * 0.5 + 0.5) * H;
                    list.push({ el: el, x: ax, cy: ay - 14 - hh, hw: hw, hh: hh });
                }

                const live = list.filter(Boolean);

                // 可用范围：左边避开工具栏，下边避开时间轴
                const padL = W < 860 ? 62 : 76;
                const minX = padL, maxX = W - 14;
                const minC = 14, maxC = H - 74;
                const clampX = p => { p.x = Math.min(Math.max(p.x, minX + p.hw), maxX - p.hw); };
                const clampY = p => { p.cy = Math.min(Math.max(p.cy, minC + p.hh), maxC - p.hh); };

                live.forEach(clampX);
                live.forEach(clampY);

                function hitsCard(p) {
                    if (!cardRect) return false;
                    const L = cardRect.left - 10, R = cardRect.right + 10;
                    const T = cardRect.top - 10, B = cardRect.bottom + 10;
                    return p.x + p.hw > L && p.x - p.hw < R && p.cy + p.hh > T && p.cy - p.hh < B;
                }

                // 躲卡：优先整体上下平移（离哪边近走哪边），实在放不下才左右推
                function pushOffCard(p) {
                    if (!hitsCard(p)) return;
                    const L = cardRect.left - 10, R = cardRect.right + 10;
                    const T = cardRect.top - 10, B = cardRect.bottom + 10;
                    const dUp = (p.cy + p.hh) - T;
                    const dDown = B - (p.cy - p.hh);
                    const upOK = p.cy - dUp - p.hh >= minC;
                    const downOK = p.cy + dDown + p.hh <= maxC;
                    if (upOK && (!downOK || dUp <= dDown)) p.cy -= dUp + 4;
                    else if (downOK) p.cy += dDown + 4;
                    else {
                        if ((p.x + p.hw) - L <= R - (p.x - p.hw)) p.x -= (p.x + p.hw) - L + 4;
                        else p.x += R - (p.x - p.hw) + 4;
                        clampX(p);
                    }
                }

                // 标签互压：只做单向下移，避免左右来回打架
                function separateDown() {
                    const order = live.slice().sort(function (a, b) { return a.cy - b.cy; });
                    for (let i = 0; i < order.length; i++) {
                        const A = order[i];
                        let moved = false;
                        for (let j = 0; j < i; j++) {
                            const B = order[j];
                            const ox = Math.min(A.x + A.hw, B.x + B.hw) - Math.max(A.x - A.hw, B.x - B.hw);
                            if (ox <= 2) continue;
                            const oy = Math.min(A.cy + A.hh, B.cy + B.hh) - Math.max(A.cy - A.hh, B.cy - B.hh);
                            if (oy > 0) {
                                A.cy = B.cy + B.hh + A.hh + 4;
                                moved = true;
                            }
                        }
                        if (moved) clampY(A);
                    }
                }

                for (let pass = 0; pass < 3; pass++) {
                    live.forEach(pushOffCard);
                    separateDown();
                    live.forEach(clampX);
                }

                for (let i = 0; i < live.length; i++) {
                    const p = live[i];
                    p.el.style.transform = 'translate3d(' + p.x.toFixed(1) + 'px,' + (p.cy + p.hh).toFixed(1) + 'px,0) translate(-50%,-100%)';
                    p.el.style.opacity = '';
                }
            }

            /* ══════════ UI 联动 ══════════ */
            function syncUI(i) {
                stepEls.forEach(function (s, k) { s.classList.toggle('on', k === i); });
                pillEls.forEach(function (p, k) { p.classList.toggle('on', k === i); });
                const st = stepEls[i];
                if (st && pencilEl) {
                    pencilEl.style.left = (st.offsetLeft + st.offsetWidth / 2) + 'px';
                    pencilEl.classList.add('show');
                }
            }

            function focusZone(i) {
                const z = ZONES[i];
                active = i;
                idle = 0;
                // 相机位于 (sin yaw, cos yaw) 方向，屏幕右向为 (cos yaw, -sin yaw)
                // 令 yaw = -atan2(z.x, z.z)，被聚焦分区即落在屏幕右侧、垂直居中
                view.tYaw = -Math.atan2(z.z, z.x);
                view.tYaw += Math.round((view.yaw - view.tYaw) / (Math.PI * 2)) * Math.PI * 2;
                view.tPitch = 0.88;
                view.tDist = fitDistance() * 0.93;
                view.tcx = 0;
                view.tcz = 0;
                syncUI(i);
            }

            pillEls.forEach(function (p) {
                p.addEventListener('click', function () { focusZone(parseInt(p.dataset.i, 10)); });
                p.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        focusZone(parseInt(p.dataset.i, 10));
                    }
                });
            });
            stepEls.forEach(function (s) {
                s.addEventListener('click', function () { focusZone(parseInt(s.dataset.i, 10)); });
            });

            /* ══════════ 工具栏 ══════════ */
            const toolOrbit = document.getElementById('tool-orbit');
            const toolPan = document.getElementById('tool-pan');
            const toolAuto = document.getElementById('tool-auto');
            const toolReset = document.getElementById('tool-reset');
            const toolFull = document.getElementById('tool-full');
            const hintEl = document.getElementById('tool-hint');
            let hintTimer = null;

            function hideHint(forever) {
                if (hintEl) hintEl.classList.remove('show');
                if (forever && hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
            }
            hintTimer = setTimeout(function () {
                if (hintEl) hintEl.classList.add('show');
                setTimeout(function () { hideHint(false); }, 4200);
            }, 1400);

            function setMode(nv) {
                mode = nv;
                toolOrbit.classList.toggle('active', nv === 'orbit');
                toolPan.classList.toggle('active', nv === 'pan');
                if (hintEl) hintEl.textContent = nv === 'orbit' ? '拖拽 · 自由视角' : '拖拽 · 平移画面';
            }
            toolOrbit.addEventListener('click', function () { setMode('orbit'); });
            toolPan.addEventListener('click', function () { setMode('pan'); });
            toolAuto.addEventListener('click', function () {
                auto = !auto;
                toolAuto.classList.toggle('active', auto);
                idle = 0;
            });
            toolReset.addEventListener('click', resetView);
            toolFull.addEventListener('click', function () {
                if (!document.fullscreenElement) {
                    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            });

            /* ══════════ 主循环 ══════════ */
            const clock = new THREE.Clock();
            let firstFrame = true;

            function frame() {
                let dt = clock.getDelta();
                if (!(dt > 0)) dt = 1 / 60; // 少数环境会给出 0，兜底避免补间停住
                dt = Math.min(dt, 0.06);
                const t = clock.elapsedTime;

                if (auto && !dragging && !celebrated) {
                    idle += dt;
                    if (idle > 2.4) view.tYaw += dt * 0.085;
                }

                const s = Math.min(1, dt * 7.5);
                view.yaw += (view.tYaw - view.yaw) * s;
                view.pitch += (view.tPitch - view.pitch) * s;
                view.dist += (view.tDist - view.dist) * s;
                view.cx += (view.tcx - view.cx) * s;
                view.cz += (view.tcz - view.cz) * s;

                const cp = Math.cos(view.pitch);
                camera.position.set(
                    view.cx + Math.sin(view.yaw) * cp * view.dist,
                    Math.sin(view.pitch) * view.dist,
                    view.cz + Math.cos(view.yaw) * cp * view.dist
                );
                // 竖屏时视线压低，让沙盘整体上移，露出上方空间
                const lookY = 0.6 + (camera.aspect < 0.95 ? -2.0 : 0);
                camera.lookAt(view.cx, lookY, view.cz);

                // 当前分区的光环呼吸 + 轻微抬升
                for (let i = 0; i < zoneGroups.length; i++) {
                    const on = i === active;
                    const ty = on ? 0.24 + Math.sin(t * 1.5) * 0.05 : 0.16;
                    zoneGroups[i].position.y += (ty - zoneGroups[i].position.y) * 0.08;
                    rings[i].material.emissiveIntensity = on ? 0.34 + Math.sin(t * 2.8) * 0.2 : 0.07;
                }

                for (let i = 0; i < floats.length; i++) {
                    const f = floats[i];
                    f.o.position.y = f.base + Math.sin(t * f.speed + f.phase) * f.amp;
                }
                for (let i = 0; i < 4; i++) floats[i].o.rotation.y += dt * 0.5;

                updatePills();
                renderer.render(scene, camera);

                if (firstFrame) {
                    firstFrame = false;
                    measureCard();
                    syncUI(0);
                    stepperEl.classList.add('show');
                }
            }
            renderer.setAnimationLoop(frame);

            /* ══════════ 尺寸变化 ══════════ */
            function onResize() {
                camera.aspect = innerWidth / innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(innerWidth, innerHeight);
                view.tDist = clamp(view.tDist, minDist(), maxDist());
                view.dist = clamp(view.dist, minDist(), maxDist());
                measureCard();
                if (pencilEl && stepEls[active]) {
                    pencilEl.style.left = (stepEls[active].offsetLeft + stepEls[active].offsetWidth / 2) + 'px';
                }
            }
            addEventListener('resize', onResize);
            addEventListener('orientationchange', function () { setTimeout(onResize, 260); });
            if (window.visualViewport) visualViewport.addEventListener('resize', onResize);
            setTimeout(onResize, 400);

            /* ══════════ 对外接口（解锁庆祝） ══════════ */
            window.__gate3d = {
                celebrate: function () {
                    celebrated = true;
                    auto = false;
                    view.tDist = fitDistance() * 0.72;
                    view.tPitch = 0.84;
                    view.tYaw = view.yaw + 1.15;
                    view.tcx = 0;
                    view.tcz = 0;
                    if (stepEls[active]) pencilEl.classList.remove('show');
                },
                focus: focusZone
            };

            // 支持 ?focus=0..4 直接聚焦某个分区（也可当分享深链用）
            const fp = parseInt(new URLSearchParams(location.search).get('focus'), 10);
            if (!isNaN(fp) && fp >= 0 && fp < ZONES.length) {
                auto = false;
                toolAuto.classList.remove('active');
                setTimeout(function () {
                    focusZone(fp);
                    // 深链直接到位，不做补间
                    view.yaw = view.tYaw; view.pitch = view.tPitch; view.dist = view.tDist;
                    view.cx = view.tcx; view.cz = view.tcz;
                }, 900);
            }

        }
    
