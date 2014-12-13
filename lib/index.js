var getToc = require('./toc'),
    defaults = require('./defaults');

/**
 * Inserts a TOC object into a source
 * @param {String} source
 * @param {Object} [toc]
 * @param {Number} [toc.index]
 * @param {String} [toc.data]
 * @param {Array}  [toc.headers]
 * @param {Object} [toc.headers[i]]
 * @param {Number} [toc.headers[i].index]
 * @param {String} [toc.headers[i].href]
 * @returns {String}
 */
function insertToc(source, toc) {
    if (toc.index === -1) return source;

    source = source.substring(0, toc.index) + toc.data + source.substring(toc.index);

    var shift = toc.data.length,
        headers = toc.headers;

    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        source = source.substring(0, header.index + shift) + header.href + source.substring(header.index + shift);
        shift += header.href.length;
    }

    return source;
}

/**
 * Generates a TOC (Table Of Contents) for a given source from a place where the HTML comment <!-- TOC --> was found
 * @param {String} source
 * @param {Object} [opts]
 * @param {Number} [opts.maxDepth]
 * @param {Function} cb
 */
module.exports = function (source, opts, cb) {
    var callback,
        options;

    if (arguments.length === 2) {
        options = {};
        callback = opts;
    } else {
        options = defaults(opts);
        callback = cb;
    }

    try {
        callback(null, insertToc(source, getToc(source, options)));
    } catch (err) {
        callback(err, null);
    }
};
