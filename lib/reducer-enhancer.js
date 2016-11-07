'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (passRouterStateToReducer) {
  return function (vanillaReducer) {
    return function (state, action) {
      // Here, we use destructuring in place of `_.omit`
      // to remove the `router` key from the vanilla state.
      // We remove this key because passing state to
      // `combineReducers` with keys it doesn't recognize
      // triggers a warning. Worse, `combineReducers` ignores
      // the extraneous key, and therefore stops router state
      // from propagating to the final reduced state.
      //
      // eslint-disable-next-line no-unused-vars
      var router = state.router,
          vanillaState = _objectWithoutProperties(state, ['router']);

      var routerState = (0, _reducer2.default)(state && state.router, action);

      // If we're passing the router state to the vanilla reducer,
      // we don't need any special support for redux-loop
      if (passRouterStateToReducer) {
        var stateWithRouter = _extends({}, vanillaState, {
          router: routerState
        });
        return vanillaReducer(stateWithRouter, action);
      }

      var newState = vanillaReducer(vanillaState, action);

      // Support redux-loop
      if (Array.isArray(newState)) {
        var nextState = newState[0];
        var nextEffects = newState[1];
        return [_extends({}, nextState, {
          router: routerState
        }), nextEffects];
      }

      return _extends({}, newState, {
        router: routerState
      });
    };
  };
};