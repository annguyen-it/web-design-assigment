// Chart in main/food-and-drinks/index.js
let ctx = document.getElementById('chart')
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Caramel', 'Bắp', 'Phô mai', 'Mặn', 'Dâu', 'Pepsi', 'Milo', 'Sprite'],
    datasets: [{
      data: [12, 19, 3, 5, 2, 3, 2, 16],
      backgroundColor: ['#e5e500', '#e5e500', '#e5e500', '#e5e500', '#e5e500', '#ae3f3f', '#ae3f3f', '#ae3f3f']
    }]
  },
  options: {
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      yAxes: [{
        position: 'left',
        stacked: true,
        ticks: {
          beginAtZero: true
        },
      }]
    },
    tooltips: {
      callbacks: {
        label: (item, data) => {
          return data.datasets[item.datasetIndex].data[item.index] + (item.index <= 4 ? ' kg' : ' lit')
        }
      },
      hover: {
        onHover: function (e) {
          let point = this.getElementAtEvent(e)
          if (point.length) {
            e.target.style.cursor = 'pointer'
          }
        }
      }
    }
  }
})
