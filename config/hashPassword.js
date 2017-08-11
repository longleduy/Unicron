var bcrypt=require('bcrypt-nodejs');
var hashPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}
module.exports=hashPassword;