import * as fs from 'fs'
import * as ora from 'ora'
import rollup from 'rollup'
import terser from 'terser'

import pkgLoader from '../loader/pkg-loader'
import configLoader from '../loader/config-loader'
import formatMapping from '../core/format-mapping'
import rollupConfigGenerator from '../core/rollup-config-generator'

module.exports = async (): Promise<void> => {
  const pkg = pkgLoader()
  const dioConfig = configLoader(process.cwd(), pkg)
  const rollupConfigs = rollupConfigGenerator(dioConfig, pkg, formatMapping)

  if (global.cliConfig.debug) {
    console.log('\npkg: ', pkg)
    console.log('\ndioConfig: ', dioConfig)
    console.log('\nrollupConfigs: ', rollupConfigs)
  }

  if (!fs.existsSync(dioConfig.output.directory)) fs.mkdirSync(dioConfig.output.directory)

  for (const config of rollupConfigs) {
    const spinner = ora(`📦  [${config.output.format}] ${dioConfig.input} → ${config.output.file}.js`).start()

    const bundle = await rollup.rollup(config)
    const { output: [{ code }] } = await bundle.generate(config.output)
    fs.writeFile(`${config.output.file}.js`, code, (err): void => {
      if (err) console.error(err)
    })

    // minimize
    const minimizeCode = (dioConfig.output.banner ? dioConfig.output.banner + '\n' : '') + terser.minify(code, {
      toplevel: true,
      output: {
        ascii_only: true, // eslint-disable-line
      },
      compress: {
        // pure_funcs: ['makeMap'],
      },
    }).code
    fs.writeFile(`${config.output.file}.min.js`, minimizeCode, (err): void => {
      if (err) console.error(err)
    })

    spinner.succeed()
  }
}
