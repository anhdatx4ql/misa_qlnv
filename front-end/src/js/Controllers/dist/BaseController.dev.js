"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaxCode = exports.insertRecord = exports.updateRecord = exports.deleteRecords = exports.paging = exports.getAll = void 0;

var _endPoint = require("../axios/endPoint");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Khai báo header để đưa dữ liệu vào api
var headers = {
  "Content-Type": "application/json"
};
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Lấy tất cả dữ liệu nằm trong bảng
 * @param {*} endPoint: điểm cuối truyền vào 
 * @returns : respose hoặc lỗi nếu có
 */

var getAll = function getAll(endPoint) {
  var result;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = {};
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(_endPoint.ROOT_API + endPoint).then(function (response) {
            result = response.data;
          })["catch"](function (e) {
            result = e;
          }));

        case 3:
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: base xử lý paging
 * @param {*} endPoint : điểm cuối api
 * @param {*} keyword : text tìm kiếm
 * @param {*} currentPageNumber : trang hiện tại
 * @param {*} pageSize : số bản ghi trên 1 trang
 * @returns : respose hoặc lỗi nếu có
 */


exports.getAll = getAll;

var paging = function paging(endPoint, keyword, currentPageNumber, pageSize) {
  var result, endPointLast;
  return regeneratorRuntime.async(function paging$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          result = {}; // khai báo chuỗi nối để phân trang

          endPointLast = "";

          if (keyword == null) {
            endPointLast = "pageSize=" + pageSize + "&currentPageNumber=" + currentPageNumber;
          } else {
            endPointLast = "keyword=" + keyword + "&pageSize=" + pageSize + "&currentPageNumber=" + currentPageNumber;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get(_endPoint.ROOT_API + endPoint + endPointLast).then(function (res) {
            result = res.data;
          })["catch"](function (e) {
            result = e;
          }));

        case 5:
          return _context2.abrupt("return", result);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**

 */

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Xử lý xóa 1 hoặc nhiều bản ghi
 * @param {*} endPoint : điểm cuối api
 * @param {*} ids : danh sách id khách hàng muốn xóa
 * @returns : response hoặc lỗi nếu có
 */


exports.paging = paging;

var deleteRecords = function deleteRecords(endPoint, ids) {
  var result;
  return regeneratorRuntime.async(function deleteRecords$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = {};
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(_endPoint.ROOT_API + endPoint, ids).then(function (response) {
            result = response;
          })["catch"](function (e) {
            result = e;
          }));

        case 3:
          return _context3.abrupt("return", result);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Xứ lý update bản ghi
 * @param {A} endPoint: đầu cuối api
 * @param {*} data: dữ liệu update 
 * @returns:  trả về response hoặc lỗi 
 */


exports.deleteRecords = deleteRecords;

var updateRecord = function updateRecord(endPoint, data) {
  var result;
  return regeneratorRuntime.async(function updateRecord$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          result = {};
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put(_endPoint.ROOT_API + endPoint, data, {
            header: headers
          }).then(function (response) {
            result = response;
          })["catch"](function (e) {
            result = e;
          }));

        case 3:
          return _context4.abrupt("return", result);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};
/**
 * 
 * @param {*} endPoint : Điểm cuối api
 * @param {*} data : dữ liệu truyền vào
 * @returns : trả về response hoặc lỗi 
 */


exports.updateRecord = updateRecord;

var insertRecord = function insertRecord(endPoint, data) {
  var result;
  return regeneratorRuntime.async(function insertRecord$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          result = {};
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(_endPoint.ROOT_API + endPoint, data, {
            header: headers
          }).then(function (response) {
            result = response;
          })["catch"](function (e) {
            result = e;
          }));

        case 3:
          return _context5.abrupt("return", result);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};
/**
 * Author: Phạm Văn Đạt(23/10/2022)
 * Function: Lấy tất cả dữ liệu nằm trong bảng
 * @param {*} endPoint: điểm cuối truyền vào 
 */


exports.insertRecord = insertRecord;

var getMaxCode = function getMaxCode(endPoint) {
  var result;
  return regeneratorRuntime.async(function getMaxCode$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          result = {};
          _context6.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(_endPoint.ROOT_API + endPoint).then(function (response) {
            result = response.data;
          })["catch"](function (e) {
            result = e;
          }));

        case 3:
          return _context6.abrupt("return", result);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getMaxCode = getMaxCode;