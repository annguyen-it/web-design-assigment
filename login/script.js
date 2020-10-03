function validate() {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  if (username == 'mod' && password == 'pass') {
    sessionStorage.setItem('role', 'mod')
    window.location.replace('/main/')
  }
  else if (username == 'admin' && password == 'pass'){
    sessionStorage.setItem('role', 'admin')
    window.location.replace('/main/')
  }
}