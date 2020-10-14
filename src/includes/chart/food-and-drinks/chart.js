let darkTheme = sessionStorage.getItem('theme') == 'dark'
let textAxesColor = '#666666'
let axesColor = '#bbbbbb'

if (darkTheme) {
  textAxesColor = '#fdf7dc'
}

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
      xAxes: [{
        gridLines: {
          display: false,
        },
        responsive: true,
        ticks: {
          fontColor: textAxesColor
        },
      }],
      yAxes: [{
        position: 'left',
        responsive: true,
        stacked: true,
        gridLines: {
          display: true,
          color: axesColor
        },
        ticks: {
          beginAtZero: true,
          fontColor: textAxesColor
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
