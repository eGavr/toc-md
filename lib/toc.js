var marked = require('marked'),
    utils = require('./utils');

/**
 * Generates a TOC object
 * @param {String} source
 * @param {Object} [options]
 * @param {Number} [options.maxDepth]
 * @returns {Object} [toc]
 * @returns {Number} [toc.index]
 * @returns {String} [toc.data]
 * @returns {Array}  [toc.headers]
 * @returns {Number} [toc.headers[i].index]
 * @returns {String} [toc.headers[i].href]
 */
module.exports = function (source, options) {
    var toc = {
            index: -1,
            data: '',
            headers: []
        },
        maxDepth = options.maxDepth;

    var tocMatch = source.match(/<!--( )*(toc|TOC)( )*-->/);

    if (!tocMatch) return toc;

    toc.index = tocMatch.index + tocMatch[0].length;
    toc.data = '\n';

    var tocSource = source.substring(toc.index),
        parsingIndex = toc.index,
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

        var tocElem = '* <a href="#' + href + '">' + header.text.replace(/\\/g, '\\\\') + '</a>\n',
            indent = utils.getIndent(usedHeaders, header.depth);

        usedHeaders.unshift({
            depth: header.depth,
            indent: indent
        });

        toc.data += indent + tocElem;

        var headerRegExp = utils.getHeaderRegExp(header.text),
            matchedHeader = source.substring(parsingIndex).match(headerRegExp),
            headerIndex = matchedHeader.index + source.substring(0, parsingIndex).length;

        toc.headers.push({ index: headerIndex, href: '\n<a name="' + href + '"></a>' });

        parsingIndex = headerIndex + matchedHeader[0].length;
    }

    return toc;
};
