module.exports = {
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
    insert: function (source, toc) {
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

        source = source.substring(0, tocStartIndex + '<!-- TOC -->'.length) +
                source.substring(tocEndIndex + '<!-- TOC END -->'.length);

        return source.replace(/<!-- TOC ELEMENT -->\r?\n<a name=".+"><\/a>\r?\n/g, '');
    }
};
