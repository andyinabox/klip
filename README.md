klip
=====

A simple tool for parsing Kindle clippings. Inspired by [kindle-my-clippings](https://github.com/baniol/kindle-my-clippings), klip is meant to do nothing more than convert your Kindle "My Clippings.txt" file into a javascript object.

You can see an example of the output in [data/clippings.json](data/clippings.json), and a simple usage example as a command-line tool in [example/klip-cli.js](example/klip-cli.js).

## Installation

`npm install klip`

## API

### klip.parse(filePath, [options], callback)

#### options

_There are no configuration options for the parser currently._

#### callback

The callback returns two arguments

 * `err`: returns an error if there is one
 * `data`: contents of the files as a javascript object

#### example

 	var klip = require('klip');
 	klip.parse('data/My Clippings.txt', function(err, data) {
 		if(!err) {
 			console.log('data parsed successfully!', data);
 		}
 	});

### klip.exportJson(inputPath, outputPath, [options], [callback])

#### options

 * `pretty`: set to `true` if you want json to look pretty (defaults to `false`)

#### callback

The callback returns one argument

 * `err`: returns an error if there is one

#### example

	var klip = require('klip');
	klip.exportJson('data/My Clippings.txt', 'data/clippings.json', function(err){
		if(!err) {
			console.log('success!');
		}
	});

## CLI

You can also run klip as a command-line tool. If you plan to use this functionality you might want to install the node module globally:

	npm install klip -g

The signiture is:

	klip -[flags] [input] [output]
	   -h - show help
	   -p - set options.prettyto true
	   -t - set options.sortByTitleto true
	   -a - set options.sortByAuthorto true

For example:

	klip -p -p data/My\ Clippings.txt data/clippings.json

Or you can access the help via

	klip -h

## License


The MIT License (MIT)

Copyright (c) 2014 Andy Dayton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.