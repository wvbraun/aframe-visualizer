import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Visualizer from './Visualizer';
import VisualizerHeader from './VisualizerHeader';
import Logo from './Logo';
import logo from './logo_red.svg';
import logo_red from './Eiffel_Tower_Silhouette_Red.svg';
import logo2 from './Detailed_Eiffel_Tower_Red2.svg';
import * as visualizerActions from '../actions/visualizerActions';
import * as spotifyActions from '../actions/spotifyActions';


class VisualizerPage extends Component {

  addTracks = (tracks) => {
    if (tracks.length < 1) {
      return;
    }
    this.props.actions.addTrack(tracks[0]);
  }

  login = () => {
    this.props.actions.userLogin();
  }

  render() {
    const { tracks } = this.props;
    const options = {
      autoplay: false,
    };

    /*
      <VisualizerHeader
        logo={logo2}
        model={tracks[1]}
        onDrop={this.addTracks}
      />
    */
    return (
      <div className='App'>
        {tracks[1] &&
          <div>
            <VisualizerHeader
              logo={logo2}
              model={tracks[1]}
              onDrop={this.addTracks}
              onLogin={this.login}
            />
            <Visualizer
              className="visualizer"
              model={tracks[1]}
              options={options}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { visualizer } = state;
  return {
    tracks: visualizer.tracks,
    currentTrack: visualizer.currentTrack,
    isPlaying: visualizer.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, visualizerActions, spotifyActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerPage);
