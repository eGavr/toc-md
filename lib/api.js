var EOL = require('os').EOL,
    TOC_COMMENT = '<!-- TOC -->',
    TOC_END_COMMENT = '<!-- TOC END -->';

module.exports = {
    /**
     * @typedef {Object} TOC
     * @property {Number} index
     * @property {String} data
     */

    /**
     * Inserts a TOC object into a source
     * @param {String} source
     * @param {TOC} toc
     * @returns {String}
     */
    insert: function (source, toc) {
        if (toc.index === -1) return source;

        return source.substring(0, toc.index) + EOL + toc.data + EOL + TOC_END_COMMENT + source.substring(toc.index);
    },

    /**
     * Cleans a source from an existing TOC
     * @param {String} source
     * @returns {String}
     */
    clean: function (source) {
        var tocStartIndex = source.indexOf(TOC_COMMENT),
            tocEndIndex = source.indexOf(TOC_END_COMMENT, tocStartIndex);

        if (tocStartIndex === -1 || tocEndIndex === -1) return source;

        return source.substring(0, tocStartIndex + TOC_COMMENT.length) +
                source.substring(tocEndIndex + TOC_END_COMMENT.length);
    }
};
