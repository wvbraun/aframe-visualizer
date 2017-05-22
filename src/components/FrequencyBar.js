import React from 'react';
import PropTypes from 'prop-types';
import 'aframe';
import 'babel-polyfill';
import { Entity } from 'aframe-react';

const FrequencyBar = ({ options }) => {
  const { angle, x, y } = options;
  const rotation = `${angle} 0 0`;
  const position = `${x} ${y} 0`;
  return (
    <Entity
      geometry={{primative: 'box'}}
      material={{color: 'red'}}
      position={position}
      rotation={rotation}
    />
  );
};

FrequencyBar.propTypes = {
  options: PropTypes.object.isRequired,
};

export default FrequencyBar;
