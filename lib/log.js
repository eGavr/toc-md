/**
 * Logs which are used in 'cli.js'
 */
module.exports = {
    successInsertMsg: function () {
        console.log('The TOC was ' + 'successfully'.bold.green + ' inserted.');
    },

    successCleanMsg: function () {
        console.log('The TOC was ' + 'successfully'.bold.green + ' cleaned.');
    },

    noTocCommentErr: function () {
        console.error('A TOC generation ' + 'failed'.bold.red +
            '. Can not find the HTML comment ' + '<!-- TOC -->'.bold.red + '.');
    },

    noFileErr: function (filepath) {
        console.error('A TOC generation ' + 'failed'.bold.red +
            '. Can not open file ' + filepath.underline + '.');
    }
};
