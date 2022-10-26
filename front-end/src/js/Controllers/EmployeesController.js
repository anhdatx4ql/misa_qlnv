import {END_POINTS} from '../axios/endPoint';
import { GetAll, Paging,GetMaxCode } from '../Controllers/BaseController'
import {STATUS_CODES} from '../../constants'

// end point của employees
const endPoint = END_POINTS.Employees;

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view khách hàng
 */
export let employeeModel={
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

  // ngày tạo
  createdAt: null,

  // người tạo
  createdBy: "Phạm Văn Đạt",

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
  isDelete: true,

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

  // ngày cập nhật
  updatedAt: null,

  // người cập nhật
  updatedBy: "Phạm Văn Đạt"
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
    * Lấy dữ liệu khách hàng hiện tại
    * @returns 
    */
  async GetRecords(){
    let res =  await GetAll(endPoint);
    // kiểm tra res trả về
    this.data = res;
  }

  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async PagingEmployee(){

    let res = await Paging(END_POINTS.PagingEmployee,this.keyword,this.currentPageNumber,this.pageSize);
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
   */
  async GetMaxCode(){
    let res = await GetMaxCode(END_POINTS.EmployeesMaxCode);
    if(res.statusCode == STATUS_CODES.Code200){
      return res.data;
    }else{
      console.log(res)
    }
  }

}

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
*/
export let employees = new Employees();
