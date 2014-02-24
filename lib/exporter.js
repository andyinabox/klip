'use stict';

	// core libs
var fs = require('fs'),

	// app modules
	_ = require('./utilities'),
	parser = require('./parser'),

	// vars
	defaults = {
		pretty: false
	}

function exportJson(fromPath, toPath, options, callback) {
	if(typeof options === 'function') {
		callback = options;
		options = {};
	}

	// set options
	options = _.extend(defaults, (options || {}));
	callback = callback || function(){};

	parser(fromPath, options, function(err, data) {
		var json;

		if(err) {
			callback(err)
		}

		if(options.pretty) {
			json = JSON.stringify(data, null, 4);
		} else {
			json = JSON.stringify(data);
		}

		fs.writeFile(toPath, json, function(err) {
			if(err) {
				callback(err);
			}
			callback();
		});

	});
}

module.exports = exportJson;