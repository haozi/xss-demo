export default {
  "0": {
    "beCode": "function render (input) {\n  return '<input type=\"name\" value=\"' + input + '\">'\n}",
    "title": "simple"
  },
  "1": {
    "beCode": "function render (input) {\n  const stripTagsRe = /<\\/?[^>]+>/gi\n\n  input = input.replace(stripTagsRe, '')\n  return `<article>${input}</article>`\n}",
    "title": "strip tag"
  },
  "2": {
    "beCode": "function render (input) {\n  const stripBracketsRe = /[()]/g\n  input = input.replace(stripBracketsRe, '')\n  return input\n}",
    "title": "strip brackets"
  },
  "3": {
    "beCode": "function render (input) {\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com/\n  if (domainRe.test(input)) {\n    return `<script src=\"${input}\"></script>`\n  }\n  return 'Invalid URL'\n}",
    "title": "url 1"
  },
  "4": {
    "beCode": "function render (input) {\n  function escape(s) {\n    return s.replace(/\"/g, '\\\\\"')\n  }\n\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com/\n  if (domainRe.test(input)) {\n    return `<script src=\"${escape(input)}\"></script>`\n  }\n  return 'Invalid URL'\n}",
    "title": "url 2"
  }
}
