/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: controller xử lý nghiệp vụ điều khoản thanh toán
 */

import { END_POINTS } from "../axios/endPoint";

import { STATUS_CODES } from "../constants";

import { paging, insertRecord } from "./BaseController";

/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Model view điều khoản thanh toán
 */
export const rulePaymentModel = {
  // id điều khoản thanh toán
  RulePaymentID: null,

  // mã điều khoản thanh toán
  RulePaymentCode: null,

  // tên điềuk hoản thanh toán
  RulePaymentName: null,

  // số ngày được nợ
  DayOwed: 0,

  //Thời hạn hưởng chiết khấu theo ngày
  AwardDeadline: 0,

  // Tỉ lệ chiết khấu
  DepreciationRate: null,
};

/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: Class lưu thông tin các  điều khoản thanh toán
 */

export class RulePayments {
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
   * @param {*} keyword : chuỗi tìm kiếm theo tên và mã nhân viên
   * @param {*} currentPageNumber : số trang hiện tại: mặc định là 1
   * @param {*} pageSize : số bản ghi trên trang
   */
  async pagingRulePayments(data) {
    let dataKeyword = [];

    // tìm kiếm theo mã thanh toán, tên thanh toán
    if (this.keyword) {
      console.log(this.keyword);
      dataKeyword.push(
        {
          name: "RulePaymentCode",
          operator: "like",
          value: this.keyword,
          typeOperator: "like",
          stringConcatenation: "OR",
        },
        {
          name: "RulePaymentName",
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

    let lengthCurrentData = this.currentData ? this.currentData.length : -1;

    if (this.countLoadData > 0) {
      this.currentPageNumber++;
    }

    // nếu số bản ghi hiện tại <= tổng số bản ghi => tăng số trang hiện tại lên 1 và load lại. Nếu không thì thôi
    if (lengthCurrentData != this.totalCount) {
      // tăng số lần load lên 1
      this.countLoadData++;

      // gọi đến paging basecontroler
      let res = await paging(
        END_POINTS.PagingRulePayments,
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
          // load thành công
        }else{
          // không có dữ liệu
          this.currentPageNumber--;
        }

        console.log(this.currentData);
        console.log(res.data.data);

        this.totalCount = res.data.totalCount;
        console.log(this.currentPageNumber);
      } else {
        console.log(res);
      }
    }
  }

  /**
   * Author: Phạm Văn Đạt(28/10/2022)
   * Function: Thêm mới nhân viên
   * @param {*} data : Dữ liệu truyền vào
   */
  async insertRulePayments(data) {
    let res = await insertRecord(END_POINTS.RulePayments, data);

    if (res.status == STATUS_CODES.Code200) {
      return res.data;
    } else {
      console.log(res);
      console.log("thêm mới thất bại");
    }
  }
}

/**
 * Author: Phạm Văn Đạt(20/12/2022)
 * Function: khởi tạo đối tượng điều khoản thanh toán
 */
export let reluPayments = new RulePayments();
