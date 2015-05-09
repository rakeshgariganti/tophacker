/**
 * Created by rakesh on 15/1/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var challengeSchema = new mongoose.Schema({
    title:String,
    description:String,
    enable:{type:Boolean,default:false},
    startsat:String,
    endsat:String,
    problems:[
        {
            title:String,
            description:String,
            sinput:String,
            soutput:String,
            testcases:[{
                input:String,
                output:String
            }],
            solution:{type:String,dafault:""},
            solvedby:[Schema.Types.ObjectId],
            attemptedby:{type:Number,default:0}
    }]
});

module.exports=mongoose.model('Challenge',challengeSchema);
