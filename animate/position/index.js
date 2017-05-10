var ball = document.getElementById("ball");
var elSelect = document.getElementById("types");

var curTime = 0;
var duration = 100;
var timer = null;
var curEffect = "linear";
var speed = 1000 / 30;

initTypes();

function initTypes() {
	var html = "<option value=''>请选择效果</option>";
	for (var i = 0, len = TweenE.length; i < len; i++) {
		var t = TweenE[i];
		html += '<option value="' + t + '">' + t + '</option>'
	}
	elSelect.innerHTML = html;

	elSelect.onchange = function() {
		curEffect = this.value || "";
		if (!curEffect) {
			return;
		}
		
		init();
	}
}

function main() {
	var l = Tween[curEffect](curTime, 50, 500, duration);
	ball.style.left = l + 'px';
	if (curTime < duration) {
		curTime+=2;
	} else {
		clearInterval(timer);
		curTime = 0;
	}
}

function init() {
	curTime = 0;
	ball.style.left = '50px';
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(function() {
		main()
	}, speed);

}