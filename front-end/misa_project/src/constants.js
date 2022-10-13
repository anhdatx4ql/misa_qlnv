/**
 * Author: Phạm Văn Đạt
 * Function: danh sách item menu
 */
export const MENU_ITEMS=[
    {
        // tên item
        title: "Tổng quan",

        // vị trí icon
        iconPosition: [-33,-1630],

        // class nếu active vào item
        activeClass: "",
        // điều hướng item
        route: "tong-quan"
    },
    {
        title: "Tiền mặt",
        iconPosition: [-78,-1631],
        activeClass: "",
        route: "tien-mat"
    },
    {
        title: "Tiền gửi",
        iconPosition: [-121,-1633],
        activeClass: "",
        route: "tien-gui"
    },
    {
        title: "Mua hàng",
        iconPosition: [-165,-1632],
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
        iconPosition: [-254,-1632],
        activeClass: "",
        route: "quan-ly-hoa-don"
    },
    {
        title: "Kho",
        iconPosition: [-294,-1632],
        activeClass: "",
        route: "kho"
    },
    {
        title: "Công cụ dụng cụ",
        iconPosition: [-339,-1633],
        activeClass: "",
        route: "cong-cu-dung-cu"
    },
    {
        title: "Tài sản cố định",
        iconPosition: [-382,-1632],
        activeClass: "",
        route: "tai-san-co-dinh"
    },
    {
        title: "Thuế",
        iconPosition: [-427,-1634],
        activeClass: "",
        route: "thue"
    },
    {
        title: "Giá thành",
        iconPosition: [-471,-1633],
        activeClass: "",
        route: "gia-thanh"
    },
    {
        title: "Tổng hợp",
        iconPosition: [-514,-1632],
        activeClass: "",
        route: "tong-hop"
    },
    {
        title: "Ngân sách",
        iconPosition: [-382,-1664],
        activeClass: "",
        route: "ngan-sach"
    },
    {
        title: "Báo cáo",
        iconPosition: [-552,-1636],
        activeClass: "",
        route: "bao-cao"
    },
    {
        title: "Phân tích tài chính",
        iconPosition: [-207,-1667],
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
    },
    {
        name: 'MÃ NHÂN VIÊN',
        fieldName: 'EmployeeId',
        width: 230,
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
        width: 130,
    },
    {
        name: 'ĐỊA CHỈ',
        fieldName: 'Address',
        width: 230,
    },

]

