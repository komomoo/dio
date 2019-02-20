/**
 * rollup 配置生成器
 */

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const vue = require('rollup-plugin-vue')

module.exports = (dioConfig, pkg, formatMapping) => {
  const baseConfig = {
    input: dioConfig.input,
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
      }),
      commonjs(),
      json(),
      vue({
        defaultLang: {
          style: 'stylus',
        },
        template: {
          // 强制生产模式
          isProduction: true,
        },
        style: {
          // postcssPlugins: postcssCfg
        },
      }),
      postcss({
        extensions: ['.css', '.styl', '.sass', '.scss'],
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
    ],
  }

  return dioConfig.output.format.reduce((acc, format) => {
    const config = {
      ...baseConfig,
      output: {
        file: `${dioConfig.output.directory}/${dioConfig.output.name}${formatMapping[format] ? `${formatMapping[format]}` : ''}`,
        format,
        name: dioConfig.output.name,
        banner: dioConfig.output.banner,
      },
    }

    return [
      ...acc,
      config,
    ]
  }, [])
}
