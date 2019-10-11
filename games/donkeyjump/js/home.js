/**
 * 游戏首页状态
 */
function Home() {
  Phaser.State.call(this);
  this.bgSound = null;
  this.bgSoundPlay = false;
}

Home.prototype = {
  constructor: Home,
  init: function() {
    this.game.donkeySounds = new SoundManager(this.game);
    this.createBackground();
    this.createVol();
    this.createShare();
    this.createCup();
    this.createRank();
    this.createStart();
    this.createMore();
  },
  preload: function() {},
  create: function() {},
  update: function() {},
  /**
   * 创建背景层
   */
  createBackground() {
    this.layerBackground = this.game.add.sprite(0, 0, 'system_bg');
    return this.layerBackground;
  },
  /**
   * 创建声音控制层
   */
  createVol() {
    var layer = this.game.add.sprite(15, 15, 'system_icons');
    layer.frameName = this.bgSoundPlay ? 'vol2' : 'vol1';
    layer.inputEnabled = true;
    layer.events.onInputDown.add(function() {
      var frame = 'vol1';
      this.bgSoundPlay = !this.bgSoundPlay;
      if (this.bgSoundPlay) {
        frame = 'vol2';
        this.game.donkeySounds.play('ogg_background');
      } else {
        this.game.donkeySounds.pause('ogg_background');
      }
      layer.frameName = frame;
    }, this);
    return (this.layerVol = layer);
  },
  /**
   * 创建分享菜单
   */
  createShare() {
    var layer = this.game.add.sprite(0, 0, 'system_icons');
    layer.frameName = 'share_left';
    layer.x = this.game.world.width - layer.width;
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
      260,
      455,
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
      535,
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
      175,
      595,
      'system_icons',
      function pressdown() {
        this.game.state.start('play');
        this.game.donkeySounds.play('ogg_background');
        this.bgSoundPlay = true;
      },
      this,
      'start_btn1',
      'start_btn2',
      'start_btn1',
      'start_btn2'
    );
    return (this.layerStart = layer);
  },
  createMore() {
    var layer = this.game.add.button(
      345,
      535,
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
