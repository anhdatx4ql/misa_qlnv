using System;
using System.ComponentModel.DataAnnotations.Schema;


/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: Bảng lưu thông tin nhà cung cấp - nhóm nhà cung cấp
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("suppliers_groupsuppliers")]
    public class Suppliers_GroupSuppliers:BaseEntity
    {
        #region Fields
        /// <summary>
        /// id bảng liên kết nhà cung cấp và nhóm nhà cung cấp
        /// </summary>
        [AttributePrimarykey("Id không được bỏ trống.")]
        [AttributePost("")]
        public Guid SupplierGroupSupplierID { set; get; }

        /// <summary>
        /// id bảng liên kết nhà cung cấp và nhóm nhà cung cấp
        /// </summary>
        [AttributeRequired("Id người dùng.")]
        [AttributePost("")]
        public Guid UserId { set; get; }

        /// <summary>
        /// id bảng liên kết nhà cung cấp và nhóm nhà cung cấp
        /// </summary>
        [AttributeRequired("Id nhà cung cấp không được bỏ trống.")]
        [AttributePost("")]
        public Guid GroupSupplierId { set; get; }
        #endregion
    }
}
