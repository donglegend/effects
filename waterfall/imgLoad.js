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
var baseUrl = "./images/";
var LoadImg = {
	_load: function (obj,callback){
		var img = new Image();
		img.onload = function (){
			callback();
		}
		img.src = baseUrl + obj.src;
	},
	load: function (imgSoure,index,callback){
		var _index = index || 0;
		if(imgSoure[_index]){
			LoadImg._load(imgSoure[_index],function (){
				LoadImg.load(imgSoure, _index+1,callback);
			})
		}else{
			callback();
		}
	}
}



