var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);

    })
})
//Login
passport.use('login', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

},
    function (req, username, password, done) {
        process.nextTick(function () {
            User.findOne({ 'username': username }, function (err, user) {
                if (err) {
                    console.log('Failed')
                }
                if (!user) {
                    return done(null, false, req.flash('msgLogin', 'No user found with user name ' + username));
                }
                if (!user.validPass(password)) {
                    return done(null, false, req.flash('msgLogin', 'Oops! Wrong pass word !'));
                }
                else {
                    return done(null, user, req.flash('msgProfile', 'Hi! ' + username + ' ' + '. Welcome to Unicron'));
                }
            })
        })
    }
))
//register
passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, username, password, done) {

        process.nextTick(function () {
            User.findOne({ 'username': username }, function (err, data) {
                if (err) {
                    return done(err);

                }
                if (data) {
                    return done(null, false, req.flash('msgRegister', username + ' already exits'));
                }
                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.hashpass(password);
                    newUser.profilename=username;
                    newUser.age = parseInt(req.body.age);
                    newUser.email = req.body.email;
                    newUser.avatar = req.body.avatar;
                    newUser.save(function (err, result) {
                        if (err) {
                            return done(err);
                        }
                        else {
                            return done(null, newUser, req.flash('msgLoggedIn', 'Hi!' + ' ' + username + ' ' + 'You are registered successfully'));
                        }
                    })
                }
            })
        })
    }
))

module.exports = passport;