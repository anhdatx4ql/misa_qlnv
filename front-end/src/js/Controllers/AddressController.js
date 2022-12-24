import axios from "axios";

/**
 * Author: Phạm Văn Đạt(21/12/2022)
 * Function: xử lý lấy địa chỉ Việt Nam
 */
export class Address {

  /**
   * Author: Phạm Văn Đạt(21/12/2022)
   * Function: lấy danh sách tỉnh/ thành phố
   */
  async getAllProvince() {
    try {
      return await axios
        .get("https://provinces.open-api.vn/api/")
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Author: Phạm Văn Đạt(21/12/2022)
   * Function: lấy danh sách quận/huyện
   */
  async getAllDistricts(code) {
    try {
      return await axios
        .get("https://provinces.open-api.vn/api/p/" + code + "?depth=2")
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

   /**
   * Author: Phạm Văn Đạt(21/12/2022)
   * Function: lấy danh sách các phường
   */
  async getAllWards(code) {
    try {
      return await axios
        .get("https://provinces.open-api.vn/api/d/" + code + "?depth=2")
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
      
    }
  }
}

/**
 * Author: Phạm Văn Đạt(22/12/2022)
 * Function: khởi tạo đối tượng để thao tác
 */
export let address = new Address();