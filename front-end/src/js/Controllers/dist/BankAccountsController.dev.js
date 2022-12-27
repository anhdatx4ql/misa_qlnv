"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bankAccounts = exports.BankAccounts = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Author: Phạm Văn Đạt(21/12/2022)
 * Function: Class lưu thông tin các tài khoản ngân hàng
 */
var BankAccounts =
/*#__PURE__*/
function () {
  // khởi tạo giá trị
  function BankAccounts(data) {
    _classCallCheck(this, BankAccounts);

    this.data = data;
  }
  /**
   * Author: Phạm Văn Đạt(21/12/2022)
   * Function: lấy danh sách dữ liệu theo id truyền vào
   * @param {*} data : Dữ liệu truyền vào
   */


  _createClass(BankAccounts, [{
    key: "getDataByIds",
    value: function getDataByIds(data) {
      var res;
      return regeneratorRuntime.async(function getDataByIds$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.getDataByIds)(_endPoint.END_POINTS.GetBankAccounts, data));

            case 2:
              res = _context.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context.next = 9;
                break;
              }

              if (!res.data) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.data.data);

            case 6:
              return _context.abrupt("return", []);

            case 9:
              console.log(res);
              console.log("lấy danh sách khách hàng thất bại!");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    }
    /**
    * Author: Phạm Văn Đạt(25/12/2022)
    * Function: Thêm mới nhóm nhà cung cấp
    * @param {*} data : Dữ liệu truyền vào
    */

  }, {
    key: "insert",
    value: function insert(data) {
      var res;
      return regeneratorRuntime.async(function insert$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.BankAccountsInserts, data));

            case 2:
              res = _context2.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.data);

            case 7:
              console.log(res);
              console.log("thêm mới thất bại");

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return BankAccounts;
}();

exports.BankAccounts = BankAccounts;
var bankAccounts = new BankAccounts();
exports.bankAccounts = bankAccounts;