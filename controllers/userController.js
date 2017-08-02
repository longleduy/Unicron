var passport = require('../config/passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User=require('../models/user');
exports.home = function (req, res, next) {
    res.redirect('/register');
}
exports.loginGet = function (req, res, next) {
    res.render('./user/login', { msgLogin: req.flash('msgLogin'), msgLoggedIn: req.flash('msgLoggedIn') });
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
        msgProfile:req.flash('msgProfile'),
        tp:'submit'
    });

}
exports.loginPost = function (req, res, next) {
    res.render('./user/profile');


}
