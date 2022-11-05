"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatDate = FormatDate;
exports.LowerCaseFirst = LowerCaseFirst;
exports.TitleCase = TitleCase;

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
 * @returns ngày tháng sau khi format
 */
function FormatDate(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD";
  return (0, _moment["default"])(value).format(type);
}
/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Xử lý chuyển chữ đầu thành chữ thường
 * @param {*} string Chuỗi string đưa vào
 * @returns Chuỗi sau khi bỏ in hoa chữ đầu
 */


function LowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
/**
 * Author: Phạm Văn Đạt(04/11/2022)
 * Function: Xử lý in hoa chữ cái đầu tiên
 */


function TitleCase(string) {
  if (string != null) {
    //1. Tách các từ, cụm từ trong chuỗi ban đầu
    var sentence = string.toLowerCase().split(" "); //2. Tạo vòng lặp và viết hoa chữ cái đầu tiên của các từ, cụm từ trên

    if (sentence.length > 0) {
      for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
      } //3. Nối các từ, cụm từ đã xử lý ở trên và trả về kết quả


      return sentence.join(" ");
    }
  }

  return string;
}