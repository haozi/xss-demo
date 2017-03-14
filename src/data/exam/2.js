function render (input) {
  const bracketsRe = /[()]/g
  input = input.replace(bracketsRe, '')
  return input
}
