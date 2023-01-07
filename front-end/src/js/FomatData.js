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
 * Author: Phạm Văn Đạt(29/12/2022)
 * Function: Xử lý format tiền tiệ
 */
export function FormatCash(str) {
  if(!str){
    return str;
  }
  // chuyển về string
  str = str.toString();

  // xóa bỏ dấu .
  str = str.replace(/\./g, '');

  // ép kiểu thành số nguyên
  str = parseInt(str);

  return str.toString().split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
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
export function TitleCase(string) {
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

/**
 * Author: Phạm Văn Đạt(15/12/2022)
 * Function: xử lý nhập decimal
 */
export function Decimal(value) {

  if(!value){
    return "0,00";
  }

  // chuyển giá trị về dạng chuỗi
  let val = value.toString();
  
  // xóa ký tự . trong ký chuỗi
  val = val.replace(/\./g, '');

  val = val.replace(/,00/g, '');

  // ép kiểu thành số nguyên
  val = parseInt(val);

  val = val.toString().split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev 
  })
  return val + ",00";
}

/**
 * Author: Phạm Văn Đạt(22:46 29/12/2022)
 * Function: Xử lý chuyển string về dạng số
 * @param {*} value : giá trị đưa vào
 * @returns : giá trị int
 */
export function ConvertToNumber(value) {

  if(value == 0){
    return 0;
  }

  value = value.replace(/\./g, '');

  value = value.replace(/,00/g, '');

  value = parseInt(value);
  return value;
}

/**
 * Author: Phạm Văn Đạt(22:46 29/12/2022)
 * Function: Xử lý chuyển string về dạng số
 * @param {*} value : giá trị đưa vào
 * @returns : giá trị int
 */
export function ConvertTodouble(value) {

  if(value == 0){
    return 0;
  }

  value = value.replace(/\./g, '');

  value = value.replace(/,/g, '.');

  value = parseFloat(value);
  return value;
}