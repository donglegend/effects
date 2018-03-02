;
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}());
function loadEvent(fn) {
    var oldFn = window.onload;
    if (typeof window.onload != "function") {
        window.onload = fn;
    } else {
        window.onload = function () {
            oldFn();
            fn();
        }
    }
}

function getEleById(id) {
    return document.getElementById(id) || "";
}

var Wind = (function () {

    function Wind(conf) {
        console.log(conf);
        this.type = "Wind";
        this.ele = getEleById(conf.ele);
        this.contentText = conf.contentText || "hello wind!";
        this.stepIndex = 0;
        this.stepSum = 0;
        this.init = true;
        this.timer = null;
        this.rate = conf.rate || 0;
        this.rateIndex = this.rate;
        this.endfn = conf.endfn || function () { };
        if (this === window) {
            return new Wind(conf);
        }
    }

    Wind.prototype = {
        run: function () {
            var s = this;
            if (this.rateIndex++ >= this.rate) {
                this.rateIndex = 0

                s.stepIndex++;

                if (!s.ele) {
                    return;
                }
                if (s.init) {
                    s.stepIndex = 0;
                    s.stepSum = s.contentText.length;
                    s.init = false;
                    s.ele.innerHTML = "";
                }
                var curText = s.ele.innerHTML;

                var curChart = s.contentText.charAt(s.stepIndex);

                var nextOneChar = s.contentText.substr(s.stepIndex, 1);
                if (nextOneChar == '$') {
                    curChart = '<p class="p"></p>';
                    s.stepIndex++;
                    curText += curChart;
                }

                curChart = s.contentText.charAt(s.stepIndex);
                var nextFourChars = s.contentText.substr(s.stepIndex, 4);
                if (nextFourChars == '<BR>' || nextFourChars == '<br>') {
                    curChart = '<BR>';
                    s.stepIndex += 3;
                }

                curText += curChart;
                s.ele.innerHTML = curText;
                s.ele.scrollTop = s.ele.scrollHeight + 30;
            }

            if (s.stepIndex < s.stepSum - 1) {
                s.timer = requestAnimationFrame(s.run.bind(s));
            } else {
                cancelAnimationFrame(s.timer);
                s.endfn.call(s);
            }
        }
    }

    Object.defineProperty(Wind, "prototype", {
        writable: false
    })
    return Wind;

})();


function main() {
    var ka = getEleById("kaSound");
    var bg = getEleById("bgSound");
    var startbtn = getEleById('startbtn');
    var txt = getEleById("txt").innerHTML;
    var ops = {
        "ele": "Wind",
        "contentText": txt,
        rate: 3,
        endfn: function () {
            ka.pause()
        }
    }
    var myWind = new Wind(ops);
    startbtn.onclick = function () {
        startbtn.parentNode.parentNode.removeChild(startbtn.parentNode)
        startbtn.onclick = null
        myWind.run();
        setTimeout(function () {
            ka.play();
        }, 500)
        bg.play();
    }
}

loadEvent(main);

