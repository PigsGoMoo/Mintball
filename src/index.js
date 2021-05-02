const Phaser = require('phaser');
// const create = require('./lifecycle/create');
// const preload = require('./lifecycle/preload');
// const update = require('./lifecycle/update');

// // factories
// require('./objects/Ball.js');
// require('./objects/Bullet.js');

// // constants
// const { width, height } = require('./constants');

// var config = {
//   scale: {
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   backgroundColor: {
//     red: 0x10,
//     blue: 0xff,
//     green: 0x08,
//   },
//   type: Phaser.AUTO,
//   width,
//   height,
//   scene: {
//     preload,
//     create,
//     update,
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: false,
//       fps: 60,
//       gravity: {
//         y: 2000,
//       },
//     },
//   },
// };

// var game = new Phaser.Game(config);

// Phaser.Game is Phaser's way of making a game
export default class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

// window.onload will run when the browser (window) loads
window.onload = function () {
  // we're calling it window.game
  window.game = new Game();
};
