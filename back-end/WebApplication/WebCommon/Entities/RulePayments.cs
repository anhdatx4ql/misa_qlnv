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
        public Guid RulePaymentID { set; get; }

        /// <summary>
        /// Mã điều khoản thanh toán
        /// </summary>
        [AttributeRequired("Mã điều khoản thanh toán không được bỏ trống!")]
        public string RulePaymentCode { set; get; }

        /// <summary>
        /// Số ngày được nợ
        /// </summary>
        public int? DayOwed { set; get; }

        /// <summary>
        /// Thời hạn hưởng chiết khấu theo ngày
        /// </summary>
        public int? AwardDeadline { set; get; }

        /// <summary>
        /// Tỉ lệ chiết khấu
        /// </summary>
        public decimal DepreciationRate { set; get; }
        #endregion
    }
}
