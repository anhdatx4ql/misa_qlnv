"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suppliers = exports.Suppliers = exports.supplierModel = void 0;

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
 * Author: Phạm Văn Đạt(19/12/2022)
 * Function: Model view nhà cung cấp
 */
var supplierModel = {
  supplierID: null,
  /// Mã nhà cung cấp
  supplierCode: null,
  /// Tên nhà cung cấp
  supplierName: null,
  /// Mã số thuế
  taxCode: null,
  /// Địa chỉ
  supplierAddress: null,
  /// Số điện thoại bàn
  supplierMobile: null,
  /// Website
  website: null,
  /// id nhân viên bán hàng
  employeeId: null,
  /// Xưng hô
  supplierVocativeName: null,
  /// Họ và tên liên hệ
  supplierNameContact: null,
  /// Họ và tên liên hệ
  supplierEmailContact: null,
  /// Số điện thoại người liên hệ
  supplierPhoneNumberContact: null,
  /// đại diện theo pháp luật
  legaRrepresentative: null,
  /// id điều khoản thanh toán
  rulePaymentId: null,
  /// Số ngày được nợ
  dayOwed: 0,
  /// số nợ tối đa
  debitAmountMax: 0,
  /// công nợ
  debt: 0,
  /// id tài khoản công nợ phải trả
  accountPayableId: null,
  /// ghi chú
  supplierDescription: null,
  /// quốc gia nơi ở
  supplierCountry: null,
  /// tỉnh/thành phố nơi ở
  supplierCity: null,
  /// quận/huyện phố nơi ở
  supplierDistrict: null,
  /// xã/phường phố nơi ở
  supplierWard: null,
  /// tài khoản hoạt động ( 0 - hoạt động, 1-ngừng hoạt đọng)
  isActive: false,
  /// là khách hàng(0- không phải khách hàng, 1- là khách hàng)
  isCustomer: false,
  /// là tổ chức( 0 - là cá nhân, 1 - là tổ chức)
  isOrganization: false,
  /// danh sách id của tài khoản ngân hàng
  bankAccountIds: null,
  /// danh sách  các địa chỉ giao hàng của nhà cung cấp
  deliveryAddress: null,
  /// số tiền đã thanh toán
  paid: 0,
  /// Số CMND
  idNo: null,
  /// Ngày cấp
  issueOn: null,
  /// nơi cấp
  placeOfIssue: null,
  /// Họ và tên người nhận hóa đơn điện tử
  userNameElectronicBill: null,
  /// email người nhận hóa đơn điện tử
  userEmailElectronicBill: null,
  /// số điện thoại
  userMobileElectronicBill: null,
  /// Id tài khoản công nợ phải thu
  accountReceivableId: null,
  /// Tên tài khoản công nợ phải thu
  accountReceivableName: null,
  /// Số tài khoản công nợ phải thu
  accountReceivableNumber: null,
  /// Tên điều khoản thanh toán
  rulePaymentName: null,
  /// Tên tài khoản công nợ phải trả
  accountPayableName: null,
  /// số tài khoản công nợ phải thu
  accountPayableNumber: null,
  /// Tên nhân viên
  employeeName: null,
  /// id danh sách các nhóm nhà cung cấp
  groupSupplierIds: null,
  /// id danh sách tên các nhóm nhà cung cấp
  groupSupplierNames: null,
  /// danh sách các số tài khoản ngân hàng
  backAccountNumbers: null,
  /// danh sách các tên tài khoản ngân hàng
  bankAccountNames: null,
  /// danh sách các chi nhánh tài khoản ngân hàng
  bankAccountBranchs: null,
  /// danh sách các thành phố tài khoản ngân hàng
  bankAccountCitys: null
};
/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp
 */

exports.supplierModel = supplierModel;

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
    key: "insertSupplier",
    value: function insertSupplier(data) {
      var res;
      return regeneratorRuntime.async(function insertSupplier$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.Suppliers, data));

            case 2:
              res = _context2.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context2.next = 8;
                break;
              }

              console.log(res);
              return _context2.abrupt("return", res.data);

            case 8:
              console.log(res);
              console.log("thêm mới thất bại");

            case 10:
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
    key: "updateSupplier",
    value: function updateSupplier(data) {
      var res;
      return regeneratorRuntime.async(function updateSupplier$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.updateRecord)(_endPoint.END_POINTS.Suppliers, data));

            case 2:
              res = _context3.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context3.next = 8;
                break;
              }

              console.log(res);
              return _context3.abrupt("return", res.data);

            case 8:
              console.log("thêm mới thất bại");

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
    /**
     * Author: Phạm Văn Đạt(03/11/2022)
     * Function: Xử lý xóa nhân viên
     * @param {*} data : id nhân viên muốn xóa
     * @returns : response
     */

  }, {
    key: "delete",
    value: function _delete(data) {
      var res;
      return regeneratorRuntime.async(function _delete$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!data) {
                _context4.next = 10;
                break;
              }

              _context4.next = 3;
              return regeneratorRuntime.awrap((0, _BaseController.deleteRecords)(_endPoint.END_POINTS.DeleteSuppliers, data));

            case 3:
              res = _context4.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.data);

            case 8:
              console.log(res);
              console.log("Xóa thất bại!");

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: Lấy mã code mới nhất
     * @returns trả về dữ liệu nếu thành công.
     */

  }, {
    key: "getMaxCode",
    value: function getMaxCode() {
      var res;
      return regeneratorRuntime.async(function getMaxCode$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.getMaxCode)(_endPoint.END_POINTS.SuppliersMaxCode));

            case 2:
              res = _context5.sent;

              if (!(res.statusCode == _constants.STATUS_CODES.Code200)) {
                _context5.next = 8;
                break;
              }

              console.log(res.data);
              return _context5.abrupt("return", res.data);

            case 8:
              console.log(res);

            case 9:
            case "end":
              return _context5.stop();
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