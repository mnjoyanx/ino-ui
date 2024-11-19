'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);

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
  var pressed = React.useRef({});
  var intervalRef = React.useRef(null);
  var handleKeydown = React.useCallback(function (e) {
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
  var handleKeyup = React.useCallback(function (e) {
    var key = e.key.toLowerCase();
    pressed.current[key] = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  React.useEffect(function () {
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
  var _useState = React.useState(value.length),
    cursorPosition = _useState[0],
    setCursorPosition = _useState[1];
  var contentRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var handleFocus = React.useCallback(function (e) {
    if (!disabled) {
      onFocus == null || onFocus(e, index);
    }
  }, [disabled, onFocus]);
  var handleClick = React.useCallback(function (e) {
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
  var updateCursorPosition = React.useCallback(function (direction) {
    setCursorPosition(function (prev) {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(value.length, prev + 1);
      }
    });
  }, [value.length]);
  var handleKeyPress = React.useCallback(function (e) {
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
  var handleNavigation = React.useCallback(function (direction) {
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
  React.useEffect(function () {
    if (contentRef.current && containerRef.current) {
      var container = containerRef.current;
      var content = contentRef.current;
      container.scrollLeft = content.scrollWidth;
    }
  }, [value]);
  React.useEffect(function () {
    setCursorPosition(value.length);
  }, [value]);
  var displayValue = type === 'password' ? '•'.repeat(value.length) : value;
  return React__default.createElement("div", {
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
  }, React__default.createElement("div", {
    ref: contentRef,
    className: "ino-input__content"
  }, displayValue.slice(0, cursorPosition), showCursor && isActive && React__default.createElement("span", {
    className: "ino-input__cursor"
  }, "|"), displayValue.slice(cursorPosition)), !displayValue && placeholder && !isActive && React__default.createElement("span", {
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
  return React__default.createElement("button", Object.assign({
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
  var _useState = React.useState(0),
    activeRow = _useState[0],
    setActiveRow = _useState[1];
  var _useState2 = React.useState(0),
    activeCol = _useState2[0],
    setActiveCol = _useState2[1];
  var _useState3 = React.useState(false),
    isShifted = _useState3[0],
    setIsShifted = _useState3[1];
  var _useState4 = React.useState(false),
    shiftLocked = _useState4[0],
    setShiftLocked = _useState4[1];
  var _useState5 = React.useState(0),
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
  React.useEffect(function () {
    var _keys$activeRow;
    if (onActiveKeyChange && (_keys$activeRow = keys[activeRow]) != null && _keys$activeRow[activeCol]) {
      onActiveKeyChange(keys[activeRow][activeCol]);
    }
  }, [activeRow, activeCol, keys, onActiveKeyChange]);
  var handleKeyPress = React.useCallback(function (key, action) {
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
  var handleNavigation = React.useCallback(function (direction) {
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
  return React__default.createElement("div", {
    className: "ino-keyboard-overlay " + classNames
  }, React__default.createElement("div", {
    className: "ino-keyboard ino-keyboard--" + variant
  }, React__default.createElement("div", {
    className: "ino-keyboard-keys"
  }, keys.map(function (row, rowIndex) {
    return React__default.createElement("div", {
      key: rowIndex,
      className: "ino-keyboard-row"
    }, row.map(function (key, colIndex) {
      return React__default.createElement(InoButton, {
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
  var _useState = React.useState(Array(count).fill('')),
    values = _useState[0],
    setValues = _useState[1];
  var inputRefs = React.useRef([]);
  var _useState2 = React.useState(0),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var _useState3 = React.useState(false),
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
  return React__default.createElement("div", {
    className: "ino-protect-input-container"
  }, React__default.createElement("div", {
    className: "ino-protect-input-boxes"
  }, Array(count).fill(null).map(function (_, index) {
    return React__default.createElement("input", {
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
  })), keyboard && React__default.createElement(InoKeyboard, {
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
  return React__default.createElement("div", {
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
  var _useState = React.useState(0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var childrenArray = React__default.Children.toArray(children);
  React.useEffect(function () {
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
  return React__default.createElement("div", {
    className: "ino-col " + classNames
  }, React__default.Children.map(children, function (child, idx) {
    if (!React__default.isValidElement(child)) return child;
    if ('isActive' in child.props) {
      return React__default.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    return React__default.createElement(InoElementWrapper, {
      isActive: isActive && idx === activeIndex,
      index: idx
    }, child);
  }));
};

var hasInoColChildren = function hasInoColChildren(children) {
  return React__default.Children.toArray(children).some(function (child) {
    return React__default.isValidElement(child) && child.type === InoCol;
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
  var _useState = React.useState(0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var childrenArray = React__default.Children.toArray(children);
  var hasColChildren = hasInoColChildren(children);
  React.useEffect(function () {
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
  return React__default.createElement("div", {
    className: "ino-row " + classNames
  }, React__default.Children.map(children, function (child, idx) {
    if (!React__default.isValidElement(child)) return child;
    if (child.type === InoCol) {
      console.log('child.type === InoCol');
      return React__default.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    if ('isActive' in child.props) {
      return React__default.cloneElement(child, _extends({}, child.props, {
        isActive: isActive && idx === activeIndex,
        index: idx
      }));
    }
    return React__default.createElement(InoElementWrapper, {
      isActive: isActive && idx === activeIndex,
      index: idx
    }, child);
  }));
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
    onActiveChange = _ref.onActiveChange,
    isActive = _ref.isActive;
  var _useState = React.useState(selectedIndex),
    selectedTabIndex = _useState[0],
    setSelectedTabIndex = _useState[1];
  var _useState2 = React.useState(controlledActiveIndex != null ? controlledActiveIndex : selectedIndex),
    activeTabIndex = _useState2[0],
    setActiveTabIndex = _useState2[1];
  var childrenArray = React__default.Children.toArray(children);
  React.useEffect(function () {
    setSelectedTabIndex(selectedIndex);
  }, [selectedIndex]);
  React.useEffect(function () {
    if (controlledActiveIndex !== undefined) {
      setActiveTabIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);
  var handleTabChange = function handleTabChange(index) {
    setActiveTabIndex(index);
    onActiveChange == null || onActiveChange(index);
    if (!changeByOnOk) {
      setSelectedTabIndex(index);
      onChange == null || onChange(index);
    }
  };
  var handleNavigation = function handleNavigation(direction) {
    var isBackward = direction === 'up' || direction === 'left';
    var newIndex = isBackward ? activeTabIndex === 0 && infinite ? childrenArray.length - 1 : Math.max(0, activeTabIndex - 1) : activeTabIndex === childrenArray.length - 1 && infinite ? 0 : Math.min(childrenArray.length - 1, activeTabIndex + 1);
    setActiveTabIndex(newIndex);
    onActiveChange == null || onActiveChange(newIndex);
    if (!changeByOnOk) {
      setSelectedTabIndex(newIndex);
      onChange == null || onChange(newIndex);
    }
  };
  useMappedKeydown({
    isActive: isActive,
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
  return React__default.createElement("div", {
    className: "ino-tabs-container ino-tabs-container--" + direction
  }, React__default.createElement("div", {
    role: "tablist",
    className: "ino-tabs ino-tabs--" + direction + " ino-tabs--" + variant + " ino-tabs--" + size + " " + classNames
  }, React__default.Children.map(children, function (child, index) {
    if (React__default.isValidElement(child)) {
      return React__default.cloneElement(child, _extends({}, child.props, {
        isActive: index === activeTabIndex,
        isSelected: index === selectedTabIndex,
        onClick: function onClick() {
          handleTabChange(index);
          setSelectedTabIndex(index);
          onChange == null || onChange(index);
        },
        variant: variant,
        size: size,
        index: index
      }));
    }
    return child;
  })), React__default.createElement("div", {
    className: "ino-tab-panels ino-tab-panels--" + direction
  }, React__default.Children.map(children, function (child, index) {
    if (React__default.isValidElement(child) && index === selectedTabIndex) {
      return React__default.createElement("div", {
        role: "tabpanel",
        className: "ino-tab-panel"
      }, child.props.children);
    }
    return null;
  })));
};

var ThemeProvider = function ThemeProvider(_ref) {
  var theme = _ref.theme,
    children = _ref.children;
  React.useEffect(function () {
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
  return React__default.createElement(React__default.Fragment, null, children);
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
  React.useEffect(function () {
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
  var toastContent = React__default.createElement("div", {
    className: "ino-toast ino-toast--" + type + " ino-toast--" + position + " " + classNames,
    role: "alert"
  }, React__default.createElement("div", {
    className: "ino-toast__content"
  }, message));
  // Create portal
  return ReactDOM__default.createPortal(toastContent, document.body);
};

var ToastProvider = function ToastProvider(_ref) {
  var children = _ref.children;
  var _useState = React.useState([]),
    toasts = _useState[0],
    setToasts = _useState[1];
  React.useEffect(function () {
    return toast.subscribe(setToasts);
  }, []);
  return React__default.createElement(React__default.Fragment, null, children, ReactDOM.createPortal(React__default.createElement("div", {
    className: "ino-toast-container"
  }, toasts.map(function (toast) {
    return React__default.createElement(InoToast, {
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
  var containerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var _useState = React.useState(false),
    isOverflowing = _useState[0],
    setIsOverflowing = _useState[1];
  var _useState2 = React.useState(false),
    shouldAnimate = _useState2[0],
    setShouldAnimate = _useState2[1];
  var _useState3 = React.useState(0),
    contentWidth = _useState3[0],
    setContentWidth = _useState3[1];
  // Check if text overflows container
  React.useEffect(function () {
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
  React.useEffect(function () {
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
  return React__default.createElement("div", {
    ref: containerRef,
    className: "\n        ino-text \n        ino-text--" + variant + " \n        ino-text--" + color + "\n        " + (isActive ? 'ino-text--active' : '') + "\n        " + (shouldAnimate ? 'ino-text--marquee' : '') + "\n        " + className + "\n      ",
    style: containerStyle
  }, React__default.createElement("div", {
    ref: contentRef,
    className: "ino-text__content",
    style: {
      animationDuration: marqueeSpeed + "s",
      whiteSpace: marquee ? 'nowrap' : 'normal'
    }
  }, React__default.createElement("span", {
    className: "ino-text__original"
  }, children), shouldAnimate && React__default.createElement("span", {
    className: "ino-text__duplicate",
    "aria-hidden": "true"
  }, children)));
};

var DefaultCheckbox = function DefaultCheckbox(_ref) {
  var isChecked = _ref.isChecked,
    isActive = _ref.isActive;
  return React__default.createElement("svg", {
    width: "2.4rem",
    height: "2.4rem",
    viewBox: "0 0 24 24",
    fill: "none"
  }, React__default.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "6",
    stroke: isChecked ? 'var(--ino-bg-primary)' : isActive ? 'var(--ino-bg-primary)' : 'var(--ino-border-secondary)',
    strokeWidth: "2",
    fill: isChecked ? 'var(--ino-bg-primary)' : 'white'
  }), isChecked && React__default.createElement("path", {
    d: "M7 12L10.5 15.5L17 9",
    stroke: "white",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
var CheckboxItem = function CheckboxItem(_ref2) {
  var _ref2$defaultChecked = _ref2.defaultChecked,
    defaultChecked = _ref2$defaultChecked === void 0 ? false : _ref2$defaultChecked,
    checked = _ref2.checked,
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
  var _useState = React.useState(defaultChecked),
    internalChecked = _useState[0],
    setInternalChecked = _useState[1];
  // Use checked prop if provided, otherwise use internal state
  var isChecked = checked !== undefined ? checked : internalChecked;
  var handleToggle = React.useCallback(function () {
    var newCheckedState = !isChecked;
    // Only update internal state if not controlled
    if (checked === undefined) {
      setInternalChecked(newCheckedState);
    }
    // Only call onChange if it exists
    onChange == null || onChange(newCheckedState);
  }, [isChecked, onChange, checked]);
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
  return React__default.createElement("div", {
    className: "ino-checkbox-item " + (isActive ? 'active' : '') + " " + (isRTL ? 'rtl' : '') + " " + classNames
  }, React__default.createElement("label", {
    className: "ino-checkbox-container"
  }, React__default.createElement("input", {
    type: "checkbox",
    checked: isChecked,
    onChange: handleToggle
  }), React__default.createElement("span", {
    className: "ino-checkmark"
  }, CustomIcon ? React__default.createElement(CustomIcon, {
    isChecked: isChecked,
    isActive: isActive
  }) : React__default.createElement(DefaultCheckbox, {
    isChecked: isChecked,
    isActive: isActive
  })), React__default.createElement("span", {
    className: "ino-label"
  }, label)));
};

var ModalPortal = function ModalPortal(_ref) {
  var children = _ref.children;
  var modalRoot = document.body;
  return ReactDOM.createPortal(children, modalRoot);
};
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
var Modal = function Modal(_ref2) {
  var isOpen = _ref2.isOpen,
    onClose = _ref2.onClose,
    title = _ref2.title,
    children = _ref2.children,
    _ref2$classNames = _ref2.classNames,
    classNames = _ref2$classNames === void 0 ? '' : _ref2$classNames,
    okBtnText = _ref2.okBtnText,
    onOk = _ref2.onOk,
    cancelBtnText = _ref2.cancelBtnText,
    onCancel = _ref2.onCancel,
    _ref2$showCloseIcon = _ref2.showCloseIcon,
    showCloseIcon = _ref2$showCloseIcon === void 0 ? false : _ref2$showCloseIcon,
    _ref2$closeOnOverlayC = _ref2.closeOnOverlayClick,
    closeOnOverlayClick = _ref2$closeOnOverlayC === void 0 ? true : _ref2$closeOnOverlayC,
    _onMouseEnter = _ref2.onMouseEnter,
    _onMouseLeave = _ref2.onMouseLeave,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'small' : _ref2$size;
  var _useState = React.useState(0),
    activeButtonIndex = _useState[0],
    setActiveButtonIndex = _useState[1];
  var handleClose = React.useCallback(function () {
    onClose();
  }, [onClose]);
  var handlePrimaryAction = React.useCallback(function () {
    if (onOk) {
      onOk();
    } else {
      handleClose();
    }
  }, [onOk, handleClose]);
  var handleOverlayClick = React.useCallback(function (e) {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  }, [closeOnOverlayClick, handleClose]);
  var handleSecondaryAction = React.useCallback(function () {
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
  return React__default.createElement(ModalPortal, null, React__default.createElement("div", {
    className: "ino-modal-overlay " + classNames,
    onClick: handleOverlayClick
  }, React__default.createElement("div", {
    className: "ino-modal ino-modal--" + size
  }, React__default.createElement("div", {
    className: "ino-modal-header"
  }, React__default.createElement("h2", {
    className: "ino-modal-title"
  }, title), showCloseIcon && React__default.createElement("button", {
    className: "ino-modal-close",
    onClick: handleClose
  }, "\xD7")), React__default.createElement("div", {
    className: "ino-modal-content"
  }, children), (okBtnText || cancelBtnText) && React__default.createElement("div", {
    className: "ino-modal-footer"
  }, cancelBtnText && React__default.createElement(InoButton, {
    index: 0,
    isActive: activeButtonIndex === 0,
    variant: "outline",
    size: "small",
    onClick: handleSecondaryAction,
    onMouseEnter: function onMouseEnter(e, index) {
      setActiveButtonIndex(0);
      if (_onMouseEnter) _onMouseEnter(e, index);
    },
    onMouseLeave: function onMouseLeave(e, index) {
      if (_onMouseLeave) _onMouseLeave(e, index);
    }
  }, cancelBtnText), okBtnText && React__default.createElement(InoButton, {
    index: 1,
    isActive: activeButtonIndex === 1,
    variant: "primary",
    size: "small",
    classNames: "ok-btn",
    onClick: handlePrimaryAction,
    onMouseEnter: function onMouseEnter(e, index) {
      setActiveButtonIndex(1);
      if (_onMouseEnter) _onMouseEnter(e, index);
    },
    onMouseLeave: function onMouseLeave(e, index) {
      if (_onMouseLeave) _onMouseLeave(e, index);
    }
  }, okBtnText)))));
};

var InoListItem = function InoListItem(_ref) {
  var children = _ref.children,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    icon = _ref.icon,
    rightContent = _ref.rightContent,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    index = _ref.index,
    _onClick = _ref.onClick,
    onUp = _ref.onUp,
    onDown = _ref.onDown,
    onLeft = _ref.onLeft,
    onOk = _ref.onOk,
    onRight = _ref.onRight;
  useMappedKeydown({
    isActive: isActive,
    onOk: onOk,
    onUp: onUp,
    onDown: onDown,
    onLeft: onLeft,
    onRight: onRight
  });
  return React__default.createElement("div", {
    className: "ino-list-item " + (isActive ? 'active' : '') + " " + (disabled ? 'disabled' : '') + " " + className,
    onClick: function onClick(e) {
      return !disabled && (_onClick == null ? void 0 : _onClick(e, index));
    },
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled
  }, icon && React__default.createElement("div", {
    className: "ino-list-item__icon"
  }, icon), React__default.createElement("div", {
    className: "ino-list-item__content"
  }, children), rightContent && React__default.createElement("div", {
    className: "ino-list-item__right"
  }, rightContent));
};

var InoSidebar = function InoSidebar(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    selectedId = _ref.selectedId,
    _ref$collapsed = _ref.collapsed,
    collapsed = _ref$collapsed === void 0 ? false : _ref$collapsed,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? 'left' : _ref$position,
    onSelect = _ref.onSelect,
    _onUp = _ref.onUp,
    _onDown = _ref.onDown,
    onRight = _ref.onRight,
    onLeft = _ref.onLeft;
  var _useState = React.useState(0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var classes = ['ino-sidebar', "ino-sidebar--" + position, collapsed && 'collapsed', classNames].filter(Boolean).join(' ');
  useMappedKeydown({
    isActive: isActive,
    onUp: function onUp(e) {
      if (activeIndex === 0) {
        _onUp == null || _onUp(e, activeIndex);
      } else {
        setActiveIndex(function (prev) {
          return Math.max(0, prev - 1);
        });
      }
    },
    onDown: function onDown(e) {
      if (activeIndex === items.length - 1) {
        _onDown == null || _onDown(e, activeIndex);
      } else {
        setActiveIndex(function (prev) {
          return Math.min(items.length - 1, prev + 1);
        });
      }
    },
    onLeft: onLeft,
    onRight: onRight,
    onOk: function onOk() {
      var selectedItem = items[activeIndex];
      if (selectedItem && !selectedItem.disabled) {
        onSelect == null || onSelect(selectedItem);
      }
    }
  });
  return React__default.createElement("aside", {
    className: classes
  }, items.map(function (item, index) {
    return React__default.createElement("div", {
      key: item.id,
      onMouseEnter: function onMouseEnter() {
        return setActiveIndex(index);
      },
      className: ['ino-sidebar-item', selectedId === item.id && 'selected', isActive && activeIndex === index && 'active', item.disabled && 'disabled'].filter(Boolean).join(' '),
      onClick: function onClick() {
        return !item.disabled && (onSelect == null ? void 0 : onSelect(item));
      }
    }, React__default.createElement("div", {
      className: "ino-sidebar-item__icon"
    }, item.icon), !collapsed && React__default.createElement("div", {
      className: "ino-sidebar-item__content"
    }, React__default.createElement("span", {
      className: "ino-sidebar-item__label"
    }, item.label)));
  }));
};

var InoSkeleton = function InoSkeleton(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    height = _ref.height,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'rectangular' : _ref$variant,
    _ref$textVariant = _ref.textVariant,
    textVariant = _ref$textVariant === void 0 ? 'body' : _ref$textVariant,
    _ref$animation = _ref.animation,
    animation = _ref$animation === void 0 ? 'pulse' : _ref$animation,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$borderRadius = _ref.borderRadius,
    borderRadius = _ref$borderRadius === void 0 ? 0.4 : _ref$borderRadius;
  var getWidth = function getWidth() {
    if (typeof width === 'number') return width + "rem";
    return width;
  };
  var getHeight = function getHeight() {
    if (typeof height === 'number') return height + "rem";
    return height;
  };
  var classes = ['ino-skeleton', "ino-skeleton--" + variant, "ino-skeleton--animation-" + animation, variant === 'text' && "ino-skeleton--" + textVariant, className].filter(Boolean).join(' ');
  return React__default.createElement("div", {
    className: classes,
    style: _extends({
      width: getWidth(),
      height: variant === 'text' ? undefined : getHeight(),
      borderRadius: variant === 'circular' ? '50%' : borderRadius + "rem"
    }, style),
    "aria-label": "Loading...",
    role: "progressbar"
  });
};

var InoSkeletonListItem = function InoSkeletonListItem(_ref) {
  var _ref$avatarSize = _ref.avatarSize,
    avatarSize = _ref$avatarSize === void 0 ? 5 : _ref$avatarSize,
    _ref$lines = _ref.lines,
    lines = _ref$lines === void 0 ? 3 : _ref$lines,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  return React__default.createElement("div", {
    className: "ino-skeleton-wrapper " + className
  }, React__default.createElement(InoSkeleton, {
    variant: "circular",
    width: avatarSize,
    height: avatarSize
  }), React__default.createElement("div", {
    className: "ino-skeleton--text-container"
  }, Array(lines).fill(0).map(function (_, index) {
    return React__default.createElement(InoSkeleton, {
      key: index,
      variant: "text",
      height: 1.6,
      animation: "wave"
    });
  })));
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
  return React__default.createElement("div", {
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

var SvgArrowUp = function SvgArrowUp() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React__default.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React__default.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React__default.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React__default.createElement("path", {
    d: "M12 6V18M12 6L7 11M12 6L17 11",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var SvgArrowDown = function SvgArrowDown() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React__default.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React__default.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React__default.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React__default.createElement("path", {
    d: "M12 6V18M12 18L7 13M12 18L17 13",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var ScrollView = function ScrollView(_ref) {
  var children = _ref.children,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    onReachBottom = _ref.onReachBottom,
    onStartScroll = _ref.onStartScroll,
    onEndScroll = _ref.onEndScroll,
    onDown = _ref.onDown,
    onUp = _ref.onUp,
    onOk = _ref.onOk,
    onBack = _ref.onBack,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    _ref$scrollStep = _ref.scrollStep,
    scrollStep = _ref$scrollStep === void 0 ? 50 : _ref$scrollStep,
    _ref$showIndicators = _ref.showIndicators,
    showIndicators = _ref$showIndicators === void 0 ? true : _ref$showIndicators;
  var scrollRef = React.useRef(null);
  var _useState = React.useState(false),
    showTopIndicator = _useState[0],
    setShowTopIndicator = _useState[1];
  var _useState2 = React.useState(true),
    showBottomIndicator = _useState2[0],
    setShowBottomIndicator = _useState2[1];
  var _useState3 = React.useState(false),
    isScrolling = _useState3[0],
    setIsScrolling = _useState3[1];
  var scrollTimeout = React.useRef();
  var handleScroll = React.useCallback(function () {
    if (!scrollRef.current) return;
    var _scrollRef$current = scrollRef.current,
      scrollTop = _scrollRef$current.scrollTop,
      scrollHeight = _scrollRef$current.scrollHeight,
      clientHeight = _scrollRef$current.clientHeight;
    // Show/hide scroll indicators
    setShowTopIndicator(scrollTop > 0);
    setShowBottomIndicator(scrollTop + clientHeight < scrollHeight);
    // Handle scroll start/end
    if (!isScrolling) {
      setIsScrolling(true);
      onStartScroll == null || onStartScroll();
    }
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(function () {
      setIsScrolling(false);
      onEndScroll == null || onEndScroll();
      // Check if reached bottom
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        onReachBottom == null || onReachBottom();
      }
    }, 150);
  }, [isScrolling, onStartScroll, onEndScroll, onReachBottom]);
  var scrollUp = React.useCallback(function (e) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      top: -scrollStep,
      behavior: 'smooth'
    });
    if (scrollRef.current.scrollTop === 0) {
      onUp == null || onUp(e);
    }
  }, [scrollStep, onUp]);
  var scrollDown = React.useCallback(function (e) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      top: scrollStep,
      behavior: 'smooth'
    });
    var _scrollRef$current2 = scrollRef.current,
      scrollTop = _scrollRef$current2.scrollTop,
      scrollHeight = _scrollRef$current2.scrollHeight,
      clientHeight = _scrollRef$current2.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      onDown == null || onDown(e);
    }
  }, [scrollStep, onDown]);
  useKeydown({
    isActive: isActive,
    up: scrollUp,
    down: scrollDown,
    ok: onOk,
    back: onBack
  });
  React.useEffect(function () {
    return function () {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);
  return React__default.createElement("div", {
    className: "ino-scroll-view-container " + classNames
  }, showIndicators && showTopIndicator && React__default.createElement("div", {
    className: "ino-scroll-indicator ino-scroll-indicator--top"
  }, React__default.createElement(SvgArrowUp, null)), React__default.createElement("div", {
    ref: scrollRef,
    className: "ino-scroll-view-content",
    onScroll: handleScroll
  }, children), showIndicators && showBottomIndicator && React__default.createElement("div", {
    className: "ino-scroll-indicator ino-scroll-indicator--bottom"
  }, React__default.createElement(SvgArrowDown, null)));
};

var InoPlayerProgress = function InoPlayerProgress(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    _ref$buffered = _ref.buffered,
    buffered = _ref$buffered === void 0 ? 0 : _ref$buffered,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    onChange = _ref.onChange,
    onDragStart = _ref.onDragStart,
    onDragEnd = _ref.onDragEnd,
    _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? '' : _ref$classNames,
    _ref$showTooltip = _ref.showTooltip,
    showTooltip = _ref$showTooltip === void 0 ? true : _ref$showTooltip,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 0 : _ref$duration;
  var _useState = React.useState(false),
    isDragging = _useState[0],
    setIsDragging = _useState[1];
  var _useState2 = React.useState(0),
    tooltipPosition = _useState2[0],
    setTooltipPosition = _useState2[1];
  var _useState3 = React.useState(0),
    tooltipTime = _useState3[0],
    setTooltipTime = _useState3[1];
  var progressRef = React.useRef(null);
  var formatTime = function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return minutes + ":" + remainingSeconds.toString().padStart(2, '0');
  };
  var handleMouseMove = function handleMouseMove(e) {
    if (!progressRef.current) return;
    var rect = progressRef.current.getBoundingClientRect();
    var position = (e.clientX - rect.left) / rect.width;
    var clampedPosition = Math.max(0, Math.min(1, position));
    setTooltipPosition(clampedPosition * 100);
    setTooltipTime(duration * clampedPosition);
    if (isDragging) {
      onChange == null || onChange(clampedPosition * 100);
    }
  };
  var handleMouseDown = function handleMouseDown(e) {
    setIsDragging(true);
    onDragStart == null || onDragStart();
    handleMouseMove(e);
  };
  var handleMouseUp = function handleMouseUp() {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd == null || onDragEnd();
    }
  };
  React__default.useEffect(function () {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
    return function () {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging]);
  return React__default.createElement("div", {
    ref: progressRef,
    className: "\n                ino-player-progress \n                " + (isActive ? 'ino-player-progress--active' : '') + "\n                " + (isDragging ? 'ino-player-progress--dragging' : '') + "\n                " + classNames + "\n            ",
    onMouseMove: handleMouseMove,
    onMouseDown: handleMouseDown,
    onMouseLeave: function onMouseLeave() {
      return !isDragging && setTooltipPosition(-1);
    }
  }, React__default.createElement("div", {
    className: "ino-player-progress__buffered",
    style: {
      width: buffered + "%"
    }
  }), React__default.createElement("div", {
    className: "ino-player-progress__value",
    style: {
      width: value + "%"
    }
  }), showTooltip && tooltipPosition >= 0 && React__default.createElement("div", {
    className: "ino-player-progress__tooltip",
    style: {
      left: tooltipPosition + "%"
    }
  }, formatTime(tooltipTime)), React__default.createElement("div", {
    className: "ino-player-progress__handle",
    style: {
      left: value + "%"
    }
  }));
};

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
    _onClick = _ref.onClick,
    show = _ref.show,
    listType = _ref.listType,
    style = _ref.style,
    classNames = _ref.classNames;
  if (!show) return null;
  var getPositionStyles = function getPositionStyles() {
    var _ref3;
    if (listType === 'horizontal') {
      var _ref2;
      return _ref2 = {}, _ref2[direction === 'start' ? 'left' : 'right'] = 0, _ref2;
    }
    return _ref3 = {}, _ref3[direction === 'start' ? 'top' : 'bottom'] = 0, _ref3;
  };
  return React__default.createElement("div", {
    onClick: function onClick(e) {
      return _onClick(e);
    },
    style: _extends({}, ARROW_STYLES, getPositionStyles(), style),
    className: "ino-list-arrow ino-list-arrow-" + direction + " " + (classNames || '')
  }, React__default.createElement("span", {
    className: "ino-list-arrow-icon"
  }, icon));
};

var SvgArrowLeft = function SvgArrowLeft() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React__default.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React__default.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React__default.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React__default.createElement("path", {
    d: "M6 12H18M6 12L11 7M6 12L11 17",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var SvgArrowRight = function SvgArrowRight() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    width: "2.4rem",
    height: "2.4rem"
  }, React__default.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: "0"
  }), React__default.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React__default.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, ' ', React__default.createElement("path", {
    d: "M6 12H18M18 12L13 7M18 12L13 17",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), ' '));
};

var TRANSFORM_TIMEOUT = null;
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
 *   items={Array(50).fill('Item')}
 * />
 * ```
 */
var ListView = /*#__PURE__*/React.memo(function (_ref) {
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
    _ref$withTitle = _ref.withTitle,
    withTitle = _ref$withTitle === void 0 ? false : _ref$withTitle,
    _ref$rowGap = _ref.rowGap,
    rowGap = _ref$rowGap === void 0 ? 0 : _ref$rowGap,
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
    items = _ref.items,
    _ref$arrows = _ref.arrows,
    arrows = _ref$arrows === void 0 ? {
      show: false,
      startIcon: '←',
      endIcon: '→',
      style: {},
      classNames: ''
    } : _ref$arrows,
    _ref$edgeScroll = _ref.edgeScroll,
    edgeScroll = _ref$edgeScroll === void 0 ? {
      enabled: false,
      interval: 700,
      startDelay: 1000
    } : _ref$edgeScroll,
    _ref$onOk = _ref.onOk,
    onOk = _ref$onOk === void 0 ? function () {} : _ref$onOk;
  var scrollViewRef = React.useRef(null);
  var _useState = React.useState(0),
    startIndex = _useState[0],
    setStartIndex = _useState[1];
  var _useState2 = React.useState(initialActiveIndex),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var _useState3 = React.useState(false),
    showStartArrow = _useState3[0],
    setShowStartArrow = _useState3[1];
  var _useState4 = React.useState(false),
    showEndArrow = _useState4[0],
    setShowEndArrow = _useState4[1];
  var _useState5 = React.useState(false),
    isAutoScrolling = _useState5[0],
    setIsAutoScrolling = _useState5[1];
  var autoScrollIntervalRef = React.useRef(null);
  var autoScrollTimeoutRef = React.useRef(null);
  var changeStartIndex = React.useCallback(function (index) {
    index -= startScrollIndex;
    if (index > itemsTotal - itemsCount) index = itemsTotal - itemsCount;
    if (index < 0) index = 0;
    setStartIndex(index);
  }, [itemsTotal, itemsCount, startScrollIndex]);
  React.useEffect(function () {
    setInitialActiveIndex(initialActiveIndex);
  }, [id]);
  var setInitialActiveIndex = function setInitialActiveIndex(index) {
    setActiveIndex(index);
    changeStartIndex(index);
  };
  var scrollToIndex = React.useCallback(function (index) {
    setActiveIndex(index);
    changeStartIndex(index);
    // Trigger a re-render to update the transform
    setTimeout(function () {
      setStartIndex(function (prevStartIndex) {
        return prevStartIndex;
      });
    }, 0);
  }, [changeStartIndex]);
  var next = function next(e, count) {
    if (count === void 0) {
      count = 1;
    }
    setActiveIndex(function (index) {
      if (index === itemsTotal - 1) {
        listType === 'horizontal' ? requestAnimationFrame(function () {
          return onRight(e, count);
        }) : requestAnimationFrame(function () {
          return onDown(e, count);
        });
      } else {
        index += count;
        if (index > itemsTotal - 1) index = itemsTotal - 1;
      }
      changeStartIndex(index);
      return index;
    });
  };
  var prev = function prev(e, count) {
    if (count === void 0) {
      count = 1;
    }
    setActiveIndex(function (index) {
      if (index === 0) {
        listType === 'horizontal' ? requestAnimationFrame(function () {
          return onLeft(e, count);
        }) : requestAnimationFrame(function () {
          return onUp(e, count);
        });
      } else {
        index -= count;
        if (index < 0) index = 0;
      }
      changeStartIndex(index);
      return index;
    });
  };
  var _back = React.useCallback(function (e) {
    if (onBackScrollIndex !== null) {
      scrollToIndex(onBackScrollIndex);
    } else {
      scrollToIndex(0); // Scroll to the first element
    }
    requestAnimationFrame(function () {
      return onBack(e);
    });
  }, [onBackScrollIndex, scrollToIndex, onBack]);
  var onMouseEnterItem = React.useCallback(function (e, index) {
    setActiveIndex(index);
    onMouseEnter(e, index);
  }, [onMouseEnter]);
  var getItemStyle = React.useCallback(function (index) {
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
  var renderItems = React.useCallback(function () {
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
          item: items[i],
          onUp: onUp,
          onDown: onDown,
          onLeft: onLeft,
          onRight: onRight,
          onMouseEnter: function onMouseEnter(e) {
            return onMouseEnterItem(e, i);
          }
        };
        items.push(renderItem(itemProps));
      }
    };
    for (var i = start; i < end; i++) {
      _loop(i);
    }
    return items;
  }, [startIndex, buffer, itemsCount, itemsTotal, uniqueKey, getItemStyle, activeIndex, isActive, onUp, onDown, onLeft, onRight, onMouseEnterItem, renderItem, items]);
  React.useEffect(function () {
    var applyTransform = function applyTransform() {
      if (!scrollViewRef.current) return;
      var verticalSpacing = itemHeight + rowGap;
      var transform = listType === 'horizontal' ? "translate3d(" + (direction === 'ltr' ? '-' : '') + startIndex * (itemWidth + (gap || 0)) + "rem, 0, 0)" : "translate3d(0, -" + startIndex * verticalSpacing + "rem, 0)";
      scrollViewRef.current.style.transform = transform;
      scrollViewRef.current.style.webkitTransform = transform;
      window.dispatchEvent(new Event('transformstart'));
      clearTimeout(TRANSFORM_TIMEOUT);
      TRANSFORM_TIMEOUT = setTimeout(function () {
        return window.dispatchEvent(new Event('transformend'));
      }, 500);
    };
    applyTransform();
  }, [startIndex, listType, direction, itemWidth, itemHeight, gap, withTitle]);
  React.useEffect(function () {
    if (arrows.show) {
      setShowStartArrow(startIndex > 0);
      setShowEndArrow(startIndex < itemsTotal - itemsCount);
    }
  }, [startIndex, itemsTotal, itemsCount, arrows.show]);
  // const handleOk = useCallback(() => {
  //   onOk(items[activeIndex], activeIndex);
  // }, [onOk, items, activeIndex]);
  var handleOk = function handleOk() {
    onOk(items[activeIndex], activeIndex);
  };
  var keyDownOptions = React.useMemo(function () {
    return {
      isActive: isActive && nativeControle,
      left: function left(e) {
        return listType === 'horizontal' && prev(e, itemsCount);
      },
      right: function right(e) {
        return listType === 'horizontal' && next(e, itemsCount);
      },
      up: function up(e) {
        return listType !== 'horizontal' && prev(e, itemsCount);
      },
      down: function down(e) {
        return listType !== 'horizontal' && next(e, itemsCount);
      },
      channel_up: function channel_up(e) {
        return prev(e, itemsCount);
      },
      channel_down: function channel_down(e) {
        return next(e, itemsCount);
      },
      back: function back(e) {
        return _back(e);
      },
      ok: handleOk,
      debounce: debounce
    };
  }, [isActive, nativeControle, listType, prev, next, itemsCount, _back, handleOk, debounce]);
  useKeydown(keyDownOptions);
  var parentStyle = React.useMemo(function () {
    var _ref3;
    return _ref3 = {}, _ref3[listType === 'horizontal' ? 'height' : 'width'] = (listType === 'horizontal' ? itemHeight : itemWidth) + "rem", _ref3;
  }, [listType, itemHeight, itemWidth]);
  React.useEffect(function () {
    return function () {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);
  var startAutoScroll = React.useCallback(function (direction, e) {
    if (isAutoScrolling) return;
    setIsAutoScrolling(true);
    var scrollFn = direction === 'prev' ? prev : next;
    // Add initial delay before starting to scroll
    autoScrollTimeoutRef.current = setTimeout(function () {
      // Initial scroll
      scrollFn(e);
      // Continue scrolling while hovering
      autoScrollIntervalRef.current = setInterval(function () {
        scrollFn(e);
      }, edgeScroll.interval);
    }, edgeScroll.startDelay);
  }, [isAutoScrolling, prev, next, edgeScroll.interval, edgeScroll.startDelay]);
  var stopAutoScroll = React.useCallback(function () {
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
  return React__default.createElement("div", {
    className: "scroll-view-parent " + listType,
    style: parentStyle
  }, edgeScroll.enabled && startIndex > 0 && React__default.createElement("div", {
    className: "edge-scroll-zone edge-scroll-zone-start",
    style: _extends({}, hoverZoneStyles, listType === 'horizontal' ? {
      left: 0
    } : {
      top: 0
    }),
    onMouseEnter: function onMouseEnter(e) {
      return startAutoScroll('prev', e);
    },
    onMouseLeave: stopAutoScroll
  }), edgeScroll.enabled && startIndex < itemsTotal - itemsCount && React__default.createElement("div", {
    className: "edge-scroll-zone edge-scroll-zone-end",
    style: _extends({}, hoverZoneStyles, listType === 'horizontal' ? {
      right: 0
    } : {
      bottom: 0
    }),
    onMouseEnter: function onMouseEnter(e) {
      return startAutoScroll('next', e);
    },
    onMouseLeave: stopAutoScroll
  }), React__default.createElement(NavigationArrow, {
    direction: "start",
    icon: listType === 'horizontal' ? arrows.startIcon || React__default.createElement(SvgArrowLeft, null) : arrows.startIcon || React__default.createElement(SvgArrowUp, null),
    onClick: function onClick(e) {
      return prev(e);
    },
    show: arrows.show && showStartArrow,
    listType: listType,
    style: arrows.style,
    classNames: arrows.classNames
  }), React__default.createElement(NavigationArrow, {
    direction: "end",
    icon: listType === 'horizontal' ? arrows.endIcon || React__default.createElement(SvgArrowRight, null) : arrows.endIcon || React__default.createElement(SvgArrowDown, null),
    onClick: function onClick(e) {
      return next(e);
    },
    show: arrows.show && showEndArrow,
    listType: listType,
    style: arrows.style,
    classNames: arrows.classNames
  }), React__default.createElement("div", {
    className: "scroll-view list-view " + (direction === 'rtl' ? 'rtl-list-view' : ''),
    ref: scrollViewRef
  }, renderItems()));
});

var TRANSFORM_TIMEOUT$1 = 800;
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
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   debounce={200}
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
var GridView = /*#__PURE__*/React.memo(function (_ref) {
  var id = _ref.id,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? 'list-' : _ref$uniqueKey,
    _ref$nativeControle = _ref.nativeControle,
    nativeControle = _ref$nativeControle === void 0 ? false : _ref$nativeControle,
    _ref$scrollOffset = _ref.scrollOffset,
    scrollOffset = _ref$scrollOffset === void 0 ? 0 : _ref$scrollOffset,
    _ref$rowItemsCount = _ref.rowItemsCount,
    rowItemsCount = _ref$rowItemsCount === void 0 ? 5 : _ref$rowItemsCount,
    rowCount = _ref.rowCount,
    _ref$bufferStart = _ref.bufferStart,
    bufferStart = _ref$bufferStart === void 0 ? 0 : _ref$bufferStart,
    _ref$bufferEnd = _ref.bufferEnd,
    bufferEnd = _ref$bufferEnd === void 0 ? 0 : _ref$bufferEnd,
    itemWidth = _ref.itemWidth,
    itemHeight = _ref.itemHeight,
    isActive = _ref.isActive,
    _ref$initialActiveInd = _ref.initialActiveIndex,
    initialActiveIndex = _ref$initialActiveInd === void 0 ? 0 : _ref$initialActiveInd,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'ltr' : _ref$direction,
    _ref$debounce = _ref.debounce,
    debounce = _ref$debounce === void 0 ? 200 : _ref$debounce,
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
    data = _ref.data,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 1 : _ref$gap,
    _ref$rowGap = _ref.rowGap,
    rowGap = _ref$rowGap === void 0 ? gap : _ref$rowGap;
  var scrollViewRef = React.useRef(null);
  var _useState = React.useState(0),
    startRow = _useState[0],
    setStartRow = _useState[1];
  var _useState2 = React.useState(initialActiveIndex),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var containerRef = React.useRef(null);
  var _useState3 = React.useState(function () {
      var DEFAULT_ROW_ITEMS = 5;
      var DEFAULT_ITEM_WIDTH = 25;
      var DEFAULT_ITEM_HEIGHT = 25;
      return {
        itemWidth: itemWidth || DEFAULT_ITEM_WIDTH,
        itemHeight: itemHeight || DEFAULT_ITEM_HEIGHT,
        rowItems: rowItemsCount || DEFAULT_ROW_ITEMS,
        rows: rowCount || Math.ceil(data.length / (rowItemsCount || DEFAULT_ROW_ITEMS))
      };
    }),
    dimensions = _useState3[0],
    setDimensions = _useState3[1];
  var changeStartRow = React.useCallback(function (index) {
    var startScrollRow = 2;
    var currentRow = Math.ceil((index + 1) / rowItemsCount);
    var row = currentRow - startScrollRow;
    if (row < 0) row = 0;
    setStartRow(row);
  }, [rowItemsCount]);
  React.useEffect(function () {
    setActiveIndex(initialActiveIndex);
    changeStartRow(initialActiveIndex);
  }, [id, initialActiveIndex, changeStartRow]);
  var left = React.useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev % rowItemsCount === 0) {
        requestAnimationFrame(function () {
          return onLeft == null ? void 0 : onLeft(prev);
        });
      } else {
        prev--;
      }
      return prev;
    });
  }, [rowItemsCount, onLeft]);
  var right = React.useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev % rowItemsCount === rowItemsCount - 1 || prev === data.length - 1) {
        requestAnimationFrame(function () {
          return onRight == null ? void 0 : onRight(prev);
        });
      } else {
        prev++;
      }
      return prev;
    });
  }, [rowItemsCount, data.length, onRight]);
  var up = React.useCallback(function () {
    setActiveIndex(function (prev) {
      if (prev < rowItemsCount) {
        requestAnimationFrame(function () {
          return onUp == null ? void 0 : onUp(prev);
        });
      } else {
        prev -= rowItemsCount;
      }
      changeStartRow(prev);
      return prev;
    });
  }, [rowItemsCount, onUp, changeStartRow]);
  var down = React.useCallback(function () {
    setActiveIndex(function (prev) {
      if (Math.ceil((prev + 1) / rowItemsCount) === Math.ceil(data.length / rowItemsCount)) {
        requestAnimationFrame(function () {
          return onDown == null ? void 0 : onDown(prev);
        });
      } else {
        prev += rowItemsCount;
        if (prev > data.length - 1) prev = data.length - 1;
      }
      changeStartRow(prev);
      return prev;
    });
  }, [rowItemsCount, data.length, onDown, changeStartRow]);
  var ok = React.useCallback(function () {
    onOk == null || onOk(data[activeIndex], activeIndex);
  }, [onOk, data, activeIndex]);
  var back = React.useCallback(function () {
    onBack == null || onBack(activeIndex);
  }, [onBack, activeIndex]);
  var onMouseEnterItem = React.useCallback(function (index) {
    setActiveIndex(index);
    onMouseEnter(index);
  }, [onMouseEnter]);
  // Calculate dimensions based on container and data
  React.useEffect(function () {
    var calculateDimensions = function calculateDimensions() {
      var DEFAULT_ROW_ITEMS = 5;
      var DEFAULT_ITEM_WIDTH = 15;
      var DEFAULT_ITEM_HEIGHT = 15;
      // Calculate dimensions based on data length
      var totalItems = data.length;
      // Use provided rowItemsCount or default
      var calculatedRowItems = rowItemsCount || DEFAULT_ROW_ITEMS;
      // Calculate rows based on total items and items per row
      var calculatedRows = rowCount || Math.ceil(totalItems / calculatedRowItems);
      // Use provided dimensions or defaults
      var calculatedItemWidth = itemWidth || DEFAULT_ITEM_WIDTH;
      var calculatedItemHeight = itemHeight || DEFAULT_ITEM_HEIGHT;
      setDimensions({
        itemWidth: calculatedItemWidth,
        itemHeight: calculatedItemHeight,
        rowItems: calculatedRowItems,
        rows: calculatedRows
      });
    };
    calculateDimensions();
  }, [itemWidth, itemHeight, rowItemsCount, rowCount, data.length]);
  // Use calculated dimensions in render logic
  var getItemStyle = React.useCallback(function (index) {
    var _ref2;
    var vIndex = Math.floor(index / dimensions.rowItems);
    var hIndex = index % dimensions.rowItems;
    return _ref2 = {
      position: 'absolute',
      width: dimensions.itemWidth + "rem",
      height: dimensions.itemHeight + "rem",
      top: vIndex * (dimensions.itemHeight + rowGap) + "rem"
    }, _ref2[direction === 'rtl' ? 'right' : 'left'] = hIndex * (dimensions.itemWidth + gap) + "rem", _ref2;
  }, [dimensions, gap, rowGap, direction]);
  var renderItems = React.useCallback(function () {
    var items = [];
    // Guard against invalid dimensions
    if (!dimensions.rowItems) {
      console.warn('Invalid rowItems in dimensions:', dimensions);
      return items;
    }
    var visibleStart = Math.max(0, startRow * dimensions.rowItems - dimensions.rowItems * bufferStart);
    var visibleEnd = Math.min(data.length, startRow * dimensions.rowItems + dimensions.rowItems * dimensions.rows + dimensions.rowItems * bufferEnd);
    var _loop = function _loop(i) {
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
    };
    for (var i = visibleStart; i < visibleEnd; i++) {
      _loop(i);
    }
    return items;
  }, [startRow, bufferStart, bufferEnd, dimensions.rowItems, dimensions.rows, data.length, uniqueKey, getItemStyle, activeIndex, isActive, data, onMouseEnterItem, renderItem]);
  React.useEffect(function () {
    var applyTransform = function applyTransform() {
      if (!scrollViewRef.current) return;
      var offset = startRow * (dimensions.itemHeight + rowGap);
      var currentRow = Math.ceil((activeIndex + 1) / dimensions.rowItems);
      if (currentRow > 1) {
        offset += scrollOffset;
      }
      var transform = "translate3d(0, -" + offset + "rem, 0)";
      scrollViewRef.current.style.transform = transform;
      scrollViewRef.current.style.webkitTransform = transform;
      window.dispatchEvent(new Event('transformstart'));
      setTimeout(function () {
        return window.dispatchEvent(new Event('transformend'));
      }, TRANSFORM_TIMEOUT$1);
      onChangeRow(currentRow);
    };
    React.startTransition(function () {
      applyTransform();
    });
  }, [activeIndex, startRow, dimensions.itemHeight, dimensions.rowItems, scrollOffset, onChangeRow, rowGap]);
  var keyDownOptions = React.useMemo(function () {
    return {
      isActive: isActive && nativeControle,
      debounce: debounce,
      left: left,
      right: right,
      up: up,
      down: down,
      back: back,
      ok: ok
    };
  }, [isActive, nativeControle, left, right, up, down, back, onOk, debounce]);
  useKeydown(keyDownOptions);
  React.useEffect(function () {
    setStartRow(0);
  }, [data]);
  return React__default.createElement("div", {
    ref: containerRef,
    className: "scroll-view-parent",
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: "scroll-view grid-view",
    ref: scrollViewRef
  }, renderItems()));
});

var _excluded$1 = ["rowsCount", "rowGap", "data", "withTitle", "isActive", "onRowChange", "onUp", "onDown"];
var ListGridView = function ListGridView(_ref) {
  var rowsCount = _ref.rowsCount,
    _ref$rowGap = _ref.rowGap,
    rowGap = _ref$rowGap === void 0 ? 1 : _ref$rowGap,
    data = _ref.data,
    _ref$withTitle = _ref.withTitle,
    withTitle = _ref$withTitle === void 0 ? false : _ref$withTitle,
    isActive = _ref.isActive,
    _ref$onRowChange = _ref.onRowChange,
    onRowChange = _ref$onRowChange === void 0 ? function () {} : _ref$onRowChange,
    _ref$onUp = _ref.onUp,
    onUp = _ref$onUp === void 0 ? function () {} : _ref$onUp,
    _ref$onDown = _ref.onDown,
    onDown = _ref$onDown === void 0 ? function () {} : _ref$onDown,
    listViewProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var _useState = React.useState(0),
    activeIndex = _useState[0];
  var currentList = React.useMemo(function () {
    return Array.isArray(data) ? data : [];
  }, [data]);
  var itemsTotal = currentList.length;
  var itemsPerRow = React.useMemo(function () {
    return Math.ceil(itemsTotal / rowsCount);
  }, [itemsTotal, rowsCount]);
  var _useState2 = React.useState(0),
    currentRow = _useState2[0],
    setCurrentRow = _useState2[1];
  useKeydown({
    isActive: isActive,
    down: function down(e) {
      if (!(currentList != null && currentList.length)) {
        if (onDown) {
          onDown(e);
        }
        return;
      }
      setCurrentRow(function (prev) {
        return Math.min(prev + 1, rowsCount - 1);
      });
    },
    up: function up(e) {
      if (currentRow > 0) {
        setCurrentRow(function (prev) {
          return prev - 1;
        });
      } else {
        if (onUp) {
          onUp(e);
        }
      }
    },
    debounce: listViewProps.debounce || 200
  });
  var getRowStyle = React.useCallback(function (index) {
    return {
      position: 'absolute',
      width: listViewProps.itemWidth * itemsPerRow + "rem",
      height: listViewProps.itemHeight + "rem",
      top: index * (listViewProps.itemHeight + rowGap) + "rem"
    };
  }, [listViewProps.itemWidth, listViewProps.itemHeight, itemsPerRow, rowGap]);
  var renderRowItems = React.useCallback(function (_ref2) {
    var item = _ref2.item,
      index = _ref2.index,
      isActive = _ref2.isActive;
    return React__default.createElement("div", {
      key: index,
      style: getRowStyle(index)
    }, withTitle ? React__default.createElement("div", {
      className: "ino-list-title-wrapper"
    }, React__default.createElement("h3", {
      className: "ino-list-title"
    }, item.name)) : null, React__default.createElement(ListView, Object.assign({}, listViewProps, {
      items: item.list,
      id: index + "-list-view",
      uniqueKey: index + "-list-view",
      listType: "horizontal",
      itemsTotal: item.list.length,
      itemsCount: listViewProps.itemsCount || 1,
      buffer: listViewProps.buffer || 3,
      debounce: listViewProps.debounce || 200,
      itemWidth: listViewProps.itemWidth || 20,
      itemHeight: listViewProps.itemHeight || 30,
      gap: listViewProps.gap || 0,
      rowGap: rowGap || 0,
      withTitle: withTitle,
      isActive: isActive && currentRow === index,
      renderItem: listViewProps.renderItem,
      nativeControle: true
    })));
  }, [getRowStyle, listViewProps.renderItem, withTitle, activeIndex, currentRow]);
  return React__default.createElement(ListView, {
    id: activeIndex + "-list-grid-view",
    uniqueKey: activeIndex + "-list-grid-view",
    itemWidth: listViewProps.itemWidth,
    itemHeight: listViewProps.itemHeight,
    items: currentList,
    listType: "vertical",
    itemsCount: itemsPerRow,
    itemsTotal: itemsTotal,
    nativeControle: true,
    isActive: isActive,
    debounce: listViewProps.debounce || 200,
    buffer: currentList.length,
    gap: listViewProps.gap,
    rowGap: rowGap,
    renderItem: function renderItem(_ref3) {
      var index = _ref3.index,
        item = _ref3.item,
        style = _ref3.style;
      return renderRowItems({
        key: index,
        index: index,
        item: item,
        style: style,
        isActive: isActive,
        onMouseEnter: function onMouseEnter() {
          var row = Math.floor(index / itemsPerRow);
          setCurrentRow(row);
          onRowChange(row);
        }
      });
    }
  });
};

exports.CheckboxItem = CheckboxItem;
exports.GridView = GridView;
exports.InoButton = InoButton;
exports.InoCol = InoCol;
exports.InoInput = InoInput;
exports.InoKeyboard = InoKeyboard;
exports.InoListItem = InoListItem;
exports.InoPlayerProgress = InoPlayerProgress;
exports.InoProtectInput = InoProtectInput;
exports.InoRow = InoRow;
exports.InoSidebar = InoSidebar;
exports.InoSkeleton = InoSkeleton;
exports.InoSkeletonListItem = InoSkeletonListItem;
exports.InoTab = InoTab;
exports.InoTabs = InoTabs;
exports.InoText = InoText;
exports.ListGridView = ListGridView;
exports.ListView = ListView;
exports.Modal = Modal;
exports.SIZES = SIZES;
exports.ScrollView = ScrollView;
exports.ThemeProvider = ThemeProvider;
exports.ToastProvider = ToastProvider;
exports.VARIANTS = VARIANTS;
exports.toast = toast;
exports.useMappedKeydown = useMappedKeydown;
//# sourceMappingURL=ino-ui-tv.cjs.development.js.map
