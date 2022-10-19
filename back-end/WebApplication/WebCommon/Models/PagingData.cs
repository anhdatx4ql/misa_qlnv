using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    public class PagingData<T>
    {
        #region Fields
        /// <summary>
        /// tổng số bản ghi
        /// </summary>
        public int TotalCount { set; get; }

        /// <summary>
        /// kích thước trang
        /// </summary>
        public int PageSize { set; get; }

        /// <summary>
        /// vị trí trang hiện tại
        /// </summary>
        public int CurrentPageNumber { set; get; }

        /// <summary>
        /// Dữ liệu
        /// </summary>
        public List<T> Data { set; get; }
        #endregion

        #region Constructor
        public PagingData(int totalCount, List<T> data, int currentPageNumber, int pageSize)
        {
            TotalCount = totalCount;
            Data = data;
            CurrentPageNumber = currentPageNumber;
            PageSize = pageSize;
        }
        #endregion
    }
}
