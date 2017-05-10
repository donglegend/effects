var W = window.innerWidth,
	H = window.innerHeight;
init(60, "legend", W, H, main);

var imgData = [{
	name: "red",
	path: "./images/red.png"
}, {
	name: "blue",
	path: "./images/blue.png"
}, {
	name: "green",
	path: "./images/green.png"
}, {
	name: "yellow",
	path: "./images/yellow.png"
}, {
	name: "btn1",
	path: "./images/btn1.jpg"
}, {
	name: "btn2",
	path: "./images/btn2.jpg"
}];


var imglist;
var loadingLayer;
var backLayer;
var prizeLayer;
var btnLayer;

var curIndex = 0;
var prizeIndex = random(0, 7);

var baseTimes = 50;
var curTimes = 0;

var isrun = false;



function main() {
	loadingLayer = new LoadingSample1();
	addChild(loadingLayer);
	LLoadManage.load(imgData, loadProgress, gameInit);
}

function loadProgress(p) {
	loadingLayer.setProgress(p);
}

function gameInit(result) {
	imglist = result;

	removeChild(loadingLayer);

	backLayer = new LSprite();
	addChild(backLayer);

	addPrize();

	addPrizeBtn();

	addEvent();
}


function addEvent() {
	// prizeLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	btnLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
}

function gameStart(){
	if(isrun){
		return ;
	}
	isrun = true;
	prizeLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}

function run(curIndex) {
	var items = prizeLayer.childList;
	for (var i = 0, len = items.length; i < len; i++) {
		items[i].alpha = 0.2;
	}
	items[curIndex].alpha = 1;
}

function onframe() {

	

	if(curTimes > baseTimes + 8 && curIndex == prizeIndex){
		if(curIndex == 3 || curIndex == 5 || curIndex == 7 || curIndex == 0){
			alert("恭喜大侠中奖了!");
			console.log("中奖了");
		}else{
			alert("很遗憾，没中奖,再接再厉!");
			console.log("没中奖");
		}
		prizeLayer.removeEventListener(LEvent.ENTER_FRAME, onframe);

		curTimes = 0;
		prizeIndex = random(0, 7);
		isrun = false;

		return ;
	}else{
		curTimes++;
		curIndex++;
		if (curIndex > 7) {
			curIndex = 0;
		}
		run(curIndex)
	}

	


}

function addPrizeBtn() {
	var bitmapDataUp = new LBitmapData(imglist['btn1'], 0, 0, 130, 130);
	var bitmapUp = new LBitmap(bitmapDataUp);

	var bitmapDataOver = new LBitmapData(imglist['btn2'], 0, 0, 130, 130);
	var bitmapOver = new LBitmap(bitmapDataOver);

	btnLayer = new LButton(bitmapUp, bitmapOver);
	btnLayer.x = (LGlobal.width - 130) * 0.5;
	btnLayer.y = (LGlobal.height - 130) * 0.5;
	backLayer.addChild(btnLayer);
}



function addPrize() {

	prizeLayer = new LSprite();
	backLayer.addChild(prizeLayer)

	var list = LGlobal.divideCoordinate(520, 260, 2, 4);

	var _index = 0;
	for (var i = 0; i < list.length; i++) {
		var col = list[i]
		for (var j = 0, len = col.length; j < len; j++) {
			var p = col[j];
			var bitmap = new LBitmap(new LBitmapData(imglist[imgData[random(0,3)].name], p.x, p.y, p.width, p.height));


			bitmap.x = POS[_index].x;
			bitmap.y = POS[_index].y;
			bitmap.alpha = 0.2;

			_index++;

			prizeLayer.addChild(bitmap);
		}
	}

	prizeLayer.x = (LGlobal.width - prizeLayer.getWidth()) * 0.5;
	prizeLayer.y = (LGlobal.height - prizeLayer.getHeight()) * 0.5;
}

function random(n, m){
	var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}


var POS = [{
	x: 0,
	y: 0
}, {
	x: 130,
	y: 0
}, {
	x: 260,
	y: 0
}, {
	x: 260,
	y: 130
}, {
	x: 260,
	y: 260
}, {
	x: 130,
	y: 260
}, {
	x: 0,
	y: 260
}, {
	x: 0,
	y: 130
}]