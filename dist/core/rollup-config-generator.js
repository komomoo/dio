"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve = require("rollup-plugin-node-resolve");
const rollup_plugin_commonjs_1 = require("rollup-plugin-commonjs");
const rollup_plugin_url_1 = require("rollup-plugin-url");
const rollup_plugin_json_1 = require("rollup-plugin-json");
const rollup_plugin_babel_1 = require("rollup-plugin-babel");
const rollup_plugin_postcss_1 = require("rollup-plugin-postcss");
const rollup_plugin_vue_1 = require("rollup-plugin-vue");
const autoprefixer_1 = require("autoprefixer");
exports.default = (dioConfig, pkg, formatMapping) => {
    const baseConfig = {
        ...dioConfig,
        plugins: [
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
            }),
            rollup_plugin_commonjs_1.default(),
            rollup_plugin_json_1.default(),
            rollup_plugin_url_1.default({ limit: 10 * 1024 }),
            rollup_plugin_vue_1.default({
                defaultLang: {
                    style: 'stylus',
                },
                style: {
                    postcssPlugins: [autoprefixer_1.default],
                },
            }),
            rollup_plugin_postcss_1.default({
                extensions: ['.css', '.styl', '.sass', '.scss'],
            }),
            rollup_plugin_babel_1.default({
                runtimeHelpers: true,
                exclude: 'node_modules/**',
            }),
        ],
    };
    return dioConfig.output.format.reduce((acc, format) => {
        const config = {
            ...baseConfig,
            output: {
                ...dioConfig.output,
                file: `${dioConfig.output.directory}/${dioConfig.output.name}${formatMapping[format] ? `${formatMapping[format]}` : ''}`,
                format,
            },
        };
        return [
            ...acc,
            config,
        ];
    }, []);
};
