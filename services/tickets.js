
(() => {
  'use strict';

  const needle = require('needle');

  const findTickets = (band) => {
    return new Promise((resolve, reject) => {
      needle
        .get(`http://www.ticketbis.com.br/search/data?query=${band}&ev_count=10`, (err, resp, body) => {
          if (err) {
            return reject(err);
          }
          resolve(body);
        });
    });
  };

  module.exports = { findTickets };
})();
