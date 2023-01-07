/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: xử lý nghiệp vụ của nhóm nhà cung cấp, khách hàng
 */

import { END_POINTS } from "../axios/endPoint";
import { insertRecord, paging, getMaxCode } from "../Controllers/BaseController";
import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view nhóm nhà cung cấp, khách hàng
 */
export const groupSupplierModel = {
  //  id nhóm nhà cung cấp, KH
  groupSupplierID: null,

  // mã nhóm NCC,KH
  groupSupplierCode: null,

  // Tên nhóm NCC, KH
  groupSupplierName: null,

  // Thông tin chi tiết nhóm khách hàng
  groupSupplierDescription: null,

  // id nhóm cha
  parentGroupSupplierId: null,
};

/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp
 */
export class GroupSuppliers {
  // khởi tạo giá trị
  constructor(
    data,
    currentData,
    keyword = null,
    currentPageNumber = 1,
    pageSize = 10,
    totalCount = 0,
    countLoadData = 0
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
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhóm nhà cung cấp
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async pagingGroupSupplier(data,checkLoadCurentPage) {
    let dataKeyword = [];

    // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt
    if (this.keyword) {
      dataKeyword.push(
        {
          name: "groupSupplierCode",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "groupSupplierName",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        }
      );
    }

    // nếu không phải load lần đầu thì tăng số lượng trang lên 1
    if (this.countLoadData > 0) {
      this.currentPageNumber = this.currentPageNumber + 1;
    }

    let newData = [...data];

    if (dataKeyword != []) {
      newData.push(...dataKeyword);
    }

    let lengthCurrentData = this.currentData ? this.currentData.length : -1;

    if (this.countLoadData > 0) {
      this.currentPageNumber = this.currentPageNumber+1;
    }

    // nếu keywword thay đổi, load lại từ trang 1
    if(checkLoadCurentPage){
      this.currentPageNumber = 1;
    }

    // nếu số bản ghi hiện tại <= tổng số bản ghi => tăng số trang hiện tại lên 1 và load lại. Nếu không thì thôi
    if (lengthCurrentData != this.totalCount || this.keyword || this.totalCount == 0) {
      // tăng số lần load lên 1
      this.countLoadData++;

      // gọi đến paging basecontroler
      let res = await paging(
        END_POINTS.PagingGroupSuppliers,
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
          
          // lấy data
          this.data = (res.data.data.length > 0)?[...res.data.data]:[];

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
   * Author: Phạm Văn Đạt(17/12/2022)
   * Function: Thêm mới nhóm nhà cung cấp
   * @param {*} data : Dữ liệu truyền vào
   */
  async insertGroupSuppliers(data) {
    let res = await insertRecord(END_POINTS.GroupSuppliers, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log(res);
      console.log("thêm mới thất bại");
    }
  }
  
  /**
   * Author: Phạm Văn Đạt(26/12/2022)
   * Function: Lấy mã code mới nhất
   * @returns trả về dữ liệu nếu thành công.
   */
  async getMaxCode() {
    let res = await getMaxCode(END_POINTS.GroupSuppliersMaxCode);
    if (res.statusCode == STATUS_CODES.Code200) {
      console.log(res.data);
      return res.data;
    } else {
      console.log(res);
    }
  }
}

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */
export let groupSuppliers = new GroupSuppliers();


/**
 * Author: Phạm Văn Đạt(26/12/2022)
 * Function: Reset dữ liệu
 */
export function reset(object) {
  try {
    // let newCode = await groupSuppliers.getMaxCode();
    // if (newCode) {
    //   object.groupSupplierCode = newCode;
    // }

    // lưu giá trị object null
    Object.keys(object).forEach((key) => {
      // if(key != "groupSupplierCode")
          // các thuộc tính khác trả về null
          object[key] = null;
    });

    console.log(object)

    return object;
  } catch (e) {
    console.log(e);
  }
}