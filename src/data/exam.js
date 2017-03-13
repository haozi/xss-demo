export default {
  10: {
    beCode: `
function render (input) {
  return '<input type="name" value="' + input + '">'
}`
  },

  1: {
    beCode: `
function render (input) {
  function escape(s) {
    return s.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
  }

  return '<input type="name" value="' + escape(input) + '">'
}`
  },

  0: {
    beCode: `
function render (input) {
  function escape(s) {
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&#x27;")
            .replace(/\\//g, '&#x2F;')

  }

  return '<input type="name" value="' + escape(input) + '">'
}`
  }
}
