import React, { Component } from 'react';
import { connect } from "react-redux";
import Visualizer from './Visualizer';
import VisualizerHeader from './VisualizerHeader';
import logo from './logo_red.svg';
import logo_red from './Eiffel_Tower_Silhouette_Red.svg';
import logo2 from './Detailed_Eiffel_Tower_Red2.svg';

class VisualizerPage extends Component {
  render() {
    const { tracks } = this.props;
    const options = {
      autoplay: false,
    };

    //<img src={logo} className="App-logo" alt="logo" />
    return (
      <div className='App'>
        {tracks[1] &&
          <div>
            <VisualizerHeader
              logo={logo2}
              model={tracks[1]}
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

function mapStateToProps(state, ownProps) {
  const { visualizer } = state;
  return {
    tracks: visualizer.tracks,
    currentTrack: visualizer.currentTrack,
    isPlaying: visualizer.isPlaying,
  };
}

export default connect(mapStateToProps)(VisualizerPage);
