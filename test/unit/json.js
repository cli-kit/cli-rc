var expect = require('chai').expect;
var rc = require('../..');
var override = require('../util/override');
var paths = require('../util/paths');

var expected = require('../files/rc.json');

describe('cli-util:', function() {
  it('should load valid rc file (json)', function(done) {
    var opts = {name: 'rc.json', path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      expect(rc).to.eql(expected);
      done();
    });
  });
  it('should override valid rc file (json)', function(done) {
    var opts = {name: 'rc.json', path: [paths.files, paths.override]};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      override(rc, expected);
      done();
    });
  });
})
