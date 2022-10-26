using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

namespace WebInfrastructure
{
    /// <summary>
    /// Author: Phạm Văn Đạt(15/10/2022)
    /// Function: thao tác với DB của bảng khách hàng
    /// </summary>
    public class EmployeesRepository : BaseRepository<Employees>, IEmployeesRepository
    {
        #region Methods
        public override async Task<List<EmployeesViewModel>> GetAllAsync<EmployeesViewModel>(string sql, DynamicParameters parameters = null)
        {

            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<EmployeesViewModel>(sql,parameters);
                db.Close();
                return result.ToList();
            }
        }


        /// <summary>
        /// Phân trang, tìm kiếm
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="sp_params"></param>
        /// <returns></returns>
        public async Task<PagingModel<T>> Paging<T>(string sql, DynamicParameters sp_params = null)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var results = await db.QueryMultipleAsync(sql, sp_params);

                if (results != null)
                {
                    var TotalRecords = results.Read<int>().FirstOrDefault();
                    var Entity = results.Read<T>().ToList();
                    db.Close();
                    return new PagingModel<T>(TotalRecords, Entity);
                }

                return new PagingModel<T>(0, null);
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: lấy mã code mới nhất
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<EmployeeNewCodeViewModel> GetMaxCodeAsync(string sql)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryFirstOrDefaultAsync<EmployeeNewCodeViewModel>(sql, commandType: CommandType.StoredProcedure);
                db.Close();
                return (EmployeeNewCodeViewModel)result;
            }
        }
        #endregion
    }
}
