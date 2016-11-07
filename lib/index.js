'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMatcher = exports.locationDidChange = exports.createStoreWithRouter = exports.routerReducer = exports.GO_BACK = exports.GO_FORWARD = exports.GO = exports.REPLACE = exports.PUSH = exports.LOCATION_CHANGED = exports.RelativeFragment = exports.AbsoluteFragment = exports.Fragment = exports.PersistentQueryLink = exports.Link = exports.RouterProvider = exports.provideRouter = exports.initializeCurrentLocation = exports.routerMiddleware = exports.routerForHashHistory = exports.routerForHapi = exports.routerForExpress = exports.routerForBrowser = undefined;

var _browserRouter = require('./browser-router');

var _browserRouter2 = _interopRequireDefault(_browserRouter);

var _expressRouter = require('./express-router');

var _expressRouter2 = _interopRequireDefault(_expressRouter);

var _hapiRouter = require('./hapi-router');

var _hapiRouter2 = _interopRequireDefault(_hapiRouter);

var _hashHistoryRouter = require('./hash-history-router');

var _hashHistoryRouter2 = _interopRequireDefault(_hashHistoryRouter);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _actionCreators = require('./action-creators');

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

var _link = require('./link');

var _fragment = require('./fragment');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _createMatcher = require('./create-matcher');

var _createMatcher2 = _interopRequireDefault(_createMatcher);

var _actionTypes = require('./action-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _fragment.AbsoluteFragment;
exports.routerForBrowser = _browserRouter2.default;
exports.routerForExpress = _expressRouter2.default;
exports.routerForHapi = _hapiRouter2.default;
exports.routerForHashHistory = _hashHistoryRouter2.default;
exports.routerMiddleware = _middleware2.default;
exports.initializeCurrentLocation = _actionCreators.initializeCurrentLocation;
exports.provideRouter = _provider2.default;
exports.RouterProvider = _provider.RouterProvider;
exports.Link = _link.Link;
exports.PersistentQueryLink = _link.PersistentQueryLink;
exports.Fragment = Fragment;
exports.AbsoluteFragment = _fragment.AbsoluteFragment;
exports.RelativeFragment = _fragment.RelativeFragment;
exports.LOCATION_CHANGED = _actionTypes.LOCATION_CHANGED;
exports.PUSH = _actionTypes.PUSH;
exports.REPLACE = _actionTypes.REPLACE;
exports.GO = _actionTypes.GO;
exports.GO_FORWARD = _actionTypes.GO_FORWARD;
exports.GO_BACK = _actionTypes.GO_BACK;
exports.routerReducer = _reducer2.default;
exports.createStoreWithRouter = _storeEnhancer2.default;
exports.locationDidChange = _actionCreators.locationDidChange;
exports.createMatcher = _createMatcher2.default;