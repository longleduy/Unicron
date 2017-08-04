var passport = require('../config/passport');
var passport = require('passport');
var validator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var express = require('express');
var app = express();
app.use(validator());
exports.home = function (req, res, next) {
    res.redirect('/register');
}
exports.loginGet = function (req, res, next) {
    res.render('./user/login', { msgPass: req.flash('msgPass'), msgUser: req.flash('msgUser'), msgLogin: req.flash('msgLogin'), msgLoggedIn: req.flash('msgLoggedIn') });
}
exports.registerGet = function (req, res, next) {
    res.render('./user/register', { msgRegister: req.flash('msgRegister') });
}
exports.profile = function (req, res, next) {

    if (req.user.avatar == "") {
        var avat = 'avatar.jpg';
    }
    else {
        var avat = req.user.avatar;
    }
    console.log(avat);
    res.render('./user/profile', {
        User: req.user,
        avatar: avat,
        msgProfile: req.flash('msgProfile'),

    });

}
exports.edit = function (req, res, next) {
    if (req.user.avatar == "") {
        var avat = 'avatar.jpg'
    }
    else {
        var avat = req.user.avatar;
    }
    res.render('./user/edit', {
        User: req.user,
        avatar: avat
    })
}
exports.loginPost = function (req, res, next) {
    res.render('./user/profile');

}
exports.validate = function (req, res, next) {
    if (req.checkBody('username', req.flash('msgUser')).notEmpty()) {
        req.flash('msgUser', 'User name is not empty ');
      return  res.redirect('/login');
    }
    if (req.checkBody('password', req.flash('msgPass')).notEmpty()) {
        req.flash('msgPass', 'Pass name is not empty ');
     return   res.redirect('/login');


        // return;
    }
    else {
        next();
    }
}

