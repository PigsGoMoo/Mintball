import Phaser from 'phaser';

const ACCELERATION = 40;

export default class EnemyBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'ball');
    this.scene = scene;
    this.initialized = false;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(0.9, 0.9);
    this.health = 1;
    this.spawn();
    this.bounceTime = 0;
    this.bounceCooldown = 5000;

    this.spawn = this.spawn.bind(this);
    this.split = this.split.bind(this);
    this.explode = this.explode.bind(this);
    this.randomBounce = this.randomBounce.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
  }

  spawn() {
    this.setVelocityX(Math.random() * 1000);
    this.setVelocityY(Math.random() * 900);
  }

  split() {
    // we want to duplicate the ball when it's hit
    let ballOne = new EnemyBall(this.scene, this.x + 30, this.y + 5);
    let ballTwo = new EnemyBall(this.scene, this.x + 3, this.y + 10);
    ballOne.setScale(0.15).setTint(0x800080);
    ballTwo.setScale(0.15).setTint(0x800080);
    this.scene.enemiesGroup.add(ballOne);
    this.scene.enemiesGroup.add(ballTwo);
    ballTwo.setVelocityX(Math.random() * 1000 + 100);
    ballTwo.setVelocityY(Math.random() * 500);
    ballOne.setVelocityX(Math.random() * 2000 + 100);
    ballOne.setVelocityY(Math.random() * 1000);
  }

  explode() {
    for (let i = 0; i < 5; i++) {
      const ball = new EnemyBall(
        this.scene,
        this.x + Math.random() * 30,
        this.y + Math.random() * 30
      );
      this.scene.explodeGroup.add(ball);
      ball.setScale(0.15).setTint(0x800080);
      ball.setVelocityX(Math.random() * 100);
      ball.setVelocityY(Math.random() * 1000 + 500);
      this.scene.time.delayedCall(1000, () => {
        ball.takeDamage(5);
      });
    }
  }

  randomBounce() {
    this.setVelocityY(Math.random() * 2000);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      // this will remove the killed ball from the game
      if (this.tintTopLeft === 16711680) this.explode();
      if (this.tintTopLeft === 255) this.split();
      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
      this.setVelocityX(0);
      this.setVelocityY(0);
    }
  }

  update(time, delta) {
    if (time > this.bounceTime) {
      this.randomBounce();
      this.bounceTime = time + this.bounceCooldown;
    }
  }
}
