# O2-countdown

## 倒计时

### 配置参数
|配置参数|参数类型| 参数默认值 |作用说明|
|---|----|-------|----|
|startTime|int|当前时间「(new Date()).getTime()|开始时间|
|stopTime|int|当前时间「(new Date()).getTime()|结束时间，如果结束已过，则执行stop回调函数|
|format|string|'d-h-m-s'|最多支持'y-M-d-h-m-s'格式|
|every|callback|/|每1000ms执行一次，直至stopTime时间过去|
|stop|callback|/|达到stopTime指定时间时，调用|

### 公共方法
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
        console.log(data);
    },
    stop: function(data) {
        console.log('stop');
    }
}).start();

setTimeout(function() {
	countDown.stop();
}, 2000);
```