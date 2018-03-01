(function () {
    if (typeof window === 'undefined') {
        return {};
    }
    var rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var utils = (function () {
        var me = {};
        var _elementStyle = document.createElement('div').style;
        var _vendor = (function () {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }

            return false;
        })();

        function _prefixStyle(style) {
            if (_vendor === false) return false;
            if (_vendor === '') return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        me.getTime = Date.now || function getTime() {
            return new Date().getTime();
        };

        me.extend = function (target, obj) {
            for (var i in obj) {
                target[i] = obj[i];
            }
        };

        me.addEvent = function (el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
        };

        me.removeEvent = function (el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
        };

        me.prefixPointerEvent = function (pointerEvent) {
            return window.MSPointerEvent ?
                'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) :
                pointerEvent;
        };

        me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
            var distance = current - start,
                speed = Math.abs(distance) / time,
                destination,
                duration;
            deceleration = deceleration === undefined ? 0.0006 : deceleration;

            destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
            duration = speed / deceleration;

            if (destination < lowerMargin) {
                destination = wrapperSize ? lowerMargin - Math.min(wrapperSize / 2.5 * (speed / 8), wrapperSize / 3) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed;
            } else if (destination > 0) {
                destination = wrapperSize ? Math.min(wrapperSize / 2.5 * (speed / 8), wrapperSize / 3) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
            }

            return {
                destination: Math.round(destination),
                duration: duration
            };
        };

        var _transform = _prefixStyle('transform');

        me.extend(me, {
            hasTransform: _transform !== false,
            hasPerspective: _prefixStyle('perspective') in _elementStyle,
            hasTouch: 'ontouchstart' in window,
            hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
            hasTransition: _prefixStyle('transition') in _elementStyle
        });

        me.isBadAndroid = (function () {
            var appVersion = window.navigator.appVersion;
            // Android browser is not a chrome browser.
            if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
                var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
                if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
                    return parseFloat(safariVersion[1]) < 535.19;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })();

        me.extend(me.style = {}, {
            transform: _transform,
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin'),
            touchAction: _prefixStyle('touchAction')
        });

        me.hasClass = function (e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className);
        };

        me.addClass = function (e, c) {
            if (me.hasClass(e, c)) {
                return;
            }

            var newclass = e.className.split(' ');
            newclass.push(c);
            e.className = newclass.join(' ');
        };

        me.removeClass = function (e, c) {
            if (!me.hasClass(e, c)) {
                return;
            }

            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            e.className = e.className.replace(re, ' ');
        };

        me.offset = function (el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;

            // jshint -W084
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }
            // jshint +W084

            return {
                left: left,
                top: top
            };
        };

        me.preventDefaultException = function (el, exceptions) {
            for (var i in exceptions) {
                if (exceptions[i].test(el[i])) {
                    return true;
                }
            }

            return false;
        };

        me.extend(me.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,

            mousedown: 2,
            mousemove: 2,
            mouseup: 2,

            pointerdown: 3,
            pointermove: 3,
            pointerup: 3,

            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        });

        me.extend(me.ease = {}, {
            quadratic: {
                style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fn: function (k) {
                    return k * (2 - k);
                }
            },
            circular: {
                style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                fn: function (k) {
                    return Math.sqrt(1 - (--k * k));
                }
            },
            back: {
                style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fn: function (k) {
                    var b = 4;
                    return (k = k - 1) * k * ((b + 1) * k + b) + 1;
                }
            },
            bounce: {
                style: '',
                fn: function (k) {
                    if ((k /= 1) < (1 / 2.75)) {
                        return 7.5625 * k * k;
                    } else if (k < (2 / 2.75)) {
                        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                    } else if (k < (2.5 / 2.75)) {
                        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                    } else {
                        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                    }
                }
            },
            elastic: {
                style: '',
                fn: function (k) {
                    var f = 0.22,
                        e = 0.4;

                    if (k === 0) {
                        return 0;
                    }
                    if (k == 1) {
                        return 1;
                    }

                    return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
                }
            }
        });

        me.getTouchAction = function (eventPassthrough, addPinch) {
            var touchAction = 'none';
            if (eventPassthrough === 'vertical') {
                touchAction = 'pan-y';
            } else if (eventPassthrough === 'horizontal') {
                touchAction = 'pan-x';
            }
            if (addPinch && touchAction != 'none') {
                // add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
                touchAction += ' pinch-zoom';
            }
            return touchAction;
        };

        me.getRect = function (el) {
            if (el instanceof SVGElement) {
                var rect = el.getBoundingClientRect();
                return {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                };
            } else {
                return {
                    top: el.offsetTop,
                    left: el.offsetLeft,
                    width: el.offsetWidth,
                    height: el.offsetHeight
                };
            }
        };

        return me;
    })();


    var MScroll = (function () {
        function MScroll(el, options) {
            this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
            this.scroller = this.wrapper.children[0];
            this.scrollerStyle = this.scroller.style;

            this.options = {
                disableTouch: !utils.hasTouch,
                disableMouse: utils.hasTouch,

                // 那个方向滚动
                scrollX: false,
                scrollY: true,

                momentum: true, // 启动惯性

                // 反弹效果
                bounce: true,
                bounceTime: 600,
                bounceEasing: '',

                // 为了增加下拉刷新功能，增加一个距离
                topOffset: 0,

                // 阻力系数，到达临界点 拖动阻力
                dragForce: 3,
                deceleration: 0.0006,

                // 启用css3 过度
                useTransition: true,
                useTransform: true,

                // 频繁更改窗口尺寸的话，最小调用 回调时间
                resizePolling: 60,

                // 是否需要 滚动条
                scrollbars: false,
                scrollbarsFade: true,

                // 事件监听对象
                bindToWrapper: typeof window.onmousedown === "undefined"
            }
            for (var i in options) {
                this.options[i] = options[i];
            }

            // 3d加速
            this.translateZ = utils.hasPerspective ? ' translateZ(0)' : '';
            this.options.useTransition = utils.hasTransition && this.options.useTransition;
            this.options.useTransform = utils.hasTransform && this.options.useTransform;


            if (this.options.isUseAnimated) {
                this.options.useTransition = false
            }
            // defaults
            this.x = 0;
            this.y = 0;
            this.directionX = 0;
            this.directionY = 0;

            // 存储自定义事件
            this._events = {};

            this._init();
        }
        return MScroll
    })();

    MScroll.prototype = {
        version: '0.0.1',
        constructor: MScroll,
        _init: function () {
            this._initEvents()
            if (this.options.scrollbars) {
                this._initIndicators();
            }
            // 还没有什么用到的地方，留作 滑动开关控制
            this.enable();
            this.refresh();
        },
        _start: function (e) {
            if (!this.enabled) {
                return;
            }
            if (this.initiated && utils.eventType[e.type] !== this.initiated) {
                return;
            }
            e && e.preventDefault();
            e && e.stopPropagation();
            // 计算偏移量
            this.distX = 0;
            this.distY = 0;
            // 记录方向
            this.directionX = 0;
            this.directionY = 0;
            // 记录开始 时间
            this.startTime = utils.getTime();

            var point = e.touches ? e.touches[0] : e;

            // 开启滑动开关
            this.initiated = utils.eventType[e.type];
            this.moved = false;

            // 如果正在进行过渡动画，再次触摸，停止动画
            if (this.options.useTransition && this.isInTransition) {
                this._transitionTime();
                this.isInTransition = false;
                var pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._fire('scrollEnd');
            } else if (!this.options.useTransition && this.isAnimating) {
                this.isAnimating = false;
                this._fire('scrollEnd')
            }

            // 初始 transform 偏移量
            this.startX = this.x;
            this.startY = this.y;
            // 开始 坐标
            this.pointX = point.pageX;
            this.pointY = point.pageY;
        },
        _move: function (e) {
            if (!this.enabled) {
                return;
            }
            // _start 里初始化 类型，不一致不做任何操作，_end里会清空
            if (utils.eventType[e.type] !== this.initiated) {
                return;
            }
            // 阻止默认事件
            e && e.preventDefault();
            e && e.stopPropagation();
            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY,
                timestamp = utils.getTime(),
                newX, newY,
                absDistX, absDistY;

            // 更新 触点 坐标位置
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.distX += deltaX;
            this.distY += deltaY;

            absDistX = Math.abs(this.distX)
            absDistY = Math.abs(this.distY)

            // 如果滑动距离太短，不做滚动操作
            if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
                return;
            }

            // 计算最终 偏移位置
            if (!this.options.scrollY) {
                deltaY = 0;
            }
            if (!this.options.scrollX) {
                deltaX = 0;
            }
            newX = this.x + deltaX;
            newY = this.y + deltaY;

            // 如果到达最值，做 阻力限制
            if (newX > 0 || newX < this.maxScrollX) {
                newX = this.options.bounce ? this.x + deltaX / this.options.dragForce : newX > 0 ? 0 : this.maxScrollX;
            }
            if (newY > this.minScrollY || newY < this.maxScrollY) {
                newY = this.options.bounce ? this.y + deltaY / this.options.dragForce : newY > this.minScrollY ? this.minScrollY : this.maxScrollY;
            }

            // 设置方向
            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            // 开始 滚动，这里可以加入钩子函数
            if (!this.moved) {
                this._fire('scrollStart')
            }
            this.moved = true;
            this._translate(newX, newY);

            // 更新 位置
            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;
                this._fire('scroll')
            }
            this._fire('scroll')
        },
        _end: function (e) {
            if (!this.enabled) {
                return;
            }
            if (utils.eventType[e.type] !== this.initiated) {
                return;
            }
            e && e.preventDefault();
            e && e.stopPropagation();

            var point = e.changedTouches ? e.changedTouches[0] : e,
                momentumX,
                momentumY,
                duration = utils.getTime() - this.startTime,
                newX = Math.round(this.x),
                newY = Math.round(this.y),
                // 最后的大约300ms以内 滑动的距离
                distanceX = Math.abs(newX - this.startX),
                distanceY = Math.abs(newY - this.startY),
                time = 0,
                easing = '';

            // 过渡开关
            this.isInTransition = 0;

            // 关闭滑动开关
            this.initiated = 0;
            this.endTime = utils.getTime();

            // 判断是不是临界点
            if (this.resetPosition()) {
                return;
            }
            // 先定位到 保存的 坐标位置,然后启动惯性系统
            this.scrollTo(newX, newY);

            // 计算 惯性动量
            if (this.options.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                // 说明： 如果缓冲计算位置 比 最新minScrollY 小，会发生什么情况，需要测试
                // 理论上 缓冲计算位置 应该比 最小minScrollY || 0 要大
                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                // 开启过渡
                // this.isInTransition = 1;
            }

            if (newX != this.x || newY != this.y) {
                // 启动反弹效果
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = utils.ease.quadratic;
                }
                this.scrollTo(newX, newY, time, easing);
                return;
            }
            this._fire('scrollEnd');
        },
        _transitionEnd: function (e) {
            if (e.target != this.scroller || !this.isInTransition) {
                return;
            }
            this._transitionTime();
            if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this._fire('scrollEnd');
            }
        },
        _resize: function () {
            var self = this;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function () {
                self.refresh();
            }, this.options.resizePolling);
        },
        // 是否到达临界点，重置位置
        resetPosition: function () {
            var x = this.x,
                y = this.y;

            var time = this.options.bounceTime || 0;
            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0;
            } else if (this.x < this.maxScrollX) {
                x = this.maxScrollX;
            }
            if (!this.hasVerticalScroll || this.y > this.minScrollY) {
                y = this.minScrollY;
            } else if (this.y < this.maxScrollY) {
                y = this.maxScrollY;
            }
            if (x == this.x && y == this.y) {
                return false;
            }
            this.scrollTo(x, y, time, this.options.bounceEasing);
            return true;
        },
        scrollTo: function (x, y, time, easing) {
            easing = easing || utils.ease.circular;

            this.isInTransition = this.options.useTransition && time > 0;
            var transitionType = this.options.useTransition && easing.style;
            if (!time || transitionType) {
                if (transitionType) {
                    this._transitionTimingFunction(easing.style);
                    this._transitionTime(time);
                }
                this._translate(x, y);
            } else {
                this._animate(x, y, time, easing.fn);
            }
        },
        _transitionTime: function (time) {
            if (!this.options.useTransition) {
                return;
            }
            time = time || 0;
            var durationProp = utils.style.transitionDuration;
            if (!durationProp) {
                return;
            }
            this.scrollerStyle[durationProp] = time + 'ms';

            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].transitionTime(time);
                }
            }

        },
        _transitionTimingFunction: function (easing) {
            this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].transitionTimingFunction(easing);
                }
            }
        },
        _translate: function (x, y) {
            this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
            // if (this.options.useTransform) {
            //     this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
            // }
            this.x = x;
            this.y = y;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].updatePosition();
                }
            }
        },
        _animate: function (destX, destY, duration, easingFn) {
            var self = this,
                startX = this.x,
                startY = this.y,
                startTime = utils.getTime(),
                destTime = startTime + duration;

            function step() {
                var now = utils.getTime(),
                    newX, newY,
                    easing;

                if (now >= destTime) {
                    self.isAnimating = false;
                    self._translate(destX, destY);

                    if (!self.resetPosition(self.options.bounceTime)) {
                        self._fire('scrollEnd');
                    }

                    return;
                }

                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                self._translate(newX, newY);

                if (self.isAnimating) {
                    rAF(step);
                }
                self._fire('scroll')
            }
            this.isAnimating = true;
            step();
        },
        getComputedPosition: function () {
            var matrix = window.getComputedStyle(this.scroller, null),
                x, y;

            if (this.options.useTransform) {
                matrix = matrix[utils.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            }

            return {
                x: x,
                y: y
            };
        },
        disable: function () {
            this.enabled = false;
        },
        enable: function () {
            this.enabled = true;
        },
        refresh: function () {
            // 重置容器
            var wrapperRect = utils.getRect(this.wrapper);
            this.wrapperWidth = wrapperRect.width;
            this.wrapperHeight = wrapperRect.height;

            this.wrapper.style['overflow'] = 'hidden';
            this.wrapper.style['touchAction'] = 'none';
            // 重置 视图
            var rect = utils.getRect(this.scroller);
            this.scrollerWidth = rect.width;
            this.scrollerHeight = rect.height;

            // 重置 滚条距离, 更改自定义 最小距
            this.minScrollY = this.options.topOffset || 0;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, this.minScrollY);

            // 是否有滚动, 竖直方向 预留 topOffSet
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.options.topOffset;

            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }

            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }
            this.endTime = 0;

            this.directionX = 0;
            this.directionY = 0;

            this._fire('refresh')
            this.resetPosition()

        },
        // 注册自定义事件
        on: function (type, fn) {
            if (!this._events[type]) {
                this._events[type] = []
            }
            this._events[type].push(fn);
        },
        // 移除自定义事件
        off: function (type, fn) {
            if (!this._events[type]) {
                return;
            }
            var index = this._events[type].indexOf(fn);
            if (index > -1) {
                this._events[type].splice(index, 1)
            }
        },
        // 触发自定义事件
        _fire: function (type) {
            if (!this._events[type]) {
                return;
            }
            var i = 0,
                len = this._events[type].length;
            if (!len) {
                return;
            }
            for (; i < len; i++) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        },
        _initEvents: function (remove) {
            var eventType = remove ? utils.removeEvent : utils.addEvent,
                target = this.options.bindToWrapper ? this.wrapper : window;
            eventType(window, 'orientationchange', this);
            eventType(window, 'resize', this);

            if (!this.options.disableMouse) {
                eventType(this.wrapper, 'mousedown', this);
                eventType(target, 'mousemove', this);
                eventType(target, 'mousecancel', this);
                eventType(target, 'mouseup', this);
            }

            // if (utils.hasPointer && !this.options.disablePointer) {
            //     eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
            //     eventType(target, utils.prefixPointerEvent('pointermove'), this);
            //     eventType(target, utils.prefixPointerEvent('pointercancel'), this);
            //     eventType(target, utils.prefixPointerEvent('pointerup'), this);
            // }
            if (!this.options.disableTouch) {
                eventType(this.wrapper, 'touchstart', this);
                eventType(target, 'touchmove', this);
                eventType(target, 'touchcancel', this);
                eventType(target, 'touchend', this);
            }

            eventType(this.scroller, 'transitionend', this);
            eventType(this.scroller, 'webkitTransitionEnd', this);
            eventType(this.scroller, 'oTransitionEnd', this);
            eventType(this.scroller, 'MSTransitionEnd', this);
        },
        handleEvent: function (e) {
            switch (e.type) {
                case 'touchstart':
                case 'mousedown':
                    this._start(e);
                    break;
                case 'touchmove':
                case 'mousemove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'mouseup':
                case 'touchcancel':
                case 'mousecancel':
                    this._end(e);
                    break;
                case 'orientationchange':
                case 'resize':
                    this._resize();
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    this._transitionEnd(e);
                    break;
            }
        },
        _initIndicators: function () {
            var self = this;
            this.indicators = [];
            if (this.options.scrollY) {
                var el = Indicator.createDefaultScrollbar('v');
                this.wrapper.appendChild(el)
                this.indicators.push(new Indicator(this, {
                    el: el,
                    directionY: true
                }))
            }
            if (this.options.scrollX) {
                var el = Indicator.createDefaultScrollbar('h');
                this.wrapper.appendChild(el);
                this.indicators.push(new Indicator(this, {
                    el: el,
                    directionX: true
                }))
            }
            this.on('refresh', function () {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].refresh.call(this.indicators[i])
                }
            })
            if (this.options.scrollbarsFade) {
                this.on('scrollStart', function () {
                    mapIndicators(function () {
                        this.fade(1)
                    })
                })
                this.on('scrollEnd', function () {
                    mapIndicators(function () {
                        this.fade()
                    })
                })
            }

            function mapIndicators(fn) {
                for (var i = self.indicators.length; i--;) {
                    fn.call(self.indicators[i])
                }
            }
        }
    }

    var Indicator = (function () {
        function Indicator(scroller, options) {
            this.wrapper = options.el;
            this.wrapperStyle = this.wrapper.style;
            this.indicator = this.wrapper.children[0];
            this.indicatorStyle = this.indicator.style;
            this.scroller = scroller;

            this.options = {
                directionY: false,
                directionX: false
            }
            for (var i in options) {
                this.options[i] = options[i]
            }
        }
        Indicator.createDefaultScrollbar = function (direction) {
            var scrollbar = document.createElement('div'),
                indicator = document.createElement('div');

            scrollbar.style.cssText = 'position:absolute;z-index:9999';
            indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.4);border-radius:4px';

            if (direction == 'v') {
                scrollbar.className = 'MScrollVerticalBar';
                scrollbar.style.cssText += ';width: 5px;bottom: 2px;top: 2px;right: 1px;overflow: hidden';
                indicator.style.cssText += ';width: 100%;'
            }
            if (direction == 'h') {
                scrollbar.className = 'MScrollHorizontalBar';
                scrollbar.style.cssText += ';height: 5px;bottom: 0px;left: 2px;right: 2px;overflow: hidden';
                indicator.style.cssText += ';height: 100%;'
            }

            scrollbar.appendChild(indicator);
            return scrollbar;
        }
        return Indicator;
    })();

    Indicator.prototype = {
        constructor: Indicator,
        refresh: function () {
            if (this.options.directionY && !this.scroller.hasVerticalScroll) {
                this.indicatorStyle.display = 'none'
            }
            if (this.options.directionX && !this.scroller.hasHorizontalScroll) {
                this.indicatorStyle.display = 'none'
            }
            this.wrapperHeight = this.wrapper.clientHeight;
            // 如果scroll容器顶部多出的 topOffSet，那么滚动条需要做一个容差处理
            this.topOffset = this.scroller.options.topOffset || 0;
            // 设置 滚条跳高度
            this.indicatorHeight = this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight + this.topOffset || this.wrapperHeight || 1);
            this.indicatorStyle.height = this.indicatorHeight + 'px';
            // 计算 相对比例，相对于与滑动容器缩放比
            this.maxPosY = this.wrapperHeight - this.indicatorHeight;
            this.sizeRatioY = Math.min(this.maxPosY / (this.scroller.maxScrollY - this.topOffset || 1), 1);
            this.updatePosition();
        },
        updatePosition: function () {
            var x = Math.round(this.sizeRatioX * this.scroller.x) || 0,
                y = Math.round(this.sizeRatioY * (this.scroller.y - this.topOffset)) || 0;

            this.x = x;
            this.y = y;
            this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
        },
        transitionTimingFunction: function (easing) {
            this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
        },
        transitionTime: function (time) {
            time = time || 0;
            var durationProp = utils.style.transitionDuration;
            if (!durationProp) {
                return;
            }
            this.indicatorStyle[durationProp] = time + 'ms';
        },
        fade: function (v) {

            var self = this;

            clearTimeout(this.fadeTimeout)

            var time = v ? 250 : 500,
                delay = v ? 0 : 300;
            v = v ? '1' : '0'
            this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
            this.fadeTimeout = setTimeout(function () {
                self.wrapperStyle.opacity = v
            }, delay)
        }
    }

    if (typeof module != 'undefined' && module.exports) {
        module.exports = MScroll;
    } else if (typeof define == 'function' && define.amd) {
        define(function () {
            return MScroll;
        });
    } else {
        window.MScroll = MScroll;
    }
})()