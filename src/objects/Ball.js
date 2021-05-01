const Phaser = require('phaser');

const ACCELERATION = 40;
class Ball extends Phaser.GameObjects.Ellipse {
  constructor(scene, ...args) {
    super(scene, ...args);
    this.initialized = false;
    scene.add.existing(this);
    this.cooldown = 100;
    this.nextShot = 0;
  }

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.body.collideWorldBounds = true;
      this.body.bounce.setTo(0.9, 0.9);
    }
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

  shoot(target) {
    const colors = [
      0x00ff00,
      0xff0000,
      0x0000ff,
      0xffff00,
      0xffa500,
      0x4b0082,
      0xee82ee,
    ];
    const pickedColor = Math.floor(Math.random() * colors.length);
    const bullet = this.scene.add.bullet(this, target, colors[pickedColor]);
    this.scene.physics.add.existing(bullet);
    this.scene.bulletsGroup.add(bullet);
    // const bullet = this.scene.add.bullet(this.x, this.y, x, y);
  }

  update(time, delta) {}
}

Phaser.GameObjects.GameObjectFactory.register('ball', function (...args) {
  const ball = new Ball(this.scene, ...args);

  this.displayList.add(ball);
  this.updateList.add(ball);

  return ball;
});
