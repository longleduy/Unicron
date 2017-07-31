var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    email: String,
    avatar: String
})
var User=mongoose.model('users',userSchema);
userSchema.methods.HashPass = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
userSchema.methods.validPass = function (password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports=User;