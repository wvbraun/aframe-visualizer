import React from 'react';
import PropTypes from 'prop-types';
import UploadModal from './common/UploadModal';
import { Link } from 'react-router-dom';
import spotifyLogin from './spotify-login.svg';


// <Link to='/login'>

/*
<button onClick={onLogin}>
        <img
          src={spotifyLogin}
          className='spotify-login-logo'
          style={styles.spotifyLogin}
        />
      </button>
*/

const VisualizerHeader = ({ logo, model, onDrop, onLogin }) => {
  const styles = {
    button: {
      backgroundColor: '#c3383b',
    },
    trackInfo: {
      textAlign: 'left',
    },
    spotifyLogin: {
      minWidth: '64px',
      height: '36px',
      padding: '0 16px',
      border: 'none',
      borderRadius: '2px',
      outline: 'none',
      background: 'transparent',
      textAlign: 'center',
      textDecoration: 'none',
      overflow: 'hidden',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
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
  onLogin: PropTypes.func,
};

export default VisualizerHeader;
