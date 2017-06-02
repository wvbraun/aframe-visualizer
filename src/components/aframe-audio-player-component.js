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
    this.loaded = false;
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

  // TODO: win chromium not working
  attachEventListeners: function () {
    let th = this;
    const { audio, events } = this.data;
    if (events) {
      for (let i = 0; i < events.length; ++i) {
        window.addEventListener(events[i], this.eventHandler, false);
      }
    }

    if (audio) {
      audio.addEventListener('loadeddata', function() {
        th.loaded = true;
      }, false);
    }
  },

  removeEventListeners: function () {
    let th = this;
    const { audio, events } = this.data;
    if (events) {
      for (let i = 0; i < events.length; ++i) {
        window.removeEventListener(events[i], this.eventHandler);
      }
    }
    if (audio) {
      audio.removeEventListener('loadeddata', function() {
        th.loaded = false;
      });
    }
  },

  eventHandler: function (evt) {
    if (evt.key === ' ' || evt.key === 'k') {
      this.onResolvePlayState();
    }
  },

  onResolvePlayState: function () {
    let { audio } = this.data;
    if (!audio || !this.loaded) {
      console.log(1);
      return;
    }

    if (audio.paused) {
      audio.play()
      .catch((err) => {
        console.log(err);
      })
    } else {
      audio.pause()
    }

  },

});
