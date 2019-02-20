const fs = require('fs')
const ora = require('ora')
const rollup = require('rollup')
const terser = require('terser')

const formatMapping = require('./utils/format-mapping')
const pkgLoader = require('./utils/pkg-loader')
const configLoader = require('./utils/config-loader')
const rollupConfigGenerator = require('./utils/rollup-config-generator')

const pkg = pkgLoader()
const dioConfig = configLoader(process.cwd(), pkg)
const rollupConfigs = rollupConfigGenerator(dioConfig, pkg, formatMapping)

;(async () => {
  if (!fs.existsSync(dioConfig.output.directory)) fs.mkdirSync(dioConfig.output.directory)

  for (const config of rollupConfigs) {
    const spinner = ora(`📦  [${config.output.format}] ${dioConfig.input} → ${config.output.file}.js`).start()

    const bundle = await rollup.rollup(config)
    const { output: [{ code }] } = await bundle.generate(config.output)
    fs.writeFile(`${config.output.file}.js`, code, (err) => {
      if (err) console.error(err)
    })

    // minimize
    const minimizeCode = (dioConfig.output.banner ? dioConfig.output.banner + '\n' : '') + terser.minify(code, {
      toplevel: true,
      output: {
        ascii_only: true,
      },
      compress: {
        // pure_funcs: ['makeMap'],
      },
    }).code
    fs.writeFile(`${config.output.file}.min.js`, minimizeCode, (err) => {
      if (err) console.error(err)
    })

    spinner.succeed()
  }
})()
