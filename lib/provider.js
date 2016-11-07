'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterProviderImpl = function (_Component) {
  _inherits(RouterProviderImpl, _Component);

  function RouterProviderImpl(props) {
    _classCallCheck(this, RouterProviderImpl);

    var _this = _possibleConstructorReturn(this, (RouterProviderImpl.__proto__ || Object.getPrototypeOf(RouterProviderImpl)).call(this, props));

    _this.router = {
      store: props.store
    };
    return _this;
  }

  _createClass(RouterProviderImpl, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        router: this.router
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.router.store;

      var routerState = store.getState().router;

      // Ensure that the router props from connect()
      // actually get to the child component(s)
      return (0, _react.cloneElement)(this.props.children, {
        router: _extends({}, routerState, {

          // This is a hack to allow routes to define
          // unserializable things like components
          result: store.routes[routerState.route]
        })
      });
    }
  }]);

  return RouterProviderImpl;
}(_react.Component);

RouterProviderImpl.childContextTypes = {
  router: _react.PropTypes.object
};

var RouterProvider = exports.RouterProvider = (0, _reactRedux.connect)(function (state) {
  return {
    router: state.router
  };
})(RouterProviderImpl);

exports.default = function (_ref) {
  var store = _ref.store;
  return function (ComposedComponent) {
    return function (props) {
      return _react2.default.createElement(
        RouterProvider,
        { store: store },
        _react2.default.createElement(ComposedComponent, props)
      );
    };
  };
};