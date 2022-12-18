"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suppliers = exports.Suppliers = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp
 */
var Suppliers =
/*#__PURE__*/
function () {
  // khởi tạo giá trị
  function Suppliers(data) {
    var keyword = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var currentPageNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var totalCount = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, Suppliers);

    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }
  /**
    * Author: Phạm Văn Đạt(17/122022)
    * Function: phân trang dữ liệu
    * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhà cung cấp
    * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
    * @param {*} pageSize : số bản ghi trên trang
    */


  _createClass(Suppliers, [{
    key: "pagingSuppliers",
    value: function pagingSuppliers(data) {
      var dataKeyword, newData, res;
      return regeneratorRuntime.async(function pagingSuppliers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataKeyword = []; // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt

              if (this.keyword) {
                console.log(this.keyword);
                dataKeyword.push({
                  name: "supplierCode",
                  operator: "like",
                  value: this.keyword,
                  typeOperator: "like",
                  stringConcatenation: "OR"
                }, {
                  name: "supplierName",
                  operator: "like",
                  value: this.keyword,
                  typeOperator: "like",
                  stringConcatenation: "OR"
                });
              }

              newData = _toConsumableArray(data);

              if (dataKeyword != []) {
                newData.push.apply(newData, dataKeyword);
              }

              console.log(newData);
              _context.next = 7;
              return regeneratorRuntime.awrap((0, _BaseController.paging)(_endPoint.END_POINTS.PagingSuppliers, this.currentPageNumber, this.pageSize, newData));

            case 7:
              res = _context.sent;

              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data.data;
                this.totalCount = res.data.totalCount;
              } else {
                console.log(res);
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Author: Phạm Văn Đạt(17/12/2022)
     * Function: Thêm mới nhà cung cấp
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "insertEmployee",
    value: function insertEmployee(data) {
      var res;
      return regeneratorRuntime.async(function insertEmployee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.Suppliers, data));

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
    /**
     * Author: Phạm Văn Đạt(03/11/2022)
     * Function: Xử lý update nhà cung cấp
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "updateEmployee",
    value: function updateEmployee(data) {
      var res;
      return regeneratorRuntime.async(function updateEmployee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.updateRecord)(_endPoint.END_POINTS.Suppliers, data));

            case 2:
              res = _context3.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.data);

            case 7:
              console.log("thêm mới thất bại");

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return Suppliers;
}(); // khởi tạo đối tượng thao tác với nhà cung cấp


exports.Suppliers = Suppliers;
var suppliers = new Suppliers();
exports.suppliers = suppliers;