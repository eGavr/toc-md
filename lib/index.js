var getToc = require('./toc');

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

module.exports = function (source, cb) {
    try {
        cb(null, insertToc(source, getToc(source)));
    } catch (err) {
        cb(err, null);
    }
};
