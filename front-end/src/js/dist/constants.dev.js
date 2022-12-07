"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIST_MENU_PROCESS_BOTTOM = exports.LIST_REPORTS_PROCESS = exports.LIST_CASH_TAB = exports.TITLES_FORM = exports.TEXT_TOAST_MESSAGE = exports.RULE_HANDLER_DATA = exports.TYPE_FILTER = exports.FIELDS_FILTER_NOT_VALUE = exports.FIELDS_FILTER = exports.RULE_FORMAT_DATA = exports.FUNCTION_TABLE = exports.FUNCTION_UPLOAD = exports.FIELDS_REQUIRED = exports.STATUS_CODES = exports.NOTIFY_TEXT = exports.NOTIFY_LIST = exports.GENDERS = exports.PAGING_ITEMS = exports.TABLE_FIELDS = exports.COMPANIES = exports.MENU_ITEMS = void 0;

var _FomatData = require("/src/js/FomatData");

/**
 * Author: Phạm Văn Đạt(25/10/2022)
 * Function: Các biến, hằng số dùng chung
 */

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách item menu
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
  width: 20,
  fieldName: "fakeColumn1",
  "class": "position-sticky fake-cloumn l-p-0"
}, {
  width: 40,
  nameHeader: "listCheckbox",
  fieldName: "checkbox1",
  idCheckbox: "fake-checkbox-1",
  type: "checkbox",
  checkBox: true,
  disabled: false,
  "class": "position-sticky l-p-20",
  value: function value(_value) {
    return _value;
  }
}, {
  name: "TÊN NHÂN VIÊN",
  fieldName: "name",
  width: 150,
  isRequired: true,
  "class": "left-60 position-sticky",
  nameFilter: "Tên nhân viên",
  typeFilter: "Text",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "MÃ NHÂN VIÊN",
  fieldName: "employeeId",
  width: 130,
  isRequired: true,
  nameFilter: "Mã nhân viên",
  typeFilter: "Text",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "GIỚI TÍNH",
  fieldName: "gender",
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
  },
  typeFilter: "Gender",
  nameFilter: "Giới tính",
  isField: true,
  filter: {
    operator: '=',
    value: null,
    name: null
  }
}, {
  name: "NGÀY SINH",
  fieldName: "birthDay",
  nameFilter: "Ngày sinh",
  width: 140,
  "class": "text-align-center",
  formatDate: function formatDate(value) {
    return (0, _FomatData.formatDate)(value, "DD/MM/YYYY");
  },
  typeFilter: "DateTime",
  isField: true,
  filter: {
    operator: '=',
    value: null
  }
}, {
  name: "SỐ CMND",
  fieldName: "idNo",
  title: "Số chứng minh nhân dân",
  width: 130,
  typeFilter: "Text",
  nameFilter: "Số CMND",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "NGÀY CẤP",
  fieldName: "issuaOn",
  width: 120,
  "class": "text-align-center",
  typeFilter: "DateTime",
  formatDate: function formatDate(value) {
    return (0, _FomatData.formatDate)(value, "DD/MM/YYYY");
  },
  nameFilter: "Ngày cấp",
  isField: true,
  filter: {
    operator: '=',
    value: null
  }
}, {
  name: "NƠI CẤP",
  fieldName: "placeOfIssue",
  width: 130,
  typeFilter: "Text",
  nameFilter: "Nơi cấp",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "CHỨC DANH",
  fieldName: "positionName",
  width: 230,
  typeFilter: "Text",
  nameFilter: "Chức danh",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "TÊN ĐƠN VỊ",
  fieldName: "departmentName",
  width: 230,
  isRequired: true,
  typeFilter: "Text",
  nameFilter: "Đơn vị",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "SỐ TÀI KHOẢN",
  fieldName: "bankAccountNumber",
  width: 190,
  typeFilter: "Text",
  nameFilter: "Số tài khoản",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "TÊN NGÂN HÀNG",
  fieldName: "bankName",
  width: 150,
  typeFilter: "Text",
  nameFilter: "Tên ngân hàng",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "CHI NHÁNH NGÂN HÀNG",
  fieldName: "bankAccountBrand",
  width: 230,
  typeFilter: "Text",
  nameFilter: "Chi nhánh ngân hàng",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "ĐT DI ĐỘNG",
  fieldName: "numberPhone",
  width: 150,
  title: "Điện thoại di động",
  typeFilter: "Text",
  nameFilter: "ĐT di động",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "ĐT CỐ ĐỊNH",
  fieldName: "deskPhone",
  width: 150,
  title: "Điện thoại cố định",
  typeFilter: "Text",
  nameFilter: "ĐT cố định",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "EMAIL",
  fieldName: "email",
  width: 200,
  typeFilter: "Text",
  nameFilter: "Email",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  name: "LÀ KHÁCH HÀNG",
  fieldName: "isEmployee",
  width: 150,
  disabled: true,
  "class": "text-align-center",
  checkBoxDisable: true,
  typeFilter: "Boolean",
  nameFilter: "Là khách hàng",
  isField: true
}, {
  name: "LÀ NHÀ CUNG CẤP",
  fieldName: "isSuppiler",
  width: 170,
  disabled: true,
  "class": "text-align-center",
  checkBoxDisable: true,
  typeFilter: "Boolean",
  nameFilter: "Là nhà cung cấp",
  isField: true
}, {
  name: "ĐỊA CHỈ",
  fieldName: "address",
  width: 300,
  "class": "border-right-none",
  typeFilter: "Text",
  nameFilter: "Địa chỉ",
  isField: true,
  filter: {
    operator: 'like',
    value: null
  }
}, {
  width: 120,
  fieldName: "CHỨC NĂNG",
  name: "CHỨC NĂNG",
  button: "Sửa",
  combobox: [{
    id: 1,
    name: "Nhân bản"
  }, {
    id: 2,
    name: "Xóa"
  }, {
    id: 3,
    name: "Ngưng sử dụng"
  }],
  iconCombobox: false,
  positionCombobox: "top",
  inputCombobox: false,
  "class": "table-hover td table-function",
  style: "right:24px",
  type: "function"
}, {
  width: 24,
  fieldName: "fakeColumn2",
  "class": "position-sticky fake-cloumn",
  style: "right:0"
}, {
  width: 24,
  fieldName: "fakeColumn2",
  "class": "position-sticky fake-cloumn r-30 background-container",
  style: "right:-24px;"
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
  // hiển thị lỗi trùng dữ liệu
  dataFail: function dataFail(text) {
    return "Dữ liệu <" + text + "> không có trong danh mục.";
  },
  // hiển thị sai định dạng
  formatError: function formatError(text) {
    return text + " sai định dạng.";
  },
  // lưu lỗi ngày tháng vượt quá ngày tháng hiện tại
  dateTimeError: function dateTimeError(text) {
    return text + " vượt quá ngày thành hiện tại!";
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
/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Xử lý kiểm tra cất hoặc cất và thêm
 */

exports.FIELDS_REQUIRED = FIELDS_REQUIRED;
var FUNCTION_UPLOAD = {
  Save: 1,
  SaveAndInsert: 2
};
/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Nhân bản, xóa, ngưng sử dụng ở table
 */

exports.FUNCTION_UPLOAD = FUNCTION_UPLOAD;
var FUNCTION_TABLE = {
  Replication: 1,
  Delete: 2,
  StopUsing: 3
};
/**
 * Author: Phạm Văn Đạt(04/11/2022)
 * Function: Các cột check dữ liệu
 */

exports.FUNCTION_TABLE = FUNCTION_TABLE;
var RULE_FORMAT_DATA = {
  PhoneNumber: 1,
  Email: 2
};
/**
 * AUthor: Phạm Văn Đạt(11/11/2022)
 * Function: enum gender
 */

exports.RULE_FORMAT_DATA = RULE_FORMAT_DATA;
var GENDER_OBJECT = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2
};
/**
 * AUthor: Phạm Văn Đạt(10/11/2022)
 * Function: Các trường trong lọc dữ liệu
 */

var FIELDS_FILTER = {
  Text: [{
    id: 1,
    name: "(Trống)",
    operator: "IS NULL",
    isDisableInput: true,
    value: function value(_value2) {
      return _value2 ? null : null;
    }
  }, {
    id: 2,
    name: "(Không trống)",
    operator: "IS NOT NULL",
    isDisableInput: true,
    value: function value(_value3) {
      return _value3 ? null : null;
    }
  }, {
    id: 3,
    name: "Bằng",
    operator: "=",
    value: function value(_value4) {
      return _value4;
    }
  }, {
    id: 4,
    name: "Khác",
    operator: "<>",
    value: function value(_value5) {
      return _value5;
    }
  }, {
    id: 5,
    name: "Chứa",
    fieldName: 'like',
    operator: 'like',
    value: function value(_value6) {
      return _value6;
    }
  }, {
    id: 6,
    name: "Không chứa",
    fieldName: 'notLike',
    operator: 'not like',
    value: function value(_value7) {
      return _value7;
    }
  }, {
    id: 7,
    name: "Bắt đầu với",
    fieldName: 'firstLike',
    operator: 'like',
    value: function value(_value8) {
      return _value8;
    }
  }, {
    id: 8,
    name: "Kết thúc với",
    fieldName: 'lastLike',
    operator: 'like',
    value: function value(_value9) {
      return _value9;
    }
  }],
  Boolean: [{
    id: 1,
    name: "Là",
    operator: '=',
    value: 'true'
  }, {
    id: 2,
    name: "Không là",
    operator: '=',
    value: 'false'
  }],
  DateTime: [{
    id: 1,
    name: "Bằng",
    operator: '=',
    value: function value(_value10) {
      return _value10 ? (0, _FomatData.formatDate)(_value10, "YYYY/MM/DD") : null;
    }
  }, {
    id: 2,
    name: "Khác",
    operator: '<>',
    value: function value(_value11) {
      return _value11 ? (0, _FomatData.formatDate)(_value11, "YYYY/MM/DD") : null;
    }
  }, {
    id: 3,
    name: "Nhỏ hơn",
    operator: '<',
    value: function value(_value12) {
      return _value12 ? (0, _FomatData.formatDate)(_value12, "YYYY/MM/DD") : null;
    }
  }, {
    id: 4,
    name: "Nhỏ hơn hoặc Bằng",
    operator: '<=',
    value: function value(_value13) {
      return _value13 ? (0, _FomatData.formatDate)(_value13, "YYYY/MM/DD") : null;
    }
  }, {
    id: 5,
    name: "Lớn hơn",
    operator: '>',
    value: function value(_value14) {
      return _value14 ? (0, _FomatData.formatDate)(_value14, "YYYY/MM/DD") : null;
    }
  }, {
    id: 6,
    name: "Lớn hơn hoặc bằng",
    operator: '>=',
    value: function value(_value15) {
      return _value15 ? (0, _FomatData.formatDate)(_value15, "YYYY/MM/DD") : null;
    }
  }, {
    id: 7,
    name: "(Trống)",
    operator: 'IS NULL',
    value: function value(_value16) {
      return _value16 ? null : null;
    },
    isDisableInput: true
  }, {
    id: 8,
    name: "(Không trống)",
    operator: 'IS NOT NULL',
    value: function value(_value17) {
      return _value17 ? null : null;
    },
    isDisableInput: true
  }],
  Gender: [{
    id: 0,
    name: "Nam",
    operator: "=",
    fieldName: 'gender',
    value: GENDER_OBJECT.MALE
  }, {
    id: 1,
    name: "Nữ",
    operator: "=",
    fieldName: 'gender',
    value: GENDER_OBJECT.FEMALE
  }, {
    id: 2,
    name: "Khác",
    operator: "=",
    fieldName: 'gender',
    value: GENDER_OBJECT.OTHER
  }]
};
/**
 * AUthor: Phạm Văn Đạt(10/11/2022)
 * Function: Các trường không có value trong lọc
 */

exports.FIELDS_FILTER = FIELDS_FILTER;
var FIELDS_FILTER_NOT_VALUE = ["IS NULL", "IS NOT NULL"];
/**
 * AUtho: Phạm Văn Đạt(11/11/2022)
 * Function: Các kiểu lọc dữ liệu
 */

exports.FIELDS_FILTER_NOT_VALUE = FIELDS_FILTER_NOT_VALUE;
var TYPE_FILTER = {
  Text: "Text",
  Boolean: "Boolean",
  DateTime: "DateTime",
  Gender: "Gender"
};
/**
 * AUtho: Phạm Văn Đạt(18/11/2022)
 * Function: Các kiểu thao tác nhanh với dữ liệu
 */

exports.TYPE_FILTER = TYPE_FILTER;
var RULE_HANDLER_DATA = {
  Delete: {
    id: 1,
    name: "Xóa"
  }
};
/**
 * Author: Phạm Văn Đạt(28/11/2022)
 * Function: thông tin hiển thị toast message
 */

exports.RULE_HANDLER_DATA = RULE_HANDLER_DATA;
var TEXT_TOAST_MESSAGE = {
  Error: {
    text: "Có lỗi xảy ra.",
    type: "error"
  },
  CreateFail: {
    text: "Thêm mới thất bại.",
    type: "error"
  },
  UpdateFail: {
    text: "Cập nhật thất bại",
    type: "error"
  }
};
/**
 * Author: Phạm Văn Đạt(28/11/2022)
 * Function: title form
 */

exports.TEXT_TOAST_MESSAGE = TEXT_TOAST_MESSAGE;
var TITLES_FORM = {
  Create: "Thêm mới nhân viên",
  Update: "Sửa nhân viên"
};
/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách các tab trong màn hình tiền mặt
 */

exports.TITLES_FORM = TITLES_FORM;
var LIST_CASH_TAB = [{
  // tên item
  title: "Quy trình",
  // class nếu active vào item
  activeClass: "cash-header-tab-active",
  // điều hướng item
  route: "tien-mat/quy-trinh"
}, {
  // tên item
  title: "Thu, chi tiền",
  // class nếu active vào item
  activeClass: "cash-header-tab-active",
  // điều hướng item
  route: "/thu-chi-tien"
}, {
  // tên item
  title: "Kiểm kê",
  // class nếu active vào item
  activeClass: "cash-header-tab-active",
  // điều hướng item
  route: "kiem-ke"
}, {
  // tên item
  title: "Dự báo dòng tiền",
  // class nếu active vào item
  activeClass: "cash-header-tab-active",
  // điều hướng item
  route: "du-bao-dong-tien"
}, {
  // tên item
  title: "Báo cáo",
  // class nếu active vào item
  activeClass: "cash-header-tab-active",
  // điều hướng item
  route: "bao-cao"
}];
/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách dữ liệu dùng để báo cáo trong màn hình quy trình
 */

exports.LIST_CASH_TAB = LIST_CASH_TAB;
var LIST_REPORTS_PROCESS = [{
  // tên báo cáo
  title: "Bảng kê số dư tiền theo ngày"
}, {
  // tên báo cáo
  title: "Dòng tiền"
}, {
  // tên báo cáo
  title: "S03a1-DN: Sổ nhật ký thu tiền"
}, {
  // tên báo cáo
  title: "Sổ kế toán chi tiết quỹ tiền mặt"
}, {
  // tên báo cáo
  title: "S03a2-DN: Sổ nhật ký chi tiền"
}];
/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách các màn hình trong màn hình quy trình
 */

exports.LIST_REPORTS_PROCESS = LIST_REPORTS_PROCESS;
var LIST_MENU_PROCESS_BOTTOM = [{
  title: "Khách hàng",
  "class": "background-icon-customer w-h-24",
  route: ""
}, {
  title: "Nhà cung cấp",
  "class": "background-icon-supplier w-h-24",
  route: ""
}, {
  title: "Nhân viên",
  "class": "background-icon-employee w-h-24",
  route: ""
}, {
  title: "Tùy chọn",
  "class": "background-icon-setting w-h-24",
  route: ""
}];
exports.LIST_MENU_PROCESS_BOTTOM = LIST_MENU_PROCESS_BOTTOM;