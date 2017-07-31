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
                    console.log(err)
                }
                if (!user) {
                    return done(null, false, req.flash('msgLogin', 'No user found with user name ' + username));
                }
                if (!user.validPass(password)) {
                    return done(null, false, req.flash('msgLogib', 'Oops! Wrong pass word !'));
                }
                else {
                    return (null, user);
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
                    throw err;
                }
                if (data) {
                    return (null, false, req.flash('msgRegister', username + ' already exits'));
                }
                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.hashPass(password);
                    newUser.age = parseInt(req.body.age);
                    newUser.email = req.body.email;
                    newUser.avatar = req.body.avatar;
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return done(null, newUser);
                        }
                    })
                }
            })
        })
    }
))
module.exports=passport;