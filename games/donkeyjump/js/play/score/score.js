/**
 * 得分UI类
 */
function Score(game) {
  this.game = game;
  this.group = game.add.group();
  this.group.fixedToCamera = true;
  this.score = 0;
  this.init();
}
Score.prototype.init = function() {
  var layerBg = this.game.add.sprite(12, 8, 'system_icons');
  layerBg.frameName = 'money';
  this.group.addChild(layerBg);

  var layerText = this.game.add.group();
  layerText.x = layerBg.x + 65;
  layerText.y = layerBg.y + 30;
  this.layerText = layerText;
  this.group.addChild(layerText);

  this.update(this.score);
};
Score.prototype.update = function(score) {
  if (!score || score < 0) {
    score = 0;
  }
  this.score = score;
  this.layerText.removeAll(true, true);
  var nums = ('' + score).split('');
  for (var i = 0, len = nums.length; i < len; i++) {
    var layer = this.layerText.create(i * 15, 0, 'system_icons');
    layer.frameName = 'num' + nums[i];
    layer.anchor = { x: 0.5, y: 0 };
  }
};
