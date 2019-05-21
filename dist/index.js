"use strict";
const yargs = require('yargs')
    .alias({
    h: 'help',
    v: 'version',
    d: 'debug',
})
    .help('h');
global.cliConfig = {
    debug: !!yargs.argv.debug,
};
const command = yargs.argv._[0];
if (command === undefined || command === 'build') {
    require('./core/build')();
}
