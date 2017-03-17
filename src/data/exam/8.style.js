function render (src) {
  src = src.replace(/<\/style>/g, '/* \u574F\u4EBA */')
  return `
    <style>
      ${src}
    </style>
  `
}
