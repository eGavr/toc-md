var specialSymbols = new RegExp('[^A-Za-zА-Яа-я0-9_\\- ]', 'g');

function _screenBackSlashes(text) {
    text = text.split('');

    for (var i = 0; i < text.length; i++) {
        if (text[i].match(specialSymbols)) {
            text[i] = '\\' + text[i];
        }
    }

    return text.join('');
}

function getHref(text) {
    var invalidSymbols = text.match(specialSymbols) || [];

    var href = text.toLowerCase().replace(/( )/g, '-').split('');

    for (var i = 0; i < invalidSymbols.length; i++) {
        href.splice(href.indexOf(invalidSymbols[i]), 1);
    }

    href = href.join('');

    return href ? href : 'href';
}

function getIndent(usedHeaders, depth) {
    for (var i = 0; i < usedHeaders.length; i++) {
        if (usedHeaders[i].depth < depth) {
            return usedHeaders[i].indent + '  ';
        }
    }

    return '';
}

function getHeaderRegExp(header) {
    var screenedHeader = _screenBackSlashes(header);

    return new RegExp('\\n(#+( )*' + screenedHeader + '( )*#*)|(( )*' + screenedHeader + '\\n(-|=)+' + ')\\n');
}

module.exports = {
    getHref: getHref,
    getIndent: getIndent,
    getHeaderRegExp: getHeaderRegExp
};
