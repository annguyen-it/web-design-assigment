// Draw map
let table = document.getElementById('table')
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j']

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
          }
          else {
            cell.classList.add('choose')
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
            }
            else {
              cell.classList.add('choose')
              table.rows[i].cells[j + 1].classList.add('choose')
            }
          })
        }
        else {
          cell.addEventListener('click', () => {
            if (cell.classList.contains('choose')) {
              cell.classList.remove('choose')
              table.rows[i].cells[j - 1].classList.remove('choose')
            }
            else {
              cell.classList.add('choose')
              table.rows[i].cells[j - 1].classList.add('choose')
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