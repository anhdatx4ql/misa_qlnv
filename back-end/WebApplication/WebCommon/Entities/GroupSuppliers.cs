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
        public Guid GroupSupplierID { set; get; }

        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        [AttributeRequired("Mã nhóm khách hàng không được bỏ trống!")]
        public string GroupSupplierCode { set; get; }

        /// <summary>
        /// Tên nhóm khách hàng
        /// </summary>
        [AttributeRequired("Tên nhóm khách hàng không được bỏ trống!")]
        public string GroupSupplierName { set; get; }

        /// <summary>
        /// Thông tin chi tiết nhóm khách hàng
        /// </summary>
        public string GroupSupplierDescription { set; get; }

        /// <summary>
        /// id nhóm cha
        /// </summary>
        public Guid? ParentGroupSupplierId { set; get; }
        #endregion
    }
}
