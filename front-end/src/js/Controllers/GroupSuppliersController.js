
/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: xử lý nghiệp vụ của nhóm nhà cung cấp, khách hàng
 */

import { END_POINTS } from "../axios/endPoint";
import {
  insertRecord,
  paging
} from "../Controllers/BaseController";
import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(22/10/2022)
 * Function: Model view nhóm nhà cung cấp, khách hàng
 */
export const groupSupplierModel = {
    //  id nhóm nhà cung cấp, KH
    groupSupplierID: null,

    // mã nhóm NCC,KH
    GroupSupplierCode: null,

    // Tên nhóm NCC, KH
    GroupSupplierName: null,

    // Thông tin chi tiết nhóm khách hàng
    GroupSupplierDescription: null,

    // id nhóm cha
    ParentGroupSupplierId: null,

    // ngày tạo
    createdAt: null,

    // ngày cập nhật
    updatedAt: null,

    //  người tạo
    createdBy: null,

    // người cập nhật
    updatedBy: null,
}

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
    totalCount = 0
  ) {
    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.currentData = data;
  }

  /**
   * Author: Phạm Văn Đạt(19/10/2022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhóm nhà cung cấp
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async pagingGroupSupplier(data) {
    let dataKeyword = [];

    // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt
    if (this.keyword) {
      console.log(this.keyword);
      dataKeyword.push(
        {
          name: "GroupSupplierCode",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "GroupSupplierName",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        }
      );
    }

    let newData = [...data];

    if (dataKeyword != []) {
      newData.push(...dataKeyword);
    }

    console.log(newData);

    let res = await paging(
      END_POINTS.PagingGroupSuppliers,
      this.currentPageNumber,
      this.pageSize,
      newData
    );
    if (res.statusCode == STATUS_CODES.Code200) {
      this.data = res.data.data;
      this.currentData = [...this.currentData,...this.data];
      this.totalCount = res.data.totalCount;
    } else {
      console.log(res);
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

}

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Khởi tạo đối tượng để xử lý xuyên suốt
 */
export let groupSuppliers = new GroupSuppliers();