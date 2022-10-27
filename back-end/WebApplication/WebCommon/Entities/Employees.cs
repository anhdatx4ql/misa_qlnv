using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WebCommon
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
        [AttributePrimarykey("Id không được bỏ trống")]
        [AttributeExists("Id")]
        public Guid Id { set; get; }

        // mã khách hàng
        [AttributeRequired("Mã khách hàng không được bỏ trống!")]
        [AttributeExists("Mã nhân viên")]
        public string EmployeeId { set; get; }

        // tên khách hàng
        [AttributeRequired("Tên khách hàng không được bỏ trống!")]
        public string Name { set; get; }

        // Giới tính
        [AttributeGender("Giới tính không hợp lệ!")]
        public int Gender { set; get; }

        // Ngày sinh
        public DateTime BirthDay { set; get; }

        // Số chứng minh nhân dân
        public string IdNo { set; get; }

        // Ngày cấp
        public DateTime IssuaOn { set; get; }

        // Nơi cấp
        public string PlaceOfIssue { set; get; }

        // Số tài khoản
        public string BankAccountNumber { set; get; }

        // Tên ngân hàng
        public string BankName { set; get; }

        // Chi nhánh ngân hàng
        public string BankAccountBrand { set; get; }

        // Địa chỉ
        public string Address { set; get; }

        // số điện thoại di động
        [AttributePhone("Số điện thoại cá nhân không hợp lệ!")]
        public string NumberPhone { set; get; }

        // số điện thoại bàn
        [AttributePhone("Số điện thoại bàn không hợp lệ!")]
        public string DeskPhone { set; get; }

        // email
        [AttributeEmail("Email không hợp lệ!")]
        public string Email { set; get; }

        // id phòng ban
        [AttributeRequired("Mã phòng ban không được để trống!")]
        public Guid? DepartmentId { set; get; }

        // id chức danh
        [AttributeRequired("Mã chức danh không được để trống!")]
        public Guid? PositionId { set; get; }

        // là khách hàng
        public bool IsEmployee { set; get; }

        // là khách hàng
        public bool IsSuppiler { set; get; }

        //Đã xóa hay chưa
        public bool IsDelete { set; get; }

        #endregion
    }
}
