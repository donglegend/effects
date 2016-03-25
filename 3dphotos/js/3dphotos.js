;
(function (global, factory){
	'use strict';
	if(typeof define === 'function' && define.amd){
		define(['jquery'], function ($){
			return factory($, global, global.document);
		})
	}else if(typeof exports !== 'undefined'){
		module.exports = factory(require('jquery'), global, global.document);
	}else{
		factory(jQuery, global, global.document);
	}
})(typeof window !== 'undefined' ? window : this, function ($, window, document){

	var prefixArr = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
	var z_translate = 20;
	var className = "item";

	var PhotoShow = (function (){
		function PhotoShow(opt){
			this.data = opt.data;
			this.count = this.data.length || 0;
			this.angle = this.count > 0 ? Math.floor(360/this.count) : 0;
			
		}
		var p = {
			createHtml: function (){
				var self = this;
				if(!self.data || self.data.length == 0){
					return ;
				}
				var html = "";
				for(var i = 0, len = self.data.length; i<len; i++){
					(function (num){
						html += '<div class="'+className+'" style="'+self.getStyle(num)+'"></div>'
					})(i)
				}
				
				return html;
			},
			getStyle: function (num){
				var self = this;
				var arr = [];
				for(var i=0,len=prefixArr.length; i<len; i++){
					arr.push(prefixArr[i]+'transform: rotateY('+(self.angle * num)+'deg) translateZ('+z_translate+'rem);')
				}
				arr.push('background-image: url('+this.data[num].src+');');
				return arr.join("")
			}
		}

		for(var k in p){
			PhotoShow.prototype[k] = p[k];
		}

		return PhotoShow;
	})();

	$.fn.photoShow = function (options){
		// options = $.extend(defaults.data, options);
		

		return this.each(function(index, el) {
			
			var self = $(this);
			var ph = new PhotoShow(options);
			self.append(ph.createHtml());

			self.find('.'+className).eq(0).addClass('focus'); 
			// self.curPos = 0;

			self.on("click", "."+className, function (e){
				var _this = $(this);
				var _index = _this.index();
				var items = self.find("."+className);
				var rotateAngle = -ph.angle * _index;
				self.css({
					'-webkit-transform': 'rotateX(-10deg) rotateY('+rotateAngle+'deg)',
					'-moz-transform': 'rotateX(-10deg) rotateY('+rotateAngle+'deg)',
					'-ms-transform': 'rotateX(-10deg) rotateY('+rotateAngle+'deg)',
					'-o-transform': 'rotateX(-10deg) rotateY('+rotateAngle+'deg)',
					'transform': 'rotateX(-10deg) rotateY('+rotateAngle+'deg)',
				});
				// self.curPos = _index;
				_this.addClass('focus').siblings().removeClass('focus');

			})

		});
		

	}
	/**
	 * [
	 * 	{
	 * 		"name": "",
	 * 		"src": "1.jpg"
	 * 	}
	 * ]
	 * @type {Object}
	 */
	var defaults = {
		data: []
	}

})