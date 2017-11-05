var mongoose = require('mongoose');
var Camp = require("./models/campground");
var Comment = require('./models/comments');

var Data = [
    {
        name: "Black Mountain Cliff",
        image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
        description: "Random Description"
    },
    {
        name: "Rhode's Baton Jump",
        image: "https://farm4.staticflickr.com/3140/5710228285_e12b762bff.jpg",
        description: "Random Description"
    },
    {
        name: "Devil's Cascade Cave",
        image: "https://farm5.staticflickr.com/4079/4805487492_618e66b63b.jpg",
        description: "Random Description"
    }
];

function seedDB(){
    Camp.remove({}, function(err){
        /*if(err){
            console.log(err);
        }
       console.log("Campgrounds Removed.");
       Data.forEach(function(seed){
        Camp.create(seed, function(err, data){
            if(err){
                console.log(err);
            } else {
                console.log("Data Added");
                Comment.create({
                    text: "New Comment",
                    author: "Shrey"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        data.comments.push(comment);
                        data.save();
                        console.log("Comment Added");
                    }
                });
            }
        });
    });*/
    });
}

module.exports = seedDB;