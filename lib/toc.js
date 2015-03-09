var EOL = require('os').EOL,
    inherit = require('inherit'),
    utils = require('./utils'),
    TOC_COMMENT = '<!-- TOC -->';

/**
 * @name Toc
 * @class
 */
module.exports = inherit({
    /**
     * Constructor
     * @param {String} source
     * @param {Object} [options]
     * @param {Number} [options.maxDepth]
     * @param {Char}   [options.bullet]
     */
    __constructor: function (source, options) {
        this.index = this._geIndex(source);
        this.data = '';
        this.options = options;
        this._cache = {};
        this._usedHeaders = [];
    },

    /**
     * Adds a TOC elemet
     * @param {Object} [header]
     * @param {Number} [header.depth]
     * @param {String} [header.text]
     * @returns {undefined}
     * @public
     */
    addTocElem: function (header, prevToken) {
        var options = this.options;

        if (header.depth > options.maxDepth) return;

        var headerText = utils.getHeader(header.text, prevToken);

        if (!headerText) return;

        var href = this._getHref(header.text),
            indent = utils.getIndent(this._usedHeaders, header.depth);

        this._usedHeaders.unshift({
            depth: header.depth,
            indent: indent
        });

        this.data += indent + options.bullet + ' [' + headerText.replace(/\\/g, '\\\\') + '](#' + href + ')' + EOL;
    },

    /**
     * Returns an index of a TOC in a source
     * @returns {Number}
     * @public
     */
    getIndex: function () {
        return this.index;
    },

    /**
     * Returns a TOC data
     * @returns {String}
     * @public
     */
    getData: function () {
        return this.data;
    },

    /**
     * Returns an index of a TOC in a source
     * @param {String} source
     * @returns {Number}
     * @private
     */
    _geIndex: function (source) {
        var tocIndex = source.indexOf(TOC_COMMENT);

        return tocIndex !== -1  ? tocIndex + TOC_COMMENT.length : -1;
    },

    /**
     * Returns a href for a given header
     * @param {String} headerText
     * @returns {String}
     */
    _getHref: function (headerText) {
        var href = utils.getHref(headerText);

        if (this._cache.hasOwnProperty(href)) {
            href += '-' + this._cache[href]++;
        } else {
            this._cache[href] = 1;
        }

        return href;
    }
});
