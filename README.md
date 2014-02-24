klip
=====

A simple tool for parsing Kindle clippings. It will parse the format used in the `My Clippings.txt` file on your kindle serve it to you as a JavaScript object. You can also parse directly to a `.json` file, a feature which is also accessible via the command-line interface.

See an example of the output in [`data/my_clippings.json`](data/my_clippings.json).

## Installation

If you are using klip as a node module within a project, install locally:

	npm install klip

If you plan to use it as a command line utility, install globally:

	npm install -g klip

## API

### klip.parse(filePath, [options], callback)

Parses the given file into a JavaScript object.


#### options

_There are no configuration options for the parser currently._

#### callback

The callback returns two arguments

 * `err`: returns an error if there is one
 * `data`: contents of the files as a javascript object

#### example

```js
var klip = require('klip');
klip.parse('data/My Clippings.txt', function(err, data) {
	if(!err) {
		console.log('data parsed successfully!', data);
	}
});
```

### klip.exportJson(inputPath, outputPath, [options], [callback])

Parses the given file and saves it as a json file in the output path.

#### options

_Note: You can include options for `klip.parse` in this method and they will get passed along._

 * `pretty`: set to `true` if you want json to look pretty (defaults to `false`)

#### callback

The callback returns one argument

 * `err`: returns an error if there is one

#### example

```js
var klip = require('klip');
klip.exportJson('data/My Clippings.txt', 'data/my_clippings.json', function(err){
	if(!err) {
		console.log('success!');
	}
});
```

## CLI

You can also run klip as a command-line tool. If you plan to use this functionality you might want to install the node module globally:

	npm install -g klip

The signiture is:

	klip -[flags] [input] [output]
	   -h - show help
	   -p - set options.pretty to true
	   -t - set options.sortByTitle to true
	   -a - set options.sortByAuthor to true

For example:

	klip -pt data/My\ Clippings.txt data/my_clippings.json

Or you can access the help via

	klip -h

## Props

I used the following libraries/tools as reference points when developing this tool:

 * [Bookcision](http://www.norbauer.com/bookcision/) - This handy little bookmarkley originall got me thinking about the whole thing. Unfortunately, when you grab clippings from Amazon's site, it doesn't include notes from any PDFs or non-Amazon ebooks, etc., but `My Clippings.txt` includes everything.
 * [kindle-my-clippings](https://github.com/baniol/kindle-my-clippings) (Node) - I wanted something like this but much simpler.
 * [kindleclippings](https://github.com/georgboe/kindleclippings) (Ruby)
 * [Kindle-Clippings-Parser](https://github.com/gfranxman/Kindle-Clippings-Parser) (Python)
 * [kindle-clippings-parser](https://github.com/albins/kindle-clippings-parser) (Python)

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