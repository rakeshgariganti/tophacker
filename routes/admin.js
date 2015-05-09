/**
 * Created by rakesh on 20/1/15.
 */

var Challenge = require('../models/Challenge');
var Problem = require('../models/Problem');

exports.addProblem= function (req, res, next) {
    res.render('adminaddproblem',{title:'Add Problem | Top Hacker'});
};

exports.postAddProblem= function (req, res, next) {
    var pro={
        title:req.body.title,
        description:req.body.des,
        sinput:req.body.sinput,
        soutput:req.body.soutput,
        testcases:[
            {
                input:req.body.t1input,
                output:req.body.t1output
            },
            {
                input:req.body.t2input,
                output:req.body.t2output
            },
            {
                input:req.body.t3input,
                output:req.body.t3output
            },
            {
                input:req.body.t4input,
                output:req.body.t4output
            },
            {
                input:req.body.t5input,
                output:req.body.t5output
            }
        ]
    };
    var newProblem=new Problem(challengeex);
    newProblem.save(function (err, data) {
        if(err){
            next(err);
        }
        req.flash('success',{msg:'Added successfully.'});
        res.redirect('/admin');
    });
};

exports.addChallenge= function (req, res) {
    res.render('adminaddchallenge',{title:'Add challenge | Top Hacker'});
};

exports.postAddChallenge= function (req, res,next) {
    var challengeex={};
    challengeex.hello='world';
    challengeex.title=req.body.title;
    challengeex.description=req.body.question;
    challengeex.startsat=req.body.startsat;
    challengeex.endsat=req.body.endsat;
    challengeex.problems=[];
    challengeex.problems=[{
            title:req.body.p1title,
            description:req.body.p1des,
            sinput:req.body.p1sinput,
            soutput:req.body.p1soutput,
            testcases:[
                {
                    input:req.body.p1t1input,
                    output:req.body.p1t1output
                },
                {
                    input:req.body.p1t2input,
                    output:req.body.p1t2output
                },
                {
                    input:req.body.p1t3input,
                    output:req.body.p1t3output
                },
                {
                    input:req.body.p1t4input,
                    output:req.body.p1t4output
                },
                {
                    input:req.body.p1t5input,
                    output:req.body.p1t5output
                }
            ]
        },
        {
            title:req.body.p2title,
            description:req.body.p2des,
            sinput:req.body.p2sinput,
            soutput:req.body.p2soutput,
            testcases:[
                {
                    input:req.body.p2t1input,
                    output:req.body.p2t1output
                },
                {
                    input:req.body.p2t2input,
                    output:req.body.p2t2output
                },
                {
                    input:req.body.p2t3input,
                    output:req.body.p2t3output
                },
                {
                    input:req.body.p2t4input,
                    output:req.body.p2t4output
                },
                {
                    input:req.body.p2t5input,
                    output:req.body.p2t5output
                }
            ]
        },
        {
            title:req.body.p3title,
            description:req.body.p3des,
            sinput:req.body.p3sinput,
            soutput:req.body.p3soutput,
            testcases:[
                {
                    input:req.body.p3t1input,
                    output:req.body.p3t1output
                },
                {
                    input:req.body.p3t2input,
                    output:req.body.p3t2output
                },
                {
                    input:req.body.p3t3input,
                    output:req.body.p3t3output
                },
                {
                    input:req.body.p3t4input,
                    output:req.body.p3t4output
                },
                {
                    input:req.body.p3t5input,
                    output:req.body.p3t5output
                }
            ]
        },
        {
            title:req.body.p4title,
            description:req.body.p4des,
            sinput:req.body.p4sinput,
            soutput:req.body.p4soutput,
            testcases:[
                {
                    input:req.body.p4t1input,
                    output:req.body.p4t1output
                },
                {
                    input:req.body.p4t2input,
                    output:req.body.p4t2output
                },
                {
                    input:req.body.p4t3input,
                    output:req.body.p4t3output
                },
                {
                    input:req.body.p4t4input,
                    output:req.body.p4t4output
                },
                {
                    input:req.body.p4t5input,
                    output:req.body.p4t5output
                }
            ]
        },
        {
            title:req.body.p5title,
            description:req.body.p5des,
            sinput:req.body.p5sinput,
            soutput:req.body.p5soutput,
            testcases:[
                {
                    input:req.body.p5t1input,
                    output:req.body.p5t1output
                },
                {
                    input:req.body.p5t2input,
                    output:req.body.p5t2output
                },
                {
                    input:req.body.p5t3input,
                    output:req.body.p5t3output
                },
                {
                    input:req.body.p5t4input,
                    output:req.body.p5t4output
                },
                {
                    input:req.body.p5t5input,
                    output:req.body.p5t5output
                }
            ]
        }
    ];

    var newChallenge=new Challenge(challengeex);
    newChallenge.save(function (err, data) {
        if(err){
            next(err);
        }
        req.flash('success',{msg:'Added successfully.'});
        res.redirect('/admin');
    });

//    var challenge = new Challenge({
//        title:req.body.title,
//        keywords:req.body.keywords.split(","),
//        question:req.body.question,
//        sinput:req.body.sinput,
//        soutput:req.body.soutput,
//        auther:req.session.user._id,
//        starttime:0,
//        endtime:0,
//        testcases:[],
//        solvedby:[req.session.user._id],
//        attempted:0
//    });
//    challenge.save(function (err, data) {
//        if(err){next(err)}
//        req.flash('success',{msg:'Successfully Added.'});
//        res.redirect(req.path);
//    });
};

exports.getAdminPanel= function (req, res, next) {
    res.render('admin',{titel:'Admin Panel | Top Hacker'});
};

exports.isAdmin = function (req, res, next) {
    if(req.session.admin){
        return next();
    }
    res.redirect('/login');
};