var marked = require('marked'),
    utils = require('./utils');

module.exports = function (source) {
    var toc = {
        index: -1,
        data: '',
        headers: []
    };

    var tocMatch = source.match(/<!--( )*(toc|TOC)( )*-->/);

    if (!tocMatch) return toc;

    toc.index = tocMatch.index + tocMatch[0].length;
    toc.data = '\n';

    var tocSource = source.substring(toc.index),
        parsingIndex = toc.index,
        startDepth = -1,
        cache = {};

    var tokens = marked.lexer(tocSource);

    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'heading') {
            var header = tokens[i];

            startDepth === -1 && (startDepth = header.depth);

            var href = utils.getHref(header.text);
            if (cache.hasOwnProperty(href)) {
                href += '-' + cache[href]++;
            } else {
                cache[href] = 1;
            }

            var tocElem = '* <a href="#' + href + '">' + header.text + '</a>\n';
            toc.data += utils.getIndent(startDepth, header.depth) + tocElem;

            var headerRegExp = utils.getHeaderRegExp(header.text),
                matchedHeader = source.substring(parsingIndex).match(headerRegExp),
                headerIndex = matchedHeader.index + source.substring(0, parsingIndex).length;

            toc.headers.push({ index: headerIndex, href: '\n<a name="' + href + '"></a>' });

            parsingIndex = headerIndex + matchedHeader[0].length;
        }
    }

    return toc;
};
