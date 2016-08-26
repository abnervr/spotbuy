var express = require('express');
var spotify = require('../services/spotify');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.cookies.access_token) {
    res.redirect('/login');
  }
  const token = {access_token : req.cookies.access_token};
  Promise.all([spotify.getUserData(token), spotify.getTopArtists(token)])
    .then((values) => {
      res.render('home', { title: 'SPOTBUY',
                            user : values[0],
                            topArtists : values[1],
                          });
    }).catch((error) => {
      console.log('Index js error', error);
      res.end(500);
    });

});

module.exports = router;
