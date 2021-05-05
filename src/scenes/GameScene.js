import Phaser from 'phaser';
import Bullets from '../objects/Bullet';
import { width, height } from '../config/constants';
import Ball from '../objects/Ball';
import EnemyBall from '../objects/EnemyBall';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('ball', '../../public/assets/Image/ball.png');
  }

  // this is a method on the class
  create() {
    console.log(`Game Scene`);
    console.log(`this context:`, this.sys.queueDepthSort);
    // spawn player
    this.player = new Ball(this, 300, 400);
    this.player.setScale(0.15);
    this.bulletsGroup = this.physics.add.group({
      classType: Bullets,
      runChildUpdate: true,
    });
    this.enemiesGroup = this.physics.add.group({
      classType: EnemyBall,
      runChildUpdate: true,
      collideWorldBounds: true,
      bounceX: 0.9,
      bounceY: 0.9,
      gravityY: 2000,
      // velocityX: 500,
      // velocityY: 500,
    });

    // set target
    this.target = new EnemyBall(this, 30, 30);
    this.target.setScale(0.15).setTint(0xff0000);
    this.enemiesGroup.add(this.target);
    this.target.body.setVelocityX(Math.random() * 1000);
    this.target.body.setVelocityY(Math.random() * 500);
    this.physics.add.overlap(
      this.bulletsGroup,
      this.enemiesGroup,
      (bullet, target) => {
        bullet.setVisible(false);
        bullet.setActive(false);
        // this gives it the body (a hit box)
        bullet.body.enable = false;
        // bullet.setVelocityX(0);
        // bullet.setVelocityY(0);
        target.takeDamage(5);
      }
    );

    // set walls
    this.physics.world.setBounds(0, 0, width, height);

    // set up hot keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shoot = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update(time, delta) {
    const { left, right, up, down } = this.shoot;
    // const { player } = world;
    this.player.update(time, delta);

    if (left.isDown) {
      this.player.left();
    }

    if (right.isDown) {
      this.player.right();
    }

    if (up.isDown) {
      this.player.up();
    }

    if (down.isDown) {
      this.player.down();
    }
  }
}
