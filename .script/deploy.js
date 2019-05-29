const ghpages = require('gh-pages')

ghpages.publish('dist', (err) => {
  if (err) throw err
  console.log('success')
})
