/**
 * Created by rakesh on 15/1/15.
 */

var mongoose = require('mongoose');
var User = require('../models/User');
var crypto=require('crypto');
var fs=require('fs');
var secret=require('../secret');

exports.getlogin=function(req,res){
    res.render('login',{title:'Login'})
};

exports.postlogin=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    if(username=="admin" && password==secret.pass){
        req.session.admin=true;
        return res.redirect('/admin/challenge/add');
    }
    else{
        if(req.session.loggedin){
            return res.redirect('/');
        }
    }
    User.findOne({username:username}, function (err, user) {
        if(err)return next(err);
        if(user){
            if(user.password==exports.whatIsHash(password)){
                req.session.loggedin=true;
                req.session.user=user;
                req.flash('success',{msg:':) '});
                res.redirect('/');
            }
            else{
                req.flash('errors',{msg:'Wrong creds :/'});
                res.redirect('/login');
            }
        }
        else{
            req.flash('errors',{msg:'Username not found :/'});
            console.log('not found');
            res.redirect('/login');

        }
    });
    //res.redirect(req.session.returnTo);
};

exports.getregister=function(req,res){
    res.render('register',{title:'Register'});
};

exports.postregister= function (req, res) {
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var username=req.body.username;
    var password = req.body.password;
    var retype = req.body.retypt;
    var gender=req.body.gender;
    var avatar=req.files.avatar;
    var filesize=2*1024*1024;
    if(firstname=="" || lastname=="" || username=="" || password=="" || gender=="" || username.length>15 || username.length<=3){
        if(avatar.truncated){
            fs.unlink('./' + avatar.path);
        }
        req.flash('errors',{msg:'Fields are not in the desired format, mouseover the inputs to get details'});
        res.redirect(req.path);
    }
    else{
        User.find({username:username}, function (err, data) {
            if(err){
                if(err)return next(err);
            }
            if(data.length>=1){
                console.log(data);
                req.flash('errors',{msg:'Username already exists.'});
                res.redirect("/register");
            }
            else{
                console.log(avatar.path);
                var av="/uploads/"+avatar.path.split('/')[2];
                console.log(av);
                var newbie = new User({
                    firstname:firstname,
                    lastname:lastname,
                    username:username,
                    password:exports.whatIsHash(password),
                    gender:gender,
                    avatar:av
                });
                newbie.save(function (err, data) {
                    if(err){
                        req.flash('errors',{msg:'Something went wrong :/'});
                        res.redirect('/register');
                    }
                    req.session.loggedin=true;
                    req.session.user=data;
                    req.flash('success',{msg:'Successfully registered,now roll up your sleeves and hack.'});
                    res.redirect('/');
                });
            }
        })

    }

};

exports.whatIsHash= function (pass) {
    var hash=crypto.createHash('sha512');
    return hash.update(pass).digest('hex');
};

exports.isAuthenticated=function (req,res,next) {
    if((req.session.loggedin && req.session.loggedin==true) || req.session.admin){
        next();
    }
    else{
        res.redirect('/login');
    }
};

exports.logout=function(req,res){
    req.session.loggedin=false;
    req.session.user=null;
    req.flash("success",{msg:"Good bye!"});
    res.redirect("/");
};
