import types from './actionTypes';
import spotifyApi from '../api/spotifyApi';
//import Spotify from 'spotify-web-api-js';

//const spotifyApi = new Spotify();

const login = () => {
  const settings = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    },
  };
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/login', settings)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        throw(err);
      });
  });
}

export function spotifyBegin () {
  return { type: types.SPOTIFY_ME_BEGIN };
}

export function spotifySuccess (user) {
  return { type: types.SPOTIFY_ME_SUCCESS, user }
}

export function spotifyFail (err) {
  return { type: types.SPOTIFY_ME_FAIL, err }
}

export function setTokens ({ accessToken, refreshToken }) {
  if (accessToken) {
    console.log(accessToken);
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: types.SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function getUserInfo () {
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

export function userLogin () {
  return dispatch => {
    return login()
      .catch((err) => {
        throw(err);
      });
  };
}
