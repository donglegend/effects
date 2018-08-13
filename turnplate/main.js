/**
 * create time: 2018-08-02
 * author: dongsheng
 * fn: 旋转类，实现了两种旋转动画
 *  - 基于css3的 transform的动画
 *  - 基于canvas的 动画
 * 给定一个元素el就可以支持旋转,不过支持传递参数 img
 * 如果给定了img参数，那么会使用canvas绘图
 */
class RotatePlate {
  constructor(options) {
    this.supportedCSS = getSupportCSS();
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.el = null; // 容器元素
    this._img = null;
    this._angle = 0; // 当前角度
    // 缓存用户数据，再次开始需要用作初始化
    this.customOps = options;
    // 私有参数
    this._parameters = {
      angle: 0,
      animateTo: 0,
      step: null,
      easing: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      duration: 3000,
      callback: () => {},
      animateType: 1, // 0: canvas，1: css
    };
    this._timer = null; // 动画，循环定时器

    this.isFirstInit = true;
    this.init();
    window.onresize = debounce(() => {
      this._img = null;
      this.init();
    });
  }
  /**
   * 初始化类参数数据
   * @param {参数} newOps
   */
  init(newOps = {}) {
    this.setOptions(Object.assign({}, this.customOps, newOps));
    // this._rotate(this._angle);
  }
  /**
   * 对外暴露接口
   * 开始旋转
   */
  rotate() {
    this._handleRotation();
  }
  /**
   * 合并设置参数
   * @param {*} parameters
   */
  setOptions(parameters) {
    try {
      // 获取容器元素
      if (typeof parameters.el === 'string') {
        this.el = document.querySelector(parameters.el);
      } else {
        this.el = parameters.el;
      }
      // 如果传递了图片url，那么用canvas画图
      if (parameters.img && !this._img) {
        this._loaderImg(parameters.img);
      }
      // 获取初始角度
      if (typeof parameters.angle === 'number') this._angle = parameters.angle;
      // 合并参数
      Object.assign(this._parameters, parameters);
      // 选择动画类型
      switch (this._parameters.animateType) {
        case 0:
          this._rotate = this._rotateCanvas;
          break;
        case 1:
        default:
          this._rotate = this._rotateCss;
          break;
      }
    } catch (err) {}
  }
  /**
   * 加载图片会绘图
   * @param {*} url
   */
  _loaderImg(url) {
    if (this._canvas) {
      this.el.removeChild(this._canvas);
    }
    this.WIDTH = this.el.offsetWidth;
    this.HEIGHT = this.el.offsetHeight;
    const img = new Image();
    img.onload = () => {
      this._canvas = document.createElement('canvas');
      this._canvas.innerText = '您的浏览器不支持canvas,请升级浏览器';
      this._img = img;

      this.el.appendChild(this._canvas);
      this._canvas.width = this.WIDTH * this.devicePixelRatio;
      this._canvas.height = this.HEIGHT * this.devicePixelRatio;
      this._canvas.style.width = this.WIDTH + 'px';
      this._canvas.style.height = this.HEIGHT + 'px';
      this._cnv = this._canvas.getContext('2d');

      this._cnv.scale(this.devicePixelRatio, this.devicePixelRatio);
      this._cnv.drawImage(img, 0, 0, this.WIDTH, this.HEIGHT);

      if (this.isFirstInit) {
        this._rotate(this._angle);
        this.isFirstInit = false;
      }
    };
    img.src = url;
  }
  /**
   * 开始旋转处理，是否启动动画
   */
  _handleRotation() {
    if (this._angle === this._parameters.animateTo) {
      this._rotate(this._angle);
    } else {
      this._animateStart();
    }
  }
  /**
   * 真正动画函数.根据动画类型设定
   */
  _rotate() {}

  _animateStart() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._animateStartTime = Date.now();
    this._animateStartAngle = this._angle;
    this._animate();
  }
  /**
   * 动画主循环
   */
  _animate() {
    const actualTime = Date.now();
    const checkEnd =
      actualTime - this._animateStartTime > this._parameters.duration;
    if (checkEnd) {
      clearTimeout(this._timer);
    } else {
      if (this._canvas || this.el) {
        var angle = this._parameters.easing(
          actualTime - this._animateStartTime,
          this._animateStartAngle,
          this._parameters.animateTo - this._animateStartAngle,
          this._parameters.duration
        );
        this._rotate(~~(angle * 10) / 10);
      }
      if (this._parameters.step) {
        this._parameters.step.call(this, this._angle);
      }
      this._timer = setTimeout(() => {
        this._animate();
      }, 10);
    }
    if (this._parameters.callback && checkEnd) {
      this._angle = this._parameters.animateTo;
      this._rotate(this._angle);
      this._parameters.callback.call(this);
    }
  }
  /**
   * css动画
   * @param {*} angle
   */
  _rotateCss(angle) {
    const el = this._canvas || this.el;
    this._angle = angle;
    el.style[this.supportedCSS] = `rotate3d(0,0,1,${angle % 360}deg)`;
  }
  /**
   * canvas动画
   * @param {*} angle
   */
  _rotateCanvas(angle) {
    this._angle = angle;
    const radian = ((angle % 360) * Math.PI) / 180;
    this._canvas.width = this.WIDTH * this.devicePixelRatio;
    this._canvas.height = this.HEIGHT * this.devicePixelRatio;
    this._cnv.scale(this.devicePixelRatio, this.devicePixelRatio);
    this._cnv.translate(this.WIDTH / 2, this.HEIGHT / 2);
    this._cnv.rotate(radian);
    this._cnv.translate(-this.WIDTH / 2, -this.HEIGHT / 2);
    this._cnv.drawImage(this._img, 0, 0, this.WIDTH, this.HEIGHT);
  }
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
/**
 * 判断运行环境支持的css,用作css制作动画
 */
function getSupportCSS() {
  let supportedCSS = null;
  const styles = document.getElementsByTagName('head')[0].style;
  const toCheck = 'transformProperty WebkitTransform OTransform msTransform MozTransform'.split(
    ' '
  );
  for (var a = 0; a < toCheck.length; a++) {
    if (styles[toCheck[a]] !== undefined) {
      supportedCSS = toCheck[a];
      break;
    }
  }
  return supportedCSS;
}
