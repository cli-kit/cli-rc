var expect = require('chai').expect;
var rc = require('../..');

describe('cli-util:', function() {
  it('should load runtime configuration (json)', function(done) {
    var loader = rc();
    loader.load();
    done();
  });
})
