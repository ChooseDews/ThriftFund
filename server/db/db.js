var db = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thiftfund');
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
  username: String
});

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



module.exports = db;
