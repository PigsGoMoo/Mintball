const world = require('../world');
const Phaser = require('Phaser');

const ACCELERATION = 50;

module.exports = function update(time, delta) {
  const cursors = this.input.keyboard.createCursorKeys();
  const shoot = this.input.keyboard.addKeys({
    space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  const { left, right, up, down } = shoot;
  const { player } = world;

  if (left.isDown) {
    player.left();
  }

  if (right.isDown) {
    player.right();
  }

  if (up.isDown) {
    player.up();
  }

  if (down.isDown) {
    player.down();
  }

  this.input.on('pointerdown', function (pointer) {
    if (time > player.nextShot) {
      player.shoot(pointer);
      player.nextShot = time + player.cooldown;
    }
  });
};
