const world = require('../world');
const { width, height } = require('../constants');
const Bullets = require('../objects/Bullet');

module.exports = function create() {
  // spawn player
  const player = this.add.ball(300, 400, 30, 30, 0xffffff);
  world.player = this.physics.add.existing(player);

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

  // this.physics.add.overlap(this.bulletsGroup, target, (bullet, target) => {
  //   bullet.setVisible(false);
  //   bullet.setActive(false);
  //   target.setVisible(false);
  //   target.setActive(false);
  //   target.body.enable = false;
  // });

  // set walls
  this.physics.world.setBounds(0, 0, width, height);
};
