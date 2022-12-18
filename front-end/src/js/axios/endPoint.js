/**
 * Author: Phạm Văn Đạt (19/10/2022)
 * Function: api chính
 */
export const ROOT_API =  "https://localhost:44348/api/";

/**
 * Author: Phạm Văn Đạt (19/10/2022)
 * Function:các điểm cuối của api
 */
export const END_POINTS= {
    // nhân viên
    Employees: "Employees",

    // phân trang nhân viên
    PagingEmployee: "Employees/Paging?",

    // phân trang nhà cung cấp
    PagingSuppliers: "Suppliers/Paging?",

    // phân trang tài khoản công nợ phải thu
    PagingAccountsPayable: "AccountsPayable/Paging?",

    // phân trang tài khoản công nợ phải trả
    PagingAccountsReceivable:"AccountsReceivable/Paging?",
    
    // phân trang điều khoản thanh toán
    PagingRulePayments: "RulePayments/Paging?",

    // phân trang nhóm nhà cung cấp
    PagingGroupSuppliers: "GroupSuppliers/Paging?",
    
    // lấy max code nhân viên
    EmployeesMaxCode: "Employees/GetMaxCode",

    // xóa nhân viên
    EmployeesDelete: "Employees/Delete",

    // tài khoản công nợ phải thu
    AccountsPayable: "AccountsPayable",

    // tài khoản công nợ phải trả
    AccountsReceivable:"AccountsReceivable",

    // phòng ban
    Departments:"Departments",

    // nhóm nhà cung cấp
    GroupSuppliers: "GroupSuppliers",

    // nhà cung cấp
    Suppliers: "Suppliers",

    // chức danh
    Positions: "Positions",

    // điều khoản thanh toán
    RulePayments: "RulePayments",

    // xuất excel
    EmployeesExportExcel: 'Employees/ExportExcel'
};
