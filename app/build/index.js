/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://127.0.0.1:9090/static/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	function CountDown(obj) {
	    CountDown.vars = obj;
	    CountDown.vars.state = [];
	    return CountDown;
	};

	// 开始方法
	CountDown.start = function () {
	    if (CountDown.check()) {
	        CountDown.every();
	    } else {
	        CountDown.stop();
	    }
	    return CountDown;
	};

	// 停止方法
	CountDown.stop = function () {
	    clearInterval(CountDown.vars.t);
	    CountDown.vars.stop();
	    return CountDown;
	};

	// 验证
	CountDown.check = function () {
	    if (new Date().getTime() > CountDown.vars.stopTime) {
	        return false;
	    }
	    return true;
	};

	// 核心
	CountDown.every = function () {
	    var every = CountDown.vars.every,
	        stratTime = CountDown.vars.startTime ? CountDown.vars.startTime : new Date().getTime();
	    CountDown.vars.t = setInterval(function () {
	        if (stratTime - new Date().getTime() > 0) return;
	        if (new Date().getTime() > CountDown.vars.stopTime) {
	            CountDown.stop();
	            return;
	        }
	        CountDown.factory(new Date().getTime(), CountDown.vars.stopTime);
	        every(CountDown.vars.state);
	        CountDown.vars.state = [];
	    }, 1000);
	};

	// 传递时间链, 时间差
	CountDown.factory = function (startTIme, stopTime) {
	    var list = CountDown.vars.format.split('-');
	    CountDown.core(list, stopTime - startTIme);
	};

	// 放置时间
	CountDown.core = function (list, time) {
	    var now = new Date().getTime(),
	        data,
	        key;
	    for (var i = 0, l = list.length; i < l; i++) {
	        key = list[i];
	        data = CountDown.timeGroup(key, time);
	        time = data.time;
	        CountDown.vars.state.push(data.data);
	    }
	};

	// 伪阶乘
	CountDown.pseudoFactorial = function (n, num) {
	    var count = 1;
	    for (var i = 0; i < num; i++) {
	        count = count * n[i];
	    }
	    return count;
	};

	// 时间集
	CountDown.timeGroup = function (key, time) {
	    var m = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	        n = [1000, 60, 60, 24, 30, 12],
	        data = {
	        y: function y(time) {
	            var formula = 1000 * 60 * 60 * 24;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 6)),
	                time: time % formula
	            };
	        },
	        M: function M(time) {
	            var formula = 1000 * 60 * 60 * 24;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 5)),
	                time: time % formula
	            };
	        },
	        d: function d(time) {
	            var formula = 1000 * 60 * 60 * 24;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 4)),
	                time: time % formula
	            };
	        },
	        h: function h(time) {
	            var formula = 1000 * 60 * 60;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 3)),
	                time: time % formula
	            };
	        },
	        m: function m(time) {
	            var formula = 1000 * 60;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 2)),
	                time: time % formula
	            };
	        },
	        s: function s(time) {
	            var formula = 1000;
	            return {
	                data: Math.floor(time / CountDown.pseudoFactorial(n, 1)),
	                time: time % formula
	            };
	        }
	    };
	    return data[key](time);
	};

	module.export = CountDown;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);