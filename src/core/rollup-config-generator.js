/**
 * rollup 配置生成器
 */

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const url = require('rollup-plugin-url')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const typescript = require('rollup-plugin-typescript')
const postcss = require('rollup-plugin-postcss')
const vue = require('rollup-plugin-vue')
const autoprefixer = require('autoprefixer')

module.exports = (dioConfig, pkg, formatMapping) => {
  const baseConfig = {
    ...dioConfig,
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.vue', '.ts'],
      }),
      commonjs(),
      json(),
      url({ limit: 10 * 1024 }),
      typescript(),
      vue({
        defaultLang: {
          style: 'stylus',
        },
        template: {
          // 强制生产模式
          isProduction: true,
        },
        style: {
          postcssPlugins: [autoprefixer],
        },
      }),
      postcss({
        extensions: ['.css', '.styl', '.sass', '.scss'],
      }),
      babel({
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.ts'],
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
    ],
  }

  return dioConfig.output.format.reduce((acc, format) => {
    const config = {
      ...baseConfig,
      output: {
        ...dioConfig.output,
        file: `${dioConfig.output.directory}/${dioConfig.output.name}${formatMapping[format] ? `${formatMapping[format]}` : ''}`,
        format,
      },
    }

    return [
      ...acc,
      config,
    ]
  }, [])
}
