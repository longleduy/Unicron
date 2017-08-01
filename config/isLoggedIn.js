var passport=require('./passport');
var User=require('../models/user');

exports.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
        }
    else{
    req.flash('msgLoggedIn','You need to login first!')
    res.redirect('/login');
        
    }
}
exports.isnotLoggined=function(req,res,next){
    if(req.isAuthenticated()){
        req.flash('msgProfile','You need to logout first !');
        res.redirect('/profile');
    }
    else{
        return next();
    }
}