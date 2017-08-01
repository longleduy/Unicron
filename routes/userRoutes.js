var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var passport = require('../config/passport');
var isLoggedIn=require('../config/isLoggedIn');

router.get('/home', userController.home);
router.get('/login',isLoggedIn.isnotLoggined, userController.loginGet);
router.get('/register',isLoggedIn.isnotLoggined, userController.registerGet);
router.get('/profile',isLoggedIn.isLoggedIn, userController.profile);

router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));
router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;