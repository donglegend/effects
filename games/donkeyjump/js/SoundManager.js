/**
 * 游戏所有音频管理类
 */
function SoundManager(game) {
  this.game = game;
  this.init();
}
SoundManager.prototype = {
  constructor: SoundManager,
  init: function() {
    var self = this;
    SOURCES.audios.forEach(function(item) {
      self[item.id] = self.game.add.audio(item.id, 1, !!item.loop);
    });
  },
  play: function(id) {
    this[id].play();
  },
  pause: function(id) {
    this[id].pause();
  },
};
