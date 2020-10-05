// Get data
let contents = []
let data = ''

for (let i = 1; i <= 7; i++) {
  contents.push(`./content${ i }.html`)
}

function getData() {
  let element = document.getElementsByClassName('content')[0]

  for (let i = 0; i < contents.length; i++) {
    const file = contents[i]
    const parent = document.createElement('div')

    if (file) {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            parent.innerHTML = this.responseText;
          }

          element.removeAttribute('w3-school')
        }
      }

      xhttp.open('GET', file)
      xhttp.send()

      element.append(parent)
    }
  }
}

getData()

// Default content
let tabs = document.querySelectorAll('.list > * > label')
let pages = document.querySelectorAll('.content > *')
let currentPage = 0
pages[0].classList.add('display')

// Show data
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    if (currentPage != index) {
      pages[currentPage].classList.remove('display')
      pages[index].classList.add('display')
      currentPage = index
    }
  })
})

// Sticky nav
// Stickyfill.add(document.querySelector('.list'))

var observer = new IntersectionObserver(function (e) {
  if (e[0].intersectionRatio === 0) {
    document.querySelector('.list').classList.add('scroll')
  }
  else if (e[0].intersectionRatio === 1) {
    document.querySelector('.list').classList.remove('scroll')
  }
}, {
  threshold: [0, 1]
})

observer.observe(document.querySelector('#list-top'))