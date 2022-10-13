using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebCommon
{
    [Table("Departments")]
    public class Departments:BaseEntity
    {
        // Id phòng ban
        [AttributePrimarykey("Id không được bỏ trống")]
        public Guid Id { set; get; }

        // tên phòng ban
        [AttributeRequired("Tên phòng ban không được bỏ trống!")]
        public string Name { set; get; }
    }
}
