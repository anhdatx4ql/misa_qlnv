using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: bảng tài khoản ngân hàng
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("BankAccounts")]
    public class BankAccounts:BaseEntity
    {
        #region Fields
        /// <summary>
        /// id tài khoản ngân hàng
        /// </summary>
        [AttributePrimarykey("Id không được bỏ trống")]
        [AttributePost("")]
        public Guid BackAccountID { set; get; }

        /// <summary>
        /// Số tài khoản ngân hàng
        /// </summary>
        [AttributeRequired("Số tài khoản ngân hàng không được bỏ trống!")]
        [AttributePost("")]
        public string BackAccountNumber { set; get; }

        /// <summary>
        /// tên tài khoản ngân hàng
        /// </summary>
        [AttributePost("")]
        [AttributeRequired("Tên tài khoản ngân hàng không được bỏ trống!")]
        public string BankAccountName { set; get; }

        /// <summary>
        /// chi nhánh
        /// </summary>
        [AttributePost("")]
        public string BankAccountBranch { set; get; }

        /// <summary>
        /// chi nhánh
        /// </summary>
        [AttributePost("")]
        public string BankAccountCity { set; get; }

        /// <summary>
        /// mã id của người dùng có tài khoản ngân hàng này
        /// </summary>
        [AttributeUserId("")]
        [AttributePost("")]
        public Guid? UserId { set; get; }
        #endregion
    }
}
