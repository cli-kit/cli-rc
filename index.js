var async = require('async');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path'), basename = path.basename;
var util = require('util');
var fsutil = require('cli-fs');
var merge = require('cli-util').merge;

var EXTENSION = 'rc';
var JSON_TYPE = 'json';
var INI_TYPE = 'ini';
var types = [JSON_TYPE, INI_TYPE];

var decoders = {};
decoders[JSON_TYPE] = function(contents) {
  return JSON.parse(contents);
}
decoders[INI_TYPE] = function(contents) {
  var ini = require('ini');
  return ini.parse(contents);
}

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
  if(!~types.indexOf(this.type)) {
    throw new TypeError('Invalid rc type \'' + this.type + '\'');
  }
  this.name = options.name || '.' + basename(process.argv[1]) + EXTENSION;
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
  // this library will be in node_modules/cli-rc so this should
  // resolve to the package that depends upon this library
  var pkg = path.normalize(path.join(__dirname, '..', '..'));
  var usr = fsutil.home();
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
  var rc = this.rc, scope = this;
  files.forEach(function(dir, index, arr) {
    arr[index] = path.join(dir, name);
  })
  async.mapSeries(files, function(file, callback) {
    fs.exists(file, function(exists) {
      if(!exists) return callback();
    });
  }, function(err, results) {
    if(err) {
      return scope.emit('error', err);
    }
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
