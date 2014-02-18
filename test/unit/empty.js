var expect = require('chai').expect;
var rc = require('../..');

describe('cli-util:', function() {
  it('should load empty runtime configuration (json)', function(done) {
    rc(function loaded(err, rc) {
      expect(err).to.eql(null);
      expect(rc).to.eql({});
      done();
    });
  });
})
