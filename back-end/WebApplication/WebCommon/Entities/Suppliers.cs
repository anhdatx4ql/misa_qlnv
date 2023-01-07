using MISA.AMIS.Common;
using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: Bảng nhà cung cấp
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("suppliers")]
    public class Suppliers:BaseEntity
    {
        #region Fields
        /// <summary>
        /// Id
        /// </summary>
        [AttributePrimarykey("Id không được bỏ trống.")]
        [AttributePost("")]
        public Guid SupplierID { set; get; }

        /// <summary>
        /// Mã nhà cung cấp
        /// </summary>
        [AttributeRequired("Mã nhà cung cấp không được bỏ trống.")]
        [AttributePost("")]
        [AttributeExists("Mã nhà cung cấp ")]
        public string SupplierCode { set; get; }

        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        [AttributeRequired("Tên nhà cung cấp không được bỏ trống.")]
        [AttributePost("")]
        public string SupplierName { set; get; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        [AttributeTaxCode("Mã số thuế không hợp lệ.")]
        [AttributeExists("Mã số thuế đã được sử dụng.")]
        [AttributePost("")]
        public string TaxCode { set; get; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        [AttributePost("")]
        public string SupplierAddress { set; get; }

        /// <summary>
        /// Số điện thoại bàn
        /// </summary>
        [AttributePhone("Số điện thoại bàn sai định dạng")]
        [AttributePost("")]
        public string SupplierMobile { set; get; }

        /// <summary>
        /// Website
        /// </summary>
        [AttributePost("")]
        public string Website { set; get; }

        /// <summary>
        /// id nhân viên bán hàng
        /// </summary>
        [AttributePost("")]
        public Guid? EmployeeId { set; get; }

        /// <summary>
        /// Xưng hô
        /// </summary>
        [AttributePost("")]
        public string SupplierVocativeName { set; get; }

        /// <summary>
        /// Họ và tên liên hệ
        /// </summary>
        [AttributePost("")]
        public string SupplierNameContact { set; get; }

        /// <summary>
        /// Họ và tên liên hệ
        /// </summary>
        [AttributeEmail("Email sai định dạng.")]
        [AttributePost("")]
        public string SupplierEmailContact { set; get; }

        /// <summary>
        /// Số điện thoại người liên hệ
        /// </summary>
        [AttributePhone("Số điện thoại sai định dạng.")]
        [AttributePost("")]
        public string SupplierPhoneNumberContact { set; get; }

        /// <summary>
        /// đại diện theo pháp luật
        /// </summary>
        [AttributePost("")]
        public string LegaRrepresentative { set; get; }

        /// <summary>
        /// id điều khoản thanh toán
        /// </summary>
        [AttributePost("")]
        public Guid? RulePaymentId { set; get; }

        /// <summary>
        /// Số ngày được nợ
        /// </summary>
        [AttributePost("")]
        public int? DayOwed { set; get; }

        /// <summary>
        /// số nợ tối đa
        /// </summary>
        [AttributePost("")]
        public decimal? DebitAmountMax { set; get; }

        /// <summary>
        /// công nợ
        /// </summary>
        [AttributePost("")]
        public decimal? Debt { set; get; }

        /// <summary>
        /// id tài khoản công nợ phải trả
        /// </summary>
        [AttributePost("")]
        public Guid? AccountPayableId { set; get; }

        /// <summary>
        /// ghi chú
        /// </summary>
        [AttributePost("")]
        public string SupplierDescription { set; get; }

        /// <summary>
        /// quốc gia nơi ở
        /// </summary>
        [AttributePost("")]
        public string SupplierCountry { set; get; }

        /// <summary>
        /// tỉnh/thành phố nơi ở
        /// </summary>
        [AttributePost("")]
        public string SupplierCity { set; get; }

        /// <summary>
        /// quận/huyện phố nơi ở
        /// </summary>
        [AttributePost("")]
        public string SupplierDistrict { set; get; }

        /// <summary>
        /// xã/phường phố nơi ở
        /// </summary>
        [AttributePost("")]
        public string SupplierWard { set; get; }

        /// <summary>
        /// tài khoản hoạt động ( 0 - hoạt động, 1-ngừng hoạt đọng)
        /// </summary>
        [AttributePost("")]
        public Boolean? IsActive { set; get; }

        /// <summary>
        /// là khách hàng(0- không phải khách hàng, 1- là khách hàng)
        /// </summary>
        [AttributePost("")]
        public Boolean? IsCustomer { set; get; }

        /// <summary>
        /// là tổ chức( 0 - là cá nhân, 1 - là tổ chức)
        /// </summary>
        [AttributePost("")]
        public Boolean? IsOrganization { set; get; }

        /// <summary>
        /// danh sách id của tài khoản ngân hàng
        /// </summary>
        public string BankAccountIds { set; get; }

        /// <summary>
        /// danh sách  các địa chỉ giao hàng của nhà cung cấp
        /// </summary>
        [AttributePost("")]
        public string DeliveryAddress { set; get; }

        /// <summary>
        /// số tiền đã thanh toán
        /// </summary>
        [AttributePost("")]
        public decimal? Paid { set; get; }

        /// <summary>
        /// Số CMND
        /// </summary>
        [AttributePost("")]
        public string IdNo { set; get; }

        /// <summary>
        /// Ngày cấp
        /// </summary>
        [AttributeDateTime("Ngày tháng không vượt quá ngày tháng hiện tại.")]
        [AttributePost("")]
        public DateTime? IssueOn { set; get; }

        /// <summary>
        /// nơi cấp
        /// </summary>
        [AttributePost("")]
        public string PlaceOfIssue { set; get; }

        /// <summary>
        /// Họ và tên người nhận hóa đơn điện tử
        /// </summary>
        [AttributePost("")]
        public string UserNameElectronicBill { set; get; }

        /// <summary>
        /// email người nhận hóa đơn điện tử
        /// </summary>
        [AttributeEmail("Email sai định dạng.")]
        [AttributePost("")]
        public string UserEmailElectronicBill { set; get; }

        /// <summary>
        /// số điện thoại
        /// </summary>
        [AttributePhone("Số điện thoại sai định dạng.")]
        [AttributePost("")]
        public string UserMobileElectronicBill { set; get; }

        /// <summary>
        /// Id tài khoản công nợ phải thu
        /// </summary
        [AttributePost("")]
        public Guid? AccountReceivableId { set; get; }

        /// <summary>
        /// Tên tài khoản công nợ phải thu
        /// </summary
        public string AccountReceivableName { set; get; }

        /// <summary>
        /// Số tài khoản công nợ phải thu
        /// </summary
        public string AccountReceivableNumber { set; get; }

        /// <summary>
        /// Tên điều khoản thanh toán
        /// </summary>
        public string RulePaymentName { set; get; }

        /// <summary>
        /// Tên tài khoản công nợ phải trả
        /// </summary>
        public string AccountPayableName { set; get; }

        /// <summary>
        /// số tài khoản công nợ phải thu
        /// </summary>
        public string AccountPayableNumber { set; get; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { set; get; }

        /// <summary>
        /// id danh sách các nhóm nhà cung cấp
        /// </summary>
        public string GroupSupplierIds { set; get; }

        /// <summary>
        /// id danh sách tên các nhóm nhà cung cấp
        /// </summary>
        public string GroupSupplierNames { set; get; }

        /// <summary>
        /// danh sách các số tài khoản ngân hàng
        /// </summary>
        public string BackAccountNumbers { set; get; }

        /// <summary>
        /// danh sách các tên tài khoản ngân hàng
        /// </summary>
        public string BankAccountNames { set; get; }

        /// <summary>
        /// danh sách các chi nhánh tài khoản ngân hàng
        /// </summary>
        public string BankAccountBranchs { set; get; }

        /// <summary>
        /// danh sách các thành phố tài khoản ngân hàng
        /// </summary>
        public string BankAccountCitys { set; get; }

        #endregion
    }
}
