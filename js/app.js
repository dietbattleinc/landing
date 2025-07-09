const base = '/';

const urlFor = (path = '') => {
  return `${base}${path.replace(/^\//, '')}`;
};

// Update dynamic paths in the current page
function updateDynamicPaths(container = document) {
  container.querySelectorAll('[data-dynamic-href]').forEach(el => {
    const path = el.getAttribute('data-dynamic-href');
    el.href = path === 'home' ? urlFor() : urlFor(path);
  });
  container.querySelectorAll('[data-dynamic-src]').forEach(el => {
    const src = el.getAttribute('data-dynamic-src');
    if (src) el.src = urlFor(src);
  });
}

// Load component and update dynamic paths
function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(urlFor(filePath))
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;
      updateDynamicPaths(container);
    })
    .catch(e => console.error(`Error loading ${containerId}:`, e));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Update paths in the main document
  updateDynamicPaths();
  
  // Load components
  loadComponent('header', 'components/header.html');
  loadComponent('footer', 'components/footer.html');
});
