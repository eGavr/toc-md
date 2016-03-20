var _ = require('lodash'),
    parse5 = require('parse5');

/**
 * Returns a header according to a previous token
 * @param {String} headerText
 * @param {Object} prevToken
 * @returns {String}
 */
exports.getHeader = function (headerText, prevToken) {
    if (prevToken && prevToken.type === 'html') {
        var html = prevToken.text;

        if (html.match(/^<!-- TOC:ignore -->\n$/)) return '';

        var matched = html.match(/^<!-- TOC:display:(.+) -->\n$/);
        if (matched) return matched[1];
    }

    return headerText;
};

/**
 * @param {String} htmlText
 * @returns {String}
 */
exports.getAnchorFromHtml = function (htmlText) {
    var parsedFragment = parse5.parseFragment(htmlText).childNodes;

    var tagA = _.find(parsedFragment, { tagName: 'a' });
    if (!tagA) {
        return '';
    }

    var nameAttr = _.find(tagA.attrs, { name: 'name' });
    if (!nameAttr) {
        return '';
    }

    return nameAttr.value;
};

/**
 * @param {String} headerText
 * @returns {String}
 */
exports.getAnchorFromHeader = function (headerText) {
    var anchor = headerText.replace(/(<\/?[A-Za-z].*?>)/g, '').replace(/( )/g, '-'),
        allowedChars = new RegExp('[A-Za-zА-Яа-яЁё0-9_\\- ]', 'g');

    anchor = anchor.match(allowedChars) || [];

    var _anchor = '';
    for (var i = 0; i < anchor.length; i++) {
        _anchor += anchor[i].match(/[A-Z]/) ? anchor[i].toLowerCase() : anchor[i];
    }

    return _anchor;
};

/**
 * @param {String} str
 * @returns {Boolean}
 */
exports.isHtml = function (str) {
    return str.trim().indexOf('<') === 0;
};

/**
 * Returns an indent of a given depth in a TOC
 * @param {Array} usedHeaders
 * @param {Number} currentDepth
 * @return {String}
 */
exports.getIndent = function (usedHeaders, currentDepth) {
    for (var i = 0; i < usedHeaders.length; i++) {
        if (usedHeaders[i].depth < currentDepth) {
            return usedHeaders[i].indent + '  ';
        }
    }

    return '';
};
