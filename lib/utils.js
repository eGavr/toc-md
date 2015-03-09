/**
 * Returns a header according to a previous token
 * @param {String} headerText
 * @param {Object} prevToken
 * @returns {String}
 */
function getHeader(headerText, prevToken) {
    if (prevToken && prevToken.type === 'html') {
        var html = prevToken.text;

        if (html.match(/^<!-- TOC:ignore -->\n$/)) return '';

        var matched = html.match(/^<!-- TOC:display:(.+) -->\n$/);
        if (matched) return matched[1];
    }

    return headerText;
}

/**
 * Returns a href for a given header
 * @param {String} headerText
 * @returns {String}
 */
function getHref(headerText) {
    var href = headerText.replace(/( )/g, '-'),
        allowedChars = new RegExp('[A-Za-zА-Яа-яЁё0-9_\\- ]', 'g');

    href = href.match(allowedChars) || [];

    var _href = '';
    for (var i = 0; i < href.length; i++) {
        _href += href[i].match(/[A-Z]/) ? href[i].toLowerCase() : href[i];
    }

    return _href;
}

/**
 * Returns an indent of a given depth in a TOC
 * @param {Array} usedHeaders
 * @param {Number} currentDepth
 * @return {String}
 */
function getIndent(usedHeaders, currentDepth) {
    for (var i = 0; i < usedHeaders.length; i++) {
        if (usedHeaders[i].depth < currentDepth) {
            return usedHeaders[i].indent + '  ';
        }
    }

    return '';
}

module.exports = {
    getHeader: getHeader,
    getHref: getHref,
    getIndent: getIndent
};
