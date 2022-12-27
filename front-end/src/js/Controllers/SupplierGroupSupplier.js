/**
 * Author: Phạm Văn Đạt(25/12/2022)
 * Function: Xử lý thêm mới nhà cung cấp - nhóm nhà cung cấp
 */

import { END_POINTS } from "../axios/endPoint";
import { insertRecord, } from "../Controllers/BaseController";
import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(15/12/2022)
 * Function: Class lưu thông tin các nhà cung cấp - nhóm nhà cung cấp
 */
export class SupplierGroupSuppliers {

  /**
   * Author: Phạm Văn Đạt(25/12/2022)
   * Function: Thêm mới nhóm nhà cung cấp - nhà cung cấp
   * @param {*} data : Dữ liệu truyền vào
   */
  async insert(data) {
    let res = await insertRecord(END_POINTS.SupplierGroupSupplierInserts, data);

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
export let supplierGroupSuppliers = new SupplierGroupSuppliers();
