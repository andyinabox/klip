var fs = require('fs'),
	klip = require('../index'),
	flagRegEx = /-([A-z])+/,
	flags,
	inPath,
	outPath,
	options = {};

// pass through command-line arguments as
// (keep in mind first two are `node` and the script name)
if(process.argv.length >= 4) {

	inPath = process.argv[2];
	outPath = process.argv[3];


	// if the first argument is a flag
	if(flagRegEx.test(process.argv[2])) {
		// capture the flags
		flags = flagRegEx.exec(process.argv[2]);
		inPath = process.argv[3];
		outPath = process.argv[4];

		// remove first item in array
		if(flags && flags.length > 1) {
			flags.shift();
			flags.forEach(function(flag){
				switch(flag) {
					case 'p':
						options.pretty = true;
						break;
				}
			});
		}
	}

	// export
	klip.exportJson(inPath, outPath, options, function(err){
		if(err) {
			throw err;
		}
		console.log('parsing complete!')
	});
}
