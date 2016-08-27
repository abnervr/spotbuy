var express = require('express');
var spotify = require('../services/spotify');
var shirts = require('../services/shirts');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies.access_token) {
    res.redirect('/login');
  }
  const token = {access_token : req.cookies.access_token};
  const offset = Number(req.query.offset) || 0;
  const query = req.query || {q: ''};
  Promise.all([spotify.getUserData(token), shirts.findShirts(query.q)])
    .then((values) => {
      res.render('shirts', {  title: 'SPOTIBUY',
                              user : values[0],
                              results : values[1].results
                            });
    })
    .catch((e) => {
      console.log(e);
      res.end(500);
    });
});

module.exports = router;
