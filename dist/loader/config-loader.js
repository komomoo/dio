"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const merge_1 = require("lodash/merge");
exports.default = (cwd = process.cwd(), pkg) => {
    const defaultConfig = require('../../src/config/dio.config.js')({ pkg });
    const configPath = `${cwd}/dio.config.js`;
    if (fs.existsSync(configPath)) {
        let config = require(configPath);
        if (typeof config === 'function')
            config = config({ pkg, defaultConfig });
        return merge_1.default(defaultConfig, config);
    }
    else if (pkg.dioConfig) {
        return merge_1.default(defaultConfig, pkg.dioConfig);
    }
    else {
        if (global.cliConfig.debug)
            console.warn('未找到 dio 配置，将使用默认配置构建...');
        return defaultConfig;
    }
};
