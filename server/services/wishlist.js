var db = require('./../db/db.js');
var exports = {};



function splice(arr, val) {
  for (var i = arr.length; i--;) {
    if (arr[i] == val) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

exports.add = function(listingId, userId){
	return db.Users.findById(userId).then(function(user){
    if(user.wishlist.indexOf(userId) == -1){
      user.wishlist.push(listingId);
      return user.save();
    }
	});
};

exports.remove = function(listingId, userId){
	return db.Users.findById(userId).then(function(user){
		user.wishlist.push(listingId);
		user.wishlist = splice(user.wishlist, listingId);
		return user.save();
	});
};

exports.get = function(userId){
	return db.Users.findById(userId).populate('wishlist').then(function(user){
		user = user.toObject();
		return user.wishlist;
	});
};



module.exports = exports;
