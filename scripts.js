// SIDEBAR TOGGLE
console.log("Scripts.js Loaded Successfully");

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
    document.body.style.overflow = 'auto';
  }
}

// Close sidebar when clicking on a link
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      closeSidebar();
    }
  });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (sidebar && menuIcon && !sidebar.contains(e.target) && !menuIcon.contains(e.target) && window.innerWidth <= 992) {
    if (sidebarOpen) {
      closeSidebar();
    }
  }
});

// THEME TOGGLE
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  body.classList.toggle('dark-theme');
  
  // Update icon and save preference
  if (body.classList.contains('dark-theme')) {
    themeIcon.textContent = 'dark_mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.textContent = 'light_mode';
    localStorage.setItem('theme', 'light');
  }

  // Update charts theme
  updateChartsTheme();
}

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Loaded in scripts.js");
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.textContent = 'dark_mode'; // Added null check
  } else {
    if (themeIcon) themeIcon.textContent = 'light_mode'; // Added null check
  }

  // IMPORTANT – CALL CHART FUNCTION
  console.log("Attempting to initialize charts with theme:", savedTheme);
  initializeCharts(savedTheme);

  // Close sidebar on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && sidebarOpen) {
      closeSidebar();
    }
  });
});

// ---------- CHARTS ----------

let barChartInstance, areaChartInstance, lineChartInstance;

function initializeCharts(theme) {
  console.log("initializeCharts function called.");

  // Debug ApexCharts availability
  if (typeof ApexCharts === 'undefined') {
    console.error("ApexCharts library is not loaded. Please ensure 'apexcharts.min.js' is loaded BEFORE 'scripts.js'.");
    return; // Exit if ApexCharts is not available
  }
  console.log("ApexCharts is available.");

  // BAR CHART
  const barChartElement = document.querySelector('#bar-chart');
  if (!barChartElement) {
    console.error("Error: '#bar-chart' element not found in the DOM.");
  } else {
    console.log("Found '#bar-chart' element. Initializing Bar Chart.");
    const barChartOptions = {
      series: [
        {
          data: [45, 38, 32, 28, 22],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        background: 'transparent'
      },
      colors: ['#246dec'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '55%',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
      },
      yaxis: {
        title: {
          text: 'Sales Count',
        },
      },
      theme: { mode: theme }, // ApexCharts theme property expects an object with 'mode'
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 300,
          },
        },
      }],
    };

    try {
      barChartInstance = new ApexCharts(
        barChartElement,
        barChartOptions
      );
      barChartInstance.render().then(() => console.log("Bar Chart rendered successfully.")).catch(err => console.error("Error rendering Bar Chart:", err));
    } catch (error) {
      console.error("Error creating Bar Chart instance:", error);
    }
  }

  // AREA CHART
  const areaChartElement = document.querySelector('#area-chart');
  if (!areaChartElement) {
    console.error("Error: '#area-chart' element not found in the DOM.");
  } else {
    console.log("Found '#area-chart' element. Initializing Area Chart.");
    const areaChartOptions = {
      series: [
        {
          name: 'Purchase Orders',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Sales Orders',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        background: 'transparent'
      },
      colors: ['#4f35a1', '#246dec'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      yaxis: [
        {
          title: {
            text: 'Purchase Orders',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Sales Orders',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      theme: { mode: theme }, // ApexCharts theme property expects an object with 'mode'
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 300,
          },
        },
      }],
    };

    try {
      areaChartInstance = new ApexCharts(
        areaChartElement,
        areaChartOptions
      );
      areaChartInstance.render().then(() => console.log("Area Chart rendered successfully.")).catch(err => console.error("Error rendering Area Chart:", err));
    } catch (error) {
      console.error("Error creating Area Chart instance:", error);
    }
  }

  // LINE CHART – Inventory Trend
  const lineChartElement = document.querySelector("#line-chart");
  if (!lineChartElement) {
    console.error("Error: '#line-chart' element not found in the DOM.");
  } else {
    console.log("Found '#line-chart' element. Initializing Line Chart.");
    const lineChartOptions = {
      series: [{
        name: "Inventory Level",
        data: [120, 135, 150, 160, 140, 155, 170]
      }],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        background: 'transparent'
      },
      colors: ['#367952'],
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      yaxis: {
        title: {
          text: 'Stock Units'
        }
      },
      grid: {
        show: true,
        borderColor: '#e0e0e0'
      },
      theme: { mode: theme }, // ApexCharts theme property expects an object with 'mode'
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 300,
          },
        },
      }],
    };

    try {
      lineChartInstance = new ApexCharts(
        lineChartElement,
        lineChartOptions
      );
      lineChartInstance.render().then(() => console.log("Line Chart rendered successfully.")).catch(err => console.error("Error rendering Line Chart:", err));
    } catch (error) {
      console.error("Error creating Line Chart instance:", error);
    }
  }
}

function updateChartsTheme() {
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  console.log("Updating charts theme to:", theme);

  // ApexCharts expects the theme property to be an object with a 'mode' key, e.g., { mode: 'dark' }
  const themeOptions = { mode: theme };

  if (barChartInstance) {
    barChartInstance.updateOptions({ theme: themeOptions }, false, true); // Added redrawPaths and animate for smoother transition
  } else {
    console.warn("Bar Chart instance not found for theme update.");
  }
  
  if (areaChartInstance) {
    areaChartInstance.updateOptions({ theme: themeOptions }, false, true);
  } else {
    console.warn("Area Chart instance not found for theme update.");
  }

  if (lineChartInstance) {
    lineChartInstance.updateOptions({ theme: themeOptions }, false, true);
  } else {
    console.warn("Line Chart instance not found for theme update.");
  }
}

// Dynamic Dashboard Data
const dashboardData = {
  products: 249,
  purchaseOrders: 83,
  salesOrders: 79,
  alerts: 56
};

function loadDashboardData() {
  const productSpan = document.querySelectorAll('.card span.font-weight-bold')[0];
  if (productSpan) productSpan.innerText = dashboardData.products;

  const purchaseSpan = document.querySelectorAll('.card span.font-weight-bold')[1];
  if (purchaseSpan) purchaseSpan.innerText = dashboardData.purchaseOrders;

  const salesSpan = document.querySelectorAll('.card span.font-weight-bold')[2];
  if (salesSpan) salesSpan.innerText = dashboardData.salesOrders;

  const alertsSpan = document.querySelectorAll('.card span.font-weight-bold')[3];
  if (alertsSpan) alertsSpan.innerText = dashboardData.alerts;

  console.log("Dashboard data loaded.");
}

// Ensure dashboard data loads after DOM is ready, but avoid duplicate listener if already handled by charts.
// Consolidate DOMContentLoaded listeners to avoid redundancy and potential issues.
// The primary DOMContentLoaded listener is already handling initializeCharts and window.resize.
// We'll move loadDashboardData into the existing DOMContentLoaded listener.

// window.addEventListener('DOMContentLoaded', loadDashboardData); // Removed this duplicate listener

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('keyup', function(e) {
    let value = e.target.value.toLowerCase();

    document.querySelectorAll('.sidebar-list-item').forEach(item => {
      let text = item.innerText.toLowerCase();

      if (text.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}
