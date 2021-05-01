const Phaser = require('phaser');

const SPEED = 1500;

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, player, pointer, color) {
    super(scene, player.x, player.y, 5, 5, color);
    this.lifespan = 5000;
    this.pointer = pointer;
    this.initialized = false;

    scene.add.existing(this);
  }

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.scene.physics.moveToObject(this, this.pointer, SPEED);
      this.body.collideWorldBounds = true;
      this.body.bounce.setTo(0.9, 0.9);
      this.initialized = true;
    }
  }

  update(time, delta) {
    console.log('Update running on bullet');
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register('bullet', function (...args) {
  const bullet = new Bullet(this.scene, ...args);

  this.displayList.add(bullet);
  this.updateList.add(bullet);

  return bullet;
});
