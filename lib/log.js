require('colors');

/**
 * Logs which are used in 'cli.js'
 * @param {String} source
 */
module.exports = {
    successMsg: function (source) {
        console.log('The TOC was ' + 'successfully'.bold.green + ' generated for the file ' + source.bold);
    },

    noTocCommentErr: function (source) {
        console.log('Can not find the HTML comment ' + '<!-- TOC -->'.bold.red + ' in the file ' + source.bold);
    }
};
