import React from 'react';
import PropTypes from 'prop-types';
import UploadModal from './common/UploadModal';

const VisualizerHeader = ({ logo, model, onDrop }) => {
  const styles = {
    button: {
      backgroundColor: '#c3383b',
    },
    trackInfo: {
      textAlign: 'left',
    },
  };
  return (
    <div className='visualizer__header'>
      <div className='visualizer__track-info' style={styles.trackInfo}>
        {model.artist} - {model.title}
      </div>
      {logo &&
        <img src={logo} className="App-logo" alt="logo" />
      }
      <UploadModal
        styles={styles.button}
        onDrop={onDrop}
      />
    </div>
  );
};

VisualizerHeader.propTypes = {
  logo: PropTypes.string,
  model: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default VisualizerHeader;
