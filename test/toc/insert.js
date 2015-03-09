var readFiles = require('./mocks/read'),
    toc = require('../../lib/index');

describe('TOC insert', function () {
    it('must insert a simple TOC', function (done) {
        var files = readFiles('simple');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must insert a nested TOC', function (done) {
        var files = readFiles('nested');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must insert a russian TOC', function (done) {
        var files = readFiles('ru');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must insert a TOC with duplicate headers\' names', function (done) {
        var files = readFiles('duplicate');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must insert a TOC with different headers\' types', function (done) {
        var files = readFiles('different-types');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must not insert a TOC', function (done) {
        var files = readFiles('no-toc');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must work \'maxDepth\' option', function (done) {
        var files = readFiles('max-depth');

        toc.insert(files.md, { maxDepth: 3 }, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must work \'bullet\' option', function (done) {
        var files = readFiles('bullet');

        toc.insert(files['toc-md'], { bullet: '*' }, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must handle headers with \'special characters\'', function (done) {
        var files = readFiles('special-characters');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must handle invalid structure of headers', function (done) {
        var files = readFiles('invalid-structure');

        toc.insert(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must handle sources which already contain a TOC', function (done) {
        var files = readFiles('nested');

        toc.insert(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must ignore a header', function (done) {
        var files = readFiles('ignore-header');

        toc.insert(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });

    it('must change a displaying of a header', function (done) {
        var files = readFiles('display-header');

        toc.insert(files['toc-md'], function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['toc-md']);
                done();
            }
        });
    });
});
