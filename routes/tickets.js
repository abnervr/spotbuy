var express = require('express');
var tickets = require('../services/tickets');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = req.query || {q: ''};
  tickets.findTickets(query.q)
    .then((result) => {
      res.render('tickets', {results: result});
    })
    .catch((e) => {
      console.log(e);
      res.end(500);
    });
});

module.exports = router;
