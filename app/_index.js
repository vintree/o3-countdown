const CountDown = function(obj) {
    CountDown.vars = {
        startTime: obj.startTime ? obj.startTime : (new Date()).getTime(),
        stopTime: obj.stopTime ? obj.stopTime : (new Date()).getTime(),
        format: obj.format ? obj.format : 'd-h-m-s',
        every: obj.every ? obj.every : function() {},
        stop: obj.stop ? obj.stop : function() {}
    };
    CountDown.vars.state = [];
    return CountDown;
};

// 开始方法
CountDown.start = function() {
    if(CountDown.check()) {
        CountDown.every();
    } else {
        CountDown.stop();
    }
    return CountDown;
};

// 停止方法
CountDown.stop = function() {
    clearInterval(CountDown.vars.t);
    CountDown.vars.stop();
    return CountDown;
};

// 验证
CountDown.check = function() {
    if((new Date()).getTime() > CountDown.vars.stopTime) {
        return false;
    }
    return true;
};

// 核心
CountDown.every = function() {
    var every = CountDown.vars.every,
        stratTime = CountDown.vars.startTime;
    CountDown.vars.t = setInterval(function() {
        if(stratTime - (new Date()).getTime() > 0) return;
        if((new Date()).getTime() > CountDown.vars.stopTime) {
            CountDown.stop();
            return;
        }
        CountDown.factory((new Date()).getTime(), CountDown.vars.stopTime);
        every(CountDown.vars.state);
        CountDown.vars.state = [];
    }, 1000);
};

// 传递时间链, 时间差
CountDown.factory = function(startTIme, stopTime) {
    var list = CountDown.vars.format.split('-');
    CountDown.core(list, stopTime - startTIme);
};

// 放置时间
CountDown.core = function(list, time) {
    var now = (new Date()).getTime(),
        data, key;
    for(var i = 0, l = list.length; i < l; i++) {
        key = list[i];
        data = CountDown.timeGroup(key, time);
        time = data.time;
        CountDown.vars.state.push(data.data);
    }
};

// 伪阶乘
CountDown.pseudoFactorial = function(n, num) {
    var count = 1;
    for(var i = 0; i < num; i++) {
        count = count * n[i];
    }
    return count;
};

// 时间集
CountDown.timeGroup = function(key, time) {
    var m = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        n = [1000, 60, 60, 24, 30, 12],
        data = {
            y: function(time) {
                var formula = 1000 * 60 * 60 * 24;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 6))),
                    time: time % formula
                }
            },
            M: function(time) {
                var formula = 1000 * 60 * 60 * 24;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 5))),
                    time: time % formula
                }
            },
            d: function(time) {
                var formula = 1000 * 60 * 60 * 24;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 4))),
                    time: time % formula
                }
            },
            h: function(time) {
                var formula = 1000 * 60 * 60;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 3))),
                    time: time % formula
                }
            },
            m: function(time) {
                var formula = 1000 * 60;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 2))),
                    time: time % formula
                }
            },
            s: function(time) {
                var formula = 1000;
                return {
                    data: CountDown.leftpad(Math.floor(time / CountDown.pseudoFactorial(n, 1))),
                    time: time % formula
                }
            }
        };
    return data[key](time);
};

CountDown.leftpad = function(num) {
    if(num < 10) {
        return '0' + num
    }
    return num + ''
};

module.exports = CountDown;
