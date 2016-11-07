'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _useBasename = require('history/lib/useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next: unstubbable! */
var realLocation = function realLocation() {
  return window.location;
};

exports.default = function (_ref) {
  var routes = _ref.routes,
      basename = _ref.basename,
      _ref$getLocation = _ref.getLocation,
      getLocation = _ref$getLocation === undefined ? realLocation : _ref$getLocation,
      _ref$passRouterStateT = _ref.passRouterStateToReducer,
      passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  var history = (0, _useBasename2.default)((0, _useQueries2.default)(_createBrowserHistory2.default))({
    basename: basename
  });

  var _getLocation = getLocation(),
      pathname = _getLocation.pathname,
      search = _getLocation.search;

  var location = history.createLocation({ pathname: pathname, search: search });

  return {
    routerEnhancer: (0, _storeEnhancer2.default)({
      routes: routes,
      history: history,
      location: location,
      passRouterStateToReducer: passRouterStateToReducer
    }),
    routerMiddleware: (0, _middleware2.default)({ history: history })
  };
};