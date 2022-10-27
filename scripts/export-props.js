const vfs = require('vinyl-fs')
const map = require('map-stream')

const config = require('../src/config.json')
const dest_docs = './dist/types'
const types = []
const handler = (str) => {
  let feng = ``
  let arr = str.split(`-`)
  let newArr = arr.map((ele, idx) => {
    return ele[0].toUpperCase() + ele.slice(1)
  })
  feng = newArr.join(``)
  return feng
}
exportComponentProps()

function exportComponentProps() {
  const fileExt = ''
  config.nav.map((item) => {
    item.packages.forEach((element) => {
      let { name, show, type, exportEmpty } = element
      if (show || exportEmpty) {
        types.push(
          `export type { ${handler(
            name
          )}Props } from '@/packages/${name.toLowerCase()}/${name.toLowerCase()}${fileExt}';`
        )
      }
    })
  })
  vfs
    .src(['./src/packages/ui.react.build.ts'])
    .pipe(
      map((file, cb) => {
        const contents = file.contents.toString() + '\n' + types.join('\n')
        file.contents = Buffer.from(contents, 'utf8')
        cb(null, file)
      })
    )
    .pipe(vfs.dest(dest_docs, { overwrite: true }))
}
