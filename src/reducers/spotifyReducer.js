import initialState from "./initialState";
import types from "../actions/actionTypes";

export default function spotifyReducer(state = initialState.spotify, action) {
  switch (action.type) {
    case types.SPOTIFY_TOKENS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, {
        accessToken,
        refreshToken,
      });

    case types.SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          loading: true,
        }),
      });

    case types.SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user, {
          loading: false,
        }),
      });

    case types.SPOTIFY_ME_FAIL:
      return state;

    default:
      return state;
  }
}
