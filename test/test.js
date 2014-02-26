/**
 * Tests for klip
 */

'use strict'

	// core libs
var assert = require('assert')
	, fs = require('fs')

	// app modules
	, _ = require('../lib/utilities')
	, klip = require('../klip')

	// vars
	, testFromPath = 'test/data/My\ Clippings.txt'
	, testToPath = 'test/data/my_clippings.json';

describe('klip', function(){

	describe('#parse', function(){

		it('should exist', function(){
			assert.ok(klip.parse);
		});

		it('should be a function', function(){
			assert.equal(typeof klip.parse, 'function');
		});

		it('should parse without error', function(done){
			klip.parse(testFromPath, {pretty: true}, done);
		});

		it('should return an object with length > 0', function(done){
			klip.parse(testFromPath, {pretty: true}, function(err, data){
				assert.ok(data.length > 0);
				done();
			});
		});		

	});


	describe('#exportJson', function(){

		it('should exist', function(){
			assert.ok(klip.exportJson);
		});

		it('should be a function', function(){
			assert.equal(typeof klip.exportJson, 'function');
		});

		it('should export without error', function(done){
			klip.exportJson(testFromPath, testToPath, {pretty: true}, done);
		});		

		it('should export actual file', function(done){
			if(fs.existsSync(testToPath)) {
				fs.unlinkSync(testToPath)
			}

			klip.exportJson(testFromPath, testToPath, { pretty: true }, function(err){
				if(err){
					done(err);
				}

				assert.ok(fs.existsSync(testToPath));
				done()
			});	
			
		});	

		it('should work when organizeBy is set as callback function', function(done) {
			var callback = function(parsed) {
				return _.pluck(parsed, 'locationRange');
			};

			klip.exportJson(testFromPath, testToPath, {pretty: true, organizeBy: callback}, function(err) {

				assert.ok(fs.existsSync(testToPath));

				fs.readFile(testToPath, function(err, data){
					data = JSON.parse(data);

					// make sure there are items in data array
					assert.ok(data.length > 0);

					// make sure all items have given key
					data.forEach(function(arr) { assert.ok(Array.isArray(arr)); });
					done();
				});

			});
		});

		it('should work when organizeBy is set as string', function(done) {
			var key = 'author';

			klip.exportJson(testFromPath, testToPath, {pretty: true, organizeBy: key}, function(err) {

				assert.ok(fs.existsSync(testToPath));

				fs.readFile(testToPath, function(err, data){
					data = JSON.parse(data);

					// make sure there are items in data array
					assert.ok(data.length > 0);

					// make sure all items have given key
					data.forEach(function(obj) { assert.ok(Object.keys(obj).indexOf(key) > -1); });
					done();
				});
			});
		});


		afterEach(function(done) {
			// re-export in default format
			klip.exportJson(testFromPath, testToPath, done);
		});

	});
})