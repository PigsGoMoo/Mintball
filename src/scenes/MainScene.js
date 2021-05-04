import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    // whenever we want access to the scene we need to grab it with this name exactly
    super('MainScene');
  }

  create() {
    this.scene.launch('GameScene');
    console.log(`Main Scene`);
  }
}
