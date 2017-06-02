/* global AFRAME, annyang */

import SpotifyWebApi from './spotify-web-api';
// import SpotifyWebApi from 'spotify-web-api-node';

let Spotify = new SpotifyWebApi();

Spotify.getToken()
  .then(function(response) {
    Spotify.setAccessToken(response.token);
  });

AFRAME.registerComponent('spotify', {
  schema: {
    src: {
      type: 'selector',
    },
  },

  init: function () {
    annyang.addCommands({
      'play *song': this.searchTrack.bind(this)
    });
    annyang.start();
  },

  searchTrack: function (query) {
    let el = this.el;
    let data = this.data;
    if (!data.src) { return; }
    let audio = data.src
    Spotify.searchTracks(query)
      .then(function (results) {
        const track = results.tracks.items[0];
        const previewUrl = track.preview_url;
        el.emit('spotify-play', results);
        audio.src = track.preview_url;
        audio.play();
      });
  },

});
