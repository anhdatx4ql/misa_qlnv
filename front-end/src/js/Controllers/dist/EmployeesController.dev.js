"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.employees = exports.Employees = exports.employeeModel = void 0;

var _endPoint = require("../axios/endPoint");

var _BaseController = require("../Controllers/BaseController");

var _constants = require("../../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var employeeModel = {
  // Địa chỉ
  address: null,
  // Chi nhánh ngân hàng
  bankAccountBrand: null,
  // Số tài khoản
  bankAccountNumber: null,
  // Tên ngân hàng
  bankName: null,
  // ngày sinh
  birthDay: new Date('0001-01-01'),
  // người tạo
  createdBy: null,
  // id phòng ban
  departmentId: null,
  // tên phòng ban
  departmentName: null,
  // điện thoại bàn
  deskPhone: null,
  // email
  email: null,
  // mã khách hàng
  employeeId: null,
  // giới tính (0-nam, 1-nữ, 2-khác)
  gender: 0,
  // id
  id: null,
  // số chứng minh nhân dân
  idNo: null,
  // kiểm tra xóa hay chưa
  isDelete: false,
  // là khách hàng
  isEmployee: false,
  // là nhà cung cấp
  isSuppiler: false,
  // Ngày cấp
  issuaOn: null,
  // tên khách hàng
  name: null,
  // số điện thoại
  numberPhone: null,
  // Nơi cấp
  placeOfIssue: null,
  // id chức danh
  positionId: null,
  // tên chức danh
  positionName: null,
  // người cập nhật
  updatedBy: null
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
    var currentPageNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var totalCount = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, Employees);

    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }
  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */


  _createClass(Employees, [{
    key: "PagingEmployee",
    value: function PagingEmployee() {
      var res;
      return regeneratorRuntime.async(function PagingEmployee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.Paging)(_endPoint.END_POINTS.PagingEmployee, this.keyword, this.currentPageNumber, this.pageSize));

            case 2:
              res = _context.sent;

              if (res.statusCode == _constants.STATUS_CODES.Code200) {
                this.data = res.data.data;
                this.totalCount = res.data.totalCount;
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
    /**
     * Author: Phạm Văn Đạt(23/10/2022)
     * Function: Lấy mã code mới nhất
     * @returns trả về dữ liệu nếu thành công.
     */

  }, {
    key: "GetMaxCode",
    value: function GetMaxCode() {
      var res;
      return regeneratorRuntime.async(function GetMaxCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.GetMaxCode)(_endPoint.END_POINTS.EmployeesMaxCode));

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
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Thêm mới nhân viên
     * @param {*} data : Dữ liệu truyền vào
     */

  }, {
    key: "InsertEmployee",
    value: function InsertEmployee(data) {
      var res;
      return regeneratorRuntime.async(function InsertEmployee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap((0, _BaseController.InsertRecord)(_endPoint.END_POINTS.Employees, data));

            case 2:
              res = _context3.sent;

              if (!(res.status == _constants.STATUS_CODES.Code200)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res);

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

  return Employees;
}();
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
*/


exports.Employees = Employees;
var employees = new Employees();
exports.employees = employees;