export default {
  "index": [
    "0x00",
    "0x01",
    "0x02",
    "0x03",
    "0x04",
    "0x05",
    "0x06",
    "0x07",
    "0x08",
    "0x09",
    "0x0A",
    "0x0B",
    "0x0C",
    "0x0D",
    "0x0E",
    "0x0F",
    "0x10",
    "0x11"
  ],
  "data": {
    "0x00": {
      "beCode": "function render (input) {\n  return '<div>' + input + '</div>'\n}",
      "title": "simple"
    },
    "0x01": {
      "beCode": "function render (input) {\n  return '<textarea>' + input + '</textarea>'\n}",
      "title": "textarea"
    },
    "0x02": {
      "beCode": "function render (input) {\n  return '<input type=\"name\" value=\"' + input + '\">'\n}",
      "title": "input"
    },
    "0x03": {
      "beCode": "function render (input) {\n  const stripBracketsRe = /[()]/g\n  input = input.replace(stripBracketsRe, '')\n  return input\n}",
      "title": "strip brackets"
    },
    "0x04": {
      "beCode": "function render (input) {\n  const stripBracketsRe = /[()`]/g\n  input = input.replace(stripBracketsRe, '')\n  return input\n}",
      "title": "strip brackets 2"
    },
    "0x05": {
      "beCode": "function render (input) {\n  input = input.replace(/-->/g, '😂')\n  return '<!--' + input + '-->'\n}",
      "title": "comment"
    },
    "0x06": {
      "beCode": "function render (input) {\n  input = input.replace(/auto|on.*=|>/ig, '_')\n  return `<input value=1 ${input} type=\"text\">`\n}",
      "title": "remove right tag"
    },
    "0x07": {
      "beCode": "function render (input) {\n  const stripTagsRe = /<\\/?[^>]+>/gi\n\n  input = input.replace(stripTagsRe, '')\n  return `<article>${input}</article>`\n}",
      "title": "strip tag"
    },
    "0x08": {
      "beCode": "function render (src) {\n  src = src.replace(/<\\/style>/ig, '/* \\u574F\\u4EBA */')\n  return `\n    <style>\n      ${src}\n    </style>\n  `\n}",
      "title": "style"
    },
    "0x09": {
      "beCode": "function render (input) {\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com/\n  if (domainRe.test(input)) {\n    return `<script src=\"${input}\"></script>`\n  }\n  return 'Invalid URL'\n}",
      "title": "url 1"
    },
    "0x0A": {
      "beCode": "function render (input) {\n  function escapeHtml(s) {\n    return s.replace(/&/g, '&amp;')\n            .replace(/'/g, '&#39;')\n            .replace(/\"/g, '&quot;')\n            .replace(/</g, '&lt;')\n            .replace(/>/g, '&gt;')\n            .replace(/\\//g, '&#x2f')\n  }\n\n  let domainRe = /^https?:\\/\\/www\\.segmentfault\\.com/\n  if (domainRe.test(input)) {\n    return `<script src=\"${escapeHtml(input)}\"></script>`\n  }\n  return 'Invalid URL'\n}",
      "title": "url 2"
    },
    "0x0B": {
      "beCode": "function render (input) {\n  input = input.toUpperCase()\n  return `<h1>${input}</h1>`\n}",
      "title": "uppercase"
    },
    "0x0C": {
      "beCode": "function render (input) {\n  input = input.replace(/script/ig, '')\n  input = input.toUpperCase()\n  return '<h1>' + input + '</h1>'\n}",
      "title": "a1"
    },
    "0x0D": {
      "beCode": "function render (input) {\n  input = input.replace(/[</\"']/g, '')\n  return `\n    <script>\n          // alert('${input}')\n    </script>\n  `\n}",
      "title": "line-break"
    },
    "0x0E": {
      "beCode": "function render (input) {\n  input = input.replace(/<([a-zA-Z])/g, '<_$1')\n  input = input.toUpperCase()\n  return '<h1>' + input + '</h1>'\n}",
      "title": "a2"
    },
    "0x0F": {
      "beCode": "function render (input) {\n  function escapeHtml(s) {\n    return s.replace(/&/g, '&amp;')\n            .replace(/'/g, '&#39;')\n            .replace(/\"/g, '&quot;')\n            .replace(/</g, '&lt;')\n            .replace(/>/g, '&gt;')\n            .replace(/\\//g, '&#x2f;')\n  }\n  return `<img src onerror=\"console.error('${escapeHtml(input)}')\">`\n}",
      "title": "html"
    },
    "0x10": {
      "beCode": "function render (input) {\n  return `\n<script>\n  window.data = ${input}\n</script>\n  `\n}",
      "title": "window var"
    },
    "0x11": {
      "beCode": "// 本题无解\nfunction render (input) {\n  function escapeJs (s) {\n    return String(s)\n            .replace(/\\\\/g, '\\\\\\\\')\n            .replace(/'/g, '\\\\\\'')\n            .replace(/\"/g, '\\\\\"')\n            .replace(/`/g, '\\\\`')\n            .replace(/\\//g, '\\\\/')\n            .replace(/\\n/g, '\\\\n')\n            .replace(/\\r/g, '\\\\r')\n            .replace(/\\t/g, '\\\\t')\n            .replace(/\\f/g, '\\\\f')\n            .replace(/\\v/g, '\\\\v')\n            .replace(/\\b/g, '\\\\b')\n            .replace(/\\0/g, '\\\\0')\n  }\n  return `\n<script>\n  window.data = '${escapeJs(input)}'\n</script>\n  `\n}",
      "title": "window var"
    }
  }
}
