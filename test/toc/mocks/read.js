var fs = require('fs');

module.exports = function (f) {
    var files = {};

    files.md = fs.readFileSync('test/toc/fixtures/md/' + f + '.md', 'utf-8');
    files['toc-md'] = fs.readFileSync('test/toc/fixtures/toc-md/' + f + '.md', 'utf-8');

    return files;
};
