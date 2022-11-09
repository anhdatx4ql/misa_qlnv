import {END_POINTS} from '../axios/endPoint';
import {insertRecord,updateRecord, paging,getMaxCode,deleteRecords,exportExcel } from '../Controllers/BaseController'
import {STATUS_CODES} from '../../constants'

// end point của employees
// const endPoint = END_POINTS.Employees;

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view khách hàng
 */
export const employeeModel={
  // Địa chỉ
  address: null,

  // Chi nhánh ngân hàng
  bankAccountBrand: null,

  // Số tài khoản
  bankAccountNumber: null,

  // Tên ngân hàng
  bankName: null,

  // ngày sinh
  birthDay: null,

  // người tạo
  createdBy: null,

  // id phòng ban
  departmentId: null,

  // tên phòng ban
  departmentName: null,

  // điện thoại bàn
  deskPhone: null,

  // email
  email: null,

  // mã khách hàng
  employeeId: null,

  // giới tính (0-nam, 1-nữ, 2-khác)
  gender: 0,

  // id
  id: null,

  // số chứng minh nhân dân
  idNo: null,

  // kiểm tra xóa hay chưa
  isDelete: false,

  // là khách hàng
  isEmployee: false,

  // là nhà cung cấp
  isSuppiler: false,

  // Ngày cấp
  issuaOn: null,

  // tên khách hàng
  name: null,

  // số điện thoại
  numberPhone: null,

  // Nơi cấp
  placeOfIssue: null,

  // id chức danh
  positionId: null,

  // tên chức danh
  positionName: null,

  // người cập nhật
  updatedBy: null
};

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Class lưu thông tin các khách hàng
 */
export class Employees{

  // khởi tạo giá trị
  constructor(data, keyword = null, currentPageNumber = 1, pageSize = 10,totalCount){
    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize= pageSize;
    this.totalCount = totalCount;
  }

  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async pagingEmployee(){

    let res = await paging(END_POINTS.PagingEmployee,this.keyword,this.currentPageNumber,this.pageSize);
    if(res.statusCode == STATUS_CODES.Code200){
      this.data = res.data.data;
      this.totalCount = res.data.totalCount;
    }else{
      console.log(res)
    }
  }

  /**
   * Author: Phạm Văn Đạt(23/10/2022)
   * Function: Lấy mã code mới nhất
   * @returns trả về dữ liệu nếu thành công.
   */
  async getMaxCode(){

    let res = await getMaxCode(END_POINTS.EmployeesMaxCode);
    if(res.statusCode == STATUS_CODES.Code200){
      return res.data;
    }else{
      console.log(res)
    }
  }

  /**
   * Author: Phạm Văn Đạt(09/11/2022)
   * Function: Xử lý xuất excel
   * @param {*} data : keyword
   * @returns: file excel nếu có
   */
  async exportExcel(data){
    let endString = '';
    if(data){
      endString = '?keyword='+data;
    }
    
    await exportExcel(END_POINTS.EmployeesExportExcel+endString)
  }

  /**
   * Author: Phạm Văn Đạt(28/10/2022)
   * Function: Thêm mới nhân viên
   * @param {*} data : Dữ liệu truyền vào
   */
  async insertEmployee(data){
    let res = await insertRecord(END_POINTS.Employees,data);
    
    if(res.status == STATUS_CODES.Code200){
      return res.data;
    }else{
      console.log(res);
      console.log("thêm mới thất bại");
    }

  }

  /**
   * Author: Phạm Văn Đạt(03/11/2022)
   * Function: Xử lý update nhân viên
   * @param {*} data : Dữ liệu truyền vào
   */
  async updateEmployee(data){
    
    let res = await updateRecord(END_POINTS.Employees,data);
    
    if(res.status == STATUS_CODES.Code200){
      return res.data;
    }else{
      console.log("thêm mới thất bại");
    }
  }

  /**
   * Author: Phạm Văn Đạt(03/11/2022)
   * Function: Xử lý xóa nhân viên
   * @param {*} data : id nhân viên muốn xóa
   * @returns : response
   */
  async deleteEmployee(data){

    if(data){
      let res = await deleteRecords(END_POINTS.EmployeesDelete,data);
    
      if(res.status == STATUS_CODES.Code200){
        return res.data;
      }else{
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
export async function resetEmployeeDetail(object,employees) {
  try {

    let newCode = await employees.getMaxCode();
    if (newCode) {
      object.employeeId = newCode;
    }

    // lưu giá trị object null
    Object.keys(object).forEach(key => {

        // nếu key khác id thì xóa giá trị cũ đi
        if(key != "id" && key != "employeeId"){

          // giới tính mặc định là nam
          if(key == "gender"){
            // 0 là nam
            object[key] = 0;
          }else if(key == "isDelete" || key == "isEmployee" || key == "isSuppiler"){
            // các giá trị boolean trả về false
            object[key] = false;
          }else{
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