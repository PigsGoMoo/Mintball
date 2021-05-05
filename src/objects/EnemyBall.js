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
  }

  split() {
    // we want to duplicate the ball when it's hit
    let ballOne = new EnemyBall(this.scene, this.x + 30, this.y + 5);
    let ballTwo = new EnemyBall(this.scene, this.x + 3, this.y + 10);
    // ballOne.body.setVelocityX(Math.random() * 1000);
    ballOne.setScale(0.15).setTint(0x800080);
    // ballOne.setVelocityX(1000);
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
      ball.setScale(0.15).setTint(0x800080);
      this.scene.enemiesGroup.add(ball);
      ball.setVelocityX(Math.random() * 100);
      ball.setVelocityY(Math.random() * 300);
      this.scene.time.delayedCall(1000, () => {
        this.takeDamage(5);
      });
      console.log('for loop i = ', i);
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      // this will remove the killed ball from the game

      if (this.tintTopLeft === 16711680) this.explode();

      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
      this.setVelocityX(0);
      this.setVelocityY(0);
      console.log('inside if statement');
    }
    console.log('taking damage');
  }

  update(time, delta) {
    // this.on('pointerdown', function (pointer) {
    //   if (time > this.nextShot) {
    //     this.shoot(pointer);
    //     this.nextShot = time + this.cooldown;
    //   }
    // });
  }
}

// this is a factory function
// Phaser.GameObjects.GameObjectFactory.register('ball', function (...args) {
//   const ball = new Ball(this.scene, ...args);

//   this.displayList.add(ball);
//   this.updateList.add(ball);

//   return ball;
// });
