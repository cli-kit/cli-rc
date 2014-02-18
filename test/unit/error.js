var expect = require('chai').expect;
var rc = require('../..');
var paths = require('../util/paths');

describe('cli-util:', function() {
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
    var opts = {name: 'invalid.json', path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      function fn() {
        throw err;
      }
      expect(fn).throws(SyntaxError);
      done();
    });
  });
  it('should callback with error on EACCES', function(done) {
    var opts = {name: 'eaccess.json', path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      done();
    });
  });
})
