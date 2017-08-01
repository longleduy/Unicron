var passport=require('./passport');
exports.logout=function(req,res,next){
    req.logout();
    res.redirect('/login');
}