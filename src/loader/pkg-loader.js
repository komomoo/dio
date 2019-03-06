/**
 * package.json 加载器
 */

const fs = require('fs')

module.exports = (cwd = process.cwd()) => {
  const pkgPath = `${cwd}/package.json`
  if (fs.existsSync(pkgPath)) {
    return require(pkgPath)
  } else {
    console.warn('未找到 package.json 文件...')
    return {}
  }
}
