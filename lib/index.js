var getToc = require('./toc'),
    defaults = require('./defaults');

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
