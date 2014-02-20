var assert = require('assert'),
	fs = require('fs'),
	klip = require('../index'),
	testFromPath = 'data/My\ Clippings.txt',
	testToPath = 'data/clippings.json';


describe('klip', function(){

	describe('#parse', function(){

		it('should exist', function(){
			assert.ok(klip.parse);
		});

		it('should be a function', function(){
			assert.equal(typeof klip.parse, 'function');
		});

		it('should parse without error', function(done){
			klip.parse(testFromPath, done);
		});

		it('should return an object with length > 0', function(done){
			klip.parse(testFromPath, function(err, data){
				assert.ok((data.length > 0));
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
			klip.exportJson(testFromPath, testToPath, done);
		});		

	});
})