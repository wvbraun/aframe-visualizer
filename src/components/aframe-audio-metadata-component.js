/* global AFRAME */

AFRAME.registerComponent('audio-metadata', {
  schema: {
    src: {
      type: 'selector',
    },
    audio: {
      type: 'selector',
    },
  },

  init: function () {
    this.renderText = this.renderText.bind(this);
  },

  update: function () {
    if (!this.data.src) {
      return;
    }


    //this.canvas = document.getElementById(this.data.src);
    this.canvas = this.data.src;
    this.canvasCtx = this.canvas.getContext('2d');
    this.renderText();
  },

  renderText: function () {
    let { canvasCtx } = this;
    const { audio } = this.data;
    const { width, height } = this.canvas;
    const font = ['12px', 'Helvetica'];

    const cx = width / 2;
    const cy = height / 4;
    const fontAdjustment = 6;
    const alignAdjustment = 8;

    canvasCtx.textBaseline = 'top';
    canvasCtx.fillText(`by ${audio.id}`, cx + alignAdjustment, cy);
    canvasCtx.font = `${parseInt(font[0], 10) + fontAdjustment}px ${font[1]}`;
    canvasCtx.textBaseline = 'bottom';
    //canvasCtx.fillText(model.title, cx + alignAdjustment, cy);
    canvasCtx.font = font.join(' ');
  }

});
