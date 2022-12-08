"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Author: Phạm Văn Đạt(25/10/2022)
 * FUnction: xử lý tooltip
 */
var _default = {
  updateTooltip: function updateTooltip(el, _ref) {
    var value = _ref.value,
        modifiers = _ref.modifiers;

    if (typeof value === "string") {
      // we can pass either a string
      el.setAttribute("data-v-tooltip", value); // this check if when v-tooltip receives string with .arrow modifier

      if (modifiers.arrow) {
        el.style.setProperty("--v-tooltip-arrow-display", "inline");
      }
    } else {
      // or an object
      if (value.text) {
        el.setAttribute("data-v-tooltip", value.text);
      }

      if (value.displayArrow || modifiers.arrow) {
        // if there is a prop global: true then mutate the :root css variables
        // otherwise it adds given variables to the element, which makes it possible to be different than others
        var targetEl = value.global ? document.documentElement : el;
        targetEl.style.setProperty("--v-tooltip-arrow-display", "inline");
      }

      if (value.theme) {
        // if there is a prop global: true then mutate the :root css variables
        // otherwise it adds given variables to the element, which makes it possible to be different than others
        var _targetEl = value.global ? document.documentElement : el;

        for (var _i = 0, _Object$entries = Object.entries(value.theme); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              val = _Object$entries$_i[1];

          if (key === "placement") {
            switch (val) {
              case "top":
                _targetEl.style.setProperty("--v-tooltip-left", "50%");

                _targetEl.style.setProperty("--v-tooltip-top", "0%");

                _targetEl.style.setProperty("--v-tooltip-translate", "translate(-50%, -110%)");

                if (value.displayArrow || modifiers.arrow) {
                  _targetEl.style.setProperty("--v-tooltip-arrow-border-color", "var(--v-tooltip-background-color) transparent transparent transparent");

                  _targetEl.style.setProperty("--v-tooltip-arrow-top", "calc(var(--v-tooltip-top) - var(--v-tooltip-top-offset) + 8px)");
                }

                break;

              case "bottom":
                _targetEl.style.setProperty("--v-tooltip-left", "50%");

                _targetEl.style.setProperty("--v-tooltip-top", "100%");

                _targetEl.style.setProperty("--v-tooltip-translate", "translate(-50%, 10%)");

                if (value.displayArrow || modifiers.arrow) {
                  _targetEl.style.setProperty("--v-tooltip-arrow-border-color", "transparent transparent var(--v-tooltip-background-color) transparent");

                  _targetEl.style.setProperty("--v-tooltip-arrow-top", "calc(var(--v-tooltip-top) - var(--v-tooltip-top-offset) - 7px)");
                }

                break;

              case "left":
                _targetEl.style.setProperty("--v-tooltip-left", "0%");

                _targetEl.style.setProperty("--v-tooltip-top", "50%");

                _targetEl.style.setProperty("--v-tooltip-translate", "translate(-110%, -50%)");

                if (value.displayArrow || modifiers.arrow) {
                  _targetEl.style.setProperty("--v-tooltip-arrow-border-color", "transparent transparent transparent var(--v-tooltip-background-color)");

                  _targetEl.style.setProperty("--v-tooltip-arrow-top", "calc(var(--v-tooltip-top)");

                  _targetEl.style.setProperty("--v-tooltip-arrow-left", "calc( var(--v-tooltip-left) - var(--v-tooltip-left-offset) + 1.5px)");
                }

                break;

              case "right":
                _targetEl.style.setProperty("--v-tooltip-left", "100%");

                _targetEl.style.setProperty("--v-tooltip-top", "50%");

                _targetEl.style.setProperty("--v-tooltip-translate", "translate(10%, -50%)");

                if (value.displayArrow || modifiers.arrow) {
                  _targetEl.style.setProperty("--v-tooltip-arrow-border-color", "transparent var(--v-tooltip-background-color) transparent  transparent");

                  _targetEl.style.setProperty("--v-tooltip-arrow-top", "calc(var(--v-tooltip-top)");

                  _targetEl.style.setProperty("--v-tooltip-arrow-left", "calc( var(--v-tooltip-left) - var(--v-tooltip-left-offset) - 2px)");
                }

                break;

              case "bottom-right":
                _targetEl.style.setProperty("--v-tooltip-right", "-100%");

                _targetEl.style.setProperty("--v-tooltip-top", "65%");

                _targetEl.style.setProperty("--v-tooltip-translate", "translate(-75%, 50%)");

                if (value.displayArrow || modifiers.arrow) {
                  _targetEl.style.setProperty("--v-tooltip-arrow-border-color", "transparent var(--v-tooltip-background-color) transparent  transparent");

                  _targetEl.style.setProperty("--v-tooltip-arrow-top", "calc(var(--v-tooltip-top)");

                  _targetEl.style.setProperty("--v-tooltip-arrow-left", "calc( var(--v-tooltip-left) - var(--v-tooltip-left-offset) - 2px)");
                }

                break;

              default:
                break;
            }
          } else if (key === "offset" && !value.global) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var direction = _step.value;

                if (direction === "left") {
                  _targetEl.style.setProperty("--v-tooltip-left-offset", "-".concat(_targetEl.scrollWidth - _targetEl.clientWidth, "px"));
                } else if (direction === "right") {
                  _targetEl.style.setProperty("--v-tooltip-left-offset", "".concat(_targetEl.scrollWidth - _targetEl.clientWidth, "px"));
                } else if (direction === "top") {
                  _targetEl.style.setProperty("--v-tooltip-top-offset", "-".concat(_targetEl.scrollHeight - _targetEl.clientHeight, "px"));
                } else if (direction === "bottom") {
                  _targetEl.style.setProperty("--v-tooltip-top-offset", "".concat(_targetEl.scrollHeight - _targetEl.clientHeight, "px"));
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          } else {
            _targetEl.style.setProperty("--v-tooltip-".concat(key), val);
          }
        }
      }
    }
  },
  // hooks
  mounted: function mounted(el, _ref2) {
    var value = _ref2.value,
        dir = _ref2.dir,
        modifiers = _ref2.modifiers;

    // v-tooltips with global prop won't show the tooltip
    // also object notation without text prop won't show neither
    if (_typeof(value) === "object" && !value.global && value.text) {
      el.classList.add("data-v-tooltip");
    } else if (typeof value === "string") {
      el.classList.add("data-v-tooltip");
    } // to use functions in Vue's directives which are inside this object, we can't use this, we have to use dir, which is the directive object


    dir.updateTooltip(el, {
      value: value,
      modifiers: modifiers
    });
  },
  updated: function updated(el, _ref3) {
    var value = _ref3.value,
        dir = _ref3.dir,
        modifiers = _ref3.modifiers;
    dir.updateTooltip(el, {
      value: value,
      modifiers: modifiers
    });
  }
};
exports["default"] = _default;