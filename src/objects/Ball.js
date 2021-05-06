import Phaser from 'phaser';

const ACCELERATION = 70;

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'ball');
    this.scene = scene;
    this.initialized = false;
    this.cooldown = 500;
    this.nextShot = 0;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(0.9, 0.9);
    this.health = 1;
  }

  left() {
    this.body.setVelocityX(this.body.velocity.x - ACCELERATION);
  }

  right() {
    this.body.setVelocityX(this.body.velocity.x + ACCELERATION);
  }

  up() {
    this.body.setVelocityY(this.body.velocity.y - ACCELERATION);
  }

  down() {
    this.body.setVelocityY(this.body.velocity.y + ACCELERATION);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      // this will remove the killed ball from the game
      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
      this.setVelocityX(0);
      this.setVelocityY(0);
    }
  }

  shoot(time) {
    if (this.scene.input.activePointer.leftButtonDown()) {
      const colors = [
        0x00ff00,
        0xff0000,
        0x0000ff,
        0xffff00,
        0xffa500,
        0x4b0082,
        0xee82ee,
      ];

      if (time > this.nextShot) {
        const target = this.scene.input.activePointer;
        const pickedColor = Math.floor(Math.random() * colors.length);
        const bullet = this.scene.add.bullet(this, target, colors[pickedColor]);
        this.scene.physics.add.existing(bullet);
        this.scene.bulletsGroup.add(bullet);
        this.nextShot = time + this.cooldown;
      }
    }
  }

  update(time, delta) {
    if (this.health > 0) this.shoot(time);
  }
}
