using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: Phạm Văn Đạt(19/10/2022)
    /// function: phân trang dữ liệu
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PagingModel<T>
    {
        #region Fields
        /// <summary>
        /// Tổng số bản ghi
        /// </summary>
        public int TotalCount { set; get; }

        /// <summary>
        /// Dữ liệu
        /// </summary>
        public List<T> Data { set; get; }
        #endregion

        #region Constructor
        public PagingModel(int totalCount, List<T> data)
        {
            TotalCount = totalCount;
            Data = data;
        }
        #endregion
    }
}
