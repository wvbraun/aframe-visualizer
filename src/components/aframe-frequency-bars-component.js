/* global AFRAME */

AFRAME.registerComponent('frequency-bars', {
  schema: {
    mixin: {default: ''},
    options: {default: {
      barColor: '#c3383b',
      barWidth: 2,
      barHeight: 2,
      barSpacing: 7,
    }},
  },

  init: function() {
    const data = this.data;
    const { barWidth, barHeight, barSpacing } = data.options;
    const radiusReduction = 70;
    const cx = window.innerWidth;
    const cy = window.innerHeight;
    const radius = Math.min(cx, cy) - radiusReduction;
    const maxNumBars = Math.floor((radius*2*Math.PI)/(barWidth + barSpacing));
    const slicedPercent = Math.floor((maxNumBars * 25) / 100);
    const numBars = maxNumBars - slicedPercent;

    for (let i = 0; i < numBars; ++i) {
      const theta = (i * 2 * Math.PI ) / maxNumBars;
      const delta = (3 * 45 - barWidth) * Math.PI / 180;
      const angle = theta - delta;
      const x = cx + barSpacing;
      const y = cy + barSpacing;
      const rotation = `${angle} 0 0`;
      const position = `${x} ${y} 0`;

      let entity = document.createElement('a-entity');
      entity.setAttribute('mixin', data.mixin);
      entity.setAttribute('position', position);
      entity.setAttribute('rotation', rotation);
      this.el.appendChild(entity);
    }
  }
});
