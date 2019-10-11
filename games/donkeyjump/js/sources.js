/**
 * 游戏资源合集
 */
var SOURCES = {
  scripts: [
    // { id: 'sources', url: 'js/sources.js' },
    // { id: 'boot', url: 'js/boot.js' },
    // { id: 'loader', url: 'js/loader.js' },
    // { id: 'home', url: 'js/home.js' },
    // { id: 'play', url: 'js/play.js' },
    // { id: 'gameover', url: 'js/gameover.js' },
    { id: 'donkey', url: 'js/play/donkey/donkey.js' },
    { id: 'bgscene', url: 'js/play/bgscene/bgscene.js' },
    { id: 'prop', url: 'js/play/prop/prop.js' },
    { id: 'stair', url: 'js/play/stair/stair.js' },
    { id: 'effect', url: 'js/play/effect/effect.js' },
    { id: 'score', url: 'js/play/score/score.js' },
    { id: 'ready', url: 'js/play/ready/ready.js' },
    { id: 'SoundManager', url: 'js/SoundManager.js' },
  ],
  imgs: [
    // 背景图
    {
      id: 'bg_floor',
      url: 'images/background/floor.png',
    },
    {
      id: 'bg_hill',
      url: 'images/background/hill.png',
    },
    {
      id: 'bg_hillnear',
      url: 'images/background/hillnear.png',
    },
    {
      id: 'bg_sky',
      url: 'images/background/sky.jpg',
    },
    // 系统背景，icons资源
    {
      type: 'spritesheet',
      id: 'system_bg',
      url: 'images/system/background.jpg',
      width: 480,
      height: 800,
    },
    {
      type: 'atlasJSONHash',
      id: 'system_icons',
      url: 'images/system/icons.png',
      atlasURL: 'images/system/icons.json',
    },
    // 驴
    {
      type: 'spritesheet',
      id: 'daiji',
      url: 'images/frames/donkey/daiji.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'dead',
      url: 'images/frames/donkey/dead.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'effect_qiqiu',
      url: 'images/frames/donkey/effect_qiqiu.png',
      width: 256,
      height: 256,
    },
    {
      type: 'spritesheet',
      id: 'jump',
      url: 'images/frames/donkey/jump.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'MJ',
      url: 'images/frames/donkey/MJ.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'plan',
      url: 'images/frames/donkey/plan.png',
      width: 256,
      height: 256,
    },
    {
      type: 'spritesheet',
      id: 'qiqiu',
      url: 'images/frames/donkey/qiqiu.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'run',
      url: 'images/frames/donkey/run.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'superjump',
      url: 'images/frames/donkey/superjump.png',
      width: 128,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'UFO',
      url: 'images/frames/donkey/UFO.png',
      width: 256,
      height: 512,
    },
    // effects
    {
      type: 'spritesheet',
      id: 'cloud',
      url: 'images/frames/effect/cloud.png',
      width: 64,
      height: 16,
    },
    // 道具
    {
      id: 'prop_spring01',
      url: 'images/frames/props/prop_spring01.png',
    },
    {
      id: 'prop_spring03',
      url: 'images/frames/props/prop_spring03.png',
    },
    {
      id: 'props_balloon',
      url: 'images/frames/props/props_balloon.png',
    },
    {
      id: 'props_gliding01',
      url: 'images/frames/props/props_gliding01.png',
    },
    {
      id: 'props_michael',
      url: 'images/frames/props/props_michael.png',
    },
    {
      id: 'props_super',
      url: 'images/frames/props/props_super.png',
    },
    {
      id: 'props_ufo',
      url: 'images/frames/props/props_ufo.png',
    },
    // 云阶梯
    {
      type: 'spritesheet',
      id: 'stair_friable',
      url: 'images/frames/stair/stair_friable.png',
      width: 256,
      height: 128,
    },
    {
      type: 'spritesheet',
      id: 'stair_moveable',
      url: 'images/frames/stair/stair_moveable.png',
      width: 256,
      height: 128,
    },
    {
      id: 'stair_stable_01',
      url: 'images/frames/stair/stair_stable_01.png',
    },
    {
      id: 'stair_stable_02',
      url: 'images/frames/stair/stair_stable_02.png',
    },
    {
      id: 'stair_stable_03',
      url: 'images/frames/stair/stair_stable_03.png',
    },
    {
      id: 'stair_stable_04',
      url: 'images/frames/stair/stair_stable_04.png',
    },
    {
      id: 'stair_stable_05',
      url: 'images/frames/stair/stair_stable_05.png',
    },
  ],
  audios: [
    {
      id: 'ogg_321',
      src: 'audio/ogg_321',
    },
    {
      id: 'ogg_balloon',
      src: 'audio/ogg_balloon',
    },
    {
      id: 'ogg_balloon_pick',
      src: 'audio/ogg_balloon_pick',
    },
    {
      id: 'ogg_btn_click',
      src: 'audio/ogg_btn_click',
    },
    {
      id: 'ogg_die',
      src: 'audio/ogg_die',
    },
    {
      id: 'ogg_firecrackers',
      src: 'audio/ogg_firecrackers',
    },
    {
      id: 'ogg_gliding',
      src: 'audio/ogg_gliding',
    },
    {
      id: 'ogg_gliding_pick',
      src: 'audio/ogg_gliding_pick',
    },
    {
      id: 'ogg_go',
      src: 'audio/ogg_go',
    },
    {
      id: 'ogg_jump',
      src: 'audio/ogg_jump',
    },
    {
      id: 'ogg_mj',
      src: 'audio/ogg_mj',
    },
    {
      id: 'ogg_mj_pick',
      src: 'audio/ogg_mj_pick',
    },
    {
      id: 'ogg_spring',
      src: 'audio/ogg_spring',
    },
    {
      id: 'ogg_step_broken',
      src: 'audio/ogg_step_broken',
    },
    {
      id: 'ogg_super',
      src: 'audio/ogg_super',
    },
    {
      id: 'ogg_super_pick',
      src: 'audio/ogg_super_pick',
    },
    {
      id: 'ogg_ufo',
      src: 'audio/ogg_ufo',
    },
    {
      id: 'ogg_ufo_pick',
      src: 'audio/ogg_ufo_pick',
    },
    {
      id: 'ogg_spring',
      src: 'audio/ogg_spring',
    },
    {
      id: 'ogg_background',
      src: 'audio/ogg_background',
      loop: true,
    },
  ],
};
