import { combineReducers } from 'redux';
import spotify from './spotifyReducer';
import visualizer from './visualizerReducer';

const rootReducer = combineReducers({
  spotify,
  visualizer,
});

export default rootReducer;
