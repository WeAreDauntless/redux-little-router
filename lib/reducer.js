'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./action-types');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.type === _actionTypes.LOCATION_CHANGED) {
    // No-op the initial route action
    if (state && state.pathname === action.payload.pathname && state.search === action.payload.search) {
      return state;
    }

    // Extract the previous state, but dump the
    // previous state's previous state so that the
    // state tree doesn't keep growing indefinitely
    if (state) {
      // eslint-disable-next-line no-unused-vars
      var previous = state.previous,
          oldState = _objectWithoutProperties(state, ['previous']);

      return _extends({}, action.payload, {
        previous: oldState
      });
    }
  }
  return state;
};