"use strict";

var renderer = cc.renderer;
var game = cc.game;
var _frameRate = 60;
Object.assign(game, {
  setFrameRate: function setFrameRate(frameRate) {
    _frameRate = frameRate;

    if (__globalAdapter.setPreferredFramesPerSecond) {
      __globalAdapter.setPreferredFramesPerSecond(frameRate);
    } else {
      this._paused = true;

      this._setAnimFrame();
    }
  },
  getFrameRate: function getFrameRate() {
    return _frameRate;
  }
});