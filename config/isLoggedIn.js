var passport = require('./passport');
var User = require('../models/user');
var validator = require('express-validator');
exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        var tp = 'submit';
        return next();
    }
    else {
        req.flash('msgLoggedIn', 'You need to login first!')
        res.redirect('/login');
    }
}
exports.isnotLoggined = function (req, res, next) {
    if (req.isUnauthenticated()) {
        return next();
    }
    else {
        req.flash('msgProfile', 'You need to logout first !');
        res.redirect('/profile');
    }
}