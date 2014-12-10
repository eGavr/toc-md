function _screenBackSlashes(text) {
    text = text.split('');

    for (var i = 0; i < text.length; i++) {
        if (text[i].match(/[^A-Za-zА-Яа-я0-9_\- ]/)) {
            text[i] = '\\' + text[i];
        }
    }

    return text.join('');
}

function getHref(text) {
    var invalidSmbols = text.match(/[^A-Za-zА-Яа-я0-9_\- ]/g) || [];

    var href = text.toLowerCase().replace(/( )/g, '-').split('');

    for (var i = 0; i < invalidSmbols.length; i++) {
        href.splice(href.indexOf(invalidSmbols[i]), 1);
    }

    return href.join('');
}

function getIndent(startDepth, depth) {
    if (depth < startDepth) {
        return '';
    } else {
        return new Array(((depth - startDepth) * 2) + 1).join(' ');
    }
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
