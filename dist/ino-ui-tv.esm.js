import React, { useCallback, useEffect, useState, memo, useRef, startTransition, useMemo } from 'react';
import { createPortal } from 'react-dom';

var KeyCode = {
  N0: 48,
  N1: 49,
  N2: 50,
  N3: 51,
  N4: 52,
  N5: 53,
  N6: 54,
  N7: 55,
  N8: 56,
  N9: 57,
  NUM_PAD0: 96,
  NUM_PAD1: 97,
  NUM_PAD2: 98,
  NUM_PAD3: 99,
  NUM_PAD4: 100,
  NUM_PAD5: 101,
  NUM_PAD6: 102,
  NUM_PAD7: 103,
  NUM_PAD8: 104,
  NUM_PAD9: 105,
  RETURN: 10009,
  RETURN_WEB: 8,
  RETURN_WEBOS: 461,
  MUTE: 449,
  VOL_UP: 448,
  VOL_DOWN: 447,
  CH_UP: 427,
  CH_DOWN: 428,
  LG_CH_UP: 33,
  LG_CH_DOWN: 34,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  TOOLS: 10135,
  PRECH: 10190,
  INFO: 457,
  EXIT: 10182,
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  FAST_PREV: 412,
  FAST_NEXT: 417,
  NEXT: 10233,
  PREV: 10232,
  PAUSE: 19,
  PLAY: 415,
  STOP: 413,
  PLAYPAUSE: 10252,
  REC: 416,
  DONE: 65376,
  CANCEL: 65385
};
function checkKey(e) {
  // ... (include the entire check_key function as in the original file)
  var name = "";
  switch (e.keyCode) {
    case KeyCode.N0:
    case KeyCode.NUM_PAD0:
      name = "0";
      break;
    case KeyCode.N1:
    case KeyCode.NUM_PAD1:
      name = "1";
      break;
    case KeyCode.N2:
    case KeyCode.NUM_PAD2:
      name = "2";
      break;
    case KeyCode.N3:
    case KeyCode.NUM_PAD3:
      name = "3";
      break;
    case KeyCode.N4:
    case KeyCode.NUM_PAD4:
      name = "4";
      break;
    case KeyCode.N5:
    case KeyCode.NUM_PAD5:
      name = "5";
      break;
    case KeyCode.N6:
    case KeyCode.NUM_PAD6:
      name = "6";
      break;
    case KeyCode.N7:
    case KeyCode.NUM_PAD7:
      name = "7";
      break;
    case KeyCode.N8:
    case KeyCode.NUM_PAD8:
      name = "8";
      break;
    case KeyCode.N9:
    case KeyCode.NUM_PAD9:
      name = "9";
      break;
    case KeyCode.EXIT:
      name = "exit";
      break;
    case KeyCode.RETURN:
    case KeyCode.RETURN_WEB:
    case KeyCode.RETURN_WEBOS:
      name = "back";
      break;
    case KeyCode.MUTE:
      name = "mute";
      break;
    case KeyCode.VOL_UP:
      name = "volume_up";
      break;
    case KeyCode.VOL_DOWN:
      name = "volume_down";
      break;
    case KeyCode.CH_UP:
    case KeyCode.LG_CH_UP:
      name = "channel_up";
      break;
    case KeyCode.CH_DOWN:
    case KeyCode.LG_CH_DOWN:
      name = "channel_down";
      break;
    case KeyCode.UP:
      name = "up";
      break;
    case KeyCode.DOWN:
      name = "down";
      break;
    case KeyCode.LEFT:
      name = "left";
      break;
    case KeyCode.RIGHT:
      name = "right";
      break;
    case KeyCode.ENTER:
      name = "ok";
      break;
    case KeyCode.TOOLS:
      name = "tools";
      break;
    case KeyCode.PRECH:
      name = "prech";
      break;
    case KeyCode.INFO:
      name = "info";
      break;
    case KeyCode.EXIT:
      name = "exit";
      break;
    case KeyCode.RED:
      name = "red";
      break;
    case KeyCode.GREEN:
      name = "green";
      break;
    case KeyCode.YELLOW:
      name = "yellow";
      break;
    case KeyCode.BLUE:
      name = "blue";
      break;
    case KeyCode.FAST_PREV:
      name = "fast_prev";
      break;
    case KeyCode.FAST_NEXT:
      name = "fast_next";
      break;
    case KeyCode.PREV:
      name = "prev";
      break;
    case KeyCode.NEXT:
      name = "next";
      break;
    case KeyCode.PAUSE:
      name = "pause";
      break;
    case KeyCode.PLAY:
      name = "play";
      break;
    case KeyCode.STOP:
      name = "stop";
      break;
    case KeyCode.PLAYPAUSE:
      name = "play_pause";
      break;
    case KeyCode.REC:
      name = "rec";
      break;
    case KeyCode.DONE:
      name = "done";
      break;
    case KeyCode.CANCEL:
      name = "cancel";
      break;
  }
  return name;
}

function useKeydown(props) {
  var handleKeydown = useCallback(function (e) {
    e.preventDefault();
    var key = checkKey(e);
    if (key && !isNaN(Number(key)) && typeof props["number"] === "function") {
      key = "number";
    }
    if (typeof props[key] === "function") {
      props[key](e);
    }
  }, [props]);
  useEffect(function () {
    if (props.isActive) {
      window.addEventListener("keydown", handleKeydown);
    }
    return function () {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [props.isActive, handleKeydown]);
}

var DefaultCheckbox = function DefaultCheckbox(_ref) {
  var isChecked = _ref.isChecked,
    isActive = _ref.isActive;
  return React.createElement("svg", {
    width: "2rem",
    height: "2rem",
    viewBox: "0 0 24 24",
    fill: "none"
  }, React.createElement("rect", {
    x: "2",
    y: "2",
    width: "2rem",
    height: "2rem",
    rx: "4",
    stroke: isChecked ? '#2196f3' : isActive ? '#1976d2' : '#ccc',
    strokeWidth: "0.2rem",
    fill: isChecked ? '#2196f3' : 'white'
  }), isChecked && React.createElement("path", {
    d: "M7 13L10 16L17 9",
    stroke: "white",
    strokeWidth: "0.2rem",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
var CheckboxItem = function CheckboxItem(_ref2) {
  var _ref2$defaultChecked = _ref2.defaultChecked,
    defaultChecked = _ref2$defaultChecked === void 0 ? false : _ref2$defaultChecked,
    label = _ref2.label,
    onChange = _ref2.onChange,
    isActive = _ref2.isActive,
    _ref2$classNames = _ref2.classNames,
    classNames = _ref2$classNames === void 0 ? '' : _ref2$classNames,
    CustomIcon = _ref2.icon,
    onDown = _ref2.onDown,
    onUp = _ref2.onUp,
    onLeft = _ref2.onLeft,
    onRight = _ref2.onRight,
    onOk = _ref2.onOk,
    onBack = _ref2.onBack,
    _ref2$isRTL = _ref2.isRTL,
    isRTL = _ref2$isRTL === void 0 ? false : _ref2$isRTL;
  var _useState = useState(defaultChecked),
    isChecked = _useState[0],
    setIsChecked = _useState[1];
  var handleToggle = useCallback(function () {
    var newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  }, [isChecked, onChange]);
  var keyDownOptions = {
    isActive: isActive,
    ok: function ok() {
      handleToggle();
      onOk && onOk();
    },
    back: onBack,
    up: onUp,
    down: onDown,
    left: onLeft,
    right: onRight
  };
  useKeydown(keyDownOptions);
  return React.createElement("div", {
    className: "ino-checkbox-item " + (isActive ? 'active' : '') + " " + (isRTL ? 'rtl' : '') + " " + classNames
  }, React.createElement("label", {
    className: "ino-checkbox-container"
  }, React.createElement("input", {
    type: "checkbox",
    checked: isChecked,
    onChange: handleToggle
  }), React.createElement("span", {
    className: "ino-checkmark"
  }, CustomIcon ? React.createElement(CustomIcon, {
    isChecked: isChecked,
    isActive: isActive
  }) : React.createElement(DefaultCheckbox, {
    isChecked: isChecked,
    isActive: isActive
  })), React.createElement("span", {
    className: "ino-label"
  }, label)));
};

var TRANSFORM_TIMEOUT = 800;
/**
 * Initializes a GridView component with the given properties.
 *
 * @param {GridViewProps} props - The properties for the GridView component.
 * @returns {React.ReactNode} The initialized GridView component.
 */
/**
 * GridView component for displaying a grid of items.
 *
 * This component provides a customizable grid view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <GridView
 *   id="example-grid"
 *   uniqueKey="list-"
 *   nativeControle={true}
 *   rowItemsCount={4}
 *   rowCount={10}
 *   bufferStart={0}
 *   bufferEnd={0}
 *   itemsTotal={40}
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   initialActiveIndex={0}
 *   direction="ltr"
 *   onMouseEnter={() => {}}
 *   onChangeRow={() => {}}
 *   onUp={() => {}}
 *   onDown={() => {}}
 *   onBack={() => {}}
 *   renderItem={(item) => <div>{item}</div>}
 *   data={Array(40).fill('Item')}
 * />
 * ```
 */
var GridView = /*#__PURE__*/memo(function (_ref) {
  var id = _ref.id,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? 'list-' : _ref$uniqueKey,
    _ref$nativeControle = _ref.nativeControle,
    nativeControle = _ref$nativeControle === void 0 ? false : _ref$nativeControle,
    _ref$scrollOffset = _ref.scrollOffset,
    scrollOffset = _ref$scrollOffset === void 0 ? 0 : _ref$scrollOffset,
    rowItemsCount = _ref.rowItemsCount,
    rowCount = _ref.rowCount,
    _ref$bufferStart = _ref.bufferStart,
    bufferStart = _ref$bufferStart === void 0 ? 0 : _ref$bufferStart,
    _ref$bufferEnd = _ref.bufferEnd,
    bufferEnd = _ref$bufferEnd === void 0 ? 0 : _ref$bufferEnd,
    itemsTotal = _ref.itemsTotal,
    itemWidth = _ref.itemWidth,
    itemHeight = _ref.itemHeight,
    isActive = _ref.isActive,
    _ref$initialActiveInd = _ref.initialActiveIndex,
    initialActiveIndex = _ref$initialActiveInd === void 0 ? 0 : _ref$initialActiveInd,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'ltr' : _ref$direction,
    _ref$onMouseEnter = _ref.onMouseEnter,
    onMouseEnter = _ref$onMouseEnter === void 0 ? function () {} : _ref$onMouseEnter,
    _ref$onChangeRow = _ref.onChangeRow,
    onChangeRow = _ref$onChangeRow === void 0 ? function () {} : _ref$onChangeRow,
    _ref$onUp = _ref.onUp,
    onUp = _ref$onUp === void 0 ? function () {} : _ref$onUp,
    _ref$onDown = _ref.onDown,
    onDown = _ref$onDown === void 0 ? function () {} : _ref$onDown,
    _ref$onLeft = _ref.onLeft,
    onLeft = _ref$onLeft === void 0 ? function () {} : _ref$onLeft,
    _ref$onRight = _ref.onRight,
    onRight = _ref$onRight === void 0 ? function () {} : _ref$onRight,
    _ref$onOk = _ref.onOk,
    onOk = _ref$onOk === void 0 ? function () {} : _ref$onOk,
    _ref$onBack = _ref.onBack,
    onBack = _ref$onBack === void 0 ? function () {} : _ref$onBack,
    renderItem = _ref.renderItem,
    data = _ref.data;
  var scrollViewRef = useRef(null);
  var _useState = useState(0),
    startRow = _useState[0],
    setStartRow = _useState[1];
  var _useState2 = useState(initialActiveIndex),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var changeStartRow = useCallback(function (index) {
    var startScrollRow = 2;
    var currentRow = Math.ceil((index + 1) / rowItemsCount);
    var row = currentRow - startScrollRow;
    if (row < 0) row = 0;
    setStartRow(row);
  }, [rowItemsCount]);
  useEffect(function () {
    setActiveIndex(initialActiveIndex);
    changeStartRow(initialActiveIndex);
  }, [id, initialActiveIndex, changeStartRow]);
  var left = useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev % rowItemsCount === 0) {
        if (onLeft) {
          requestAnimationFrame(onLeft);
        }
      } else {
        prev--;
      }
      return prev;
    });
  }, [rowItemsCount, onLeft]);
  var right = useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev % rowItemsCount === rowItemsCount - 1 || prev === itemsTotal - 1) {
        if (onRight) {
          requestAnimationFrame(onRight);
        }
      } else {
        prev++;
      }
      return prev;
    });
  }, [rowItemsCount, itemsTotal, onRight]);
  var up = useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev < rowItemsCount) {
        requestAnimationFrame(onUp);
      } else {
        prev -= rowItemsCount;
      }
      changeStartRow(prev);
      return prev;
    });
  }, [rowItemsCount, onUp, changeStartRow]);
  var down = useCallback(function () {
    setActiveIndex(function (prev) {
      if (Math.ceil((prev + 1) / rowItemsCount) === Math.ceil(itemsTotal / rowItemsCount)) {
        requestAnimationFrame(function () {
          return onDown(activeIndex, prev);
        });
      } else {
        prev += rowItemsCount;
        if (prev > itemsTotal - 1) prev = itemsTotal - 1;
      }
      changeStartRow(prev);
      return prev;
    });
  }, [rowItemsCount, itemsTotal, onDown, changeStartRow]);
  var ok = useCallback(function () {
    onOk(data[activeIndex], activeIndex);
  }, [onOk, data, activeIndex]);
  var back = useCallback(function () {
    onBack();
  }, [onBack]);
  var onMouseEnterItem = useCallback(function (index) {
    setActiveIndex(index);
    onMouseEnter(index);
  }, [onMouseEnter]);
  var getItemStyle = useCallback(function (index) {
    var _ref2;
    var vIndex = Math.floor(index / rowItemsCount);
    var hIndex = index % rowItemsCount;
    return _ref2 = {
      position: 'absolute',
      width: itemWidth + "rem",
      height: itemHeight + "rem",
      top: vIndex * itemHeight + "rem"
    }, _ref2[direction === 'rtl' ? 'right' : 'left'] = hIndex * itemWidth + "rem", _ref2;
  }, [rowItemsCount, itemWidth, itemHeight, direction]);
  var renderItems = useCallback(function () {
    var items = [];
    var start = startRow * rowItemsCount - rowItemsCount * bufferStart;
    var end = startRow * rowItemsCount + rowItemsCount * rowCount + rowItemsCount * bufferEnd;
    var _loop = function _loop(i) {
      if (i >= 0 && i < itemsTotal) {
        var itemProps = {
          key: "" + uniqueKey + i,
          index: i,
          style: getItemStyle(i),
          isActive: i === activeIndex && isActive,
          item: data[i],
          onMouseEnter: function onMouseEnter() {
            return onMouseEnterItem(i);
          }
        };
        items.push(renderItem(itemProps));
      }
    };
    for (var i = start; i < end; i++) {
      _loop(i);
    }
    return items;
  }, [startRow, bufferStart, bufferEnd, rowItemsCount, rowCount, itemsTotal, uniqueKey, getItemStyle, activeIndex, isActive, data, onMouseEnterItem, renderItem]);
  useEffect(function () {
    var applyTransform = function applyTransform() {
      if (!scrollViewRef.current) return;
      var offset = startRow * itemHeight;
      var currentRow = Math.ceil((activeIndex + 1) / rowItemsCount);
      if (currentRow > 1) {
        offset += scrollOffset;
      }
      var transform = "translate3d(0, -" + offset + "rem, 0)";
      scrollViewRef.current.style.transform = transform;
      scrollViewRef.current.style.webkitTransform = transform;
      //   scrollViewRef.current.style.msTransform = transform;
      window.dispatchEvent(new Event('transformstart'));
      setTimeout(function () {
        return window.dispatchEvent(new Event('transformend'));
      }, TRANSFORM_TIMEOUT);
      onChangeRow(currentRow);
    };
    startTransition(function () {
      applyTransform();
    });
  }, [activeIndex, startRow, itemHeight, rowItemsCount, scrollOffset, onChangeRow]);
  var keyDownOptions = useMemo(function () {
    return {
      isActive: isActive && nativeControle,
      //   debounce,
      left: left,
      right: right,
      up: up,
      down: down,
      back: back,
      ok: ok
    };
  }, [isActive, nativeControle, left, right, up, down, back, onOk]);
  useKeydown(keyDownOptions);
  return React.createElement("div", {
    className: "scroll-view-parent",
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement("div", {
    className: "scroll-view grid-view",
    ref: scrollViewRef
  }, renderItems()));
});

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

var ARROW_STYLES = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  cursor: 'pointer'
};
var NavigationArrow = function NavigationArrow(_ref) {
  var direction = _ref.direction,
    icon = _ref.icon,
    onClick = _ref.onClick,
    show = _ref.show,
    listType = _ref.listType,
    customStyle = _ref.customStyle,
    className = _ref.className;
  if (!show) return null;
  var getPositionStyles = function getPositionStyles() {
    var _ref3;
    if (listType === 'horizontal') {
      var _ref2;
      return _ref2 = {}, _ref2[direction === 'start' ? 'left' : 'right'] = 0, _ref2;
    }
    return _ref3 = {}, _ref3[direction === 'start' ? 'top' : 'bottom'] = 0, _ref3;
  };
  return React.createElement("div", {
    onClick: onClick,
    style: _extends({}, ARROW_STYLES, getPositionStyles(), customStyle),
    className: "ino-list-arrow ino-list-arrow-" + direction + " " + (className || '')
  }, React.createElement("span", {
    className: "ino-list-arrow-icon"
  }, icon));
};

var SvgArrowLeft = function SvgArrowLeft() {
  return React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React.createElement("path", {
    d: "M6 12H18M6 12L11 7M6 12L11 17",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var SvgArrowRight = function SvgArrowRight() {
  return React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React.createElement("path", {
    d: "M6 12H18M18 12L13 7M18 12L13 17",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var SvgArrowUp = function SvgArrowUp() {
  return React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React.createElement("path", {
    d: "M12 6V18M12 6L7 11M12 6L17 11",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var SvgArrowDown = function SvgArrowDown() {
  return React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React.createElement("path", {
    d: "M12 6V18M12 18L7 13M12 18L17 13",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var TRANSFORM_TIMEOUT$1 = null;
/**
 * ListView component for displaying a list of items.
 *
 * This component provides a customizable list view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 */
/**
 * ListView component for displaying a list of items.
 *
 * This component provides a customizable list view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <ListView
 *   id="example-list"
 *   uniqueKey="list-"
 *   listType="horizontal"
 *   nativeControle={true}
 *   itemsCount={10}
 *   itemsTotal={50}
 *   gap={1}
 *   buffer={2}
 *   itemWidth={20}
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   initialActiveIndex={0}
 *   onBackScrollIndex={null}
 *   startScrollIndex={0}
 *   direction="ltr"
 *   onMouseEnter={() => {}}
 *   onUp={() => {}}
 *   onDown={() => {}}
 *   onLeft={() => {}}
 *   onRight={() => {}}
 *   onBack={() => {}}
 *   renderItem={(item) => <div>{item}</div>}
 *   data={Array(50).fill('Item')}
 * />
 * ```
 */
var ListView = /*#__PURE__*/memo(function (_ref) {
  var id = _ref.id,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? 'list-' : _ref$uniqueKey,
    _ref$listType = _ref.listType,
    listType = _ref$listType === void 0 ? 'horizontal' : _ref$listType,
    _ref$nativeControle = _ref.nativeControle,
    nativeControle = _ref$nativeControle === void 0 ? false : _ref$nativeControle,
    itemsCount = _ref.itemsCount,
    itemsTotal = _ref.itemsTotal,
    buffer = _ref.buffer,
    itemWidth = _ref.itemWidth,
    itemHeight = _ref.itemHeight,
    gap = _ref.gap,
    isActive = _ref.isActive,
    _ref$initialActiveInd = _ref.initialActiveIndex,
    initialActiveIndex = _ref$initialActiveInd === void 0 ? 0 : _ref$initialActiveInd,
    _ref$onBackScrollInde = _ref.onBackScrollIndex,
    onBackScrollIndex = _ref$onBackScrollInde === void 0 ? null : _ref$onBackScrollInde,
    _ref$startScrollIndex = _ref.startScrollIndex,
    startScrollIndex = _ref$startScrollIndex === void 0 ? 0 : _ref$startScrollIndex,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'ltr' : _ref$direction,
    _ref$debounce = _ref.debounce,
    debounce = _ref$debounce === void 0 ? 200 : _ref$debounce,
    _ref$onMouseEnter = _ref.onMouseEnter,
    onMouseEnter = _ref$onMouseEnter === void 0 ? function () {} : _ref$onMouseEnter,
    _ref$onUp = _ref.onUp,
    onUp = _ref$onUp === void 0 ? function () {} : _ref$onUp,
    _ref$onDown = _ref.onDown,
    onDown = _ref$onDown === void 0 ? function () {} : _ref$onDown,
    _ref$onLeft = _ref.onLeft,
    onLeft = _ref$onLeft === void 0 ? function () {} : _ref$onLeft,
    _ref$onRight = _ref.onRight,
    onRight = _ref$onRight === void 0 ? function () {} : _ref$onRight,
    _ref$onBack = _ref.onBack,
    onBack = _ref$onBack === void 0 ? function () {} : _ref$onBack,
    renderItem = _ref.renderItem,
    data = _ref.data,
    _ref$arrows = _ref.arrows,
    arrows = _ref$arrows === void 0 ? {
      show: false,
      startIcon: '←',
      endIcon: '→',
      style: {},
      className: ''
    } : _ref$arrows,
    _ref$edgeScroll = _ref.edgeScroll,
    edgeScroll = _ref$edgeScroll === void 0 ? {
      enabled: false,
      interval: 700,
      startDelay: 1000
    } : _ref$edgeScroll;
  var scrollViewRef = useRef(null);
  var _useState = useState(0),
    startIndex = _useState[0],
    setStartIndex = _useState[1];
  var _useState2 = useState(initialActiveIndex),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var _useState3 = useState(false),
    showStartArrow = _useState3[0],
    setShowStartArrow = _useState3[1];
  var _useState4 = useState(false),
    showEndArrow = _useState4[0],
    setShowEndArrow = _useState4[1];
  var _useState5 = useState(false),
    isAutoScrolling = _useState5[0],
    setIsAutoScrolling = _useState5[1];
  var autoScrollIntervalRef = useRef(null);
  var autoScrollTimeoutRef = useRef(null);
  var changeStartIndex = useCallback(function (index) {
    index -= startScrollIndex;
    if (index > itemsTotal - itemsCount) index = itemsTotal - itemsCount;
    if (index < 0) index = 0;
    setStartIndex(index);
  }, [itemsTotal, itemsCount, startScrollIndex]);
  useEffect(function () {
    setInitialActiveIndex(initialActiveIndex);
  }, [id]);
  var setInitialActiveIndex = function setInitialActiveIndex(index) {
    setActiveIndex(index);
    changeStartIndex(index);
  };
  var scrollToIndex = useCallback(function (index) {
    setActiveIndex(index);
    changeStartIndex(index);
    // Trigger a re-render to update the transform
    setTimeout(function () {
      setStartIndex(function (prevStartIndex) {
        return prevStartIndex;
      });
    }, 0);
  }, [changeStartIndex]);
  var next = function next(count) {
    if (count === void 0) {
      count = 1;
    }
    setActiveIndex(function (index) {
      if (index === itemsTotal - 1) {
        listType === 'horizontal' ? requestAnimationFrame(onRight) : requestAnimationFrame(onDown);
      } else {
        index += count;
        if (index > itemsTotal - 1) index = itemsTotal - 1;
      }
      changeStartIndex(index);
      return index;
    });
  };
  var prev = function prev(count) {
    if (count === void 0) {
      count = 1;
    }
    setActiveIndex(function (index) {
      if (index === 0) {
        listType === 'horizontal' ? requestAnimationFrame(onLeft) : requestAnimationFrame(onUp);
      } else {
        index -= count;
        if (index < 0) index = 0;
      }
      changeStartIndex(index);
      return index;
    });
  };
  var back = useCallback(function () {
    if (onBackScrollIndex !== null) {
      scrollToIndex(onBackScrollIndex);
    } else {
      scrollToIndex(0); // Scroll to the first element
    }
    requestAnimationFrame(onBack);
  }, [onBackScrollIndex, scrollToIndex, onBack]);
  var onMouseEnterItem = useCallback(function (index) {
    setActiveIndex(index);
    onMouseEnter(index);
  }, [onMouseEnter]);
  var getItemStyle = useCallback(function (index) {
    var _ref2;
    return _extends({
      position: 'absolute',
      width: itemWidth + "rem",
      height: itemHeight + "rem"
    }, listType === 'horizontal' ? (_ref2 = {}, _ref2[direction === 'rtl' ? 'right' : 'left'] = index * (itemWidth + (gap || 0)) + "rem", _ref2.top = 0, _ref2) : {
      left: 0,
      top: index * (itemHeight + (gap || 0)) + "rem"
    });
  }, [itemWidth, itemHeight, listType, direction, gap]);
  var renderItems = useCallback(function () {
    var items = [];
    var start = startIndex - buffer;
    var end = startIndex + itemsCount + buffer;
    var _loop = function _loop(i) {
      if (i >= 0 && i < itemsTotal) {
        var itemProps = {
          key: "" + uniqueKey + i,
          index: i,
          style: getItemStyle(i),
          isActive: i === activeIndex && isActive,
          item: data[i],
          onUp: onUp,
          onDown: onDown,
          onLeft: onLeft,
          onRight: onRight,
          onMouseEnter: function onMouseEnter() {
            return onMouseEnterItem(i);
          }
        };
        items.push(renderItem(itemProps));
      }
    };
    for (var i = start; i < end; i++) {
      _loop(i);
    }
    return items;
  }, [startIndex, buffer, itemsCount, itemsTotal, uniqueKey, getItemStyle, activeIndex, isActive, onUp, onDown, onLeft, onRight, onMouseEnterItem, renderItem, data]);
  useEffect(function () {
    var applyTransform = function applyTransform() {
      if (!scrollViewRef.current) return;
      window.transforming = true;
      window.dispatchEvent(new Event('transformstart'));
      clearTimeout(TRANSFORM_TIMEOUT$1);
      TRANSFORM_TIMEOUT$1 = setTimeout(function () {
        return window.dispatchEvent(new Event('transformend'));
      }, 500);
      var transform = listType === 'horizontal' ? "translate3d(" + (direction === 'ltr' ? '-' : '') + startIndex * (itemWidth + (gap || 0)) + "rem, 0, 0)" : "translate3d(0, -" + startIndex * (itemHeight + (gap || 0)) + "rem, 0)";
      scrollViewRef.current.style.transform = transform;
      scrollViewRef.current.style.webkitTransform = transform;
    };
    applyTransform();
  }, [startIndex, listType, direction, itemWidth, itemHeight]);
  useEffect(function () {
    if (arrows.show) {
      setShowStartArrow(startIndex > 0);
      setShowEndArrow(startIndex < itemsTotal - itemsCount);
    }
  }, [startIndex, itemsTotal, itemsCount, arrows.show]);
  var keyDownOptions = useMemo(function () {
    return {
      isActive: isActive && nativeControle,
      // debounce,
      left: function left() {
        return listType === 'horizontal' && prev();
      },
      right: function right() {
        return listType === 'horizontal' && next();
      },
      up: function up() {
        return listType !== 'horizontal' && prev();
      },
      down: function down() {
        return listType !== 'horizontal' && next();
      },
      channel_up: function channel_up() {
        return prev(itemsCount);
      },
      channel_down: function channel_down() {
        return next(itemsCount);
      },
      back: back
    };
  }, [isActive, nativeControle, listType, prev, next, itemsCount, back, debounce]);
  useKeydown(keyDownOptions);
  var parentStyle = useMemo(function () {
    var _ref3;
    return _ref3 = {}, _ref3[listType === 'horizontal' ? 'height' : 'width'] = (listType === 'horizontal' ? itemHeight : itemWidth) + "rem", _ref3;
  }, [listType, itemHeight, itemWidth]);
  useEffect(function () {
    return function () {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);
  var startAutoScroll = useCallback(function (direction) {
    if (isAutoScrolling) return;
    setIsAutoScrolling(true);
    var scrollFn = direction === 'prev' ? prev : next;
    // Add initial delay before starting to scroll
    autoScrollTimeoutRef.current = setTimeout(function () {
      // Initial scroll
      scrollFn();
      // Continue scrolling while hovering
      autoScrollIntervalRef.current = setInterval(function () {
        scrollFn();
      }, edgeScroll.interval);
    }, edgeScroll.startDelay);
  }, [isAutoScrolling, prev, next, edgeScroll.interval, edgeScroll.startDelay]);
  var stopAutoScroll = useCallback(function () {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
    setIsAutoScrolling(false);
  }, []);
  var hoverZoneStyles = _extends({
    position: 'absolute',
    zIndex: 2
  }, listType === 'horizontal' ? {
    top: 0,
    height: '100%'
  } : {
    left: 0,
    width: '100%'
  });
  return React.createElement("div", {
    className: "scroll-view-parent " + listType,
    style: parentStyle
  }, edgeScroll.enabled && startIndex > 0 && React.createElement("div", {
    className: "edge-scroll-zone edge-scroll-zone-start",
    style: _extends({}, hoverZoneStyles, listType === 'horizontal' ? {
      left: 0
    } : {
      top: 0
    }),
    onMouseEnter: function onMouseEnter() {
      return startAutoScroll('prev');
    },
    onMouseLeave: stopAutoScroll
  }), edgeScroll.enabled && startIndex < itemsTotal - itemsCount && React.createElement("div", {
    className: "edge-scroll-zone edge-scroll-zone-end",
    style: _extends({}, hoverZoneStyles, listType === 'horizontal' ? {
      right: 0
    } : {
      bottom: 0
    }),
    onMouseEnter: function onMouseEnter() {
      return startAutoScroll('next');
    },
    onMouseLeave: stopAutoScroll
  }), React.createElement(NavigationArrow, {
    direction: "start",
    icon: listType === 'horizontal' ? arrows.startIcon || React.createElement(SvgArrowLeft, null) : arrows.startIcon || React.createElement(SvgArrowUp, null),
    onClick: function onClick() {
      return prev();
    },
    show: arrows.show && showStartArrow,
    listType: listType,
    customStyle: arrows.style,
    className: arrows.className
  }), React.createElement(NavigationArrow, {
    direction: "end",
    icon: listType === 'horizontal' ? arrows.endIcon || React.createElement(SvgArrowRight, null) : arrows.endIcon || React.createElement(SvgArrowDown, null),
    onClick: function onClick() {
      return next();
    },
    show: arrows.show && showEndArrow,
    listType: listType,
    customStyle: arrows.style,
    className: arrows.className
  }), React.createElement("div", {
    className: "scroll-view list-view " + (direction === 'rtl' ? 'rtl-list-view' : ''),
    ref: scrollViewRef
  }, renderItems()));
});

/**
 * Modal component for displaying content in an overlay.
 *
 * This component provides a customizable modal dialog with optional primary and secondary action buttons.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Example Modal"
 *   okBtnText="Save"
 *   onOk={() => handleSave()}
 *   cancelBtnText="Cancel"
 * >
 *   <p>This is the modal content.</p>
 * </Modal>
 * ```
 */
var Modal = function Modal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    title = _ref.title,
    children = _ref.children,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    okBtnText = _ref.okBtnText,
    onOk = _ref.onOk,
    cancelBtnText = _ref.cancelBtnText,
    onCancel = _ref.onCancel,
    _ref$showCloseIcon = _ref.showCloseIcon,
    showCloseIcon = _ref$showCloseIcon === void 0 ? true : _ref$showCloseIcon,
    _ref$closeOnOverlayCl = _ref.closeOnOverlayClick,
    closeOnOverlayClick = _ref$closeOnOverlayCl === void 0 ? true : _ref$closeOnOverlayCl,
    onPrimaryMouseEnter = _ref.onPrimaryMouseEnter,
    onPrimaryMouseLeave = _ref.onPrimaryMouseLeave,
    onSecondaryMouseEnter = _ref.onSecondaryMouseEnter,
    onSecondaryMouseLeave = _ref.onSecondaryMouseLeave;
  var _useState = useState(0),
    activeButtonIndex = _useState[0],
    setActiveButtonIndex = _useState[1];
  if (!isOpen) return null;
  var handleClose = useCallback(function () {
    onClose();
  }, [onClose]);
  var handlePrimaryAction = useCallback(function () {
    if (onOk) {
      onOk();
    } else {
      handleClose();
    }
  }, [onOk, handleClose]);
  var handleSecondaryAction = useCallback(function () {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  }, [onCancel, handleClose]);
  var keyDownOptions = {
    isActive: isOpen,
    back: handleClose,
    ok: function ok() {
      if (activeButtonIndex === 0) {
        handleSecondaryAction();
      } else if (activeButtonIndex === 1) {
        handlePrimaryAction();
      }
    },
    left: function left() {
      return setActiveButtonIndex(function (prev) {
        return Math.max(prev - 1, 0);
      });
    },
    right: function right() {
      return setActiveButtonIndex(function (prev) {
        return Math.min(prev + 1, 1);
      });
    }
  };
  useKeydown(keyDownOptions);
  if (!isOpen) return null;
  var handleOverlayClick = useCallback(function (e) {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  }, [closeOnOverlayClick, handleClose]);
  var modalContent = React.createElement("div", {
    className: "ino-modal-overlay " + classNames,
    onClick: handleOverlayClick
  }, React.createElement("div", {
    className: "ino-modal"
  }, React.createElement("div", {
    className: "ino-modal-header"
  }, React.createElement("h2", null, title), showCloseIcon && React.createElement("button", {
    className: "ino-modal-close",
    onClick: handleClose
  }, "\xD7")), React.createElement("div", {
    className: "ino-modal-content"
  }, children), (okBtnText || cancelBtnText) && React.createElement("div", {
    className: "ino-modal-footer"
  }, cancelBtnText && React.createElement("button", {
    className: "ino-modal-button secondary " + (activeButtonIndex === 0 ? 'active' : ''),
    onClick: handleSecondaryAction,
    onFocus: function onFocus() {
      return setActiveButtonIndex(0);
    },
    onMouseEnter: function onMouseEnter() {
      setActiveButtonIndex(0);
      if (onSecondaryMouseEnter) onSecondaryMouseEnter();
    },
    onMouseLeave: function onMouseLeave() {
      if (onSecondaryMouseLeave) onSecondaryMouseLeave();
    }
  }, cancelBtnText), okBtnText && React.createElement("button", {
    className: "ino-modal-button primary " + (activeButtonIndex === 1 ? 'active' : ''),
    onClick: handlePrimaryAction,
    onFocus: function onFocus() {
      return setActiveButtonIndex(1);
    },
    onMouseEnter: function onMouseEnter() {
      setActiveButtonIndex(1);
      if (onPrimaryMouseEnter) onPrimaryMouseEnter();
    },
    onMouseLeave: function onMouseLeave() {
      if (onPrimaryMouseLeave) onPrimaryMouseLeave();
    }
  }, okBtnText))));
  return createPortal(modalContent, document.body);
};

function useMappedKeydown(props) {
  var isActive = props.isActive,
    onOk = props.onOk,
    onBack = props.onBack,
    onLeft = props.onLeft,
    onRight = props.onRight,
    onUp = props.onUp,
    onDown = props.onDown,
    onMouseEnter = props.onMouseEnter,
    index = props.index,
    item = props.item;
  useKeydown({
    isActive: isActive,
    ok: function ok(e) {
      if (onOk) {
        onOk(e, item, index);
      }
    },
    back: function back(e) {
      if (onBack) {
        onBack(e, index);
      }
    },
    left: function left(e) {
      if (onLeft) {
        onLeft(e, index);
      }
    },
    right: function right(e) {
      if (onRight) {
        onRight(e, index);
      }
    },
    up: function up(e) {
      if (onUp) {
        onUp(e, index);
      }
    },
    down: function down(e) {
      if (onDown) {
        onDown(e, index);
      }
    },
    mouseEnter: function mouseEnter(e) {
      if (onMouseEnter) {
        onMouseEnter(e, index);
      }
    }
  });
}

var _excluded = ["isActive", "index", "children", "onClick", "type", "disabled", "classNames", "size", "variant", "onLeft", "onRight", "onUp", "onDown", "onBack", "onFocus", "onMouseEnter"];
var InoButton = function InoButton(_ref) {
  var _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? true : _ref$isActive,
    index = _ref.index,
    children = _ref.children,
    _onClick = _ref.onClick,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'button' : _ref$type,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    onLeft = _ref.onLeft,
    onRight = _ref.onRight,
    onUp = _ref.onUp,
    onDown = _ref.onDown,
    onBack = _ref.onBack,
    _onMouseEnter = _ref.onMouseEnter,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  useMappedKeydown({
    isActive: isActive,
    onOk: _onClick,
    onBack: onBack,
    onLeft: onLeft,
    onRight: onRight,
    onUp: onUp,
    onDown: onDown,
    onMouseEnter: _onMouseEnter,
    index: index
  });
  return React.createElement("button", Object.assign({
    type: type,
    onClick: function onClick(e) {
      if (!disabled && _onClick) {
        _onClick(e, index);
      }
    },
    onMouseEnter: function onMouseEnter(e) {
      _onMouseEnter && _onMouseEnter(e, index);
    },
    disabled: disabled,
    className: "ino-button ino-button--" + variant + " ino-button--" + size + " " + (isActive ? 'ino-button--active' : '') + " " + classNames
  }, rest), children);
};

var ThemeProvider = function ThemeProvider(_ref) {
  var theme = _ref.theme,
    children = _ref.children;
  useEffect(function () {
    var _theme$fonts, _theme$fonts2;
    var root = document.documentElement;
    // Colors
    if (theme.colors) {
      var _theme$colors$text, _theme$colors$text2;
      if (theme.colors.primary) {
        root.style.setProperty('--ino-bg-primary', theme.colors.primary);
        root.style.setProperty('--ino-border-primary', theme.colors.primary);
        root.style.setProperty('--ino-shadow-primary', theme.colors.primary);
      }
      if (theme.colors.secondary) {
        root.style.setProperty('--ino-bg-secondary', theme.colors.secondary);
      }
      if (theme.colors.danger) {
        root.style.setProperty('--ino-bg-danger', theme.colors.danger);
      }
      if (theme.colors.warning) {
        root.style.setProperty('--ino-bg-warning', theme.colors.warning);
      }
      // Text colors
      if ((_theme$colors$text = theme.colors.text) != null && _theme$colors$text.primary) {
        root.style.setProperty('--ino-text-primary', theme.colors.text.primary);
      }
      if ((_theme$colors$text2 = theme.colors.text) != null && _theme$colors$text2.secondary) {
        root.style.setProperty('--ino-text-secondary', theme.colors.text.secondary);
      }
    }
    // Font sizes
    if ((_theme$fonts = theme.fonts) != null && _theme$fonts.sizes) {
      if (theme.fonts.sizes.small) {
        root.style.setProperty('--ino-font-size-small', theme.fonts.sizes.small);
      }
      if (theme.fonts.sizes.medium) {
        root.style.setProperty('--ino-font-size-medium', theme.fonts.sizes.medium);
      }
      if (theme.fonts.sizes.large) {
        root.style.setProperty('--ino-font-size-large', theme.fonts.sizes.large);
      }
    }
    // Font weights
    if ((_theme$fonts2 = theme.fonts) != null && _theme$fonts2.weights) {
      if (theme.fonts.weights.light) {
        root.style.setProperty('--ino-font-weight-light', theme.fonts.weights.light.toString());
      }
      if (theme.fonts.weights.regular) {
        root.style.setProperty('--ino-font-weight-regular', theme.fonts.weights.regular.toString());
      }
    }
    // Border radius
    if (theme.borderRadius) {
      if (theme.borderRadius.small) {
        root.style.setProperty('--ino-border-radius-small', theme.borderRadius.small);
      }
      if (theme.borderRadius.medium) {
        root.style.setProperty('--ino-border-radius-medium', theme.borderRadius.medium);
      }
    }
  }, [theme]);
  return React.createElement(React.Fragment, null, children);
};

export { CheckboxItem, GridView, InoButton, ListView, Modal, ThemeProvider };
//# sourceMappingURL=ino-ui-tv.esm.js.map
