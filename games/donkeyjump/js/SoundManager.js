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
    // if (this[id].isPlaying) {
    //   return;
    // }
    this[id].play();
  },
  pause: function(id) {
    this[id].pause();
  },
};
