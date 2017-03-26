'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _promiseQueue = require('promise-queue');

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