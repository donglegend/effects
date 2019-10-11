/**
 * 游戏结束状态
 */
function GameOver() {
  Phaser.State.call(this);
}
GameOver.prototype = {
  constructor: GameOver,
  init: function() {
    this.createBackground();
    this.createScore();
    this.createShare();
    this.createCup();
    this.createRank();
    this.createStart();
    this.createMore();
  },
  preload: function() {},
  create: function() {},
  update: function() {},
  createBackground() {
    this.layerBackground = this.game.add.sprite(0, 0, 'system_bg');
    this.layerBackground.frame = 1;
    return this.layerBackground;
  },
  createScore: function() {
    this.layerUser = game.add.text(115, 468, '我好菜!', {
      fill: '#222222',
      fontSize: '26px',
    });

    this.layerScore = game.add.text(115, 501, window.donkeyScore || 0, {
      fill: '#222222',
      fontSize: '28px',
    });
  },
  createShare() {
    var layer = this.game.add.sprite(0, 0, 'system_icons');
    layer.frameName = 'share_right';
    layer.x = 0;
    layer.inputEnabled = true;
    layer.events.onInputDown.add(function() {
      alert('暂无自动分享功能!');
    });
    return (this.layerShare = layer);
  },
  /**
   * 创建奖杯
   */
  createCup() {
    var layer = this.game.add.button(
      380,
      515,
      'system_icons',
      function pressdown() {
        alert('暂未开放!');
      },
      this,
      'jiangbei1',
      'jiangbei2',
      'jiangbei1',
      'jiangbei2'
    );
    return (this.layerCup = layer);
  },
  /**
   * 创建排行榜
   */
  createRank() {
    var layer = this.game.add.button(
      20,
      600,
      'system_icons',
      function pressdown() {
        alert('暂未开放!');
      },
      this,
      'rank1',
      'rank2',
      'rank1',
      'rank2'
    );
    return (this.layerRank = layer);
  },
  createStart() {
    var layer = this.game.add.button(
      168,
      600,
      'system_icons',
      function pressdown() {
        this.game.state.start('play');
      },
      this,
      'ready_btn1',
      'ready_btn2',
      'ready_btn1',
      'ready_btn2'
    );
    return (this.layerStart = layer);
  },
  createMore() {
    var layer = this.game.add.button(
      331,
      600,
      'system_icons',
      function pressdown() {
        alert('暂未开放!');
      },
      this,
      'more1',
      'more2',
      'more1',
      'more2'
    );
    return (this.layerMore = layer);
  },
};
