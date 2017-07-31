var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/mongdb_nodejs",{
    useMongoClient:true,
})
var db=mongoose.connection;
db.on('err',function(){
    console.log("Fail to connect");
})
db.once('open',function(){
    console.log('MongoDB is connecting....');
})
module.exports=db;