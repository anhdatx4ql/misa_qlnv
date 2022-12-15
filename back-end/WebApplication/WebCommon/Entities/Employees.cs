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
        [AttributePrimarykey("Id không hợp lệ.")]
        [AttributePost("")]
        public Guid Id { set; get; }

        // mã khách hàng
        [AttributeRequired("Mã khách hàng không được bỏ trống.")]
        [AttributePost("")]
        public string EmployeeId { set; get; }

        // tên khách hàng
        [AttributeRequired("Tên khách hàng không được bỏ trống.")]
        [AttributePost("")]
        public string Name { set; get; }

        // Giới tính
        [AttributeGender("Giới tính sai định dạng.")]
        [AttributePost("")]
        public int Gender { set; get; }

        // Ngày sinh
        [AttributeDateTime("Ngày tháng không vượt quá ngày tháng hiện tại.")]
        [AttributePost("")]
        public string BirthDay { set; get; }

        // Số chứng minh nhân dân
        [AttributePost("")]
        public string IdNo { set; get; }

        // Ngày cấp
        [AttributePost("")]
        public string IssuaOn { set; get; }

        // Nơi cấp
        [AttributePost("")]
        public string PlaceOfIssue { set; get; }

        // Địa chỉ
        [AttributePost("")]
        public string Address { set; get; }

        // số điện thoại di động
        [AttributePost("")]
        [AttributePhone("Số điện thoại di động không hợp lệ.")]
        public string NumberPhone { set; get; }

        // số điện thoại bàn
        [AttributePost("")]
        [AttributePhone("Số điện thoại bàn không hợp lệ.")]
        public string DeskPhone { set; get; }

        // email
        [AttributePost("")]
        [AttributeEmail("Email không hợp lệ.")]
        public string Email { set; get; }

        // id phòng ban
        [AttributeRequired("Mã phòng ban không được để trống.")]
        [AttributePost("")]
        public Guid? DepartmentId { set; get; }

        // id chức danh
        [AttributePost("")]
        public Guid? PositionId { set; get; }

        // là khách hàng
        [AttributePost("")]
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
        [AttributePost("")]
        public bool IsSuppiler { set; get; }

        //Đã xóa hay chưa
        [AttributePost("")]
        public bool IsDelete { set; get; }

        // Lương thỏa thuận
        [AttributePost("")]
        public decimal WageAgreement { set; get; }

        // Hệ số lương
        [AttributePost("")]
        public decimal CoefficientSalary { set; get; }

        // lương đóng bảo hiểm
        [AttributePost("")]
        public decimal PremiumSalary { set; get; }

        // mã số thuế
        [AttributeTaxCode("")]
        [AttributeExists("Mã số thuế không được trùng.")]
        public string TaxCode { set; get; }

        // loại hợp đồng
        [AttributePost("")]
        [AttributeRequired("Loại hợp đồng không được trùng.")]
        public string TypeOfContract { set; get; }

        // số người phụ thuộc
        [AttributePost("")]
        public int NumberOfDependent { set; get; }

        /// <summary>
        /// Tài khoản công nợ phải trả
        /// </summary>
        [AttributePost("")]
        public Guid? AccountPayableId { set; get; }

        /// <summary>
        /// Tài khoản công nợ phải thu
        /// </summary>
        [AttributePost("")]
        public Guid? AccountReceivable { set; get; }
        #endregion
    }
}
