var express = require('express');
var router = express.Router();
var Camp = require('../models/campground');
var middleware = require('../middleware');

router.get('/campgrounds', function(req, res){
    Camp.find({}, function(err, camps){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: camps});
        }
    });
});

router.post('/campgrounds', middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: description, author: author};
   Camp.create(newCampground, function(err, camp){
      if(err){
          console.log(err);
      } else {
          res.redirect('/campgrounds');  //Default is a get request for redirect
      }
   });
});

router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

router.get('/campgrounds/:id', function(req, res){
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit Campgrounds

router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Destroy Campground
router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
   Camp.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds');
       }
   }); 
});

/*//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCampground){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}*/

module.exports = router;