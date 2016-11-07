'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var visitChildren = function visitChildren(children, visit) {
  if (_react.Children.count(children) > 1) {
    _react.Children.forEach(children, function (grandchildren) {
      return visitChildren(grandchildren, visit);
    });
    return;
  }

  if (!children || !children.props) {
    return;
  }

  visit(children);

  _react.Children.forEach(children.props.children, function (grandchildren) {
    return visitChildren(grandchildren, visit);
  });
};

exports.default = visitChildren;