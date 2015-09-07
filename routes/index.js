var express = require('express');
var router = express.Router();
//added by Liz
var passport = require('passport');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// added by Liz
router.get("/", function(req, res, next){
  res.sendFile(path.resolve(__dirname, '../views/index.jade'));
});

router.post('/',
    passport.authenticate('local', {
      sucessRedirect: '/users',
      failureRedirect: '/'
    })
);

module.exports = router;
