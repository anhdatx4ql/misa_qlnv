"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.departments = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var endPoint = _endPoint.END_POINTS.Departments;
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: class xử lý các nghiệp vụ phòng ban
 */

var Departments =
/*#__PURE__*/
function () {
  /**
   * @param {Field} data 
   */
  function Departments(data) {
    _classCallCheck(this, Departments);

    this.data = data;
  }
  /**
   * Author: Phạm Văn Đạt(21/10/2022)
   * Function: Xử lý lấy các bản ghi đầu tiên trong bảng phòng ban
   */


  _createClass(Departments, [{
    key: "getRecords",
    value: function getRecords() {
      var res;
      return regeneratorRuntime.async(function getRecords$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.getAll)(endPoint));

            case 2:
              res = _context.sent;

              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data;
              } else {
                console.log(res);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Departments;
}();
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: khởi tạo đối tượng xử lý phòng ban
 */


var departments = new Departments();
exports.departments = departments;