
const ctx1 = document.getElementById('websiteViewsChart').getContext('2d');
const websiteViewsChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            label: 'Số lượng kế hoạch',
            data: [40, 20, 50, 30, 60, 70, 40],
            backgroundColor: '#6C757D',
            borderColor: '#6C757D',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('dailySalesChart').getContext('2d');
const dailySalesChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Điểm',
            data: [7.7, 7.3, 8.9, 9.1, 8.0, 8.1, 7.8, 8.2],
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: '#007BFF',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx3 = document.getElementById('completedTasksChart').getContext('2d');
const completedTasksChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Điểm',
            data: [3.12, 3.01, 3.35, 3.42, 3.30, 3.34, 3.25, 3.32],
            backgroundColor: 'rgba(10, 11, 125, 0.2)',
            borderColor: '#6C757D',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
