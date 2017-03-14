function render (input) {
  function escape(s) {
    return s.replace(/"/g, '\\"')
  }

  let domainRe = /^https?:\/\/www\.segmentfault\.com/
  if (domainRe.test(input)) {
    return `<script src="${escape(input)}"></script>`
  }
  return 'Invalid URL'
}
