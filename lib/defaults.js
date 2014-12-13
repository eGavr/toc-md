var _ = require('lodash');

/**
 * Sets options
 * @param {Object} [options]
 * @param {Number} [options.maxDepth]
 * returns {Object}
 */
 module.exports = function (options) {
    return _.defaults(options || {}, {
        maxDepth: 6
    });
};
