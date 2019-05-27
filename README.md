# dio

> 📦 零配置 javascript 包/库构建工具，基于 rollup

## ✨ 特性

- 零配置/极简
- 为构建 库/模块包 而生
- rollup 拥有 AST，能实现完整的 tree-sharking，构建出的体积更小。相较于 webpack 更适用于库构建
- 支持 javascript、typescript、vue

## 🚀 快速开始

### 安装

```bash
yarn add -D dio-bundler # 或 npm i -D dio-bundler
```

### 使用

**第一步**：package.json 中新增 scripts：

```js
  "scripts": {
    "build": "dio"
  },
```

**第二步**：命令行进入项目目录，运行：

```bash
yarn build # 或 npm run build
```

dio 默认以 `src/index.js` 为入口，在 `dist` 目录输出 `'umd', 'es', 'cjs'` 三种格式的构建包（包含未压缩和已压缩版本）。

<img src="https://github.com/wannaxiao/dio/blob/master/docs/assets/cli.png?raw=true">

### 自定义配置

可在项目根目录新建 `dio.config.js` 自定义 dio 构建配置（或在 `package.json` 中使用 `dioConfig` 对象配置）。

[dio 默认配置/配置示例](https://github.com/wannaxiao/dio/blob/master/src/config/dio.config.js)

<br>
<br>
😉😘 如果它对你有所帮助，可以点一下 <b>⭐️<a href="#">Star</a></b> ~

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, momoko
