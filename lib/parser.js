'use strict';

	// core libs
var fs = require('fs')
	, os = require('os')

	// app modules
	, _ = require('./utilities')

	// vars
	, delimiter = os.EOL+"=========="
	, firstLineRegEx = /^(.+) \((.+)\)$/i
	, secondLineRegEx = /^-\s(?:Your\s)?(\w+) (?:on page ([0-9-]*?) \| )?(?:Loc(?:ation|\.) ([0-9-]*?) +\| )?Added on (.*)$/i
	, defaults = {};


function parse(path, options, callback) {
	var parsed = [];

	if(typeof options === 'function') {
		callback = options;
		options = {};
	}

	// set options
	options = _.defaults((options || {}), defaults);

	// set collback
	callback = callback || function(){};

	fs.readFile(path, 'utf8', function(err, data){
		var records,
			winEOL = '\r\n',
			winEOLRegEx = /\r\n/g;

		// convert line endings if necessary
		if(winEOLRegEx.test(data) && os.EOL !== winEOL) {
			data = data.replace(winEOLRegEx, '\n');
		}


		// die if there is an error parsing
		if(err) {	
			return callback(err);
		}

		// split up the records
		records = data.split(delimiter);

		// iterate through the records
		if(records.length) {
			records.forEach(function(record){
				var obj = {},
					lines = [],
					lineOne,
					lineTwo;

				// split into lines
				record.split(os.EOL).forEach(function(line) {
					if(line !== '') {
						lines.push(line);
					}
				});

				// bail if there are no lines
				if(!lines.length) {
					return;
				}

				// run regex on first two lines
				if(lines.length > 1) {
					lineOne = firstLineRegEx.exec(lines[0]);
					lineTwo = secondLineRegEx.exec(lines[1]);
				}

				// grab content from remaining lines
				if(lines.length > 2) {
					obj.content = lines.slice(2).join(os.EOL);
				}

				if(lineOne) {
					obj.title = lineOne[1];
					obj.author = lineOne[2];
				} else {
					obj.title = _.trim((lines[0] || ''));
				}

				if(lineTwo) {
					// type
					if(lineTwo[1]) {
						obj.type = lineTwo[1];
					}

					// page
					if(lineTwo[2]) {
						obj.pageRange = lineTwo[2].split('-');
						obj.pageRange.forEach(function(n, i, list){
							list[i] = parseInt(n);
						});
					}

					// location
					if(lineTwo[3]) {
						obj.locationRange = lineTwo[3].split('-');
						obj.locationRange.forEach(function(n, i, list){
							list[i] = parseInt(n);
						});
					}

					// date
					if(lineTwo[4]) {
						obj.date = new Date(lineTwo[4]);
					}
				}

				parsed.push(obj);					

			});
		}

		callback(null, parsed);

	});

}

module.exports = parse;

