var path = require('path'),
    vfs = require('vow-fs'),
    promisify = require('vow-node').promisify,
    toc = promisify(require('./index')),
    defaults = require('./defaults'),
    log = require('./log');

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
    .arg()
        .name('source')
        .title('Path to an input markdown file (it must contain the HTML comment ' + '<!-- TOC -->'.bold + ')')
        .req()
        .end()
    .arg()
        .name('target')
        .title('Path to an output markdown file')
        .end()
    .act(function (opts, args) {
        return vfs.read(path.resolve(args.source), 'utf-8')
            .then(function (source) {
                var options = defaults(opts);
                return toc(source, options)
                    .then(function (res) {
                        if (source !== res) {
                            return vfs.write(path.resolve(args.target ? args.target : args.source), res)
                                .then(function () {
                                    log.successMsg(args.source);
                                });
                        } else if (source.indexOf('<!-- TOC -->') === -1) {
                            log.noTocCommentErr(args.source);
                        } else {
                            log.successMsg(args.source);
                        }
                    });
            })
            .fail(function (err) {
                console.log(err);
            });
    })
    .run(process.argv.slice(2));
