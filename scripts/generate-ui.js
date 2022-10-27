// generate ui.react.ts file for dev or build
const config = require('../src/config.json')
var glob = require('glob')
const path = require('path')
const fs = require('fs-extra')
let importStr = ``
let importMarkdownStr = ``
let importOnlineEditScssStr = ``
let importScssStr = `\n`
const packages = []
const onlineEditScss = []
const mds = []
const raws = []
const handler = (str) => {
  let feng = ``
  let arr = str.split(`-`)
  let newArr = arr.map((ele, idx) => {
    return ele[0].toUpperCase() + ele.slice(1)
  })
  feng = newArr.join(``)
  return feng
}

config.nav.map((item) => {
  item.packages.forEach((element) => {
    let { name, show, exportEmpty } = element
    const upperName = handler(name)
    if (show || exportEmpty) {
      importStr += `import ${upperName} from '@/packages/${name.toLowerCase()}';\n`
      importScssStr += `import '@/packages/${name.toLowerCase()}/${name.toLowerCase()}.scss';\n`

      packages.push(upperName)
    }
    if (show) {
      glob
        .sync(
          path.join(__dirname, `../src/packages/${name.toLowerCase()}/`) +
            '*.md'
        )
        .map((f) => {
          let lang = 'zh-CN'
          let matched = f.match(/doc\.([a-z-]+)\.md/i)
          if (matched) {
            ;[, lang] = matched
            const langComponentName = `${name}${lang.replace('-', '')}`
            importMarkdownStr += `import ${langComponentName} from '@/packages/${name.toLowerCase()}/doc.${lang}.md?raw';\n`
            raws.push(langComponentName)
          }
        })
      glob
        .sync(
          path.join(__dirname, `../src/packages/${name.toLowerCase()}/`) +
            'demo.scss'
        )
        .map((f) => {
          onlineEditScss.push(upperName)
          importOnlineEditScssStr += `import ${upperName}Scss from '@/packages/${name.toLowerCase()}/demo.scss?raw';\n`
        })
      importMarkdownStr += `import ${upperName} from '@/packages/${name.toLowerCase()}/doc.md?raw';\n`
      mds.push(upperName)
      raws.push(upperName)
    }
  })
})

let fileStrBuild = `${importStr}
export { ${packages.join(',')} };`

fs.outputFile(
  path.resolve(__dirname, '../src/packages/ui.react.build.ts'),
  fileStrBuild,
  'utf8',
  (error) => {
    if (error) throw error
  }
)

let fileStr = `${importStr}
${importScssStr}
export { ${packages.join(',')} };`
fs.outputFile(
  path.resolve(__dirname, '../src/packages/ui.react.ts'),
  fileStr,
  'utf8',
  (error) => {
    if (error) throw error
  }
)

fs.outputFile(
  path.resolve(__dirname, '../src/packages/ui.react.scss.ts'),
  importScssStr,
  'utf8',
  (error) => {
    if (error) throw error
  }
)

let mdFileStr = `${importMarkdownStr}
${importOnlineEditScssStr}
export const scssRaws = { ${onlineEditScss.map((r) => r + 'Scss').join(',')} }
export const routers = [${mds.map((m) => `'${m}'`)}]
export const raws = {${raws.join(',')}}
`

fs.outputFile(
  path.resolve(__dirname, '../src/sites/doc/docs.ts'),
  mdFileStr,
  'utf8',
  (error) => {
    if (error) throw error
  }
)
