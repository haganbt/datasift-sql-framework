module.exports = function (db, cb) {
    db.load("./models-extra", function (err) {
        if (err) {
            return cb(err);
        }

        db.define('person', {
            name : String
        });

        return cb();
    });
};
