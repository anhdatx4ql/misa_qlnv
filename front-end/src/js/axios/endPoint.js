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

    // lấy max code nhà cung cấp
    SuppliersMaxCode: "Suppliers/GetMaxCode",
    
    // lấy max code nhà cung cấp
    GroupSuppliersMaxCode: "GroupSuppliers/GetMaxCode",

    // xóa nhân viên
    EmployeesDelete: "Employees/Delete",

    // tài khoản công nợ phải thu
    AccountsPayable: "AccountsPayable",

    // tài khoản công nợ phải trả
    AccountsReceivable:"AccountsReceivable",

    // tài khoản ngân hàng
    GetBankAccounts:"BankAccounts/GetDataByIds",

    // phòng ban
    Departments:"Departments",

    // nhóm nhà cung cấp
    GroupSuppliers: "GroupSuppliers",

    // thêm mới nhà cung cấp- nhóm nhà cung cấp
    SupplierGroupSupplierInserts: "Suppliers_GroupSuppliers/InsertRecords",

    // thêm mới nhà cung cấp- nhóm nhà cung cấp
    BankAccountsInserts: "BankAccounts/InsertRecords",

    // xóa nhà cung cấp
    DeleteSuppliers: "Suppliers/Delete",

    // nhà cung cấp
    Suppliers: "Suppliers",

    // chức danh
    Positions: "Positions",

    // điều khoản thanh toán
    RulePayments: "RulePayments",

    // xuất excel
    EmployeesExportExcel: 'Employees/ExportExcel'
};
