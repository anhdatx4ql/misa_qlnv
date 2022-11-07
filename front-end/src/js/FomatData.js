/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Xử lý format dữ liệu
 */
import moment from "moment";

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Xử lý format ngày tháng năm
 * @param {*} value ngày tháng năm đưa vào
 * @returns ngày tháng sau khi format
 */
export function formatDate(value, type = "YYYY-MM-DD") {
  return moment(value).format(type);
}

/**
 * Author: Phạm Văn Đạt(03/11/2022)
 * Function: Xử lý chuyển chữ đầu thành chữ thường
 * @param {*} string Chuỗi string đưa vào
 * @returns Chuỗi sau khi bỏ in hoa chữ đầu
 */
export function lowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Author: Phạm Văn Đạt(04/11/2022)
 * Function: Xử lý in hoa chữ cái đầu tiên
 */
export function titleCase(string) {
  if (string != null) {
    //1. Tách các từ, cụm từ trong chuỗi ban đầu
    let sentence = string.toLowerCase().split(" ");
    //2. Tạo vòng lặp và viết hoa chữ cái đầu tiên của các từ, cụm từ trên
    if (sentence.length > 0) {
      for (var i = 0; i < sentence.length; i++) {
        sentence[i] =
          sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
      }
      //3. Nối các từ, cụm từ đã xử lý ở trên và trả về kết quả
      return sentence.join(" ");
    }
  }

  return string;
}
