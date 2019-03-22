module.exports =
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _fsExtra = __webpack_require__(2);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _log = __webpack_require__(3);

	var _log2 = _interopRequireDefault(_log);

	var _morgan = __webpack_require__(4);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_LOG_NAME = 'static-server.txt';

	var StaticServerLauncher = function () {
	  function StaticServerLauncher() {
	    _classCallCheck(this, StaticServerLauncher);
	  }

	  _createClass(StaticServerLauncher, [{
	    key: 'onPrepare',
	    value: function onPrepare(_ref) {
	      var _this = this;

	      var folders = _ref.staticServerFolders,
	          _ref$staticServerLog = _ref.staticServerLog,
	          logging = _ref$staticServerLog === undefined ? false : _ref$staticServerLog,
	          _ref$staticServerPort = _ref.staticServerPort,
	          port = _ref$staticServerPort === undefined ? 4567 : _ref$staticServerPort,
	          _ref$staticServerMidd = _ref.staticServerMiddleware,
	          middleware = _ref$staticServerMidd === undefined ? [] : _ref$staticServerMidd;

	      if (!folders) {
	        return Promise.resolve();
	      }

	      this.server = (0, _express2.default)();
	      this.folders = folders;
	      this.port = port;

	      if (logging) {
	        var stream = void 0;
	        if (typeof logging === 'string') {
	          var file = _path2.default.join(logging, DEFAULT_LOG_NAME);
	          _fsExtra2.default.createFileSync(file);
	          stream = _fsExtra2.default.createWriteStream(file);
	        }
	        this.log = new _log2.default('debug', stream);
	        this.server.use((0, _morgan2.default)('tiny', { stream: stream }));
	      } else {
	        this.log = new _log2.default('emergency');
	      }

	      (Array.isArray(folders) ? folders : [folders]).forEach(function (folder) {
	        _this.log.debug('Mounting folder `%s` at `%s`', _path2.default.resolve(folder.path), folder.mount);
	        _this.server.use(folder.mount, _express2.default.static(folder.path));
	      });

	      middleware.forEach(function (ware) {
	        _this.server.use(ware.mount, ware.middleware);
	      });

	      return new Promise(function (resolve, reject) {
	        _this.server.listen(_this.port, function (err) {
	          if (err) {
	            reject(err);
	          }

	          _this.log.info('Static server running at http://localhost:' + port);
	          resolve();
	        });
	      });
	    }
	  }]);

	  return StaticServerLauncher;
	}();

	exports.default = StaticServerLauncher;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("fs-extra");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("log");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ })
/******/ ]);