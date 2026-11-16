# 长期记忆 · Banana.design

## 项目惯例

- 版权硬约束见根目录 `AGENTS.md`：SPDX 头、`BANANA_DESIGN_BUILD_SIGNATURE`、`_bananacat_` / `banana_design_` 前缀一律不许删改；`LICENSE` / `AGENTS.md` / `README.md` 三件套保留。
- 文案禁止使用破折号（—— 与 —），一律用逗号、句号或括号替代。此要求用户多次强调。

## 3D 交互密码门（gate-3d.html）

- 单文件自包含（Three.js r160 走 CDN importmap），密码 7896，`GATE_HASH = '7c7c2e23'`（djb2），localStorage 键 `bc_site_pass`，4 小时 / 当日过期；WebGL 挂掉也要保证解锁能走通。
- 场景是等距视角低多边形「个人工作台沙盘」，5 个分区按 `ang = -144 / -72 / 0 / 72 / 144`、`r = 8.7` 环形分布，HTML 标签由 3D 锚点每帧投影。
- 相机：`camera.position = C + dist*(sin yaw*cos pitch, sin pitch, cos yaw*cos pitch)`，屏幕右向 `(cos yaw, 0, -sin yaw)`。让分区落在屏幕右侧：`tYaw = -atan2(z.z, z.x)`。
- 深链 `?focus=0..4` 对应 关于我=4（数组下标，不是名字顺序）。

## 前端验收工作流（本机）

- 启动：`python -m http.server 8123`，页面走 `http://127.0.0.1:8123/gate-3d.html`。
- 截图用 `msedge.exe --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --user-data-dir=<临时> --window-size=W,H --virtual-time-budget=14000 --screenshot=...`。无头 Chrome 本机静默不出图，别用。
- 截图文件常在命令返回后才写入，需轮询 `Test-Path`。
- 移动端用 390×844 iframe 包装页验证（窗口宽度有下限，直接设 390 会被夹到 ~500）。
