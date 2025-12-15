// sidebar-template.js

/**
 * 侧边栏导航组件的 HTML 模板。
 * currentPath 用于确定哪个导航项应该被高亮显示。
 */
function getSidebarTemplate(currentPath) {
    // 定义导航链接及其路径
    const navItems = [
        { href: '../index.html', icon: 'fas fa-home', text: '首页', id: 'index' },
        { href: 'deepglow.html', icon: 'fas fa-bolt', text: 'PhotoGlow Ultimate', id: 'deepglow' },
        { href: 'tool-b.html', icon: 'fas fa-chart-line', text: 'Tool B (数据可视化)', id: 'tool-b' },
        { href: 'tool-c.html', icon: 'fas fa-code', text: 'Tool C (代码片段)', id: 'tool-c', disabled: true },
    ];

    // 确定当前页面的标识符 (e.g., 'deepglow.html' -> 'deepglow')
    const currentPageId = currentPath.split('/').pop().split('.')[0];
    
    // 生成导航列表
    const navHtml = navItems.map(item => {
        const isActive = (item.id === currentPageId) || (item.id === 'index' && currentPageId === 'index');
        const activeClass = isActive ? 'bg-primary-700/50 text-white' : 'hover:bg-gray-800/70 text-gray-400';
        const disabledClass = item.disabled ? 'opacity-50 cursor-not-allowed' : '';
        const href = item.disabled ? '#' : item.id === 'index' ? item.href : `../tools/${item.href}`;

        return `
            <a href="${href}" class="block py-3 px-4 rounded-lg transition-colors ${activeClass} ${disabledClass}">
                <i class="${item.icon} w-5 mr-3"></i>
                <span class="font-medium">${item.text}</span>
            </a>
        `;
    }).join('');

    return `
        <div id="sidebar-container" class="flex-shrink-0">
            <aside id="sidebar" class="fixed inset-y-0 left-0 w-64 glass-panel flex flex-col z-50 transform -translate-x-full lg:translate-x-0
                                       transition-transform duration-300 ease-in-out border-r border-gray-700/50 shadow-2xl">
                
                <div class="p-6 border-b border-gray-800/50 shrink-0">
                    <a href="../index.html" class="text-xl font-extrabold tracking-wider text-white flex items-center">
                        <i class="fas fa-layer-group text-primary-500 mr-2"></i>
                        Leo's <span class="text-primary-400 ml-1">Tools</span>
                    </a>
                </div>

                <nav class="flex-grow p-4 space-y-1 custom-scrollbar overflow-y-auto">
                    ${navHtml}
                </nav>

                <div class="p-4 text-xs text-gray-500 border-t border-gray-800/50 shrink-0">
                    <p>&copy; 2025 Leo</p>
                    <p class="mt-1">Powered by WebGL & Tailwind</p>
                </div>
            </aside>

            <div id="sidebar-overlay" class="hidden fixed inset-0 bg-black/50 z-40 lg:hidden"></div>
        </div>
    `;
}


/**
 * 注入侧边栏组件到页面并绑定事件。
 * @param {string} currentPageId - 当前页面的标识符 (e.g., 'deepglow.html')
 */
function injectSidebar(currentPageId) {
    const sidebarHtml = getSidebarTemplate(currentPageId);
    
    // 注入 HTML 模板
    document.body.insertAdjacentHTML('afterbegin', sidebarHtml);

    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContainer = document.querySelector('.main-content-wrap');
    const headerToggle = document.getElementById('sidebar-toggle');
    
    // 侧边栏切换逻辑
    function toggleSidebar() {
        const isHidden = sidebar.classList.contains('-translate-x-full');
        
        if (isHidden) {
            // 打开侧边栏
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        } else {
            // 关闭侧边栏
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    }

    // 绑定事件
    if (headerToggle) {
        headerToggle.addEventListener('click', toggleSidebar);
    }
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // 桌面端布局处理
    function handleResize() {
        if (window.innerWidth >= 1024) { // lg breakpoint
            // 桌面端：确保侧边栏可见，并为内容区提供左侧边距
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            if (mainContainer) {
                 // 256px = w-64
                mainContainer.style.marginLeft = '16rem'; 
            }
        } else {
            // 移动端：确保内容区没有左侧边距
            if (mainContainer) {
                mainContainer.style.marginLeft = '0';
            }
            // 默认隐藏侧边栏
            if (!sidebar.classList.contains('-translate-x-full')) {
                 sidebar.classList.add('-translate-x-full');
            }
            sidebarOverlay.classList.add('hidden');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 页面加载时执行一次
}
