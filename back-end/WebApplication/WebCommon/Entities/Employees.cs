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
        // Id khách hàng 1
        [AttributePrimarykey("Id không hợp lệ.")]
        [AttributePost("")]
        public Guid EmployeeID { set; get; }

        // mã khách hàng 2
        [AttributeRequired("Mã khách hàng không được bỏ trống.")]
        [AttributePost("")]
        public string EmployeeCode { set; get; }

        // tên khách hàng 3
        [AttributeRequired("Tên khách hàng không được bỏ trống.")]
        [AttributePost("")]
        public string EmployeeName { set; get; }

        // Giới tính 4
        [AttributeGender("Giới tính sai định dạng.")]
        [AttributePost("")]
        public int? EmployeeGender { set; get; }

        // Ngày sinh 5
        [AttributeDateTime("Ngày tháng không vượt quá ngày tháng hiện tại.")]
        [AttributePost("")]
        public DateTime? EmployeeBirthDay { set; get; }

        // Số chứng minh nhân dân 6
        [AttributePost("")]
        public string IdNo { set; get; }

        // Ngày cấp 7
        [AttributePost("")]
        [AttributeDateTime("Ngày tháng không vượt quá ngày tháng hiện tại.")]
        public DateTime? IssuaOn { set; get; }

        // Nơi cấp 8
        [AttributePost("")]
        public string PlaceOfIssue { set; get; }

        // Địa chỉ 9
        [AttributePost("")]
        public string EmployeeAddress { set; get; }

        // số điện thoại di động 10
        [AttributePost("")]
        [AttributePhone("Số điện thoại di động không hợp lệ.")]
        public string EmployeeNumberPhone { set; get; }

        // số điện thoại bàn 11 
        [AttributePost("")]
        [AttributePhone("Số điện thoại bàn không hợp lệ.")]
        public string EmployeeDeskPhone { set; get; }

        // email 12
        [AttributePost("")]
        [AttributeEmail("Email không hợp lệ.")]
        public string EmployeeEmail { set; get; }

        // id phòng ban 13
        [AttributeRequired("Mã phòng ban không được để trống.")]
        [AttributePost("")]
        public Guid? DepartmentId { set; get; }

        // id chức danh 14
        [AttributePost("")]
        public Guid? PositionId { set; get; }

        // là khách hàng 
        [AttributePost("")]
        public bool? IsEmployee { set; get; }

        /// <summary>
        /// tên phòng ban 
        /// </summary>
        public string DepartmentName { set; get; }

        /// <summary>
        /// Tên vị trí 17
        /// </summary>
        public string PositionName { set; get; }

        // là nhà cung cấp 18
        [AttributePost("")]
        public bool? IsSuppiler { set; get; }

        //Đã xóa hay chưa 19
        [AttributePost("")]
        public bool? IsDelete { set; get; }

        // Lương thỏa thuận 20
        [AttributePost("")]
        public decimal? WageAgreement { set; get; }

        // Hệ số lương 21
        [AttributePost("")]
        public decimal? CoefficientSalary { set; get; }

        // lương đóng bảo hiểm 22
        [AttributePost("")]
        public decimal? PremiumSalary { set; get; }

        // mã số thuế 23
        [AttributeTaxCode("")]
        [AttributeExists("Mã số thuế không được trùng.")]
        [AttributePost("")]
        public string TaxCode { set; get; }

        // loại hợp đồng 24
        [AttributePost("")]
        [AttributeRequired("Loại hợp đồng không được bỏ trống.")]
        public string TypeOfContract { set; get; }

        // số người phụ thuộc 25
        [AttributePost("")]
        public int? NumberOfDependent { set; get; }

        /// <summary>
        /// Tài khoản công nợ phải trả 26
        /// </summary>
        [AttributePost("")]
        public Guid? AccountPayableId { set; get; }

        /// <summary>
        /// Tài khoản công nợ phải thu 25
        /// </summary>
        [AttributePost("")]
        public Guid? AccountReceivableId { set; get; }
        #endregion
    }
}
