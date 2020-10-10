document.querySelectorAll('.detail').forEach(item => {
  item.setAttribute('data-clipboard-text', item.innerHTML)
})

let rect, notification
let body = document.querySelector('body')

let clipboard = new ClipboardJS('.detail', {
  text: trigger => trigger.innerHTML
})

clipboard.on('success', e => {
  rect = e.trigger.getBoundingClientRect()

  if (document.querySelector('#notification')) {
    document.querySelector('#notification').parentNode.removeChild(notification)
  }

  notification = make()

  e.trigger.parentNode.appendChild(notification)
  setTimeout(() => {
    notification.classList.remove('hide')
  }, 5)

  body.addEventListener('click', hideNotification)
})

function make() {
  let e = document.createElement('div')
  e.id = 'notification'
  e.classList.add('hide')
  e.innerHTML = 'Đã sao chép <i class="far fa-copy"></i>'

  return e
}

function hideNotification(event) {
  if (event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom) {

    notification.classList.add('hide')
    setTimeout(() => {
      notification.parentNode.removeChild(notification)
    }, 250)
    body.removeEventListener('click', hideNotification)
  }
}