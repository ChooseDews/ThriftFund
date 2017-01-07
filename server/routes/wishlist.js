var express = require('express');
var Wishlist = require('./../services/wishlist.js');
var router = express.Router();
var Auth = require('./../services/authentication.js');

/* GET home page. */
router.get('/add/:listingId', Auth.authMiddle, function(req, res, next) {
    Wishlist.add(req.params.listingId, req.user._id).then(function(user){
			res.send(user);
		});
});


router.get('/remove/:listingId', Auth.authMiddle, function(req, res, next) {
	Wishlist.remove(req.params.listingId, req.user._id).then(function(user){
		res.send(user);
	});
});

router.get('/', Auth.authMiddle, function(req, res, next) {
    Wishlist.get(req.user._id).then(function(wishlist) {
        res.send(wishlist);
    });
});


module.exports = router;
