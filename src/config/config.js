const Phaser = require('phaser');
const { width, height } = require('./constants');

export default {
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      fps: 60,
      gravity: {
        y: 2000,
      },
    },
  },
};
