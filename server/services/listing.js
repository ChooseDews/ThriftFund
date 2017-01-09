var db = require('./../db/db.js');
var exports = {};
var swearjar = require('swearjar');





exports.createListing = function(name, description, condition, price, user, images){
  var listing = new db.Listings({
    name: name,
    price: price,
    description: description,
    condition: condition,
  });
  return listing;
};

exports.createComment = function(listingId, comment, user){
  var comment = new db.Comments({
    listing: listingId,
    comment: swearjar.censor(comment),
    username: user.username,
    user: user._id
  });
  return comment.save().then(function(comment){
    return db.Listings.findById(listingId)
  }).then(function(listing){
    listing.comments.push(comment._id);
    return listing.save();
  }).then(function(){
    return comment;
  });
}


exports.getListings = function(page){
  if(!page) page = 1;
  return db.Listings.find().sort({timestamp: -1}).skip((page-1)*5).limit(5);
}

exports.getListing = function(id){
  return db.Listings.findById(id).populate('comments');
}




module.exports = exports;
