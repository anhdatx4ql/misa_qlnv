"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.address = exports.Address = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Author: Phạm Văn Đạt(21/12/2022)
 * Function: xử lý lấy địa chỉ Việt Nam
 */
var Address =
/*#__PURE__*/
function () {
  function Address() {
    _classCallCheck(this, Address);
  }

  _createClass(Address, [{
    key: "getAllProvince",

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: lấy danh sách tỉnh/ thành phố
     */
    value: function getAllProvince() {
      return regeneratorRuntime.async(function getAllProvince$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("https://provinces.open-api.vn/api/").then(function (res) {
                return res;
              })["catch"](function (e) {
                console.log(e);
              }));

            case 3:
              return _context.abrupt("return", _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: lấy danh sách quận/huyện
     */

  }, {
    key: "getAllDistricts",
    value: function getAllDistricts(code) {
      return regeneratorRuntime.async(function getAllDistricts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("https://provinces.open-api.vn/api/p/" + code + "?depth=2").then(function (res) {
                return res;
              })["catch"](function (e) {
                console.log(e);
              }));

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
    /**
    * Author: Phạm Văn Đạt(21/12/2022)
    * Function: lấy danh sách các phường
    */

  }, {
    key: "getAllWards",
    value: function getAllWards(code) {
      return regeneratorRuntime.async(function getAllWards$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("https://provinces.open-api.vn/api/d/" + code + "?depth=2").then(function (res) {
                return res;
              })["catch"](function (e) {
                console.log(e);
              }));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
  }]);

  return Address;
}();
/**
 * Author: Phạm Văn Đạt(22/12/2022)
 * Function: khởi tạo đối tượng để thao tác
 */


exports.Address = Address;
var address = new Address();
exports.address = address;