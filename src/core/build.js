const fs = require('fs')
const ora = require('ora')
const rollup = require('rollup')
const terser = require('terser')

const pkgLoader = require('./loader/pkg-loader')
const configLoader = require('./loader/config-loader')
const formatMapping = require('./core/format-mapping')
const rollupConfigGenerator = require('./core/rollup-config-generator')

module.exports = async (cliConfig) => {
  const pkg = pkgLoader()
  const dioConfig = configLoader(process.cwd(), pkg, cliConfig)
  const rollupConfigs = rollupConfigGenerator(dioConfig, pkg, formatMapping)

  if (cliConfig.debug) {
    console.log('\npkg: ', pkg)
    console.log('\ndioConfig: ', dioConfig)
    console.log('\nrollupConfigs: ', rollupConfigs)
  }

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
}
