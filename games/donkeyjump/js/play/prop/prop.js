/**
 * 道具基础类
 */
function Prop(game) {
  this.game = game;
  this.__name = 'prop';
  this.name = ''; // 道具名称
  this.prop = '';
  this.propsTypes = [
    'prop_spring01',
    'props_balloon',
    'props_gliding01',
    'props_michael',
    'props_super',
    'props_ufo',
  ];
}

Prop.prototype.getFrames = function(img, w, h) {
  var img = this.game.cache.getImage(img);

  var len_w = img.width / w;
  var len_h = img.height / h;
  if (len_h <= 1) {
    len_h = 0;
  }

  var frames = [];
  for (var i = 0; i < len_w + len_h; i++) {
    frames.push(i);
  }
  return frames;
};
/**
 * 初始化一个道具
 */
Prop.prototype.init = function(ops = {}) {
  var name = this.propsTypes[
    this.game.rnd.between(0, this.propsTypes.length - 1)
  ];
  if (ops.name) {
    name = ops.name;
  }

  var img = this.game.cache.getImage(name);
  var minX = ops.x + 10;
  var maxX = minX + ops.wx - img.width - 30;
  this.name = name;
  this.prop = this.game.add.sprite(
    this.game.rnd.between(minX, maxX),
    ops.y,
    name
  );
  this.prop.parentInstance = this;
  this.prop.__name = this.__name;
  this.prop.anchor = { x: 0, y: 1 };
  this.game.physics.arcade.enable(this.prop, Phaser.Physics.ARCADE);
};
/**
 * 踩踏
 */
Prop.prototype.stepon = function() {
  var sounds = this.game.donkeySounds;
  switch (this.name) {
    case 'prop_spring01':
      sounds.play('ogg_spring');
      break;
    case 'props_michael':
      sounds.play('ogg_mj');
      break;
    case 'props_super':
      sounds.play('ogg_super');
      break;
    case 'props_gliding01':
      sounds.play('ogg_gliding');
      break;
    case 'props_ufo':
      sounds.play('ogg_ufo');
      break;
    case 'props_balloon':
      sounds.play('ogg_balloon');
      break;
  }

  if (this.name === 'prop_spring01') {
    this.prop.loadTexture('prop_spring03');
  } else {
    this.prop.kill();
  }
};
