"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELDS_REQUIRED = exports.STATUS_CODES = exports.NOTIFY_TEXT = exports.NOTIFY_LIST = exports.GENDERS = exports.PAGING_ITEMS = exports.TABLE_FIELDS = exports.COMPANIES = exports.MENU_ITEMS = void 0;

var _FomatData = require("/src/js/FomatData");

/**
 * Author: Phạm Văn Đạt(25/10/2022)
 * Function: Các biến, hằng số dùng chung
 */
var MENU_ITEMS = [{
  // tên item
  title: "Tổng quan",
  // vị trí icon
  iconPosition: [-30, -1629],
  // class nếu active vào item
  activeClass: "tong-quan-active",
  // điều hướng item
  route: "tong-quan"
}, {
  title: "Tiền mặt",
  iconPosition: [-73, -1628],
  activeClass: "tien-mat-active",
  route: "tien-mat"
}, {
  title: "Tiền gửi",
  iconPosition: [-117, -1630],
  activeClass: "tien-gui-active",
  route: "tien-gui"
}, {
  title: "Mua hàng",
  iconPosition: [-161, -1630],
  activeClass: "mua-hang-active",
  route: "mua-hang"
}, {
  title: "Bán hàng",
  iconPosition: [-204, -1628],
  activeClass: "ban-hang-active",
  route: "ban-hang"
}, {
  title: "Quản lý hóa đơn",
  iconPosition: [-250, -1629],
  activeClass: "quan-y-hoa-don-active",
  route: "quan-ly-hoa-don"
}, {
  title: "Kho",
  iconPosition: [-291, -1630],
  activeClass: "kho-active",
  route: "kho"
}, {
  title: "Công cụ dụng cụ",
  iconPosition: [-336, -1630],
  activeClass: "cong-cu-dung-cu-active",
  route: "cong-cu-dung-cu"
}, {
  title: "Tài sản cố định",
  iconPosition: [-379, -1630],
  activeClass: "tai-san-co-dinh-active",
  route: "tai-san-co-dinh"
}, {
  title: "Thuế",
  iconPosition: [-423, -1631],
  activeClass: "thue-active",
  route: "thue"
}, {
  title: "Giá thành",
  iconPosition: [-468, -1630],
  activeClass: "gia-thanh-active",
  route: "gia-thanh"
}, {
  title: "Tổng hợp",
  iconPosition: [-511, -1630],
  activeClass: "tong-hop-active",
  route: "tong-hop"
}, {
  title: "Ngân sách",
  iconPosition: [-378, -1661],
  activeClass: "ngan-sach-active",
  route: "ngan-sach"
}, {
  title: "Báo cáo",
  iconPosition: [-547, -1632],
  activeClass: "bao-cao-active",
  route: "bao-cao"
}, {
  title: "Phân tích tài chính",
  iconPosition: [-204, -1662],
  activeClass: "phan-tich-tai-chinh-active",
  route: "phan-tich-tai-chinh"
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách tên công ty
 */

exports.MENU_ITEMS = MENU_ITEMS;
var COMPANIES = [{
  name: "CÔNG TY A",
  id: 1
}, {
  name: "CÔNG TY B",
  id: 2
}, {
  name: "CÔNG TY C",
  id: 3
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: các trường trong table
 */

exports.COMPANIES = COMPANIES;
var TABLE_FIELDS = [{
  name: 'TÊN NHÂN VIÊN',
  fieldName: 'name',
  width: 150,
  isRequired: true,
  "class": "left-60 position-sticky"
}, {
  name: 'MÃ NHÂN VIÊN',
  fieldName: 'employeeId',
  width: 230,
  isRequired: true
}, {
  name: 'GIỚI TÍNH',
  fieldName: 'gender',
  width: 100,
  formatGender: function formatGender(value) {
    value = Number(value);
    var name = "";
    GENDERS.forEach(function (x) {
      if (x.id === value) {
        name = x.name;
      }
    });
    return name;
  }
}, {
  name: 'NGÀY SINH',
  fieldName: 'birthDay',
  width: 140,
  "class": "text-align-center",
  formatDate: function formatDate(value) {
    return (0, _FomatData.FormatDate)(value);
  }
}, {
  name: 'SỐ CMND',
  fieldName: 'idNo',
  title: "Số chứng minh nhân dân",
  width: 130
}, {
  name: 'NGÀY CẤP',
  fieldName: 'issuaOn',
  width: 120,
  "class": "text-align-center",
  formatDate: function formatDate(value) {
    return (0, _FomatData.FormatDate)(value);
  }
}, {
  name: 'NƠI CẤP',
  fieldName: 'placeOfIssue',
  width: 130
}, {
  name: 'CHỨC DANH',
  fieldName: 'positionName',
  width: 230
}, {
  name: 'TÊN ĐƠN VỊ',
  fieldName: 'departmentName',
  width: 230,
  isRequired: true
}, {
  name: 'SỐ TÀI KHOẢN',
  fieldName: 'bankAccountNumber',
  width: 190
}, {
  name: 'TÊN NGÂN HÀNG',
  fieldName: 'bankName',
  width: 150
}, {
  name: 'CHI NHÁNH NGÂN HÀNG',
  fieldName: 'bankAccountBrand',
  width: 230
}, {
  name: 'ĐT DI ĐỘNG',
  fieldName: 'numberPhone',
  width: 150,
  title: "Điện thoại di động"
}, {
  name: 'ĐT CỐ ĐỊNH',
  fieldName: 'deskPhone',
  width: 150,
  title: "Điện thoại cố định"
}, {
  name: 'EMAIL',
  fieldName: 'email',
  width: 200
}, {
  name: 'LÀ KHÁCH HÀNG',
  fieldName: 'isEmployee',
  width: 130,
  "class": "text-align-center",
  checkBox: true
}, {
  name: 'LÀ NHÀ CUNG CẤP',
  fieldName: 'isSuppiler',
  width: 130,
  "class": "text-align-center",
  checkBox: true
}, {
  name: 'ĐỊA CHỈ',
  fieldName: 'address',
  width: 300,
  "class": "border-right-none"
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: các trường phân trang
 */

exports.TABLE_FIELDS = TABLE_FIELDS;
var PAGING_ITEMS = [{
  id: 10,
  name: "10 bản ghi trên trang"
}, {
  id: 20,
  name: "20 bản ghi trên trang"
}, {
  id: 50,
  name: "50 bản ghi trên trang"
}, {
  id: 100,
  name: "100 bản ghi trên trang"
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: enum gender (0-nam, 1-nữ, 2-khác)
 */

exports.PAGING_ITEMS = PAGING_ITEMS;
var GENDERS = [{
  id: 0,
  name: "Nam",
  field: "male"
}, {
  id: 1,
  name: "Nữ",
  field: "female"
}, {
  id: 2,
  name: "Khác",
  field: "other"
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách loại thông báo có thể có
 */

exports.GENDERS = GENDERS;
var NOTIFY_LIST = {
  Question: {
    type: "question",
    text: function text(_text) {
      return _text;
    }
  },
  ErrorValidate: {
    type: "error",
    text: function text(_text2) {
      return _text2;
    }
  },
  Warning: {
    type: "warning",
    text: function text(_text3) {
      return _text3;
    }
  },
  Info: {
    type: "info",
    text: function text(_text4) {
      return _text4;
    }
  },
  Success: {
    type: "success",
    text: function text(_text5) {
      return _text5;
    }
  }
};
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: chuỗi hiển thị thông báo
 */

exports.NOTIFY_LIST = NOTIFY_LIST;
var NOTIFY_TEXT = {
  // dữ liệu đã thay đổi
  changeData: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
  // hiển thị lỗi dữ liệu để trống
  requiredField: function requiredField(text) {
    return text + " không được để trống.";
  },
  // hiển thị lỗi trùng dữ liệu
  duplicateField: function duplicateField(text) {
    return text + " đã tồn tại.";
  },
  // lưu lỗi ngày tháng vượt quá ngày tháng hiện tại
  dateTimeError: function dateTimeError(text) {
    return text + " vượt quá ngày thành hiện tại!";
  },
  // lưu lỗi format dữ liệu
  formatError: function formatError(text) {
    return text + " không đúng định dạng";
  }
};
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Các statusCode so sánh với db trả về
 */

exports.NOTIFY_TEXT = NOTIFY_TEXT;
var STATUS_CODES = {
  Code200: 200,
  // lấy dữ liệu thành công
  Code201: 201,
  // thêm thành công
  Code400: 400,
  // lỗi dữ liệu không đúng
  Code500: 500 // lỗi server

};
/**
 * Author: Phạm Văn Đạt(30/10/2022)
 * Function: Các trường xử lý required
 */

exports.STATUS_CODES = STATUS_CODES;
var FIELDS_REQUIRED = [{
  fielName: "employeeId",
  fieldText: "Mã"
}, {
  fielName: "name",
  fieldText: "Tên"
}, {
  fielName: "departmentId",
  fieldText: "Đơn vị"
}];
exports.FIELDS_REQUIRED = FIELDS_REQUIRED;