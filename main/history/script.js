RandomAlgorithm()

var Pagination = {
  code: '',

  // converting initialize data
  Extend: function (data) {
    data = data || {}
    Pagination.size = data.size || 300
    Pagination.page = data.page || 1
    Pagination.step = data.step || 3
  },

  // add pages by number (from [s] to [f])
  Add: function (s, f) {
    for (var i = s; i < f; i++) {
      Pagination.code += '<a>' + i + '</a>'
    }
  },

  // add last page with separator
  Last: function () {
    Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>'
  },

  // add first page with separator
  First: function () {
    Pagination.code += '<a>1</a><i>...</i>'
  },
  // --------------------
  // Handlers
  // --------------------

  // change page
  Click: function () {
    Pagination.page = +this.innerHTML
    Pagination.Start()
  },

  // previous page
  Prev: function () {
    Pagination.page--
    if (Pagination.page < 1) {
      Pagination.page = 1
    }
    Pagination.Start()
  },

  // next page
  Next: function () {
    Pagination.page++
    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size
    }
    Pagination.Start()
  },
  // --------------------
  // Script
  // --------------------

  // binding pages
  Bind: function () {
    var a = Pagination.e.getElementsByTagName('a')
    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'current'
      a[i].addEventListener('click', Pagination.Click, false)
    }
    RandomAlgorithm()
  },

  // write pagination
  Finish: function () {
    Pagination.e.innerHTML = Pagination.code
    Pagination.code = ''
    Pagination.Bind()
  },

  // find pagination type
  Start: function () {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1)
    }
    else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4)
      Pagination.Last()
    }
    else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First()
      Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1)
    }
    else {
      Pagination.First()
      Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1)
      Pagination.Last()
    }
    Pagination.Finish()
  },

  // --------------------
  // Initialization
  // --------------------

  // binding buttons
  Buttons: function (e) {
    var nav = e.getElementsByTagName('a')
    nav[0].addEventListener('click', Pagination.Prev, false)
    nav[1].addEventListener('click', Pagination.Next, false)
  },

  // create skeleton
  Create: function (e) {

    var html = [
      '<a>&#9668;</a>', // previous button
      '<span class="span-pagination" id="idspan-pagintaion"></span>',  // pagination container
      '<a>&#9658;</a>'  // next button
    ]

    e.innerHTML = html.join('')
    Pagination.e = e.getElementsByTagName('span')[0]
    Pagination.Buttons(e)
  },

  // init
  Init: function (e, data) {
    Pagination.Extend(data)
    Pagination.Create(e)
    Pagination.Start()
  }
}

var init = function () {
  Pagination.Init(document.querySelector('#pagination'), {
    size: 15, // pages size
    page: 1,  // selected page
    step: 3   // pages before and after current
  })
}

document.addEventListener('DOMContentLoaded', init, false)

// Random information
function RandomAlgorithm() {
  let table = document.querySelector('.table > table')
  if (document.querySelectorAll('.table > table tr').length == 1) {
    for (let i = 0; i < 30; i++) {
      let row = document.createElement('tr')
      for (let j = 0; j < 10; j++) {
        row.appendChild(document.createElement('td'))
      }
      table.appendChild(row)
    }
  }

  // Ticket codes
  const hashMap = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let codes = document.querySelectorAll('table tr:not(:first-child) td:nth-child(1)')
  codes.forEach(item => {
    let str = ''
    for (let i = 0; i < 8; i++) {
      let c = (hashMap[Math.round(Math.random() * (hashMap.length - 1))])
      if (Math.round(Math.random() * 2) == 1) {
        c = c.toUpperCase()
      }

      str += c
    }
    item.innerHTML = str
  })

  // Movies
  const moviesList = ['Thế giới xe hơi', 'Thế giới xe hơi 3', 'Nữ hoàng băng giá', 'Tenet', 'Lâu đài bay của Howl', 'Biệt đội báo thù', 'Biệt đội báo thù: Kỷ nguyên Ultron', 'Biệt đội báo thù: Cuộc chiến vô cực', 'Biệt đội báo thù: Hồi kết', 'Gia đình siêu nhân', 'Gia đình siêu nhân 3', 'Batman vs Superman: Ánh sáng công lý', 'Aquaman: Đế vương Atlantis', 'Wonder Woman: Nữ thần chiến binh', 'Liên minh Công lý', 'Wonder Woman 1984: Nữ thần chiến binh 2', 'Siêu Anh Hùng Shazam', 'Siêu Anh Hùng Shazam', 'Kỷ băng hà', 'Kỷ băng hà 2: Thời băng tan', 'Kỷ băng hà 3: Khủng long thức giấc', 'Kỷ băng hà 4: Lục địa trôi dạt', 'Kỷ băng hà 5: Trời sập']
  let movies = document.querySelectorAll('table tr:not(:first-child) td:nth-child(2)')
  movies.forEach(item => {
    item.innerHTML = moviesList[Math.round(Math.random() * (moviesList.length - 1))]
  })

  // Rooms
  let rooms = document.querySelectorAll('table tr:not(:first-child) td:nth-child(3)')
  rooms.forEach(item => {
    item.innerHTML = Math.round(Math.random() * 5 + 1)
  })

  // Categories
  let categoriesList = ['2D Thuyết minh', '2D Phụ đề', '3D Thuyết Minh', '3D Phụ đề']
  let categories = document.querySelectorAll('table tr:not(:first-child) td:nth-child(4)')
  categories.forEach(item => {
    item.innerHTML = categoriesList[Math.round(Math.random() * 3)]
  })

  // Time
  let times = document.querySelectorAll('table tr:not(:first-child) td:nth-child(5)')
  times.forEach(item => {
    let hour = format(Math.round(Math.random() * 23))
    let minute = format(Math.round(Math.random() * 59))
    let day = format(Math.round(Math.random() * 27+1))
    let month = format(Math.round(Math.random() * 12+1))
    let year = 2020
    if (hour < 12){
      item.innerHTML = hour + ':' + minute + ' AM' + '<br>' + day + '-' + month + '-' + year
    }
    else { 
      item.innerHTML = hour + ':' + minute + ' PM' + '<br>' + day + '-' + month + '-' + year
    }
  })

  // Buyer
  const buyerList = ['Nguyen Tran Tan An', 'Pham Tien Hai', 'Pham Viet Hoang Minh', 'Guest']
  let buyers = document.querySelectorAll('table tr:not(:first-child) td:nth-child(6)')
  buyers.forEach(item => {
    let b = Math.round(Math.random() * 3)
    if (b == 3) {
      item.innerHTML = buyerList[b]
    }
    else {
      item.innerHTML = `<a href="/main/client-information/${ buyerList[b] }">${ buyerList[b] }</a>`
    }
  })

  // Buy date
  let buyDates = document.querySelectorAll('table tr:not(:first-child) td:nth-child(7)')
  buyDates.forEach((item, index) => {
    item.innerHTML = times[index].innerHTML.substr(12, 13)
  })

  // Number of tickets
  let numbers = document.querySelectorAll('table tr:not(:first-child) td:nth-child(8)')
  numbers.forEach(item => {
    item.innerHTML = Math.round(Math.random() * 3 + 1)
  })

  // Ticket's price
  const priceArr = [90, 120, 140]
  let priceList = []
  let price = document.querySelectorAll('table tr:not(:first-child) td:nth-child(9)')
  price.forEach((item, index) => {
    let p = numeral(
      priceArr[Math.round(
        Math.random() * (
          numbers[index].innerHTML % 2 == 0 ? 2 : 1
        )
      )] * 1000)
    priceList.push(p)

    item.innerHTML = p.format('0,0.00') + '<sup>đ</sup>'
  })

  // Paid
  let paid = document.querySelectorAll('table tr:not(:first-child) td:nth-child(10)')
  paid.forEach((item, index) => {
    let p = numeral(parseInt(numbers[index].innerHTML) * priceList[index]._value)
    // console.log(priceList[index])
    item.innerHTML = p.format('0,0.00') + '<sup>đ</sup>'
  })

  // Scroll to top
  window.scrollTo(0, 0)
}

// Format time
function format(str) {
  if (+str <= 9) {
    return '0' + str
  }
  return str
}