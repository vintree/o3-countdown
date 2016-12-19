# O2-countdown - 0.3.0

O2-countdown是一个倒计时组件，具备以下功能

* 在倒计时过程中可以手动停止并执行回调函数，或时间到达自动执行回调函数，
* 倒计时开始时机手动触发
* 对大月、小月做了区分，可满足跨天的特殊场景
* 同时支持y-M-d-h-m-s格式，n（1 <= n <= 6）个相连格式可正确返回相应数据，例如：'y-M-d-h-m-s', 'y-M-d-h-m','M-d-h','m-s'等
    * y -- 年
    * M -- 月
    * d -- 日
    * h -- 时
    * m -- 分
    * s -- 秒
* 返回数据，在格式中选了n个，返回n个数据，数据格式为数组，例如：'M-d-h' => ['04', '03', '59']

## 0.3.0
* 支持了同一页面多个倒计时功能
* 优化代码结构
* 改变调用方式

### 配置参数
|配置参数|参数类型| 参数默认值 |作用说明|
|---|----|-------|----|
|startTime|int|当前时间「(new Date()).getTime()|开始时间|
|stopTime|int|当前时间「(new Date()).getTime()|结束时间，如果结束已过，则执行stop回调函数|
|format|string|'d-h-m-s'|最多支持'y-M-d-h-m-s'格式|
|every|callback|/|每1000ms执行一次，直至stopTime时间过去|
|stop|callback|/|达到stopTime指定时间时，调用|

### 方法
|方法名称|入参说明|返回值|作用说明|
|-------|------ |-----|------|
|start()|/|countdown自身对象|开始倒计时|
|stop()|/|countdown自身对象|结束倒计时|

### 用例
```
var countDown = new CountDown({
    startTime: (new Date(2016, 3, 13, 2, 11, 50)).getTime(),
    stopTime: (new Date(2018, 3, 15, 2, 13, 0)).getTime(),
    format: 'y-M-d',
    every: function(data) {
        // 间隔1000毫秒执行一次
        console.log(data);
    },
    stop: function(data) {
        console.log('stop');
    }
}));

// 手动出发时，会返回一个停止id，在手动停止时使用
var stopId = countDown.start();

setTimeout(function() {
	countDown.stop(stopId);
}, 2000);
```

0.2.x 和 0.3.x完全不兼容，如果还在使用0.2.x版本，可参考[0.2.x版本文档](https://github.com/wuguzi/O2-countdown/wiki/0.2.x%E6%96%87%E6%A1%A3)