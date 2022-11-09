using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebInfrastructure;

namespace WebDomain
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: xử lý nghiệp vụ khách hàng
    /// </summary>
    public interface IEmployeesService:IBaseService<Employees>
    {
        #region Methods
        /// <summary>
        /// Author: Phạm Văn Đạt(19/10/2022)
        /// Function: Xử lý phân trang dữ liệu
        /// </summary>
        /// <param name="keyword">tìm kiếm theo tên, id</param>
        /// <param name="currentPageNumber">trang hiện tại</param>
        /// <param name="pageSize">số bản ghi/trang</param>
        /// <returns></returns>
        Task<ReponsitoryModel> Paging(string keyword, int currentPageNumber, int pageSize);

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: Lấy mã code lớn nhất
        /// </summary>
        /// <returns></returns>
        Task<ReponsitoryModel> GetMaxCode();

        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: Xử lý xuất excel
        /// </summary>
        /// <param name="ids"> danh sách id của khách hàng</param>
        /// <returns></returns>
        Task<byte[]> ExportExcel(string keyword = null);
        #endregion
    }
}
