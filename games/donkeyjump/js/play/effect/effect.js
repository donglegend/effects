/**
 * 踩踏效果类
 */
function EffectCloud(game) {
  this.game = game;
  this.cloud = null;
}
EffectCloud.prototype.init = function(ops = {}) {
  this.cloud = this.game.add.sprite(ops.x || 0, ops.y || 0, 'cloud');
  this.cloud.anchor = { x: 0.3, y: 1 };
  this.cloud.visible = false;
  this.anim = this.cloud.animations.add('effect', [0, 1, 2, 3], 5, false);
  this.anim.onStart.add(function() {
    this.cloud.visible = true;
  }, this);
  this.anim.onComplete.add(function() {
    this.cloud.visible = false;
  }, this);
};
EffectCloud.prototype.show = function(x, y) {
  this.cloud.x = x;
  this.cloud.y = y;
  this.cloud.animations.play('effect');
};
