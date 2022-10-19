﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    /// <summary>
    /// Author: Phạm Văn Đạt(19/10/2022)
    /// Function: Hiển thị thông tin khách hàng
    /// </summary>
    public class EmployeesViewModel :BaseEntity
    {
        #region Field
        // Id khách hàng
        public Guid Id { set; get; }

        // mã khách hàng
        public string EmployeeId { set; get; }

        // tên khách hàng
        public string Name { set; get; }

        // Giới tính
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
        public string NumberPhone { set; get; }

        // số điện thoại bàn
        public string DeskPhone { set; get; }

        // email
        public string Email { set; get; }

        // id phòng ban
        public Guid DepartmentId { set; get; }

        // id chức danh
        public Guid PositionId { set; get; }

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

        // là khách hàng
        public bool IsSuppiler { set; get; }

        //Đã xóa hay chưa
        public bool IsDelete { set; get; }
        #endregion
    }
}