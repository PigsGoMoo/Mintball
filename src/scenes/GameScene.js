const Phaser = require('phaser');

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  // this is a method on the class
  create() {
    // spawn player
    this.player = this.add.ball(300, 400, 30, 30, 0xffffff);
    // world.player = this.physics.add.existing(player);

    this.bulletsGroup = this.physics.add.group({
      classType: Bullets,
      runChildUpdate: true,
    });

    // set target
    const target = this.add.ball(
      Math.random() * width,
      Math.random() * height,
      30,
      30,
      0xff0000
    );
    world.target = this.physics.add.existing(target);
    target.body.setVelocityX(Math.random() * 1000);
    target.body.setVelocityY(Math.random() * 500);

    this.physics.add.overlap(this.bulletsGroup, target, (bullet, target) => {
      bullet.setVisible(false);
      bullet.setActive(false);
      target.setVisible(false);
      target.setActive(false);
      target.body.enable = false;
    });

    // set walls
    this.physics.world.setBounds(0, 0, width, height);
  }

  update(time, delta) {
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
  }
}
