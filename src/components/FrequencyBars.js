import React from 'react';
import PropTypes from 'prop-types';
import FrequencyBar from './FrequencyBar';
import 'aframe';
import 'aframe-layout-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';

const FrequencyBars = ({ width, height, options }) => {
  const { barWidth, barHeight, barSpacing } = options;

  const radiusReduction = 70;

  const cx = width / 2;
  const cy = height / 4;
  const radius = Math.min(cx, cy) - radiusReduction;
  const maxNumBars = Math.floor((radius*2*Math.PI)/(barWidth + barSpacing));
  const slicedPercent = Math.floor((maxNumBars * 25) / 100);
  const numBars = maxNumBars - slicedPercent;

        //return <FrequencyBar key={i} options={frequency} />;
  return (
    <Entity layout="type: circle; radius: 10" rotation="90 180 0">
      {[...Array(numBars).keys()].map(i => {
        const theta = (i * 2 * Math.PI ) / maxNumBars;
        const delta = (3 * 45 - barWidth) * Math.PI / 180;
        const frequency = {
          angle: theta - delta,
          x: cx + barSpacing,
          y: cy + barSpacing,
        };
        const rotation = `${frequency.angle} 0 0`;
        const position = `${frequency.x} ${frequency.y} 0`;
        console.log(position);
        return (
          <Entity
            key={i}
            geometry={{primitive: 'box', width: barWidth, height: barHeight}}
            material={{color: 'red'}}
            position={{position}}
            rotation={{rotation}}
          />
        );
      })}
    </Entity>
  );

};

FrequencyBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  options: PropTypes.object,
};

export default FrequencyBars;
