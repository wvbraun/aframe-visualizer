import types from './actionTypes';
import spotifyApi from '../api/spotifyApi';
//import Spotify from 'spotify-web-api-js';

//const spotifyApi = new Spotify();

export function setTokens ({ accessToken, refreshToken }) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: types.SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function spotifyBegin () {
  return { type: types.SPOTIFY_ME_BEGIN };
}

export function spotifySuccess(user) {
  return { type: types.SPOTIFY_ME_SUCCESS, user }
}

export function spotifyFail(err) {
  return { type: types.SPOTIFY_ME_FAIL, err }
}

export function getUserInfo() {
  return dispatch => {
    dispatch(spotifyBegin);
    return spotifyApi.getMe()
      .then((user) => {
        dispatch(spotifySuccess(user));
      })
      .catch((err) => {
        dispatch(spotifyFail(err));
      });
  };
}
