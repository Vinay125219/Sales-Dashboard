// Mock Data for Charts
const mockData = {
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            { label: 'Actual Revenue', data: [450000, 520000, 480000, 650000, 700000, 850000, 780000, 950000, 1280000], borderColor: '#4361ee', backgroundColor: 'rgba(67, 97, 238, 0.1)', tension: 0.4, fill: true },
            { label: 'Target Revenue', data: [500000, 500000, 600000, 600000, 700000, 700000, 800000, 800000, 900000], borderColor: 'rgba(102, 126, 234, 0.5)', borderDash: [5, 5], tension: 0.4, borderWidth: 2, pointRadius: 0, fill: false },
            { label: 'Previous Year', data: [380000, 420000, 390000, 500000, 560000, 610000, 650000, 700000, 790000], borderColor: 'rgba(67, 97, 238, 0.3)', backgroundColor: 'rgba(67, 97, 238, 0.05)', tension: 0.4, fill: true }
        ]
    },
    acquisition: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], datasets: [{ label: 'New Customers', data: [65, 78, 52, 91, 108, 124, 137, 156, 168], backgroundColor: '#4cc9f0', hoverBackgroundColor: '#3a86ff', barPercentage: 0.6, categoryPercentage: 0.7 }] },
    categorySales: { labels: ['Software', 'Hardware', 'Services', 'Training'], datasets: [{ data: [55, 25, 15, 5], backgroundColor: ['#4361ee', '#3a0ca3', '#4cc9f0', '#f72585'], hoverBackgroundColor: ['#3a56d4', '#2f0b82', '#32b4e4', '#e9126f'] }] },
    targets: { labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'], datasets: [{ label: 'Actual', data: [85, 72, 78, 53, 47], backgroundColor: '#4361ee' }, { label: 'Target', data: [75, 65, 70, 60, 50], backgroundColor: '#adb5bd' }] }
};

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// DOM Elements and Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = document.querySelector('.theme-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const filterToggle = document.getElementById('filter-toggle');
    const filterDrawer = document.getElementById('filter-drawer');
    const closeFilter = document.getElementById('close-filter');
    let isDarkTheme = false;

    // Theme Switch
    themeSwitch.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
        themeIcon.classList.toggle('fa-sun', isDarkTheme);
        themeIcon.classList.toggle('fa-moon', !isDarkTheme);
        updateChartsTheme(isDarkTheme);
        updateThreeJsScenes(isDarkTheme);
    });

    // Sidebar Toggle (Desktop and Mobile)
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    mobileMenuToggle.addEventListener('click', () => sidebar.classList.toggle('show'));

    // Close sidebar on mobile click outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });

    // Filter Drawer Toggle
    filterToggle.addEventListener('click', () => filterDrawer.classList.toggle('show'));
    closeFilter.addEventListener('click', () => filterDrawer.classList.remove('show'));

    // Initialize Charts
    initCharts();

    // Load Three.js conditionally
    loadThreeJs();

    // Resize handler
    window.addEventListener('resize', debounce(() => {
        Chart.helpers.each(Chart.instances, instance => instance.resize());
    }, 250));
});

// Chart Initialization
function initCharts() {
    const chartOptions = {
        responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true } }, tooltip: { mode: 'index', intersect: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { borderDash: [2, 2] } } }
    };

    const charts = { revenue: 'line', acquisition: 'bar', categorySales: 'doughnut', targets: 'bar' };
    Object.entries(charts).forEach(([id, type]) => {
        const ctx = document.getElementById(`${id}Chart`).getContext('2d');
        new Chart(ctx, { type, data: mockData[id], options: chartOptions });
    });
}

// Theme and Three.js Updates
function updateChartsTheme(isDark) {
    Chart.helpers.each(Chart.instances, instance => {
        instance.data.datasets.forEach(dataset => {
            dataset.borderColor = isDark ? lightenColor(dataset.borderColor, 20) : darkenColor(dataset.borderColor, 20);
            dataset.backgroundColor = isDark ? lightenColor(dataset.backgroundColor, 20) : darkenColor(dataset.backgroundColor, 20);
        });
        instance.update();
    });
}

function lightenColor(color, percent) {
    // Simplified color lightening (use a library like 'color' for production)
    return color.replace('0.', (parseFloat('0.' + color.split('.')[1]) + percent / 100).toString().substr(0, 4));
}

function darkenColor(color, percent) {
    // Simplified color darkening
    return color.replace('0.', (parseFloat('0.' + color.split('.')[1]) - percent / 100).toString().substr(0, 4));
}

function loadThreeJs() {
    if (window.innerWidth > 1024) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initThreeJsScenes;
        document.head.appendChild(script);
    } else {
        document.querySelectorAll('.canvas-container').forEach(container => container.style.display = 'none');
    }
}

// Three.js Scene Initialization (Only on Desktop)
function initThreeJsScenes() {
    // Simplified for brevity - implement only if needed
    ['kpi-canvas-1', 'kpi-canvas-2', 'kpi-canvas-3', 'kpi-canvas-4', 'insight-canvas', 'revenue-canvas', 'acquisition-canvas', 'category-canvas', 'targets-canvas', 'performers-canvas'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            // Basic animation (e.g., rotating cube)
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: '#4361ee', transparent: true, opacity: 0.3 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            camera.position.z = 5;

            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            }

            animate();

            window.addEventListener('resize', debounce(() => {
                renderer.setSize(container.clientWidth, container.clientHeight);
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
            }, 250));
        }
    });
}

function updateThreeJsScenes(isDark) {
    document.querySelectorAll('.canvas-container').forEach(container => {
        if (container.threeJsObjects && container.threeJsObjects.material) {
            container.threeJsObjects.material.color.set(isDark ? '#6d8cff' : '#4361ee');
            container.threeJsObjects.material.opacity = isDark ? 0.5 : 0.3;
        }
    });
}

// Natural Language Filter Mock (Simplified)
function processNaturalLanguageFilter(query) {
    const lowerQuery = query.toLowerCase();
    let filters = {};
    if (lowerQuery.includes('q1') || lowerQuery.includes('quarter 1')) filters.period = 'Q1';
    if (lowerQuery.includes('enterprise')) filters.segment = 'Enterprise';
    if (lowerQuery.includes('revenue')) filters.metric = 'Revenue';
    return filters;
}

function applyFilters(filters) {
    const container = document.querySelector('.active-filters');
    Object.entries(filters).forEach(([key, value]) => {
        const filter = document.createElement('span');
        filter.className = 'active-filter';
        filter.innerHTML = `<i class="fas fa-${key === 'period' ? 'calendar' : key === 'segment' ? 'users' : 'chart-line'}"></i> ${value} <i class="fas fa-times"></i>`;
        container.appendChild(filter);

        filter.querySelector('.fa-times').addEventListener('click', () => filter.remove());
    });
}

document.querySelector('.natural-language-filter button').addEventListener('click', () => {
    const query = document.querySelector('.natural-language-filter input').value.trim();
    if (query) {
        const filters = processNaturalLanguageFilter(query);
        applyFilters(filters);
        filterDrawer.classList.remove('show');
        document.querySelector('.natural-language-filter input').value = '';
    }
});

document.querySelector('.natural-language-filter input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            const filters = processNaturalLanguageFilter(query);
            applyFilters(filters);
            filterDrawer.classList.remove('show');
            e.target.value = '';
        }
    }
});

// Filter Chips
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        let filters = {};
        const text = chip.textContent.trim().replace(' ✕', '');
        if (text === 'Q1 Enterprise') filters = { period: 'Q1', segment: 'Enterprise' };
        else if (text === 'APAC Hardware') filters = { region: 'APAC', category: 'Hardware' };
        else if (text === 'High Value Deals') filters = { dealSize: 'High Value' };
        applyFilters(filters);
        filterDrawer.classList.remove('show');
    });
});

// Active Filter Removal
document.querySelectorAll('.active-filter .fa-times').forEach(filter => {
    filter.addEventListener('click', (e) => {
        e.stopPropagation();
        filter.closest('.active-filter').remove();
    });
});

// Simulate Real-Time Updates
setInterval(() => {
    const chartContainers = document.querySelectorAll('.chart-container');
    const randomChart = chartContainers[Math.floor(Math.random() * chartContainers.length)];
    if (randomChart) {
        randomChart.classList.add('chart-update');
        setTimeout(() => randomChart.classList.remove('chart-update'), 500);
    }
}, 30000);