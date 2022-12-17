/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: controller xử lý nghiệp vụ của nhà cung cấp
 */
import { END_POINTS } from "../axios/endPoint";
import {
  insertRecord,
  updateRecord,
  paging,
} from "../Controllers/BaseController";

import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp
 */

export class Suppliers {
  // khởi tạo giá trị
  constructor(
    data,
    keyword = null,
    currentPageNumber = 1,
    pageSize = 10,
    totalCount
  ) {
    this.data = data;
    this.keyword = keyword;
    this.currentPageNumber = currentPageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }

 /**
   * Author: Phạm Văn Đạt(17/122022)
   * Function: phân trang dữ liệu
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhà cung cấp
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
 async pagingSuppliers(data) {
    let dataKeyword = [];

    // nếu tồn tại keyword thì tìm kiếm theo keyword với 3 trường: tên, mã , sđt
    if (this.keyword) {
      console.log(this.keyword);
      dataKeyword.push(
        {
          name: "supplierCode",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "supplierName",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
      );
    }

    let newData = [...data];

    if (dataKeyword != []) {
      newData.push(...dataKeyword);
    }

    console.log(newData);

    let res = await paging(
      END_POINTS.PagingSuppliers,
      this.currentPageNumber,
      this.pageSize,
      newData
    );
    if (res.statusCode == STATUS_CODES.Code200) {
      this.data = res.data.data;
      this.totalCount = res.data.totalCount;
    } else {
      console.log(res);
    }
  }

  /**
   * Author: Phạm Văn Đạt(17/12/2022)
   * Function: Thêm mới nhà cung cấp
   * @param {*} data : Dữ liệu truyền vào
   */
  async insertEmployee(data) {
    let res = await insertRecord(END_POINTS.Suppliers, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log(res);
      console.log("thêm mới thất bại");
    }
  }

  /**
   * Author: Phạm Văn Đạt(03/11/2022)
   * Function: Xử lý update nhà cung cấp
   * @param {*} data : Dữ liệu truyền vào
   */
  async updateEmployee(data) {
    let res = await updateRecord(END_POINTS.Suppliers, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log("thêm mới thất bại");
    }
  }

}
