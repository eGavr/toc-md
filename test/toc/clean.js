var assert = require('assert');

var readFiles = require('./test-utils').readFiles,
    toc = require('../../lib/index');

describe('TOC clean', function () {
    it('must clean a simple TOC', function (done) {
        var files = readFiles('simple');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                assert.equal(res, files.md);
                done();
            }
        });
    });

    it('must not clean a TOC', function (done) {
        var files = readFiles('no-toc');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                assert.equal(res, files.md);
                done();
            }
        });
    });
});
