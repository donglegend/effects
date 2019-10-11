/**
 * 游戏开始的 预备状态
 */
function ReadyGo(game) {
  this.game = game;
  this.layerReady = null;
  this.layerGo = null;
  this.ready = false;
  this.init();
  this.go();
}

ReadyGo.prototype.init = function() {
  this.cx = this.game.world.centerX;
  this.cy = this.game.world.centerY;

  this.layerReady = this.createLayer({
    frameName: 'ready',
  });
  this.layerGo = this.createLayer({
    frameName: 'go',
  });
};

ReadyGo.prototype.createLayer = function(ops) {
  var layer = this.game.add.sprite(this.cx, this.cy, 'system_icons');
  layer.frameName = ops.frameName;
  layer.anchor = { x: 0.5, y: 0.5 };
  layer.visible = false;
  return layer;
};

ReadyGo.prototype.createTween = function() {
  this.addTween(this.layerReady, {
    callback: function() {
      this.layerReady.visible = false;
      this.layerGo.tween.start();
    },
  });
  this.addTween(this.layerGo, {
    callback: function() {
      console.log('游戏开始');
      this.game.donkeySounds.play('ogg_go');
      this.layerGo.visible = false;
      this.ready = true;
    },
  });
};

ReadyGo.prototype.addTween = function(layer, ops) {
  layer.tween = this.game.add.tween(layer.scale);
  layer.tween.from(
    {
      x: 2,
      y: 2,
    },
    400,
    Phaser.Easing.Circular.In,
    false,
    100,
    0,
    false
  );
  layer.tween.onStart.add(function() {
    layer.visible = true;
    this.game.donkeySounds.play('ogg_321');
  }, this);
  layer.tween.onComplete.add(function() {
    this.game.time.events.add(1000, ops.callback, this);
  }, this);
};

ReadyGo.prototype.go = function() {
  this.ready = false;
  this.createTween();
  this.layerReady.tween.start();
};
