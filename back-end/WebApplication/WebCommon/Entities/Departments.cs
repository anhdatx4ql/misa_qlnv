using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: ánh xạ bảng phòng ban
    /// Base entity
    /// </summary>
    [Table("Departments")]
    public class Departments:BaseEntity
    {
        #region Fields
        // Id phòng ban
        [AttributePrimarykey("Id không được bỏ trống")]
        [AttributePost("")]
        public Guid DepartmentID { set; get; }

        // tên phòng ban
        [AttributeRequired("Tên phòng ban không được bỏ trống!")]
        [AttributePost("")]
        public string DepartmentName { set; get; }
        #endregion
    }
}
