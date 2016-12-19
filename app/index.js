const CountDown = function(obj) {
    var vars = {
        startTime: obj.startTime ? obj.startTime : (new Date()).getTime(),
        stopTime: obj.stopTime ? obj.stopTime : (new Date()).getTime(),
        format: obj.format ? obj.format : 'd-h-m-s',
        every: obj.every ? obj.every : function() {},
        stop: obj.stop ? obj.stop : function() {}
    };
    var clearIntervalId = 0;
    vars.state = [];
    // 开始方法
    function start() {
        if(check()) {
            every(CountDown);
        } else {
            stop();
        }
    }

    // 停止方法
    function stop() {
        clearInterval(clearIntervalId);
        vars.stop();
    };

    // 验证
    function check() {
        return new Date().getTime() < vars.stopTime
    };

    // 循环
    function every() {
        var every = vars.every,
        stratTime = vars.startTime;
        clearIntervalId = setInterval(function() {
            if(stratTime - (new Date()).getTime() > 0) return;
            if((new Date()).getTime() > vars.stopTime) {
                stop(clearIntervalId);
                return;
            }
            factory((new Date()).getTime(), vars.stopTime);
            every(vars.state);
            vars.state = [];
        }, 1000)
    }

    // 传递时间链, 时间差
    function factory(startTIme, stopTime) {
        var list = vars.format.split('-');
        core(list, stopTime - startTIme);
    };

    // 放置时间
    function core(list, time) {
        var now = (new Date()).getTime(),
            data, key;
        for(var i = 0, l = list.length; i < l; i++) {
            key = list[i];
            data = timeGroup(key, time);
            time = data.time;
            vars.state.push(data.data);
        }
    };

    // 伪阶乘
    function pseudoFactorial(n, num) {
        var count = 1;
        for(var i = 0; i < num; i++) {
            count = count * n[i];
        }
        return count;
    };

    // 时间集
    function timeGroup(key, time) {
        var m = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            n = [1000, 60, 60, 24, 30, 12],
            data = {
                y: function(time) {
                    var formula = 1000 * 60 * 60 * 24;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 6))),
                        time: time % formula
                    }
                },
                M: function(time) {
                    var formula = 1000 * 60 * 60 * 24;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 5))),
                        time: time % formula
                    }
                },
                d: function(time) {
                    var formula = 1000 * 60 * 60 * 24;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 4))),
                        time: time % formula
                    }
                },
                h: function(time) {
                    var formula = 1000 * 60 * 60;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 3))),
                        time: time % formula
                    }
                },
                m: function(time) {
                    var formula = 1000 * 60;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 2))),
                        time: time % formula
                    }
                },
                s: function(time) {
                    var formula = 1000;
                    return {
                        data: leftpad(Math.floor(time / pseudoFactorial(n, 1))),
                        time: time % formula
                    }
                }
            };
        return data[key](time);
    };

    function leftpad(num) {
        if(num < 10) {
            return '0' + num
        }
        return num + ''
    };

    return {
        start: start,
        stop: stop
    };
};

module.exports = CountDown;