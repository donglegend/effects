;(function (global, factory){
	'usr strict';
	if(typeof define === 'function' && define.amd){
		define(['jquery'], function($) {
          return factory($, global, global.document);
        });
	}else if(typeof exports !== 'undefined'){
		module.exports = factory(require('jquery'), global, global.document);
	}else{
		factory(jQuery, global, global.document);
	}
})(typeof window !== "undefined" ? window : this, function ($, window, document){

	var defaults = {
		info: ".info"
	}

	$.fn.showInfo = function  (ops){
		var options = $.extend(defaults, ops);
		var info = options.info;
		return this.each(function(index, el) {
			var self = $(el);
			var elInfo = self.find(info);
			var _w = elInfo.width();
			var _h = elInfo.height();
			self.bind("mouseenter mouseleave", function(e) { 
				var w = self.width(); 
				var h = self.height(); 
				var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1); 
				var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1); 
				var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; 
				var eventType = e.type; 
				// var dirName = new Array('上方','右侧','下方','左侧'); 
				
				if(e.type == 'mouseenter'){ 
					var res = getStyle(direction, w , h, _w, _h);
					elInfo.css({
						left: res.l,
						top: res.t
					})
					elInfo.animate({
						left: 0,
						top: 0
					});
				}else{ 
					var res = getStyle(direction, w , h, _w, _h);
					elInfo.animate({
						left: res.l,
						top: res.t
					});
				} 
			});
		});
	}

	function getStyle(direction, w, h, _w, _h){
		/**
		 * direction
		 * 0  上
		 * 1  右
		 * 2  下
		 * 3  左
		 */
		
		var l, t;
		switch(direction){
			case 0:
				l = 0;
				t = -_h;
			break;

			case 1:
				l = w;
				t = 0;
			break;

			case 2:
				l = 0;
				t = h;
			break;

			case 3:
				l = -_w;
				t = 0;
			break;
		}
		return {
			l: l,
			t: t
		}
	}


})