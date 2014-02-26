'use stict';

	// core libs
var fs = require('fs'),

	// app modules
	_ = require('./utilities'),
	parser = require('./parser'),

	// vars
	defaults = {
		pretty: true,
		organizeBy: null
	}

function exportJson(fromPath, toPath, options, callback) {
	if(typeof options === 'function') {
		callback = options;
		options = {};
	}

	// set options
	options = _.defaults((options || {}), defaults);
	callback = callback || function(){};

	parser(fromPath, function(err, data) {

		if(err) {
			callback(err)
		}


		if(options.organizeBy) {
			data = organizeClippings(data, options.organizeBy);
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


function organizeClippings(parsed, organizeBy) {

	// if function, execute that function
	if(typeof organizeBy === 'function') {
		parsed = organizeBy(parsed);

	// if string, still use orderByKeys	
	} else if (typeof organizeBy === 'string') {
		parsed = organizeByKey(parsed, organizeBy);
	}

	return parsed;
}

function organizeByKey(parsed, key) {
	var organized = [],
		uniqueValues = _.chain(parsed).pluck(key).uniq().value();

	// find unique keys, organize them into a new array
	uniqueValues.forEach(function(value){
		var obj = {};

		// set the main key
		obj[key] = value;

		// query for related items
		obj.clippings = _.where(parsed, obj);

		// add to our resultant object
		organized.push(obj);
	});

	return organized;
}

module.exports = exportJson;