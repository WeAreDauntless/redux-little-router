'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require('./action-types');

exports.default = function (_ref) {
  var history = _ref.history;
  return function () {
    return function (next) {
      return function (action) {
        switch (action.type) {
          case _actionTypes.PUSH:
            history.push(action.payload);
            // No return, no next() here
            // We stop all history events from progressing further through the dispatch chain...
            break;
          case _actionTypes.REPLACE:
            history.replace(action.payload);
            break;
          case _actionTypes.GO:
            history.go(action.payload);
            break;
          case _actionTypes.GO_BACK:
            history.goBack();
            break;
          case _actionTypes.GO_FORWARD:
            history.goForward();
            break;
          default:
            // ...but we want to leave all events we don't care about undisturbed
            return next(action);
        }
      };
    };
  };
}; /* eslint-disable consistent-return */