var api = require('./api'),
    getToc = require('./generate'),
    defaults = require('./defaults');

module.exports = {
    /**
     * Inserts a TOC object into a source
     * @param {String} source
     * @param {Object} [opts]
     * @param {Number} [opts.maxDepth]
     * @param {Char}   [opts.bullet]
     * @param {Function} cb
     */
    insert: function (source, opts, cb) {
        var callback,
            options;

        if (arguments.length === 2) {
            options = defaults();
            callback = opts;
        } else {
            options = defaults(opts);
            callback = cb;
        }

        try {
            source = api.clean(source);
            callback(null, api.insert(source, getToc(source, options)));
        } catch (err) {
            callback(err, null);
        }
    },

    /**
     * Cleans a source from an existing TOC
     * @param {String} source
     * @param {Function} callback
     */
    clean: function (source, callback) {
        try {
            callback(null, api.clean(source));
        } catch (err) {
            callback(err, null);
        }
    }
};
