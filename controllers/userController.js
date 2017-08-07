var passport = require('../config/passport');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var passport = require('passport');
var validator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;

var upload = require('../config/imgesUpload');
var User = require('../models/user');

exports.home = function (req, res, next) {
    res.redirect('/login');
}
exports.loginGet = function (req, res, next) {
    sess = req.session;
    res.render('./user/login', { username: sess.username, password: sess.password, msgPass: req.flash('msgPass'), msgUser: req.flash('msgUser'), msgLogin: req.flash('msgLogin'), msgLoggedIn: req.flash('msgLoggedIn') });
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
        avatar: avat,
        msgedit:req.flash('msgedit')
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
        sess.password = req.body.password;
        req.flash('msgUser', 'User name and pass word is not empty ');
        res.redirect('login');
    }
    else {
        next();
    }
}
exports.upload = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            throw err;
        }
        else {
            var uploadavatar = { avatar: req.file.originalname };
            User.findOneAndUpdate({ username: req.user.username }, { $set: uploadavatar }, function (err, data) {
                if (err) {
                    throw err;
                }
                else {
                    var user = req.user.username;
                    res.redirect('/profile/edit/' + req.user.username)
                }
            })
        }
    })
}
exports.update = function (req, res, next) {
    if ((req.body.currentpass == '') || (req.body.newpass == '')) {
        var update1 = {
            profilename: req.body.profilename,
            age: parseInt(req.body.age),
            email: req.body.email
        }
        User.findOneAndUpdate({ username: req.user.username }, { $set: update1 }, function (err, data) {
            if (err) {
                throw err;
            }
            else {
                res.redirect('/profile');
            }
        })
    }
    else {

        bcrypt.compare(req.body.currentpass, req.user.password, function (err, valid) {
            if (valid == false) {
                req.flash('msgedit', 'Opp! Wrong pass word')
                res.redirect('/profile/edit/' + req.user.username);

            }
            else {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        throw err;
                    }
                    else {
                        bcrypt.hash(req.body.newpass, salt, null, function (err, hashPass) {
                            var update2 = {
                                profilename: req.body.profilename,
                                password: hashPass,
                                age: parseInt(req.body.age),
                                email: req.body.email,
                            }
                            User.findOneAndUpdate({ username: req.user.username }, { $set: update2 }, function (err, data2) {
                                res.redirect('/profile');
                            })
                        })
                    }
                })

            }
        })
    }



    // if (req.body.currentpass == '') {
    //     var update1 = {
    //         profilename: req.body.profilename,
    //         age: req.body.age,
    //         emial: req.body.email
    //     }
    //     User.findOneAndUpdate({ username: req.user.username }, { $set: update1 }, function (err, data) {
    //         console.log('Update');
    //         res.redirect('/profile');
    //     })
    // }
    // else {
    //     bcrypt.genSalt(10, function (err, salt) {
    //         bcrypt.hash(req.body.currentpass, salt, function (err, hash) {
    //             var update2 = {
    //                 profilename: req.body.profilename,
    //                 password: hash,
    //                 age: req.body.age,
    //                 emial: req.body.email
    //             }
    //             User.findOneAndUpdate({ username: req.user.username }, { $set: update2 }, function (err, data) {
    //                 console.log('Update');
    //                 res.redirect('/profile');
    //             })
    //         })
    //     })



    // }

}

