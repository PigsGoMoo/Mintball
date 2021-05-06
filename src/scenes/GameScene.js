import Phaser from 'phaser';
import Bullets from '../objects/Bullet';
import { width, height } from '../config/constants';
import Ball from '../objects/Ball';
import EnemyBall from '../objects/EnemyBall';
import { levelOne } from '../levels/';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  reset() {
    this.player.setPosition(300, 400);
  }

  preload() {
    this.load.image('ball', '../../public/assets/Image/ball.png');
  }

  // this is a method on the class
  create() {
    console.log(this.children);
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
      enable: true,
    });
    this.enemiesGroup.defaults = {};
    this.explodeGroup = this.physics.add.group({
      classType: EnemyBall,
      runChildUpdate: true,
      collideWorldBounds: true,
      bounceX: 0.9,
      bounceY: 0.9,
      gravityY: 2000,
      enable: true,
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
        target.takeDamage(5);
      }
    );
    // this is making it so that when we get hit we die
    this.physics.add.overlap(
      this.player,
      this.enemiesGroup,
      (player, enemy) => {
        player.takeDamage(5);
        console.log('you have died');
      }
    );
    this.physics.add.overlap(
      this.player,
      this.explodeGroup,
      (player, enemy) => {
        player.takeDamage(5);
        console.log('you have died');
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

    levelOne.call(this);
  }

  update(time, delta) {
    const { left, right, up, down } = this.shoot;
    this.player.update(time, delta);

    if (this.shoot.space.isDown) {
      const countActive = this.enemiesGroup.countActive();
      console.log(countActive);
    }
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
