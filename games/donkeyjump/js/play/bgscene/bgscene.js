/**
 * 游戏状态背景层类
 * 天空、远山、近丘、房屋
 */
function BgScene(game) {
  this.game = game;
  this.group = game.add.group();
  this.group.fixedToCamera = true;
  this.layerSky = null;
  this.layerHill = null;
  this.layerHillNear = null;
  this.layerHouse = null;
  this.init();
}
BgScene.prototype = {
  init: function() {
    this.group.addChild(this.createSky());
    this.group.addChild(this.createHill());
    this.group.addChild(this.createHillNear());
    this.group.addChild(this.createHouse());
  },
  update: function(distance) {
    [
      this.layerSky,
      this.layerHill,
      this.layerHillNear,
      this.layerHouse,
    ].forEach(layer => {
      if (layer.key === 'bg_sky') {
        if (layer.y < 0) {
          layer.y =
            this.game.world.height - layer.height - distance * layer.forcey;
        }
      } else {
        if (layer.y < this.game.world.height) {
          layer.y =
            this.game.world.height - layer.height - distance * layer.forcey;
        }
      }
    });
  },
  createSky: function() {
    var img = this.game.cache.getImage('bg_sky');
    var layer = this.game.add.sprite(
      0,
      this.game.world.height - img.height,
      'bg_sky'
    );

    layer.forcey = 0.03;
    return (this.layerSky = layer);
  },
  createHill: function() {
    var img = this.game.cache.getImage('bg_hill');
    var layer = this.game.add.sprite(
      0,
      this.game.world.height - img.height,
      'bg_hill'
    );
    layer.forcey = 0.09;
    return (this.layerHill = layer);
  },
  createHillNear: function() {
    var img = this.game.cache.getImage('bg_hillnear');
    var layer = this.game.add.sprite(
      0,
      this.game.world.height - img.height,
      'bg_hillnear'
    );
    layer.forcey = 0.12;
    return (this.layerHillNear = layer);
  },
  createHouse: function() {
    var img = this.game.cache.getImage('bg_floor');
    var layer = this.game.add.sprite(
      0,
      this.game.world.height - img.height,
      'bg_floor'
    );
    layer.forcey = 0.15;
    return (this.layerHouse = layer);
  },
};
