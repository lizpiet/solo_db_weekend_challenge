var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});


//added by Liz
router.get('/', function(req, res, next) {
  res.json(req.isAuthenticated());
});


module.exports = router;
