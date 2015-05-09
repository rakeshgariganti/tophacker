/**
 * Created by rakesh on 15/1/15.
 */

var Challenge=require('../models/Challenge');
var User = require('../models/User');

exports.index=function(req,res){
    Challenge.findOne(function (err, data) {
        if(err){return next(err)}
        if(data){
            console.log(data);
            res.render('weeklychallenge',{title:data.title+" Challenge | Top Hacker",data:data});
        }
        else{
            res.render('weeklychallenge',{title:'Weekly challenge | Top Hacker',data:false});
        }
    });
};

exports.getchallenge=function(req,res,next){
    var probid=req.params.id;
    Challenge.findOne(function (err,challenge) {
       if(err){next(err)}
        var prob=challenge.problems.id(probid);
        var solved=prob.solvedby.indexOf(req.session.user._id)>=0;
        var title=prob.title+" | Top Hacker";
        res.render('challenge',{title:title,data:prob,solved:solved});
    });
};

exports.getsolve= function (req, res) {
    var probid=req.params.id;
    Challenge.findOne(function (err,challenge) {
        if (err) {
            next(err)
        }
        var prob = challenge.problems.id(probid);
        var solved=prob.solvedby.indexOf(req.session.user._id)>=0;
        if (prob == null || solved) {
            req.flash("info",{msg:'Already solved'});
            return res.redirect("/challenge/" + probid);
        }
        var generateRandomInt=function(size) {
            return Math.floor((Math.random() * size));
        };
        var randomtestcase=generateRandomInt(5);
        var testcase=prob.testcases[randomtestcase].input;
        req.session[probid]=randomtestcase;
        res.render('solve',{title:prob.title,data:prob,testcase:testcase});
    });
};

exports.postsolve= function (req, res) {

    var probid=req.params.id;
    var output=req.body.output;
    Challenge.findOne(function (err,challenge) {
        if(err){next(err)}
        var prob=challenge.problems.id(probid);
        var solved=prob.solvedby.indexOf(req.session.user._id)>=0;
        if(prob==null || solved){
            return res.redirect("/challenge/"+probid);
        }
        var correctop=prob.testcases[req.session[probid]].output;
        if(output==correctop){
            prob.solvedby.push(req.session.user._id);
            prob.attemptedby++;
            challenge.markModified('problems');
            challenge.save(function (data) {
                req.flash('success',{msg:'Accepted'});
                console.log(data);
                return res.redirect("/challenge/"+probid);
            });
        }
        else{
            prob.attemptedby++;
            challenge.markModified('problems');
            challenge.save(function (data) {
                req.flash('errors',{msg:'Wrong Answer'});
                res.redirect("/challenge/"+probid);
            });

        }
    });
};

