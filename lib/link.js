'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentQueryLink = exports.Link = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionTypes = require('./action-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LEFT_MOUSE_BUTTON = 0;

var normalizeHref = function normalizeHref(_ref) {
  var basename = _ref.basename,
      pathname = _ref.pathname,
      search = _ref.search;
  return '' + (basename || '') + pathname + (search || '');
};

var normalizeLocation = function normalizeLocation(href) {
  if (typeof href === 'string') {
    var pathnameAndQuery = href.split('?');
    var pathname = pathnameAndQuery[0]; // eslint-disable-line no-magic-numbers
    var query = pathnameAndQuery[1]; // eslint-disable-line no-magic-numbers
    return query ? { pathname: pathname, search: '?' + query } : { pathname: pathname };
  }
  return href;
};

var resolveQueryForLocation = function resolveQueryForLocation(_ref2) {
  var linkLocation = _ref2.linkLocation,
      persistQuery = _ref2.persistQuery,
      currentLocation = _ref2.currentLocation;

  var currentQuery = currentLocation && currentLocation.query;

  // Only use the query from state if it exists
  // and the href doesn't provide its own query
  if (persistQuery && currentQuery && !linkLocation.search && !linkLocation.query) {
    return {
      pathname: linkLocation.pathname,
      query: currentQuery
    };
  }

  return linkLocation;
};

var isNotLeftClick = function isNotLeftClick(e) {
  return e.button && e.button !== LEFT_MOUSE_BUTTON;
};
var hasModifier = function hasModifier(e) {
  return Boolean(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey);
};

var handleClick = function handleClick(_ref3) {
  var e = _ref3.e,
      target = _ref3.target,
      location = _ref3.location,
      replaceState = _ref3.replaceState,
      router = _ref3.router,
      onClick = _ref3.onClick;

  if (onClick) {
    onClick(e);
  }

  if (hasModifier(e) || isNotLeftClick(e)) {
    return;
  }

  if (e.defaultPrevented) {
    return;
  }

  // If target prop is set (e.g. to "_blank"), let browser handle link.
  if (target) {
    return;
  }

  e.preventDefault();

  if (router) {
    router.store.dispatch({
      type: replaceState ? _actionTypes.REPLACE : _actionTypes.PUSH,
      payload: location
    });
  }
};

var Link = function Link(props, context) {
  var children = props.children,
      href = props.href,
      onClick = props.onClick,
      persistQuery = props.persistQuery,
      replaceState = props.replaceState,
      target = props.target,
      rest = _objectWithoutProperties(props, ['children', 'href', 'onClick', 'persistQuery', 'replaceState', 'target']);

  var router = context.router;


  var locationDescriptor = resolveQueryForLocation({
    linkLocation: normalizeLocation(href),
    currentLocation: router.store.getState().router,
    persistQuery: persistQuery
  });

  var location = router.store.history.createLocation(locationDescriptor);

  return _react2.default.createElement(
    'a',
    _extends({
      href: normalizeHref(location),
      onClick: function (_onClick) {
        function onClick(_x) {
          return _onClick.apply(this, arguments);
        }

        onClick.toString = function () {
          return _onClick.toString();
        };

        return onClick;
      }(function (e) {
        return handleClick({
          e: e,
          location: location,
          onClick: onClick,
          replaceState: replaceState,
          router: router,
          target: target
        });
      })
    }, rest),
    children
  );
};

Link.contextTypes = {
  router: _react.PropTypes.object
};

var PersistentQueryLink = function (_Component) {
  _inherits(PersistentQueryLink, _Component);

  function PersistentQueryLink() {
    _classCallCheck(this, PersistentQueryLink);

    return _possibleConstructorReturn(this, (PersistentQueryLink.__proto__ || Object.getPrototypeOf(PersistentQueryLink)).apply(this, arguments));
  }

  _createClass(PersistentQueryLink, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['children']);

      return _react2.default.createElement(
        Link,
        _extends({}, rest, { persistQuery: true }),
        children
      );
    }
  }]);

  return PersistentQueryLink;
}(_react.Component);

PersistentQueryLink.propTypes = {
  children: _react.PropTypes.node
};

PersistentQueryLink.contextTypes = {
  router: _react.PropTypes.object
};

exports.Link = Link;
exports.PersistentQueryLink = PersistentQueryLink;