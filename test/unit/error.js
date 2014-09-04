var path = require('path');
var expect = require('chai').expect;
var rc = require('../..');
var paths = require('../util/paths');

describe('cli-rc:', function() {
  it('should throw error on unsupported type', function(done) {
    var opts = {type: 'unknown'};
    function fn() {
      var loader = rc(opts);
    }
    expect(fn).throws(TypeError);
    done();
  });
  it('should throw error on invalid callback', function(done) {
    var loader = rc();
    function fn() {
      loader.load();
    }
    expect(fn).throws(TypeError);
    done();
  });
  it('should callback with error on invalid json', function(done) {
    var file = paths.invalid;
    var opts = {name: file, path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      expect(err.file).to.eql(path.join(paths.files, file));
      function fn() {
        throw err;
      }
      expect(fn).throws(SyntaxError);
      done();
    });
  });
  it('should callback with error on EACCES', function(done) {
    var file = paths.eaccess;
    var opts = {name: file, path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      expect(err.file).to.eql(path.join(paths.files, file));
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      done();
    });
  });
})
