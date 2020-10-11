// Hide notification when press information
document.querySelector('#password').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    validate()
  }
})
document.querySelector('#username').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    validate()
  }
})

function validate() {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  if (username == 'client' && password == 'pass') {
    sessionStorage.setItem('role', 'client')
    window.location.replace('/main/')
  }
  else if (username == 'admin' && password == 'pass') {
    sessionStorage.setItem('role', 'admin')
    window.location.replace('/main/')
  }
  else {
    let notificationArea = document.querySelector('.notification')

    if (notificationArea.classList.contains('hide')) {
      notificationArea.classList.remove('hide')
    }
    else {
      notificationArea.classList.add('hide')
      setTimeout(() => {
        notificationArea.classList.remove('hide')
      }, 200)
    }
  }
}

// Display notification when login information is not accepted
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('focus', hideNotification)
  item.addEventListener('input', hideNotification)
})

function hideNotification() {
  document.querySelector('.notification').classList.add('hide')
}

// Display warning when Caps lock is on
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('keyup', checkCapsLock)
  item.addEventListener('mousedown', checkCapsLock)
})

function checkCapsLock(e) {
  let capsLockOn = e.getModifierState('CapsLock')

  if (capsLockOn) {
    this.nextElementSibling.classList.remove('hide')
  }
  else {
    this.nextElementSibling.classList.add('hide')
  }
}