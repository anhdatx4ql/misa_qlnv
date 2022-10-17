/**
 * Author: Phạm Văn Đạt
 * Function: danh sách item menu
 */
export const MENU_ITEMS=[
    {
        // tên item
        title: "Tổng quan",

        // vị trí icon
        iconPosition: [-30,-1629],

        // class nếu active vào item
        activeClass: "",
        // điều hướng item
        route: "tong-quan"
    },
    {
        title: "Tiền mặt",
        iconPosition: [-73,-1628],
        activeClass: "",
        route: "tien-mat"
    },
    {
        title: "Tiền gửi",
        iconPosition: [-117,-1630],
        activeClass: "",
        route: "tien-gui"
    },
    {
        title: "Mua hàng",
        iconPosition: [-161,-1630],
        activeClass: "",
        route: "mua-hang"
    },
    {
        title: "Bán hàng",
        iconPosition: [-206,-1631],
        activeClass: "",
        route: "ban-hang"
    },
    {
        title: "Quản lý hóa đơn",
        iconPosition: [-250,-1629],
        activeClass: "",
        route: "quan-ly-hoa-don"
    },
    {
        title: "Kho",
        iconPosition: [-291,-1630],
        activeClass: "",
        route: "kho"
    },
    {
        title: "Công cụ dụng cụ",
        iconPosition: [-336,-1630],
        activeClass: "",
        route: "cong-cu-dung-cu"
    },
    {
        title: "Tài sản cố định",
        iconPosition: [-379,-1630],
        activeClass: "",
        route: "tai-san-co-dinh"
    },
    {
        title: "Thuế",
        iconPosition: [-423,-1631],
        activeClass: "",
        route: "thue"
    },
    {
        title: "Giá thành",
        iconPosition: [-468,-1630],
        activeClass: "",
        route: "gia-thanh"
    },
    {
        title: "Tổng hợp",
        iconPosition: [-511,-1630],
        activeClass: "",
        route: "tong-hop"
    },
    {
        title: "Ngân sách",
        iconPosition: [-378,-1661],
        activeClass: "",
        route: "ngan-sach"
    },
    {
        title: "Báo cáo",
        iconPosition: [-547,-1632],
        activeClass: "",
        route: "bao-cao"
    },
    {
        title: "Phân tích tài chính",
        iconPosition: [-204,-1662],
        activeClass: "",
        route: "phan-tich-tai-chinh"
    },
]

/**
 * Author: Phạm Văn Đạt
 * Function: danh sách tên công ty
 */
export const COMPANIES=[
    {
        name: "CÔNG TY A",
        value: 1
    },
    {
        name: "CÔNG TY B",
        value: 2
    },
    {
        name: "CÔNG TY C",
        value: 3
    },
]

/**
 * Author: Phạm Văn Đạt
 * Function: các trường trong table
 */
export const TABLE_FIELDS=[
    {
        name: 'TÊN NHÂN VIÊN',
        fieldName: 'Name',
        width: 120,
        isRequired:true
    },
    {
        name: 'MÃ NHÂN VIÊN',
        fieldName: 'EmployeeId',
        width: 230,
        isRequired:true
    },
    {
        name: 'GIỚI TÍNH',
        fieldName: 'Gender',
        width: 100,
    },
    {
        name: 'NGÀY SINH',
        fieldName: 'BirthDay',
        width: 140,
    },
    {
        name: 'SỐ CMND',
        fieldName: 'IdNo',
        width: 130,
    },
    {
        name: 'NGÀY CẤP',
        fieldName: 'IssuaOn',
        width: 120,
    },
    {
        name: 'NƠI CẤP',
        fieldName: 'PlaceOfIssue',
        width: 130,
    },
    {
        name: 'CHỨC DANH',
        fieldName: 'PositionId',
        width: 230,
    },
    {
        name: 'TÊN ĐƠN VỊ',
        fieldName: 'DepartmentId',
        width: 230,
        isRequired:true
    },
    {
        name: 'SỐ TÀI KHOẢN',
        fieldName: 'BankAccountNumber',
        width: 190,
    },
    {
        name: 'TÊN NGÂN HÀNG',
        fieldName: 'BankName',
        width: 150,
    },
    {
        name: 'CHI NHÁNH NGÂN HÀNG',
        fieldName: 'BankAccountBrand',
        width: 230,
    },
    {
        name: 'ĐT DI ĐỘNG',
        fieldName: 'NumberPhone',
        width: 130,
    },
    {
        name: 'ĐT CỐ ĐỊNH',
        fieldName: 'DeskPhone',
        width: 130,
    },
    {
        name: 'EMAIL',
        fieldName: 'Email',
        width: 180,
    },
    {
        name: 'LÀ KHÁCH HÀNG',
        fieldName: 'IsEmployee',
        width: 130,
    },
    {
        name: 'LÀ NHÀ CUNG CẤP',
        fieldName: 'IsSuppiler',
        width: 180,
    },
    {
        name: 'ĐỊA CHỈ',
        fieldName: 'Address',
        width: 230,
    },
]

/**
 * Author: Phạm Văn Đạt
 * Function: các trường phân trang
 */
export const PAGING_ITEMS=[
    {
        id: 10,
        name:"10 bản ghi trên trang"
    },
    {
        id: 20,
        name:"20 bản ghi trên trang"
    },
    {
        id: 50,
        name:"50 bản ghi trên trang"
    },
    {
        id: 100,
        name:"100 bản ghi trên trang"
    },
]

/**
 * Author: Phạm Văn Đạt
 * Function: dữ liệu mẫu position
 */
export const POSITIONS_LIST=[
    {
        id:"12312",
        name:"Công nghệ"
    },
    {
        id:"123",
        name:"Công nghệ"
    },
    {
        id:"12",
        name:"Công nghệ"
    },
    {
        id:"1",
        name:"Công nghệ"
    },
    {
        id:"12311",
        name:"Công nghệ"
    }
]

/**
 * Author: Phạm Văn Đạt
 * Function: enum gender (0-nam, 1-nữ, 2-khác)
 */
export const GENDERS = {
   Male: 0,
   Female: 1,
   Other: 2
}