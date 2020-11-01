// ID codes
const hashMap = '0123456789'
let codes = document.querySelectorAll('.id')
codes.forEach(item => {
    let str = ''
    for (let i = 0; i < 6; i++) {
    let c = (hashMap[Math.round(Math.random() * (hashMap.length - 1))])
    if (Math.round(Math.random() * 2) == 1) {
        c = c.toUpperCase()
    }
    str += c
    }
    item.innerHTML = str
})
