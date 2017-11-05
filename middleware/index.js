var middlewareObj = {};
var Camp = require('../models/campground');
var Comment = require('../models/comments');

middlewareObj.isLoggedIn =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Some error has occured, please try to perform the step again.");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You do no have access to that.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error", "Some error has occured, please try to perform the step again.");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You do no have access to that.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("You need to be logged in to do that.");
        res.redirect("back");
    }
};

module.exports = middlewareObj;