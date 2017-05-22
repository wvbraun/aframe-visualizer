/* global AFRAME */

AFRAME.registerComponent('key-events', {
  init: function () {
    this.listeners = {
      keyup: this.onKeyUp.bind(this),
      keydown: this.onKeyDown.bind(this),
    };
    this.attachEventListeners = this.attachEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  },

  play: function () {
    this.attachEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  attachEventListeners: function () {
    window.addEventListener('keyup', this.listeners.keyup, false);
    window.addEventListener('keydown', this.listeners.keydown, false);
  },

  removeEventListeners: function () {
    window.removeEventListener('keyup', this.listeners.keyup);
    window.removeEventListener('keydown', this.listeners.keydown);
  },

  onKeyUp: function (evt) {
    this.emit(evt);
  },

  onKeyDown: function (evt) {
    this.emit(evt);
  },

  emit: function (evt) {
    this.el.emit(evt.type, evt, false);
  },

});
