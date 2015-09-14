# manuscript builder
> create a one-file manuscript from a bunch of chapters.

I mostly use it for concatenating chapters of a book into a readme for the book's github repo.

It's designed to work with [leanpub](http://leanpub.com) books, but could work for other stuff as well.

## usage example:

```
var build = require('manuscript-builder')

build({
  target: '/test-readme.md',
  include: ['preface.md'],
  bookDir: '/test-manuscript/',
  tableOfContents: '/test-manuscript/Book.txt'
}, function (err, markdown) {
  console.log(err, markdown)
})
```
