/**
 * Author: Phạm Văn Đạt(25/10/2022)
 * Function: Các biến, hằng số dùng chung
 */

import { formatDate } from "/src/js/FomatData";

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách item menu
 */
export const MENU_ITEMS = [
  {
    // tên item
    title: "Tổng quan",

    // vị trí icon
    iconPosition: [-30, -1629],

    // class nếu active vào item
    activeClass: "tong-quan-active",

    // điều hướng item
    route: "tong-quan",
  },
  {
    title: "Tiền mặt",
    iconPosition: [-73, -1628],
    activeClass: "tien-mat-active",
    route: "tien-mat",
  },
  {
    title: "Tiền gửi",
    iconPosition: [-117, -1630],
    activeClass: "tien-gui-active",
    route: "tien-gui",
  },
  {
    title: "Mua hàng",
    iconPosition: [-161, -1630],
    activeClass: "mua-hang-active",
    route: "mua-hang",
  },
  {
    title: "Bán hàng",
    iconPosition: [-204, -1628],
    activeClass: "ban-hang-active",
    route: "ban-hang",
  },
  {
    title: "Quản lý hóa đơn",
    iconPosition: [-250, -1629],
    activeClass: "quan-y-hoa-don-active",
    route: "quan-ly-hoa-don",
  },
  {
    title: "Kho",
    iconPosition: [-291, -1630],
    activeClass: "kho-active",
    route: "kho",
  },
  {
    title: "Công cụ dụng cụ",
    iconPosition: [-336, -1630],
    activeClass: "cong-cu-dung-cu-active",
    route: "cong-cu-dung-cu",
  },
  {
    title: "Tài sản cố định",
    iconPosition: [-379, -1630],
    activeClass: "tai-san-co-dinh-active",
    route: "tai-san-co-dinh",
  },
  {
    title: "Thuế",
    iconPosition: [-423, -1631],
    activeClass: "thue-active",
    route: "thue",
  },
  {
    title: "Giá thành",
    iconPosition: [-468, -1630],
    activeClass: "gia-thanh-active",
    route: "gia-thanh",
  },
  {
    title: "Tổng hợp",
    iconPosition: [-511, -1630],
    activeClass: "tong-hop-active",
    route: "tong-hop",
  },
  {
    title: "Ngân sách",
    iconPosition: [-378, -1661],
    activeClass: "ngan-sach-active",
    route: "ngan-sach",
  },
  {
    title: "Báo cáo",
    iconPosition: [-547, -1632],
    activeClass: "bao-cao-active",
    route: "bao-cao",
  },
  {
    title: "Phân tích tài chính",
    iconPosition: [-204, -1662],
    activeClass: "phan-tich-tai-chinh-active",
    route: "phan-tich-tai-chinh",
  },
];

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách tên công ty
 */
export const COMPANIES = [
  {
    name: "CÔNG TY A",
    id: 1,
  },
  {
    name: "CÔNG TY B",
    id: 2,
  },
  {
    name: "CÔNG TY C",
    id: 3,
  },
];

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: các trường trong table
 */
export let TABLE_FIELDS = [
  {
    width: 20,
    fieldName: "fakeColumn1",
    class: "position-sticky fake-cloumn l-p-0",
  },
  {
    width: 40,
    nameHeader: "listCheckbox",
    fieldName: "checkbox1",
    idCheckbox: "fake-checkbox-1",
    type: "checkbox",
    checkBox: true,
    disabled: false,
    class: "position-sticky l-p-20",
    value: (value) => {
      return value;
    },
  },
  {
    name: "TÊN NHÂN VIÊN",
    fieldName: "employeeName",
    width: 150,
    isRequired: true,
    class: "left-60 position-sticky",
    nameFilter: "Tên nhân viên",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "MÃ NHÂN VIÊN",
    fieldName: "employeeCode",
    width: 130,
    isRequired: true,
    nameFilter: "Mã nhân viên",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "GIỚI TÍNH",
    fieldName: "employeeGender",
    width: 100,
    formatGender: function (value) {
      value = Number(value);
      let name = "";
      GENDERS.forEach((x) => {
        if (x.id === value) {
          name = x.name;
        }
      });

      return name;
    },
    typeFilter: "Gender",
    nameFilter: "Giới tính",
    isField: true,
    filter:{
      operator: '=',
      value: null,
      name:null
    }
  },
  {
    name: "NGÀY SINH",
    fieldName: "employeeBirthDay",
    nameFilter: "Ngày sinh",
    width: 140,
    class: "text-align-center",
    formatDate: function (value) {
      return formatDate(value, "DD/MM/YYYY");
    },
    typeFilter: "DateTime",
    isField: true,
    filter:{
      operator: '=',
      value: null
    }
  },
  {
    name: "SỐ CMND",
    fieldName: "idNo",
    title: "Số chứng minh nhân dân",
    width: 130,
    typeFilter: "Text",
    nameFilter: "Số CMND",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NGÀY CẤP",
    fieldName: "issuaOn",
    width: 120,
    class: "text-align-center",
    typeFilter: "DateTime",
    formatDate: function (value) {
      return formatDate(value, "DD/MM/YYYY");
    },
    nameFilter: "Ngày cấp",
    isField: true,
    filter:{
      operator: '=',
      value: null
    }
  },
  {
    name: "NƠI CẤP",
    fieldName: "placeOfIssue",
    width: 130,
    typeFilter: "Text",
    nameFilter: "Nơi cấp",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "CHỨC DANH",
    fieldName: "positionName",
    width: 230,
    typeFilter: "Text",
    nameFilter: "Chức danh",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TÊN ĐƠN VỊ",
    fieldName: "departmentName",
    width: 230,
    isRequired: true,
    typeFilter: "Text",
    nameFilter: "Đơn vị",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐT DI ĐỘNG",
    fieldName: "employeeNumberPhone",
    width: 150,
    title: "Điện thoại di động",
    typeFilter: "Text",
    nameFilter: "ĐT di động",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐT CỐ ĐỊNH",
    fieldName: "employeeDeskPhone",
    width: 150,
    title: "Điện thoại cố định",
    typeFilter: "Text",
    nameFilter: "ĐT cố định",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "EMAIL",
    fieldName: "employeeEmail",
    width: 200,
    typeFilter: "Text",
    nameFilter: "Email",
    isField: true ,
    filter:{
      operator: 'like',
      value: null
    } 
  },
  {
    name: "LÀ KHÁCH HÀNG",
    fieldName: "isEmployee",
    width: 150,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Là khách hàng",
    isField: true
  },
  {
    name: "LÀ NHÀ CUNG CẤP",
    fieldName: "isSuppiler",
    width: 170,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Là nhà cung cấp",
    isField: true
  },
  {
    name: "ĐỊA CHỈ",
    fieldName: "employeeAddress",
    width: 300,
    class: "border-right-none",
    typeFilter: "Text",
    nameFilter: "Địa chỉ",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    width: 120,
    fieldName: "CHỨC NĂNG",
    name: "CHỨC NĂNG",
    button: "Sửa",
    combobox: [
      {
        id: 1,
        name: "Nhân bản",
      },
      {
        id: 2,
        name: "Xóa",
      },  
      {
        id: 3,
        name: "Ngưng sử dụng",
      },
    ],
    iconCombobox: false,
    positionCombobox: "top",
    inputCombobox: false,
    class: "table-hover td table-function",
    style: "right:24px",
    type: "function",
  },
  {
    width: 24,
    fieldName: "fakeColumn2",
    class: "position-sticky fake-cloumn",
    style: "right:0",
  },
  {
    width: 24,
    fieldName: "fakeColumn2",
    class: "position-sticky fake-cloumn r-30 background-container",
    style: "right:-24px;",
  },
];

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: các trường phân trang
 */
export const PAGING_ITEMS = [
  {
    id: 10,
    name: "10 bản ghi trên trang",
  },
  {
    id: 20,
    name: "20 bản ghi trên trang",
  },
  {
    id: 50,
    name: "50 bản ghi trên trang",
  },
  {
    id: 100,
    name: "100 bản ghi trên trang",
  },
];

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: enum gender (0-nam, 1-nữ, 2-khác)
 */
export const GENDERS = [
  {
    id: 0,
    name: "Nam",
    field: "male",
  },
  {
    id: 1,
    name: "Nữ",
    field: "female",
  },
  {
    id: 2,
    name: "Khác",
    field: "other",
  },
];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: danh sách loại thông báo có thể có
 */
export const NOTIFY_LIST = {
  Question: {
    type: "question",
    text: function (text) {
      return text;
    },
  },
  ErrorValidate: {
    type: "error",
    text: function (text) {
      return text;
    },
  },
  Warning: {
    type: "warning",
    text: function (text) {
      return text;
    },
  },
  Info: {
    type: "info",
    text: function (text) {
      return text;
    },
  },
  Success: {
    type: "success",
    text: function (text) {
      return text;
    },
  },
};

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: chuỗi hiển thị thông báo
 */
export const NOTIFY_TEXT = {
  // dữ liệu đã thay đổi
  changeData: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",

  // hiển thị lỗi dữ liệu để trống
  requiredField: function (text) {
    return text + " không được để trống.";
  },

  // hiển thị lỗi trùng dữ liệu
  duplicateField: (text) => {
    return text + " đã tồn tại.";
  },

  // hiển thị lỗi trùng dữ liệu
  dataFail: (text) => {
    return "Dữ liệu <" + text + "> không có trong danh mục.";
  },

  // hiển thị sai định dạng
  formatError: (text) => {
    return text + " sai định dạng.";
  },

  // lưu lỗi ngày tháng vượt quá ngày tháng hiện tại
  dateTimeError: function (text) {
    return text + " vượt quá ngày thành hiện tại!";
  },
};

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Các statusCode so sánh với db trả về
 */
export const STATUS_CODES = {
  Code200: 200, // lấy dữ liệu thành công
  Code201: 201, // thêm thành công
  Code400: 400, // lỗi dữ liệu không đúng
  Code500: 500, // lỗi server
};

/**
 * Author: Phạm Văn Đạt(30/10/2022)
 * Function: Các trường xử lý required
 */
export const FIELDS_REQUIRED = [
  {
    fielName: "employeeId",
    fieldText: "Mã",
  },
  {
    fielName: "name",
    fieldText: "Tên",
  },
  {
    fielName: "departmentId",
    fieldText: "Đơn vị",
  },
];

/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Xử lý kiểm tra cất hoặc cất và thêm
 */
export const FUNCTION_UPLOAD = {
  Save: 1,
  SaveAndInsert: 2,
};

/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Nhân bản, xóa, ngưng sử dụng ở table
 */
export const FUNCTION_TABLE = {
  Replication: 1,
  Delete: 2,
  StopUsing: 3,
};

/**
 * Author: Phạm Văn Đạt(04/11/2022)
 * Function: Các cột check dữ liệu
 */
export const RULE_FORMAT_DATA = {
  PhoneNumber: 1,
  Email: 2,
};

/**
 * AUthor: Phạm Văn Đạt(11/11/2022)
 * Function: enum gender
 */
const GENDER_OBJECT= {
  MALE:0,
  FEMALE:1,
  OTHER:2
}

/**
 * AUthor: Phạm Văn Đạt(10/11/2022)
 * Function: Các trường trong lọc dữ liệu
 */
export const FIELDS_FILTER = {
  Text:[
    {
      id:1,
      name:"(Trống)",
      operator: "IS NULL",
      isDisableInput: true,
      value: (value)=>{
        return (value)?null:null;
      }
    },
    {
      id:2,
      name:"(Không trống)",
      operator: "IS NOT NULL",
      isDisableInput: true,
      value: (value)=>{
        return (value)?null:null;
      }
    },
    {
      id:3,
      name:"Bằng",
      operator: "=",
      value: (value)=>{
        return value;
      }
    },
    {
      id:4,
      name:"Khác",
      operator: "<>",
      value: (value)=>{
        return value;
      }
    },
    {
      id:5,
      name:"Chứa",
      fieldName: 'like',
      operator: 'like',
      value:(value)=>{
        return value;
      }
    },
    {
      id:6,
      name:"Không chứa",
      fieldName: 'notLike',
      operator: 'not like',
      value:(value)=>{
        return value;
      }
    },
    {
      id:7,
      name:"Bắt đầu với",
      fieldName: 'firstLike',
      operator: 'like',
      value:(value)=>{
        return value;
      }
    },
    {
      id:8,
      name:"Kết thúc với",
      fieldName: 'lastLike',
      operator:'like',
      value:(value)=>{
        return value;
      }
    },
  ],
  Boolean:[
    {
      id: 1,
      name: "Là",
      operator: '=',
      value: 'true'
    },
    {
      id: 2,
      name: "Không là",
      operator: '=',
      value: 'false'
    }
  ],
  DateTime:[
    {
      id:1,
      name: "Bằng",
      operator: '=',
      value:(value)=>{
        return (value)?formatDate(value, "YYYY/MM/DD"):null;
      }
    },
    {
      id:2,
      name: "Khác",
      operator: '<>',
      value:(value)=>{
        return (value)?formatDate(value, "YYYY/MM/DD"):null;
      }
    },
    {
      id:3,
      name: "Nhỏ hơn",
      operator: '<',
      value:(value)=>{
        return (value)?formatDate(value, "YYYY/MM/DD"):null;
      }
    },
    {
      id:4,
      name: "Nhỏ hơn hoặc Bằng",
      operator: '<=',
      value:(value)=>{
        return (value)?formatDate(value,"YYYY/MM/DD"):null;
      }
    },
    {
      id:5,
      name: "Lớn hơn",
      operator: '>',
      value:(value)=>{
        return (value)?formatDate(value, "YYYY/MM/DD"):null;
      }
    },
    
    {
      id:6,
      name: "Lớn hơn hoặc bằng",
      operator: '>=',
      value:(value)=>{
        return (value)?formatDate(value, "YYYY/MM/DD"):null;
      }
    },
    
    {
      id:7,
      name: "(Trống)",
      operator: 'IS NULL',
      value:(value)=>{
        return (value)?null:null;
      },
      isDisableInput: true,
    },
    {
      id:8,
      name: "(Không trống)",
      operator: 'IS NOT NULL',
      value:(value)=>{
        return (value)?null:null;
      },
      isDisableInput: true,
    }
  ],
  Gender:[
    {
      id: 0,
      name: "Nam",
      operator: "=",
      fieldName: 'gender',
      value:GENDER_OBJECT.MALE
    },
    {
      id: 1,
      name: "Nữ",
      operator: "=",
      fieldName: 'gender',
      value:GENDER_OBJECT.FEMALE
    },
    {
      id: 2,
      name: "Khác",
      operator: "=",
      fieldName: 'gender',
      value:GENDER_OBJECT.OTHER
    }
  ]
}

/**
 * AUthor: Phạm Văn Đạt(10/11/2022)
 * Function: Các trường không có value trong lọc
 */
export const FIELDS_FILTER_NOT_VALUE = [
  "IS NULL", "IS NOT NULL"
]

/**
 * AUtho: Phạm Văn Đạt(11/11/2022)
 * Function: Các kiểu lọc dữ liệu
 */
export const TYPE_FILTER = {
  Text: "Text",
  Boolean: "Boolean",
  DateTime: "DateTime",
  Gender: "Gender",
}

/**
 * AUtho: Phạm Văn Đạt(18/11/2022)
 * Function: Các kiểu thao tác nhanh với dữ liệu
 */
export const RULE_HANDLER_DATA = [
  {
    name: 'Delete',
    text: "Xóa"
  }
]

/**
 * Author: Phạm Văn Đạt(28/11/2022)
 * Function: thông tin hiển thị toast message
 */
export const TEXT_TOAST_MESSAGE = {
  Error: {
    text: "Có lỗi xảy ra.",
    type: "error"
  },
  CreateFail:{
    text: "Thêm mới thất bại.",
    type: "error"
  },
  UpdateFail:{
    text: "Cập nhật thất bại",
    type: "error"
  },

}

/**
 * Author: Phạm Văn Đạt(28/11/2022)
 * Function: title form
 */
export const TITLES_FORM = {
  Create: "Thêm mới nhân viên",
  Update: "Sửa nhân viên"
}

/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách các tab trong màn hình tiền mặt
 */
export const LIST_CASH_TAB = [
  {
    // tên item
    title: "Quy trình",

    // class nếu active vào item
    activeClass: "cash-header-tab-active",

    // điều hướng item
    route: "tien-mat/quy-trinh"
  },
  {
    // tên item
    title: "Thu, chi tiền",

    // class nếu active vào item
    activeClass: "cash-header-tab-active",

    // điều hướng item
    route: "/thu-chi-tien"
  },
  {
    // tên item
    title: "Kiểm kê",

    // class nếu active vào item
    activeClass: "cash-header-tab-active",

    // điều hướng item
    route: "kiem-ke"
  },
  
  {
    // tên item
    title: "Dự báo dòng tiền",

    // class nếu active vào item
    activeClass: "cash-header-tab-active",

    // điều hướng item
    route: "du-bao-dong-tien"
  },
  {
    // tên item
    title: "Báo cáo",

    // class nếu active vào item
    activeClass: "cash-header-tab-active",

    // điều hướng item
    route: "bao-cao"
  },
];

/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách dữ liệu dùng để báo cáo trong màn hình quy trình
 */
export const LIST_REPORTS_PROCESS = [
  {
    // tên báo cáo
    title: "Bảng kê số dư tiền theo ngày",
  },
  {
    // tên báo cáo
    title: "Dòng tiền",
  },
  {
    // tên báo cáo
    title: "S03a1-DN: Sổ nhật ký thu tiền",
  },
  {
    // tên báo cáo
    title: "Sổ kế toán chi tiết quỹ tiền mặt",
  },
  {
    // tên báo cáo
    title: "S03a2-DN: Sổ nhật ký chi tiền",
  },

]

/**
 * Author: Phạm Văn Đạt(07/12/2022)
 * Function: danh sách các màn hình trong màn hình quy trình
 */
export const LIST_MENU_PROCESS_BOTTOM = [
  {
    title: "Khách hàng",
    class: "background-icon-customer w-h-24",
    route:"/khach-hang"
  },
  {
    title: "Nhà cung cấp",
    class: "background-icon-supplier w-h-24",
    route:"/nha-cung-cap"
  },
  {
    title: "Nhân viên",
    class: "background-icon-employee w-h-24",
    route:"/nhan-vien"
  },
  {
    title: "Tùy chọn",
    class: "background-icon-setting w-h-24",
    route:"/tuy-chon"
  },
];



/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: các trường trong table
 */
export let SUPPLIER_FIELDS = [
  {
    width: 20,
    fieldName: "fakeColumn1",
    class: "position-sticky fake-cloumn l-p-0",
  },
  {
    width: 40,
    nameHeader: "listCheckbox",
    fieldName: "checkbox1",
    idCheckbox: "fake-checkbox-1",
    type: "checkbox",
    checkBox: true,
    disabled: false,
    class: "position-sticky l-p-20",
    value: (value) => {
      return value;
    },
  },
  {
    name: "MÃ NHÀ CUNG CẤP",
    fieldName: "supplierCode",
    width: 180,
    isRequired: true,
    class: "left-60 position-sticky",
    nameFilter: "Mã nhà cung cấp",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TÊN NHÀ CUNG CẤP",
    fieldName: "supplierName",
    width: 250,
    isRequired: true,
    nameFilter: "Tên nhà cung cấp",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "MÃ SỐ THUẾ",
    fieldName: "taxCode",
    width: 150,
    isRequired: true,
    nameFilter: "Mã số thuế",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐỊA CHỈ",
    fieldName: "supplierAddress",
    width: 250,
    isRequired: true,
    nameFilter: "Địa chỉ",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐIỆN THOẠI",
    fieldName: "supplierMobile",
    width: 130,
    isRequired: true,
    nameFilter: "Địa chỉ",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NHÓM KH,NCC",
    fieldName: "groupSupplierNames",
    width: 200,
    isRequired: true,
    nameFilter: "Địa chỉ",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "SỐ CMND",
    fieldName: "idNo",
    width: 250,
    isRequired: true,
    nameFilter: "Số CMND",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NGÀY CẤP",
    fieldName: "issueOn",
    width: 250,
    isRequired: true,
    nameFilter: "Ngày cấp",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NƠI CẤP",
    fieldName: "placeOfIssue",
    width: 250,
    isRequired: true,
    nameFilter: "Nơi cấp",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "Website",
    fieldName: "website",
    width: 200,
    isRequired: true,
    nameFilter: "Website",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TÊN NHÂN VIÊN",
    fieldName: "employeeName",
    width: 180,
    isRequired: true,
    nameFilter: "Tên nhân viên",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "XƯNG HÔ",
    fieldName: "supplierVocativeName",
    width: 130,
    isRequired: true,
    nameFilter: "Xưng hô",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NGƯỜI LIÊN HỆ",
    fieldName: "supplierNameContact",
    width: 200,
    isRequired: true,
    nameFilter: "Người liên hệ",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "Email",
    fieldName: "supplierEmailContact",
    width: 200,
    isRequired: true,
    nameFilter: "Email",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "Điện thoại NLH",
    fieldName: "supplierMobile",
    width: 180,
    isRequired: true,
    nameFilter: "Điện thoại NLH",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "NGƯỜI ĐẠI DIỆN PL",
    fieldName: "legaRrepresentative",
    width: 200,
    isRequired: true,
    nameFilter: "Người đại diện PL",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐIỀU KHOẢN THANH TOÁN",
    fieldName: "rulePaymentName",
    width: 250,
    isRequired: true,
    nameFilter: "Điều khoản thanh toán",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "SỐ NGÀY ĐƯỢC NỢ",
    fieldName: "dayOwed",
    width: 150,
    isRequired: true,
    nameFilter: "Điều khoản thanh toán",
    typeFilter: "DateTime",
    isField: true,
    filter:{
      operator: '=',
      value: null
    }
  },
  {
    name: "SỐ NỢ TỐI ĐA",
    fieldName: "debitAmountMax",
    width: 150,
    isRequired: true,
    nameFilter: "Số nợ tối đa",
    typeFilter: "DateTime",
    isField: true,
    filter:{
      operator: '=',
      value: null
    }
  },
  {
    name: "CÔNG NỢ",
    fieldName: "debt",
    width: 150,
    isRequired: true,
    nameFilter: "Công nợ",
    typeFilter: "DateTime",
    isField: true,
    filter:{
      operator: '=',
      value: null
    }
  },
  {
    name: "TK CÔNG NỢ PHẢI TRẢ",
    fieldName: "accountPayableName",
    width: 200,
    isRequired: true,
    nameFilter: "TK công nợ phải trả",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TK CÔNG NỢ PHẢI THU",
    fieldName: "accountReceivableName",
    width: 200,
    isRequired: true,
    nameFilter: "TK công nợ phải thu",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "DIỄN GIẢI",
    fieldName: "supplierDescription",
    width: 250,
    isRequired: true,
    nameFilter: "Diễn giải",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TÊN NGÂN HÀNG",
    fieldName: "bankAccountNames",
    width: 250,
    isRequired: true,
    nameFilter: "Tên ngân hàng",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "CHI NHÁNH TÀI KHOẢN NGÂN HÀNG",
    fieldName: "bankAccountBranchs",
    width: 250,
    isRequired: true,
    nameFilter: "Chi nhánh TK ngân hàng",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TỈNH/THÀNH PHỐ TK NGÂN HÀNG",
    fieldName: "bankAccountCitys",
    width: 250,
    isRequired: true,
    nameFilter: "Tỉnh/TP TK ngân hàng",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "ĐỊA ĐIỂM GIAO HÀNG",
    fieldName: "deliveryAddress",
    width: 250,
    isRequired: true,
    nameFilter: "Địa điểm giao hàng",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "QUỐC GIA",
    fieldName: "supplierCountry",
    width: 180,
    isRequired: true,
    nameFilter: "Quốc gia",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TỈNH/THÀNH PHỐ",
    fieldName: "supplierCity",
    width: 180,
    isRequired: true,
    nameFilter: "TỈnh/thành phố",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "QUẬN/HUYỆN",
    fieldName: "supplierDistrict",
    width: 180,
    isRequired: true,
    nameFilter: "Quận/huyện",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "XÃ/PHƯỜNG",
    fieldName: "supplierWard",
    width: 180,
    isRequired: true,
    nameFilter: "Xã/phường",
    typeFilter: "Text",
    isField: true,
    filter:{
      operator: 'like',
      value: null
    }
  },
  {
    name: "TRẠNG THÁI",
    fieldName: "isActive",
    width: 170,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Đang hoạt động",
    isField: true
  },
  {
    name: "LÀ KHÁCH HÀNG",
    fieldName: "isCustomer",
    width: 170,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Là khách hàng",
    isField: true
  },
  {
    name: "LÀ TỔ CHỨC",
    fieldName: "isOrganization",
    width: 170,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Là tổ chức",
    isField: true
  },
  {
    name: "LÀ CÁ NHÂN",
    fieldName: "isPersonal",
    width: 170,
    disabled: true,
    class: "text-align-center",
    checkBoxDisable: true,
    typeFilter: "Boolean",
    nameFilter: "Là cá nhân",
    isField: true
  },
  {
    width: 120,
    fieldName: "CHỨC NĂNG",
    name: "CHỨC NĂNG",
    button: "Sửa",
    combobox: [
      {
        id: 1,
        name: "Nhân bản",
      },
      {
        id: 2,
        name: "Xóa",
      },  
      {
        id: 3,
        name: "Ngưng sử dụng",
      },
    ],
    iconCombobox: false,
    positionCombobox: "top",
    inputCombobox: false,
    class: "table-hover td table-function",
    style: "right:24px",
    type: "function",
  },
  {
    width: 24,
    fieldName: "fakeColumn2",
    class: "position-sticky fake-cloumn",
    style: "right:0",
  },
  {
    width: 24,
    fieldName: "fakeColumn2",
    class: "position-sticky fake-cloumn r-30 background-container",
    style: "right:-24px;",
  },
];

/**
 * Author: Phạm Văn Đạt(11/12/2022)
 * Function: các field thực hiện hàng loạt
 */
export const BatchExecution = [
  {
    name: 'Delete',
    text: "Xóa"
  },{
    name: 'Sum',
    text: "Gộp"
  }
]

/**
 * Author: Phạm Văn Đạt(12/12/2022)
 * Function: các titls form nhà cung cấp
 */
export const RULE_FORM_SUPPLIER_DETAIL = {
  View: "Thông tin nhà cung cấp",
  Create: "Thêm mới nhà cung cấp"
}

/**
 * Author: Phạm Văn Đạt(12/12/2022)
 * Function: HIển thị dữ liệu nhân viên trong bảng con
 */
export const FIELDS_TABLE_COMBOBOX_EMPLOYEE = [
  {
    fieldName: "employeeID",
    width: 0,
    model: true,
    style:"display:none;"
  },
  {
    name: "Mã nhân viên",
    fieldName: "employeeCode",
    width: 150,
  },
  {
    name: "Tên nhân viên",
    fieldName: "employeeName",
    view: true,
    width: 215,
  }
];

/**
 * Author: Phạm Văn Đạt(20/12/2022)
 * Function: HIển thị dữ liệu điều khoản thanh toán trong bảng con
 */
export const FIELDS_TABLE_COMBOBOX_RULE_PAYMENTS = [
  {
    fieldName: "rulePaymentID",
    width: 0,
    model: true
  },
  {
    name: "Mã điều khoản thanh toán",
    fieldName: "rulePaymentCode",
    width: 150,
  },
  {
    name: "Tên điều khoản thanh toán",
    fieldName: "rulePaymentName",
    view: true,
    width: 215,
  }
];

/**
 * Author: Phạm Văn Đạt(13/12/2022)
 * Function: HIển thị dữ liệu nhà cung cấp trong bảng con
 */
export const FIELDS_TABLE_COMBOBOX_SUPPLIERS = [
  {
    fieldName: "groupSupplierID",
    width: 0,
    model: true,
    style:"display:none;"
  },
  {
    name: "Mã nhóm KH, NCC",
    view: true,
    fieldName: "groupSupplierCode",
    width: 150,
  },
  {
    name: "Tên nhóm KH, NCC",
    fieldName: "groupSupplierName",
    width: 215,
  }
];

/**
 * Author: Phạm Văn Đạt(13/12/2022)
 * Function: HIển thị dữ liệu tài khoản công nợ phải trả bảng con
 */
export const FIELDS_TABLE_ACCOUNTS_PAYABLE = [
  {
    name: "Số tài khoản",
    view: true,
    fieldName: "accountPayableNumber",
    width: 100,
  },
  {
    name: "Tên tài khoản",
    fieldName: "accountPayableName",
    width: 175,
  }
];

/**
 * Author: Phạm Văn Đạt(13/12/2022)
 * Function: HIển thị dữ liệu tài khoản công nợ phải thu bảng con
 */
export const FIELDS_TABLE_ACCOUNTS_RECEIVABLE = [
  {
    name: "Số tài khoản",
    view: true,
    fieldName: "accountReceivableNumber",
    width: 100,
  },
  {
    name: "Tên tài khoản",
    fieldName: "accountReceivableName",
    width: 175,
  }
];

/**
 * Author: Phạm Văn Đạt(14/12/2022)
 * Function: Các tabs hiển thị trong form thông tin chi tiết nhà cung cấp
 */
export const LIST_TABS_SUPPLIERS = [
  {
    title: "Thông tin liên hệ",
    content: "<p>thông tin chi tiết</p>",
  },
  {
    title: "Điều khoản thanh toán",
    content: "<p>thông tin chi tiết 1</p>",
  },
  {
    title: "Tài khoản ngân hàng",
    content: "<p>thông tin chi tiết 2</p>",
  },
  {
    title: "Địa chỉ khác",
    content: "<p>thông tin chi tiết 3</p>",
  },
  {
    title: "Ghi chú",
    content: "<p>thông tin chi tiết 4</p>",
  }
]

/**
 * Author: Phạm Văn Đạt(14/12/2022)
 * Function: nhà cung cấp là tổ chức hay cá nhân
 */
export const FIELDS_HEADER_LEFT_SUPPLIER_DETAIL = [
  {
    id: 0,
    name: "Tổ chức",
    field: "isOrganization"
  },
  {
    id: 1,
    name: "Cá nhân",
    field:"isPersonal"
  },
]

/**
 * Author: Phạm Văn Đạt(14/12/2022)
 * Function: Các trường của ngân hàng
 */
export const FIELDS_BACKACCOUNT = [
  {
    name: "backAccountNumber",
    fieldName: "SỐ TÀI KHOẢN",
    width: 150
  },
  {
    name: "backAccountName",
    fieldName: "TÊN NGÂN HÀNG",
    width: 200
  },
  {
    name: "backAccountBrand",
    fieldName: "CHI NHÁNH",
    width: 180
  },
  {
    name: "backAccountAddress",
    fieldName: "TỈNH/TP CỦA NGÂN HÀNG",
    width: 236
  },
];

/**
 * Author: Phạm Văn Đạt(15/12/2022)
 * Function: danh sách các loại hợp đồng
 */
export const LIST_CONTRACT = [
  {
    id: 1,
    name: "Không cú trú",
  },
  {
    id: 2,
    name: "Cư trú và không ký HĐLĐ/HĐLĐ dưới 3 tháng",
  },
  {
    id: 3,
    name: "Cư trú và có HĐLĐ từ 3 tháng trở lên",
  }
]

/**
 * Author: Phạm Văn Đạt(19/12/2022)
 * Function: dữ liệu bảng xưng hô
 */
export const LIST_VOCATIVE = [
  {
    id:1,
    name: "Anh"
  },
  {
    id:2,
    name: "Chị"
  },
  {
    id:3,
    name: "Ông"
  },
  {
    id:4,
    name: "Bà"
  },
]

/**
 * Author: Phạm Văn Đạt(19/12/2022)
 * Function: HIển thị dữ liệu xưng hô bảng con
 */
export const FIELDS_TABLE_COMBOBOX_VOCATIVE = [
  {
    name: "Tên xưng hô",
    view: true,
    fieldName: "name",
    width: 100,
  },
]