using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: Base entity
    /// Base entity
    /// </summary>
    public class BaseEntity
    {
        // ngày tạo
        public DateTime CreatedAt { set; get; }

        // ngày cập nhật
        public DateTime UpdatedAt { set; get; }

        // người cập nhật
        public string UpdatedBy { set; get; }

        // người tạo
        public string CreatedBy { set; get; }
    }
}
