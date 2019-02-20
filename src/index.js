const yargs = require('yargs')
  .alias({
    h: 'help',
    v: 'version',
  })
  .help('h')

const command = yargs.argv._[0]

if (command === undefined || command === 'build') {
  require('./build')
}
