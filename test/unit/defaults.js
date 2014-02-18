var expect = require('chai').expect;
var rc = require('../..');

describe('cli-util:', function() {
  it('should set default options', function(done) {
    var loader = rc();
    expect(loader.type).to.eql(rc.JSON);
    expect(loader.name).to.eql('._mocharc');
    expect(loader.path).to.be.an('array');
    expect(loader.path.length).to.eql(2);
    done();
  });

  it('should set default options (without home)', function(done) {
    delete process.env.HOME;
    delete process.env.HOMEPATH;
    delete process.env.USERPROFILE;
    var loader = rc();
    expect(loader.type).to.eql(rc.JSON);
    expect(loader.name).to.eql('._mocharc');
    expect(loader.path).to.be.an('array');
    expect(loader.path.length).to.eql(1);
    done();
  });
})
