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