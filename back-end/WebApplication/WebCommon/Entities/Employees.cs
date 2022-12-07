using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: Phạm Văn Đạt(19/10/2022)
    /// FUnction: Khách hàng
    /// </summary>
    [Table("Employees")]
    public class Employees:BaseEntity
    {
        #region Fields
        // Id khách hàng
        public Guid Id { set; get; }

        // mã khách hàng
        public string EmployeeId { set; get; }

        // tên khách hàng
        public string Name { set; get; }

        // Giới tính
        public int Gender { set; get; }

        // Ngày sinh
        public string BirthDay { set; get; }

        // Số chứng minh nhân dân
        public string IdNo { set; get; }

        // Ngày cấp
        public string IssuaOn { set; get; }

        // Nơi cấp
        public string PlaceOfIssue { set; get; }

        // id số tài khoản
        public string BankAccountId { set; get; }

        // Địa chỉ
        public string Address { set; get; }

        // số điện thoại di động
        public string NumberPhone { set; get; }

        // số điện thoại bàn
        public string DeskPhone { set; get; }

        // email
        public string Email { set; get; }

        // id phòng ban
        public Guid? DepartmentId { set; get; }

        // id chức danh
        public Guid? PositionId { set; get; }

        // là khách hàng
        public bool IsEmployee { set; get; }

        /// <summary>
        /// tên phòng ban
        /// </summary>
        public string DepartmentName { set; get; }

        /// <summary>
        /// Tên vị trí
        /// </summary>
        public string PositionName { set; get; }

        // là nhà cung cấp
        public bool IsSuppiler { set; get; }

        //Đã xóa hay chưa
        public bool IsDelete { set; get; }

        // Lương thỏa thuận
        public decimal WageAgreement { set; get; }

        // Hệ số lương
        public decimal CoefficientSalary { set; get; }

        // lương đóng bảo hiểm
        public decimal PremiumSalary { set; get; }

        // mã số thuế
        public string TaxCode { set; get; }

        // loại hợp đồng
        public string TypeOfContract { set; get; }

        // số người phụ thuộc
        public string NumberOfDependent { set; get; }

        #endregion
    }
}
