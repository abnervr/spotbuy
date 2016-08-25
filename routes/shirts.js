var express = require('express');
var shirts = require('../services/shirts');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = req.query || {q: ''};
  shirts.findShirts(query.q)
    .then((result) => {
        res.render('shirts', result);
    })
    .catch((e) => {
      console.log(e);
      res.end(500);
    });
});

module.exports = router;
