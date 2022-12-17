using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: bảng tài khoản công nợ phải thu
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("AccountsReceivable")]
    public class AccountsReceivable : BaseEntity
    {
        #region Fields
        // Id tài khoản
        [AttributePrimarykey("Id không được bỏ trống")]
        [AttributePost("")]
        public Guid AccountReceivableID { set; get; }

        /// <summary>
        /// Số tài khoản
        /// </summary>
        [AttributeRequired("Số tài khoản không được bỏ trống!")]
        [AttributePost("")]
        public string AccountReceivableNumber { set; get; }

        /// <summary>
        /// tên tài khoản
        /// </summary>
        [AttributePost("")]
        [AttributeRequired("Tên tài khoản không được bỏ trống!")]
        public string AccountReceivableName { set; get; }
        #endregion
    }
}
