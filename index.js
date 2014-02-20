var parser = require('./lib/parser'),
	exporter = require('./lib/exporter'),
	cli = require('./lib/cli');

if(process.argv.length) {
	cli();
}

module.exports = {
	parse: parser,
	exportJson: exporter
}