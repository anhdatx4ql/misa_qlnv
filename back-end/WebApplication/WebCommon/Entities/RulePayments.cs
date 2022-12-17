using System;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Author: Phạm Văn Đạt(08/12/2022)
/// FUnction: bảng điều khoản thanh toán
/// </summary>

namespace MISA.AMIS.Common
{
    [Table("rulepayments")]
    public class RulePayments:BaseEntity
    {
        #region Fields
        /// <summary>
        /// Id điều khoản thanh toán
        /// </summary>
        [AttributePrimarykey("Id điều khoản thanh toán không được bỏ trống")]
        [AttributePost("")]
        public Guid RulePaymentID { set; get; }

        /// <summary>
        /// Mã điều khoản thanh toán
        /// </summary>
        [AttributeRequired("Mã điều khoản thanh toán không được bỏ trống!")]
        [AttributePost("")]
        public string RulePaymentCode { set; get; }

        /// <summary>
        /// Tên điều khoản thanh toán
        /// </summary>
        [AttributeRequired("Mã điều khoản thanh toán không được bỏ trống!")]
        [AttributePost("")]
        public string RulePaymentName { set; get; }

        /// <summary>
        /// Số ngày được nợ
        /// </summary>
        [AttributePost("")]
        public int? DayOwed { set; get; }

        /// <summary>
        /// Thời hạn hưởng chiết khấu theo ngày
        /// </summary>
        [AttributePost("")]
        public int? AwardDeadline { set; get; }

        /// <summary>
        /// Tỉ lệ chiết khấu
        /// </summary>
        [AttributePost("")]
        public decimal DepreciationRate { set; get; }
        #endregion
    }
}
