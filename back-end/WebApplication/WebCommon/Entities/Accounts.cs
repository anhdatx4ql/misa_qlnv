using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: bảng tài khoản
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("Accounts")]
    public class Accounts:BaseEntity
    {
        #region Fields
        // Id tài khoản
        [AttributePrimarykey("Id không được bỏ trống")]
        public Guid AccountID { set; get; }

        /// <summary>
        /// Số tài khoản
        /// </summary>
        [AttributeRequired("Số tài khoản không được bỏ trống!")]
        public string AccountNumber { set; get; }

        /// <summary>
        /// tên tài khoản
        /// </summary>
        [AttributeRequired("Tên tài khoản không được bỏ trống!")]
        public string AccountName { set; get; }
        #endregion
    }
}
