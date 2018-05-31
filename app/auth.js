const Strategy = require('passport-local').Strategy;
const passport = require('passport');
const path = require('path');
var bcrypt = require('bcrypt');
const adminControllers = require('./controllers/adminControllers');
module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new Strategy(function(username, password, cb) {
            adminControllers.findByUsername(username, async function(err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    return cb(null, false);
                }
                if (!await bcrypt.compare(password, user.password)) {
                    return cb(null, false);
                }
                return cb(null, user);
            });
        })
    );
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function(id, cb) {
        adminControllers.findById(id, function(err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });

    app.get('/login', function(req, res) {
        res.sendFile('login.html', { root: path.join(__dirname, '../public') });
    });
    app.post('/login', passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));
};
