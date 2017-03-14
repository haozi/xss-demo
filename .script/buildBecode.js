'use strict'
const PATH = require('path')
const FS = require('fs')

class C {
  constructor () {
    this.root = PATH.resolve(__dirname, '../')
    this.src = `${this.root}/src/data/exam`
    this.dist = `${this.root}/src/data/exam/index.js`
    this.data = {}
  }

  run () {
    let d = this.ls(this.src).map(item => {
      const names = PATH.basename(item, '.js').split('.')
      return {
        n: names[0],
        title: names[1] || '',
        path: item
      }
    })
    .filter(item => item.n !== 'index')
    .sort((a, b) => a.n > b.n)
    console.log(d)
    d.forEach(item => {
      const beCode = this.read(item.path).trim()
      beCode && (this.data[item.n] = {
        beCode,
        title: item.title
      })
    })

    this.write(this.dist, `export default ${JSON.stringify(this.data, null, 2)}`)
  }

  ls (path) {
    path = PATH.resolve(path)
    const d = FS.readdirSync(path)
    return d.map(p => {
      return PATH.resolve(path, p)
    })
  }

  read (path) {
    return FS.readFileSync(path, 'utf8')
  }

  write (path, string) {
    FS.writeFileSync(path, string.trim() + '\n', 'utf8')
  }

}

new C().run()
