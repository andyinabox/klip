#!/usr/bin/env node

'use strict';

	// core libs
var fs = require('fs'),

	// app modules
	exportJson = require('../lib/exporter'),

	// vars

	// a regex for detecting option flags
	flagRegExp = /-([A-z])+/,

	// will store our arguments
	args = [],

	// will store our flags
	flags = [],

	// will store our options
	options = {},

	// set option flags
	optionFlags = {
		'p' : {
			key: 'pretty',
			value: true
		},
		't' : {
			key: 'sortByTitle',
			value: true
		},
		'a' : {
			key: 'sortByAuthor',
			value: true			
		}
	};

/**
 * Run the cli tool!
 * 
 * @param  {Array} [args] Command-line aguments (`process.argv`)
 */
function run(args) {
	var options = {};

	if(args[0] === 'node') {
		args = args.slice(2);
	}

	// if we are short on arguments show help
	if(args.length < 2) {
		help();
	}

	// check for flags
	if (flagRegExp.test(args[0])) {

		// run regex on flags
		flags = flagRegExp.exec(args[0]);

		// remove flags
		args.shift();

		// remove first array value
		flags.shift();

		// show help
		if(flags.indexOf('h') > -1) {
			help();
		// set options from flags
		} else {
			options = getOptions(flags);
		}
	}



	if(args[0] && args[1]) {
		// export
		exportJson(args[0], args[1], options, function(err){
			if(err) {
				throw err;
			}
			console.log('parsing complete!');
		});
	} else {
		process.exit(1);
	}


}


/**
 * Get an options object from the given flags.
 * 
 * @param  {Array} [flags] An array containing single-character flags
 * @return {Object} An options configuration object based on the given flags
 */
function getOptions(flags) {
	var options = {};

	// iterate through keys and set options if applicable
	flags.forEach(function(flag){
		if(optionFlags[flag]) {
			var key = optionFlags[flag].key,
				value = optionFlags[flag].value;

			options[key] = value;
		}
	});

	return options;
}


/**
 * Show help message.
 */
function help() {

	console.log('');

	console.log('klip -[flags] [input] [output]');

	console.log('   -h - show help');

	Object.keys(optionFlags).forEach(function(flag) {
		console.log('   -'+flag+' - set options.'+optionFlags[flag].key+'to '+optionFlags[flag].value);
	});

	process.exit(0);
}

// detect if being run from the command line
// http://nodejs.org/docs/latest/api/all.html#all_accessing_the_main_module
if(require.main === module && process.argv.length) {
	run(process.argv);
}