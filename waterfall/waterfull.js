;(function ($){


function show(el){
	el.style.display = 'block';
}
function hide(el){
	el.style.display = 'none';
}

function getById(id){
	return document.getElementById(id);
}

function getByClass(name,parent){
	var parent = parent ? document.getElementById(parent) : document;
	var eles = document.getElementsByTagName('*');
	var result = [];
	for(var i=0, len = eles.length; i < len; i++){
		if(eles[i].className == name){
			result.push(eles[i]);
		}
	}
	return result;
}

function getIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
	return -1;
}

var elTop = getById('backTop');
var elMark = getById('Mark');
var baseUrl = "./images/";
var dataImg = {
	"data" : [
		{"src": '1.jpg'},
		{"src": '2.jpg'},
		{"src": '3.jpg'},
		{"src": '4.jpg'},
		{"src": '5.jpg'},
		{"src": '6.jpg'},
		{"src": '7.jpg'},
		{"src": '8.jpg'},
		{"src": '9.jpg'},
		{"src": '10.jpg'},
		{"src": '1.jpg'},
		{"src": '2.jpg'},
		{"src": '3.jpg'},
		{"src": '4.jpg'},
		{"src": '5.jpg'},
		{"src": '6.jpg'},
		{"src": '7.jpg'},
		{"src": '8.jpg'},
		{"src": '9.jpg'},
		{"src": '10.jpg'}
	]
}

function WaterFull(insName){
	this.instance = insName;
	this.wrap = '';
	this.box = '';
	this.elwrap = '';
}
WaterFull.prototype = {
	init : function (parent, box){
		this.wrap = parent;
		this.box = box;
		this.elwrap = getById(parent);
		this.insertHtml();
	},
	insertHtml : function (){
		show(elMark);
		var self = this;
		for(var i=0, len = dataImg.data.length; i < len; i++){
			var url = baseUrl + dataImg.data[i].src;
			self.elwrap.appendChild(self.creatHtml(url));
		}
		setTimeout(function (){
			self.setPosition();
			hide(elMark);
		},600);
	},
	creatHtml : function (url){
		var box = document.createElement('div');
		box.className = this.box;
		box.style.cssText = "position: absolute; left: 0; top:0px; opacity: 0;";
		var fig = document.createElement('div');
		fig.className = 'fig';
		box.appendChild(fig);
		var img = new Image();
		img.src = url;
		fig.appendChild(img);
		return box;
	},
	setPosition : function (){
		var hArr = [];
		var boxs = getByClass(this.box, this.wrap);
		var boxW = boxs[0].offsetWidth;
		var cols = Math.floor(document.body.clientWidth / boxW);
		this.elwrap.style.cssText = 'width: '+cols*boxW+'px;'+'margin: 0 auto;';
		for(var i=0, len = boxs.length; i < len; i++){
			if(i<cols){
				boxs[i].style.position = 'static';
				boxs[i].style.opacity = 1;
				hArr.push(boxs[i].offsetHeight);
				console.log(boxs[i].offsetLeft);
			}else{
				var minH = Math.min.apply(null, hArr);
				var colsIndex = getIndex(hArr, minH)
				if(colsIndex == -1){
					// alert("查询失败");
					return false;
				}
				boxs[i].style.cssText = "position: absolute; top: "+minH+"px;"+"left: "+boxW*colsIndex+"px;"+"opacity:1";
				hArr[colsIndex] += boxs[i].offsetHeight;
			}
		}
	},
	checkLoad : function (){
		var boxs = getByClass(this.box, this.wrap);
		var lastH = boxs[boxs.length -1].offsetTop + boxs[boxs.length -1].offsetHeight;
		var loadH = document.documentElement.clientHeight + document.body.scrollTop || document.documentElement.scrollTop;
		return lastH < loadH;
	}
}

function main(){
	var waterfull = new WaterFull();
	waterfull.init('main','box');
	window.onscroll = function (){
		if(waterfull.checkLoad.call(waterfull)){
			waterfull.insertHtml.call(waterfull);
		}
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>100){
			show(elTop);
		}else{
			hide(elTop);
		}
	}
	window.onresize = function (){
		waterfull.setPosition.call(waterfull);
	}
}
elTop.onclick = function (){
	// hide(this);
	var speed = 10;
	var topValue = document.documentElement.scrollTop || document.body.scrollTop;
	clearInterval(timer);
	var timer = setInterval(function (){
		if(topValue > 0){
			topValue = Math.floor(topValue-topValue/speed);
		}else{
			topValue = 0;
			clearInterval(timer);
		}
		document.documentElement.scrollTop = document.body.scrollTop = topValue;
	},30)
}

$.main = main;

}(this))