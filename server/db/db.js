var db = {};
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
var config = require('./../config.js');
mongoose.connect(config.db);
var Schema = mongoose.Schema;


var listing = Schema({
  name: String,
  description: String,
  condition: String,
  price: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  timestamp: { type: Date, default: Date.now },
  images: [{
    iternal: String,
    external: String
  }]
});

var user = Schema({
  name: {
    first: String,
    last: String
  },
  password: String,
  username: String,
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Listings' }]
});

user.methods.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  user.methods.validPassword = function(password) {
      if(!password) return false;
      return bcrypt.compareSync(password, this.password);
  };


var comment = Schema({
  listing: { type: Schema.Types.ObjectId, ref: 'Listings' },
  comment: String,
  timestamp: { type: Date, default: Date.now },
  //user: { type: Schema.Types.ObjectId, ref: 'Users' }
  username: String
});


db.Users  = mongoose.model('Users', user);
db.Listings  = mongoose.model('Listings', listing);
db.Comments  = mongoose.model('Comments', comment);



db.Listings.find({}).then(function(docs){
  for(var doc of docs){
    doc.image[0].external = doc.image[0].external.replace('http://thift.fund', 'https://thrift.fund');
    doc.save();
  }
});



module.exports = db;
