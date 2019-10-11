/**
 * fn: 云阶梯基础类
 */
function Stair(game) {
  this.game = game;
  this.name = '';
  this.__name = 'stair';
  this.prop = null;
  this.stairTypes = [
    'stair_friable', // 脆弱的云
    'stair_moveable', // 移动的云
    'stair_stable_01',
    'stair_stable_02',
    'stair_stable_03',
    'stair_stable_04',
    'stair_stable_05',
  ];
}
Stair.prototype.getFrames = function(img, w, h) {
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
Stair.prototype.init = function(ops = {}) {
  var name = this.stairTypes[
    this.game.rnd.between(0, this.stairTypes.length - 1)
  ];
  if (ops.name) {
    name = ops.name;
  }
  this.name = name;
  this.stair = this.game.add.sprite(
    this.game.rnd.between(0, this.game.world.width - 155),
    ops.y,
    name
  );
  this.stair.parentInstance = this;
  this.stair.__name = this.__name;
  // 脆弱的云
  if (name === 'stair_friable') {
    var frames = this.getFrames('stair_friable', 256, 128);
    this.stair.tween = this.stair.animations.add(
      'fragmetation',
      frames,
      10,
      false
    );
    this.stair.tween.onComplete.add(function() {
      this.stair.visible = false;
    }, this);
  }
  // 移动的云
  if (name === 'stair_moveable') {
    this.stair.x = 0;
    this.stair.frame = 0;
    this.tween = this.game.add.tween(this.stair);
    this.tween.to(
      {
        x: this.game.world.width - 155,
      },
      this.game.rnd.between(1500, 4000),
      null,
      true,
      this.game.rnd.between(0, 1000),
      -1,
      true
    );
  }
  this.stair.anchor = { x: 0, y: 0 };
  this.game.physics.arcade.enable(this.stair, Phaser.Physics.ARCADE);
  this.stair.body.setSize(155, 10, 0, 0);
};
Stair.prototype.stepon = function() {
  if (this.name === 'stair_friable') {
    this.stair.tween.play('fragmetation');
    this.game.donkeySounds.play('ogg_step_broken');
  }
  if (this.name === 'stair_moveable') {
    this.stair.frame = 1;
    this.game.time.events.add(
      Phaser.Timer.SECOND / 15,
      function() {
        this.stair.frame = 0;
      },
      this
    );
  }
};
