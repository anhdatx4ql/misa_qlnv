using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: Base entity
    /// Base entity
    /// </summary>
    public class BaseEntity
    {
        #region Fields
        // ngày tạo
        [AttributePost("")]
        public DateTime CreatedAt { set; get; }

        // ngày cập nhật
        [AttributePost("")]
        public DateTime UpdatedAt { set; get; }

        // người cập nhật
        [AttributePost("")]
        public string UpdatedBy { set; get; }

        // người tạo
        [AttributePost("")]
        public string CreatedBy { set; get; }
        #endregion
    }
}
