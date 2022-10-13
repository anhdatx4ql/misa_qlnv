using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

namespace WebInfrastructure
{
    public class EmployeesRepository : BaseRepository<Employees>, IEmployeesRepository
    {
        public override async Task<List<Employees>> GetAllAsync()
        {

            var sql = $"SELECT * FROM View_Employees";
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<Employees>(sql);
                db.Close();
                return result.ToList();
            }
        }
    }
}
