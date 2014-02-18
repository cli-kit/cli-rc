var async = require('async');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path'), basename = path.basename;
var util = require('util');
var utils = require('cli-fs');

var EXTENSION = 'rc';
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
  this.rc = {};
  this.type = options.type || JSON_TYPE;
  this.name = options.name || basename(process.argv[1]) + EXTENSION;
  this.path = options.path || this.getDefaultSearchPath();
}

util.inherits(RunControl, EventEmitter);

/**
 *  Retrieve an array for the default search path.
 *
 *  @api private
 *
 *  @return An array of default search paths.
 */
RunControl.prototype.getDefaultSearchPath = function() {
  var pth = [];
  // this library should be in node_modules/cli-rc so this should
  // resolve to the package that depends upon this library
  var pkg = path.normalize(path.join(__dirname, '..', '..'));
  var usr = utils.home();
  pth.push(pkg, usr);
  return pth;
}

/**
 *  Load the configuration files.
 *
 *  @api public
 */
RunControl.prototype.load = function(callback) {
  var files = this.path.slice(0), name = this.name;
  var rc = this.rc;
  files.forEach(function(dir, index, arr) {
    arr[index] = path.join(dir, name);
  })
  //console.dir(files);
  async.mapSeries(files, function(file, callback) {
    fs.exists(file, function(exists) {
      if(!exists) return callback();
    });
  }, function(err, results) {
    //console.log('rc load complete');
    callback(rc);
  });
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
