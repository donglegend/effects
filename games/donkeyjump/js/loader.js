/**
 * 游戏加载器
 */
function Loader() {
  Phaser.State.call(this);
  this.layerLoadIcon = null;
  this.layerLoadText = null;
  this.progress = 0;
}
Loader.prototype = {
  constructor: Loader,
  init: function() {
    const game = this.game;
    // loading icon
    var loading = game.add.image(
      game.world.centerX,
      game.world.centerY - 50,
      'loading'
    );
    this.layerLoadIcon = loading;
    loading.anchor = { x: 0.5, y: 0.5 };

    game.add
      .tween(loading)
      .to(
        { y: game.world.centerY - 60 },
        300,
        Phaser.Easing.Back.Out,
        true,
        0,
        -1,
        true
      );
    // loading text
    this.layerLoadText = game.add.text(
      game.world.centerX,
      loading.y + loading.height / 2.7,
      '资源加载中0%',
      {
        fill: '#000',
        fontSize: '16px',
      }
    );
    this.layerLoadText.anchor = { x: 0.5, y: 0.5 };
  },
  preload: function() {
    var game = this.game;
    var layerLoadText = this.layerLoadText;
    SOURCES.scripts.forEach(function(item) {
      game.load.script(item.id, item.url);
    });
    SOURCES.imgs.forEach(function(item) {
      switch (item.type) {
        case 'spritesheet':
          game.load.spritesheet(item.id, item.url, item.width, item.height);
          break;
        case 'atlasJSONHash':
          game.load.atlasJSONHash(item.id, item.url, item.atlasURL);
          break;
        default:
          game.load.image(item.id, item.url);
          break;
      }
    });
    SOURCES.audios.forEach(function(item) {
      game.load.audio(item.id, item.src + '.mp3');
    });

    game.load.onFileComplete.add(function progress(p, key, success) {
      var text = '请稍后,资源加载中' + p + '%';
      layerLoadText.text = text;
    });
  },
  create: function() {
    this.time.events.add(
      Phaser.Timer.SECOND / 2,
      function() {
        this.game.state.start('home');
      },
      this
    );
  },
};
