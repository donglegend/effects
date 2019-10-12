/**
 * 游戏初始化,启动游戏
 */
function Boot() {
  Phaser.State.call(this);
}

Boot.prototype = {
  constructor: Boot,
  init: function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  preload: function() {
    this.game.load.image('loading', 'images/frames/donkey/daiji.png');
  },
  create: function() {
    this.game.state.start('loader');
  },
};
