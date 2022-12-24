/**
 * Author: Phạm Văn Đạt(17/12/2022)
 * Function: controller xử lý nghiệp vụ của nhà cung cấp
 */
import { END_POINTS } from "../axios/endPoint";
import {
  insertRecord,
  updateRecord,
  paging,
  getMaxCode
} from "../Controllers/BaseController";

import { STATUS_CODES } from "../constants";

/**
 * Author: Phạm Văn Đạt(19/12/2022)
 * Function: Model view nhà cung cấp
 */
export const supplierModel = {
  supplierID: null,

  /// Mã nhà cung cấp
  supplierCode: null,

  /// Tên nhà cung cấp
  supplierName: null,

  /// Mã số thuế
  taxCode: null,

  /// Địa chỉ
  supplierAddress: null,

  /// Số điện thoại bàn
  supplierMobile: null,

  /// Website
  website: null,

  /// id nhân viên bán hàng
  employeeId: null,

  /// Xưng hô
  supplierVocativeName: null,

  /// Họ và tên liên hệ
  supplierNameContact: null,

  /// Họ và tên liên hệ
  supplierEmailContact: null,

  /// Số điện thoại người liên hệ
  supplierPhoneNumberContact: null,

  /// đại diện theo pháp luật
  legaRrepresentative: null,

  /// id điều khoản thanh toán
  rulePaymentId: null,

  /// Số ngày được nợ
  dayOwed: 0,

  /// số nợ tối đa
  debitAmountMax: 0,

  /// công nợ
  debt: 0,

  /// id tài khoản công nợ phải trả
  accountPayableId: null,

  /// ghi chú
  supplierDescription: null,

  /// quốc gia nơi ở
  supplierCountry: null,

  /// tỉnh/thành phố nơi ở
  supplierCity: null,

  /// quận/huyện phố nơi ở
  supplierDistrict: null,

  /// xã/phường phố nơi ở
  supplierWard: null,

  /// tài khoản hoạt động ( 0 - hoạt động, 1-ngừng hoạt đọng)
  isActive: false,

  /// là khách hàng(0- không phải khách hàng, 1- là khách hàng)
  isCustomer: false,

  /// là tổ chức( 0 - là cá nhân, 1 - là tổ chức)
  isOrganization: false,

  /// danh sách id của tài khoản ngân hàng
  bankAccountIds: null,

  /// danh sách  các địa chỉ giao hàng của nhà cung cấp
  deliveryAddress: null,

  /// số tiền đã thanh toán
  paid: 0,

  /// Số CMND
  idNo: null,

  /// Ngày cấp
  issueOn: null,

  /// nơi cấp
  placeOfIssue: null,

  /// Họ và tên người nhận hóa đơn điện tử
  userNameElectronicBill: null,

  /// email người nhận hóa đơn điện tử
  userEmailElectronicBill: null,

  /// số điện thoại
  userMobileElectronicBill: null,

  /// Id tài khoản công nợ phải thu
  accountReceivableId: null,

  /// Tên tài khoản công nợ phải thu
  accountReceivableName: null,

  /// Số tài khoản công nợ phải thu
  accountReceivableNumber: null,

  /// Tên điều khoản thanh toán
  rulePaymentName: null,

  /// Tên tài khoản công nợ phải trả
  accountPayableName: null,

  /// số tài khoản công nợ phải thu
  accountPayableNumber: null,

  /// Tên nhân viên
  employeeName: null,

  /// id danh sách các nhóm nhà cung cấp
  groupSupplierIds: null,

  /// id danh sách tên các nhóm nhà cung cấp
  groupSupplierNames: null,

  /// danh sách các số tài khoản ngân hàng
  backAccountNumbers: null,

  /// danh sách các tên tài khoản ngân hàng
  bankAccountNames: null,

  /// danh sách các chi nhánh tài khoản ngân hàng
  bankAccountBranchs: null,

  /// danh sách các thành phố tài khoản ngân hàng
  bankAccountCitys: null,
};

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
        }
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
  async insertSupplier(data) {
    let res = await insertRecord(END_POINTS.Suppliers, data);

    if (res.status == STATUS_CODES.Code200) {
      console.log(res);
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
  async updateSupplier(data) {
    let res = await updateRecord(END_POINTS.Suppliers, data);

    if (res.status == STATUS_CODES.Code200) {
      console.log(res);
      return res.data;
    } else {
      console.log("thêm mới thất bại");
    }
  }

  /**
   * Author: Phạm Văn Đạt(20/12/2022)
   * Function: Lấy mã code mới nhất
   * @returns trả về dữ liệu nếu thành công.
   */
   async getMaxCode() {
    let res = await getMaxCode(END_POINTS.SuppliersMaxCode);
    if (res.statusCode == STATUS_CODES.Code200) {
      console.log(res.data);
      return res.data;
    } else {
      console.log(res);
    }
  }
}

// khởi tạo đối tượng thao tác với nhà cung cấp
export const suppliers = new Suppliers();
