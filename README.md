# dio

> 📦 零配置 javascript 包/库构建工具，基于 rollup

## ✨ 特性

- 零配置/极简
- 为构建 库/模块包 而生
- rollup 拥有 AST，能实现完整的 tree-sharking，构建出的体积更小。相较于 webpack 更适用于库构建
- 支持 javascript、vue

## 🚀 快速开始

### 安装

```bash
yarn add -D dio-bundler # 或npm i -D dio-bundler
```

### 使用
 
命令行中进入项目目录，输入命令 `dio` 并回车。

dio 默认以 `src/index.js` 为入口，在 `dist` 目录输出 `'umd', 'es', 'cjs'` 三种格式的构建包（包含未压缩和已压缩版本）。

<img src="https://github.com/wannaxiao/dio/blob/master/docs/assets/cli.png?raw=true">

### 自定义配置

可在项目根目录新建 `dio.config.js` 自定义 dio 构建配置。

[dio 默认配置/配置示例](https://github.com/wannaxiao/dio/blob/master/src/config/dio.config.js)
