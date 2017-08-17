import User from '../models/user';
export var admin = (req, res, next) => {
    User.find((err, list) => {
        if (err) {
            throw err;
        }
        else {
            res.render('./admin/viewList',{listUser:list});
        }
    })
}

export var del = (req,res,next)=>{
    
        User.findOneAndRemove({username:req.params.username},(err,data)=>{
            if(err){
                console.log('Loi');
            }
            else{
                console.log("Romoved",data);
                return res.redirect('/admin');
            }
        })
    
}
export var setadmin = (req,res,next)=>{
    User.findOneAndUpdate({username:req.params.username},{$set:{admin:'isAdmin'}},(err,result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(req.params.username +''+'now is admin');
            return res.redirect('/admin');
        }
    })
}
export var removeadmin = (req,res,next)=>{
    User.findOneAndUpdate({username:req.params.username},{$set:{admin:'member'}},(err,member)=>{
        if(err){
            throw err;
        }
        else{
            console.log('Remove admin of:'+' '+req.params.username);
            return res.redirect('/admin');
        }
    })
}

