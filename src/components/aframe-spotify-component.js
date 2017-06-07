/* global AFRAME */

//import SpotifyWebApi from './spotify-web-api';
//import SpotifyWebApi from 'spotify-web-api-js';
import annyang from './annyang.min';
import SpotifyWebApi from 'spotify-web-api-node';

const token = 'BQCz-xtTIDwESjz6G7Iqt5uydt01wQ6V3coN6usxbwPL_Wh-Ynq7-rQSEhl8mfxvM2x3ZWHuQCCwp8o1nxngoHNOHPVES8RrTDFXhiJsRfQ-ibNLEs05KW0_0kCEOIImN3OO8K8dyHQ3DkT5yg2q08dOMXd4Ff9-2xmGBR57RqZvjuKZV_rRdzVgm2F1FVz2vdMwZ6qU8mcTPQ5yhOdkHQ4cgpWeVt3c431m6PPjUmSVynpoB9ZGvAALzoeCVJfIw2EJrH-ROP00iKbxzK3ia6uU-Nzw0dYWMfXrVnON0Tgm5FJ9utxgOgKZqKSU0v_ogbc';

let Spotify = new SpotifyWebApi({
  accessToken: token,
});


/*
Spotify.getToken()
  .then(function(response) {
    Spotify.setAccessToken(response.token);
  });
*/

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

  // TODO: currently if previewUrl is null it errors, need to add failsafes
  searchTrack: function (query) {
    let el = this.el;
    let data = this.data;
    if (!data.src) { return; }
    let audio = data.src
    Spotify.searchTracks(query)
      .then((response) => {
        return response.body;
      })
      .then((results) => {
        console.log(results);
        const track = results.tracks.items[0];
        const previewUrl = track.preview_url;
        el.emit('spotify-play', results);
        //audio.src = track.preview_url;
        audio.src = track.href;
        audio.play();
      });
  },

});
