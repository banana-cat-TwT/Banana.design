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
        'nav.messageboard': '留言板',

        // 顶部导航
        'topnav.works': '作品展示',
        'topnav.characters': '角色展示',
        'topnav.items': '道具展示',
        'topnav.games': '小游戏',
        'topnav.blog': '开发日志',
        'topnav.about': '关于我',
        'topnav.messageboard': '留言板',

        // Hero
        'hero.subtitle': '该网站正在施工中~制作不易，请见谅。',
        'hero.btn.works': '查看作品',
        'hero.btn.about': '了解更多',

        // 作品展示
        'works.title': '作品展示',
        'works.desc': '部分作品',
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

        // AI辅助角色
        'characters.ai.title': '半人工半AI辅助角色展示',
        'characters.ai.desc': '使用AI工具辅助生成的角色作品',

        // AI辅助道具
        'items.ai.title': 'AI生成道具展示',
        'items.ai.desc': '使用AI工具辅助生成的道具作品',

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

        // 教育经历详情
        'about.edu.school': '中国美术学院 - 动画专业',
        'about.edu.date': '2022年9月1日 - 2026年6月30日',
        'about.edu.college': '动画与游戏学院',
        'about.edu.desc': '本科<br>研究方向：三维全流程辅助二维动画创作·实时引擎视觉开发与混合媒介表达',
        'about.edu.tag1': '主修课程',
        'about.edu.tag2': 'PBR全流程',
        'about.edu.tag3': 'AI工具应用',
        'about.edu.tag4': '团队协作',

        // 实习经历详情
        'about.intern.tx.title': '深圳市腾讯计算机系统有限公司｜天美IEG',
        'about.intern.tx.date': '2025年8月11日 - 2026年5月12日',
        'about.intern.tx.role': '3D美术',
        'about.intern.tx.desc': '参与风格化角色及配饰资产制作与迭代，负责高模雕刻、低模拓扑、UV拆分、材质贴图调试、基础优化及版本调整。累计参与30+个蓝紫品级的配饰与角色项目资产制作，协助导师完成部分橙级配饰资产所有层级的低模制作，逐步建立起对风格化资产生产流程、风格适配及项目交付要求的理解。协助跟进QA问题、验收反馈及部分CP流程，具备一定跨岗位沟通、问题整理与流程理解能力。在同时进行多线程任务的情况下，还需要承担离职实习生资产交接与收尾，还需要指导其他实习生，担任他们的非正式导师，分享工作经验并实操演示，帮助新人快速适应工作环境。自主开发引擎一键多视角截图工具，并实践其他提效工具，提升展示与模型优化环节效率。继续学习并实践UE材质蓝图、TA工具及AI辅助工作流，围绕LoRA、混元、Meshy、Tripo、Trellis等方向开展大模型训练与生成探索。使用内部AI平台和visvise等公司平台辅助资产生产，缩短资产任务的制作周期，尝试ComfyUI，使用LoRA和混元等默认管线了解二三维生成工作流。将于项目中的提效思路迁移至毕业设计与个人项目，扩展出视频帧一键截图、分解文件等提效功能，搭建并部署完成比以往的网站更轻量化的在线个人作品展示平台。',
        'about.intern.hik.title': '杭州海康威视数字技术股份有限公司',
        'about.intern.hik.date': '2025年6月15日 - 2025年8月2日',
        'about.intern.hik.role': '3D设计',
        'about.intern.hik.desc': '运用3D设计能力与Unity引擎技术，参与3D数字孪生项目研发；根据部门提供的实拍素材与设计图纸，完成PBR写实模型制作；同时协助团队进行引擎操作、材质流程等相关支持与经验分享。例如在实习期间，除了负责3D设计工作，还需要指导同期的TA实习生，教授基础的Unity使用和材质节点编辑技巧',
        'about.intern.wa.title': 'WA IMAGING文化传媒有限公司',
        'about.intern.wa.date': '2023年7月16日 - 2023年10月1日',
        'about.intern.wa.role': '场景设计/摄像剪辑',
        'about.intern.wa.desc': 'WA IMAGING（哇嗷）是一家多领域的视觉公司，业务涉及品牌形象大片平面拍摄、动态视频摄影、三维数字短片、时尚活动拍摄等；主要服务耐克、宝格丽、倩碧、娇兰、阿玛尼、迪奥、始祖鸟等众多高奢与主流品牌；协助主摄影师完成拍摄全流程工作，包括前期场景布置与拍摄道具制作、拍摄期间花絮跟拍及录像、后期影片剪辑与多平台宣传发布，并根据项目需求制作相关海报。这段实习恰逢AI技术兴起初期，老板具有超前的行业洞察力，认为AI将成为未来重要工具，受其影响开始接触并积极学习AI技术，从之前的观望态度转变为主动探索。团队成员均为行业经验丰富的资深摄影师和修图师，在他们的影响下开始养成日常审美积累的习惯，每日阅图、找参考、筛选案例用于拍摄、场景及道具制作，系统提升了视觉表达与空间组织能力，并将打光、构图等经验运用于3D角色打光与镜头设计中。',

        // 毕业论文摘要
        'about.thesis.desc': `<strong>【论文概要】</strong><br>
数字技术的持续演进使动画可调用的媒介手段愈发多元，三维与二维手绘结合的创作方式在当代动画中已形成清晰趋势。本次毕业设计以原创短片为实践样本，将<span class="hl">三维辅助二维</span>的方法流程完整走通并考察其应用价值。研究从三维辅助环节展开，核心在于利用三维软件生成的空间结构、光影关系与运动数据，经后期二维手绘加工，在保持准确空间感的同时保留手绘独有的艺术质感。论文在<span class="hl">媒介融合</span>视角下构建理论框架，明确三维负责准确性、二维负责表现力的分工逻辑，并界定<span class="hl">技术美术在流程设计、技术实现与工具开发</span>三个层面的职能，以及<span class="hl">风格化渲染（色阶化光照、描边技术与后处理）</span>的技术路径。实践层面逐阶段记录从<span class="hl">三维基底搭建（建模、绑定、动作预演、灯光、材质与渲染）到二维艺术收束（清线、笔触覆盖、情绪加工）的全过程，并对建模软件故障、描边版本迭代、角色穿模与绑定变形、跨软件协作等技术瓶颈</span>做反思与应对，其中截帧拼图与音轨分离工具的开发体现了技术美术问题导向的方法。总体而言，本片验证了媒介融合、技术美术与风格化渲染三个框架，意在为二维动画探索可操作的技术路径，审视数字时代动画语言融合创新的潜在可能，对有限人力下的降本增效具现实参考意义。<br><br>
<strong>【主修课程与核心能力】</strong><br>系统学习角色设计、三维动画、场景设计、3D、动画制作等核心课程，熟练掌握3D美术与动画制作基础，具备角色设计、场景构建及三维动画制作能力。熟悉PBR流程中角色与场景的材质与灯光表现，掌握3D角色骨骼绑定与动作演示技术，能够独立完成动画短片制作。了解AI工具在美术创作中的应用，可利用AI生成概念图，应用于动态分镜预演，提升创作效率。<br><br>
<strong>【项目与创作成果】</strong><br>在课程项目或个人创作中，完成多个PBR全流程角色/场景作品，使用3D软件完成角色绑定与动作演示，具备从建模到动画输出的全流程实践能力。<br><br>
<strong>【团队协作与实战经验】</strong><br>参与近10次游戏开发实战项目，担任团队中3D美术负责人，主导角色与场景内容制作；作品入围国家级行业展览或比赛，获得行业认可。<br><br>
<strong>【AI工具应用与创新】</strong><br>在创作中积极应用AI技术，通过AI生成概念图辅助多个项目的前期设计，训练风格化模型以优化美术产出效率，并结合AI工具完成动态分镜预演，探索智能化创作流程的可行性。<br><br>
<strong>【综合素质与学习态度】</strong><br>在校期间持续关注游戏与动画行业发展趋势，积极参与专业实践与团队协作，具备一定的自驱力、创新意识与团队沟通能力。<br><br>
<strong>【毕业设计概要】</strong><br>
独立完成动画短片的前期构思、三维基础搭建、动作预演、引擎风格测试及二维后期加工，实践"三维辅助二维"创作流程，在保证手绘风格表现的同时提升了空间准确性、镜头统一性与制作效率。<br>
1. 独立完成动画短片3d分支的策划、制作与总结，负责从前期设定到后期成片的完整流程。<br>
2. 探索"三维辅助二维"创作方法，使用 3Ds Max、Maya、ZB、Unity/UE、PS、CSP、AE完成建模、动作预演、材质测试、二维加工、短片剪辑、音效制作、后期制作，并制作提效工具。<br>
3. 在保留二维手绘风格的基础上，提升了角色动作、镜头调度与场景空间表达的稳定性和制作效率。<br><br>
<small style="color: rgba(255,255,255,0.55);">
· 团队分工：四人团队中唯一具备三维技术能力的成员，独立完成三维全流程制作（建模→绑定→K帧→引擎打光/运镜/特效→分层渲染输出）及工具开发，将三维渲染序列导入CSP/Photoshop进行手绘加工<br>
· 个人负责：三维部分全流程独立完成 + 截帧拼图工具与音轨分离插件开发 + Unity URP卡通渲染系统搭建<br>
· 核心成果：验证三维辅助二维的流程化思路，探索媒介融合在动画创作中的可行性</small>`,

        // 留言板
        'board.title': '留言板',
        'board.sub1': '留下你的想法和建议，默认私密收件，不会对外公开',
        'board.sub2': '留言发送后会直接到我邮箱，想公开展示我会单独加进列表 💌',
        'board.formTitle': '写下你的留言',
        'board.labelName': '姓名',
        'board.phName': '请输入你的姓名',
        'board.labelEmail': '邮箱（可选，方便我回复你）',
        'board.phEmail': '可留空，纯匿名也没问题',
        'board.labelMsg': '留言内容',
        'board.phMsg': '请输入你的留言',
        'board.submitBtn': '提交留言',
        'board.sending': '发送中…',
        'board.success': '✅ 收到了，谢谢你！我会尽快查阅邮箱回复的～',
        'board.error': '⚠️ 发送失败，稍后再试试看～（如持续失败可直接通过页面底部邮箱联系我）',
        'board.listTitle': '留言列表',
        'board.empty1': '留言默认不公开展示',
        'board.empty2': '如果你希望自己的留言被加入公开列表',
        'board.empty3': '可以在留言内容里说一声 💌',

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

        // 新闻板块
        'news.title': '每日新闻',
        'news.tab.ai': '🤖 AI',
        'news.tab.game': '🎮 游戏',
        'news.tab.video': '🎬 往期视频',
        'news.tab.archive': '📜 往期回顾',

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
        'nav.messageboard': 'Guestbook',

        // Top Navigation
        'topnav.works': 'Portfolio',
        'topnav.characters': 'Characters',
        'topnav.items': 'Props',
        'topnav.games': 'Mini Games',
        'topnav.blog': 'Dev Log',
        'topnav.about': 'About',
        'topnav.messageboard': 'Guestbook',

        // Hero
        'hero.subtitle': 'This website is currently under construction. Thank you for your patience.',
        'hero.btn.works': 'View Portfolio',
        'hero.btn.about': 'Learn More',

        // Portfolio
        'works.title': 'Portfolio',
        'works.desc': 'Selected Works',
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

        // AI-Assisted Characters
        'characters.ai.title': 'Semi-AI-Assisted Characters',
        'characters.ai.desc': 'Character works created with AI tool assistance',

        // AI-Generated Props
        'items.ai.title': 'AI-Generated Props',
        'items.ai.desc': 'Prop works created with AI tool assistance',

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

        // Education Details
        'about.edu.school': 'China Academy of Art - Animation',
        'about.edu.date': 'September 1, 2022 - June 30, 2026',
        'about.edu.college': 'School of Animation and Games',
        'about.edu.desc': 'Bachelor<br>Research Direction: 3D Full-Pipeline Assisted 2D Animation Creation · Real-Time Engine Visual Development and Mixed Media Expression',
        'about.edu.tag1': 'Core Courses',
        'about.edu.tag2': 'PBR Full Pipeline',
        'about.edu.tag3': 'AI Tool Application',
        'about.edu.tag4': 'Team Collaboration',

        // Internship Details
        'about.intern.tx.title': 'Tencent (Shenzhen) | TiMi Studios (IEG)',
        'about.intern.tx.date': 'August 11, 2025 - May 12, 2026',
        'about.intern.tx.role': '3D Artist',
        'about.intern.tx.desc': 'Participated in the production and iteration of stylized character and accessory assets, responsible for high-poly sculpting, low-poly topology, UV unwrapping, material texture debugging, basic optimization, and version adjustments. Accumulated experience in 30+ blue/purple-tier accessory and character project assets, assisted mentors in completing low-poly production for all tiers of certain orange-tier accessory assets, and gradually built understanding of stylized asset production pipelines, style adaptation, and project delivery requirements. Assisted in tracking QA issues, acceptance feedback, and some CP processes, with cross-role communication, issue organization, and pipeline understanding capabilities. While handling multi-threaded tasks, also took over asset handover and wrap-up from departing interns, mentored other interns as an informal guide, shared work experience and gave hands-on demonstrations to help newcomers adapt quickly. Independently developed a one-click multi-angle screenshot tool for the engine, and practiced other efficiency tools to improve the display and model optimization workflow. Continued learning and practicing UE material blueprints, TA tools, and AI-assisted workflows, exploring large model training and generation around LoRA, Hunyuan, Meshy, Tripo, and Trellis. Used internal AI platforms and company platforms like visvise to assist asset production, shorten production cycles, and experimented with ComfyUI, using LoRA and Hunyuan default pipelines to understand 2D/3D generation workflows. Migrated efficiency ideas from projects to graduation design and personal projects, extending to video frame screenshot and file decomposition features, and built and deployed a lighter online portfolio website.',
        'about.intern.hik.title': 'Hangzhou Hikvision Digital Technology Co., Ltd.',
        'about.intern.hik.date': 'June 15, 2025 - August 2, 2025',
        'about.intern.hik.role': '3D Designer',
        'about.intern.hik.desc': 'Applied 3D design skills and Unity engine technology to participate in 3D digital twin project R&D; completed PBR realistic model production based on real-footage materials and design drawings provided by the department; also assisted the team with engine operation, material pipeline support, and experience sharing. For example, during the internship, in addition to 3D design work, also mentored a fellow TA intern, teaching basic Unity usage and material node editing techniques.',
        'about.intern.wa.title': 'WA IMAGING Media Co., Ltd.',
        'about.intern.wa.date': 'July 16, 2023 - October 1, 2023',
        'about.intern.wa.role': 'Scene Design / Photography & Editing',
        'about.intern.wa.desc': 'WA IMAGING is a multi-domain visual company whose business covers brand image photography, dynamic video shooting, 3D digital shorts, and fashion event coverage; mainly serves luxury and mainstream brands including Nike, Bvlgari, Clinique, Guerlain, Armani, Dior, and Arc\'teryx; assisted the lead photographer throughout the entire shooting process, including pre-production scene setup and prop making, behind-the-scenes filming during shoots, post-production editing, and multi-platform promotional publishing, as well as producing relevant posters based on project needs. This internship coincided with the early rise of AI technology; the boss had forward-looking industry insight and believed AI would become an important future tool. Influenced by this, I began to actively learn AI technology, shifting from a wait-and-see attitude to proactive exploration. Team members were all experienced senior photographers and retouchers; under their influence, I developed the habit of daily aesthetic accumulation, reviewing images, finding references, and selecting cases for shooting, scene, and prop production, systematically improving visual expression and spatial organization skills, and applying lighting and composition experience to 3D character lighting and camera design.',

        // Thesis Abstract
        'about.thesis.desc': `<strong>[Thesis Summary]</strong><br>
The continuous evolution of digital technology has made the media means available to animation increasingly diverse, and the creative approach combining 3D and 2D hand-drawn has formed a clear trend in contemporary animation. This graduation design uses an original short film as a practical sample, fully walking through the <span class="hl">3D-assisted 2D</span> methodology and examining its application value. The research unfolds from the 3D assistance stage, with the core being the use of spatial structures, lighting relationships, and motion data generated by 3D software, processed through post-production 2D hand-drawn work, maintaining accurate spatial perception while preserving the unique artistic quality of hand-drawing. The thesis builds a theoretical framework from the perspective of <span class="hl">media convergence</span>, defining the division of labor where 3D is responsible for accuracy and 2D for expressiveness, and delineating the functions of <span class="hl">technical art in pipeline design, technical implementation, and tool development</span> across three levels, as well as the technical path of <span class="hl">stylized rendering (posterized lighting, outline techniques, and post-processing)</span>. The practical section records stage by stage the entire process from <span class="hl">3D foundation building (modeling, rigging, action preview, lighting, materials, and rendering) to 2D artistic refinement (line cleanup, brush coverage, emotional processing), with reflection and responses to technical bottlenecks</span> such as modeling software failures, outline version iterations, character clipping and rig deformation, and cross-software collaboration. Among these, the development of frame-capture montage and audio track separation tools embodies the problem-oriented approach of technical art. Overall, this film validates the three frameworks of media convergence, technical art, and stylized rendering, aiming to explore operable technical paths for 2D animation, examine the potential possibilities of innovative animation language convergence in the digital age, and provide practical reference for cost reduction and efficiency improvement under limited human resources.<br><br>
<strong>[Core Courses & Key Competencies]</strong><br>Systematically studied core courses including character design, 3D animation, scene design, 3D, and animation production. Proficient in 3D art and animation production fundamentals, with capabilities in character design, scene construction, and 3D animation production. Familiar with material and lighting performance for characters and scenes in the PBR pipeline, mastering 3D character skeletal rigging and motion demonstration techniques, capable of independently completing animated short film production. Understanding of AI tool applications in art creation, able to use AI to generate concept art for dynamic storyboard previews, improving creative efficiency.<br><br>
<strong>[Projects & Creative Achievements]</strong><br>Completed multiple PBR full-pipeline character/scene works in course projects or personal creations, using 3D software for character rigging and motion demonstrations, with full-pipeline practical capability from modeling to animation output.<br><br>
<strong>[Team Collaboration & Practical Experience]</strong><br>Participated in nearly 10 game development practical projects, serving as the 3D art lead in teams, directing character and scene content production; works were shortlisted for national industry exhibitions or competitions, receiving industry recognition.<br><br>
<strong>[AI Tool Application & Innovation]</strong><br>Actively applied AI technology in creation, using AI-generated concept art to assist pre-production design for multiple projects, training stylized models to optimize art output efficiency, and combining AI tools for dynamic storyboard previews, exploring the feasibility of intelligent creative pipelines.<br><br>
<strong>[Comprehensive Qualities & Learning Attitude]</strong><br>Continuously followed industry development trends in games and animation during school, actively participated in professional practice and team collaboration, with self-drive, innovation awareness, and team communication skills.<br><br>
<strong>[Graduation Design Summary]</strong><br>
Independently completed the pre-production conceptualization, 3D foundation building, action preview, engine style testing, and 2D post-processing of the animated short film, practicing the "3D-assisted 2D" creative pipeline, improving spatial accuracy, shot consistency, and production efficiency while maintaining hand-drawn style expression.<br>
1. Independently completed the planning, production, and summary of the 3D branch of the animated short film, responsible for the complete pipeline from pre-production design to final output.<br>
2. Explored the "3D-assisted 2D" creative method, using 3ds Max, Maya, ZBrush, Unity/UE, PS, CSP, AE for modeling, action preview, material testing, 2D processing, short film editing, sound production, post-production, and efficiency tool development.<br>
3. While preserving the 2D hand-drawn style, improved the stability and production efficiency of character animation, camera scheduling, and scene spatial expression.<br><br>
<small style="color: rgba(255,255,255,0.55);">
· Team Division: The only member with 3D technical capability in a four-person team, independently completed the full 3D pipeline (modeling → rigging → keyframing → engine lighting/camera/FX → layered render output) and tool development, importing 3D render sequences into CSP/Photoshop for hand-drawn processing<br>
· Personal Responsibility: Full 3D pipeline independently completed + frame-capture montage tool and audio track separation plugin development + Unity URP cartoon rendering system setup<br>
· Core Results: Validated the pipeline approach of 3D-assisted 2D, explored the feasibility of media convergence in animation creation</small>`,

        // Message Board
        'board.title': 'Guestbook',
        'board.sub1': 'Leave your thoughts and suggestions here. Messages are private by default and will not be shared publicly.',
        'board.sub2': 'Your message goes directly to my email. Let me know in the message if you want it added to the public list 💌',
        'board.formTitle': 'Leave a Message',
        'board.labelName': 'Name',
        'board.phName': 'Enter your name',
        'board.labelEmail': 'Email (optional, so I can reply to you)',
        'board.phEmail': 'Leave blank for fully anonymous',
        'board.labelMsg': 'Message',
        'board.phMsg': 'Write your message here',
        'board.submitBtn': 'Send Message',
        'board.sending': 'Sending…',
        'board.success': '✅ Got it, thank you! I will check my email and reply soon.',
        'board.error': '⚠️ Failed to send. Please try again later. If the issue persists, reach me via the email at the bottom of the page.',
        'board.listTitle': 'Messages',
        'board.empty1': 'Messages are not displayed publicly by default',
        'board.empty2': 'If you would like your message added to the public list',
        'board.empty3': 'Just mention it in your message 💌',

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

        // News Section
        'news.title': 'Daily News',
        'news.tab.ai': '🤖 AI',
        'news.tab.game': '🎮 Games',
        'news.tab.video': '🎬 Video Archive',
        'news.tab.archive': '📜 Past Issues',

        // Language Switch
        'lang.switch': '中文',
        'lang.label': 'EN'
    }
};

const BANANA_DESIGN_BUILD_SIGNATURE_bananacat_003 = 'i18n-translate-fn';

// 当前语言（挂到 window 上，以便 script.js 里的留言板提交逻辑读取当前语言下的文案）
let currentLang = localStorage.getItem('banana-lang') || 'zh';
window.translations = translations;
window.currentLang = currentLang;

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
    window.currentLang = lang;
    localStorage.setItem('banana-lang', lang);

    // 更新所有带 data-i18n 属性的元素（用 innerHTML 保留 <br> <span> 等 HTML 标签）
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // 更新带 data-i18n-placeholder 属性元素的 placeholder（输入框、文本域）
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
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

    // 翻译关于我板块的项目经历和兴趣爱好（批量处理，无需 data-i18n 标记）
    translateAboutExtras(lang);
}

// 兼容旧的语言切换函数
function toggleLanguage() {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage(newLang);
}

// ===== 关于我板块·项目经历与兴趣爱好批量翻译 =====
const aboutExtrasData = {
    zh: {
        games: [
            { title: '2024网易雷火角色制作训练营', role: '3D角色设计', desc: '根据每期的原画制作pbr全流程模型，包含武器，道具，服装，人物。坚持每一期的测试题都参加，制作效率及审美都有一定的提升。' },
            { title: '2024CUSGA中国大学生游戏开发创作大赛', role: '3D美术', desc: '介绍：以视野受限的俯视角射击战斗模式，主角通过摄入光源得以生存，若一段时间没有摄入光源则会死亡。以对话为核心的剧情交互，通过与日记/人工智能等道具对话获取信息，从而推动剧情发展。<br>负责部分：根据设计稿制作角色和部分建筑，跟队伍里的大家利用课余时间做3D俯视角生存恐怖游戏，利用这次机会提升自己团队协作能力和制作效率。' },
            { title: '个人游戏开发', role: '单人开发', desc: '当自己开始做游戏了就会觉得制作不易，有很多想实现的效果但力不从心，有很多需要学习的知识只能慢慢消化，最喜欢的过程是每次收集相关的资料都能了解到一些之前没接触过的事物。' },
            { title: 'Ciga game jam48小时极限开发（2024深圳凉屋站）', role: '美术', desc: '负责项目的静动态场景搭建与美术概念设计，在比赛周期内统筹时间与制作流程，运用3D场景辅助绘制，并结合手绘方式完成画面表现与视觉呈现。在项目过程中与团队成员进行深入交流，包括与腾讯、网易工作的队友以及AI生成研究方向的硕士队友的互动。通过与他们的交流，了解到AI技术在实际工作岗位中的应用方式，以及他们研究室在三维模型生成领域的具体研究进展与成果。这段经历深刻影响了我对AI技术发展的认知，建立了对AI技术（包括在3D领域应用）的心理接受基础，从最初的观望转变为主动探索和实践的态度。' },
            { title: '2024三七互娱高校小游戏开发大赛', role: '美术', desc: '项目描述：主角变成小狗布偶掉入了2D王国，与它的影子一同踏上寻找出口的冒险旅程。通过2D影子吃钥匙点亮3D世界回家的路。<br>担任角色：2D原画/3D角色/3D场景/绑定/动作/动画/特效/特殊材质效果/UI制作等等全部美术<br>大致制作流程：负责一部分策划文案，初步设想游戏剧情和发展走向，列举两个世界和玩家形象的风格方案，成员一致同意后开始搭建童话街第一、二关，地面画满涂鸦、给场景摆件做小动画来丰富画面，游戏大致完成后制作游戏封面和宣传图。<br>项目成果：(全开放赛道) 全国第三' },
            { title: '2024腾讯游戏美术高校公开课', role: '美术', desc: '学习游戏行业相关制作流程，听取从业人员的经验分享。通过本次公开课，自身的审美及对各岗位的认知度有一定的提高。' },
            { title: 'Global game jam48小时极限开发 (2025深圳线上站)', role: '独立开发', desc: '项目介绍：围绕主题"泡泡"开发的双人对战3D游戏《Bubble》。虽然比赛结束时尚未完全完成，但已实现角色移动、对话功能、触发道具、场景搭建、场景切换、UI界面、收集物、发射子弹、镜头跟随、失败界面、成功界面等核心功能。对战功能虽未完全实现，但基础框架已搭建完成。' },
            { title: '2025中国大学生游戏设计大赛金辰奖', role: '3D美术/技美', desc: '奖项：1、2025星游戏作品大赛决赛优秀奖/2、2025中国大学生游戏设计大赛金辰奖决赛/最佳技术应用奖<br>担任角色：3D场景/特效/TA/动画<br>项目介绍：卡通风模拟经营偏解密游戏，以城市电路的搭建为主。玩家通过电路拼图连接场景中的电源与用电器，在永夜来临之前将所有任务用电器点亮，用电器点亮时会为玩家提供税收，最后剩余的税收可被玩家带到下个关卡。<br>大致制作流程：列举可采用的风格方案，成员一致同意方案后通过搭建白盒确定建筑摆放位置，收集城市建筑参考图，单个工业区/住宅区/商业区为一块拼图，进一步细分店铺类型和区域类型，按照策划的要求，走次时代流程，调整并统一unity游戏整体的美术风格，通过写相关的脚本、shader及VFX特效等来丰富游戏画面，为了画面丰富度加上了可融化雪/交互动流/不同表现形式的烟雾/不同种类的液体等效果，并且给一些小物件做动画来增添趣味性。接下来将进一步优化建筑精度，做物体交互动画。' },
            { title: '2025游戏美术OPENDAY', role: '美术', desc: '参与游戏美术OPENDAY活动，学习了解游戏美术风格与制作流程，与行业前辈交流学习。' },
            { title: '恐怖欢乐向多人游戏', role: '3D美术', desc: '担任角色：3D角色/3D场景/绑定/动作/动画/特效/特殊材质效果/UI制作<br>项目介绍：《地狱酒店》是一款多人欢乐恐怖游戏。在游戏中玩家将扮演被束缚的橡胶员工，在充满超自然房客的地底酒店求生。用滑稽的操控方式，通过清洁血肉污渍、服务超自然房客等方式获取资金。每三天需达成绩效指标，否则全员将被制成香肠，次日你们又会在锅炉房重组，继续这场永恒的荒诞打工轮回。<br>负责部分：我负责开始界面大场景的制作和所有角色怪物的整个流程制作，大场景主要包括地下工厂的PBR模型制作/动画/特效/特殊材质效果/UI制作，角色怪物则为建模/绑定/动作/各种专属特效等制作，处理UI界面制作。' },
            { title: 'Global game jam48小时极限开发 (2026杭州站)', role: '3D美术', desc: '项目介绍：《戴面具的狼》是一款单机解密游戏。兔子的邪教（譬如食草教）称霸了世界，狼被兔子屠尽殆。玩家在兔子邪教文艺馆醒来，但这座文艺馆被有识之士做了手脚，只要戴上面具、找好角度，就能解开十几年前兔子邪教称霸世界的真相。<br>我负责整个流程的3D、TA部分，并负责仓库协作，与策划程序进行美术资产的传输。' }
        ],
        aiCoding: [
            { title: 'AI驱动应用实践', role: '个人开发·AI', desc: `<strong>业绩：</strong>【功能模块开发与实现】<br>1. 个人作品集网站 + 桌面交互桌宠<br>• <span class="hl">个人作品集网站</span>集中展示美术作品、游戏项目、Shader案例与研究日志，栏目通过统一导航与主题色体系保持视觉一致性。<br>• 完成前端页面开发与<span class="hl">GitHub静态部署</span>，作为作品展示的统一入口。<br>• 针对不同页面类型（博客、简历、作品详情）设计专属排版，图片与视频资源采用自适应比例卡片展示，避免拉伸裁剪。<br>• 同步开发<span class="hl">桌面交互桌宠</span>，作为独立软件常驻电脑桌面，并接入<span class="hl">大语言模型双引擎</span>（云端DeepSeek API + 本地模型），实现<span class="hl">联网与无网状态下均可与角色实时对话</span>，支持<span class="hl">人格设定、情绪联动与上下文记忆</span>。<br>2. <span class="hl">跨端素材管理白板</span><br>• 以电脑端为主开发主线，使用 <span class="hl">Expo</span> 在<span class="hl">安卓端</span>进行测试验证。<br>• 支持图片与视频素材的一键添加、分类收纳与下载导出，解决素材在多设备间反复传输的问题。<br>3. 多平台效率脚本工具<br>• <span class="hl">一键实时同步资产桥接工具</span>：无需桥接软件或手动导入导出，在 SP 中按下 Ctrl+S 即可将贴图<span class="hl">实时同步到 UE 引擎</span>，彻底消除材质搬运与参数重设的重复操作。<br>• <span class="hl">3D软件弹窗屏蔽器</span>：基于窗口类名设置白名单，实现对DCC软件运行中弹窗的拦截。<br>• <span class="hl">多端DCC多功能批处理自动化</span>：将文件格式转换、批量重命名、资源导入导出等操作整合为单步执行。<br>4. <span class="hl">音视频处理工具</span><br>• 最初从春节期间的<span class="hl">音频分离</span>与<span class="hl">自定义视频帧截取拼接工具</span>起步，用于展示毕设进度。<br>5. <span class="hl">引擎资产提效工具</span>（2026.08.09个人立项，开发中）<br>• 复盘游戏美术资产管线通用痛点，针对海量资产加载卡顿、程序闪退、多Git分支资源版本错乱等行业普遍问题，独立设计个人<span class="hl">自研引擎</span>的三模块轻量化提效架构，AI辅助开发适配UE4的提效工具。<br>6. <span class="hl">DCC多版本桥接整合软件</span><br>• 针对团队协作中常见的DCC软件版本不兼容问题制作<span class="hl">版本整合软件</span>，为解决3D软件不统一的问题，打通因版本差异导致的管线阻塞。<br><br><strong>内容：</strong>【项目背景与目标】<br>为解决个人工作流中作品展示缺乏统一入口、素材在电脑与手机间重复操作等问题，独立设计并开发一款以AI为辅助的轻量级应用，覆盖作品展示、素材管理及效率提升三大核心方向。项目始于2026年春节期间的音视频处理需求，整体采用AI辅助开发模式，本人负责需求定义与质量把控，AI辅助完成代码实现。<br>【项目角色与职责】<br>1. 主导需求分析、架构设计、功能定义、测试验证及迭代优化全流程，采用"需求拆解 → AI生成实现 → 测试反馈 → 迭代优化"的协作模式，明确产品方向与验收标准，把控整体质量。<br>2. 具备代码阅读与理解能力，能基于上下文对代码进行小范围修改，包括增删内容、替换资源、调整参数与样式等，并负责后续维护。` },
            { title: '3D 自动化提效工具软件', role: '个人开发·AI', desc: `<strong>业绩：</strong>【项目落地与成果】<br>1. 项目已应用于内部资产初加工流程，共完成约<span class="hl-strong">10个全流程资产</span>的实践与落地。<br>2. <span class="hl-strong">单批次处理效率提升2倍</span>，<span class="hl-strong">人工复检率下降至50%</span>左右，日常测试时基本一次导入即可完成资产检测。<br>3. 项目验证了<span class="hl">AI辅助自动化</span>在3D资产生产中的可行性，为后续提效工具的开发提供了参考与方向。<br><br><strong>内容：</strong>【项目背景与目标】<br>在3D资产初加工阶段，模型生成、面数统计与拓扑质检等环节存在大量重复性人工操作，影响整体生产效率。本项目为个人开发项目，旨在结合AI技术与自动化脚本，构建一套从规范制定到质检标记的工具链，提升资产生产流程的标准化和自动化水平，降低人工成本。<br>【<span class="hl">AI辅助自动化质检工具开发</span>】<br>1. 基于AI辅助开发<span class="hl">自动化脚本</span>，实现对3D模型顶点、三角面、四边面的批量统计，并通过<span class="hl">拓扑分析</span>检测破面问题，自动标记异常资产。<br>2. 脚本支持<span class="hl">多格式模型</span>的批量处理，减少人工逐个检查的工作量，提升模型质检效率。<br>【<span class="hl">统一美术规范</span>与<span class="hl">AI生成平台整合</span>】<br>1. 制定统一的美术规范，明确2D与3D资产的特征描述，辅助AI更精准地识别资产属性。<br>2. 将规范数据结构化，输出为汇总表并导入AI生成平台，实现基础模型的批量生成，提升模型生成效率与一致性。<br>【工具链延伸与流程覆盖】<br>1. 在质检脚本基础上，开发<span class="hl">批量导入导出、自动化命名</span>等插件，扩展工具功能。<br>2. 工具链覆盖从资产入库到下发下游的全流程操作，初步实现资产管线的自动化处理。` }
        ],
        other: [
            { title: '奢侈品牌拍摄剪辑', role: '摄像剪辑', desc: '在WA IMAGING实习期间，主要服务Dior、Vetements等高奢和主流品牌，参与品牌形象大片平面拍摄、动态视频摄影、时尚活动拍摄等项目的拍摄与剪辑工作，协助主摄影师完成拍摄全流程，包括前期场景布置、拍摄道具制作、花絮跟拍及录像、后期影片剪辑与多平台宣传发布。' },
            { title: '鲁迅《在酒楼上》定格动画', role: '定格动画', desc: '改编自鲁迅同名小说，独立完成从0到1搭建所有道具、服装、场景，一帧一帧调整拍摄。涵盖前期筹备、道具制作、人物与服装缝制、定格拍摄及后期制作全流程，由于人数有限以及时间限制，我们请了熟人配音。' },
            { title: '自媒体运营', role: '自媒体博主', desc: '以分享博主身份运营自媒体，覆盖小红书、公众号等平台，单个平台账号从0到1断断续续更新不到6个月累计获赞与收藏25万+/点击量百万以上，运营两个满员社群和一个新社群，积累了内容创作、粉丝运营和社群管理经验。' },
            { title: '企业账号代运营', role: '运营专员', desc: '为企业从零开始运营账号，临近离职返校时间，在短短几天内为企业积累240+粉丝，；负责海报设计、短视频剪辑、公众号及小红书推文设计与运营等全流程工作，同时兼任客服角色协助客户转化，具备独立完成多平台运营的能力。' },
            { title: '文创周边设计', role: '视觉设计', desc: '为企业设计文创周边产品及公众号推文设计，工作内容以排版设计为主，流程化重复性较高，缺乏挑战性与成长空间，因此选择退出。期间积累了文创产品设计与公众号推文设计的实践经验。' }
        ],
        hobbies: {
            title: '兴趣爱好',
            intro: '曾有长辈提醒过我，涉猎过广容易样样不精。但我始终觉得，不能因为担心不够精深就停止探索，对什么有兴趣就去接触，这并没有什么不好，总不能因为害怕就压抑自己的好奇心和探索欲。我的学习方法一向是在一个方向上深入钻研的同时，也去接触其他领域，从过去到现在，一直都是如此。与其说自己会什么，我更习惯把东西做出来再说，平时学了什么不必声张，真正做出了东西再摆出来就好。',
            items: [
                { title: '游戏开发', desc: '利用课余时间开发小型游戏，学习游戏引擎和游戏设计原理。' },
                { title: '旅游', desc: '喜欢探索不同的地方，体验当地文化和风景，为创作寻找灵感。' },
                { title: '研究前沿科技', desc: '关注AI、3D生成、游戏引擎等前沿技术发展，不断学习和探索新技术在创作中的应用。' },
                { title: '打游戏、看剧、看电影', desc: '通过影视作品感受不同的故事和世界观，为创作积累灵感。' },
                { title: '任何形式的创作', desc: '3D角色制作是让我沉浸心流的方式，不管是纯艺、雕刻还是手工，都能让我心静下来想事情，当创作主题我非常有兴趣的时候，可以连续三天三夜甚至连着好几个月做这一样东西。' }
            ]
        }
    },
    en: {
        games: [
            { title: '2024 NetEase Thunder Fire Character Production Training Camp', role: '3D Character Design', desc: 'Produced PBR full-pipeline models based on concept art for each session, including weapons, props, clothing, and characters. Consistently participated in every session\'s test, improving production efficiency and aesthetic judgment.' },
            { title: '2024 CUSGA China College Game Development Competition', role: '3D Artist', desc: 'Introduction: A top-down shooter with limited field of view, where the protagonist survives by absorbing light sources; if no light is absorbed for a period, the character dies. Story-driven dialogue interactions where players obtain information by conversing with diaries, AI, and other props to advance the plot.<br>Responsibilities: Created characters and some buildings based on design documents, collaborated with the team to build a 3D top-down survival horror game in spare time, using this opportunity to improve teamwork and production efficiency.' },
            { title: 'Personal Game Development', role: 'Solo Developer', desc: 'Once you start making games yourself, you realize how challenging production is. There are many effects you want to achieve but feel inadequate for, and much knowledge to learn that takes time to digest. My favorite part is that every time I collect related materials, I learn about things I hadn\'t encountered before.' },
            { title: 'Ciga Game Jam 48-Hour Extreme Dev (2024 Shenzhen Liangwu Station)', role: 'Artist', desc: 'Responsible for static and dynamic scene construction and art concept design, coordinating time and production pipeline within the competition period. Used 3D scenes to assist drawing, combined with hand-drawn methods to complete visual presentation. Had in-depth exchanges with team members during the project, including those working at Tencent and NetEase, and a teammate researching AI generation. Through these exchanges, learned about AI technology applications in actual work positions and their lab\'s specific research progress in 3D model generation. This experience profoundly influenced my understanding of AI technology development, establishing a psychological foundation for accepting AI technology (including 3D applications), shifting from initial observation to proactive exploration and practice.' },
            { title: '2024 37 Interactive Entertainment College Mini Game Dev Competition', role: 'Artist', desc: 'Project Description: The protagonist turns into a puppy doll and falls into a 2D kingdom, embarking on an adventure to find the exit with its shadow. The 2D shadow eats keys to light up the 3D world\'s path home.<br>Role: 2D Original Art / 3D Characters / 3D Scenes / Rigging / Animation / VFX / Special Material Effects / UI Production - all art responsibilities<br>Production Pipeline: Responsible for some planning copy, initially designing the game story and development direction, proposing style options for both worlds and player characters. After team agreement, built Fairy Street levels 1 and 2, drew graffiti on the ground, added small animations to scene props to enrich visuals. After the game was mostly complete, produced the game cover and promotional images.<br>Results: (Open Track) 3rd Place Nationally' },
            { title: '2024 Tencent Game Art College Open Course', role: 'Artist', desc: 'Studied game industry production pipelines and listened to experience sharing from industry professionals. Through this open course, improved personal aesthetics and understanding of various roles.' },
            { title: 'Global Game Jam 48-Hour Extreme Dev (2025 Shenzhen Online)', role: 'Independent Developer', desc: 'Project Introduction: A 3D two-player battle game "Bubble" developed around the theme "bubbles." Although not fully completed by the end of the competition, core features including character movement, dialogue, prop triggers, scene building, scene switching, UI, collectibles, bullet shooting, camera follow, failure screen, and success screen were implemented. While the battle mode wasn\'t fully realized, the basic framework was set up.' },
            { title: '2025 China College Game Design Competition - Jinchen Award', role: '3D Artist / Technical Artist', desc: 'Awards: 1. 2025 Star Game Works Competition Finals Excellence Award / 2. 2025 China College Game Design Competition Jinchen Award Finals / Best Technology Application Award<br>Role: 3D Scenes / VFX / TA / Animation<br>Project Introduction: A cartoon-style simulation management puzzle game centered on city circuit building. Players connect power sources and appliances through circuit puzzles, lighting up all task appliances before eternal night falls. Lit appliances provide tax revenue, and remaining taxes can be carried to the next level.<br>Production Pipeline: Proposed style options, after team agreement, built whiteboxing to determine building placement, collected city building reference images. Individual industrial/residential/commercial zones served as puzzle pieces, further subdivided by shop and zone types. Following the designer\'s requirements, went through the next-gen pipeline, adjusted and unified the Unity game\'s overall art style. Enriched visuals through scripts, shaders, and VFX, adding meltable snow, interactive streams, different smoke types, various liquid effects, and small object animations for fun. Next steps include further optimizing building precision and adding object interaction animations.' },
            { title: '2025 Game Art OPENDAY', role: 'Artist', desc: 'Participated in the Game Art OPENDAY event, learning about game art styles and production pipelines, and exchanging with industry veterans.' },
            { title: 'Horror-Comedy Multiplayer Game', role: '3D Artist', desc: 'Role: 3D Characters / 3D Scenes / Rigging / Animation / VFX / Special Material Effects / UI Production<br>Project Introduction: "Hell Hotel" is a multiplayer horror-comedy game. Players take on the role of restrained rubber employees, surviving in an underground hotel filled with supernatural guests. Using comical controls, players earn money by cleaning blood stains and serving supernatural guests. Every three days, performance targets must be met, or all members will be turned into sausages, only to be reassembled in the boiler room the next day to continue this eternal absurd work cycle.<br>Responsibilities: I was responsible for the main menu\'s large scene production and the full pipeline of all character monsters. The large scene included underground factory PBR model production / animation / VFX / special material effects / UI, while character monsters included modeling / rigging / animation / various exclusive VFX, and UI production.' },
            { title: 'Global Game Jam 48-Hour Extreme Dev (2026 Hangzhou Station)', role: '3D Artist', desc: 'Project Introduction: "The Masked Wolf" is a single-player puzzle game. Rabbit cults (such as the Herbivore Cult) have dominated the world, and wolves have been slaughtered by rabbits. The player wakes up in a rabbit cult art gallery, but the gallery has been tampered with by those with insight. By wearing a mask and finding the right angle, players can uncover the truth of how the rabbit cults conquered the world over a decade ago.<br>I was responsible for the 3D and TA portions of the entire pipeline, and managed repository collaboration, transferring art assets with designers and programmers.' }
        ],
        aiCoding: [
            { title: 'AI-Driven Application Practice', role: 'Personal Dev · AI', desc: `<strong>Achievements:</strong> [Feature Module Development & Implementation]<br>1. Personal Portfolio Website + Desktop Interactive Pet<br>• <span class="hl">Personal Portfolio Website</span> centrally showcases art works, game projects, Shader cases, and research logs, with sections maintaining visual consistency through unified navigation and theme color systems.<br>• Completed front-end page development and <span class="hl">GitHub static deployment</span> as the unified entry point for portfolio display.<br>• Designed exclusive layouts for different page types (blog, resume, portfolio details), with image and video resources displayed in adaptive-ratio cards to avoid stretching or cropping.<br>• Simultaneously developed <span class="hl">Desktop Interactive Pet</span> as standalone software residing on the desktop, integrated with <span class="hl">Dual LLM Engine</span> (cloud DeepSeek API + local model), enabling <span class="hl">real-time character dialogue both online and offline</span>, supporting <span class="hl">personality settings, emotion linkage, and context memory</span>.<br>2. <span class="hl">Cross-Platform Asset Management Whiteboard</span><br>• PC as the main development line, using <span class="hl">Expo</span> for <span class="hl">Android</span> testing and verification.<br>• Supports one-click adding, categorizing, and exporting of image and video assets, solving the problem of repeated transfers between devices.<br>3. Multi-Platform Efficiency Script Tools<br>• <span class="hl">One-Click Real-Time Asset Sync Bridge Tool</span>: No bridge software or manual import/export needed; pressing Ctrl+S in SP <span class="hl">syncs textures to UE engine in real time</span>, completely eliminating repetitive material transfer and parameter reset operations.<br>• <span class="hl">3D Software Popup Blocker</span>: Uses window class name whitelisting to intercept popups during DCC software operation.<br>• <span class="hl">Multi-Platform DCC Batch Processing Automation</span>: Integrates file format conversion, batch renaming, resource import/export into single-step execution.<br>4. <span class="hl">Audio/Video Processing Tools</span><br>• Started from <span class="hl">audio separation</span> and <span class="hl">custom video frame capture and stitching tools</span> during the Spring Festival, used to showcase graduation project progress.<br>5. <span class="hl">Engine Asset Efficiency Tool</span> (2026.08.09 personal project, in development)<br>• Reviewed common pain points in game art asset pipelines, addressing industry-wide issues like massive asset loading lag, program crashes, and multi-Git-branch resource version conflicts. Independently designed a three-module lightweight efficiency architecture for a <span class="hl">self-developed engine</span>, with AI-assisted development of UE4-adapted efficiency tools.<br>6. <span class="hl">DCC Multi-Version Bridge Integration Software</span><br>• Created a <span class="hl">version integration software</span> for DCC software version incompatibility issues common in team collaboration, resolving pipeline blockages caused by version differences.<br><br><strong>Content:</strong> [Project Background & Goals]<br>To solve problems in personal workflows such as lack of a unified portfolio entry point and repeated asset operations between PC and phone, independently designed and developed an AI-assisted lightweight application covering three core directions: portfolio display, asset management, and efficiency improvement. The project started from audio/video processing needs during the 2026 Spring Festival, adopting an AI-assisted development model where I was responsible for requirements definition and quality control, with AI assisting in code implementation.<br>[Project Role & Responsibilities]<br>1. Led the full process of requirements analysis, architecture design, feature definition, testing, and iterative optimization, adopting a "requirements breakdown → AI-generated implementation → testing feedback → iterative optimization" collaboration model, defining product direction and acceptance criteria, and controlling overall quality.<br>2. Possess code reading and understanding skills, able to make small-scale modifications based on context, including adding/removing content, replacing resources, adjusting parameters and styles, and responsible for ongoing maintenance.` },
            { title: '3D Automation Efficiency Tool Software', role: 'Personal Dev · AI', desc: `<strong>Achievements:</strong> [Project Implementation & Results]<br>1. The project has been applied to the internal asset pre-processing pipeline, completing approximately <span class="hl-strong">10 full-pipeline assets</span> in practice and deployment.<br>2. <span class="hl-strong">Single-batch processing efficiency increased 2x</span>, <span class="hl-strong">manual re-inspection rate reduced to about 50%</span>, with daily tests basically completing asset inspection in a single import.<br>3. The project validated the feasibility of <span class="hl">AI-assisted automation</span> in 3D asset production, providing reference and direction for subsequent efficiency tool development.<br><br><strong>Content:</strong> [Project Background & Goals]<br>In the 3D asset pre-processing stage, model generation, polygon count statistics, and topology quality inspection involve extensive repetitive manual operations that affect overall production efficiency. This personal project aims to combine AI technology with automation scripts to build a toolchain from specification formulation to quality inspection marking, improving the standardization and automation of asset production pipelines and reducing labor costs.<br>[<span class="hl">AI-Assisted Automated Quality Inspection Tool Development</span>]<br>1. Developed <span class="hl">automation scripts</span> with AI assistance for batch statistics of 3D model vertices, triangles, and quads, using <span class="hl">topology analysis</span> to detect broken meshes and automatically flag anomalous assets.<br>2. Scripts support <span class="hl">multi-format model</span> batch processing, reducing manual inspection workload and improving model quality inspection efficiency.<br>[<span class="hl">Unified Art Specifications</span> & <span class="hl">AI Generation Platform Integration</span>]<br>1. Formulated unified art specifications, defining feature descriptions for 2D and 3D assets to help AI more accurately identify asset attributes.<br>2. Structured specification data into summary tables and imported them into AI generation platforms for batch base model generation, improving model generation efficiency and consistency.<br>[Toolchain Extension & Pipeline Coverage]<br>1. Built upon the quality inspection scripts, developed <span class="hl">batch import/export and automated naming</span> plugins to extend tool functionality.<br>2. The toolchain covers the full pipeline from asset intake to downstream delivery, preliminarily achieving automated asset pipeline processing.` }
        ],
        other: [
            { title: 'Luxury Brand Photography & Editing', role: 'Cinematographer & Editor', desc: 'During the WA IMAGING internship, mainly served luxury and mainstream brands including Dior and Vetements, participating in brand image photography, dynamic video shooting, and fashion event coverage projects. Assisted the lead photographer throughout the entire shooting process, including pre-production scene setup, prop making, behind-the-scenes filming, post-production editing, and multi-platform promotional publishing.' },
            { title: 'Lu Xun "At the Tavern" Stop Motion Animation', role: 'Stop Motion Animation', desc: 'Adapted from Lu Xun\'s novel of the same name, independently built all props, costumes, and scenes from scratch, adjusting and shooting frame by frame. Covered the full pipeline from pre-production, prop making, character and costume sewing, stop-motion shooting, to post-production. Due to limited personnel and time constraints, we invited acquaintances for voice acting.' },
            { title: 'Social Media Operation', role: 'Content Creator', desc: 'Operated social media as a sharing blogger, covering platforms like Xiaohongshu and WeChat Official Accounts. A single platform account grew from 0 to over 250k likes and saves with over a million views in less than 6 months of intermittent updates. Managed two full community groups and one new group, accumulating experience in content creation, fan operation, and community management.' },
            { title: 'Corporate Account Operation', role: 'Operation Specialist', desc: 'Operated corporate accounts from scratch. Near the end of the internship before returning to school, accumulated 240+ followers for the company in just a few days. Responsible for poster design, short video editing, WeChat Official Account and Xiaohongshu post design and operation, while also serving as customer service to assist with conversion. Capable of independently completing multi-platform operations.' },
            { title: 'Cultural & Creative Merchandise Design', role: 'Visual Design', desc: 'Designed cultural and creative merchandise products and WeChat Official Account posts for the company. The work was primarily layout design with high repetitiveness, lacking challenge and growth opportunities, so I chose to leave. During this period, accumulated practical experience in cultural product design and Official Account post design.' }
        ],
        hobbies: {
            title: 'Hobbies',
            intro: 'A senior once reminded me that spreading too wide leads to mastering nothing. But I have always felt that one shouldn\'t stop exploring just out of fear of not being deep enough. If something interests you, go explore it — there\'s nothing wrong with that. You shouldn\'t suppress your curiosity and desire to explore just because you\'re afraid. My learning approach has always been to dive deep in one direction while also touching on other fields. From the past to now, it has always been this way. Rather than claiming what I can do, I prefer to make things first and talk later. What I learn day-to-day doesn\'t need to be announced — when something real is produced, then it\'s worth showing.',
            items: [
                { title: 'Game Development', desc: 'Developing small games in my spare time, learning game engines and game design principles.' },
                { title: 'Traveling', desc: 'Love exploring different places, experiencing local culture and scenery, finding inspiration for creation.' },
                { title: 'Cutting-Edge Tech Research', desc: 'Following developments in AI, 3D generation, game engines, and other frontier technologies, continuously learning and exploring their applications in creation.' },
                { title: 'Gaming, TV Shows & Movies', desc: 'Experiencing different stories and worldviews through film and television, accumulating inspiration for creation.' },
                { title: 'Creation in Any Form', desc: '3D character creation is my way of entering a flow state. Whether it\'s fine art, sculpting, or crafting, it calms my mind and lets me think. When I\'m deeply interested in a creative topic, I can work on it for three days and nights straight, or even for months on end.' }
            ]
        }
    }
};

function translateAboutExtras(lang) {
    const data = aboutExtrasData[lang] || aboutExtrasData.zh;

    // 项目经历·游戏 tab
    const gamesItems = document.querySelectorAll('#games-content .experience-item');
    gamesItems.forEach((item, i) => {
        if (data.games[i]) {
            const h4 = item.querySelector('.experience-header h4');
            const role = item.querySelector('.experience-company');
            const desc = item.querySelector('.experience-description');
            if (h4) h4.textContent = data.games[i].title;
            if (role) role.textContent = data.games[i].role;
            if (desc && data.games[i].desc) desc.innerHTML = data.games[i].desc;
        }
    });

    // 项目经历·AI Coding tab
    const aiItems = document.querySelectorAll('#ai-coding-content .experience-item');
    aiItems.forEach((item, i) => {
        if (data.aiCoding[i]) {
            const h4 = item.querySelector('.experience-header h4');
            const role = item.querySelector('.experience-company');
            const desc = item.querySelector('.experience-description');
            if (h4) h4.textContent = data.aiCoding[i].title;
            if (role) role.textContent = data.aiCoding[i].role;
            if (desc && data.aiCoding[i].desc) desc.innerHTML = data.aiCoding[i].desc;
        }
    });

    // 项目经历·其他 tab
    const otherItems = document.querySelectorAll('#other-content .experience-item');
    otherItems.forEach((item, i) => {
        if (data.other[i]) {
            const h4 = item.querySelector('.experience-header h4');
            const role = item.querySelector('.experience-company');
            const desc = item.querySelector('.experience-description');
            if (h4) h4.textContent = data.other[i].title;
            if (role) role.textContent = data.other[i].role;
            if (desc && data.other[i].desc) desc.innerHTML = data.other[i].desc;
        }
    });

    // 兴趣爱好板块（最后一个 about-section）
    const aboutSections = document.querySelectorAll('#about .about-section');
    const hobbySection = aboutSections[aboutSections.length - 1];
    if (hobbySection && data.hobbies) {
        const hobbyH3 = hobbySection.querySelector('h3');
        if (hobbyH3) hobbyH3.textContent = data.hobbies.title;

        const hobbyIntro = hobbySection.querySelector('p[style*="italic"]');
        if (hobbyIntro) hobbyIntro.textContent = data.hobbies.intro;

        const hobbyItems = hobbySection.querySelectorAll('.hobby-item');
        hobbyItems.forEach((item, i) => {
            if (data.hobbies.items[i]) {
                const h4 = item.querySelector('h4');
                const p = item.querySelector('p');
                if (h4) h4.textContent = data.hobbies.items[i].title;
                if (p) p.textContent = data.hobbies.items[i].desc;
            }
        });
    }
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(currentLang);
    _banana_lang_init_outside_click();
});

