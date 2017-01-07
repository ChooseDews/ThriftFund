var exports = {};
var jwt = require('jsonwebtoken');
var db = require('./../db/db.js');
global.Promise = require('bluebird');



exports.signToken = signToken = function(payload) {
     return jwt.sign(payload, config.jwtSecret, {
         expiresIn: 60 * 60 * 24 * 7 // expires in a week
     });
 };


 exports.authMiddleError = authMiddleError = function(message, res) {
       return res.status(401).send(message);
   };

 exports.authMiddle = function(req, res, next) {
   console.log(req.headers['x-access-token']);
       var token = req.body.token || req.query.token || req.headers['x-access-token']; //Search for the token;
       validateToken(token).then(function(user) {
           req.user = user;
           next();
       }).catch(function() {
           return authMiddleError('Invalid or no token provided', res);
       });
   };

 exports.validateToken = validateToken = function(token) {
     return Promise.promisify(jwt.verify)(token, config.jwtSecret).then(function(decoded) {
         return decoded;
     }).catch(function(err) {
         if (err.name && err.name == "TokenExpiredError") throw "Authentication Token Expired";
         throw "Error Decoding Authentication Token";
     });
 };

 exports.getUser = getUser = function(username){
   return db.Users.findOne({username: username});
 }

 exports.registerUser = function(name, username, password){
   return getUser(username).then(function(user){
     if(user) throw "Username Already Taken";
     var user = new db.Users({
       name: name,
       username: username
     });
     user.password = user.generateHash(password);
     return user.save();
   }).then(function(user){
     if(user){
       var user = user.toObject();
       user.token = signToken(user);
       return user;
     }else{
       throw "Unkown Error Saving User"
     }
   })
 };


 exports.login = function(username, password){
   if(!username) username = null;
   return getUser(username).then(function(user){
     if(!user) throw "Invalid Username";
     if(user.validPassword(password)){
       var user = user.toObject();
       user.token = signToken(user);
       return user;
     }else{
       throw "Invalid Password";
     }
   });
 }


module.exports = exports;
