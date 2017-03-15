export default {
  "index": [
    -100,
    -99,
    -97,
    0,
    1,
    2,
    3,
    4,
    5
  ],
  "data": {
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
      "beCode": "function render (input) {\n  function escapeHtml(s) {\n    return s.replace(/&/g, '&amp;')\n            .replace(/'/g, '&#39;')\n            .replace(/\"/g, '&quot;')\n            .replace(/</g, '&lt;')\n            .replace(/>/g, '&gt;')\n  }\n\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com/\n  if (domainRe.test(input)) {\n    return `<script src=\"${escapeHtml(input)}\"></script>`\n  }\n  return 'Invalid URL'\n}",
      "title": "url 2"
    },
    "5": {
      "beCode": "function render (input) {\n  function escapeHtml(s) {\n    return s.replace(/&/g, '&amp;')\n            .replace(/'/g, '&#39;')\n            .replace(/\"/g, '&quot;')\n            .replace(/</g, '&lt;')\n            .replace(/>/g, '&gt;')\n  }\n\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com\\//\n  if (domainRe.test(input)) {\n    return `<script src=\"${escapeHtml(input)}\"></script>`\n  }\n  return 'Invalid URL'\n}",
      "title": "url 3"
    },
    "-100": {
      "beCode": "function render (input) {\n  return '<div>' + input + '</div>'\n}",
      "title": ""
    },
    "-99": {
      "beCode": "function render (input) {\n  return '<textarea>' + input + '</textarea>'\n}",
      "title": ""
    },
    "-97": {
      "beCode": "function render (input) {\n  input = input.replace(/-->/g, '😂')\n  return '<!--' + input + '-->'\n}",
      "title": "comment"
    }
  }
}
