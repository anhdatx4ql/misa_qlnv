"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supplierGroupSuppliers = exports.SupplierGroupSuppliers = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Author: Phạm Văn Đạt(15/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp - nhóm nhà cung cấp
 */
var SupplierGroupSuppliers =
/*#__PURE__*/
function () {
  function SupplierGroupSuppliers() {
    _classCallCheck(this, SupplierGroupSuppliers);
  }

  _createClass(SupplierGroupSuppliers, [{
    key: "insert",

    /**
     * Author: Phạm Văn Đạt(25/12/2022)
     * Function: Thêm mới nhóm nhà cung cấp - nhà cung cấp
     * @param {*} data : Dữ liệu truyền vào
     */
    value: function insert(data) {
      var res;
      return regeneratorRuntime.async(function insert$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.SupplierGroupSupplierInserts, data));

            case 2:
              res = _context.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.data);

            case 7:
              console.log(res);
              console.log("thêm mới thất bại");

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return SupplierGroupSuppliers;
}();
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */


exports.SupplierGroupSuppliers = SupplierGroupSuppliers;
var supplierGroupSuppliers = new SupplierGroupSuppliers();
exports.supplierGroupSuppliers = supplierGroupSuppliers;