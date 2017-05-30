import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ path, color }) => {
  color = color || '#c3383b';
  const styles = {
    fill: color,
    fillOpacity: '1',
  };
  console.log(path);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 736 1920">
      <g fill='#61DAFB' style={styles}>
        <path style={styles} d={path} />
      </g>
    </svg>
  );
};

Logo.propTypes = {
  path: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Logo;
