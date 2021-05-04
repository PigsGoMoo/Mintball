const Phaser = require('phaser');

const ACCELERATION = 40;

export default class Ball extends Phaser.GameObjects.Ellipse {
  constructor(scene, ...args) {
    super(scene, ...args);
    this.scene = scene;
    this.initialized = false;
    this.cooldown = 100;
    this.nextShot = 0;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
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

// this is a factory function
// Phaser.GameObjects.GameObjectFactory.register('ball', function (...args) {
//   const ball = new Ball(this.scene, ...args);

//   this.displayList.add(ball);
//   this.updateList.add(ball);

//   return ball;
// });
