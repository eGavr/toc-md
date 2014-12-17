var readFiles = require('./mocks/read'),
    toc = require('../../lib/index');

describe('TOC clean', function () {
    it('must clean a simple TOC', function (done) {
        var files = readFiles('simple');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files.md);
                done();
            }
        });
    });

    it('must clean a nested TOC', function (done) {
        var files = readFiles('nested');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files.md);
                done();
            }
        });
    });

    it('must clean a russian TOC', function (done) {
        var files = readFiles('ru');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files.md);
                done();
            }
        });
    });

    it('must clean a TOC with duplicate headers\' names', function (done) {
        var files = readFiles('duplicate');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files.md);
                done();
            }
        });
    });

    it('must clean a TOC with different headers\' types', function (done) {
        var files = readFiles('different-types');

        toc.clean(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files.md);
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
                res.must.be.equal(files.md);
                done();
            }
        });
    });
});
