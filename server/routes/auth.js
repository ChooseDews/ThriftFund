var express = require('express');
var router = express.Router();
var Auth = require('./../services/authentication.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', Auth.authMiddle, function(req, res, next) {
  res.send(req.user);
});

router.post('/login', function(req, res, next){

Auth.login(req.body.username, req.body.password).then(function(user){
  res.send(user);

}).catch(function(e){
  res.status(409).send(e);

})


});

router.post('/register', function(req, res, next) {
    var payload = req.body;
    if(payload && payload.name && payload.username && payload.password){
        Auth.registerUser(payload.name, payload.username, payload.password).then(function(user){
          res.send(user);
        }).catch(function(e){
          res.status(409).send(e);
        })
    }else{
      res.status(409).send('Invlaid Data Provided');
    }
});

module.exports = router;
