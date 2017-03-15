function render (input) {
  input = input.replace(/-->/g, '😂')
  return '<!--' + input + '-->'
}
