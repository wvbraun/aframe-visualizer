/* global AFRAME */

// TODO: fix events, cant be smt like 'click' bc 'onclick'
AFRAME.registerComponent('audio-player', {
  schema: {
    audio: {
      type: 'selector',
    },
    autoplay: {
      type: 'boolean',
    },
    events: {
      type: 'array',
      default: ['keydown'],
    },
  },

  init: function () {
    this.attachEventListeners = this.attachEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.onResolvePlayState = this.onResolvePlayState.bind(this);
  },

  play: function () {
    this.attachEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  attachEventListeners: function () {
    const { events } = this.data;
    if (events) {
      for (let i = 0; i < events.length; ++i) {
        window.addEventListener(events[i], this.eventHandler, false);
      }
    }
  },

  removeEventListeners: function () {
    const { events } = this.data;
    if (events) {
      for (let i = 0; i < events.length; ++i) {
        window.removeEventListener(events[i], this.eventHandler);
      }
    }
  },

  eventHandler: function (evt) {
    if (evt.key === ' ' || evt.key === 'k') {
      this.onResolvePlayState();
    }
  },

  onResolvePlayState: function () {
    let { audio } = this.data;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }

  },

});
