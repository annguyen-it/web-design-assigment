// Redirect if haven't logged in yet
if (!sessionStorage.getItem('role')) {
  window.location.replace('/login/')
}

// Include sidebar
fetch('/src/includes/sidebar/sidebar.html')
  .then(res => res.text())
  .then(data => document.querySelector('.sidebar').innerHTML = data)
  .then(() => {
    // Sidebar effect

    document.querySelector('.sidebar__button').addEventListener('click', e => {
      expandSidebar()
    })

    document.querySelector('.container').addEventListener('click', e => {
      let sidebar = document.querySelector('.sidebar__button')
      if (sidebar.classList.contains('expand')) {
        expandSidebar()
      }
    })
  })

function expandSidebar() {
  let sidebarBtn = document.querySelector('.sidebar__button')
  let dot = document.querySelector('.sidebar__button .dot')
  let bar = document.querySelector('.sidebar__button .bar')
  let sidebar = document.querySelector('.sidebar')

  if (sidebarBtn.classList.contains('expand')) {
    sidebar.classList.remove('expand')
    sidebarBtn.classList.remove('expand')
    dot.classList.remove('hidden')
    bar.classList.add('hidden')
  }
  else {
    sidebar.classList.add('expand')
    sidebarBtn.classList.add('expand')
    dot.classList.add('hidden')
    bar.classList.remove('hidden')
  }
}

// Logout function
function logout() {
  sessionStorage.removeItem('role')
  window.location.reload('/login/')
}