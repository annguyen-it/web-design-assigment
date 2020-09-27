let radios = document.form.tab
let currTab = 0
let dataArr = []

for (let i = 1; i <= 7; i++) {
  fetch(`./content${ i }.html`)
    .then(res => res.text())
    .then(data => dataArr.push(data))
}

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