// DOM Elements
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const filterToggle = document.getElementById('filter-toggle');
const filterDrawer = document.getElementById('filter-drawer');
const closeFilter = document.getElementById('close-filter');
const timePeriod = document.getElementById('time-period');

// Toggle sidebar
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    document.querySelector('.content').classList.toggle('expanded');
  });
}

// Toggle filter drawer
if (filterToggle) {
  filterToggle.addEventListener('click', () => {
    filterDrawer.classList.toggle('open');
  });
}

// Close filter drawer
if (closeFilter) {
  closeFilter.addEventListener('click', () => {
    filterDrawer.classList.remove('open');
  });
}

// Setup charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupRevenueChart();
  setupAcquisitionChart();
  setupCategorySalesChart();
  setupTargetsChart();
});

// Revenue Performance Chart
function setupRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Current Period',
        data: [180000, 220000, 250000, 240000, 275000, 260000, 290000, 310000, 320000],
        borderColor: 'rgba(67, 97, 238, 0.7)',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Previous Period',
        data: [150000, 190000, 210000, 230000, 220000, 235000, 240000, 250000, 260000],
        borderColor: 'rgba(76, 201, 240, 0.7)',
        backgroundColor: 'rgba(76, 201, 240, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Forecast',
        data: [175000, 195000, 230000, 245000, 260000, 270000, 285000, 300000, 315000],
        borderColor: 'rgba(247, 37, 133, 0.7)',
        backgroundColor: 'rgba(247, 37, 133, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6
      }
    ]
  };

  new Chart(ctx, {
    type: 'line',
    data: revenueData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + (context.raw / 1000) + 'K';
            }
          }
        }
      }
    }
  });
}

// Customer Acquisition Chart
function setupAcquisitionChart() {
  const ctx = document.getElementById('acquisitionChart');
  if (!ctx) return;

  const acquisitionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        type: 'bar',
        label: 'New Customers',
        data: [45, 52, 38, 45, 60, 70],
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        order: 2
      },
      {
        type: 'line',
        label: 'Retention Rate',
        data: [85, 82, 88, 90, 89, 92],
        borderColor: 'rgba(76, 201, 240, 0.7)',
        backgroundColor: 'rgba(76, 201, 240, 0.1)',
        tension: 0.3,
        borderWidth: 3,
        order: 1,
        yAxisID: 'y1'
      }
    ]
  };

  new Chart(ctx, {
    type: 'scatter', // This is overridden by each dataset's type
    data: acquisitionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'New Customers'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: false,
          min: 80,
          max: 100,
          title: {
            display: true,
            text: 'Retention Rate'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'Retention Rate') {
                return context.dataset.label + ': ' + context.raw + '%';
              }
              return context.dataset.label + ': ' + context.raw;
            }
          }
        }
      }
    }
  });
}

// Sales by Category Chart
function setupCategorySalesChart() {
  const ctx = document.getElementById('categorySalesChart');
  if (!ctx) return;

  const categorySalesData = {
    labels: ['Software', 'Hardware', 'Services', 'Training'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(67, 97, 238, 0.7)',
        'rgba(114, 9, 183, 0.7)',
        'rgba(76, 201, 240, 0.7)',
        'rgba(247, 37, 133, 0.7)'
      ],
      hoverOffset: 4
    }]
  };

  new Chart(ctx, {
    type: 'doughnut',
    data: categorySalesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw + '%';
            }
          }
        }
      }
    }
  });
}

// Sales Performance vs Targets Chart
function setupTargetsChart() {
  const ctx = document.getElementById('targetsChart');
  if (!ctx) return;

  const targetsData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Actual',
        data: [650000, 830000, 920000, 0],
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1
      },
      {
        label: 'Target',
        data: [600000, 750000, 900000, 1100000],
        backgroundColor: 'rgba(247, 37, 133, 0.2)',
        borderColor: 'rgba(247, 37, 133, 1)',
        borderWidth: 1,
        borderDash: [5, 5]
      }
    ]
  };

  new Chart(ctx, {
    type: 'bar',
    data: targetsData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + (context.raw / 1000) + 'K';
            }
          }
        }
      }
    }
  });
}

// Handle time period selector changes
if (timePeriod) {
  timePeriod.addEventListener('change', function() {
    const value = this.value;
    console.log('Time period changed to:', value);
    // In a real application, you would refresh chart data based on the selected time period
    // For this demo, we'll just show an alert
    alert('Time period changed to: ' + value + '\nIn a real app, chart data would refresh.');
  });
}

// Setup event listeners for button group in revenue chart
document.querySelectorAll('.revenue-performance .btn-group .btn').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    document.querySelectorAll('.revenue-performance .btn-group .btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // In a real app, you would update the chart data based on the selected view
    const view = this.textContent.trim();
    console.log('Revenue chart view changed to:', view);
    // For this demo, we'll just show an alert
    alert('Revenue chart view changed to: ' + view + '\nIn a real app, chart data would refresh.');
  });
});


document.addEventListener('DOMContentLoaded', function () {
    const insightAlerts = document.querySelectorAll('.insight-alert');
    const viewAllButton = document.querySelector('.card-footer button');

    // Hide all insights except the first 5 on page load
    if (insightAlerts.length > 5) {
        for (let i = 5; i < insightAlerts.length; i++) {
            insightAlerts[i].style.display = 'none';
        }
    }

    // Add click event listener to "View All Insights" button
    viewAllButton.addEventListener('click', function () {
        for (let i = 0; i < insightAlerts.length; i++) {
            insightAlerts[i].style.display = 'block'; // Show all insights
        }
        viewAllButton.style.display = 'none'; // Hide the button after clicking
    });
});