var async = require('async');
var fs = require('fs');
var path = require('path'), basename = path.basename;
var fsutil = require('cli-fs');
var merge = require('cli-util').merge;

var PREFIX = '.';
var SUFFIX = 'rc';
var JSON_TYPE = 'json';
var INI_TYPE = 'ini';

var types = [JSON_TYPE, INI_TYPE];

var decoders = {};
decoders[JSON_TYPE] = function(contents) {
  return JSON.parse(contents);
}
decoders[INI_TYPE] = function(contents) {
  // lazily load ini dependency
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
  options = options || {};
  this.rc = {};
  this.type = options.type || JSON_TYPE;
  if(!~types.indexOf(this.type)) {
    throw new TypeError('Invalid rc type \'' + this.type + '\'');
  }
  this.name = options.name || PREFIX + basename(process.argv[1]) + SUFFIX;
  this.path = options.path || this.getDefaultSearchPath();
}

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
  pth.push(pkg);
  if(usr) pth.push(usr);
  return pth;
}

/**
 *  Load the configuration files.
 *
 *  @api public
 *
 *  @param callback A callback function.
 */
RunControl.prototype.load = function(callback) {
  if(typeof callback !== 'function') {
    throw new TypeError('Load callback must be a function');
  }
  var files = this.path.slice(0), name = this.name;
  var rc = this.rc, type = this.type;
  files.forEach(function(dir, index, arr) {
    arr[index] = path.join(dir, name);
  })
  async.mapSeries(files, function(file, callback) {
    fs.exists(file, function(exists) {
      if(!exists) return callback();
      fs.readFile(file, function(err, data) {
        if(err) return callback(err);
        var decoder = decoders[type], res;
        try {
          res = decoder('' + data);
        }catch(e) {
          return callback(e);
        }
        return callback(null, res);
      })
    });
  }, function(err, results) {
    if(err) {
      return callback(err);
    }
    for(var i = 0;i < results.length;i++) {
      merge(results[i], rc);
    }
    callback(null, rc);
  });
}

/**
 *  Create a RunControl instance.
 *
 *  @param options Run control configuration options.
 *  @param callback A callback function to pass to load.
 */
function rc(options, callback) {
  var r = new RunControl(options);
  if(typeof callback === 'function') r.load(callback);
  return r;
}

module.exports = rc;
module.exports.RunControl = RunControl;
module.exports.JSON = JSON_TYPE;
module.exports.INI = INI_TYPE;
