var fs = require('fs');

exports.readFiles = function (f) {
    return {
        md: fs.readFileSync('test/toc/fixtures/md/' + f + '.md', 'utf-8'),
        'toc-md': fs.readFileSync('test/toc/fixtures/toc-md/' + f + '.md', 'utf-8')
    };
};
