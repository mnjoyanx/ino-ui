import React, { useRef, useCallback, useEffect, useState } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

var SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};
var VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost'
};

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
  var pressed = useRef({});
  var intervalRef = useRef(null);
  var handleKeydown = useCallback(function (e) {
    if (!props.isActive) return;
    var key = e.key.toLowerCase();
    var specialKey = checkKey(e);
    // Prevent default browser behavior
    e.preventDefault();
    // If key is already pressed and interval exists, return
    if (pressed.current[key] && intervalRef.current) return;
    var executeKeyHandler = function executeKeyHandler(handlerKey) {
      if (typeof props[handlerKey] === "function") {
        props[handlerKey](e);
      }
    };
    // Handle the initial key press
    if (!pressed.current[key]) {
      pressed.current[key] = true;
      if (/^\d$/.test(key) && props.number) {
        executeKeyHandler('number');
      } else if (/^[a-z]$/.test(key) && props.letter) {
        executeKeyHandler('letter');
      } else if (specialKey && props[specialKey]) {
        executeKeyHandler(specialKey);
      }
    }
    // Set up debounced repeat
    intervalRef.current = setInterval(function () {
      if (/^\d$/.test(key) && props.number) {
        executeKeyHandler('number');
      } else if (/^[a-z]$/.test(key) && props.letter) {
        executeKeyHandler('letter');
      } else if (specialKey && props[specialKey]) {
        executeKeyHandler(specialKey);
      }
    }, props.debounce || 100);
  }, [props]);
  var handleKeyup = useCallback(function (e) {
    var key = e.key.toLowerCase();
    pressed.current[key] = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  useEffect(function () {
    if (props.isActive) {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keyup", handleKeyup);
    }
    return function () {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [props.isActive, handleKeydown, handleKeyup]);
}

function useMappedKeydown(props) {
  var isActive = props.isActive,
    onOk = props.onOk,
    onBack = props.onBack,
    onLeft = props.onLeft,
    onRight = props.onRight,
    onUp = props.onUp,
    onDown = props.onDown,
    onLetter = props.onLetter,
    onNumber = props.onNumber,
    onRemove = props.onRemove,
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
    // mouseEnter: (e) => {
    //     if (onMouseEnter) {
    //         onMouseEnter(e, index);
    //     }
    // },
    // mouseLeave: (e) => {
    //     if (onMouseLeave) {
    //         onMouseLeave(e, index);
    //     }
    // },
    letter: function letter(e) {
      console.log('letter', e);
      if (onLetter) {
        onLetter(e, index);
      }
    },
    number: function number(e) {
      if (onNumber) {
        onNumber(e, index);
      }
    },
    remove: function remove(e) {
      if (onRemove) {
        onRemove(e, index);
      }
    }
  });
}

var InoInput = function InoInput(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$showCursor = _ref.showCursor,
    showCursor = _ref$showCursor === void 0 ? true : _ref$showCursor,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    maxLength = _ref.maxLength,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    index = _ref.index,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'standard' : _ref$variant,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    _onBack = _ref.onBack,
    onOk = _ref.onOk,
    _onLeft = _ref.onLeft,
    _onRight = _ref.onRight,
    onUp = _ref.onUp,
    onDown = _ref.onDown,
    _onMouseEnter = _ref.onMouseEnter,
    _onMouseLeave = _ref.onMouseLeave;
  var _useState = useState(value.length),
    cursorPosition = _useState[0],
    setCursorPosition = _useState[1];
  var contentRef = useRef(null);
  var containerRef = useRef(null);
  var handleFocus = useCallback(function (e) {
    if (!disabled) {
      onFocus == null || onFocus(e, index);
    }
  }, [disabled, onFocus]);
  var handleClick = useCallback(function (e) {
    var _contentRef$current;
    if (disabled) return;
    var rect = (_contentRef$current = contentRef.current) == null ? void 0 : _contentRef$current.getBoundingClientRect();
    if (!rect) return;
    var x = e.clientX - rect.left;
    var text = value;
    var newPosition = text.length;
    // Calculate approximate character position based on click position
    var charWidth = 8; // Approximate character width in pixels
    var clickedPosition = Math.floor(x / charWidth);
    newPosition = Math.min(Math.max(0, clickedPosition), text.length);
    setCursorPosition(newPosition);
    handleFocus(e);
  }, [value, disabled, handleFocus]);
  var updateCursorPosition = useCallback(function (direction) {
    setCursorPosition(function (prev) {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(value.length, prev + 1);
      }
    });
  }, [value.length]);
  var handleKeyPress = useCallback(function (e) {
    if (!isActive || disabled) return;
    var newValue = value;
    var newPosition = cursorPosition;
    if (e.key === 'Backspace') {
      if (cursorPosition > 0) {
        newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
        newPosition = cursorPosition - 1;
      }
    } else if (e.key.length === 1) {
      if (maxLength && value.length >= maxLength) return;
      if (type === 'password' && !/^\d$/.test(e.key)) return;
      newValue = value.slice(0, cursorPosition) + e.key + value.slice(cursorPosition);
      newPosition = cursorPosition + 1;
    }
    onChange == null || onChange(newValue);
    setCursorPosition(newPosition);
  }, [value, onChange, maxLength, type, isActive, disabled, cursorPosition]);
  var handleNavigation = useCallback(function (direction) {
    if (!isActive) return;
    updateCursorPosition(direction);
  }, [isActive, updateCursorPosition]);
  useMappedKeydown({
    isActive: isActive,
    onNumber: handleKeyPress,
    onLetter: handleKeyPress,
    onLeft: function onLeft(e, index) {
      if (showCursor) {
        handleNavigation('left');
      } else {
        _onLeft == null || _onLeft(e, index);
      }
    },
    onRight: function onRight(e, index) {
      if (showCursor) {
        handleNavigation('right');
      } else {
        _onRight == null || _onRight(e, index);
      }
    },
    onRemove: handleKeyPress,
    onOk: onOk,
    onBack: function onBack(e, index) {
      _onBack == null || _onBack(e, index);
      onBlur == null || onBlur(e, index);
    },
    onUp: onUp,
    onDown: onDown
  });
  useEffect(function () {
    if (contentRef.current && containerRef.current) {
      var container = containerRef.current;
      var content = contentRef.current;
      container.scrollLeft = content.scrollWidth;
    }
  }, [value]);
  useEffect(function () {
    setCursorPosition(value.length);
  }, [value]);
  var displayValue = type === 'password' ? '•'.repeat(value.length) : value;
  return React.createElement("div", {
    ref: containerRef,
    onMouseEnter: function onMouseEnter(e) {
      _onMouseEnter == null || _onMouseEnter(e);
    },
    onMouseLeave: function onMouseLeave(e) {
      _onMouseLeave == null || _onMouseLeave(e);
    },
    className: "ino-input ino-input--" + variant + " " + (isActive ? 'active' : '') + " " + (disabled ? 'ino-input--disabled' : '') + " " + classNames,
    onClick: handleClick,
    role: "textbox",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled
  }, React.createElement("div", {
    ref: contentRef,
    className: "ino-input__content"
  }, displayValue.slice(0, cursorPosition), showCursor && isActive && React.createElement("span", {
    className: "ino-input__cursor"
  }, "|"), displayValue.slice(cursorPosition)), !displayValue && placeholder && !isActive && React.createElement("span", {
    className: "ino-input__placeholder"
  }, placeholder));
};

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

var _excluded = ["isActive", "index", "children", "onClick", "type", "disabled", "classNames", "size", "variant", "onLeft", "onRight", "onUp", "onDown", "onBack", "onMouseEnter"];
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
    _onLeft = _ref.onLeft,
    _onRight = _ref.onRight,
    _onUp = _ref.onUp,
    _onDown = _ref.onDown,
    _onBack = _ref.onBack,
    _onMouseEnter = _ref.onMouseEnter,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  useMappedKeydown({
    isActive: isActive,
    onOk: function onOk(e, index) {
      if (_onClick) _onClick(e, index);
    },
    onBack: function onBack(e, index) {
      if (_onBack) _onBack(e, index);
    },
    onLeft: function onLeft(e, index) {
      if (_onLeft) _onLeft(e, index);
    },
    onRight: function onRight(e, index) {
      if (_onRight) _onRight(e, index);
    },
    onUp: function onUp(e, index) {
      if (_onUp) _onUp(e, index);
    },
    onDown: function onDown(e, index) {
      if (_onDown) _onDown(e, index);
    },
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

var standardLayout = {
  qwerty: [
  // Numbers row
  [{
    label: '1',
    value: '1'
  }, {
    label: '2',
    value: '2'
  }, {
    label: '3',
    value: '3'
  }, {
    label: '4',
    value: '4'
  }, {
    label: '5',
    value: '5'
  }, {
    label: '6',
    value: '6'
  }, {
    label: '7',
    value: '7'
  }, {
    label: '8',
    value: '8'
  }, {
    label: '9',
    value: '9'
  }, {
    label: '0',
    value: '0'
  }, {
    label: '=',
    value: '='
  }, {
    label: '⌫',
    value: 'delete',
    action: 'delete'
  }],
  // First letter row
  [{
    label: 'q',
    value: 'q'
  }, {
    label: 'w',
    value: 'w'
  }, {
    label: 'e',
    value: 'e'
  }, {
    label: 'r',
    value: 'r'
  }, {
    label: 't',
    value: 't'
  }, {
    label: 'y',
    value: 'y'
  }, {
    label: 'u',
    value: 'u'
  }, {
    label: 'i',
    value: 'i'
  }, {
    label: 'o',
    value: 'o'
  }, {
    label: 'p',
    value: 'p'
  }, {
    label: '-',
    value: '-'
  }, {
    label: '_',
    value: '_'
  }, {
    label: '+',
    value: '+'
  }],
  // Second letter row
  [{
    label: 'a',
    value: 'a'
  }, {
    label: 's',
    value: 's'
  }, {
    label: 'd',
    value: 'd'
  }, {
    label: 'f',
    value: 'f'
  }, {
    label: 'g',
    value: 'g'
  }, {
    label: 'h',
    value: 'h'
  }, {
    label: 'j',
    value: 'j'
  }, {
    label: 'k',
    value: 'k'
  }, {
    label: 'l',
    value: 'l'
  }, {
    label: ';',
    value: ';'
  }, {
    label: ':',
    value: ':'
  }, {
    label: '↵',
    value: 'submit',
    action: 'submit'
  }],
  // Third letter row
  [{
    label: '⇧',
    value: 'shift',
    action: 'shift'
  }, {
    label: 'z',
    value: 'z'
  }, {
    label: 'x',
    value: 'x'
  }, {
    label: 'c',
    value: 'c'
  }, {
    label: 'v',
    value: 'v'
  }, {
    label: 'b',
    value: 'b'
  }, {
    label: 'n',
    value: 'n'
  }, {
    label: 'm',
    value: 'm'
  }, {
    label: '.',
    value: '.'
  }, {
    label: '@',
    value: '@'
  }, {
    label: '⌫',
    value: 'delete',
    action: 'delete'
  }]],
  numeric: [[{
    label: '1',
    value: '1'
  }, {
    label: '2',
    value: '2'
  }, {
    label: '3',
    value: '3'
  }], [{
    label: '4',
    value: '4'
  }, {
    label: '5',
    value: '5'
  }, {
    label: '6',
    value: '6'
  }], [{
    label: '7',
    value: '7'
  }, {
    label: '8',
    value: '8'
  }, {
    label: '9',
    value: '9'
  }], [{
    label: 'Clear',
    value: 'clear',
    action: 'clear'
  }, {
    label: '0',
    value: '0'
  }, {
    label: '⌫',
    value: 'delete',
    action: 'delete'
  }]]
};
var netflixLayout = {
  qwerty: [
  // Action row
  [{
    label: '⎵',
    value: 'space',
    action: 'space'
  }, {
    label: '⌫',
    value: 'delete',
    action: 'delete'
  }],
  // Letter rows (a-z) and number rows (0-9)
  [{
    label: 'a',
    value: 'a'
  }, {
    label: 'b',
    value: 'b'
  }, {
    label: 'c',
    value: 'c'
  }, {
    label: 'd',
    value: 'd'
  }, {
    label: 'e',
    value: 'e'
  }, {
    label: 'f',
    value: 'f'
  }],
  // Second letter row
  [{
    label: 'g',
    value: 'g'
  }, {
    label: 'h',
    value: 'h'
  }, {
    label: 'i',
    value: 'i'
  }, {
    label: 'j',
    value: 'j'
  }, {
    label: 'k',
    value: 'k'
  }, {
    label: 'l',
    value: 'l'
  }],
  // Third letter row
  [{
    label: 'm',
    value: 'm'
  }, {
    label: 'n',
    value: 'n'
  }, {
    label: 'o',
    value: 'o'
  }, {
    label: 'p',
    value: 'p'
  }, {
    label: 'q',
    value: 'q'
  }, {
    label: 'r',
    value: 'r'
  }],
  // Fourth letter row
  [{
    label: 's',
    value: 's'
  }, {
    label: 't',
    value: 't'
  }, {
    label: 'u',
    value: 'u'
  }, {
    label: 'v',
    value: 'v'
  }, {
    label: 'w',
    value: 'w'
  }, {
    label: 'x',
    value: 'x'
  }],
  // Fifth letter row
  [{
    label: 'y',
    value: 'y'
  }, {
    label: 'z',
    value: 'z'
  }, {
    label: '1',
    value: '1'
  }, {
    label: '2',
    value: '2'
  }, {
    label: '3',
    value: '3'
  }, {
    label: '4',
    value: '4'
  }],
  // Number row
  [{
    label: '5',
    value: '5'
  }, {
    label: '6',
    value: '6'
  }, {
    label: '7',
    value: '7'
  }, {
    label: '8',
    value: '8'
  }, {
    label: '9',
    value: '9'
  }, {
    label: '0',
    value: '0'
  }]],
  numeric: []
};

var InoKeyboard = function InoKeyboard(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onChange = _ref.onChange,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'standard' : _ref$variant,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'qwerty' : _ref$layout,
    customLayout = _ref.customLayout,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    onSubmit = _ref.onSubmit,
    onActiveKeyChange = _ref.onActiveKeyChange,
    _ref$infinite = _ref.infinite,
    infinite = _ref$infinite === void 0 ? false : _ref$infinite;
  var _useState = useState(0),
    activeRow = _useState[0],
    setActiveRow = _useState[1];
  var _useState2 = useState(0),
    activeCol = _useState2[0],
    setActiveCol = _useState2[1];
  var _useState3 = useState(false),
    isShifted = _useState3[0],
    setIsShifted = _useState3[1];
  var _useState4 = useState(false),
    shiftLocked = _useState4[0],
    setShiftLocked = _useState4[1];
  var _useState5 = useState(0),
    lastShiftPress = _useState5[0],
    setLastShiftPress = _useState5[1];
  var getKeyboardLayout = function getKeyboardLayout() {
    if (customLayout) {
      return customLayout;
    }
    var layoutMap = {
      netflix: netflixLayout,
      standard: standardLayout
    };
    return (layoutMap[variant] || standardLayout)[layout] || standardLayout.qwerty;
  };
  var keys = getKeyboardLayout();
  useEffect(function () {
    var _keys$activeRow;
    if (onActiveKeyChange && (_keys$activeRow = keys[activeRow]) != null && _keys$activeRow[activeCol]) {
      onActiveKeyChange(keys[activeRow][activeCol]);
    }
  }, [activeRow, activeCol, keys, onActiveKeyChange]);
  var handleKeyPress = useCallback(function (key, action) {
    // Handle function actions
    if (typeof action === 'function') {
      action();
      return;
    }
    switch (action) {
      case 'delete':
        onChange('');
        break;
      case 'space':
        onChange(' ');
        break;
      case 'submit':
        onSubmit == null || onSubmit(key);
        break;
      case 'shift':
        var now = Date.now();
        if (now - lastShiftPress < 500) {
          setShiftLocked(true);
          setIsShifted(true);
        } else {
          if (shiftLocked) {
            setShiftLocked(false);
            setIsShifted(false);
          } else {
            setIsShifted(true);
          }
        }
        setLastShiftPress(now);
        break;
      case 'clear':
        onChange('');
        break;
      default:
        var charToAdd = isShifted ? key.toUpperCase() : key;
        onChange(charToAdd);
        if (isShifted && !shiftLocked) {
          setIsShifted(false);
        }
    }
  }, [onChange, onSubmit, isShifted, shiftLocked, lastShiftPress]);
  var handleNavigation = useCallback(function (direction) {
    var currentRow = keys[activeRow];
    var nextRow = direction === 'up' ? keys[activeRow - 1] : direction === 'down' ? keys[activeRow + 1] : null;
    switch (direction) {
      case 'up':
        setActiveRow(function (prev) {
          if (prev === 0 && infinite) {
            return keys.length - 1;
          }
          return Math.max(0, prev - 1);
        });
        // Adjust column if moving to a shorter row
        if (nextRow && activeCol >= nextRow.length) {
          setActiveCol(nextRow.length - 1);
        }
        break;
      case 'down':
        setActiveRow(function (prev) {
          if (prev === keys.length - 1 && infinite) {
            return 0;
          }
          return Math.min(keys.length - 1, prev + 1);
        });
        // Adjust column if moving to a shorter row
        if (nextRow && activeCol >= nextRow.length) {
          setActiveCol(nextRow.length - 1);
        }
        break;
      case 'left':
        setActiveCol(function (prev) {
          if (prev === 0 && infinite) {
            return currentRow.length - 1;
          }
          return Math.max(0, prev - 1);
        });
        break;
      case 'right':
        setActiveCol(function (prev) {
          if (prev === currentRow.length - 1 && infinite) {
            return 0;
          }
          return Math.min(currentRow.length - 1, prev + 1);
        });
        break;
    }
  }, [activeRow, activeCol, keys, infinite]);
  useKeydown({
    isActive: isOpen,
    up: function up() {
      return handleNavigation('up');
    },
    down: function down() {
      return handleNavigation('down');
    },
    left: function left() {
      return handleNavigation('left');
    },
    right: function right() {
      return handleNavigation('right');
    },
    ok: function ok() {
      var key = keys[activeRow][activeCol];
      handleKeyPress(key.value);
    },
    back: onClose
  });
  if (!isOpen) return null;
  return React.createElement("div", {
    className: "ino-keyboard-overlay " + classNames
  }, React.createElement("div", {
    className: "ino-keyboard ino-keyboard--" + variant
  }, React.createElement("div", {
    className: "ino-keyboard-keys"
  }, keys.map(function (row, rowIndex) {
    return React.createElement("div", {
      key: rowIndex,
      className: "ino-keyboard-row"
    }, row.map(function (key, colIndex) {
      return React.createElement(InoButton, {
        index: colIndex,
        key: rowIndex + "-" + colIndex,
        isActive: activeRow === rowIndex && activeCol === colIndex,
        onMouseEnter: function onMouseEnter(_, index) {
          setActiveRow(rowIndex);
          setActiveCol(index);
        },
        onClick: function onClick() {
          return handleKeyPress(key.value, key.action);
        },
        classNames: "ino-keyboard-key " + (key.action ? "ino-keyboard-key--" + key.action : '') + " " + (key.action === 'shift' && isShifted ? 'active' : ''),
        style: {
          width: key.width ? key.width + "rem" : undefined
        }
      }, key.action === 'shift' && typeof key.label === 'string' ? key.label : isShifted && !key.action ? key.label.toUpperCase() : key.label);
    }));
  }))));
};

var InoProtectInput = function InoProtectInput(_ref) {
  var onChange = _ref.onChange,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? 4 : _ref$count,
    _ref$withLetters = _ref.withLetters,
    withLetters = _ref$withLetters === void 0 ? false : _ref$withLetters,
    _ref$keyboard = _ref.keyboard,
    keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
    onComplete = _ref.onComplete,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    onBack = _ref.onBack;
  var _useState = useState(Array(count).fill('')),
    values = _useState[0],
    setValues = _useState[1];
  var inputRefs = useRef([]);
  var _useState2 = useState(0),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var _useState3 = useState(false),
    isKeyboardOpen = _useState3[0],
    setIsKeyboardOpen = _useState3[1];
  var handleInputChange = function handleInputChange(index, value) {
    if (!isValidInput(value)) return;
    var newValues = [].concat(values);
    newValues[index] = value;
    setValues(newValues);
    if (value && index < count - 1) {
      setActiveIndex(index + 1);
    }
    onChange == null || onChange(newValues.join(''));
    if (newValues.every(function (v) {
      return v;
    }) && onComplete) {
      onComplete(newValues.join(''));
    }
  };
  var handleRemove = function handleRemove() {
    var newValues = [].concat(values);
    if (values[activeIndex]) {
      // If current position has a value, clear it
      newValues[activeIndex] = '';
    } else if (activeIndex > 0) {
      // If current position is empty and we're not at the first position,
      // clear previous position and move back
      setActiveIndex(activeIndex - 1);
      newValues[activeIndex - 1] = '';
    }
    setValues(newValues);
    onChange == null || onChange(newValues.join(''));
  };
  var handleKeyboardChange = function handleKeyboardChange(text) {
    if (text === '') {
      // Handle backspace/remove from keyboard
      handleRemove();
    } else {
      handleInputChange(activeIndex, text);
    }
  };
  var isValidInput = function isValidInput(value) {
    if (!value) return true;
    if (withLetters) {
      return /^[A-Za-z0-9]$/.test(value);
    }
    return /^[0-9]$/.test(value);
  };
  var handleInputFocus = function handleInputFocus(index) {
    setActiveIndex(index);
  };
  useKeydown({
    isActive: isActive,
    left: function left() {
      if (!isKeyboardOpen) {
        setActiveIndex(function (prev) {
          return Math.max(0, prev - 1);
        });
      }
    },
    right: function right() {
      if (!isKeyboardOpen) {
        setActiveIndex(function (prev) {
          return Math.min(count - 1, prev + 1);
        });
      }
    },
    ok: function ok() {
      if (!isKeyboardOpen && keyboard) {
        setIsKeyboardOpen(true);
      }
    },
    back: function back() {
      if (isKeyboardOpen) {
        setIsKeyboardOpen(false);
      } else if (onBack) {
        onBack();
      }
    }
  });
  return React.createElement("div", {
    className: "ino-protect-input-container"
  }, React.createElement("div", {
    className: "ino-protect-input-boxes"
  }, Array(count).fill(null).map(function (_, index) {
    return React.createElement("input", {
      key: index,
      ref: function ref(el) {
        return inputRefs.current[index] = el;
      },
      type: "text",
      maxLength: 1,
      value: values[index],
      onChange: function onChange(e) {
        return handleInputChange(index, e.target.value);
      },
      onFocus: function onFocus() {
        return handleInputFocus(index);
      },
      className: "ino-protect-input-box " + (values[index] ? 'filled' : '') + " " + (index === activeIndex && isActive ? 'active' : ''),
      readOnly: keyboard
    });
  })), keyboard && React.createElement(InoKeyboard, {
    isOpen: isKeyboardOpen,
    onClose: function onClose() {
      return setIsKeyboardOpen(false);
    },
    onChange: handleKeyboardChange,
    variant: "standard",
    layout: withLetters ? 'qwerty' : 'numeric'
  }));
};

var InoElementWrapper = function InoElementWrapper(_ref) {
  var children = _ref.children,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames;
  return React.createElement("div", {
    className: "ino-element-wrapper " + (isActive ? 'active' : '') + " " + classNames
  }, children);
};

var InoCol = function InoCol(_ref) {
  var children = _ref.children,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$infinite = _ref.infinite,
    infinite = _ref$infinite === void 0 ? false : _ref$infinite,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    onActiveChange = _ref.onActiveChange,
    _onUp = _ref.onUp,
    _onDown = _ref.onDown,
    onLeft = _ref.onLeft,
    onRight = _ref.onRight,
    onOk = _ref.onOk;
  var _useState = useState(0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var childrenArray = React.Children.toArray(children);
  useEffect(function () {
    if (isActive && onActiveChange) {
      onActiveChange(activeIndex);
    }
  }, [isActive, activeIndex, onActiveChange]);
  var handleNavigation = function handleNavigation(direction) {
    if (!isActive) return;
    setActiveIndex(function (prev) {
      if (direction === 'up') {
        if (prev === 0 && infinite) {
          return childrenArray.length - 1;
        }
        return Math.max(0, prev - 1);
      } else {
        if (prev === childrenArray.length - 1 && infinite) {
          return 0;
        }
        return Math.min(childrenArray.length - 1, prev + 1);
      }
    });
  };
  useMappedKeydown({
    isActive: isActive,
    onUp: function onUp(e) {
      if (activeIndex === 0 && !infinite && _onUp) {
        _onUp(e, activeIndex);
      } else {
        handleNavigation('up');
      }
    },
    onDown: function onDown(e) {
      if (activeIndex === childrenArray.length - 1 && !infinite && _onDown) {
        _onDown(e, activeIndex);
      } else {
        handleNavigation('down');
      }
    },
    onLeft: onLeft,
    onRight: onRight,
    onOk: onOk
  });
  return React.createElement("div", {
    className: "ino-col " + classNames
  }, React.Children.map(children, function (child, idx) {
    if (!React.isValidElement(child)) return child;
    if ('isActive' in child.props) {
      return React.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    return React.createElement(InoElementWrapper, {
      isActive: isActive && idx === activeIndex,
      index: idx
    }, child);
  }));
};

var hasInoColChildren = function hasInoColChildren(children) {
  return React.Children.toArray(children).some(function (child) {
    return React.isValidElement(child) && child.type === InoCol;
  });
};

var InoRow = function InoRow(_ref) {
  var children = _ref.children,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$infinite = _ref.infinite,
    infinite = _ref$infinite === void 0 ? false : _ref$infinite,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    onActiveChange = _ref.onActiveChange,
    onUp = _ref.onUp,
    onDown = _ref.onDown,
    _onLeft = _ref.onLeft,
    _onRight = _ref.onRight,
    onOk = _ref.onOk;
  var _useState = useState(0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var childrenArray = React.Children.toArray(children);
  var hasColChildren = hasInoColChildren(children);
  useEffect(function () {
    if (isActive && onActiveChange) {
      onActiveChange(activeIndex);
    }
  }, [isActive, activeIndex, onActiveChange]);
  var handleNavigation = function handleNavigation(direction) {
    if (!isActive || hasColChildren) return;
    setActiveIndex(function (prev) {
      if (direction === 'left') {
        if (prev === 0 && infinite) {
          return childrenArray.length - 1;
        }
        return Math.max(0, prev - 1);
      } else {
        if (prev === childrenArray.length - 1 && infinite) {
          return 0;
        }
        return Math.min(childrenArray.length - 1, prev + 1);
      }
    });
  };
  useMappedKeydown({
    isActive: isActive,
    onLeft: function onLeft(e) {
      if (hasColChildren) {
        _onLeft == null || _onLeft(e, activeIndex);
      } else if (activeIndex === 0 && !infinite && _onLeft) {
        _onLeft(e, activeIndex);
      } else {
        handleNavigation('left');
      }
    },
    onRight: function onRight(e) {
      if (hasColChildren) {
        _onRight == null || _onRight(e, activeIndex);
      } else if (activeIndex === childrenArray.length - 1 && !infinite && _onRight) {
        _onRight(e, activeIndex);
      } else {
        handleNavigation('right');
      }
    },
    onUp: onUp,
    onDown: onDown,
    onOk: onOk
  });
  return React.createElement("div", {
    className: "ino-row " + classNames
  }, React.Children.map(children, function (child, idx) {
    if (!React.isValidElement(child)) return child;
    if (child.type === InoCol) {
      console.log('child.type === InoCol');
      return React.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    if ('isActive' in child.props) {
      return React.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    return React.createElement(InoElementWrapper, {
      isActive: isActive && idx === activeIndex,
      index: idx
    }, child);
  }));
};

var InoTab = function InoTab(_ref) {
  var label = _ref.label,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$isSelected = _ref.isSelected,
    isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    index = _ref.index,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _onClick = _ref.onClick,
    onLeft = _ref.onLeft,
    onRight = _ref.onRight,
    onUp = _ref.onUp,
    onDown = _ref.onDown,
    onBack = _ref.onBack,
    _onMouseEnter = _ref.onMouseEnter;
  useMappedKeydown({
    isActive: isActive,
    onOk: _onClick,
    onBack: onBack,
    onLeft: onLeft,
    onRight: onRight,
    onUp: onUp,
    onDown: onDown,
    index: index
  });
  return React.createElement("div", {
    role: "tab",
    "aria-selected": isSelected,
    "aria-disabled": disabled,
    onClick: function onClick(e) {
      if (!disabled && _onClick) {
        _onClick(e, index);
      }
    },
    onMouseEnter: function onMouseEnter(e) {
      if (_onMouseEnter) {
        _onMouseEnter(e, index);
      }
    },
    className: "ino-tab ino-tab--" + variant + " ino-tab--" + size + " \n          " + (isActive ? 'ino-tab--active' : '') + " \n          " + (isSelected ? 'ino-tab--selected' : '') + " \n          " + (disabled ? 'ino-tab--disabled' : '') + " \n          " + classNames
  }, label);
};

var InoTabs = function InoTabs(_ref) {
  var children = _ref.children,
    _ref$selectedIndex = _ref.selectedIndex,
    selectedIndex = _ref$selectedIndex === void 0 ? 0 : _ref$selectedIndex,
    controlledActiveIndex = _ref.activeIndex,
    _ref$changeByOnOk = _ref.changeByOnOk,
    changeByOnOk = _ref$changeByOnOk === void 0 ? false : _ref$changeByOnOk,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$infinite = _ref.infinite,
    infinite = _ref$infinite === void 0 ? false : _ref$infinite,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    onChange = _ref.onChange,
    onActiveChange = _ref.onActiveChange;
  var _useState = useState(selectedIndex),
    selectedTabIndex = _useState[0],
    setSelectedTabIndex = _useState[1];
  var _useState2 = useState(controlledActiveIndex != null ? controlledActiveIndex : selectedIndex),
    activeTabIndex = _useState2[0],
    setActiveTabIndex = _useState2[1];
  var childrenArray = React.Children.toArray(children);
  useEffect(function () {
    setSelectedTabIndex(selectedIndex);
  }, [selectedIndex]);
  useEffect(function () {
    if (controlledActiveIndex !== undefined) {
      setActiveTabIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);
  var handleTabChange = function handleTabChange(index) {
    if (!changeByOnOk) {
      setSelectedTabIndex(index);
      onChange == null || onChange(index);
    }
    setActiveTabIndex(index);
    onActiveChange == null || onActiveChange(index);
  };
  var handleNavigation = function handleNavigation(direction) {
    var isBackward = direction === 'up' || direction === 'left';
    var newIndex = isBackward ? activeTabIndex === 0 && infinite ? childrenArray.length - 1 : Math.max(0, activeTabIndex - 1) : activeTabIndex === childrenArray.length - 1 && infinite ? 0 : Math.min(childrenArray.length - 1, activeTabIndex + 1);
    setActiveTabIndex(newIndex);
    onActiveChange == null || onActiveChange(newIndex);
  };
  useMappedKeydown({
    isActive: true,
    onLeft: function onLeft() {
      return direction === 'horizontal' && handleNavigation('left');
    },
    onRight: function onRight() {
      return direction === 'horizontal' && handleNavigation('right');
    },
    onUp: function onUp() {
      return direction === 'vertical' && handleNavigation('up');
    },
    onDown: function onDown() {
      return direction === 'vertical' && handleNavigation('down');
    },
    onOk: function onOk() {
      if (changeByOnOk) {
        setSelectedTabIndex(activeTabIndex);
        onChange == null || onChange(activeTabIndex);
      }
    }
  });
  return React.createElement("div", {
    className: "ino-tabs-container"
  }, React.createElement("div", {
    role: "tablist",
    className: "ino-tabs ino-tabs--" + direction + " ino-tabs--" + variant + " ino-tabs--" + size + " " + classNames
  }, React.Children.map(children, function (child, index) {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, _extends({}, child.props, {
        isActive: index === activeTabIndex,
        isSelected: index === selectedTabIndex,
        onClick: function onClick() {
          return handleTabChange(index);
        },
        variant: variant,
        size: size,
        index: index
      }));
    }
    return child;
  })), React.createElement("div", {
    className: "ino-tab-panels"
  }, React.Children.map(children, function (child, index) {
    if (React.isValidElement(child) && index === selectedTabIndex) {
      return React.createElement("div", {
        role: "tabpanel",
        className: "ino-tab-panel"
      }, child.props.children);
    }
    return null;
  })));
};

var toasts = [];
var listeners = [];
var notify = function notify(options) {
  var id = Math.random().toString(36).slice(2);
  var toast = {
    id: id,
    options: options
  };
  toasts = [].concat(toasts, [toast]);
  listeners.forEach(function (listener) {
    return listener(toasts);
  });
  if (options.duration !== 0) {
    setTimeout(function () {
      dismiss(id);
    }, options.duration || 3000);
  }
  return id;
};
var dismiss = function dismiss(id) {
  toasts = toasts.filter(function (toast) {
    return toast.id !== id;
  });
  listeners.forEach(function (listener) {
    return listener(toasts);
  });
};
var toast = {
  success: function success(message, options) {
    return notify(_extends({
      type: 'success',
      message: message
    }, options));
  },
  error: function error(message, options) {
    return notify(_extends({
      type: 'error',
      message: message
    }, options));
  },
  warning: function warning(message, options) {
    return notify(_extends({
      type: 'warning',
      message: message
    }, options));
  },
  info: function info(message, options) {
    return notify(_extends({
      type: 'info',
      message: message
    }, options));
  },
  dismiss: dismiss,
  subscribe: function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  }
};

var InoToast = function InoToast(_ref) {
  var message = _ref.message,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'info' : _ref$type,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? 'bottom' : _ref$position,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 3000 : _ref$duration,
    isVisible = _ref.isVisible,
    onClose = _ref.onClose,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames;
  useEffect(function () {
    if (isVisible && duration > 0) {
      var timer = setTimeout(function () {
        onClose == null || onClose();
      }, duration);
      return function () {
        return clearTimeout(timer);
      };
    }
    return function () {};
  }, [isVisible, duration, onClose]);
  if (!isVisible) return null;
  var toastContent = React.createElement("div", {
    className: "ino-toast ino-toast--" + type + " ino-toast--" + position + " " + classNames,
    role: "alert"
  }, React.createElement("div", {
    className: "ino-toast__content"
  }, message));
  // Create portal
  return ReactDOM.createPortal(toastContent, document.body);
};

var ToastProvider = function ToastProvider(_ref) {
  var children = _ref.children;
  var _useState = useState([]),
    toasts = _useState[0],
    setToasts = _useState[1];
  useEffect(function () {
    return toast.subscribe(setToasts);
  }, []);
  return React.createElement(React.Fragment, null, children, createPortal(React.createElement("div", {
    className: "ino-toast-container"
  }, toasts.map(function (toast) {
    return React.createElement(InoToast, {
      key: toast.id,
      message: toast.options.message,
      type: toast.options.type,
      position: toast.options.position,
      isVisible: true,
      onClose: function onClose() {
        return toast.dismiss(toast.id);
      }
    });
  })), document.body));
};

var InoText = function InoText(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'body' : _ref$variant,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'primary' : _ref$color,
    _ref$marquee = _ref.marquee,
    marquee = _ref$marquee === void 0 ? false : _ref$marquee,
    _ref$marqueeSpeed = _ref.marqueeSpeed,
    marqueeSpeed = _ref$marqueeSpeed === void 0 ? 50 : _ref$marqueeSpeed,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 1000 : _ref$delay,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 50 : _ref$gap;
  var containerRef = useRef(null);
  var contentRef = useRef(null);
  var _useState = useState(false),
    isOverflowing = _useState[0],
    setIsOverflowing = _useState[1];
  var _useState2 = useState(false),
    shouldAnimate = _useState2[0],
    setShouldAnimate = _useState2[1];
  var _useState3 = useState(0),
    contentWidth = _useState3[0],
    setContentWidth = _useState3[1];
  // Check if text overflows container
  useEffect(function () {
    var checkOverflow = function checkOverflow() {
      if (containerRef.current && contentRef.current) {
        var container = containerRef.current;
        var content = contentRef.current;
        var hasOverflow = content.scrollWidth > container.clientWidth;
        setIsOverflowing(hasOverflow);
        setContentWidth(content.scrollWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return function () {
      return window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);
  // Handle marquee animation start after delay
  useEffect(function () {
    var timeoutId;
    if (isOverflowing && marquee && isActive) {
      timeoutId = setTimeout(function () {
        setShouldAnimate(true);
      }, delay);
    } else {
      setShouldAnimate(false);
    }
    return function () {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOverflowing, marquee, isActive, delay]);
  var containerStyle = {
    '--content-width': contentWidth + "px",
    '--gap': gap + "px"
  };
  return React.createElement("div", {
    ref: containerRef,
    className: "\n        ino-text \n        ino-text--" + variant + " \n        ino-text--" + color + "\n        " + (isActive ? 'ino-text--active' : '') + "\n        " + (shouldAnimate ? 'ino-text--marquee' : '') + "\n        " + className + "\n      ",
    style: containerStyle
  }, React.createElement("div", {
    ref: contentRef,
    className: "ino-text__content",
    style: {
      animationDuration: marqueeSpeed + "s",
      whiteSpace: marquee ? 'nowrap' : 'normal'
    }
  }, React.createElement("span", {
    className: "ino-text__original"
  }, children), shouldAnimate && React.createElement("span", {
    className: "ino-text__duplicate",
    "aria-hidden": "true"
  }, children)));
};

export { InoButton, InoCol, InoInput, InoKeyboard, InoProtectInput, InoRow, InoTab, InoTabs, InoText, SIZES, ToastProvider, VARIANTS, toast, useMappedKeydown };
//# sourceMappingURL=ino-ui-tv.esm.js.map
