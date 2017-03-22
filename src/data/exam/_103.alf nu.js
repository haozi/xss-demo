// from alf.nu
function escape (s) {
  let url = 'javascript:console.log(' + JSON.stringify(s) + ')'
  console.log(url)

  let a = document.createElement('a')
  a.href = url
  document.body.appendChild(a)
  a.click()
}
