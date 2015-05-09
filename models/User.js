var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname:{type:String,uppercase:true,required:true},
    lastname:{type:String,required:true},
    username: { type: String, unique: true, lowercase: true,required:true},
    password: { type: String,required:true},
    gender:String,
	avatar:String,
    solved:Number
});



module.exports=mongoose.model('User',userSchema);
