var passport = require('../config/passport');
exports.home = function (req, res, next) {
    req.redirect('/login');
}
exports.loginGet = function (req, res, next) {
    res.render('./user/login', { msgLogin: req.flash('msgLogin') });
}
exports.registerGet = function (req, res, next) {
    res.render('./user/register', { msgRegister: req.flash('msgRegister') });
}
exports.profile = function (req, res, next) {
    res.render('./user/profile');
}
