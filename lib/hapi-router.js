'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var routes = _ref.routes,
      request = _ref.request,
      _ref$passRouterStateT = _ref.passRouterStateToReducer,
      passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  var history = (0, _useQueries2.default)(_createMemoryHistory2.default)();

  var location = history.createLocation({
    pathname: request.path,
    query: request.query
  });

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