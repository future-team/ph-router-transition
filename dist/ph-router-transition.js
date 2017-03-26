(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react/lib/ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react/lib/ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["PhRouterTransition"] = factory(require("react"), require("react/lib/ReactDOM"));
	else
		root["PhRouterTransition"] = factory(root["React"], root["ReactDom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(4);


/***/ },

/***/ 4:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },

/***/ 7:
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(54);
	
	var _RouterTransitionJs = __webpack_require__(55);
	
	var _RouterTransitionJs2 = _interopRequireDefault(_RouterTransitionJs);

	exports['default'] = _RouterTransitionJs2['default'];
	module.exports = exports['default'];

/***/ },

/***/ 54:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(56);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _promiseQueue = __webpack_require__(57);
	
	var _promiseQueue2 = _interopRequireDefault(_promiseQueue);
	
	/**
	 * 路由切换组件<br/>
	 * - 通过`transitionName`设置动画类型，可选`[fade, slide-top, slide-bottom, slide-left, slide-right]`。
	 * - 通过`loadedCallback`函数设置动画完成的回调。
	 * - 可通过`timeout`设置动画时间，和设置的css的动画时间一致是最流畅的。
	 * - 在列表页的最外层元素加`ph-transition-index`类，其他页面跳转到列表页都是回退的效果，到另一个新页面都是前进的效果。
	 *
	 * 主要属性和接口：
	 * - transitionName:动画类型/动画名称，默认fade。
	 * - loadedCallback:动画完成的回调函数。
	 * - timeout:动画时间。
	 * 
	 * 示例：
	 * ```code
	 *  import RouterTransition from 'ph-router-transition';
	 * 
	 *  const PageTransition = (props)=>(
	 *      <RouterTransition {...props} transitionName="slide-left" loadedCallback={()=>{console.log('end!!!');}} timeout={500}>{props.children}</RouterTransition>
	 *  );
	 * ```
	 * ```code
	 *  let Index = class index extends Component {
	 *      render() {
	 *          return (
	 *              <div className="menu ph-transition-index">
	 *                  ...
	 *              </div>
	 *          );
	 *      }
	 *  };
	 * ```
	 * ```code
	 *  <Router history={this.history}>
	 *      <Route component={PageTransition}>
	 *          <Route path="/index" name="index" component={Index} />
	 *          <Route path="/detail" name="detail" component={Detail} />
	 *          ...
	 *          <Redirect from="/" to="/index" />
	 *      </Route>
	 *  </Router>
	 * ```
	 * 
	 * @class RouterTransition
	 * @module 路由动画
	 * @extends Component
	 * @constructor
	 * @since 0.1.0
	 * @demo index|index.js {展示}
	 * @show true
	 * */
	
	var RouterTransition = (function (_React$Component) {
	    _inherits(RouterTransition, _React$Component);
	
	    _createClass(RouterTransition, null, [{
	        key: 'propTypes',
	        value: {
	            /**
	             * 动画名称，可选[fade, slide-top, slide-bottom, slide-left, slide-right]
	             * @property transitionName
	             * @type String
	             * @default 'fade'
	             * */
	            transitionName: _react.PropTypes.string,
	            /**
	             * 动画结束执行的回调
	             * @method loadedCallback
	             * @type Function
	             * @default null
	             * */
	            loadedCallback: _react.PropTypes.func,
	            /**
	             * 动画时间，和设置的css的动画时间一致是最流畅的
	             * @property timeout
	             * @type Number
	             * @default 500
	             * */
	            timeout: _react.PropTypes.number,
	            animateOnInit: _react.PropTypes.bool,
	            data: _react.PropTypes.object
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            timeout: 500,
	            transitionName: 'fade',
	            animateOnInit: true,
	            classMapping: {}
	        },
	        enumerable: true
	    }]);
	
	    function RouterTransition(props, context) {
	        _classCallCheck(this, RouterTransition);
	
	        _React$Component.call(this, props, context);
	
	        if (this.props.animateOnInit) {
	            this.state = {
	                child1: null,
	                child2: null,
	                nextChild: 1
	            };
	        } else {
	            this.state = {
	                child1: this.props.children,
	                child2: null,
	                nextChild: 2
	            };
	        }
	
	        this.transite = this.transite.bind(this);
	        this.gerRef = this.getRef.bind(this);
	
	        this.queue = new _promiseQueue2['default'](1, Infinity);
	
	        this.itemClass = 'ph-transition-item';
	
	        this.routeRecord = [props.location.pathname];
	        this.forward = true;
	    }
	
	    RouterTransition.prototype.componentDidMount = function componentDidMount() {
	        var _props = this.props;
	        var animateOnInit = _props.animateOnInit;
	        var data = _props.data;
	        var children = _props.children;
	
	        if (!animateOnInit) {
	            var child = this.getRef('child1');
	            if (child) {
	                var dom = _reactDom2['default'].findDOMNode(child);
	                child.onTransitionDidEnd && child.onTransitionDidEnd(data);
	                dom.classList.remove(this.itemClass);
	            }
	        } else {
	            this.transite(children);
	        }
	    };
	
	    RouterTransition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        var _this = this;
	
	        // 判断当前是往前还是后退
	        this.forward = this.routeForward(nextProps.location.pathname);
	
	        var transitNewChild = function transitNewChild() {
	            _this.queue.add(function () {
	                return _this.transite(nextProps.children);
	            });
	        };
	        var updateChild = function updateChild() {
	            var currentChild = _this.state.nextChild === 1 ? 2 : 1;
	            _this.state['child' + currentChild] = nextProps.children;
	            _this.forceUpdate();
	        };
	
	        if (this.props.children && this.props.children.props && this.props.children.props['data-transition-id'] && nextProps.children.props['data-transition-id']) {
	
	            if (this.props.children.props['data-transition-id'] !== nextProps.children.props['data-transition-id']) {
	                transitNewChild();
	            } else {
	                updateChild();
	            }
	        } else {
	            if (this.props.children !== nextProps.children) {
	                transitNewChild();
	            } else {
	                updateChild();
	            }
	        }
	    };
	
	    RouterTransition.prototype.routeForward = function routeForward(nextPathName) {
	        var routeLen = this.routeRecord.length;
	
	        if (routeLen > 1 && this.routeRecord[routeLen - 2] === nextPathName) {
	            // back
	            this.routeRecord.pop();
	            return false;
	        } else {
	            this.routeRecord.push(nextPathName);
	            return true;
	        }
	    };
	
	    RouterTransition.prototype.getClass = function getClass(mode) {
	        if (mode && this.forward || !mode && !this.forward) {
	            return 'ph-transition-from';
	        } else {
	            return 'ph-transition-to';
	        }
	    };
	
	    RouterTransition.prototype.getRef = function getRef(ref) {
	        var child = this.refs[ref];
	        if (child && child.getWrappedInstance) {
	            child = child.getWrappedInstance();
	        }
	        return child;
	    };
	
	    RouterTransition.prototype.transite = function transite(nextChild) {
	        var _this2 = this;
	
	        return new Promise(function (transiteDone, transiteFailed) {
	            _this2.state['child' + _this2.state.nextChild] = nextChild;
	            _this2.forceUpdate(function () {
	                var prevChild = _this2.getRef('child' + (_this2.state.nextChild === 1 ? 2 : 1));
	                var newChild = _this2.getRef('child' + _this2.state.nextChild);
	                var prevChildDom = _reactDom2['default'].findDOMNode(prevChild);
	                var newChildDom = _reactDom2['default'].findDOMNode(newChild);
	                var timeout = 0;
	
	                var willStart = function willStart() {
	                    if (newChild.onTransitionWillStart) {
	                        return newChild.onTransitionWillStart(_this2.props.data) || Promise.resolve();
	                    }
	                    if (prevChild && prevChild.onTransitionLeaveWillStart) {
	                        return prevChild.onTransitionLeaveWillStart(_this2.props.data) || Promise.resolve();
	                    }
	                    return Promise.resolve();
	                };
	
	                var start = function start() {
	                    //强制设置列表页
	                    if (newChildDom.classList.contains('ph-transition-index')) {
	                        _this2.forward = false;
	                    } else if (prevChildDom && prevChildDom.classList.contains('ph-transition-index')) {
	                        _this2.forward = true;
	                    }
	
	                    if (newChildDom) {
	                        timeout = _this2.props.timeout;
	                        newChildDom.classList.add(_this2.props.transitionName + '-enter');
	                        if (prevChildDom) newChildDom.classList.add(_this2.itemClass);
	                        newChildDom.classList.add(_this2.getClass(true));
	
	                        newChildDom.offsetHeight; // Trigger layout to make sure transition happen
	
	                        if (newChild.transitionManuallyStart) {
	                            return newChild.transitionManuallyStart(_this2.props.data, start) || Promise.resolve();
	                        }
	                        newChildDom.classList.add(_this2.props.transitionName + '-enter-active');
	                    }
	
	                    if (prevChildDom) {
	                        prevChildDom.classList.add(_this2.props.transitionName + '-leave');
	                        prevChildDom.classList.add(_this2.itemClass);
	                        prevChildDom.classList.add(_this2.getClass(false));
	
	                        timeout = _this2.props.timeout;
	                        prevChildDom.offsetHeight; // Trigger layout to make sure transition happen
	
	                        if (prevChild.transitionLeaveManuallyStart) {
	                            return prevChild.transitionLeaveManuallyStart(_this2.props.data, start) || Promise.resolve();
	                        }
	                        prevChildDom.classList.add(_this2.props.transitionName + '-leave-active');
	                    }
	                    return Promise.resolve();
	                };
	
	                var didStart = function didStart() {
	                    if (newChild.onTransitionDidStart) {
	                        return newChild.onTransitionDidStart(_this2.props.data) || Promise.resolve();
	                    }
	                    if (prevChild && prevChild.onTransitionDidStartLeave) {
	                        return prevChild.onTransitionLeaveDidStart(_this2.props.data) || Promise.resolve();
	                    }
	                    return Promise.resolve();
	                };
	
	                // Wait for transition
	                var waitForTransition = function waitForTransition() {
	                    return new Promise(function (resolve) {
	                        setTimeout(function () {
	                            // Swap child and remove the old child
	                            _this2.state.nextChild = _this2.state.nextChild === 1 ? 2 : 1;
	                            _this2.state['child' + _this2.state.nextChild] = null;
	                            _this2.forceUpdate(resolve);
	                        }, timeout);
	                    });
	                };
	
	                // Before remove classes
	                var willEnd = function willEnd() {
	                    if (newChild.onTransitionWillEnd) {
	                        return newChild.onTransitionWillEnd(_this2.props.data) || Promise.resolve();
	                    }
	                    if (prevChild && prevChild.onTransitionLeaveWillEnd) {
	                        return prevChild.onTransitionLeaveWillEnd(_this2.props.data) || Promise.resolve();
	                    }
	                    return Promise.resolve();
	                };
	
	                // Remove appear and active class (or trigger manual end)
	                var end = function end() {
	                    if (newChildDom) {
	                        newChildDom.classList.remove(_this2.props.transitionName + '-enter');
	                        newChildDom.classList.remove(_this2.getClass(true));
	                        newChildDom.classList.remove(_this2.itemClass);
	
	                        if (newChild.transitionManuallyStop) {
	                            return newChild.transitionManuallyStop(_this2.props.data) || Promise.resolve();
	                        }
	                        newChildDom.classList.remove(_this2.props.transitionName + '-enter-active');
	                    }
	
	                    if (prevChildDom) {
	                        prevChildDom.classList.remove(_this2.props.transitionName + '-leave');
	                        prevChildDom.classList.remove(_this2.getClass(false));
	                        prevChildDom.classList.remove(_this2.itemClass);
	
	                        if (prevChild.transitionLeaveManuallyStop) {
	                            return prevChild.transitionLeaveManuallyStop(_this2.props.data) || Promise.resolve();
	                        }
	                        prevChildDom.classList.remove(_this2.props.transitionName + '-leave-active');
	                    }
	                    return Promise.resolve();
	                };
	
	                // After remove classes
	                var didEnd = function didEnd() {
	                    if (newChild.onTransitionDidEnd) {
	                        return newChild.onTransitionDidEnd(_this2.props.data) || Promise.resolve();
	                    }
	                    if (prevChild && prevChild.onTransitionLeaveDidEnd) {
	                        return prevChild.onTransitionLeaveDidEnd(_this2.props.data) || Promise.resolve();
	                    }
	                    return Promise.resolve();
	                };
	
	                Promise.resolve().then(willStart).then(start).then(didStart).then(waitForTransition).then(willEnd).then(end).then(didEnd).then(function () {
	                    _this2.props.loadedCallback && _this2.props.loadedCallback();
	                    transiteDone();
	                })['catch'](transiteFailed);
	            });
	        });
	    };
	
	    RouterTransition.prototype.render = function render() {
	        return _react2['default'].createElement(
	            'div',
	            _extends({}, this.props, { className: _classnames2['default']('ph-transition-wrapper', this.props.className) }),
	            _react2['default'].Children.map(this.state.child1, function (element) {
	                return _react2['default'].cloneElement(element, { ref: 'child1' });
	            }),
	            _react2['default'].Children.map(this.state.child2, function (element) {
	                return _react2['default'].cloneElement(element, { ref: 'child2' });
	            })
	        );
	    };
	
	    return RouterTransition;
	})(_react2['default'].Component);
	
	exports['default'] = RouterTransition;
	module.exports = exports['default'];

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = process.env.PROMISE_QUEUE_COVERAGE ?
	    __webpack_require__(58) :
	    __webpack_require__(59);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },

/***/ 58:
/***/ function(module, exports) {



/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, Promise */
	(function (root, factory) {
	    'use strict';
	    if (typeof module === 'object' && module.exports && "function" === 'function') {
	        // CommonJS
	        module.exports = factory();
	    } else if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals
	        root.Queue = factory();
	    }
	})
	(this, function () {
	    'use strict';
	
	    /**
	     * @return {Object}
	     */
	    var LocalPromise = typeof Promise !== 'undefined' ? Promise : function () {
	        return {
	            then: function () {
	                throw new Error('Queue.configure() before use Queue');
	            }
	        };
	    };
	
	    var noop = function () {};
	
	    /**
	     * @param {*} value
	     * @returns {LocalPromise}
	     */
	    var resolveWith = function (value) {
	        if (value && typeof value.then === 'function') {
	            return value;
	        }
	
	        return new LocalPromise(function (resolve) {
	            resolve(value);
	        });
	    };
	
	    /**
	     * It limits concurrently executed promises
	     *
	     * @param {Number} [maxPendingPromises=Infinity] max number of concurrently executed promises
	     * @param {Number} [maxQueuedPromises=Infinity]  max number of queued promises
	     * @constructor
	     *
	     * @example
	     *
	     * var queue = new Queue(1);
	     *
	     * queue.add(function () {
	     *     // resolve of this promise will resume next request
	     *     return downloadTarballFromGithub(url, file);
	     * })
	     * .then(function (file) {
	     *     doStuffWith(file);
	     * });
	     *
	     * queue.add(function () {
	     *     return downloadTarballFromGithub(url, file);
	     * })
	     * // This request will be paused
	     * .then(function (file) {
	     *     doStuffWith(file);
	     * });
	     */
	    function Queue(maxPendingPromises, maxQueuedPromises) {
	        this.pendingPromises = 0;
	        this.maxPendingPromises = typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity;
	        this.maxQueuedPromises = typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity;
	        this.queue = [];
	    }
	
	    /**
	     * Defines promise promiseFactory
	     * @param {Function} GlobalPromise
	     */
	    Queue.configure = function (GlobalPromise) {
	        LocalPromise = GlobalPromise;
	    };
	
	    /**
	     * @param {Function} promiseGenerator
	     * @return {LocalPromise}
	     */
	    Queue.prototype.add = function (promiseGenerator) {
	        var self = this;
	        return new LocalPromise(function (resolve, reject, notify) {
	            // Do not queue to much promises
	            if (self.queue.length >= self.maxQueuedPromises) {
	                reject(new Error('Queue limit reached'));
	                return;
	            }
	
	            // Add to queue
	            self.queue.push({
	                promiseGenerator: promiseGenerator,
	                resolve: resolve,
	                reject: reject,
	                notify: notify || noop
	            });
	
	            self._dequeue();
	        });
	    };
	
	    /**
	     * Number of simultaneously running promises (which are resolving)
	     *
	     * @return {number}
	     */
	    Queue.prototype.getPendingLength = function () {
	        return this.pendingPromises;
	    };
	
	    /**
	     * Number of queued promises (which are waiting)
	     *
	     * @return {number}
	     */
	    Queue.prototype.getQueueLength = function () {
	        return this.queue.length;
	    };
	
	    /**
	     * @returns {boolean} true if first item removed from queue
	     * @private
	     */
	    Queue.prototype._dequeue = function () {
	        var self = this;
	        if (this.pendingPromises >= this.maxPendingPromises) {
	            return false;
	        }
	
	        // Remove from queue
	        var item = this.queue.shift();
	        if (!item) {
	            return false;
	        }
	
	        try {
	            this.pendingPromises++;
	
	            resolveWith(item.promiseGenerator())
	            // Forward all stuff
	                .then(function (value) {
	                    // It is not pending now
	                    self.pendingPromises--;
	                    // It should pass values
	                    item.resolve(value);
	                    self._dequeue();
	                }, function (err) {
	                    // It is not pending now
	                    self.pendingPromises--;
	                    // It should not mask errors
	                    item.reject(err);
	                    self._dequeue();
	                }, function (message) {
	                    // It should pass notifications
	                    item.notify(message);
	                });
	        } catch (err) {
	            self.pendingPromises--;
	            item.reject(err);
	            self._dequeue();
	
	        }
	
	        return true;
	    };
	
	    return Queue;
	});


/***/ }

/******/ })
});
;