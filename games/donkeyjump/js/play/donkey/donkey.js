// class Donkey extends Phaser.Sprite {}
/**
 * fn: donkey核心类
 */
function Donkey(game) {
  this.game = game;
  this.donkeyGroup = null;
  this.donkey = null;
  this.direction = 'front';
  this.cameramoving = false;
  this.donkeymoving = false;

  this.states = [
    { key: 'daiji', frameRate: 0, physicsW: 128, physicsH: 128 },
    { key: 'run', frameRate: 25, physicsW: 85, physicsH: 100 },
    { key: 'dead', frameRate: 15, physicsW: 128, physicsH: 128 },
    {
      key: 'jump',
      frameRate: 10,
      physicsW: 45,
      physicsH: 10,
      physicsOffsetX: 40,
      physicsOffsetY: 100,
      distance: 260,
      _distance: 0,
    },
    {
      key: 'spring',
      frameRate: 10,
      physicsW: 45,
      physicsH: 10,
      physicsOffsetX: 40,
      physicsOffsetY: 100,
      distance: 1200,
      acceY: 0.5,
    },
    {
      key: 'MJ',
      frameRate: 10,
      physicsW: 128,
      physicsH: 128,
      distance: 1200,
      acceY: 0.18,
    },
    {
      key: 'plan',
      frameRate: 10,
      physicsW: 128,
      physicsH: 128,
      distance: 2000,
      acceY: 0.1,
    },
    {
      key: 'qiqiu',
      frameRate: 10,
      physicsW: 128,
      physicsH: 128,
      distance: 800,
      acceY: 0.1,
    },
    {
      key: 'superjump',
      frameRate: 10,
      physicsW: 128,
      physicsH: 128,
      distance: 1200,
      acceY: 0.2,
    },
    {
      key: 'UFO',
      frameRate: 10,
      physicsW: 128,
      physicsH: 128,
      distance: 800,
      acceY: 0.09,
    },
  ];

  this.state = '';
  this.x = game.world.centerX;
  this.y = 600;
  this.minY = 400;
  this.gameCameraSpeedY = 0;
  this.__updateDuration = 0;
  this.initState();
}
Donkey.STATE = {
  DAIJI: 'daiji',
  RUN: 'run',
  DEAD: 'dead',
  JUMP: 'jump',
  SPRING: 'spring',
  MJ: 'MJ',
  PLAN: 'plan',
  QIQIU: 'qiqiu',
  SUPERJUMP: 'superjump',
  UFO: 'UFO',
};
Donkey.PROP_STATE = {
  prop_spring01: Donkey.STATE.SPRING,
  props_balloon: Donkey.STATE.QIQIU,
  props_gliding01: Donkey.STATE.PLAN,
  props_michael: Donkey.STATE.MJ,
  props_super: Donkey.STATE.SUPERJUMP,
  props_ufo: Donkey.STATE.UFO,
};
Donkey.prototype.getFrames = function(img, w, h) {
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
 * 初始化donkey的所有形态
 */
Donkey.prototype.initState = function() {
  this.donkeyGroup = this.game.add.group();
  this.donkeyGroup.enableBody = true;
  this.donkeyGroup.enableBodyDebug = true;
  this.donkeyGroup.physicsBodyType = Phaser.Physics.ARCADE;
  this.states.forEach((item, index) => {
    var key = item.key;
    var imgKey = key === 'spring' ? 'jump' : key;
    var frameRate = item.frameRate;
    var imgObj = this.game.cache.getImage(imgKey, true);
    this[key] = this.game.add.sprite(this.x, this.y, imgKey);
    this[key].anchor = { x: 0.5, y: 0.5 };
    var frams = this.getFrames(imgKey, imgObj.frameWidth, imgObj.frameHeight);
    this[key].animations.add(key, frams, frameRate, true);
    this[key].animations.play(key);
    this[key].visible = false;
    this[key].fixedToCamera = false;
    this[key].speedY = 0;
    this[key].distance = item.distance;
    this[key]._distance = item._distance || 0;
    this[key].acceY = item.acceY || 0;
    this.game.physics.arcade.enable(this[key], Phaser.Physics.ARCADE);
    // this[key].body.collideWorldBounds = true;

    this[key].body.setSize(
      item.physicsW,
      item.physicsH,
      item.physicsOffsetX || 0,
      item.physicsOffsetY || 0
    );
    this[key]._update = this['_update' + key].bind(this);
    this.donkeyGroup.add(this[key]);
  });
  this.setState(Donkey.STATE.DAIJI);
};
/**
 * 切换donkey的各种形态
 */
Donkey.prototype.setState = function(s) {
  if (s === this.state) {
    return;
  }
  if (this.state) {
    this[this.state].visible = false;
    this.donkeyGroup.setAll('x', this[this.state].x);
    this.donkeyGroup.setAll('y', this[this.state].y);
    this.donkeyGroup.setAll(
      'body.velocity.x',
      this[this.state].body.velocity.x
    );
    this.donkeyGroup.setAll('scale.x', this[this.state].scale.x);
  }
  this.state = s;
  this[this.state].visible = true;
  this.donkey = this[this.state];
  // 重置相机移动速度
  this.gameCameraSpeedY = 0;
  this.__updateDuration = 0;
};
/**
 * 视口移动
 */
Donkey.prototype.viewPortMove = function() {
  this.donkey.y += this.donkey.speedY;
  this.game.camera.y += this.gameCameraSpeedY;
};
/**
 * 键盘事件控制
 */
Donkey.prototype._keyControl = function(params) {
  var ops = params || {};
  var vx = ops.vx || 300;
  if (this.game.cursors.left.isDown || this.game.virtualCursors.left.isDown) {
    if (this.donkey.x < 0) {
      this.donkey.x = this.game.world.width;
    }
    if (this.direction !== 'left') {
      this.direction = 'left';
      this.donkey.scale.x = -1;
      this.donkey.body.velocity.x = vx * -1;
    }
  } else if (
    this.game.cursors.right.isDown ||
    this.game.virtualCursors.right.isDown
  ) {
    if (this.donkey.x > this.game.world.width) {
      this.donkey.x = 0;
    }
    if (this.direction !== 'right') {
      this.direction = 'right';
      this.donkey.scale.x = 1;
      this.donkey.body.velocity.x = vx;
    }
  } else {
    this.direction = 'front';
    this.donkey.body.velocity.x = 0;
  }
};
Donkey.prototype._soundControl = function() {
  var sounds = this.game.donkeySounds;
  switch (this.state) {
    case Donkey.STATE.SUPERJUMP:
      sounds.play('ogg_super');
      break;
    case Donkey.STATE.JUMP:
      sounds.play('ogg_jump');
      break;
    case Donkey.STATE.DEAD:
      sounds.play('ogg_die');
      break;
    default:
      break;
  }
};
/**
 * 待机预备态更新函数
 */
Donkey.prototype._updatedaiji = function() {
  if (this.game.layerReady.ready) {
    this.setState(Donkey.STATE.SUPERJUMP);
    this._soundControl();
    return;
  }
  this._keyControl();
  if (this.direction === 'front') {
    if (this.state !== Donkey.STATE.DAIJI) {
      this.setState(Donkey.STATE.DAIJI);
    }
  } else {
    if (this.state !== Donkey.STATE.RUN) {
      this.setState(Donkey.STATE.RUN);
    }
  }
};
Donkey.prototype._updaterun = Donkey.prototype._updatedaiji;
/**
 * 死亡态更新函数
 */
Donkey.prototype._updatedead = function() {
  // 把镜头向下拉倒donkey的最小位置
  this.donkey.body.velocity.x = 0;
  if (this.donkey.y > this.game.camera.y + this.game.camera.height) {
    console.log('游戏结束');
    this.game.state.start('gameover');
    return;
  }
  if (this.game.camera.y < this.minY) {
    this.gameCameraSpeedY = 10;
  } else {
    this.gameCameraSpeedY = 0;
    this.donkey.speedY = 10;
  }
  this.viewPortMove();
};
/**
 * 普通跳跃更新函数
 */
Donkey.prototype._updatejump = function() {
  /**
   * 先判断是否 dead
   */
  var deadY = this.game.layerStairs.getChildAt(0).y;
  if (this.donkey.y > deadY) {
    this.setState(Donkey.STATE.DEAD);
    this._soundControl();
    return;
  }
  // 第一次，处刷会执行因为默认速度为0
  if (this.donkey.speedY === 0) {
    this.donkey.speedY = 10;
  }
  // 驴子普通跳跃到达最高点，速率变为反向
  if (Math.abs(this.donkey._distance) >= this.donkey.distance) {
    this.donkey.speedY = 1;
    this.donkey._distance = 0;
  }
  // 累计 跳跃距离
  if (this.donkey.speedY < 0) {
    this.donkey._distance += this.donkey.speedY;
  }
  // 驴子高度超过界值, 移动镜头，同时刷新驴子位置
  if (this.donkey.y < this.minY) {
    this.gameCameraSpeedY = -10;
    this.minY += -10;
    // console.log('驴子最小高度', this.minY);
    // 刷新 驴子最小高度
  } else {
    this.gameCameraSpeedY = 0;
  }
  if (this.donkey.speedY < -2) {
    this.donkey.speedY += 0.1;
  }
  if (this.donkey.speedY > 0 && this.donkey.speedY < 12) {
    this.donkey.speedY += 0.5;
  }
  // 判断碰撞
  var isDown = this.donkey.speedY > 0;
  if (isDown) {
    this.game.physics.arcade.overlap(
      [this.game.layerStairs, this.game.layerProps],
      this.donkey,
      function(donkey, object) {
        if (object.__name === 'prop') {
          // 处理道具
          this.setState(Donkey.PROP_STATE[object.key]);
          if (object.key !== 'prop_spring01') {
            this.game.layerProps.remove(object, true);
          }
          object.parentInstance.stepon();
        } else {
          // 正常踩踏云阶梯
          this._soundControl();
          this.game.cloud.show(donkey.x, object.y); // 践踏效果
          object.parentInstance.stepon();
          donkey.speedY = -10;
        }
      },
      null,
      this
    );
  }
  this._keyControl({
    vx: 350,
  });
  this.viewPortMove();
};
/**
 * 道具状态基础更新函数
 */
Donkey.prototype.__updateProp = function() {
  if (this.donkey.y <= this.minY - this.donkey.distance) {
    this.minY = this.minY - this.donkey.distance;
    this.setState(Donkey.STATE.JUMP);
    return;
  }
  if (this.donkey.y > this.minY - this.donkey.distance) {
    var a = this.donkey.acceY;
    this.donkey.speedY =
      -Math.sqrt(2 * a * this.donkey.distance) * 0.8 +
      a * this.__updateDuration * 2;
    if (this.donkey.speedY > 0) {
      this.donkey.speedY = -10;
    }
  } else {
    this.donkey.speedY = 0;
  }
  // donkey and camere 同步移动
  if (this.donkey.y <= this.minY) {
    this.gameCameraSpeedY = this.donkey.speedY;
  } else {
    this.gameCameraSpeedY = 0;
  }
  this._keyControl();
  this.viewPortMove();
};
Donkey.prototype._updatespring = Donkey.prototype.__updateProp;
Donkey.prototype._updateMJ = Donkey.prototype.__updateProp;
Donkey.prototype._updateplan = Donkey.prototype.__updateProp;
Donkey.prototype._updatesuperjump = Donkey.prototype.__updateProp;
Donkey.prototype._updateqiqiu = Donkey.prototype.__updateProp;
Donkey.prototype._updateUFO = Donkey.prototype.__updateProp;
/**
 * 帧更新函数
 */
Donkey.prototype.update = function() {
  this.donkey._update();
  this.__updateDuration += 0.16;
};
