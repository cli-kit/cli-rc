var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');
var util = require('util');

var JSON_TYPE = 'json';
var INI_TYPE = 'ini';
var types = [JSON_TYPE, INI_TYPE];

/**
 *  Create a RunControl instance.
 *
 *  @param options Run control configuration options.
 *  @param options.type String indicating the file type (json or ini).
 *  @param options.name String name of the file to load.
 *  @param options.path Array of filesystem directories to search.
 */
var RunControl = function(options) {
  EventEmitter.call(this);
  options = options || {};
  this.type = options.type || JSON_TYPE;
  // TODO: validate name and path
  this.name = options.name;
  this.path = options.path;
}

util.inherits(RunControl, EventEmitter);

/**
 *  Load the configuration files.
 *
 *  @api public
 */
RunControl.prototype.load = function() {

}

/**
 *  Create a RunControl instance.
 *
 *  @param options Run control configuration options.
 */
function rc(options) {
  return new RunControl(options);
}

module.exports = rc;
module.exports.RunControl = RunControl;
module.exports.JSON = JSON_TYPE;
module.exports.INI = INI_TYPE;
module.exports.types = types;
