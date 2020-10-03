let ticketPaid = parseInt((new URL(window.location.href)).searchParams.get('t'))

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

// Decrease function for buttons
let itemsLeft = document.querySelectorAll('.items-left')
let picked = document.querySelectorAll('.items-buy')
let decreaseBtn = document.querySelectorAll('.btn.decrease')
let increaseBtn = document.querySelectorAll('.btn.increase')

decreaseBtn.forEach((item, index) => {
  item.addEventListener('click', function checkDecrease() {
    if (picked[index].innerHTML != '0') {
      picked[index].innerHTML -= 1
      itemsLeft[index].innerHTML = parseInt(itemsLeft[index].innerHTML) + 1

      increaseBtn[index].classList.remove('disable')
      if (picked[index].innerHTML == '0') {
        decreaseBtn[index].classList.add('disable')
      }

      foodPaid -= itemPrices[index]
      update()
    }
  })
})

increaseBtn.forEach((item, index) => {
  item.addEventListener('click', function checkIncrease() {
    if (itemsLeft[index].innerHTML != '0') {
      picked[index].innerHTML = parseInt(picked[index].innerHTML) + 1
      itemsLeft[index].innerHTML -= 1

      decreaseBtn[index].classList.remove('disable')
      if (itemsLeft[index].innerHTML == '0') {
        increaseBtn[index].classList.add('disable')
      }

      foodPaid += itemPrices[index]
      update()
    }
  })

  if (itemsLeft[index].innerHTML == '0') {
    increaseBtn[index].classList.add('disable')
  }
})

// Calculate total paid for food and drinks
function update() {
  document.querySelector('#food-paid > span').innerHTML = format(foodPaid)
  document.querySelector('#total-paid > span').innerHTML = format(ticketPaid + foodPaid)
}
