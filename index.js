var parser = require('./lib/parser'),
	exporter = require('./lib/exporter'),
	cli = require('./lib/cli');

// detect if being run from the command line
// http://nodejs.org/docs/latest/api/all.html#all_accessing_the_main_module
if(require.main === module && process.argv.length) {
	cli.run();
}

module.exports = {
	parse: parser,
	exportJson: exporter
}