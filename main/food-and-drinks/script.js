let ticketPaid = parseInt((new URL(window.location.href)).searchParams.get('t')) || 0

let foodPaid = 0
let itemPrices = [179, 199, 199, 169, 229, 179, 79, 99]
let amount = []

// Random amount combos
for (let i = 0; i < 8; i++) {
  amount.push(Math.round(Math.random() * 50))
}

// Print amount of items
document.querySelectorAll('.items-left').forEach((item, index) => {
  item.innerHTML = amount[index]
})

// Print items' price
document.querySelectorAll('.price > span').forEach((item, index) => {
  item.innerHTML = format(itemPrices[index])
})

// Print ticket paid
document.querySelector('#ticket-paid span').innerHTML = format(ticketPaid)

// Format money
function format(number) {
  return numeral(number * 1000).format('0,0.00')
}

let itemsLeft = document.querySelectorAll('.items-left')
let picked = document.querySelectorAll('.items-buy')
let decreaseBtn = document.querySelectorAll('.btn.decrease')
let increaseBtn = document.querySelectorAll('.btn.increase')

if (sessionStorage.getItem('role') == 'client') {
  let confirmBtn = document.querySelector('.confirm')
  let cancelBtn = document.querySelector('.cancel')

  checkConfirmBtn()

  // Decrement function for buttons
  decreaseBtn.forEach((item, index) => {
    item.addEventListener('click', decrease.bind(this, index))
  })

  // Increment function for buttons
  increaseBtn.forEach((item, index) => {
    item.addEventListener('click', increase.bind(this, index))
  })

  // Disable confirm button when nothing has been paid
  confirmBtn.addEventListener('click', function () {
    if (!this.classList.contains('disable')) {
      confirmPaid()
    }
  })

  // Cancel button
  cancelBtn.addEventListener('click', () => {
    resetItemsLeft()
    resetAllDecreaseBtn()
  })

  function decrease(index) {
    if (canDecrease(index)) {
      picked[index].innerHTML -= 1
      itemsLeft[index].innerHTML = parseInt(itemsLeft[index].innerHTML) + 1

      increaseBtn[index].classList.remove('disable')
      if (picked[index].innerHTML == '0') {
        decreaseBtn[index].classList.add('disable')
      }

      foodPaid -= itemPrices[index]
      update()
      checkConfirmBtn()
    }
  }

  function increase(index) {
    if (canIncrease(index)) {
      picked[index].innerHTML = parseInt(picked[index].innerHTML) + 1
      itemsLeft[index].innerHTML -= 1

      decreaseBtn[index].classList.remove('disable')
      if (itemsLeft[index].innerHTML == '0') {
        increaseBtn[index].classList.add('disable')
      }

      foodPaid += itemPrices[index]
      update()
      checkConfirmBtn()
    }
    else {
      increaseBtn[index].classList.add('disable')
    }
  }

  // Alert total paid
  function confirmPaid() {
    if (confirm('Tổng số tiền phải trả là ' + format(ticketPaid + foodPaid) + 'đ')) {
      // Update amount of items
      ticketPaid = 0
      foodPaid = 0
      resetAllDecreaseBtn()
    }
  }

  function update() {
    document.querySelector('#food-paid > span').innerHTML = format(foodPaid)
    document.querySelector('#total-paid > span').innerHTML = format(ticketPaid + foodPaid)
  }

  function checkConfirmBtn() {
    if (ticketPaid + foodPaid == 0) {
      confirmBtn.classList.add('disable')
    }
    else {
      confirmBtn.classList.remove('disable')
    }
  }

  function canDecrease(index) {
    return picked[index].innerHTML != 0
  }

  function canIncrease(index) {
    return itemsLeft[index].innerHTML != 0
  }

  function resetAllDecreaseBtn() {
    decreaseBtn.forEach((item, index) => {
      item.classList.add('disable')
      picked[index].innerHTML = 0
    })
  }

  function resetItemsLeft() {
    itemsLeft.forEach((item, index) => {
      item.innerHTML = +item.innerHTML + +picked[index].innerHTML
    })
  }
}
else {
  for (const item of picked) {
    item.remove()
  }
  for (const btn of decreaseBtn) {
    btn.remove()
  }
  for (const btn of increaseBtn) {
    btn.remove()
  }
  document.querySelector('#bottom-content').remove()
}