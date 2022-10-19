using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebCommon;

namespace WebInfrastructure
{
    public interface IEmployeesRepository : IBaseRepository<Employees>
    {
        /// <summary>
        /// Phân trang, tìm kiếm
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="sp_params"></param>
        /// <returns></returns>
        Task<PagingModel<T>> Paging<T>(string sql, DynamicParameters sp_params = null);
    }
}
