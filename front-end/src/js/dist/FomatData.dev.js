"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatDate = FormatDate;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Xử lý format dữ liệu
 */

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Xử lý format ngày tháng năm
 * @param {*} value ngày tháng năm đưa vào
 * @returns 
 */
function FormatDate(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
  return (0, _moment["default"])(value).format(type);
}