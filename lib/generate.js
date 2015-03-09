var marked = require('marked'),
    Toc = require('./toc');

/**
 * @typedef {Object} TOC
 * @property {Number} index
 * @property {String} data
 */

/**
 * Generates a TOC object
 * @param {String} source
 * @param {Object} [options]
 * @param {Number} [options.maxDepth]
 * @param {Char}   [options.bullet]
 * @returns {TOC}
 */
module.exports = function (source, options) {
    var toc = new Toc(source, options),
        tocIndex = toc.getIndex();

    if (tocIndex === -1) return { index: -1, data: '' };

    var tocSource = source.substring(tocIndex),
        tokens = marked.lexer(tocSource),
        prevToken;

    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'heading') {
            var header = tokens[i];
            toc.addTocElem(header, prevToken);
        }

        prevToken = tokens[i];
    }

    return {
        index: toc.getIndex(),
        data: toc.getData()
    };
};
