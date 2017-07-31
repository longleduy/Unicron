var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var passport = require('../config/passport');

router.get('/home', userController.home);
router.get('/login', userController.loginGet);
router.get('/register', userController.registerGet);
router.get('/profile', userController.profile);

router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))
router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}))

module.exports = router;