var path = require('path'),
    _ = require('lodash'),
    vfs = require('vow-fs'),
    promisify = require('vow-node').promisify,
    toc = require('./index'),
    tocInsert = promisify(toc.insert),
    tocClean = promisify(toc.clean),
    log = require('./log'),
    TOC_COMMENT = '<!-- TOC -->';

require('colors');

module.exports = require('coa').Cmd()
    .name(process.argv[1])
    .helpful()
    .title('Generates a markdown TOC (table of contents)')
    .opt()
        .name('version')
        .title('Shows the version number')
        /*jshint -W024 */
        .short('v').long('version')
        .flag()
        .only()
        .act(function () {
            var p = require('../package.json');
            return p.name + ' ' + p.version;
        })
        .end()
    .opt()
        .name('maxDepth')
        .title('Uses headings whose depth is at most the specified value (default: 6)')
        .long('max-depth')
        .short('m')
        .def(6)
        .val(function (val) {
            /*jshint es3:false */
            return parseInt(val);
        })
        .end()
    .opt()
        .name('bullet')
        .title('The bullet (\'*\', \'-\', \'+\') to use for each element in the generated TOC (defaults: \'-\')')
        .long('bullet')
        .short('b')
        .def('-')
        .end()
    .opt()
        .name('clean')
        .title('Cleans a TOC')
        .long('clean')
        .short('c')
        .flag()
        .end()
    .arg()
        .name('source')
        .title('Path to an input markdown file (it must contain the HTML comment ' + TOC_COMMENT.bold + ')')
        .req()
        .end()
    .arg()
        .name('target')
        .title('Path to an output markdown file')
        .end()
    .act(function (opts, args) {
        var target = path.resolve(args.target ? args.target : args.source);
        return vfs.read(path.resolve(args.source), 'utf-8')
            .then(function (source) {
                if (opts.clean) return tocClean(source);

                if (source.indexOf(TOC_COMMENT) === -1) return 'NO TOC COMMENT';

                var options = _.pick(opts, ['maxDepth', 'bullet']);
                return tocInsert(source, options);
            })
            .then(function (res) {
                if (res === 'NO TOC COMMENT') return log.noTocCommentErr();

                return vfs.write(target, res)
                    .then(function () {
                        opts.clean ? log.successCleanMsg() : log.successInsertMsg();
                    });
            })
            .fail(function (err) {
                console.log(err);
            });
    })
    .run(process.argv.slice(2));
