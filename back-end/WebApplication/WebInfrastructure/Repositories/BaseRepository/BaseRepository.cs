using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

namespace WebInfrastructure
{
    public class BaseRepository<T> : IBaseRepository<T>
    {

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: lấy chuỗi kết nối db
        /// </summary>
        /// <returns></returns>
        public DbConnection GetDbConnection()
        {
            return new MySqlConnection(DbContext.ConnectString);
        }

        public async Task<T> GetById(Guid id,string tableName = null)
        {
            if(tableName == null)
                tableName = TableName.GetTableName<T>();

            var sql = $"SELECT * FROM {tableName} WHERE Id = @id LITMIT 1";
            var parameters = new DynamicParameters();
            parameters.Add("id", id);
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<T>(sql,parameters);
                db.Close();
                return (T)result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Thực thi câu lệnh insert, update, delete
        /// </summary>
        /// <param name="query">Câu truy vấn</param>
        /// <param name="sp_params">biến truyền vào</param>
        /// <returns></returns>
        public async Task<int> InsertRecord(string query, DynamicParameters sp_params = null)
        {
            using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.ExecuteAsync(query, sp_params, commandType: CommandType.StoredProcedure);
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Thực thi insert, update, delete có thủ tục trong db
        /// </summary>
        /// <param name="proceduceName">câu query gọi thủ tục</param>
        /// <param name="sp_params">biến truyền vào</param>
        /// <returns>số nguyên </returns>
        public async Task<int> UpdateRecord(string proceduceName, DynamicParameters sp_params = null)
        {
           using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.ExecuteAsync(proceduceName, sp_params,commandType:CommandType.StoredProcedure);
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: chạy câu truy vấn get
        /// </summary>
        /// <param name="query">câu tuy vấn</param>
        /// <param name="sp_params">parameters truyền vào</param>
        /// <returns></returns>
        public async Task<int> DeleteRecord(string query, DynamicParameters sp_params = null)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.ExecuteAsync(query, sp_params);
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy hết dữ liệu trong bảng
        /// </summary>
        /// <returns>danh sách thông tin</returns>
        public virtual async Task<List<T>> GetAllAsync()
        {
           string tableName = TableName.GetTableName<T>();

            if (tableName == null)
                return null;
            var sql = $"SELECT * FROM View_{tableName} LIMIT 50";
           using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<T>(sql);
                db.Close();
                return result.ToList();
            }
        }

      
    }
}
