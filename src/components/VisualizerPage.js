import React, { Component } from 'react';
import { connect } from "react-redux";
import Visualizer from './Visualizer';

class VisualizerPage extends Component {
  render() {
    const { tracks } = this.props;
    const options = {
      autoplay: false,
    };

    //<img src={logo} className="App-logo" alt="logo" />
    return (
      <div id='scene-container'>
        {tracks[1] &&
          <Visualizer
            className="audio-visualizer"
            model={tracks[1]}
            options={options}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { visualizer } = state;
  return {
    tracks: visualizer.tracks,
    currentTrack: visualizer.currentTrack,
    isPlaying: visualizer.isPlaying,
  };
}

export default connect(mapStateToProps)(VisualizerPage);
