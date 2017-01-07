var express = require('express');
var router = express.Router();
var Listing = require('./../services/listing.js');
var Images = require('./../services/images.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  Listing.getListings().then(function(listings){
    res.send(listings);
  });
});


router.post('/comment', function(req, res, next) {
  var itemId = req.body.itemId;
  var comment = req.body.comment;
  Listing.createComment(itemId, comment).then(function(comment){
    res.send(comment);
  });
});

router.get('/:itemId', function(req, res, next) {
  Listing.getListing(req.params.itemId).then(function(listing){
    res.send(listing);
  });
});


router.post('/', function(req,res,next){
  var listing = req.body;
  console.log(listing)
  var l = Listing.createListing(listing.name, listing.description, listing.condition, listing.price);
  var file = Images.process64(listing.image, l._id);
  l.images.push(file);
  console.log(file);
  l.save().then(function(document){
      res.send(document);
  }).catch(function(e){
    console.log(e)
  });
});

module.exports = router;
