// Draw map
let table = document.getElementById('table')
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
let seats = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: []
}
let cash = 0
const normalPrice = 90
const vipPrice = 120
const sweetboxPrice = 280

for (let i = 0; i < 9; i++) {
  let row = table.insertRow(table.rows.length)
  for (let j = 0; j < 16; j++) {
    row.insertCell(j).innerHTML = '<div>' + arr[i].toUpperCase() + (j + 1) + '</div>'
  }

  if (i <= 2) {
    row.classList.add('normal')
  }
  else if (i <= 7) {
    row.classList.add('vip')
  }
  else {
    row.classList.add('sweetbox')
  }
}

table.rows[0].cells[0].innerHTML = ''
for (let i = 0; i < 3; i++) {
  table.rows[3].cells[i].innerHTML = ''
  table.rows[3].cells[15 - i].innerHTML = ''
}
table.rows[3].cells[3].innerHTML = ''
for (let i = 4; i < 9; i++) {
  table.rows[i].cells[0].innerHTML = ''
  table.rows[i].cells[1].innerHTML = ''
  table.rows[i].cells[15].innerHTML = ''
}
table.rows[8].cells[2].innerHTML = ''
table.rows[4].cells[14].innerHTML = ''
table.rows[5].cells[14].innerHTML = ''


// Random taken
let taken = 0
for (let i = 1; i <= 10; i++) {
  let row, col, currRow, currPos

  do {
    row = Math.floor(Math.random() * 9)
    col = Math.floor(Math.random() * 16)
    currRow = table.rows[row]
    currPos = currRow.cells[col]
  } while (currPos.classList.contains('taken') || currPos.classList.contains('hide'))

  currPos.classList.add('taken')
  taken++
  if (currRow.classList.contains('sweetbox')) {
    currRow.cells[col + (col % 2 == 0 ? -1 : 1)].classList.add('taken')
    taken++
  }
}

// Add event listener
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 16; j++) {
    const cell = table.rows[i].cells[j]
    if (cell.innerHTML == '') {
      cell.classList.add('hide')
    }
    else {
      // Add click event for normal and vip
      if (i <= 7) {
        cell.addEventListener('click', () => {
          if (cell.classList.contains('choose')) {
            cell.classList.remove('choose')
            remove(i, j)
          }
          else {
            cell.classList.add('choose')
            add(i, j)
          }
        })
      }

      // Add click event for sweetbox
      else {
        if (j % 2 == 1) {
          cell.addEventListener('click', () => {
            if (cell.classList.contains('choose')) {
              cell.classList.remove('choose')
              table.rows[i].cells[j + 1].classList.remove('choose')
              remove(i, j)
            }
            else {
              cell.classList.add('choose')
              table.rows[i].cells[j + 1].classList.add('choose')
              add(i, j)
            }
          })
        }
        else {
          cell.addEventListener('click', () => {
            if (cell.classList.contains('choose')) {
              cell.classList.remove('choose')
              table.rows[i].cells[j - 1].classList.remove('choose')
              remove(i, j)
            }
            else {
              cell.classList.add('choose')
              table.rows[i].cells[j - 1].classList.add('choose')
              add(i, j)
            }
          })
        }
      }
    }
  }
}

// Random room
document.getElementById('room').innerHTML = 'Phòng chiếu số ' + Math.round(Math.random() * 10)

// Count taken
document.getElementById('seat-taken').innerHTML = 'Số ghế: ' + (118 - taken) + '/118'

// Add seat to array
function add(row, col) {
  if (!table.rows[row].cells[col].classList.contains('taken')) {
    if (row <= 7) {
      cash += (row <= 2 ? normalPrice : vipPrice)

      seats[String.fromCharCode('a'.charCodeAt(0) + row)].push(col)
      seats[String.fromCharCode('a'.charCodeAt(0) + row)].sort((a, b) => a - b)
    }
    else {
      cash += sweetboxPrice

      if (col % 2 == 1) {
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].push(col)
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].push(col + 1)
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].sort((a, b) => a - b)
      }
      else {
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].push(col)
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].push(col - 1)
        seats[String.fromCharCode('a'.charCodeAt(0) + row)].sort((a, b) => a - b)
      }
    }

    update()
  }
}

// Remove seat from array
function remove(row, col) {
  for (let i = 0; i <= 16; i++) {
    if (seats[String.fromCharCode('a'.charCodeAt(0) + row)][i] == col) {
      if (row <= 7) {
        cash -= (row <= 2 ? normalPrice : vipPrice)

        seats[String.fromCharCode('a'.charCodeAt(0) + row)].splice(i, 1)
        break
      }
      else {
        cash -= sweetboxPrice

        if (col % 2 == 1) {
          seats[String.fromCharCode('a'.charCodeAt(0) + row)].splice(i, 2)
          break
        }
        else {
          seats[String.fromCharCode('a'.charCodeAt(0) + row)].splice(i - 1, 2)
          break
        }
      }
    }
  }

  update()
}

// Update information
function update() {
  // Update paid
  let total = numeral(cash * 1000)
  document.querySelector('.cash__total > span').innerHTML = total.format('0,0.00') + '<sup>đ</sup>'

  // Update seat list
  let seatData = []

  for (let i = 0; i <= 8; i++) {
    let row = String.fromCharCode('a'.charCodeAt(0) + i)
    if (seats[row].length) {
      seats[row].forEach((col) => {
        seatData.push((row.toUpperCase() + (col + 1)))
      })
    }
  }

  document.querySelector('.cash__seat > span').innerHTML = seatData.join(', ')
}

function confirm() {
  let seatChecked = []

  for (let i = 0; i <= 8; i++) {
    let row = String.fromCharCode('a'.charCodeAt(0) + i)
    if (seats[row].length) {
      seats[row].forEach(col => {
        seatChecked.push((row.toUpperCase() + col))
        table.rows[i].cells[col].classList.add('taken')
        taken++
      })

      seats[row] = []
    }
  }

  if (seatChecked.length) {
    update()
    document.getElementById('seat-taken').innerHTML = 'Số ghế: ' + (118 - taken) + '/118'

    setTimeout(() => {
      window.location.replace('/main/food-and-drinks/?' + `t=${ cash }`)
    }, 2000)
  }
}

function cancel() {
  for (let i = 0; i <= 8; i++) {
    let row = String.fromCharCode('a'.charCodeAt(0) + i)
    if (seats[row].length) {
      seats[row].forEach(col => {
        table.rows[i].cells[col].classList.remove('choose')
      })

      seats[row] = []
    }
  }

  cash = 0
  update()
}