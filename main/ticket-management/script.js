let radios = document.form.tab
let currTab = 0
let dataArr = []
let contents = []

for (let i = 1; i <= 7; i++) {
  contents.push(`./content${ i }.html`)
}

let requests = contents.map(content => fetch(content))
Promise.all(requests)
  .then(responses => responses.forEach(
    response => {
      response.text()
        .then(data => dataArr.push(data))
    }
  ))

for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('click', function () {
    if (this.checked) {
      if (i != currTab) {
        currTab = i
        document.querySelector('.content').innerHTML = dataArr[i]
      }
    }
  })
}