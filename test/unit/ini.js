var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var rc = require('../..');
var ini = require('ini');
var override = require('../util/override');
var paths = require('../util/paths');

var expected = ini.parse(
  '' + fs.readFileSync(path.join(paths.files, 'rc.ini')));

describe('cli-rc:', function() {
  it('should load valid rc file (ini)', function(done) {
    var opts = {name: paths.ini, path: [paths.files], type: rc.INI};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      expect(rc).to.eql(expected);
      done();
    });
  });
  it('should override valid rc file (ini)', function(done) {
    var opts = {
      name: paths.ini, path: [paths.files, paths.override], type: rc.INI};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      override(rc, expected);
      done();
    });
  });
})
