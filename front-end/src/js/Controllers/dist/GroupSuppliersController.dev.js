"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.groupSuppliers = exports.GroupSuppliers = exports.groupSupplierModel = void 0;

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
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view nhóm nhà cung cấp, khách hàng
 */
var groupSupplierModel = {
  //  id nhóm nhà cung cấp, KH
  groupSupplierID: null,
  // mã nhóm NCC,KH
  groupSupplierCode: null,
  // Tên nhóm NCC, KH
  groupSupplierName: null,
  // Thông tin chi tiết nhóm khách hàng
  groupSupplierDescription: null,
  // id nhóm cha
  parentGroupSupplierId: null
};
/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp
 */

exports.groupSupplierModel = groupSupplierModel;

var GroupSuppliers =
/*#__PURE__*/
function () {
  // khởi tạo giá trị
  function GroupSuppliers(data, currentData) {
    var keyword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var currentPageNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var pageSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
    var totalCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var countLoadData = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    _classCallCheck(this, GroupSuppliers);

    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.currentData = data;
    this.countLoadData = countLoadData;
  }
  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhóm nhà cung cấp
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */


  _createClass(GroupSuppliers, [{
    key: "pagingGroupSupplier",
    value: function pagingGroupSupplier(data) {
      var dataKeyword, newData, lengthCurrentData, res;
      return regeneratorRuntime.async(function pagingGroupSupplier$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataKeyword = []; // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt

              if (this.keyword) {
                console.log(this.keyword);
                dataKeyword.push({
                  name: "groupSupplierCode",
                  operator: "like",
                  value: this.keyword,
                  typeOperator: "like",
                  stringConcatenation: "OR"
                }, {
                  name: "groupSupplierName",
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

              lengthCurrentData = this.currentData ? this.currentData.length : -1;

              if (this.countLoadData > 0) {
                this.currentPageNumber = this.currentPageNumber + 1;
              } // nếu số bản ghi hiện tại <= tổng số bản ghi => tăng số trang hiện tại lên 1 và load lại. Nếu không thì thôi


              if (!(lengthCurrentData != this.totalCount)) {
                _context.next = 12;
                break;
              }

              // tăng số lần load lên 1
              this.countLoadData++; // gọi đến paging basecontroler

              _context.next = 10;
              return regeneratorRuntime.awrap((0, _BaseController.paging)(_endPoint.END_POINTS.PagingGroupSuppliers, this.currentPageNumber, this.pageSize, newData));

            case 10:
              res = _context.sent;

              // kiểm tra data trả về
              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data.data; // nếu load dữ liệu thành công

                if (res.data.data != []) {
                  if (this.currentData == undefined) {
                    this.currentData = _toConsumableArray(res.data.data);
                  } else {
                    this.currentData = [].concat(_toConsumableArray(this.currentData), _toConsumableArray(res.data.data));
                  } // load thành công

                } else {
                  // không có dữ liệu
                  this.currentPageNumber--;
                }

                this.totalCount = res.data.totalCount;
              } else {
                console.log(res);
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Author: Phạm Văn Đạt(17/12/2022)
     * Function: Thêm mới nhóm nhà cung cấp
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "insertGroupSuppliers",
    value: function insertGroupSuppliers(data) {
      var res;
      return regeneratorRuntime.async(function insertGroupSuppliers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.GroupSuppliers, data));

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
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Lấy mã code mới nhất
     * @returns trả về dữ liệu nếu thành công.
     */

  }, {
    key: "getMaxCode",
    value: function getMaxCode() {
      var res;
      return regeneratorRuntime.async(function getMaxCode$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.getMaxCode)(_endPoint.END_POINTS.GroupSuppliersMaxCode));

            case 2:
              res = _context3.sent;

              if (!(res.statusCode == _constants.STATUS_CODES.Code200)) {
                _context3.next = 8;
                break;
              }

              console.log(res.data);
              return _context3.abrupt("return", res.data);

            case 8:
              console.log(res);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return GroupSuppliers;
}();
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */


exports.GroupSuppliers = GroupSuppliers;
var groupSuppliers = new GroupSuppliers();
/**
 * Author: Phạm Văn Đạt(26/12/2022)
 * Function: Reset dữ liệu
 */

exports.groupSuppliers = groupSuppliers;

function reset(object) {
  try {
    // let newCode = await groupSuppliers.getMaxCode();
    // if (newCode) {
    //   object.groupSupplierCode = newCode;
    // }
    // lưu giá trị object null
    Object.keys(object).forEach(function (key) {
      // if(key != "groupSupplierCode")
      // các thuộc tính khác trả về null
      object[key] = null;
    });
    console.log(object);
    return object;
  } catch (e) {
    console.log(e);
  }
}