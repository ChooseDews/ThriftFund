var db = require('./../db/db.js');
var exports = {};



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
    comment: comment,
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
  return db.Listings.find().sort({timestamp: -1}).limit(10);
}

exports.getListing = function(id){
  return db.Listings.findById(id).populate('comments');
}




module.exports = exports;
