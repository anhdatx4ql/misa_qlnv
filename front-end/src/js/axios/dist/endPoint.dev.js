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
  Employees: "Employees",
  PagingEmployee: "Employees/Paging?",
  EmployeesMaxCode: "Employees/GetMaxCode",
  EmployeesDelete: "Employees/Delete",
  Departments: "Departments",
  Positions: "Positions"
};
exports.END_POINTS = END_POINTS;