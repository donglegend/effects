;
(function(window, $) {


	$.fn.animatefn = function (ops){
	    var $el = $(this);
		if(!ops){
			return $el;
		}
		var cb = ops.cb || $.noop,
			effect = ops.effect || "";
		console.log(effect)
		$el.addClass('animated '+effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
			$el.removeClass('animated '+effect)
			cb();
			return $el;
		});
	}


	var Slide = (function() {
		var defaults = {
			loop: true,
			autoplay: true,
			elBox: null,
			prevBtn: null,
			nextBtn: null
		}
		var clsSlide = ".slide";
		var clsActive = "active";
		var clsPrecActive = "prevActive";
		function Slide(ops) {
			var ops = $.extend(defaults, ops || {});

			this.loop = ops.loop;
			this.autoplay = ops.autoplay;

			

			this.elBox = $(ops.elBox);
			this.elSlides = $(clsSlide, this.elBox);
			this.prevBtn = $(ops.prevBtn, this.elBox);
			this.nextBtn = $(ops.nextBtn, this.elBox);

			this.curIndex = 0;
			this.slideCount = this.elSlides.length || 0;

			this.ismove = false;

			this.effects = [
				"swing","tada","wobble","jello","rubberBand",
				"bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp",
				"fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig",
				"flipInX","flipInY",
				"lightSpeedIn",
				"rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight",
				"rollIn",
				"zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp",
				"slideInDown", "slideInLeft","slideInRight","slideInUp"];
			this.effectsCount = this.effects.length;

			this._init();

		}
		Slide.prototype = {
			_init: function (){
				var self = this;
				this.go(this.curIndex);
				this.bindEvent();
				if(this.autoplay){
					setInterval(function (){
						self.next();
					}, 2500)
				}
			},
			go: function (num){
				if(this.slideCount <= 0){
					return ;
				}
				if(num > (this.slideCount-1) || num < 0){
					return ;
				}

				this.elSlides.eq(this.curIndex).addClass(clsActive);
				if(num !== this.curIndex){
					this.elSlides.eq(num).addClass(clsActive);
				}
				
			},
			random: function (n, m){
				var c = m-n+1;  
		    	return Math.floor(Math.random() * c + n);
			},
			getTranstion: function (){
				return this.effects[this.random(0, this.effectsCount-1)] || "fadeIn";
			},
			prev: function (){
				if(this.ismove){
					return ;
				}
				this.ismove = true;
				var self = this;
				var nextIndex = this.curIndex - 1;
				nextIndex = nextIndex < 0 ? this.slideCount - 1 : nextIndex;

				var el = self.elSlides.eq(self.curIndex);
				el.removeClass(clsActive).addClass(clsPrecActive);
				
				this.elSlides.eq(nextIndex).addClass(clsActive).animatefn({
					effect: self.getTranstion(),
					cb: function (){
						el.removeClass(clsPrecActive);
						self.curIndex = nextIndex;
						self.ismove = false;
					}
				});
			},
			next: function (){
				if(this.ismove){
					return ;
				}
				this.ismove = true;
				var self = this;
				var nextIndex = this.curIndex + 1;
				nextIndex = nextIndex > this.slideCount - 1 ? 0 : nextIndex;
				
				var el = self.elSlides.eq(self.curIndex);
				el.removeClass(clsActive).addClass(clsPrecActive);

				this.elSlides.eq(nextIndex).addClass(clsActive).animatefn({
					effect: self.getTranstion(),
					cb: function (){
						el.removeClass(clsPrecActive);
						self.curIndex = nextIndex;
						self.ismove = false;
					}
				});
			},
			bindEvent: function (){
				var self = this;
				this.prevBtn.on("click", function (){
					self.prev();
				})
				this.nextBtn.on("click", function (){
					self.next();
				})
			}
		}

		return Slide;
	})();

	if(typeof exports !== 'undefined') {
		module.exports = Slide;
	}else{
		window.Slide = Slide;
	}

})(typeof window !== 'undefined' ? window : this, jQuery)