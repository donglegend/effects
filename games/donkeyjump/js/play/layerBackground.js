/**
 * fn: 游戏背景模块
 * 大概分为以下几层：
 *  - 天空层
 *  - 远山层
 *  - 近山层
 *  - 房屋层
 */
(function() {
  function createBackground(game, context) {
    return {
      layerSky: createSky(game),
    };
  }
  function createSky(game) {
    var sky = game.add.sprite(0, 0, 'bg_sky');
    return sky;
  }
})();
