using Dapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebCommon;

namespace WebInfrastructure
{
    /// <summary>
    /// Author: Phạm Văn Đạt(15/10/2022)
    /// Function: thao tác với DB của bảng phòng ban
    /// </summary>
    public interface IEmployeesRepository : IBaseRepository<Employees>
    {
        /// <summary>
        /// Author: Phạm Văn Đạt(20/10/2022)
        /// Function: Phân trang, tìm kiếm
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="sp_params"></param>
        /// <returns></returns>
        Task<PagingModel<T>> Paging<T>(string sql, DynamicParameters sp_params = null);

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: Lấy mã code lớn nhất
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        Task<EmployeeNewCodeViewModel> GetMaxCodeAsync(string sql);
    }
}
