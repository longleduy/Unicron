var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var passport = require('../config/passport');
var isLoggedIn = require('../config/isLoggedIn');
var logout = require('../config/logout');
// var adminController=require('../controllers/adminController');
import {admin} from '../controllers/adminController';

router.get('/', userController.home);
router.get('/login', userController.loginGet);

router.get('/register', isLoggedIn.isnotLoggined, userController.registerGet);
router.get('/profile',isLoggedIn.isLoggedIn, userController.profile);
router.get('/profile/edit/:id', isLoggedIn.isLoggedIn, userController.edit);

router.post('/login', userController.validate, passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));
router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));
router.post('/upload',userController.upload);
router.post('/update',userController.update);
router.post('/logout', logout.logout);
router.get('/promise',function(req,res,next){
    res.render('promise');
})
module.exports = router;