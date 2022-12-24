import { END_POINTS } from "../axios/endPoint";
import {
  insertRecord,
  updateRecord,
  paging,
  getMaxCode,
  deleteRecords,
  exportExcel,
} from "../Controllers/BaseController";
import { STATUS_CODES } from "../constants";

// end point của employees
// const endPoint = END_POINTS.Employees;

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view khách hàng
 */
export const employeeModel = {
  // id Tài khoản công nợ phải trả
  accountPayableId: null,

  // id Tài khoản công nợ phải thu
  accountReceivable: null,

  // Hệ số lương
  coefficientSalary: 0,

  // ngày tạo
  createdAt: null,

  // người tạo
  createdBy: null,

  // id đơn vị
  departmentId: null,

  // tên đơn vị
  departmentName: null,

  // Địa chỉ
  employeeAddress: null,

  // ngày sinh
  employeeBirthDay: null,

  // mã nhân viên
  employeeCode: null,

  // số điện thoại bàn
  employeeDeskPhone: null,

  // email
  employeeEmail: null,

  // giới tính mặc định là nam
  employeeGender: 0,

  // id
  employeeID: null,

  // tên nhân viên
  employeeName: null,

  // số điện thoại di động
  employeeNumberPhone: null,

  // Số chứng minh nhân dân
  idNo: null,

  // kiểm tra xóa hay chưa
  isDelete: false,

  // là KH
  isEmployee: false,

  // là nhà cung cấp
  isSuppiler: false,

  // ngày cấp
  issuaOn: null,

  // số người phụ thuộc
  numberOfDependent: 0,

  // nơi cấp
  placeOfIssue: null,

  // id chức vụ
  positionId: null,

  // tên chức vụ
  positionName: null,

  // lương đóng bảo hiểm
  premiumSalary: 0,

  // mã số thuế
  taxCode: null,

  // loại hợp đồng - không được để trống
  typeOfContract: null,

  // ngày cập nhật
  updatedAt: null,

  // người cập nhật
  updatedBy: null,

  // lương thỏa thuận
  wageAgreement: 0,
};

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Class lưu thông tin các khách hàng
 */
export class Employees {
  // khởi tạo giá trị
  constructor(
    data,
    keyword = null,
    currentData,
    currentPageNumber = 1,
    pageSize = 10,
    totalCount = 0,
    countLoadData= 0
  ) {
    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.currentData = data;
    this.countLoadData = countLoadData;
  }

  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async pagingEmployee(data) {
    let dataKeyword = [];

    // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt
    if (this.keyword) {
      console.log(this.keyword);
      dataKeyword.push(
        {
          name: "employeeID",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "employeeName",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "employeeNumberPhone",
          operator: "like",
          value: this.keyword,
          stringConcatenation: "like",
        }
      );
    }

    let newData = [...data];

    if (dataKeyword != []) {
      newData.push(...dataKeyword);
    }

    
    let lengthCurrentData = this.currentData ? this.currentData.length : -1;

    if (this.countLoadData > 0) {
      this.currentPageNumber++;
    }

    // nếu số bản ghi hiện tại <= tổng số bản ghi => tăng số trang hiện tại lên 1 và load lại. Nếu không thì thôi
    if (lengthCurrentData != this.totalCount) {
      // tăng số lần load lên 1
      this.countLoadData++;

      // gọi đến paging basecontroler
      let res = await paging(
        END_POINTS.PagingEmployee,
        this.currentPageNumber,
        this.pageSize,
        newData
      );

      // kiểm tra data trả về
      if (res.statusCode == STATUS_CODES.Code200) {

        this.data = res.data.data;

        // nếu load dữ liệu thành công
        if (res.data.data != []) {
          if (this.currentData == undefined) {
            this.currentData = [...res.data.data];
          } else {
            this.currentData = [...this.currentData, ...res.data.data];
          }
          // load thành công
        }else{
          // không có dữ liệu
          this.currentPageNumber--;
        }

        this.totalCount = res.data.totalCount;
      } else {
        console.log(res);
      }
    }

  }

  /**
   * Author: Phạm Văn Đạt(23/10/2022)
   * Function: Lấy mã code mới nhất
   * @returns trả về dữ liệu nếu thành công.
   */
  async getMaxCode() {
    let res = await getMaxCode(END_POINTS.EmployeesMaxCode);
    if (res.statusCode == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log(res);
    }
  }

  /**
   * Author: Phạm Văn Đạt(09/11/2022)
   * Function: Xử lý xuất excel
   * @param {*} data : keyword
   * @returns: file excel nếu có
   */
  async exportExcel(data) {
    let endString = "";
    if (data) {
      endString = "?keyword=" + data;
    }

    await exportExcel(END_POINTS.EmployeesExportExcel + endString);
  }

  /**
   * Author: Phạm Văn Đạt(28/10/2022)
   * Function: Thêm mới nhân viên
   * @param {*} data : Dữ liệu truyền vào
   */
  async insertEmployee(data) {
    let res = await insertRecord(END_POINTS.Employees, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log(res);
      console.log("thêm mới thất bại");
    }
  }

  /**
   * Author: Phạm Văn Đạt(03/11/2022)
   * Function: Xử lý update nhân viên
   * @param {*} data : Dữ liệu truyền vào
   */
  async updateEmployee(data) {
    let res = await updateRecord(END_POINTS.Employees, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log("thêm mới thất bại");
    }
  }

  /**
   * Author: Phạm Văn Đạt(03/11/2022)
   * Function: Xử lý xóa nhân viên
   * @param {*} data : id nhân viên muốn xóa
   * @returns : response
   */
  async deleteEmployee(data) {
    if (data) {
      let res = await deleteRecords(END_POINTS.EmployeesDelete, data);

      if (res.status == STATUS_CODES.Code200) {
        return res.data;
      } else {
        console.log(res);
        console.log("Xóa thất bại!");
      }
    }
  }
}

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */
export let employees = new Employees();

/**
 * Author: Phạm Văn Đạt(23/10/2022)
 * Function: Reset dữ liệu
 */
export async function resetEmployeeDetail(object, employees) {
  try {
    let newCode = await employees.getMaxCode();
    if (newCode) {
      object.employeeCode = newCode;
    }

    // lưu giá trị object null
    Object.keys(object).forEach((key) => {
      // nếu key khác id thì xóa giá trị cũ đi
      if (key != "employeeID" && key != "employeeCode") {
        // giới tính mặc định là nam
        if (
          key == "employeeGender" ||
          key == "wageAgreement" ||
          key == "coefficientSalary" ||
          key == "premiumSalary" ||
          key == "numberOfDependent"
        ) {
          // 0 là nam
          object[key] = 0;
        } else if (
          key == "isDelete" ||
          key == "isEmployee" ||
          key == "isSuppiler"
        ) {
          // các giá trị boolean trả về false
          object[key] = false;
        } else {
          // các thuộc tính khác trả về null
          object[key] = null;
        }
      }
    });

    return object;
  } catch (e) {
    console.log(e);
  }
}
