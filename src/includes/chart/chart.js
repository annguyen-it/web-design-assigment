// Chart in main/index.js
let ctx = document.getElementById('chart')
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9'],
    datasets: [{
      label: ['Bán vé'],
      data: [12, 19, 3, 5, 2, 3, 2, 5, 16],
      backgroundColor: 'rgba(255, 99, 132, 1)'
    }, {
      label: ['Đồ ăn/uống'],
      data: [2, 9, 3, 5, 2, 13, 12, 5, 1],
      backgroundColor: 'rgba(99, 99, 132, 1)'
    }]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      fontSize: '15px'
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})
