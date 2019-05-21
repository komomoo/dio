/**
 * package.json 加载器
 */

import * as fs from 'fs'

export default (
  cwd: string = process.cwd()
): Readonly<any> => {
  const pkgPath = `${cwd}/package.json`
  if (fs.existsSync(pkgPath)) {
    return require(pkgPath)
  } else {
    console.warn('未找到 package.json 文件...')
    return {}
  }
}
