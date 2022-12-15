using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: bảng tài khoản công nợ phải trả
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("AccountsPayable")]
    public class AccountsPayable : BaseEntity
    {
        #region Fields
        // Id tài khoản
        [AttributePrimarykey("Id không được bỏ trống")]
        public Guid AccountPayableID { set; get; }

        /// <summary>
        /// Số tài khoản
        /// </summary>
        [AttributeRequired("Số tài khoản không được bỏ trống!")]
        public string AccountPayableNumber { set; get; }

        /// <summary>
        /// tên tài khoản
        /// </summary>
        [AttributeRequired("Tên tài khoản không được bỏ trống!")]
        public string AccountPayableName { set; get; }
        #endregion
    }
}
