var marked = require('marked'),
    utils = require('./utils'),
    EOL = require('os').EOL;

/**
 * Generates a TOC object
 * @param {String} source
 * @param {Object} [options]
 * @param {Number} [options.maxDepth]
 * @returns {Object}
 */
module.exports = function (source, options) {
    var toc = {
            index: -1,
            data: ''
        },
        maxDepth = options.maxDepth;

    var tocIndex = source.indexOf('<!-- TOC -->');

    if (tocIndex === -1) return toc;

    toc.index = tocIndex + '<!-- TOC -->'.length;
    toc.data = EOL;

    var tocSource = source.substring(toc.index),
        usedHeaders = [],
        cache = {};

    var tokens = marked.lexer(tocSource);

    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type !== 'heading') continue;

        var header = tokens[i];

        if (header.depth > maxDepth) continue;

        var href = utils.getHref(header.text);
        if (cache.hasOwnProperty(href)) {
            href += '-' + cache[href]++;
        } else {
            cache[href] = 1;
        }

        var tocElem = '- [' + header.text.replace(/\\/g, '\\\\') + '](#' + href + ')' + EOL,
            indent = utils.getIndent(usedHeaders, header.depth);

        usedHeaders.unshift({
            depth: header.depth,
            indent: indent
        });

        toc.data += indent + tocElem;
    }

    toc.data += EOL + '<!-- TOC END -->';

    return toc;
};
