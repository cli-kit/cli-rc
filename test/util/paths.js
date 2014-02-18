var path = require('path');

var files = path.normalize(path.join(__dirname, '..', 'files'));
var invalid = path.join(files, 'invalid.json');

module.exports = {
  files: files,
  invalid: invalid
}
