export default {
  "0": {
    "beCode": "function render (input) {\n  return '<input type=\"name\" value=\"' + input + '\">'\n}"
  },
  "1": {
    "beCode": "function render (input) {\n  const stripTagsRe = /<\\/?[^>]+>/gi\n\n  input = input.replace(stripTagsRe, '')\n  return `<article>${input}</article>`\n}"
  },
  "2": {
    "beCode": "function render (input) {\n  const bracketsRe = /[()]/g\n  input = input.replace(bracketsRe, '')\n  return input\n}"
  }
}
