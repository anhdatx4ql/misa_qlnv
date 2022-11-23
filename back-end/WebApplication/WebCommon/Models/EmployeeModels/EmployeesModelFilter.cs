using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/// <summary>
/// Author: Phạm Văn Đạt(21/11/2022)
/// Function: model xử lý lọc phân trang nhân viên
/// </summary>
namespace WebCommon
{
    public class EmployeesModelFilter
    {
        #region Fields
        /// <summary>
        /// Tên thuộc tính
        /// </summary>
        public string Name { set; get; }

        /// <summary>
        /// Dấu
        /// </summary>
        public string Operator {set;get;}

        /// <summary>
        /// giá trị lọc
        /// </summary>
        public string Value { set; get; }

        /// <summary>
        /// Kiểu lọc 
        /// </summary>
        public string TypeOperator { set; get; }
        #endregion
    }
}
