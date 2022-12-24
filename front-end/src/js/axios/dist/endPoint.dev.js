"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.END_POINTS = exports.ROOT_API = void 0;

/**
 * Author: Phạm Văn Đạt (19/10/2022)
 * Function: api chính
 */
var ROOT_API = "https://localhost:44348/api/";
/**
 * Author: Phạm Văn Đạt (19/10/2022)
 * Function:các điểm cuối của api
 */

exports.ROOT_API = ROOT_API;
var END_POINTS = {
  // nhân viên
  Employees: "Employees",
  // phân trang nhân viên
  PagingEmployee: "Employees/Paging?",
  // phân trang nhà cung cấp
  PagingSuppliers: "Suppliers/Paging?",
  // phân trang tài khoản công nợ phải thu
  PagingAccountsPayable: "AccountsPayable/Paging?",
  // phân trang tài khoản công nợ phải trả
  PagingAccountsReceivable: "AccountsReceivable/Paging?",
  // phân trang điều khoản thanh toán
  PagingRulePayments: "RulePayments/Paging?",
  // phân trang nhóm nhà cung cấp
  PagingGroupSuppliers: "GroupSuppliers/Paging?",
  // lấy max code nhân viên
  EmployeesMaxCode: "Employees/GetMaxCode",
  // lấy max code nhà cung cấp
  SuppliersMaxCode: "Suppliers/GetMaxCode",
  // xóa nhân viên
  EmployeesDelete: "Employees/Delete",
  // tài khoản công nợ phải thu
  AccountsPayable: "AccountsPayable",
  // tài khoản công nợ phải trả
  AccountsReceivable: "AccountsReceivable",
  // tài khoản ngân hàng
  GetBankAccounts: "BankAccounts/GetDataByIds",
  // phòng ban
  Departments: "Departments",
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
exports.END_POINTS = END_POINTS;