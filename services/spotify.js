(() => {
  'use strict';

  const request = require('request');

  const client_id = 'c6f1c805e3404b3699d34815af4ef299'; // Your client id
  const client_secret = '9ef88f6a78cd44dd883ee56d285b306a'; // Your secret

  const updateAccessToken = (token) => {
    return new Promise((resolve, reject) => {

      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          refresh_token: token.refresh_token,
          grant_type: 'refresh_token'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
      request.post(authOptions, function(error, response, body) {
        if (error || response.statusCode !== 200) {
          reject(error);
        }
        resolve(body);
      });
    });
  };

  const getUserData = (token) => {
    return new Promise((resolve, reject) => {
      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + token.access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        //console.log('userData', token, body);
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          console.error(error);
          reject(error);
        }
      });
    });
  };

  const getTopArtists = (token, offset) => {
    return new Promise((resolve, reject) => {
      var options = {
        url: `https://api.spotify.com/v1/me/top/artists?time_range=long_term&offset=${offset || 0}`,
        headers: { 'Authorization': 'Bearer ' + token.access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        //console.log('topArtists', token, body);
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          console.log('TopArtistsErro', response.statusCode, error, body);
          reject(error);
        }
      });
    });
  };

  module.exports = {getUserData,getTopArtists,updateAccessToken};
})();
