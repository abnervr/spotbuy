(() => {
  'use strict';

  const request = require('request');

  const getUserData = (token) => {
    return new Promise((resolve, reject) => {
      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + token.access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        console.log('userData', token, body);
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          console.error(error);
          reject(error);
        }
      });
    });
  };

  const getTopArtists = (token) => {
    return new Promise((resolve, reject) => {
      var options = {
        url: 'https://api.spotify.com/v1/me/top/artists',
        headers: { 'Authorization': 'Bearer ' + token.access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        console.log('topArtists', token, body);
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          console.log('TopArtistsErro', response.statusCode, error);
          reject(error);
        }
      });
    });
  };

  module.exports = {getUserData,getTopArtists};
})();
