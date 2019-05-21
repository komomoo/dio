/**
 * dio 配置文件加载器
 */

import * as fs from 'fs'
import merge from 'lodash/merge'

export default (
  cwd: string = process.cwd(),
  pkg: Readonly<any>,
): Readonly<any> => {
  const defaultConfig = require('../../src/config/dio.config.js')({ pkg })

  const configPath = `${cwd}/dio.config.js`

  if (fs.existsSync(configPath)) {
    let config = require(configPath)
    if (typeof config === 'function') config = config({ pkg, defaultConfig })
    return merge(defaultConfig, config)
  } else if (pkg.dioConfig) {
    return merge(defaultConfig, pkg.dioConfig)
  } else {
    if (global.cliConfig.debug) console.warn('未找到 dio 配置，将使用默认配置构建...')
    return defaultConfig
  }
}
