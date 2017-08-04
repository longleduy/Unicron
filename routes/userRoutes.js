var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var passport = require('../config/passport');
var isLoggedIn = require('../config/isLoggedIn');
var logout = require('../config/logout');

router.get('/', userController.home);
router.get('/login', userController.loginGet);

router.get('/register', isLoggedIn.isnotLoggined, userController.registerGet);
router.get('/profile', isLoggedIn.isLoggedIn, userController.profile);
router.get('/profile/edit/:id', isLoggedIn.isLoggedIn, userController.edit);
router.post('/login', userController.validate
    // req.checkBody('username').notEmpty();
    // var errors = req.validationErrors();
    // if (errors) {
    //     req.flash('msgUser', 'dsdsds')
    //     res.redirect('/login');
    //     // return;
    // }
    // else {
    //     next();
    // }
, passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));
router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));
router.post('/logout', logout.logout);

module.exports = router;