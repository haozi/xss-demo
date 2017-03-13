function render (input) {
  const stripTagsRE = /<\/?[^>]+>/gi

  input = input.replace(stripTagsRE, '')
  return `<article>${input}</article>`
}
