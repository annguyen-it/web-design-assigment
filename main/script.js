let sidebarBtn = document.querySelector(".sidebar__button")
sidebarBtn.addEventListener("click", () => {
  let dot = document.querySelector(".sidebar__button .dot")
  let bar = document.querySelector(".sidebar__button .bar")
  let sidebar = document.querySelector(".sidebar")

  if (sidebarBtn.classList.contains("expand")) {
    sidebar.classList.remove("expand")
    sidebarBtn.classList.remove("expand")
    dot.classList.remove("hidden")
    bar.classList.add("hidden")
  }
  else {
    sidebar.classList.add("expand")
    sidebarBtn.classList.add("expand")
    dot.classList.add("hidden")
    bar.classList.remove("hidden")
  }
})



let ctx = document.getElementById('myChart')
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
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