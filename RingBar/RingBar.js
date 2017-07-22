;
/**
radius: 50, //半径
barWidth: 10, //圆环宽度
barBgColor: '#cccccc', //圆环背景色
fontColor: "#4691e2", //字体颜色
fontFamily: "微软雅黑", //font family
fontWeight: 'bold', //font weight
fontSize : 14, //
value: 80

 */
(function(global, document) {
	var RingBar = (function() {

		var defaults = {
			radius: 50,
			barWidth: 10,
			barBgColor: '#cccccc',
			barColor: '#4691e2',
			fontColor: "#4691e2",
			fontFamily: "微软雅黑",
			fontWeight: 'bold',
			fontSize: 14,
			percent: 80,
			animate: true
		}

		function RingBar(container, options) {

			if (!(this instanceof RingBar)) {
				return new RingBar(container, options);
			}

			if (container.length <= 0)
				return;

			this.container = container;

			this.ops = $.extend(true, defaults, options);


			var canvas = document.createElement("canvas");
			container.append(canvas);

			if (!canvas.getContext) {
				container.html(this.ops.percent || "");
				return;
			} else {

			}

			var W = container.width() || 120;
			var H = container.height() || 120;

			canvas.width = W;
			canvas.height = H;

			var ctx = canvas.getContext('2d');

			if (window.devicePixelRatio) {
				canvas.style.width = W + "px";
				canvas.style.height = H + "px";
				canvas.height = H * window.devicePixelRatio;
				canvas.width = W * window.devicePixelRatio;
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}

			this.canvas = canvas;
			this.ctx = ctx;

			this._init();
		}

		var p = {
			constructor: RingBar,
			_init: function() {
				this.drawCirle();
				this.drawRing();
			},
			drawCirle: function() {

				var diameter = (this.ops.radius + this.ops.barWidth) * 2,
					centerX = diameter / 2,
					centerY = centerX;

				var ctx = this.ctx;
				ctx.beginPath();
				ctx.arc(centerX, centerY, this.ops.radius, 0, Math.PI * 2, true);
				ctx.lineWidth = this.ops.barWidth;
				ctx.strokeStyle = this.ops.barBgColor;
				ctx.stroke();
			},
			drawRing: function() {
				var diameter = (this.ops.radius + this.ops.barWidth) * 2,
					centerX = diameter / 2,
					centerY = centerX,
					startAngle = -Math.PI / 2;

				var ctx = this.ctx;

				if (this.ops.animate) {
					var v = 0,
						step = 2,
						timer = null,
						that = this;

					function drawStep() {

						ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

						that.drawCirle();

						ctx.beginPath();
						var anglePerSec = 2 * Math.PI * (v / 100);
						ctx.arc(centerX, centerY, that.ops.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致
						ctx.strokeStyle = that.ops.barColor;
						ctx.stroke();
						ctx.closePath();

						that.drawText(v + "%")

						if (v == that.ops.percent) {
							return cancelAnimationFrame(timer);
						}

						v += step;
						if (v > that.ops.percent)
							v = that.ops.percent

						timer = requestAnimationFrame(drawStep);
					}
					drawStep();
				} else {
					ctx.beginPath();
					var endAngle = 2 * Math.PI * (this.ops.percent / 100);
					ctx.arc(centerX, centerY, this.ops.radius, startAngle, startAngle + endAngle, false); //这里的圆心坐标要和cirle的保持一致
					ctx.strokeStyle = this.ops.barColor;
					ctx.stroke();
					ctx.closePath();

					this.drawText(this.ops.percent + "%")
				}
			},
			drawText: function(text) {
				var diameter = (this.ops.radius + this.ops.barWidth) * 2,
					centerX = diameter / 2,
					centerY = centerX;

				var ctx = this.ctx;

				ctx.fillStyle = this.ops.fontColor;
				ctx.font = this.ops.fontWeight + " " + this.ops.fontSize + "px " + this.ops.fontFamily;
				ctx.textAlign = "center";
				ctx.textBaseline = 'middle';
				ctx.fillText("进度 " + text, centerX, centerY);
			}
		}

		for (var k in p) {
			RingBar.prototype[k] = p[k];
		}

		return RingBar;
	})();

	if (typeof exports !== 'undefined') {
		module.exports = RingBar;
	} else {
		global.RingBar = RingBar;
	}
})(typeof window !== 'undefined' ? window : this, document)