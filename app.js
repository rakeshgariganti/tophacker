var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash=require('express-flash');
var session = require('express-session');
var multer=require('multer');
var fs=require('fs');
var mongoStore=require('connect-mongo')(session);
var secret=require('./secret');

//Controllers
var routes = require('./routes/index');
var help = require('./routes/help');
var challenge = require('./routes/challenge');
var user = require('./routes/user');
var admin = require('./routes/admin');

//app
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//DB
mongoose.connect(secret.db);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.'+err);
});

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
//cookie parser must be initialized before session
app.use(session({
    name:'PHPSESSID',
    resave:true,
    secret:secret.sessionSecret,
    saveUninitialized:true,
    store:new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({
        dest:'./public/uploads/',
        limits:{
			fileSize:2*1024*1024
		},
        rename: function (fieldname, filename) {
            return "TophackerDp" + Date.now();
        },
        onFileSizeLimit: function (file) {
            console.log('Failed: ', file.originalname);
            fs.unlink('./' + file.path); // delete the partially written file
        }
    })
);
app.use(flash());
app.use(function (req, res, next) {
    res.locals.user=req.session.user;
    res.locals.admin=req.session.admin;
    next();
});

app.use(function(req, res, next) {
    // Remember original destination before login.
    var path = req.path.split('/')[1];
    if (/login|register|help|about|contact|fonts|favicon|dist/i.test(path)) {
        req.session.returnTo="/";
        return next();
    }
    req.session.returnTo = req.path;

    //now hide the server details
    res.setHeader('x-powered-by','PHP 5.0');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
//app.locals.pretty=true;





//routes
app.use('/', routes);
app.get('/login',user.getlogin);
app.post('/login',user.postlogin);
app.get('/register',user.getregister);
app.post('/register',user.postregister);
app.get('/logout',user.isAuthenticated,user.logout);
app.get('/challenge',user.isAuthenticated,challenge.index);
app.get('/challenge/:id',user.isAuthenticated,challenge.getchallenge);
app.get('/challenge/:id/solve',user.isAuthenticated,challenge.getsolve);
app.post('/challenge/:id/solve',user.isAuthenticated,challenge.postsolve);
app.get('/help',help.index);


//admin
app.get('/admin',admin.isAdmin,admin.getAdminPanel);
app.get('/admin/challenge/add',admin.isAdmin,admin.addChallenge);
app.post('/admin/challenge/add',admin.isAdmin,admin.postAddChallenge);
app.get('/admin/problem/add',admin.isAdmin,admin.addProblem);
app.post('/admin/problem/add',admin.isAdmin,admin.postAddProblem);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
