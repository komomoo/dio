"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ora = require("ora");
const rollup_1 = require("rollup");
const terser_1 = require("terser");
const pkg_loader_1 = require("../loader/pkg-loader");
const config_loader_1 = require("../loader/config-loader");
const format_mapping_1 = require("../core/format-mapping");
const rollup_config_generator_1 = require("../core/rollup-config-generator");
module.exports = async () => {
    const pkg = pkg_loader_1.default();
    const dioConfig = config_loader_1.default(process.cwd(), pkg);
    const rollupConfigs = rollup_config_generator_1.default(dioConfig, pkg, format_mapping_1.default);
    if (global.cliConfig.debug) {
        console.log('\npkg: ', pkg);
        console.log('\ndioConfig: ', dioConfig);
        console.log('\nrollupConfigs: ', rollupConfigs);
    }
    if (!fs.existsSync(dioConfig.output.directory))
        fs.mkdirSync(dioConfig.output.directory);
    for (const config of rollupConfigs) {
        const spinner = ora(`📦  [${config.output.format}] ${dioConfig.input} → ${config.output.file}.js`).start();
        const bundle = await rollup_1.default.rollup(config);
        const { output: [{ code }] } = await bundle.generate(config.output);
        fs.writeFile(`${config.output.file}.js`, code, (err) => {
            if (err)
                console.error(err);
        });
        const minimizeCode = (dioConfig.output.banner ? dioConfig.output.banner + '\n' : '') + terser_1.default.minify(code, {
            toplevel: true,
            output: {
                ascii_only: true,
            },
            compress: {},
        }).code;
        fs.writeFile(`${config.output.file}.min.js`, minimizeCode, (err) => {
            if (err)
                console.error(err);
        });
        spinner.succeed();
    }
};
