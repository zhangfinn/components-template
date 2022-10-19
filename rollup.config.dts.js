import dts from 'rollup-plugin-dts'

const dtsPlugin = dts.default({
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/*': ['src/*'],
    },
  },
})

const config = [
  {
    input: './dist/types/ui.react.build.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [
      {
        ...dtsPlugin,
        outputOptions(...args) {
          const opts = dtsPlugin.outputOptions(...args)
          opts.interop = 'esModule'
          delete opts.namespaceToStringTag
          opts.generatedCode = { symbols: false, ...opts.generatedCode }
          return opts
        },
      },
    ],
  },
]

export default config
