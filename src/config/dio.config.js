/**
 * dio 默认配置
 */

module.exports = ({ pkg } = {}) => {
  return {
    // 输入
    input: 'src/index.js',

    // 输出
    output: {
      // 目录
      directory: 'dist',
      // 包名
      name: pkg.name,
      // 格式
      format: ['umd', 'es', 'cjs'],
      // 顶部注释
      banner: `/**
 * ${pkg.name} v${pkg.version}
 * Copyright (c) 2018-present, ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`,
    },
  }
}
