'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var core = require('@f-ui/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DashboardContext = /*#__PURE__*/React__default["default"].createContext({
  data: []
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@import url('http://fonts.cdnfonts.com/css/roboto');\n\n.Charts-module_wrapper__x0iBy {\n    background: var(--fabric-background-primary);\n    border: var(--fabric-border-primary) 1px solid;\n    border-radius: 5px;\n    padding: 4px;\n    width: 100%;\n    height: 500px;\n    overflow: hidden;\n\n    display: flex;\n    flex-direction: column;\n    /*align-items: flex-start;*/\n}\n\n.Charts-module_title__27KHx {\n\n    font-size: 1.1rem;\n    color: var(--fabric-color-primary);\n    text-align: left;\n    font-weight: 600;\n    margin: unset;\n    padding: 0;\n    height: fit-content;\n    width: 100%;\n    margin-bottom: 1rem;\n}\n\n.Charts-module_page__1R-iK {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-flow: row wrap;\n    gap: 4px;\n    max-height: 100%;\n    overflow-y: auto;\n}\n\n.Charts-module_pageWrapper__1sPuu {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n\n    max-height: 100%;\n    gap: 4px;\n}\n\n.Charts-module_selectorsWrapper__1gEl0 {\n    display: flex;\n    gap: 8px;\n}\n\n\n\n.Charts-module_datasets__1iEyh {\n/*background: red;*/\n    display: flex;\n    gap: 16px;\n    align-items: center;\n\n    justify-content: flex-start;\n}\n.Charts-module_datasetLabel__Db6Fy{\n    font-weight:  normal;\n    font-size: .75rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 100%;\n    color: var(--fabric-color-tertiary);\n}\n.Charts-module_datasetWrapper__2kRX0{\n    height: fit-content;\n    padding: 4px !important;\n\n    display: flex;\n    align-items: center;\n    gap: 4px;\n\n\n}\n\n.Charts-module_datasetIndicator__3bt9R{\n    border-radius: 3px;\n    height: .4rem;\n    min-width: 30px;\n    width: 10%;\n}\n\n.Charts-module_canvasMountingPoint__2aeK_{\n    position: relative;\n    height: 100%;\n    width: 100%;\n}";
var styles = {"wrapper":"Charts-module_wrapper__x0iBy","title":"Charts-module_title__27KHx","page":"Charts-module_page__1R-iK","pageWrapper":"Charts-module_pageWrapper__1sPuu","selectorsWrapper":"Charts-module_selectorsWrapper__1gEl0","datasets":"Charts-module_datasets__1iEyh","datasetLabel":"Charts-module_datasetLabel__Db6Fy","datasetWrapper":"Charts-module_datasetWrapper__2kRX0","datasetIndicator":"Charts-module_datasetIndicator__3bt9R","canvasMountingPoint":"Charts-module_canvasMountingPoint__2aeK_"};
styleInject(css_248z);

function onHover(_ref) {
  var variant = _ref.variant,
      event = _ref.event,
      points = _ref.points,
      ctx = _ref.ctx,
      drawChart = _ref.drawChart;
  var drawn = undefined;
  points.forEach(function (p, i) {
    if (event.x >= p.x && event.x <= p.x + Math.abs(p.width) && event.y >= p.y && event.y <= p.y + Math.abs(p.height)) {
      var placement = {
        align: variant === 'vertical' ? 'start' : 'middle',
        justify: variant === 'vertical' ? 'middle' : 'end',
        variant: 'rect'
      };
      drawn = true;
      ctx.tooltip(p, 'rgba(0,0,0,.75)', event, placement, function () {
        ctx.clearAll();
        drawChart(p, true);
      });
    } else if (drawn === undefined) drawn = false;
  });

  if (drawn === false) {
    ctx.clearAll();
    drawChart(undefined, true);
  }
}
onHover.propTypes = {};

function drawGrid(_ref) {
  var layer = _ref.layer,
      strokeStyle = _ref.strokeStyle,
      iterations = _ref.iterations,
      labelPadding = _ref.labelPadding,
      data = _ref.data,
      axisKey = _ref.axisKey,
      color = _ref.color,
      width = _ref.width,
      offset = _ref.offset,
      variant = _ref.variant,
      height = _ref.height;
  layer.strokeStyle = strokeStyle;
  layer.beginPath();
  layer.moveTo(labelPadding * 1.35, 0);
  layer.lineTo(labelPadding * 1.35, layer.canvas.height - labelPadding);
  layer.stroke();
  data.forEach(function (d, index) {
    var x, y;

    switch (variant) {
      case 'vertical':
        {
          layer.beginPath();
          x = index * (width + offset) + labelPadding * 1.35 + (offset / 2 + width / 2);
          layer.fillStyle = color;
          layer.fillText(d[axisKey], x - d[axisKey].length * 7 / 2, layer.canvas.height - 16);
          layer.closePath();
          break;
        }

      case 'horizontal':
        {
          layer.beginPath();
          y = (index + 1) * (height + offset) - offset / 2;
          layer.fillStyle = color;
          layer.fillText(d[axisKey], 0, y - height / 2);
          layer.closePath();
          break;
        }

      case 'line':
        {
          layer.beginPath();
          x = index * ((layer.canvas.width - labelPadding * 1.75 - 4) / (data.length - 1)) + labelPadding * 1.35;

          if (index > 0) {
            layer.moveTo(x, 0);
            layer.lineTo(x, layer.canvas.height - labelPadding);
            layer.stroke();
          }

          layer.fillStyle = color;
          layer.fillText(d[axisKey], x - d[axisKey].length * 8 / 2, layer.canvas.height - 16);
          layer.closePath();
          break;
        }
    }
  });
  iterations.forEach(function (i, index) {
    switch (variant) {
      case 'horizontal':
        {
          var x = index * ((layer.canvas.width - labelPadding * 1.75) / (iterations.length - 1)) + labelPadding * 1.35;
          var value = iterations[iterations.length - (index + 1)];
          layer.beginPath();
          layer.moveTo(x, 0);
          layer.lineTo(x, layer.canvas.height - labelPadding);
          layer.stroke();
          layer.fillStyle = color;
          layer.fillText(value, x - value.toString().length * 4, layer.canvas.height - 12);
          layer.closePath();
          break;
        }

      default:
        {
          layer.beginPath();
          var y = index * ((layer.canvas.height - labelPadding * 1.35) / (iterations.length - 1)) + labelPadding * .35;
          layer.moveTo(labelPadding, y);
          layer.lineTo(layer.canvas.width, y);
          layer.stroke();
          layer.fillStyle = color;
          layer.fillText(i, 0, y + 4);
          layer.closePath();
          break;
        }
    }
  });
}

function useHover(context, points, onHover) {
  var deps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var handleMouseMove = function handleMouseMove(event) {
    if (points.length > 0) {
      var _context$canvas;

      var bBox = (_context$canvas = context.canvas) === null || _context$canvas === void 0 ? void 0 : _context$canvas.getBoundingClientRect();
      onHover({
        x: event.clientX - bBox.left,
        y: event.clientY - bBox.top,
        width: bBox.width,
        height: bBox.height
      });
    }
  };

  var handleMouseOut = function handleMouseOut() {
    context.clearAll();
  };

  React.useEffect(function () {
    context === null || context === void 0 ? void 0 : context.canvas.parentNode.addEventListener('mousemove', handleMouseMove);
    context === null || context === void 0 ? void 0 : context.canvas.parentNode.addEventListener('mouseout', handleMouseOut);
    return function () {
      context === null || context === void 0 ? void 0 : context.canvas.parentNode.removeEventListener('mousemove', handleMouseMove);
      context === null || context === void 0 ? void 0 : context.canvas.parentNode.removeEventListener('mouseout', handleMouseOut);
    };
  }, [].concat(_toConsumableArray(deps), [context, points]));
}

function useLineChart(_ref) {
  var iterations = _ref.iterations,
      biggest = _ref.biggest,
      points = _ref.points,
      setPoints = _ref.setPoints,
      getLayer = _ref.getLayer,
      data = _ref.data,
      axis = _ref.axis,
      values = _ref.values,
      width = _ref.width,
      height = _ref.height,
      labelSpacing = _ref.labelSpacing;

  var _useMemo = React.useMemo(function () {
    return {
      layerZero: getLayer(0),
      layerOne: getLayer(1),
      layerTwo: getLayer(2)
    };
  }, [width, height]),
      layerZero = _useMemo.layerZero,
      layerOne = _useMemo.layerOne,
      layerTwo = _useMemo.layerTwo;

  var xBefore, yBefore;
  var visibleValues = React.useMemo(function () {
    return values.filter(function (v) {
      return !v.hidden;
    });
  }, [values]);

  var drawLine = function drawLine(_ref2) {
    var point = _ref2.point,
        dataIndex = _ref2.dataIndex,
        valueIndex = _ref2.valueIndex,
        onHover = _ref2.onHover,
        valueKey = _ref2.valueKey,
        valueColor = _ref2.valueColor,
        valueLabel = _ref2.valueLabel,
        _ref2$newPoints = _ref2.newPoints,
        newPoints = _ref2$newPoints === void 0 ? [] : _ref2$newPoints;
    var pVariation = point[valueKey] * 100 / biggest;
    var height = pVariation * (layerOne.canvas.height - labelSpacing * 1.35) / 100;
    var x = dataIndex * (layerOne.canvas.width - labelSpacing * 1.75 - 4) / (data.length - 1) + labelSpacing * 1.35,
        y = layerOne.canvas.height - labelSpacing - height;
    newPoints.push({
      x: x - 10,
      y: y - 10,
      axis: point[axis.field],
      value: point[valueKey],
      axisLabel: axis.label,
      valueLabel: valueLabel,
      color: valueColor,
      width: 20,
      height: 20,
      valueIndex: valueIndex,
      dataIndex: dataIndex
    });
    layerOne.strokeStyle = valueColor;
    layerOne.fillStyle = valueColor;
    layerOne.beginPath();
    layerOne.arc(x, y, onHover ? 8 : 4, 0, 2 * Math.PI);
    layerOne.fill();
    layerOne.stroke();

    if (dataIndex > 0) {
      layerOne.setLineDash([3, 3]);
      layerOne.beginPath();
      layerOne.moveTo(xBefore, yBefore);
      layerOne.lineTo(x, y);
      layerOne.stroke();
      layerOne.setLineDash([]);
    }

    xBefore = x;
    yBefore = y;
  };

  var drawChart = function drawChart(onHover, isMouseEvent) {
    layerOne.clearAll();
    var newPoints = [];
    visibleValues.map(function (valueObj, vi) {
      data.forEach(function (point, index) {
        drawLine({
          point: point,
          dataIndex: index,
          valueIndex: vi,
          onHover: onHover && onHover.valueIndex === vi && onHover.dataIndex === index,
          valueKey: valueObj.field,
          valueColor: valueObj.hexColor,
          valueLabel: valueObj.label,
          newPoints: newPoints
        });
      });
    });
    if (points.length === 0 && newPoints.length > 0) setPoints(newPoints);
  };

  useHover(layerTwo, points, function (event) {
    onHover({
      variant: 'line',
      ctx: layerTwo,
      event: event,
      points: points,
      drawChart: drawChart
    });
  });
  React.useEffect(function () {
    if (layerZero) {
      layerZero.clearAll();
      layerZero.defaultFont();
      drawGrid({
        layer: layerZero,
        strokeStyle: layerOne.getThemes().fabric_border_secondary,
        variant: 'line',
        iterations: iterations,
        labelPadding: labelSpacing,
        data: data,
        color: layerOne.getThemes().fabric_color_quaternary,
        axisKey: axis.field,
        width: (layerZero.canvas.width - labelSpacing * 1.35) / data.length,
        offset: 0
      });
    }
  }, [layerZero, data, width, height, values]);
  React.useEffect(function () {
    if (layerOne) {
      layerOne.defaultFont();
      drawChart();
    }
  }, [data, layerOne, width, height, points]);
}

function useAsyncMemo(callback) {
  var dependencyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  React.useEffect(function () {
    setState(callback);
  }, dependencyArray);
  return state;
}

function hexToRgba(hex, newOpacity) {
  var c;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');

    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }

    c = '0x' + c.join('');
    return "rgba(".concat([c >> 16 & 255, c >> 8 & 255, c & 255].join(','), ",").concat(newOpacity, ")");
  } else return hex;
}

function ease(currentProgress, start, distance, steps, power) {
  currentProgress /= steps / 2;

  if (currentProgress < 1) {
    return distance / 2 * Math.pow(currentProgress, power) + start;
  }

  currentProgress -= 2;
  return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;
}

var Row = /*#__PURE__*/function () {
  function Row(x, y, width, height, color, dataIndex, valueIndex, direction, ctx) {
    _classCallCheck(this, Row);

    _defineProperty(this, "endedHover", true);

    _defineProperty(this, "animationID", null);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.index = dataIndex + valueIndex;
    this.dataIndex = dataIndex;
    this.valueIndex = valueIndex;
    this.ctx = ctx;
    this.initialWidth = direction === 'width' ? 0 : width;
    this.initialHeight = direction === 'height' ? 0 : height;
  }

  _createClass(Row, [{
    key: "_paint",
    value: function _paint(currentY, currentHeight, currentWidth, color) {
      this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
      this.ctx.fillStyle = color;
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = this.color;
      this.ctx.fillRect(this.x, currentY, currentWidth, currentHeight); // this.strokeRect(x, currentY, currentWidth, currentHeight)

      this.ctx.stroke();
    }
  }, {
    key: "hover",
    value: function hover() {
      this.endedHover = false;

      this._paint(this.y, this.height, this.width, this.color);
    }
  }, {
    key: "draw",
    value: function draw(ts) {
      var _this = this;

      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      var timestamp = ts;
      var start,
          previousTimeStamp,
          targetTimestamp = timestamp + this.index * 50;
      var currentWidth = timestamp > 0 ? this.initialWidth : this.width,
          currentHeight = timestamp > 0 ? this.initialHeight : this.height,
          currentY = this.height - currentHeight + this.y;

      var draw = function draw(elapsed) {
        _this._paint(currentY, currentHeight, currentWidth, hexToRgba(_this.color, .75));

        currentWidth = _this.initialWidth === _this.width || elapsed === 0 ? _this.width : ease(elapsed, 0, _this.width, targetTimestamp, 5);
        currentHeight = _this.initialHeight === _this.height ? _this.height : ease(elapsed, 0, _this.height, targetTimestamp, 5);
        currentY = _this.height - currentHeight + _this.y;
      };

      var step = function step(t) {
        if (start === undefined) start = t;
        var elapsed = t - start;
        if (previousTimeStamp !== t) draw(elapsed);

        if (targetTimestamp > elapsed) {
          previousTimeStamp = t;
          requestAnimationFrame(step);
        } else {
          draw(elapsed);
          _this.animated = true;
        }
      };

      if (timestamp > 0) requestAnimationFrame(step);else draw(targetTimestamp);
    }
  }]);

  return Row;
}();

var Bar = /*#__PURE__*/function () {
  function Bar(direction, width, height, x, y, index, values, data, ctx, biggest, offset, onRowCreation) {
    var _this = this;

    _classCallCheck(this, Bar);

    _defineProperty(this, "bars", []);

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.dataIndex = index;
    values.forEach(function (valueObj, vi) {
      var barH, barW, x, y;
      var pVariation = data[valueObj.field] * 100 / biggest;

      if (direction === 'width') {
        x = _this.x * 1.35;
        barW = pVariation * (ctx.canvas.width - _this.x * 1.75) / 100;
        barH = height / values.length;
        y = index * (height + offset) + vi * (barH + 1);
      } else {
        barW = width / values.length;
        x = index * (width + offset) + _this.y * 1.35 + vi * (barW + 1) + offset / (values.length + 1);
        barH = pVariation * (ctx.canvas.height - _this.y * 1.35) / 100;
        y = ctx.canvas.height - barH - _this.y;
      }

      var n = new Row(x, y, barW, barH, valueObj.hexColor, index, vi, direction, ctx);

      _this.bars.push(n);

      onRowCreation(n);
    });
  }

  _createClass(Bar, [{
    key: "handleHover",
    value: function handleHover(valueIndex) {
      this.bars.forEach(function (s) {
        if (!s.endedHover && s.valueIndex !== valueIndex) s.draw(0);else if (s.valueIndex === valueIndex) s.hover();
      });
    }
  }, {
    key: "handleHoverExit",
    value: function handleHoverExit() {
      this.bars.forEach(function (s) {
        if (!s.endedHover) s.draw(0);
      });
    }
  }, {
    key: "cancelAnimations",
    value: function cancelAnimations() {
      this.bars.forEach(function (s) {
        if (s.animationID) cancelAnimationFrame(s.animationID);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      console.log(this.width);
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      this.bars.forEach(function (b) {
        b.draw(500);
      });
    }
  }]);

  return Bar;
}();

function useBarChart(_ref) {
  var iterations = _ref.iterations,
      biggest = _ref.biggest,
      values = _ref.values,
      points = _ref.points,
      setPoints = _ref.setPoints,
      getLayer = _ref.getLayer,
      data = _ref.data,
      axis = _ref.axis,
      labelSpacing = _ref.labelSpacing,
      width = _ref.width,
      height = _ref.height,
      variant = _ref.variant;

  var _useMemo = React.useMemo(function () {
    return {
      layerZero: getLayer(0),
      layerOne: getLayer(1),
      layerTwo: getLayer(2)
    };
  }, [width, height]),
      layerZero = _useMemo.layerZero,
      layerOne = _useMemo.layerOne,
      layerTwo = _useMemo.layerTwo;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      elements = _useState2[0],
      setElements = _useState2[1];

  useHover(layerTwo, points, function (event) {
    onHover({
      labelSpacing: labelSpacing,
      ctx: layerTwo,
      event: event,
      points: points,
      drawChart: drawChart,
      variant: variant.replace('-bar', '')
    });
  });
  var visibleValues = React.useMemo(function () {
    return values.filter(function (b) {
      return !b.hidden;
    });
  }, [values]);
  var dimensions = useAsyncMemo(function () {
    if (layerOne) {
      var length = data.length;
      var verticalOffset = layerOne.canvas.height * 2 / Math.pow(length, 2);
      var bHeight = (layerOne.canvas.height - labelSpacing) / length - verticalOffset;
      var horizontalOffset = layerOne.canvas.width * 2 / Math.pow(length, 2);
      var bWidth = (layerOne.canvas.width - labelSpacing * 1.35) / length - horizontalOffset;
      return {
        offset: variant.includes('horizontal') ? verticalOffset : horizontalOffset,
        barHeight: bHeight,
        barWidth: bWidth
      };
    } else return undefined;
  }, [height, labelSpacing, layerOne, width]);
  React.useEffect(function () {
    if (layerZero && dimensions) {
      layerZero.defaultFont();
      layerZero.clearAll();
      drawGrid({
        strokeStyle: layerOne.getThemes().fabric_border_secondary,
        variant: variant.replace('-bar', ''),
        iterations: iterations,
        labelPadding: labelSpacing,
        data: data,
        element: layerOne.canvas,
        color: layerOne.getThemes().fabric_color_quaternary,
        axisKey: axis.field,
        width: variant.includes('horizontal') ? width : dimensions.barWidth,
        offset: dimensions.offset,
        height: variant.includes('horizontal') ? dimensions.barHeight : height,
        layer: layerZero,
        valuesLength: visibleValues.length
      });
    }
  }, [width, height, layerZero, dimensions, values]);

  var drawChart = function drawChart() {
    var onHover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var isMouseEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!isMouseEvent) {
      layerOne.clearAll();
      var newPoints = [],
          newInstances = [];
      elements.forEach(function (bar) {
        bar.cancelAnimations();
      });
      data.forEach(function (point, index) {
        var y = index * (height + dimensions.offset);
        var bar = new Bar(variant.includes('horizontal') ? 'width' : 'height', variant.includes('horizontal') ? width : dimensions.barWidth, variant.includes('horizontal') ? dimensions.barHeight : height, variant.includes('horizontal') ? labelSpacing : undefined, variant.includes('horizontal') ? y : labelSpacing, index, visibleValues, point, layerOne, biggest, dimensions.offset, function (row) {
          newPoints.push({
            x: row.x,
            y: row.y,
            axis: point[axis.field],
            axisLabel: axis.label,
            value: point[visibleValues[row.valueIndex].field],
            valueLabel: visibleValues[row.valueIndex].label,
            height: row.height,
            width: row.width,
            color: visibleValues[row.valueIndex].hexColor,
            valueIndex: row.valueIndex,
            dataIndex: row.dataIndex
          });
        });
        newInstances.push(bar);
        bar.draw();
      });
      if (points.length === 0) setPoints(newPoints);
      if (elements.length === 0) setElements(newInstances);
    } else {
      elements.forEach(function (bar) {
        if (onHover && bar.dataIndex === onHover.dataIndex) bar.handleHover(onHover.valueIndex);else bar.handleHoverExit();
      });
    }
  };

  React.useEffect(function () {
    if (layerOne && dimensions !== undefined) {
      layerOne.defaultFont();
      drawChart();
    }
  }, [data, layerOne, width, height, dimensions, elements]);
  React.useEffect(function () {
    setElements([]);
  }, [values]);
}
useBarChart.propTypes = {
  data: PropTypes__default["default"].arrayOf(PropTypes__default["default"].object),
  variant: PropTypes__default["default"].string,
  axis: PropTypes__default["default"].object,
  value: PropTypes__default["default"].object,
  styles: PropTypes__default["default"].object
};

function getAngle(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return Math.atan2(y, x);
}

function onHoverPieSlice(_ref) {
  var event = _ref.event,
      points = _ref.points,
      ctx = _ref.ctx,
      placement = _ref.placement;
      _ref.variant;
      _ref.ratioRadius;
      var drawChart = _ref.drawChart;
  var drawn = undefined;
  var calculatedEvent = Math.pow(event.x - placement.cx, 2) + Math.pow(event.y - placement.cy, 2);
  points.forEach(function (p, i) {
    var isInsideSlice = calculatedEvent < Math.pow(p.radius, 2) && calculatedEvent > Math.pow(p.toRemoveRadius, 2);

    if (isInsideSlice) {
      drawn = true;
      var pointAngle = getAngle({
        x: event.x - placement.cx,
        y: event.y - placement.cy
      });
      if (pointAngle < 0) pointAngle += 6.28319;

      if (pointAngle >= p.startAngle && pointAngle <= p.endAngle) {
        var _placement = {
          align: 'middle',
          justify: 'end'
        }; // if (i === ctx.lastOnHover)

        ctx.tooltip(_objectSpread2(_objectSpread2({}, p), {}, {
          width: 0,
          height: 0,
          x: p.tooltipX,
          y: p.tooltipY
        }), 'rgba(0,0,0,.75)', event, _placement, function () {
          ctx.clearAll();
          drawChart(p);
        }); // else
        //     ctx.opacityTransition(
        //         false,
        //         '#000',
        //         300,
        //         (color) => {
        //             ctx.tooltip(
        //                 {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
        //                 color,
        //                 event,
        //                 placement,
        //                 () => drawChart(i)
        //             )
        //         }, .75)

        CanvasRenderingContext2D.prototype.lastOnHover = i;
      }
    } else if (drawn === undefined) drawn = false;
  });

  if (drawn === false) {
    CanvasRenderingContext2D.prototype.lastOnHover = undefined;
    ctx.clearAll();
    drawChart();
  }
}

function randomColor() {
  var n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

var Slice = /*#__PURE__*/function () {
  function Slice(radius, index, color, startAngle, endAngle, cx, cy, ctx, data) {
    _classCallCheck(this, Slice);

    _defineProperty(this, "animated", false);

    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.cx = cx;
    this.cy = cy;
    this.data = data;
    this.ctx = ctx;
    this.index = index;
    this.color = color;
    this.strokeStyle = ctx.getThemes().fabric_background_primary;
  }

  _createClass(Slice, [{
    key: "hover",
    value: function hover() {
      this.endedHover = false;

      this._paint(this.color, this.radius, this.ctx.getThemes().fabric_border_secondary);
    }
  }, {
    key: "_paint",
    value: function _paint(color, radius) {
      var strokeStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.strokeStyle;
      this.ctx.clearArc(this.cx, this.cy, this.radius * 1.01, this.startAngle, this.endAngle);
      this.ctx.fillStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.beginPath();
      this.ctx.moveTo(this.cx, this.cy);
      this.ctx.arc(this.cx, this.cy, radius, this.startAngle, this.endAngle, false);
      this.ctx.lineTo(this.cx, this.cy);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.endedHover = true;
      this.animated = true;
      var targetTimestamp = 0,
          currentRadius = 0;

      var d = function d(elapsed) {
        _this._paint(hexToRgba(_this.color, 0.75), currentRadius);

        currentRadius = ease(elapsed, 0, _this.radius, targetTimestamp, 5);
      };

      {
        currentRadius = this.radius;
        d(-1);
      }
    }
  }]);

  return Slice;
}();

var Circle = /*#__PURE__*/function () {
  function Circle(onSliceCreation, radius, toRemoveRadius, valueIndex, valueObj, totals, data, cx, cy, ctx) {
    var _this = this;

    _classCallCheck(this, Circle);

    _defineProperty(this, "slices", []);

    _defineProperty(this, "linkedTo", []);

    this.radius = radius;
    this.toRemoveRadius = toRemoveRadius;
    this.valueIndex = valueIndex;
    this.ctx = ctx;
    this.cx = cx;
    this.cy = cy;
    var startAngle = 0;
    data.forEach(function (point, index) {
      var endAngle = point.data[valueObj.field] / totals[valueIndex] * (Math.PI * 2) + startAngle;
      var n = new Slice(radius, index, point.color, startAngle, endAngle, cx, cy, ctx, point.data);

      _this.slices.push(n);

      onSliceCreation(n);
      startAngle = endAngle;
    });
  }

  _createClass(Circle, [{
    key: "handleSliceHover",
    value: function handleSliceHover(index) {
      this.slices.forEach(function (s, i) {
        if (!s.endedHover && index !== i) s.init(0);else if (index === i) s.hover();
      });
      this.linkedTo.forEach(function (link) {
        link.draw(true);
      });
    }
  }, {
    key: "handleHoverExit",
    value: function handleHoverExit() {
      this.slices.forEach(function (s) {
        if (!s.endedHover) s.init(0);
      });
      this.linkedTo.forEach(function (link) {
        link.draw(true);
      });
    }
  }, {
    key: "draw",
    value: function draw(isHoverEvent) {
      // if(isHoverEvent)
      this.slices.forEach(function (s) {
        return s.init(isHoverEvent ? 0 : 500);
      });
      if (this.valueIndex === 1) console.log('IM HERE');
      this.ctx.clearArc(this.cx, this.cy, this.toRemoveRadius, 0, Math.PI * 2);
      this.linkedTo.forEach(function (link) {
        link.draw(isHoverEvent);
      });
    }
  }]);

  return Circle;
}();

function useCircleChart(_ref) {
  var donutRatio = _ref.donutRatio,
      variant = _ref.variant,
      totals = _ref.totals,
      points = _ref.points,
      setPoints = _ref.setPoints,
      getLayer = _ref.getLayer,
      data = _ref.data,
      axis = _ref.axis,
      values = _ref.values,
      width = _ref.width,
      height = _ref.height;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      elements = _useState2[0],
      setElements = _useState2[1];

  var visibleValues = React.useMemo(function () {
    return values.filter(function (b) {
      return !b.hidden;
    });
  }, [values]);

  var _useMemo = React.useMemo(function () {
    return {
      layerOne: getLayer(0),
      layerTwo: getLayer(2)
    };
  }, [width, height]),
      layerOne = _useMemo.layerOne,
      layerTwo = _useMemo.layerTwo;

  var ratio = React.useMemo(function () {
    return donutRatio ? donutRatio : .7;
  }, [donutRatio]);
  useHover(layerTwo, points, function (event) {
    onHoverPieSlice({
      ctx: layerTwo,
      event: event,
      points: points,
      drawChart: function drawChart(i) {
        return _drawChart(i, true);
      },
      placement: placement,
      variant: variant,
      ratioRadius: variant === 'donut' ? placement.radius * ratio / visibleValues.length : placement.radius
    });
  }, [elements]);
  var placement = useAsyncMemo(function () {
    if (width !== undefined && height !== undefined) {
      var cx = layerOne.canvas.width / 2;
      var cy = layerOne.canvas.height / 2;
      var radius = (cx > cy ? cy : cx) - 14;
      return {
        cx: cx,
        cy: cy,
        radius: radius
      };
    } else return undefined;
  }, [width, height]);
  var coloredData = React.useMemo(function () {
    return data.map(function (d) {
      return {
        data: d,
        color: randomColor()
      };
    });
  }, [data]);

  var _drawChart = function _drawChart() {
    var onHover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var isMouseEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var iteration = placement.radius / visibleValues.length;
    var newPoints = [],
        newInstances = [],
        currentRadius = placement.radius;

    if (!isMouseEvent) {
      layerOne.clearAll();
      visibleValues.forEach(function (valueObj, vi) {
        var circle = new Circle(function (slice) {
          var r = currentRadius / 2;
          var tooltipX = Math.cos((slice.startAngle + slice.endAngle) / 2) * r * 1.5,
              tooltipY = Math.sin((slice.startAngle + slice.endAngle) / 2) * r * 1.5;
          newPoints.push({
            valueIndex: vi,
            dataIndex: slice.index,
            tooltipX: tooltipX + placement.cx,
            tooltipY: tooltipY + placement.cy,
            valueLabel: valueObj.label,
            radius: currentRadius,
            startAngle: slice.startAngle,
            endAngle: slice.endAngle,
            value: slice.data[valueObj.field],
            axis: slice.data[axis.field],
            toRemoveRadius: currentRadius - iteration
          });
        }, currentRadius, currentRadius - iteration, vi, valueObj, totals, coloredData, placement.cx, placement.cy, layerOne);
        newInstances.push(circle);
        if (vi > 0) newInstances[vi - 1].linkedTo.push(circle);
        circle.draw();
        currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration;
      });
      if (points.length === 0) setPoints(newPoints);
      if (elements.length === 0) setElements(newInstances);
    } else {
      elements.forEach(function (circle) {
        if (onHover && circle.valueIndex === onHover.valueIndex) circle.handleSliceHover(onHover.dataIndex);else circle.handleHoverExit();
      });
    }
  };

  React.useEffect(function () {
    if (layerOne && width !== undefined && placement !== undefined && totals.length > 0) _drawChart();
  }, [totals, width, height, placement, elements]);
  React.useEffect(function () {
    setElements([]);
  }, [values]);
}
useCircleChart.propTypes = {
  data: PropTypes__default["default"].arrayOf(PropTypes__default["default"].object),
  variant: PropTypes__default["default"].string,
  axis: PropTypes__default["default"].object,
  values: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string,
    field: PropTypes__default["default"].string,
    hexColor: PropTypes__default["default"].string
  })).isRequired,
  styles: PropTypes__default["default"].object
};

var Radar = /*#__PURE__*/function () {
  function Radar(_ref) {
    var dataLength = _ref.dataLength,
        axisKey = _ref.axisKey,
        axisLabel = _ref.axisLabel,
        biggest = _ref.biggest,
        cx = _ref.cx,
        cy = _ref.cy,
        radius = _ref.radius,
        valuesLength = _ref.valuesLength;

    _classCallCheck(this, Radar);

    _defineProperty(this, "animated", false);

    _defineProperty(this, "animationStarted", false);

    _defineProperty(this, "points", []);

    this.shift = (dataLength % 2 ? -1 : 1) * (dataLength / 2) * Math.PI / dataLength;
    this.step = 2 * Math.PI / dataLength;
    this.axisKey = axisKey;
    this.axisLabel = axisLabel;
    this.biggest = biggest;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.valuesLength = valuesLength;
  }

  _createClass(Radar, [{
    key: "polygon",
    value: function polygon(_ref2) {
      var _this = this;

      _ref2.vi;
          var data = _ref2.data,
          context = _ref2.context,
          onHover = _ref2.onHover,
          radius = _ref2.radius,
          valueKey = _ref2.valueKey,
          valueColor = _ref2.valueColor,
          valueLabel = _ref2.valueLabel,
          points = _ref2.points;
      var before;
      data.forEach(function (point, index) {
        context.strokeStyle = valueColor;
        var pVariation = point[valueKey] / _this.biggest;
        var currentStep = index * _this.step + _this.shift;
        var axisAttr = point[_this.axisKey];
        var _x$y = {
          x: _this.cx + radius * pVariation * Math.cos(currentStep),
          y: _this.cy + radius * pVariation * Math.sin(currentStep)
        },
            x = _x$y.x,
            y = _x$y.y;
        var newPoint = {
          x: x,
          y: y,
          width: 20,
          height: 20,
          axis: axisAttr,
          value: point[valueKey],
          axisLabel: _this.axisLabel,
          valueLabel: valueLabel,
          color: valueColor
        };
        points.push(newPoint);
        context.beginPath();
        if (before) context.moveTo(before.x, before.y);
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
        var isOnHover = (onHover === null || onHover === void 0 ? void 0 : onHover.axis) === point[_this.axisKey] && onHover.value === point[valueKey];
        context.beginPath();
        context.arc(x, y, isOnHover ? 10 : 4, 0, Math.PI * 2, false);
        context.fillStyle = valueColor;
        context.fill();
        context.closePath();
        before = newPoint;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx, data, values, onHover, resetAnimation, setPoints) {
      var _this2 = this;

      if (!this.animationStarted && !this.animated || this.animated && this.animationStarted) {
        this.animationStarted = true;
        if (this.animated && resetAnimation) this.animated = false;
        var timestamp = this.animated ? 0 : 500;
        var start,
            previousTimeStamp,
            currentRadius = 0;

        var d = function d(elapsed) {
          ctx.clearAll();
          var allPoints = [];
          values.forEach(function (valueObj, vi) {
            var points = [];

            _this2.polygon({
              data: data,
              radius: elapsed === -1 ? _this2.radius : currentRadius,
              onHover: onHover,
              context: ctx,
              valueKey: valueObj.field,
              valueLabel: valueObj.label,
              valueColor: valueObj.hexColor,
              points: points,
              vi: vi
            }); // FILL


            ctx.beginPath();
            ctx.fillStyle = hexToRgba(valueObj.hexColor, .3);
            points.forEach(function (p) {
              ctx.lineTo(p.x, p.y);
            });
            ctx.fill();
            ctx.closePath(); // FILL
            // CONNECT-LAST-LINE

            ctx.beginPath();
            ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
            ctx.lineTo(points[0].x, points[0].y);
            ctx.stroke();
            ctx.closePath(); // CONNECT-LAST-LINE

            allPoints.push.apply(allPoints, points);
          });

          if (elapsed === -1) {
            _this2.points = allPoints;
            setPoints(allPoints);
          }

          currentRadius = ease(elapsed, 0, _this2.radius, timestamp, 5);
        };

        var step = function step(t) {
          if (start === undefined) start = t;
          var elapsed = t - start;
          if (previousTimeStamp !== t) d(elapsed);

          if (timestamp > elapsed) {
            previousTimeStamp = t;
            requestAnimationFrame(step);
          } else {
            d(-1);
            _this2.animated = true;
          }
        };

        if (timestamp > 0) requestAnimationFrame(step);else d(-1);
      }
    }
  }]);

  return Radar;
}();

function useRadarChart(_ref) {
  var iterations = _ref.iterations,
      biggest = _ref.biggest,
      totals = _ref.totals,
      points = _ref.points,
      setPoints = _ref.setPoints,
      getLayer = _ref.getLayer,
      data = _ref.data,
      axis = _ref.axis,
      values = _ref.values,
      width = _ref.width,
      height = _ref.height;
  var visibleValues = React.useMemo(function () {
    return values.filter(function (b) {
      return !b.hidden;
    });
  }, [values]);

  var _useMemo = React.useMemo(function () {
    return {
      layerZero: getLayer(0),
      layerOne: getLayer(1),
      layerTwo: getLayer(2)
    };
  }, [width, height]),
      layerZero = _useMemo.layerZero,
      layerOne = _useMemo.layerOne,
      layerTwo = _useMemo.layerTwo;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      radars = _useState2[0],
      setRadars = _useState2[1];

  var placement = useAsyncMemo(function () {
    if (width !== undefined && height !== undefined) {
      var cx = layerZero.canvas.width / 2;
      var cy = layerZero.canvas.height / 2;
      var radius = ((cx > cy ? cy : cx) - cy * .3) * 1.25;
      return {
        cx: cx,
        cy: cy,
        radius: radius
      };
    } else return undefined;
  }, [width, height]);
  useHover(layerTwo, points, function (event) {
    onHover({
      ctx: layerTwo,
      event: event,
      points: points,
      placement: placement,
      variant: 'line',
      drawChart: drawChart
    });
  });

  var runIncrement = function runIncrement(method) {
    var increment = placement.radius / (iterations.length - 1);
    var currentIncrement = 0;

    for (var i = 0; i < iterations.length; i++) {
      method(currentIncrement, i);
      currentIncrement += increment;
    }
  };

  var drawChart = function drawChart() {
    var onHover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    layerOne.clearAll();
    var current;

    if (!radars) {
      current = new Radar({
        dataLength: data.length,
        radius: placement.radius,
        biggest: biggest,
        cx: placement.cx,
        cy: placement.cy,
        axisKey: axis.field,
        axisLabel: axis.label,
        valuesLength: visibleValues.length
      });
      setRadars(current);
    } else current = radars;

    current.draw(layerOne, data, visibleValues, onHover, current.valuesLength !== visibleValues.length, function (ps) {
      if (points.length === 0) setPoints(ps.map(function (p) {
        return _objectSpread2(_objectSpread2({}, p), {}, {
          x: p.x - 10,
          y: p.y - 10
        });
      }));
    });
    current.valuesLength = visibleValues.length;
  };

  React.useEffect(function () {
    if (layerZero && placement) {
      layerZero.clearAll();
      layerZero.defaultFont();
      var step = 2 * Math.PI / data.length,
          shift = (data.length % 2 ? -1 : 1) * (data.length / 2) * Math.PI / data.length;
      data.map(function (d, index) {
        var currentStep = index * step + shift;
        var px = placement.cx + placement.radius * 1.1 * Math.cos(currentStep),
            py = placement.cy + (placement.radius * 1.1 - 4) * Math.sin(currentStep);
        layerZero.fillStyle = layerOne.getThemes().fabric_color_tertiary;
        layerZero.font = "500 12px Roboto";
        layerZero.fillText(d[axis.field], px - d[axis.field].length * 4, py + 4);
      });
      layerZero.lineWidth = 1;
      runIncrement(function (currentIncrement, i) {
        layerZero.polygon(layerOne.getThemes().fabric_border_secondary, data.length, placement.cx, placement.cy, currentIncrement, i === iterations.length - 1);
      });
      runIncrement(function (currentIncrement, i) {
        if (i > 0) {
          var value = "".concat(iterations[iterations.length - i - 1]);
          var px = placement.cx - value.length * 3.5,
              py = placement.cy - currentIncrement + 8;
          layerZero.font = "600 12px Roboto";
          layerZero.fillStyle = layerOne.getThemes().fabric_background_primary;
          layerZero.fillRect(px - value.length, py - 11, value.length * 10, 14);
          layerZero.fillStyle = layerOne.getThemes().fabric_color_tertiary;
          layerZero.fillText(value, px, py);
        }
      });
    }
  }, [width, height, layerZero, placement, totals]);
  React.useEffect(function () {
    if (layerOne && width !== undefined && placement !== undefined) {
      layerOne === null || layerOne === void 0 ? void 0 : layerOne.defaultFont();
      drawChart();
    }
  }, [totals, width, height, placement]);
}

function useData(datasets, axis) {
  return React.useMemo(function () {
    var validDatasets = [];
    var data,
        response = [];
    datasets.forEach(function (d) {
      var filtered = d.filter(function (obj) {
        return obj[axis] !== undefined && obj[axis] !== null;
      });
      console.log(d);
      if (filtered.length > 0) validDatasets.push(filtered);
    });
    data = validDatasets.flat(1);
    var n = data.reduce(function (r, v, i, a) {
      if (!r[v[axis]]) {
        r[v[axis]] = [];
      }

      r[v[axis]].push(v);
      return r;
    }, []);
    console.log(validDatasets);
    Object.keys(n).forEach(function (key) {
      var newObj = {};
      var values = n[key];
      values.forEach(function (value) {
        Object.keys(value).forEach(function (v) {
          if (typeof value[v] === 'number') newObj[v] = (newObj[v] ? newObj[v] : 0) + value[v];else newObj[v] = value[v];
        });
      });
      response.push(newObj);
    });
    return response;
  }, [datasets]);
}

function useDimensions(target) {
  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];

  var resizeObs;

  var callback = function callback() {
    setWidth(target.offsetWidth);
    setHeight(target.offsetHeight);
  };

  React.useEffect(function () {
    if (target) {
      resizeObs = new ResizeObserver(callback);
      resizeObs.observe(target);
    }
  }, [target]);
  return {
    width: width,
    height: height
  };
}

function roundRect(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}

function transition(color, timestamp, drawContent) {
  var initialOpacity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var finalOpacity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var onAnimationEnd = arguments.length > 5 ? arguments[5] : undefined;
  var start,
      previousTimeStamp,
      currentOpacity = initialOpacity;

  var step = function step(t) {
    if (start === undefined) start = t;
    var elapsed = t - start;
    var rgbaColor = hexToRgba(color, currentOpacity);

    if (previousTimeStamp !== t) {
      drawContent(rgbaColor);
      currentOpacity = ease(elapsed, finalOpacity + initialOpacity / 2, -initialOpacity, timestamp, 5);
    }

    if (timestamp > elapsed) {
      previousTimeStamp = t;
      requestAnimationFrame(step);
    } else {
      drawContent(rgbaColor);
      if (onAnimationEnd) onAnimationEnd();
    }
  };

  requestAnimationFrame(step);
}

function drawTriangle(x, y, width, height, placement, context) {
  switch (placement) {
    case 'left':
      {
        context.beginPath();
        context.moveTo(x - 7, y + height / 4 + height / 8 + height / 8);
        context.lineTo(x, y + height / 4 + height / 8 + height / 4);
        context.lineTo(x, y + height / 4 + height / 8);
        context.fill();
        break;
      }

    case 'right':
      {
        context.beginPath();
        context.moveTo(x + width + 7, y + height / 4 + height / 8 + height / 8);
        context.lineTo(x + width, y + height / 4 + height / 8 + height / 4);
        context.lineTo(x + width, y + height / 4 + height / 8);
        context.fill();
        break;
      }

    case 'top':
      {
        context.beginPath();
        context.moveTo(x + width / 4 + width / 8 + width / 8, y - 7);
        context.lineTo(x + width / 4 + width / 8 + width / 4, y);
        context.lineTo(x + width / 4 + width / 8, y);
        context.fill();
        break;
      }

    case 'bottom':
      {
        context.beginPath();
        context.moveTo(x + width / 4 + width / 8 + width / 8, y + height + 7);
        context.lineTo(x + width / 4 + width / 8 + width / 4, y + height);
        context.lineTo(x + width / 4 + width / 8, y + height);
        context.fill();
        break;
      }
  }
}

function tooltip(point, color, event, placement, draw) {
  var x = point.x,
      y = point.y,
      width = point.width,
      height = point.height,
      axis = point.axis;
      point.axisLabel;
      var value = point.value,
      valueLabel = point.valueLabel;
  var align = placement.align,
      justify = placement.justify;
  value = value.toFixed(2);
  draw();
  var tooltipWidth = value.toString().length * 8 + valueLabel.length * 8 + 16;
  var tooltipHeight = 50;
  this.fillStyle = color;
  var overflownX, overflownY;
  var tooltipX, tooltipY;

  switch (align) {
    case 'start':
      {
        if (y - tooltipHeight - 10 < 0) {
          tooltipY = y + 10;
          overflownY = true;
        } else tooltipY = y - tooltipHeight - 10;

        break;
      }

    case 'end':
      tooltipY = y + height;
      break;

    default:
      tooltipY = y + height / 2 - tooltipHeight / 2;
      break;
  }

  switch (justify) {
    case 'start':
      {
        tooltipX = x;
        break;
      }

    case 'end':
      if (x + width + tooltipWidth / 2 > this.canvas.width) {
        overflownX = true;
        tooltipX = x + width - tooltipWidth - 10;
      } else tooltipX = x + width + 10;

      break;

    default:
      tooltipX = x + width / 2 - tooltipWidth / 2;
      break;
  }

  this.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5).fill();
  if (align === 'end' || overflownY) drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'top', this);else if (align === 'start' && !overflownY) drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'bottom', this);
  if (justify === 'end' && !overflownX) drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'left', this);else if (justify === 'start' || overflownX) drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'right', this);
  this.fillStyle = 'white';
  this.font = "600 14px Roboto";
  this.fillText("".concat(axis), tooltipX + 6, tooltipY + 20);
  this.defaultFont('white');
  this.fillText("".concat(valueLabel, ": ").concat(value), tooltipX + 6, tooltipY + 40);
}

function arcEraser(cx, cy, radius, startAngle, endAngle, timestamp, onEnded) {
  var _this = this;

  var start, previousTimeStamp;

  var draw = function draw(elapsed) {
    _this.clearArc(cx, cy, elapsed === timestamp ? radius : ease(elapsed, 0, radius, timestamp, 5), startAngle, endAngle);
  };

  var step = function step(t) {
    if (start === undefined) start = t;
    var elapsed = t - start;

    if (previousTimeStamp !== t) {
      draw(elapsed);
    }

    if (timestamp > elapsed) {
      previousTimeStamp = t;
      requestAnimationFrame(step);
    } else {
      onEnded();
      draw(timestamp);
    }
  };

  if (timestamp > 0) requestAnimationFrame(step);else draw(timestamp);
}

function polygon(strokeStyle, sides, cx, cy, radius, drawLines) {
  var _this = this;

  var placements = [];
  var step = 2 * Math.PI / sides,
      shift = (sides % 2 ? -1 : 1) * (sides / 2) * Math.PI / sides;
  this.beginPath();

  for (var i = 0; i <= sides; i++) {
    var currentStep = i * step + shift;
    var _x$y = {
      x: cx + radius * Math.cos(currentStep),
      y: cy + radius * Math.sin(currentStep)
    },
        x = _x$y.x,
        y = _x$y.y;
    placements.push({
      x: x,
      y: y
    });
    this.lineTo(x, y);
  }

  this.strokeStyle = strokeStyle;
  this.stroke();
  this.closePath();

  if (drawLines) {
    this.beginPath();
    placements.forEach(function (p) {
      _this.moveTo(cx, cy);

      _this.lineTo(p.x, p.y);
    });
    this.stroke();
    this.closePath();
  }

  return placements;
}

function useLayeredCanvas(fontColor) {
  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      layers = _useState2[0],
      setLayers = _useState2[1];

  var layer = function layer(index) {
    if (layers[index] !== undefined) return layers[index];
    return undefined;
  };

  var newLayer = function newLayer(target) {
    var element = document.createElement('canvas');
    target.appendChild(element);
    element.width = target.offsetWidth;
    element.height = target.offsetHeight;
    element.style.position = 'absolute';
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.zIndex = "".concat(layers.length);
    setLayers(function (prevState) {
      return [].concat(_toConsumableArray(prevState), [element.getContext('2d')]);
    });
  };

  var updateDimensions = function updateDimensions(target) {
    layers.forEach(function (l) {
      l.canvas.width = target.offsetWidth;
      l.canvas.height = target.offsetHeight;
    });
  };

  var theme = React.useContext(core.ThemeContext);
  React.useEffect(function () {
    CanvasRenderingContext2D.prototype.getThemes = function () {
      return theme.themes;
    };

    CanvasRenderingContext2D.prototype.roundRect = roundRect;

    CanvasRenderingContext2D.prototype.defaultFont = function () {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fontColor;
      this.fillStyle = color;
      this.font = "500 14px Roboto";
    };

    CanvasRenderingContext2D.prototype.opacityTransition = transition;
    CanvasRenderingContext2D.prototype.tooltip = tooltip;
    CanvasRenderingContext2D.prototype.animatedArc = arcEraser;
    CanvasRenderingContext2D.prototype.polygon = polygon;

    CanvasRenderingContext2D.prototype.clearAll = function () {
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    CanvasRenderingContext2D.prototype.clearArc = function (cx, cy, radius, startAngle, endAngle) {
      if (radius > 0) {
        this.save();
        this.globalCompositeOperation = 'destination-out';
        this.beginPath();
        this.fillStyle = this.getThemes().fabric_background_primary;
        this.moveTo(cx, cy);
        this.arc(cx, cy, radius, startAngle, endAngle, false);
        this.fill();
        this.restore();
      }
    };
  }, []);
  return {
    newLayer: newLayer,
    layer: layer,
    contextLayers: layers.length,
    updateDimensions: updateDimensions
  };
}

var padding = 32;

var getIterationCandidate = function getIterationCandidate(data, valueKey, variant, height, width) {
  var q,
      b = Math.max.apply(Math, _toConsumableArray(data.map(function (d) {
    return d[valueKey];
  }))),
      nb,
      k,
      iterations = [];
  if (variant === 'horizontal') q = Math.round(width / 350);else q = Math.round(height / 100);
  k = Math.ceil(b / q);
  k = Math.ceil(k / q) * q;
  nb = k * q;
  var currentValue = nb;

  for (var i = 0; i <= q; i++) {
    iterations.push(currentValue);
    currentValue -= k;
  }

  return {
    biggest: nb,
    iterations: iterations
  };
};

function useChart(_ref) {
  var data = _ref.data,
      values = _ref.values,
      variant = _ref.variant,
      layers = _ref.layers;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      points = _useState2[0],
      setPoints = _useState2[1];

  var wrapperRef = React.useRef();

  var _useLayeredCanvas = useLayeredCanvas(wrapperRef.current),
      _newLayer = _useLayeredCanvas.newLayer,
      layer = _useLayeredCanvas.layer,
      contextLayers = _useLayeredCanvas.contextLayers,
      updateDimensions = _useLayeredCanvas.updateDimensions;

  var _useDimensions = useDimensions(wrapperRef.current),
      width = _useDimensions.width,
      height = _useDimensions.height;

  var totals = React.useMemo(function () {
    var res = [];
    values.filter(function (v) {
      return !v.hidden;
    }).forEach(function (v) {
      res.push(data.reduce(function (t, el) {
        return t + el[v.field];
      }, 0));
    });
    return res;
  }, [data, values]);

  var _useMemo = React.useMemo(function () {
    var current = {};
    values.filter(function (v) {
      return !v.hidden;
    }).forEach(function (value) {
      var c = getIterationCandidate(data, value.field, variant, height, width);
      if (current.biggest === undefined || c.biggest > current.biggest) current = c;
    });
    return current;
  }, [data, width, height, values]),
      biggest = _useMemo.biggest,
      iterations = _useMemo.iterations;

  React.useEffect(function () {
    updateDimensions(wrapperRef.current);

    if (contextLayers === 0) {
      for (var i = 0; i < layers; i++) {
        _newLayer(wrapperRef.current);
      }
    }

    if (points.length > 0) {
      setPoints([]);
    }
  }, [width, height, data, values]);
  return {
    iterations: iterations,
    biggest: biggest,
    totals: totals,
    points: points,
    setPoints: setPoints,
    wrapperRef: wrapperRef,
    labelSpacing: padding + 3,
    getLayer: layer,
    width: width,
    height: height,
    newLayer: function newLayer() {
      console.log(wrapperRef.current);
      return _newLayer(wrapperRef.current);
    }
  };
}

function Visual(props) {
  var getHook = function getHook(variant, params) {
    switch (variant) {
      case 'line':
        return useLineChart(params);

      case 'horizontal-bar':
      case 'vertical-bar':
        return useBarChart(params);

      case 'donut':
      case 'pie':
        return useCircleChart(params);

      case 'radar':
        return useRadarChart(params);

      default:
        return;
    }
  };

  var datasets = React.useContext(DashboardContext);
  var data = useData(datasets, props.axis.field);

  var _useState = React.useState(props.values),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  React.useEffect(function () {
    var res = [];
    props.values.forEach(function (v) {
      if (v.hexColor !== undefined) res.push(v);else res.push(_objectSpread2(_objectSpread2({}, v), {}, {
        hexColor: randomColor()
      }));
    });
    setValues(res);
  }, [props.values]);
  var hook = useChart({
    axisKey: props.axis.field,
    data: data,
    values: values,
    layers: 3
  });
  getHook(props.variant, _objectSpread2(_objectSpread2(_objectSpread2({}, props.styles), hook), {}, {
    data: data,
    variant: props.variant,
    axis: props.axis,
    values: values
  }));
  return /*#__PURE__*/React__default["default"].createElement("div", {
    "data-page": props.page ? "".concat(props.page) : '0',
    className: [styles.wrapper, props.className].join(' '),
    style: props.styles
  }, /*#__PURE__*/React__default["default"].createElement("h1", {
    className: styles.title
  }, props.title, values.length > 0 ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles.datasets
  }, values.map(function (e, i) {
    return /*#__PURE__*/React__default["default"].createElement(core.Button, {
      disabled: !e.hidden && values.filter(function (v) {
        return !v.hidden;
      }).length === 1,
      styles: {
        opacity: e.hidden ? '.5' : '1'
      },
      className: styles.datasetWrapper,
      onClick: function onClick() {
        return setValues(function (prevState) {
          var v = _toConsumableArray(prevState);

          v[i] = _objectSpread2(_objectSpread2({}, v[i]), {}, {
            hidden: !v[i].hidden
          });
          return v;
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: styles.datasetLabel
    }, e.label), /*#__PURE__*/React__default["default"].createElement("div", {
      className: styles.datasetIndicator,
      style: {
        background: e.hexColor
      }
    }));
  })) : null), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles.canvasMountingPoint,
    ref: hook.wrapperRef
  }));
}
Visual.propTypes = {
  page: PropTypes__default["default"].number.isRequired,
  values: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string,
    field: PropTypes__default["default"].string,
    hexColor: PropTypes__default["default"].string
  })).isRequired,
  axis: PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string,
    field: PropTypes__default["default"].string
  }).isRequired,
  title: PropTypes__default["default"].string,
  styles: PropTypes__default["default"].shape({
    donutRatio: PropTypes__default["default"].number
  }),
  variant: PropTypes__default["default"].oneOf(['radar', 'line', 'vertical-bar', 'horizontal-bar', 'pie', 'donut']).isRequired
};

function Dashboard(props) {
  return /*#__PURE__*/React__default["default"].createElement(DashboardContext.Provider, {
    value: props.datasets
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles.page
  }, props.children));
}
Dashboard.propTypes = {
  children: PropTypes__default["default"].node,
  datasets: PropTypes__default["default"].arrayOf(PropTypes__default["default"].arrayOf(PropTypes__default["default"].object)).isRequired,
  styles: PropTypes__default["default"].object,
  className: PropTypes__default["default"].string,
  pages: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)
};

function DashboardGroup(props) {
  return /*#__PURE__*/React__default["default"].createElement(DashboardContext.Provider, {
    value: props.datasets
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles.page
  }, props.children));
}
DashboardGroup.propTypes = {
  children: PropTypes__default["default"].node,
  datasets: PropTypes__default["default"].arrayOf(PropTypes__default["default"].arrayOf(PropTypes__default["default"].object)).isRequired,
  styles: PropTypes__default["default"].object,
  className: PropTypes__default["default"].string,
  pages: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)
};

function useSample(axisKey, valuesLength, datasetQuantity, dataLength) {
  return React.useMemo(function () {
    var datasets = [],
        values = [];

    for (var i = 0; i < datasetQuantity; i++) {
      var currentDataset = [];

      for (var k = 0; k < dataLength; k++) {
        var currentObject = {};
        currentObject["".concat(axisKey)] = 'A' + k;

        for (var j = 0; j < valuesLength; j++) {
          currentObject["value-".concat(j)] = Math.round(Math.random() * (2500 - 2) + 2);
        }

        currentDataset.push(currentObject);
      }

      datasets.push(currentDataset);
    }

    for (var _j = 0; _j < valuesLength; _j++) {
      values.push({
        field: "value-".concat(_j),
        label: "Value-".concat(_j)
      });
    }

    return [datasets, values];
  }, [datasetQuantity, dataLength, valuesLength, axisKey]);
}

function Sample() {
  var _useSample = useSample('axis', 3, 3, 10),
      _useSample2 = _slicedToArray(_useSample, 2),
      data = _useSample2[0],
      values = _useSample2[1];

  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      padding: '64px',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '16px'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Dashboard, {
    datasets: data
  }, /*#__PURE__*/React__default["default"].createElement(Visual, {
    variant: 'radar',
    values: values,
    page: 0,
    axis: {
      label: 'Axis',
      field: 'axis'
    },
    styles: {
      width: 'calc(50% - 4px)',
      height: 'calc(50% - 4px)',
      backgroundColor: 'var(--fabric-background-primary)'
    },
    title: 'Title'
  }), /*#__PURE__*/React__default["default"].createElement(Visual, {
    variant: 'line',
    values: values,
    page: 0,
    axis: {
      label: 'Axis',
      field: 'axis'
    },
    styles: {
      width: 'calc(50% - 4px)',
      height: 'calc(50% - 4px)',
      backgroundColor: 'var(--fabric-background-primary)'
    },
    title: 'Title'
  }), /*#__PURE__*/React__default["default"].createElement(Visual, {
    variant: 'horizontal-bar',
    values: values,
    page: 0,
    axis: {
      label: 'Axis',
      field: 'axis'
    },
    styles: {
      width: 'calc(50% - 4px)',
      height: 'calc(50% - 4px)',
      backgroundColor: 'var(--fabric-background-primary)'
    },
    title: 'Title'
  }), /*#__PURE__*/React__default["default"].createElement(Visual, {
    variant: 'vertical-bar',
    values: values,
    page: 0,
    axis: {
      label: 'Axis',
      field: 'axis'
    },
    styles: {
      width: 'calc(50% - 4px)',
      height: 'calc(50% - 4px)',
      backgroundColor: 'var(--fabric-background-primary)'
    },
    title: 'Title'
  }), /*#__PURE__*/React__default["default"].createElement(Visual, {
    variant: 'pie',
    values: values,
    page: 0,
    axis: {
      label: 'Axis',
      field: 'axis'
    },
    styles: {
      width: 'calc(50% - 4px)',
      height: 'calc(50% - 4px)',
      backgroundColor: 'var(--fabric-background-primary)'
    },
    title: 'Title'
  })));
}

exports.Dashboard = Dashboard;
exports.DashboardGroup = DashboardGroup;
exports.Sample = Sample;
exports.Visual = Visual;
exports.useSample = useSample;
