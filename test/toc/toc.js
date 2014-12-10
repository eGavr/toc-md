var fs = require('fs'),
    toc = require('../../lib/index');

function readFiles(f) {
    var files = {};

    files.md = fs.readFileSync('test/toc/fixtures/md/' + f + '.md', 'utf-8');
    files['md-toc'] = fs.readFileSync('test/toc/fixtures/md-toc/' + f + '.md', 'utf-8');

    return files;
}

describe('TOC generation', function () {
    it('must generate a simple TOC', function (done) {
        var files = readFiles('simple');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must generate a TOC with duplicate headers\' names', function (done) {
        var files = readFiles('duplicate');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });
});
