"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = (cwd = process.cwd()) => {
    const pkgPath = `${cwd}/package.json`;
    if (fs.existsSync(pkgPath)) {
        return require(pkgPath);
    }
    else {
        console.warn('未找到 package.json 文件...');
        return {};
    }
};
