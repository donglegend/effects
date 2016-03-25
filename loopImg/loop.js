// $(function (){

	function Loop(ops){
		var ops = ops ? $.extend(this.defaults, ops) : this.defaults;
		this.obj = ops.obj;
		this.imgs = ops.imgs;
		this.effect = ops.effect;
		this.currentIndex = this.imgs.length -1;
	}

	Loop.prototype = {

		defaults: {
			"obj": "",
			"imgs": "",
			"effect": ""
		},

		init: function (){
			this.creatDom();
		},

		creatDom: function (){
			var self = this;
			var arrImg = self.imgs;
			var html = '';
			for(var len = arrImg.length, i = len-1; i>=0; i--){
				html += '<div class="sub"><img src="'+arrImg[i]+'"></div>';
			}
			self.obj.append(html);
		},

		next: function (){
			var self = this;
			var elSub = self.obj.find('.sub').removeClass().addClass('sub').hide();
			elSub.eq(self.currentIndex).addClass(self.effect+'front').show();
			if (self.currentIndex >= self.imgs.length-1){
				self.currentIndex = 0;
			}else{
				self.currentIndex++;
			}
			elSub.eq(self.currentIndex).addClass(self.effect+'back').show();
		}


	}


// })