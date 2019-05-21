/**
 * rollup 配置生成器
 */

import * as resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import url from 'rollup-plugin-url'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'

export default (
  dioConfig: Readonly<any>,
  pkg: Readonly<any>,
  formatMapping: Readonly<Record<string, string>>,
): Readonly<any>[] => {
  const baseConfig = {
    ...dioConfig,
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
      }),
      commonjs(),
      json(),
      url({ limit: 10 * 1024 }),
      vue({
        defaultLang: {
          style: 'stylus',
        },
        style: {
          postcssPlugins: [autoprefixer],
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

  return dioConfig.output.format.reduce((acc: any[], format: string): any[] => {
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
