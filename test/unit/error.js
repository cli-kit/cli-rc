var expect = require('chai').expect;
var rc = require('../..');

describe('cli-util:', function() {
  it('should throw error on unsupported type', function(done) {
    var opts = {type: 'unknown'};
    function fn() {
      var loader = rc(opts);
    }
    expect(fn).throws(TypeError);
    done();
  });
})
