var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var rc = require('../..');
var ini = require('ini');
var paths = require('../util/paths');

describe('cli-util:', function() {
  it('should load valid rc file (json)', function(done) {
    var expected = ini.parse(
      '' + fs.readFileSync(path.join(paths.files, 'rc.ini')));
    var opts = {name: 'rc.ini', path: [paths.files], type: rc.INI};
    rc(opts, function loaded(err, rc) {
      expect(err).to.eql(null);
      console.dir(rc);
      expect(rc).to.eql(expected);
      done();
    });
  });
})
