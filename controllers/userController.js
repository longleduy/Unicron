var passport = require('../config/passport');
var session = require('express-session');
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
    // sess2=req.session;
    sess = req.session;
    
    // var user=sess2.username
    res.render('./user/login', { username: sess.username,password:sess.password, msgPass: req.flash('msgPass'), msgUser: req.flash('msgUser'), msgLogin: req.flash('msgLogin'), msgLoggedIn: req.flash('msgLoggedIn') });
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
    var sess;
 
    sess = req.session;
    sess.username = req.body.username;
    

    req.checkBody('username', req.flash('msgUser')).notEmpty();
    req.checkBody('password', req.flash('msgUser')).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        sess.password=req.body.password;
        req.flash('msgUser', 'User name and pass word is not empty ');
        res.redirect('login');
        // return;
    }
    else {
        next();
    }
}

