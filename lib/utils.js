var specialSymbols = new RegExp('[^A-Za-zА-Яа-я0-9_\\- ]', 'g');

/**
 * Screens backslashes for special symbols
 * @param {String} text
 * @returns {String}
 */
function _screenBackSlashes(text) {
    text = text.split('');

    for (var i = 0; i < text.length; i++) {
        if (text[i].match(specialSymbols)) {
            text[i] = '\\' + text[i];
        }
    }

    return text.join('');
}

/**
 * Returns a href for a given header which should be added in a TOC element
 * @param {String} headerText
 * @returns {String}
 */
function getHref(headerText) {
    var invalidSymbols = headerText.match(specialSymbols) || [];

    var href = headerText.toLowerCase().replace(/( )/g, '-').split('');

    for (var i = 0; i < invalidSymbols.length; i++) {
        href.splice(href.indexOf(invalidSymbols[i]), 1);
    }

    href = href.join('');

    return href ? href : 'href';
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

/**
 * Returns a regular expression which matches a given header
 * @param {String} headerText
 * @returns {RegExp}
 */
function getHeaderRegExp(headerText) {
    var screenedHeader = _screenBackSlashes(headerText);

    // jscs:disable
    return new RegExp('(\\r?\\n#+( )*' + screenedHeader + '( )*#*)|(\\r?\\n( ){0,3}' + screenedHeader + '( )*\\r?\\n(-|=)+( )*)\\r?(\\n|$)');
}

module.exports = {
    getHref: getHref,
    getIndent: getIndent,
    getHeaderRegExp: getHeaderRegExp
};
