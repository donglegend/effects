;(function (global, factory){

	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
          return factory($, global, global.document);
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'), global, global.document);
    } else {
        factory(jQuery, global, global.document);
    }


})(typeof window !== 'undefined' ? window : this, function ($, window, document){

	var effects = {
		"circularG": '<div id="circularG"><div id="circularG_1" class="circularG"></div><div id="circularG_2" class="circularG"></div><div id="circularG_3" class="circularG"></div><div id="circularG_4" class="circularG"></div><div id="circularG_5" class="circularG"></div><div id="circularG_6" class="circularG"></div><div id="circularG_7" class="circularG"></div><div id="circularG_8" class="circularG"></div></div>',
		"floatingBarsG": '<div id="floatingBarsG"><div class="blockG" id="rotateG_01"></div><div class="blockG" id="rotateG_02"></div><div class="blockG" id="rotateG_03"></div><div class="blockG" id="rotateG_04"></div><div class="blockG" id="rotateG_05"></div><div class="blockG" id="rotateG_06"></div><div class="blockG" id="rotateG_07"></div><div class="blockG" id="rotateG_08"></div></div>',
		"overlay-loader": '<div class="overlay-loader" id="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
		"floatingCirclesG": '<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>',
		"bowlG": '<div id="bowlG"><div id="bowl_ringG"><div class="ball_holderG"><div class="ballG"></div></div></div></div>',
		"cssload-clock": '<div class="cssload-clock" id="cssload-clock"></div>',
		
		"ballsWaveG": '<div id="ballsWaveG"><div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div><div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div></div>',
		"fountainG": '<div id="fountainG"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div>',
	
		"spinningTextG": '<div id="spinningTextG"><div id="spinningTextG_1" class="spinningTextG">L</div><div id="spinningTextG_2" class="spinningTextG">o</div><div id="spinningTextG_3" class="spinningTextG">a</div><div id="spinningTextG_4" class="spinningTextG">d</div><div id="spinningTextG_5" class="spinningTextG">i</div><div id="spinningTextG_6" class="spinningTextG">n</div><div id="spinningTextG_7" class="spinningTextG">g</div></div>',
		"inTurnBlurringTextG": '<div id="inTurnBlurringTextG"><div id="inTurnBlurringTextG_1" class="inTurnBlurringTextG">L</div><div id="inTurnBlurringTextG_2" class="inTurnBlurringTextG">o</div><div id="inTurnBlurringTextG_3" class="inTurnBlurringTextG">a</div><div id="inTurnBlurringTextG_4" class="inTurnBlurringTextG">d</div><div id="inTurnBlurringTextG_5" class="inTurnBlurringTextG">i</div><div id="inTurnBlurringTextG_6" class="inTurnBlurringTextG">n</div><div id="inTurnBlurringTextG_7" class="inTurnBlurringTextG">g</div></div>',
	
		"cssload-battery": '<div class="cssload-battery" id="cssload-battery"><div class="cssload-liquid"></div></div>',
		"spinner": '<div class="spinner" id="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
	}


	$.fn.loading = function (ops){
		var options = ops || "circularG";
		return this.each(function(index, el) {
			var self = $(this);
			var html = self.html();
			self.html(html + effects[options]);
			$("#"+options, self).attr("data-loading", options)
		});

	}


	$.fn.unloading = function (ops){
		return this.each(function(index, el) {
			var self = $(this);
			if(typeof ops === "string"){
				return self.find('#'+ops).remove();
			}
			$("[data-loading]", self).remove();
		});
	}

})