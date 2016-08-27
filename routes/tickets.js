var express = require('express');
var spotify = require('../services/spotify');
var tickets = require('../services/tickets');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies.access_token) {
    res.redirect('/login');
  }
  const token = {access_token : req.cookies.access_token};
  const offset = Number(req.query.offset) || 0;
  const query = req.query || {q: ''};
  Promise.all([spotify.getUserData(token), tickets.findTickets(query.q)])
    .then((values) => {
      console.log(values[1]);
      res.render('tickets', {  title: 'SPOTIBUY',
                               user : values[0],
                               results : values[1]
                            });
    })
    .catch((e) => {
      console.log(e);
      res.end(500);
    });
});

module.exports = router;
