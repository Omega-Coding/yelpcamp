var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
/*var middleware = require('../middleware');*/

router.get('/', function(req, res){
    res.render('landing');
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
           passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
       });
   }); 
});

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
   //Just to demonstrate that we are using a middleware above. 
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash("error", "You have succesfully logged out");
    res.redirect('/campgrounds');
});

module.exports = router;