"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positions = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var endPoint = _endPoint.END_POINTS.Positions;
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: class xử lý các nghiệp vụ phòng ban
 */

var Positions =
/*#__PURE__*/
function () {
  /**
   * @param {Field} data 
   */
  function Positions(data) {
    _classCallCheck(this, Positions);

    this.data = data;
  }
  /**
   * Author: Phạm Văn Đạt(21/10/2022)
   * Function: Xử lý lấy các bản ghi đầu tiên trong bảng chức danh
   */


  _createClass(Positions, [{
    key: "getRecords",
    value: function getRecords() {
      var res;
      return regeneratorRuntime.async(function getRecords$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("a");
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _BaseController.getAll)(endPoint));

            case 3:
              res = _context.sent;

              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data;
              } else {
                console.log(res);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Positions;
}();
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: khởi tạo đối tượng xử lý vị trí
 */


var positions = new Positions();
exports.positions = positions;