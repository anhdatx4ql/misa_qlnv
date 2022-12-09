using System;
using System.ComponentModel.DataAnnotations.Schema;
/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// Function: Bảng địa chỉ giao hàng
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("DeliveryAddress")]
    public class DeliveryAddress:BaseEntity
    {
        #region Fields
        /// <summary>
        /// Id địa chỉ giao hàng
        /// </summary>
        [AttributePrimarykey("Id không được bỏ trống")]
        public Guid DeliveryAddressID { set; get; }

        /// <summary>
        /// Địa chỉ giao hàng
        /// </summary>
        [AttributeRequired("Địa chỉ giao hàng không được bỏ trống!")]
        public string Address { set; get; }
        #endregion
    }
}
