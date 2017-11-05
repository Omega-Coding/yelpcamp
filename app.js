var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Camp = require('./models/campground.js');
var seedDB = require('./seeds.js');
var Comment = require('./models/comments');
var User = require('./models/user.js');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var app = express();

var commentRoutes = require('./routes/comment');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');


//mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
/*console.log(process.env.DATABASEURL);*/
mongoose.connect(process.env.DATABASEURL, "{useMongoClient: true");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));
app.use(flash());

/*seedDB();*/

//Passport Configuration
app.use(require('express-session')({
    secret: "Arsenal FC is the best team in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passing user info to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//Routes

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp server has started!");
});