var expect = require('chai').expect;
var rc = require('../..');
var override = require('../util/override');
var paths = require('../util/paths');

var expected = require('../files/override/lenient.json');

describe('cli-rc:', function() {
  it('should gather errors as array (lenient)', function(done) {
    var opts = {
      name: paths.lenient, path: [paths.files, paths.override], lenient: true};
    rc(opts, function loaded(err, rc) {
      expect(err).to.be.an('array');
      expect(err.length).to.eql(1);
      expect(err[0]).to.be.instanceof(SyntaxError);
      expect(rc).to.eql(expected);
      done();
    });
  });
})
