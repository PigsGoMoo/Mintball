import Phaser from 'phaser';
import EnemyBall from '../objects/EnemyBall';

export default function () {
  // this function will spawn in the enemy after 5 seconds or after current enemy is killed
  // 10 enemies max
  const colors = [0xff0000, 0x0000ff, 0xff084a];

  this.time.delayedCall(5000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(10000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(15000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(20000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(25000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(30000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(35000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(40000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(45000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
  this.time.delayedCall(50000, () => {
    const ball = new EnemyBall(this, Math.random() * 750, Math.random() * 500);
    this.enemiesGroup.add(ball);
    const index = Math.floor(Math.random() * 3);
    ball.setScale(0.15).setTint(colors[index]);
  });
}
