var fs = require('fs')
var each = require('each-series')

module.exports = function buildManuscript (options, done) {
  var dir = process.cwd() || options.dir
  var target = dir + options.target || dir + '/readme.md'
  var tableOfContents = dir + options.tableOfContents || dir + '/manuscript/Book.txt'
  var bookDir = dir + options.bookDir || dir + '/manuscript/'
  var include = options.include || []
  var exclude = (options.exclude || []).concat(['frontmatter:', 'mainmatter:', 'backmatter:'])
  var separator = options.separator || '\n\n\n'
  var replace = options.replace || []
  var readList = fs.createReadStream(tableOfContents)

  readList.on('data', function (data) {
    var source = prepareSource(data, include)
    fs.unlink(target, function () {
      compileChapters(source, done)
    })
  })

  function prepareSource (main, include) {
    main = main.toString()
      .split('\n')
      .filter(function (item) {
        return isIncluded(exclude, item)
      })
      .map(function (item) {
        return bookDir + item
      }
    )
    return include.concat(main)
  }

  function compileChapters (arr, done) {
    each(arr, function (chapter, i, next) {
      fs.readFile(chapter, 'utf8', function (err, data) {
        data = data + separator
        if (replace.length > 0) {
          for (var i = 0; i < replace.length; i++) {
            data = data.replace(replace[i][0], replace[i][1])
          }
        }
        fs.appendFile(target, data, next)
      })
    }, function end () {
      fs.readFile(target, 'utf8', done)
    })
  }
}

function isIncluded (arr, data) {
  var str = data.toString()
  if (str !== 0 && arr.indexOf(str) === -1 && str !== undefined) {
    return data
  }
}
