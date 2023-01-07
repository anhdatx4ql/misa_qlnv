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
        .get("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
        .then((res) => {
          return res.data;
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
        .get("https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode="+code+"&limit=-1")
        .then((res) => {
          return res.data;
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
        .get("https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode="+code+"&limit=-1")
        .then((res) => {
          return res.data;
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