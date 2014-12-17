var api = require('./api'),
    getToc = require('./toc'),
    defaults = require('./defaults');

module.exports = {
    insert: function (source, opts, cb) {
        var callback,
            options;

        if (arguments.length === 2) {
            options = {};
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

    clean: function (source, callback) {
        try {
            callback(null, api.clean(source));
        } catch (err) {
            callback(err, null);
        }
    }
};
