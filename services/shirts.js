
(() => {
  'use strict';

  const needle = require('needle');

  const findShirts = (band) => {
    return new Promise((resolve, reject) => {
          needle
            .get(`https://api.mercadolibre.com/sites/MLB/search?q=${band}&category=MLB3122&has_pictures=yes`, (err, resp, body) => {
              if (err) {
                return reject(err);
              }
              resolve(body);
            });
        });
  };

  module.exports = { findShirts };
})();
