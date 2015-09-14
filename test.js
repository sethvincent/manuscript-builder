var build = require('./index')

build({
  target: '/test-readme.md',
  include: ['preface.md'],
  bookDir: '/test-manuscript/',
  tableOfContents: '/test-manuscript/Book.txt'
}, function (err, markdown) {
  console.log(err, markdown)
})
