var path = require('path');

var files = path.normalize(path.join(__dirname, '..', 'files'));
var override = path.join(files, 'override');

module.exports = {
  files: files,
  override: override,
  eaccess: 'eaccess.json',
  invalid: 'invalid.json',
  ini: 'rc.ini',
  json: 'rc.json'
}
