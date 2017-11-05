/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = html;
exports.createStore = createStore;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function html(_ref) {
    var _ref2 = _toArray(_ref),
        first = _ref2[0],
        strings = _ref2.slice(1);

    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(function (acc, cur) {
        return acc.concat(cur, strings.shift());
    }, [first])

    // Filter out interpolations which are null or undefined.  null is
    // loosely-equal only to undefined and itself.
    .filter(function (value) {
        return value != null;
    }).join("");
}

function createStore(reducer) {
    var state = reducer();
    var roots = new Map();
    var prevs = new Map();

    function render() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = roots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref3 = _step.value;

                var _ref4 = _slicedToArray(_ref3, 2);

                var root = _ref4[0];
                var component = _ref4[1];

                var output = component();

                // Poor man's Virtual DOM implementation :)  Compare the new output
                // with the last output for this root.  Don't trust the current
                // value of root.innerHTML as it may have been changed by other
                // scripts or extensions.
                if (output !== prevs.get(root)) {
                    prevs.set(root, output);
                    root.innerHTML = output;

                    // Dispatch an event on the root to give developers a chance to
                    // do some housekeeping after the whole DOM is replaced under
                    // the root. You can re-focus elements in the listener to this
                    // event. See example03.
                    var event = new CustomEvent("render", { detail: state });
                    root.dispatchEvent(event);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    return {
        attach: function attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect: function connect(component) {
            // Return a decorated component function.
            return function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return component.apply(undefined, [state].concat(args));
            };
        },
        dispatch: function dispatch(action) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            state = reducer(state, action, args);
            render();
        }
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = exports.attach = undefined;

var _index = __webpack_require__(0);

var _logger = __webpack_require__(8);

var _logger2 = _interopRequireDefault(_logger);

var _reducer = __webpack_require__(9);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import innerself
var _createStore = (0, _index.createStore)((0, _logger2.default)(_reducer2.default)),
    attach = _createStore.attach,
    connect = _createStore.connect,
    dispatch = _createStore.dispatch; // import innerself/logger


window.dispatch = dispatch;

exports.attach = attach;
exports.connect = connect;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['\n\t\t<', ' ', ' ', '>\n\t\t\t', '\n\t\t\t<div class="container">\n\t\t\t\t', '\n\t\t\t</div>\n\t\t\t', '\n\t\t</', '>\n\t'], ['\n\t\t<', ' ', ' ', '>\n\t\t\t', '\n\t\t\t<div class="container">\n\t\t\t\t', '\n\t\t\t</div>\n\t\t\t', '\n\t\t</', '>\n\t']);

exports.default = Jumbo;

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import innerself

function Jumbo() {
	var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var className = props.className,
	    id = props.id,
	    content = props.content,
	    tagName = props.tagName;


	var split = (typeof content === 'undefined' ? 'undefined' : _typeof(content)) === "object"; // assume 'left' and 'right' if object

	// setup default values to prevent errors on dynamic content
	split && (content = Object.assign({
		before: '',
		left: '', right: '',
		after: ''
	}, content));

	tagName = typeof tagName === "string" ? tagName : 'section';

	return (0, _index2.default)(_templateObject, tagName, id ? 'id="' + id + '"' : '', className ? 'class="' + className + '"' : '', split ? content.before : '', split ? '<div class="left">' + content.left + '</div><div class="right">' + content.right + '</div>' : '<div>' + content + '</div>', split ? content.after : '', tagName);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<a ', '\n\t\t\t', '\n\t\t\tclass="button', '">', '</a>'], ['\n\t\t<a ', '\n\t\t\t', '\n\t\t\tclass="button', '">', '</a>']);

exports.default = LinkButton;

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import innerself

function LinkButton() {
	var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	props = Object.assign({
		href: '',
		className: '',
		id: '',
		content: ''
	}, props);

	return (0, _index2.default)(_templateObject, props.id ? 'id="' + props.id + '"' : '', props.href ? 'href="' + props.href + '"' : '', props.className ? ' ' + props.className : '', props.content);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<div class="jumbo', '">\n\t\t\t<h2>', '</h2>\n\t\t</div>\n\t'], ['\n\t\t<div class="jumbo', '">\n\t\t\t<h2>', '</h2>\n\t\t</div>\n\t']);

exports.default = Jumbo;

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _animationControl = __webpack_require__(13);

var _animationControl2 = _interopRequireDefault(_animationControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // import innerself

function Jumbo(content) {
	var transparentControl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	return (0, _index2.default)(_templateObject, transparentControl ? ' transparent-bar' : '', content);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Footer;

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _section = __webpack_require__(2);

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer() {
	return (0, _section2.default)({ tagName: 'footer', content: '\n\t\t<span>Created by <a href="https://twitter.com/stas">Sta\u015B Ma\u0142olepszy</a></span><span>Site designed by <a href="https://github.com/GoldenRust">GoldenRust</a>, and built by <a href="https://twitter.com/flynnbuckingham">Flynn Buckingham</a></span>\n\t' });
} // import innerself

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bokeh = __webpack_require__(7);

var _store = __webpack_require__(1);

var _router = __webpack_require__(11);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bulbs = 10,
    hueShift = 180;

window._bgCanvas = {
	back: new _bokeh.canvasBokeh(document.getElementById('bokeh-back'), { bulbs: bulbs * 2, blur: 20, hueShift: hueShift, drawBeforeStart: true }),
	front: new _bokeh.canvasBokeh(document.getElementById('bokeh-front'), { bulbs: bulbs, blur: 4, transparent: true, hueShift: hueShift, drawBeforeStart: true })
};

(0, _store.attach)(_router2.default, document.getElementById('viewbox'));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HSL = function HSL() {
	var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};
var HSLA = function HSLA() {
	var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
	return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
};
var SVG_BLUR = function SVG_BLUR(px) {
	return 'blur(' + px + 'px)';
};

var FULL_CIRCLE = Math.PI * 2;
var INIT_BULB_COUNT = 12; // number of bulbs generated
var MAX_RESOLUTION_SIZE = 256;
var MIN_RESOLUTION_SIZE = 64;
var BASE_SPEED = 0.003;
var BASE_MOTION_PERCENTAGE = 0.3; // 20%

var Random = Math.random;
var Round = Math.round;
var Round2 = function Round2(v) {
	var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	return Number(parseFloat(v).toFixed(p));
};

// the constructor for each bulb inside the bokeh

function Bulb() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var size = Round(Math.max(MAX_RESOLUTION_SIZE * Random(), MIN_RESOLUTION_SIZE));
	var top = Round2(Random());
	var left = Round2(Random());
	var phaseX = 0;
	var phaseY = 0;
	var speedX = Round2(BASE_SPEED * Random(), 4);
	var speedY = Round2(BASE_SPEED * Random(), 4);
	var areaX = Round2(BASE_MOTION_PERCENTAGE * Random());
	var areaY = Round2(BASE_MOTION_PERCENTAGE * Random());

	var BGColor = typeof options.bg === "string" ? options.bg : null;

	var canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;

	var cacheCtx = canvas.getContext('2d');

	cacheCtx.beginPath();
	BGColor && (cacheCtx.fillStyle = BGColor);

	cacheCtx.arc(size / 2, size / 2, size / 2, 0, FULL_CIRCLE);

	// ctx.arc(
	// 	this.left * canvasWidth + Math.sin(this.phaseY += this.speedY) * (this.areaX * canvasWidth),
	// 	this.top * canvasHeight + Math.sin(this.phaseX += this.speedX) * (this.areaY * canvasHeight),
	// 	Math.floor(this.scale * canvasHeight / 3),
	// 0, FULL_CIRCLE);

	cacheCtx.fill();
	cacheCtx.closePath();

	return {
		action: function action(ctx, canvasWidth, canvasHeight, scalar) {
			return ctx.drawImage(canvas, left * canvasWidth + Math.sin(phaseY += speedX) * (areaX * canvasWidth), top * canvasHeight + Math.sin(phaseX += speedY) * (areaY * canvasHeight), size + scalar, size + scalar);
		}
	};
}

var supportsFilter = exports.supportsFilter = function supportsFilter() {
	return typeof document.createElement('div').style.filter !== "undefined";
};

var canvasBokeh = exports.canvasBokeh = function () {
	function canvasBokeh(container, style) {
		_classCallCheck(this, canvasBokeh);

		if (!(container instanceof HTMLElement) || !supportsFilter()) {
			// not supported
			return null;
		}

		style = (typeof style === 'undefined' ? 'undefined' : _typeof(style)) === "object" ? style : {};
		style.bulbs = typeof style.bulbs === "number" ? style.bulbs : INIT_BULB_COUNT;
		style.hue = typeof style.hue === "number" ? style.hue : 250;
		style.blur = typeof style.blur === "number" ? style.blur : 12;
		style.saturation = typeof style.saturation === "number" ? style.saturation : 20;
		style.bgLightness = typeof style.bgLightness === "number" ? style.bgLightness : 20;
		style.bulbLightness = typeof style.bulbLightness === "number" ? style.bulbLightness : 50;
		style.bulbOpacity = typeof style.bulbOpacity === "number" ? style.bulbOpacity : .3;
		style.hueShift = typeof style.hueShift === "number" ? style.hueShift : 0;
		style.upscale = typeof style.upscale === "number" ? style.upscale : null;
		style.transparent = typeof style.transparent === "boolean" ? style.transparent : false;
		style.drawBeforeStart = typeof style.drawBeforeStart === "boolean" ? style.drawBeforeStart : false;

		this.canvasWidth = typeof style.canvasWidth === "number" ? style.canvasWidth : null;
		this.canvasHeight = typeof style.canvasHeight === "number" ? style.canvasHeight : null;

		// setup canvas and container
		this.canvas = document.createElement('canvas');
		this.canvas.style.filter = SVG_BLUR(style.blur);
		this.canvas.style.width = '100%';
		this.canvas.style.height = '100%';

		// remove bg from container
		container.style.backgroundColor = style.transparent ? 'transparent' : HSL(style.hue, style.saturation, style.bgLightness);

		container.style.overflow = 'hidden';
		container.style.backgroundImage = 'none';

		// setup bulbs
		this.bulbs = [];
		this.bulbFill = HSLA(style.hue, style.saturation, style.bulbLightness, style.bulbOpacity);

		// add bulbs
		var i = style.bulbs;

		while (i--) {
			this.bulbs.push(new Bulb({
				bg: style.hueShift ? HSLA(style.hue + style.hueShift * Math.random() * (Math.random() > 0.5 ? 1 : -1), style.saturation, style.bulbLightness, style.bulbOpacity) : this.bulbFill
			}));
		}

		this.oddFrame = false;

		// setup resize event throttler
		this.updateSize = false;
		this.playing = false; // wait for start()

		container.appendChild(this.canvas);
		this.resizeToParent(style.drawBeforeStart); // force resize (and draw keyframe)

		if (!this.canvasWidth || !this.canvasHeight) this._bindSize();
	}

	_createClass(canvasBokeh, [{
		key: 'resizeToParent',
		value: function resizeToParent() {
			var forceFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var canvas = this.canvas,
			    canvasWidth = this.canvasWidth,
			    canvasHeight = this.canvasHeight,
			    container = canvas.parentNode;


			canvas.width = canvasWidth || container.clientWidth;
			canvas.height = canvasHeight || container.clientHeight;

			this.updateSize = false;

			forceFrame && (this.keyframe() || this.keyframe()); // force two renders
		}
	}, {
		key: 'keyframe',
		value: function keyframe() {
			var canvas = this.canvas,
			    bulbs = this.bulbs,
			    bulbFill = this.bulbFill,
			    playing = this.playing,
			    keyframe = this.keyframe,
			    oddFrame = this.oddFrame;


			if (oddFrame) {
				this.updateSize && this.resizeToParent();

				var _i = bulbs.length,
				    canvasWidth = canvas.width,
				    canvasHeight = canvas.height,
				    scalar = canvasHeight / 10,
				    ctx = canvas.getContext('2d');

				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				ctx.imageSmoothingEnabled = false;

				// draw each bulb
				while (_i--) {
					bulbs[_i].action(ctx, canvasWidth, canvasHeight, scalar);
				}
			}

			this.oddFrame = !oddFrame;

			playing && window.requestAnimationFrame(keyframe.bind(this));
		}
	}, {
		key: '_bindSize',
		value: function _bindSize() {
			var self = this;
			window.addEventListener('resize', function () {
				return self.playing ? self.updateSize = true : self.resizeToParent(true);
			});
		}
	}, {
		key: 'start',
		value: function start() {
			// start animation
			this.playing = true;
			window.requestAnimationFrame(this.keyframe.bind(this));
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.playing = false;
		}
	}]);

	return canvasBokeh;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = logger;
function logger(reducer) {
    return function (prev_state, action, args) {
        console.group(action);
        console.log("Previous State", prev_state);
        console.log("Action Arguments", args);
        var next_state = reducer(prev_state, action, args);
        console.log("Next State", next_state);
        console.groupEnd();
        return next_state;
    };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = reducer;

var _projects = __webpack_require__(10);

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// data type constructors

var init = {
   route: '', // the default route
   bgAnimation: localStorage ? localStorage.getItem('bgAnimation') == "true" : false || false,
   projects: _projects2.default
};

console.log('hey!');

// init canvas (seems to not render if not done before hand)

function reducer() {
   var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
   var action = arguments[1];
   var args = arguments[2];

   switch (action) {
      case 'SET_ROUTE':
         {
            var _args = _slicedToArray(args, 1),
                route = _args[0];

            return Object.assign({}, state, { route: route });
         }
      case 'TOGGLE_ANIMATION':
         {
            localStorage ? localStorage.setItem('bgAnimation', !state.bgAnimation) : console.log('no storage detected');
            return Object.assign({}, state, { bgAnimation: !state.bgAnimation });
         }
      default:
         return state;
   }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var project = function project(title, desc, authors, repo, demo, buttonClass, customSource) {
	return { title: title, desc: desc, authors: authors, repo: repo, demo: demo, buttonClass: buttonClass, customSource: customSource };
};
var author = function author(name, link) {
	return { name: name, link: link };
};

// storage for common authors
var $ = {
	Stas: author('Staś Małolepszy', 'https://github.com/stasm')
};

exports.default = [project('Innerself Hacker News Clone', 'A Hacker News single page app with innerself as the only dependency. Also serves as an example of a TypeScript innerself app.', [author('Ben Southgate', 'https://github.com/bsouthga')], 'https://github.com/bsouthga/innerself-hn', 'https://innerself-hn.com/', 'hollow'), project('Reach/Steal Draft Tracker', 'A fantasy football draft tracker that tests the rendering performance with 300+ table rows backed by an expressjs server.', [author('Brian Ruddy', 'https://github.com/bcruddy')], 'https://github.com/bcruddy/reach-steal', 'https://reach-steal.herokuapp.com/'), project('A moment lost in time', 'A first-person exploration puzzle game.', [author('Michał Budzyński', 'https://github.com/michalbe'), $.Stas], 'https://github.com/piesku/moment-lost', 'http://js13kgames.com/entries/a-moment-lost-in-time'), project('TodoMVC', 'A TodoMVC app based on innerself.', [author('Cweili', 'https://github.com/Cweili')], 'https://codepen.io/Cweili/pen/ZXOeQa', '', '', 'CodePen'), project('Example01', 'A simple ToDo app built with innerself', [$.Stas], 'https://github.com/stasm/innerself/tree/master/example01', 'https://stasm.github.io/innerself/example01/'), project('Example02', 'A simple example that shows state management with coloured boxes', [author('Flynn Buckingham', 'https://github.com/flynnham')], 'https://github.com/stasm/innerself/tree/master/example02', 'https://stasm.github.io/innerself/example02/'), project('Example03', 'An illustration of the limitations of innerself when dealing with text inputs and how to work around them.', [$.Stas], 'https://github.com/stasm/innerself/tree/master/example03', 'https://stasm.github.io/innerself/example03/')];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      ', '\n   '], ['\n      ', '\n   ']);

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(1);

var _front = __webpack_require__(12);

var _front2 = _interopRequireDefault(_front);

var _examples = __webpack_require__(14);

var _examples2 = _interopRequireDefault(_examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // import innerself

var routes = {
   '': _front2.default,
   'home': _front2.default,
   'examples': _examples2.default

   // a simple url router will render the matching route into the viewbox
};var renderRoute = function renderRoute(route) {
   return typeof routes[route] === "function" ? routes[route]() : '';
};

// routes to the page by extracting the hash value of the url
var routeFromUrlHash = function routeFromUrlHash() {
   var hash = window.location.hash.split('#')[1];
   return routes.hasOwnProperty(hash) ? dispatch('SET_ROUTE', hash) : // route
   console.warn('cannot route to un-registered route', hash); // do nothing but complain
};

function RouterComponent(state) {
   var route = state.route;

   return (0, _index2.default)(_templateObject, renderRoute(route));
}

// re-route when a hash change is detected
window.addEventListener('hashchange', function () {
   return routeFromUrlHash();
});

// route to page based on current hash
routeFromUrlHash(window.location.href);

exports.default = (0, _store.connect)(RouterComponent);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _jumbo = __webpack_require__(4);

var _jumbo2 = _interopRequireDefault(_jumbo);

var _section = __webpack_require__(2);

var _section2 = _interopRequireDefault(_section);

var _button = __webpack_require__(3);

var _button2 = _interopRequireDefault(_button);

var _footer = __webpack_require__(5);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import innerself

var example1 = '\nimport html from "innerself";\nimport ActiveTask from "./ActiveTask";\nexport default function ActiveList(tasks) {\n  return html`\n    &lt;h2>My Active Tasks&lt;h2>\n    &lt;ul>\n      &#36;{tasks.map(ActiveTask)}\n    &lt;ul>`;\n}';

var example2 = '\nconst { attach, connect, dispatch } = createStore(reducer);\nwindow.dispatch = dispatch;\nexport { attach, connect };\n';

exports.default = function () {
	return [(0, _jumbo2.default)('A view management system'), (0, _section2.default)({ id: 'introduction', className: 'bright', content: {
			before: '<div class="intro-middle"></div>',
			left: '<h2>InnerHTML is fast.</h2>\n\t\t<p>innerHTML is fast. It\'s not fast enough if you\'re a Fortune 500 company or even if your app has more than just a handful of views. But it might be just fast enough for you if you care about code size.</p>\n\t\t' + (0, _button2.default)({ className: 'half', content: 'View Showcase', href: '#examples' }) + '<br>\n\t\t' + (0, _button2.default)({ className: 'half', content: 'Star on GitHub', href: 'https://github.com/stasm/innerself' }) + '\n\t\t',
			right: '<h2>inspired by React and Redux.</h2>\n\t\t<ul>\n\t\t\t<li>composable components</li>\n\t\t\t<li>a single store</li>\n\t\t\t<li>a dispatch function</li>\n\t\t\t<li>reducers</li>\n\t\t\t<li>and even an optional logging middleware for debugging!</li>\n\t\t</ul>\n\t\t<p>It does all of this by serializing your component tree to a string and assigning it to innerHTML of a root element. It even imitates Virtual DOM diffing by comparing last known output of components with the new one :)\n\t\tI know this sounds like I\'m crazy but it actually works quite nice for small and simple UIs.</p>'
		} }), (0, _section2.default)({ className: 'dark narrow', content: '<h2>Background</h2>\n\t\t<p>I wrote innerself because I needed to make sense of the UI for a game I wrote for the js13kGames jam. The whole game had to fit into 13KB. I needed something extremely small which would not make me lose sanity. innerself clocks in at under 50 lines of code. That\'s around 600 bytes minified, ~350 gzipped.</p>\n\t\t'
	}), (0, _section2.default)({ className: 'white', content: {
			left: '<h2>Basic Usage</h2>\n\t\t<p>innerself expects you to build a serialized version of your DOM which will then be assigned to innerHTML of a root element. The html helper allows you to easily interpolate Arrays.</p>\n\t\t',
			right: '<pre>' + example1 + '</pre>'
		} }), (0, _section2.default)({ className: 'white', content: {
			left: '\n\t\t<p>The state of your app lives in a store, which you create by passing the reducer function to createStore:</p>\n\t\t',
			right: '<pre>' + example2 + '</pre>'
		} }), (0, _section2.default)({ className: 'white centered', content: (0, _button2.default)({ className: 'single', content: 'Read full documentation', href: "https://github.com/stasm/innerself" })
	}), (0, _section2.default)({ className: 'bright narrow two-col', content: '\n\t\t<h2>How It Works</h2>\n      <div class="two-col">\n   \t\t<p>The update cycle starts with the dispatch function which passes the action to the reducer and updates the state.</p>\n   \t\t<p>When the state changes, the store compares the entire string output of top-level components (the ones attached to a root element in the DOM) with the output they produced last. This means that most of the time, even a slightest change in output will re-render the entire root.</p>\n   \t\t<p>It\'s possible to dispatch actions which change the state and don\'t trigger re-renders. For instance in example01 the text input dispatches CHANGE_INPUT actions on keyup events. The current value of the input is then saved in the store. Crucially, this value is not used by the TaskInput component to populate the input element. The whole thing relies on the fact that the native HTML input element stores its own state when the user is typing into it.</p>\n   \t\t<p>This limitation was fine for my use-case but it\'s worth pointing out that it badly hurts accessibility. Any change to the state which causes a re-render will make the currently focused element lose focus.</p>\n   \t\t<p>React is of course much smarter: the Virtual DOM is a lightweight representation of the render tree and updates to components produce an actual diff. React maps the items in the Virtual DOM to the elements in the real DOM and is able to only update what has really changed, regardless of its position in the tree.</p>\n   \t\t<p>Here\'s an interesting piece of trivia that I learned about while working on this project. React only re-renders components when their local state changes, as signaled by this.setState(). The fact that it also looks like components re-render when their props change derives from that as well. Something needs to pass those props in, after all, and this something is the parent component which first needs to decide to re-render itself.</p>\n   \t\t<p>When you think about how you can connect components with react-redux to avoid passing state to them from parents it becomes clear why behind the scenes it calls this.setState(dummyState) (which is an empty object) to trigger a re-render of the connected component :) It does this only when the sub-state as described by the selector (mapStateToProps) changes, which is easy to compute (and fast) if the reducers use immutability right. In the best case scenario it only needs to compare the identity of the sub-state to know that it\'s changed.</p>\n      </div>\n\t'
	}), (0, _footer2.default)()].join('');
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<div class="animation-control ', '">\n\t\t\t<span onClick="dispatch(\'TOGGLE_ANIMATION\')">', ' background animation</span>\n\t\t</div>\n\t'], ['\n\t\t<div class="animation-control ', '">\n\t\t\t<span onClick="dispatch(\'TOGGLE_ANIMATION\')">', ' background animation</span>\n\t\t</div>\n\t']);

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // import innerself


function AnimationControl(_ref) {
	var bgAnimation = _ref.bgAnimation;

	var bgCanvas = window._bgCanvas;

	console.log('bgCanvas', bgCanvas);

	if (bgCanvas) {
		var method = bgAnimation ? 'start' : 'pause';
		bgCanvas.back[method]();
		bgCanvas.front[method]();
	}

	return (0, _index2.default)(_templateObject, bgAnimation ? 'playing' : 'paused', bgAnimation ? 'disable' : 'enable');
}

exports.default = (0, _store.connect)(AnimationControl);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(1);

var _jumbo = __webpack_require__(4);

var _jumbo2 = _interopRequireDefault(_jumbo);

var _section = __webpack_require__(2);

var _section2 = _interopRequireDefault(_section);

var _button = __webpack_require__(3);

var _button2 = _interopRequireDefault(_button);

var _project = __webpack_require__(15);

var _project2 = _interopRequireDefault(_project);

var _footer = __webpack_require__(5);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import innerself
function ExamplesPage(_ref) {
	var projects = _ref.projects;

	return [(0, _jumbo2.default)('Examples', true), (0, _section2.default)({ id: 'featured-project', className: 'dark shallow', content: (0, _project2.default)(projects[0]) }), (0, _section2.default)({ id: 'projects', className: 'white',
		content: projects.slice(1).map(function (item) {
			return (0, _project2.default)(item);
		}).join('') }), (0, _footer2.default)()].join('');
}

exports.default = (0, _store.connect)(ExamplesPage);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<article ', ' class="project">\n\t\t\t<h3>', '</h3>\n\t\t\t<p class="authors">', '</p>\n\t\t\t<p>', '</p>\n\t\t\t<div>\n\t\t\t\t', '\n\t\t\t\t', '\n\t\t\t</div>\n\t\t</article>\n\t'], ['\n\t\t<article ', ' class="project">\n\t\t\t<h3>', '</h3>\n\t\t\t<p class="authors">', '</p>\n\t\t\t<p>', '</p>\n\t\t\t<div>\n\t\t\t\t', '\n\t\t\t\t', '\n\t\t\t</div>\n\t\t</article>\n\t']);

exports.default = Project;

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _button = __webpack_require__(3);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // import innerself

function Project() {
	var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	props = Object.assign({
		title: '',
		desc: '',
		repo: '',
		demo: '',
		id: '',
		authors: [],
		buttonClass: '',
		customSource: ''
	}, props);

	return (0, _index2.default)(_templateObject, props.id ? 'id="' + props.id + '"' : '', props.title, props.authors.map(function (author) {
		return '<a href="' + author.link + '">' + author.name + '</a>';
	}), props.desc, props.demo ? (0, _button2.default)({ className: props.buttonClass, href: props.demo, content: 'Live Example' }) : '', (0, _button2.default)({ className: props.buttonClass, href: props.repo, content: props.customSource ? props.customSource : 'GitHub' }));
}

/***/ })
/******/ ]);