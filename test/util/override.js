var expect = require('chai').expect;

module.exports = function(rc, expected) {
  expect(rc.scope).to.eql('local');
  expect(rc.paths.default.datadir).to.eql('/var/lib/db');
  expect(rc.prefix).to.eql('/usr/local/lib/prg');
  expect(rc.database).to.eql(expected.database);
  expect(rc.paths.default.ints)
    .to.eql(expected.paths.default.ints);
}
