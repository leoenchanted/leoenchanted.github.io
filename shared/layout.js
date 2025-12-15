// shared/layout.js
document.addEventListener('DOMContentLoaded', async () => {
  const sidebarContainer = document.getElementById('shared-sidebar');
  if (!sidebarContainer) return;

  try {
    const response = await fetch('../shared/sidebar.html');
    const html = await response.text();
    sidebarContainer.innerHTML = html;
    
    // 高亮当前页面
    const currentPage = window.location.pathname.split('/').pop();
    const links = sidebarContainer.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('href').includes(currentPage)) {
        link.classList.add('bg-gray-800', 'text-white', 'font-medium');
      }
    });
  } catch (e) {
    console.warn('Failed to load sidebar:', e);
  }
});
