module.exports = {
    /**
     * Inserts a TOC object into a source
     * @param {String} source
     * @param {Object} [toc]
     * @param {Number} [toc.index]
     * @param {String} [toc.data]
     * @returns {String}
     */
    insert: function (source, toc) {
        if (toc.index === -1) return source;

        return source.substring(0, toc.index) + toc.data + source.substring(toc.index);
    },

    /**
     * Cleans a source from an existing TOC
     * @param {String} source
     * @returns {String}
     */
    clean: function (source) {
        var tocStartIndex = source.indexOf('<!-- TOC -->'),
            tocEndIndex = source.indexOf('<!-- TOC END -->', tocStartIndex);

        if (tocStartIndex === -1 || tocEndIndex === -1) return source;

        return source.substring(0, tocStartIndex + '<!-- TOC -->'.length) +
                source.substring(tocEndIndex + '<!-- TOC END -->'.length);
    }
};
