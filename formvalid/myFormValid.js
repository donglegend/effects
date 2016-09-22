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

/**
 * [FormValid description]
 * @param {[type]} ops [description]
 */

var CONSTANTCFG ={
    FORM_TIP_LIFE: 2000,
    TIMER_FORM_TIP: null
}


var FormValid = (function (){

    function FormValid(ops){
        if(this instanceof FormValid){
            this.elForm = ops.elForm || "";
            this._fields = ops.data;
            this._tipTypefn = ops.tipType;
            this.tipType = (typeof ops.tipType == 'function') ? 2 : isNaN(ops.tipType) ? 0 : Number(ops.tipType);
            this.errorClassName = ops.errorClassName;
            this.successCb = ops.success;
            this.errorCb = ops.error;
            this._init();
        }else{
            return new FormValid(ops);
        }
    }
    var p = {
        _init: function (){
            this.bindEvent();
            this._addTipTypes();
        },

        _validField: function (el){
            if(!el || el.type.toLowerCase() == 'submit') return;
            
            var self = this;
            var _v = el.value;
            var info = self._fields[el.name];
            if(!_v){
                self._showTips(self.elForm, el, info.msg)
                return false;
            }
            if(info.rule.test(_v)){
                return true;
            }else{
                self._showTips(self.elForm, el, info.msg)
                return false;
            }
        },

        _validForm: function (){
            var self = this;
            var fields = this._fields,
                form = self.elForm;
            for(var p in fields){
                if(fields.hasOwnProperty(p)){
                    if(!self._validField($('[name='+p+']', form)[0])){
                        (typeof self.errorCb == "function") && self.errorCb();
                        return false;
                    }
                }
            }
            (typeof self.successCb == "function") && self.successCb();
            // return true;
        },

        _getFormData: function (){
            var self = this;
            var data = self.elForm.serializeArray();
            return data;
        },

        _addTipTypes: function (){
            if(this.tipType == 2){
                this._tipTypes[this.tipType] = this._tipTypefn || noop;
            }
        },

        _tipTypes: {
            0: function (form, el, msg){
                $(".form-tips", $(form)).remove();
                var html = '<div class="form-tips">'+ (msg || "请输入") +'</div>';
                $(html).css({
                    "position": "fixed",
                    "left": "50%",
                    "top": "50%",
                    "z-index": "9999",
                    "margin-left": "-20%",
                    "margin-top": "-40px", 
                    "min-width": "160px",
                    "width": "40%", 
                    "padding": "8px 0",
                    "text-align": "center",
                    "color": "#fff",
                    "border-radius": "4px",
                    "background": "rgba(0, 0, 0, .5)"
                }).appendTo(form);

                $(el).addClass(this.errorClassName)

                if(CONSTANTCFG.TIMER_FORM_TIP){
                    clearTimeout(CONSTANTCFG.TIMER_FORM_TIP); 
                }

                CONSTANTCFG.TIMER_FORM_TIP = setTimeout(function (){
                    $(".form-tips", $(form)).remove();
                }, CONSTANTCFG.FORM_TIP_LIFE)
            },
            1: function (form, el, msg){
                var elForm = $(form),
                    el = $(el);
                $(".form-tips[data-type='formTips']").remove();
                var html = '<div class="form-tips" data-type="formTips"><i class="triangle"></i><i class="warn">!</i>'+ (msg || "请输入") +'</div>';
                var tipTop = (el.length && el.offset().top) || 0;
                var tipLeft = (el.length && (el.offset().left + el.width()+20)) || 0;
                $(html).css({
                    position: 'absolute',
                    top: tipTop,
                    left: tipLeft
                }).addClass('animated shake').appendTo('body')
            }
        },

        _showTips: function (){
            this._tipTypes[this.tipType].apply(this, arguments);
        },

        bindEvent: function (){
            var self = this;
            self.elForm[0].addEventListener("blur", function (ev){
                self._validField(ev.target)
            }, true)
            self.elForm[0].addEventListener("focus", function (ev){
                $(ev.target).removeClass(self.errorClassName)
            }, true)

            self.elForm.on("submit", function (ev){
                ev && ev.preventDefault();
                self._validForm();
            })
        }
    };
    for(var k in p){
        FormValid.prototype[k] = p[k];
    }
    return FormValid;
})();


var defaults = {
    data: {},
    tipType: 0,
    errorClassName: "invalid",
    success: noop,
    error: noop
}

$.fn.formValid = function (ops){
    var options = $.extend(defaults, ops);
    
    return this.each(function(index, el) {
         var self = $(this);
         options.elForm = self;
         return new FormValid(options);
    });

}

function noop(){

}


})