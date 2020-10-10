let darkTheme = sessionStorage.getItem('theme') == 'dark'
let darkThemeBtn = document.querySelector('#dark-theme')

if (darkTheme) {
  darkThemeBtn.setAttribute('checked', true)
}

function setDarkTheme() {
  if (darkThemeBtn.checked) {
    sessionStorage.setItem('theme', 'dark')
  }
  else {
    sessionStorage.removeItem('theme')
  }

  setTimeout(() => {
    window.location.reload()
  }, 200)
}