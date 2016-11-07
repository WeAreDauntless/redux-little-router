'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var find = function find(list, predicate) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (predicate(item)) {
      return item;
    }
  }
  return null;
};


var wildcardMatcher = function wildcardMatcher(routeList) {
  return function (incomingUrl) {
    var routeToMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    // Discard query strings
    var pathname = incomingUrl.split('?')[0];

    var storedRoute = find(routeList, function (route) {
      return route.route === routeToMatch;
    });

    if (!storedRoute) {
      return null;
    }

    var match = storedRoute.pattern.match(pathname);

    if (match) {
      return {
        route: storedRoute.route,
        params: match,
        result: storedRoute.result
      };
    }

    return null;
  };
};

var eagerMatcher = function eagerMatcher(routeList) {
  return function (incomingUrl) {
    // Discard query strings
    var pathname = incomingUrl.split('?')[0];

    // Find the route that matches the URL
    for (var i = 0; i < routeList.length; i++) {
      var storedRoute = routeList[i];
      var match = storedRoute.pattern.match(pathname);

      if (match) {
        // Return the matched params and user-defined result object
        return {
          route: storedRoute.route,
          params: match,
          result: storedRoute.result
        };
      }
    }

    return null;
  };
};

exports.default = function (routes) {
  var wildcard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var routeList = Object.keys(routes).sort().reverse().map(function (route) {
    return {
      route: route,
      pattern: new _urlPattern2.default(
      // Prepend with wildcards if requested
      '' + route + (wildcard && '*' || '')),
      result: routes[route]
    };
  });

  return wildcard ? wildcardMatcher(routeList) : eagerMatcher(routeList);
};