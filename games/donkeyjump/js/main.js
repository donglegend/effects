/**
 * author: dongsheng
 * fn: 游戏驴子跳跳
 * 开发结构说明:
 * 游戏初步分为以下几个状态模块：
 * states = {
 *   boot: '初始化',
 *   loader: '加载状态',
 *   home: '首页状态',
 *   play: '游戏状态',
 *   gameover: '游戏结束',
 * };
 */

var game = new Phaser.Game(480, 800, Phaser.CANVAS, '', null, true);
var DStates = {
  boot: new Boot(),
  loader: new Loader(),
  home: new Home(),
  play: new Play(),
  gameover: new GameOver(),
};
Object.entries(DStates).forEach(([key, state]) => {
  game.state.add(key, state);
});
game.state.start('boot');
