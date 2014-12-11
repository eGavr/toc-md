var path = require('path'),
    vfs = require('vow-fs'),
    toc = require('./index'),
    defaults = require('./defaults');

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
        vfs.read(path.resolve(args.source), 'utf-8')
            .then(function (source) {
                var options = defaults(opts);

                toc(source, options, function (err, res) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    var successLog = 'The TOC was '.bold.grey +
                            'successfully'.bold.green + ' generated for the file '.bold.grey + args.source.bold,
                        failLog = 'Can not find the HTML comment '.bold.grey +
                            '<!-- TOC -->'.bold.red + ' in the file '.bold.grey + args.source.bold;

                    if (source !== res) {
                        vfs.write(path.resolve(args.target ? args.target : args.source), res)
                            .then(function () {
                                console.log(successLog);
                            });
                    } else {
                        console.log(failLog);
                    }
                });
            });
    })
    .run(process.argv.slice(2));
