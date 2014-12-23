var specialSymbols = new RegExp('[^A-Za-zА-Яа-яЁё0-9_\\- ]', 'g');

/**
 * Returns a href for a given header which should be added in a TOC element
 * @param {String} headerText
 * @returns {String}
 */
function getHref(headerText) {
    var invalidSymbols = headerText.match(specialSymbols) || [];

    var href = headerText.replace(/( )/g, '-').split('');

    for (var i = 0; i < invalidSymbols.length; i++) {
        href.splice(href.indexOf(invalidSymbols[i]), 1);
    }

    var _href = '';
    for (i = 0; i < href.length; i++) {
        _href += href[i].match(/[A-Z]/g) ? href[i].toLowerCase() : href[i];
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
    getHref: getHref,
    getIndent: getIndent
};
