'use strict';

/**
 * Add raw xml to the config.xml file.
 *
 * @author Sam Verschueren	  <sam.verschueren@gmail.com>
 * @since  12 June 2015
 */

// module dependencies
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var Config = require('cordova-config');

// export the module
module.exports = function (xml) {
	return through.obj(function (file, enc, cb) {
		// Pipe the file to the next step
		this.push(file);

		// Make sure it is an array so we can iterate
		xml = [].concat(xml);

		try {
			// Load the config.xml file
			var config = new Config(path.join(file.path, 'config.xml'));

			// Iterate over the xml tags
			xml.forEach(function (tag) {
				// Add the tag to the config.xml file
				config.addRawXML(tag);
			});

			// Write the config file
			config.write(function () {
				// Call the callback
				cb();
			});
		} catch (err) {
			// Return an error if something went wrong while parsing
			cb(new gutil.PluginError('gulp-cordova-xml', err.message));
		}
	});
};
