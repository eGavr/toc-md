var _ = require('lodash');

 module.exports = function (options) {
    return _.defaults(options || {}, {
        ignoreFirstHeader: false,
        maxDepth: 6
    });
};
