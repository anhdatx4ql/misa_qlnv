"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetEmployeeDetail = resetEmployeeDetail;
exports.employees = exports.Employees = exports.employeeModel = void 0;

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

// end point của employees
// const endPoint = END_POINTS.Employees;

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view khách hàng
 */
var employeeModel = {
  // id Tài khoản công nợ phải trả
  accountPayableId: null,
  // id Tài khoản công nợ phải thu
  AccountReceivableId: null,
  // Hệ số lương
  coefficientSalary: 0,
  // người tạo
  createdBy: null,
  // id đơn vị
  departmentId: null,
  // tên đơn vị
  departmentName: null,
  // Địa chỉ
  employeeAddress: null,
  // ngày sinh
  employeeBirthDay: null,
  // mã nhân viên
  employeeCode: null,
  // số điện thoại bàn
  employeeDeskPhone: null,
  // email
  employeeEmail: null,
  // giới tính mặc định là nam
  employeeGender: 0,
  // id
  employeeID: null,
  // tên nhân viên
  employeeName: null,
  // số điện thoại di động
  employeeNumberPhone: null,
  // Số chứng minh nhân dân
  idNo: null,
  // kiểm tra xóa hay chưa
  isDelete: false,
  // là KH
  isEmployee: false,
  // là nhà cung cấp
  isSuppiler: false,
  // ngày cấp
  issuaOn: null,
  // số người phụ thuộc
  numberOfDependent: 0,
  // nơi cấp
  placeOfIssue: null,
  // id chức vụ
  positionId: null,
  // tên chức vụ
  positionName: null,
  // lương đóng bảo hiểm
  premiumSalary: 0,
  // mã số thuế
  taxCode: null,
  // loại hợp đồng - không được để trống
  typeOfContract: null,
  // người cập nhật
  updatedBy: null,
  // lương thỏa thuận
  wageAgreement: 0
};
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Class lưu thông tin các khách hàng
 */

exports.employeeModel = employeeModel;

var Employees =
/*#__PURE__*/
function () {
  // khởi tạo giá trị
  function Employees(data) {
    var keyword = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var currentData = arguments.length > 2 ? arguments[2] : undefined;
    var currentPageNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var pageSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
    var totalCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var countLoadData = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    _classCallCheck(this, Employees);

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
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */


  _createClass(Employees, [{
    key: "pagingEmployee",
    value: function pagingEmployee(data, checkLoadCurentPage) {
      var dataKeyword, newData, lengthCurrentData, res;
      return regeneratorRuntime.async(function pagingEmployee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataKeyword = []; // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt

              if (this.keyword) {
                console.log(this.keyword);
                dataKeyword.push({
                  name: "employeeID",
                  operator: "like",
                  value: this.keyword,
                  typeOperator: "like",
                  stringConcatenation: "OR"
                }, {
                  name: "employeeName",
                  operator: "like",
                  value: this.keyword,
                  typeOperator: "like",
                  stringConcatenation: "OR"
                }, {
                  name: "employeeNumberPhone",
                  operator: "like",
                  value: this.keyword,
                  stringConcatenation: "like"
                });
              }

              newData = _toConsumableArray(data);

              if (dataKeyword != []) {
                newData.push.apply(newData, dataKeyword);
              }

              lengthCurrentData = this.currentData ? this.currentData.length : -1;

              if (this.countLoadData > 0) {
                this.currentPageNumber = this.currentPageNumber + 1;
              } // nếu keywword thay đổi, load lại từ trang 1


              if (checkLoadCurentPage) {
                this.currentPageNumber = 1;
              } // nếu số bản ghi hiện tại <= tổng số bản ghi => tăng số trang hiện tại lên 1 và load lại. Nếu không thì thôi


              if (!(lengthCurrentData != this.totalCount || this.keyword || this.totalCount == 0)) {
                _context.next = 13;
                break;
              }

              // tăng số lần load lên 1
              this.countLoadData++; // gọi đến paging basecontroler

              _context.next = 11;
              return regeneratorRuntime.awrap((0, _BaseController.paging)(_endPoint.END_POINTS.PagingEmployee, this.currentPageNumber, this.pageSize, newData));

            case 11:
              res = _context.sent;

              // kiểm tra data trả về
              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data.data; // nếu load dữ liệu thành công

                if (res.data.data != []) {
                  if (this.currentData == undefined) {
                    this.currentData = _toConsumableArray(res.data.data);
                  } else {
                    this.currentData = [].concat(_toConsumableArray(this.currentData), _toConsumableArray(res.data.data));
                  } // lấy data


                  this.data = res.data.data.length > 0 ? _toConsumableArray(res.data.data) : [];
                } else {
                  // không có dữ liệu
                  this.currentPageNumber--;
                }

                this.totalCount = res.data.totalCount;
              } else {
                console.log(res);
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Author: Phạm Văn Đạt(23/10/2022)
     * Function: Lấy mã code mới nhất
     * @returns trả về dữ liệu nếu thành công.
     */

  }, {
    key: "getMaxCode",
    value: function getMaxCode() {
      var res;
      return regeneratorRuntime.async(function getMaxCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.getMaxCode)(_endPoint.END_POINTS.EmployeesMaxCode));

            case 2:
              res = _context2.sent;

              if (!(res.statusCode == _constants.STATUS_CODES.Code200)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.data);

            case 7:
              console.log(res);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
    /**
     * Author: Phạm Văn Đạt(09/11/2022)
     * Function: Xử lý xuất excel
     * @param {*} data : keyword
     * @returns: file excel nếu có
     */

  }, {
    key: "exportExcel",
    value: function exportExcel(data) {
      var endString;
      return regeneratorRuntime.async(function exportExcel$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              endString = "";

              if (data) {
                endString = "?keyword=" + data;
              }

              _context3.next = 4;
              return regeneratorRuntime.awrap((0, _BaseController.exportExcel)(_endPoint.END_POINTS.EmployeesExportExcel + endString));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Thêm mới nhân viên
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "insertEmployee",
    value: function insertEmployee(data) {
      var res;
      return regeneratorRuntime.async(function insertEmployee$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.insertRecord)(_endPoint.END_POINTS.Employees, data));

            case 2:
              res = _context4.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.data);

            case 7:
              console.log(res);
              console.log("thêm mới thất bại");

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
    /**
     * Author: Phạm Văn Đạt(03/11/2022)
     * Function: Xử lý update nhân viên
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "updateEmployee",
    value: function updateEmployee(data) {
      var res;
      return regeneratorRuntime.async(function updateEmployee$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.updateRecord)(_endPoint.END_POINTS.Employees, data));

            case 2:
              res = _context5.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.data);

            case 7:
              console.log("thêm mới thất bại");

            case 8:
            case "end":
              return _context5.stop();
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
    key: "deleteEmployee",
    value: function deleteEmployee(data) {
      var res;
      return regeneratorRuntime.async(function deleteEmployee$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!data) {
                _context6.next = 10;
                break;
              }

              _context6.next = 3;
              return regeneratorRuntime.awrap((0, _BaseController.deleteRecords)(_endPoint.END_POINTS.EmployeesDelete, data));

            case 3:
              res = _context6.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.data);

            case 8:
              console.log(res);
              console.log("Xóa thất bại!");

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return Employees;
}();
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */


exports.Employees = Employees;
var employees = new Employees();
/**
 * Author: Phạm Văn Đạt(23/10/2022)
 * Function: Reset dữ liệu
 */

exports.employees = employees;

function resetEmployeeDetail(object, employees) {
  var newCode;
  return regeneratorRuntime.async(function resetEmployeeDetail$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          object = {
            // id Tài khoản công nợ phải trả
            accountPayableId: null,
            // id Tài khoản công nợ phải thu
            AccountReceivableId: null,
            // Hệ số lương
            coefficientSalary: 0,
            // người tạo
            createdBy: null,
            // id đơn vị
            departmentId: null,
            // tên đơn vị
            departmentName: null,
            // Địa chỉ
            employeeAddress: null,
            // ngày sinh
            employeeBirthDay: null,
            // mã nhân viên
            employeeCode: null,
            // số điện thoại bàn
            employeeDeskPhone: null,
            // email
            employeeEmail: null,
            // giới tính mặc định là nam
            employeeGender: 0,
            // id
            employeeID: null,
            // tên nhân viên
            employeeName: null,
            // số điện thoại di động
            employeeNumberPhone: null,
            // Số chứng minh nhân dân
            idNo: null,
            // kiểm tra xóa hay chưa
            isDelete: false,
            // là KH
            isEmployee: false,
            // là nhà cung cấp
            isSuppiler: false,
            // ngày cấp
            issuaOn: null,
            // số người phụ thuộc
            numberOfDependent: 0,
            // nơi cấp
            placeOfIssue: null,
            // id chức vụ
            positionId: null,
            // tên chức vụ
            positionName: null,
            // lương đóng bảo hiểm
            premiumSalary: 0,
            // mã số thuế
            taxCode: null,
            // loại hợp đồng - không được để trống
            typeOfContract: null,
            // người cập nhật
            updatedBy: null,
            // lương thỏa thuận
            wageAgreement: 0
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(employees.getMaxCode());

        case 4:
          newCode = _context7.sent;

          if (newCode) {
            object.employeeCode = newCode;
          }

          return _context7.abrupt("return", object);

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
}