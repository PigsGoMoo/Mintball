const Phaser = require('phaser');
const { width, height } = require('./constants');

export default {
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: {
    red: 0x10,
    blue: 0xff,
    green: 0x08,
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
