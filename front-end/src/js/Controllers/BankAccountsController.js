/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: controller xử lý nghiệp vụ tài khoản ngân hàng
 */

import { END_POINTS } from "../axios/endPoint";
import { getDataByIds } from "../Controllers/BaseController";
import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(21/12/2022)
 * Function: Class lưu thông tin các tài khoản ngân hàng
 */
export class BankAccounts {
  // khởi tạo giá trị
  constructor(data) {
    this.data = data;
  }

  /**
   * Author: Phạm Văn Đạt(21/12/2022)
   * Function: lấy danh sách dữ liệu theo id truyền vào
   * @param {*} data : Dữ liệu truyền vào
   */
  async getDataByIds(data) {
    let res = await getDataByIds(END_POINTS.GetBankAccounts, data);

    if (res.status == STATUS_CODES.Code200) {
        if(res.data){
            return res.data.data;
        }
      return [];
    } else {
      console.log(res);
      console.log("lấy danh sách khách hàng thất bại!");
    }
  }

}

export let bankAccounts = new BankAccounts();
