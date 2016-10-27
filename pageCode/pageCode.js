/**
 * create time: 2016-xx-xx
 * author: dongsheng
 * fn: 分页
 * 操控dom 依赖jQuery
 * 样式: scss/pageCode.scss
 * 用法：var pages = new PageCode(params)
 * 参数详解(params):
 * 类型： Object {}
 * 		obj: 分页dom结构容器元素
 * 		classNames: {
 * 			prevPage: 上一页class类名,默认 "prevPage"
 * 			nextPage: 下一页class类名,默认 "nextPage"
 * 			tcdNumber: 页码clas类名,默认 "tcdNumber"
 * 			active: 当前选中class类名,默认 "current"
 * 		}
 * 		pageCount:  总页数
 * 		current: 当前页
 * 		backFn: 回调函数 参数（当前页码）
 * 		
 * 禁止翻页class类名: disabled
 *
 * 方法： 
 * 	refresh： 更新分页 (总页数，当前页码)
 */
var PageCode = (function() {

	var defaults = {
		obj: "",
		classNames: {
			prevPage: "prevPage",
			nextPage: "nextPage",
			tcdNumber: "tcdNumber",
			active: "current"
		},
		pageCount: 0,
		current: 0,
		backFn: function() {}
	};

	function PageCode(options) {
		if (this instanceof PageCode) {
			this.opts = $.extend(defaults, options);
			this.args = {};
			this.init(this.opts);
		} else {
			return new PageCode(options);
		}
	}
	var p = {
		init: function(params) {
			var self = this;
			for (var p in params.classNames) {
				if (params.classNames.hasOwnProperty(p)) {
					self.args[p] = params.classNames[p];
				}
			}
			self.obj = $(params.obj);

			self.args.pageCount = params.pageCount;
			self.args.current = params.current;
			self.args.backFn = params.backFn;

			self.fillHtml(self.obj, self.args);
			self.bindEvent(self.obj, self.args);
		},
		//填充html
		fillHtml: function(obj, args) {
			// var ms = args;
			console.log(args)
			this.offEvent(obj)
			return (function() {

				obj.empty();
				//上一页
				if (args.current > 1) {
					obj.append('<a href="javascript:;" class="' + args.prevPage + '">上一页</a>');
				} else {
					obj.remove('.' + args.prevPage);
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="' + args.tcdNumber + '">' + 1 + '</a>');
				}
				if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
					obj.append('<span>...</span>');
				}
				var start = args.current - 2,
					end = args.current + 2;
				if ((start > 1 && args.current < 4) || args.current == 1) {
					end++;
				}
				if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
					start--;
				}
				for (; start <= end; start++) {
					if (start <= args.pageCount && start >= 1) {
						if (start != args.current) {
							obj.append('<a href="javascript:;" class="' + args.tcdNumber + '">' + start + '</a>');
						} else {
							obj.append('<span class="' + args.active + '">' + start + '</span>');
						}
					}
				}
				if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
					obj.append('<span>...</span>');
				}
				if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="' + args.tcdNumber + '">' + args.pageCount + '</a>');
				}
				//下一页
				if (args.current < args.pageCount) {
					obj.append('<a href="javascript:;" class="' + args.nextPage + '">下一页</a>');
				} else {
					obj.remove('.' + args.nextPage);
					obj.append('<span class="disabled">下一页</span>');
				}
			})();
		},
		refresh: function(pageCount, cur) {

			this.args.pageCount = pageCount;
			this.args.current = cur;
			this.fillHtml(this.obj, this.args);
			this.bindEvent(this.obj, this.args);
		},
		//绑定事件
		bindEvent: function(obj, args) {
			var self = this;
			obj.on("click", "a." + args.tcdNumber, function() {
				var current = parseInt($(this).text());

				self.fillHtml(obj, {
					"current": current,
					"pageCount": args.pageCount
				});
				if (typeof(args.backFn) == "function") {
					args.backFn(current);
				}
			});
			//上一页
			obj.on("click", "a." + args.prevPage, function() {
				var current = parseInt(obj.children("span." + args.active).text());
				self.fillHtml(obj, {
					"current": current - 1,
					"pageCount": args.pageCount
				});
				if (typeof(args.backFn) == "function") {
					args.backFn(current - 1);
				}
			});
			//下一页
			obj.on("click", "a." + args.nextPage, function() {
				var current = parseInt(obj.children("span." + args.active).text());
				self.fillHtml(obj, {
					"current": current + 1,
					"pageCount": args.pageCount
				});
				if (typeof(args.backFn) == "function") {
					args.backFn(current + 1);
				}
			});
		},
		offEvent: function(obj) {
			obj.unbind('click')
		}
	}
	for (var k in p) {
		PageCode.prototype[k] = p[k];
	}
	return PageCode;
})();

if(typeof exports !== 'undefined'){
	module.exports = PageCode;
}else{
	window.PageCode = PageCode;
}

