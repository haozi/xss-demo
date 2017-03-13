export default {
  "0": {
    "beCode": "function render (input) {\n  return '<input type=\"name\" value=\"' + input + '\">'\n}"
  },
  "1": {
    "beCode": "function render (input) {\n  const stripTagsRE = /<\\/?[^>]+>/gi\n\n  input = input.replace(stripTagsRE, '')\n  return `<article>${input}</article>`\n}"
  }
}
