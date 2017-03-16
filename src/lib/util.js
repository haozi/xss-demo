/* global localStorage */
const LOCAL_V = 1
export const ls = {
  get (k) {
    let v = null
    try {
      v = JSON.parse(localStorage[k])
    } catch (e) {}
    return v
  },
  set (k, v) {
    try {
      localStorage[k] = JSON.stringify(v)
    } catch (e) {
      console.error(e)
    }
  },
  clear () {
    try {
      localStorage.clear()
    } catch (e) {}
  }
}

if (ls.get('xssV') !== LOCAL_V) {
  ls.clear()
}
ls.set('xssV', LOCAL_V)

export const clone = d => (JSON.parse(JSON.stringify(d)))

export const escapeJS = (jsStr) => {
  return String(jsStr).trim()
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\//g, '\\/')
}

export const compile = (tpl, data = {}) => {
  return tpl.replace(/{{{(.*?)}}}/g, ($0, $1) => data[$1] || '')
}
