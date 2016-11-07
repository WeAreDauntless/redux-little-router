'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createMatcher = require('./create-matcher');

var _createMatcher2 = _interopRequireDefault(_createMatcher);

var _reducerEnhancer = require('./reducer-enhancer');

var _reducerEnhancer2 = _interopRequireDefault(_reducerEnhancer);

var _actionCreators = require('./action-creators');

var _matchCache = require('./match-cache');

var _matchCache2 = _interopRequireDefault(_matchCache);

var _validateRoutes = require('./util/validate-routes');

var _validateRoutes2 = _interopRequireDefault(_validateRoutes);

var _flattenRoutes = require('./util/flatten-routes');

var _flattenRoutes2 = _interopRequireDefault(_flattenRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var nestedRoutes = _ref.routes,
      history = _ref.history,
      location = _ref.location,
      _ref$createMatcher = _ref.createMatcher,
      createMatcher = _ref$createMatcher === undefined ? _createMatcher2.default : _ref$createMatcher,
      _ref$passRouterStateT = _ref.passRouterStateToReducer,
      passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  (0, _validateRoutes2.default)(nestedRoutes);
  var routes = (0, _flattenRoutes2.default)(nestedRoutes);

  return function (createStore) {
    return function (reducer, initialState, enhancer) {
      var enhancedReducer = (0, _reducerEnhancer2.default)(passRouterStateToReducer)(reducer);

      var matchRoute = createMatcher(routes);
      var matchWildcardRoute = createMatcher(routes, true);

      var initialStateWithRouter = _extends({}, initialState, {
        router: _extends({}, location, matchRoute(location.pathname))
      });

      var store = createStore(enhancedReducer, initialStateWithRouter, enhancer);

      history.listen(function (newLocation) {
        /* istanbul ignore else */
        if (newLocation) {
          _matchCache2.default.clear();
          store.dispatch((0, _actionCreators.locationDidChange)({
            location: newLocation, matchRoute: matchRoute
          }));
        }
      });

      return _extends({}, store, {

        // We attach routes here to allow <RouterProvider>
        // to access unserializable properties of route results.
        routes: routes,

        history: history,
        matchRoute: matchRoute,
        matchWildcardRoute: matchWildcardRoute
      });
    };
  };
};