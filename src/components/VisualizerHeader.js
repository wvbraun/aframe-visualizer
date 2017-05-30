import React from 'react';
import PropTypes from 'prop-types';

const VisualizerHeader = ({ model, logo }) => {
  const infoStyles = {
    textAlign: 'left',
  };
  return (
    <div className='visualizer__header'>
      <div className='visualizer__track-info' style={infoStyles}>
        {model.artist} - {model.title}
      </div>
      {logo &&
        <img src={logo} className="App-logo" alt="logo" />
      }
    </div>
  )

};

VisualizerHeader.propTypes = {
  logo: PropTypes.string,
  model: PropTypes.object.isRequired,
};

export default VisualizerHeader;
