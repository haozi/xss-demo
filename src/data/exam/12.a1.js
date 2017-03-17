function render (input) {
  input = input.replace(/script/g, '')
  input = input.toUpperCase()
  return '<h1>' + input + '</h1>'
}
