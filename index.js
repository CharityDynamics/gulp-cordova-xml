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
			var self = this;
		    config.write()
            .then(function() {
    			// Pipe the file to the next step
                self.push(file);
                cb();
            });
		} catch (err) {
			// Return an error if something went wrong while parsing
			cb(new gutil.PluginError('gulp-cordova-xml', err.message));
		}
	});
};
