using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MISA.AMIS.Common;

namespace MISA.AMIS.DL
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
        #endregion
    }
}
