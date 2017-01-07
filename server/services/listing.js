var db = require('./../db/db.js');
var exports = {};



exports.createListing = function(name, description, condition, price, user, images){
  var listing = new db.Listings({
    name: name,
    price: price,
    description: description,
    condition: condition,
    comments: 0
  });
  return listing;
};

exports.createComment = function(listingId, comment, user){
  var comment = new db.Comments({
    listing: listingId,
    comment: comment
  });
  return comment.save();
}

exports.getListings = function(page){
  return db.Listings.find().sort({timestamp: -1}).limit(10);
}

exports.getListing = function(id){
  return db.Listings.findById(id);
}




module.exports = exports;
