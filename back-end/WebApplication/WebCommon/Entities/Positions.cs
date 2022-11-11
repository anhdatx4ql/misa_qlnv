using System;
using System.ComponentModel.DataAnnotations;

namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: Chức danh
    /// </summary>
    public class Positions:BaseEntity
    {
        #region Field
        // Id chức danh
        [AttributePrimarykey("Id chức danh không được bỏ trống")]
        public Guid Id { set; get; }

        // tên Chức danh
        [AttributeRequired("Tên chức danh không được bỏ trống!")]
        public string Name { set; get; }

        #endregion
    }
}
