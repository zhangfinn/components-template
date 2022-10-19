import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

const path = require('path')
const config = require('./src/config.json')

const entries = {
  'ui-react.es': path.join(__dirname, `./src/packages/ui.react.build.ts`),
}
const outputEntries = {}

config.nav.forEach((item) => {
  item.packages.forEach((element) => {
    const { name, show, type, exportEmpty } = element
    if (show || exportEmpty) {
      outputEntries[`./${name.toLowerCase()}`] = `./${name}`
      entries[name] = path.join(
        __dirname,
        `./src/packages/${name.toLowerCase()}/index.ts`
      )
    }
  })
})

export default {
  input: entries,
  external: (id, parent) =>
    /^react/.test(id) ||
    /^react-dom/.test(id) ||
    /^classnames/.test(id) ||
    (/^@\/packages\/\w+$/.test(id) && !!parent),
  output: {
    format: 'esm',
    dir: './dist/esm',
    name: '[entryName].js',
    paths: (id) => {
      return /@\/packages/.test(id)
        ? `${outputEntries[id.replace('@/packages/', './')]}.js`
        : id
    },
  },
  plugins: [
    commonjs(),
    typescript(),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
      ],
    }),
  ],
}
