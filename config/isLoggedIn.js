var passport = require('./passport');
var User = require('../models/user');
var validator = require('express-validator');
var session=require('express-session');
exports.isLoggedIn = function (req, res, next) {
    var sesstp=req.session;
    if (req.isAuthenticated()) {
       if(req.user.admin == '1'){
        sesstp.tp="submit";
      
       }
       else{
        sesstp.tp="";
        
       }
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
