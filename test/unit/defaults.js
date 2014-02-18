var path = require('path');
var expect = require('chai').expect;
var rc = require('../..');

var pkg = path.normalize(
  path.join(__dirname, '..', '..', '..', '..'));

describe('cli-util:', function() {
  it('should set default options', function(done) {
    var loader = rc();
    expect(loader.type).to.eql(rc.JSON);
    expect(loader.name).to.eql('._mocharc');
    expect(loader.path).to.be.an('array');
    expect(loader.path.length).to.eql(2);
    done();
  });
  it('should append default paths', function(done) {
    var dir = '/usr/local/lib/prg';
    var loader = rc({append: true, path: [dir]});
    expect(loader.path).to.be.an('array');
    expect(loader.path.length).to.eql(3);
    expect(loader.path[0]).to.eql(dir);
    expect(loader.path[1]).to.eql(pkg);
    done();
  });
  it('should prepend default paths', function(done) {
    var dir = '/usr/local/lib/prg';
    var loader = rc({prepend: true, path: [dir]});
    expect(loader.path).to.be.an('array');
    expect(loader.path.length).to.eql(3);
    expect(loader.path[0]).to.eql(pkg);
    expect(loader.path[loader.path.length - 1]).to.eql(dir);
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
