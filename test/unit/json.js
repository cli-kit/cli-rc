var expect = require('chai').expect;
var rc = require('../..');
var paths = require('../util/paths');

describe('cli-util:', function() {
  it('should load empty runtime configuration (json)', function(done) {
    var opts = {};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      expect(rc).to.eql({});
      done();
    });
  });
  it('should load valid rc file (json)', function(done) {
    var expected = require('../files/rc.json');
    var opts = {name: 'rc.json', path: [paths.files]};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      expect(rc).to.eql(expected);
      done();
    });
  });
})
