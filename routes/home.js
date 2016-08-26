var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('Home', req.query, req.params);
  res.render('home', { title: 'SPOTBUY' });
});

module.exports = router;
