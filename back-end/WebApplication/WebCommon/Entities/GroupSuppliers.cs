using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: Bảng nhóm nhà cung cấp
/// </summary>
namespace MISA.AMIS.Common
{
    [Table("GroupSuppliers")]
    public class GroupSuppliers:BaseEntity
    {
        #region Fields
        /// <summary>
        /// Id
        /// </summary>
        [AttributePrimarykey("Id không được bỏ trống")]
        [AttributePost("")]
        public Guid GroupSupplierID { set; get; }

        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        [AttributeRequired("Mã nhóm khách hàng không được bỏ trống!")]
        [AttributePost("")]
        [AttributeExists("Nhóm nhà cung cấp")]
        public string GroupSupplierCode { set; get; }

        /// <summary>
        /// Tên nhóm khách hàng
        /// </summary>
        [AttributeRequired("Tên nhóm khách hàng không được bỏ trống!")]
        [AttributePost("")]
        public string GroupSupplierName { set; get; }

        /// <summary>
        /// Thông tin chi tiết nhóm khách hàng
        /// </summary>
        [AttributePost("")]
        public string GroupSupplierDescription { set; get; }

        /// <summary>
        /// id nhóm cha
        /// </summary>
        [AttributePost("")]
        public Guid? ParentGroupSupplierId { set; get; }
        #endregion
    }
}
