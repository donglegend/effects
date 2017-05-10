function random(n, m){
	var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}

function Luck(id) {
	this.index = -1; //当前位置索引
	this.cells = 0; //总共有多少个位置
	this.timer = null; //定时器id
	this.speed = 120; //初始转动速度
	this.times = 0; //转动次数
	this.baseTimes = random(80, 120); //至少转动次数
	this.prize = random(0, 7); //中奖位置
	this.init(id);
}
Luck.prototype = {
	init: function(id) {
		if (!id) {
			throw new Error("params id is null, this is should has a id!")
		}
		this.obj = $("#" + id);
		this.cells = this.obj.find(".luck-cell").length;
		this.obj.find(".luck-" + this.index).addClass("active");
	},
	clear: function (){
		this.speed = 20;
		this.times = 0;
		this.baseTimes = random(80, 100);
		this.prize = random(0, 7);
	},
	setActive: function() {
		var index = this.index;
		var cells = this.cells;
		var obj = this.obj;
		obj.find(".luck-" + index).removeClass("active");
		index += 1;
		if (index > cells - 1) {
			index = 0;
		};
		obj.find(".luck-" + index).addClass("active");
		this.index = index;
	},
	run: function(callback) {
		this.times += 1;
		this.setActive();
		
		if (this.times > this.baseTimes+8 && this.prize == this.index) {
			clearTimeout(this.timer);
			this.clear();
			typeof callback == 'function' && callback();
		} else {
			if(this.times < this.baseTimes){
				this.speed -= 5;
			}else{
				this.speed += 25;
			}
			if(this.speed < 20){
				this.speed = 20;
			}
			this.timer = setTimeout(this.run.bind(this, callback), this.speed);
		}
	}
}