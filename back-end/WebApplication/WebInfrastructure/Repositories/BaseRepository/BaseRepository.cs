using Dapper;
using MISA.AMIS.Common;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

namespace MISA.AMIS.DL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(15/10/2022)
    /// Function: base thao tác với DB
    /// </summary>
    public class BaseRepository<T> : IBaseRepository<T>
    {
        #region Constructor
        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: lấy chuỗi kết nối db
        /// </summary>
        /// <returns></returns>
        public DbConnection GetDbConnection()
        {
            return new MySqlConnection(DbContext.ConnectString);
        }
        #endregion

        #region Methods
        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: Xử lý lấy dữ liệu theo Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public async Task<T> GetById(Guid id, string keyName = null,string tableName = null)
        {
            if(tableName == null)
                tableName = TableName.GetTableName<T>();

            var sql = $"SELECT * FROM {tableName} WHERE {keyName} IN (@id) LIMIT 1;";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryFirstOrDefaultAsync<T>(sql,parameters);
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Thực thi câu lệnh insert, update, delete
        /// </summary>
        /// <param name="query">Câu truy vấn</param>
        /// <param name="parameters">biến truyền vào</param>
        /// <returns></returns>
        public async Task<int> InsertRecord(string query, DynamicParameters parameters = null)
        {
            using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var transaction = db.BeginTransaction();
                int result = 0;
                try
                {
                    result = await db.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Thêm mới nhiều bản ghi
        /// </summary>
        /// <param name="query">Câu truy vấn</param>
        /// <param name="parameters">biến truyền vào</param>
        /// <returns></returns>
        public async Task<int> InsertRecords(string query, DynamicParameters parameters = null)
        {
            using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var transaction = db.BeginTransaction();
                int result = 0;
                try
                {
                    result = await db.ExecuteAsync(query, parameters);
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Phân trang, tìm kiếm
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public async Task<PagingModel<T>> Paging<T>(string sql, DynamicParameters parameters = null)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var results = await db.QueryMultipleAsync(sql, parameters);

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
        /// Author: Phạm Văn Đạt
        /// Function: Thực thi insert, update, delete có thủ tục trong db
        /// </summary>
        /// <param name="proceduceName">câu query gọi thủ tục</param>
        /// <param name="parameters">biến truyền vào</param>
        /// <returns>số nguyên </returns>
        public async Task<int> UpdateRecord(string proceduceName, DynamicParameters parameters = null)
        {
           using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var transaction = db.BeginTransaction();
                var result = 0;
                try
                {
                    result = await db.ExecuteAsync(proceduceName, parameters, commandType: CommandType.StoredProcedure);

                    transaction.Commit();
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                }
                finally
                {
                    db.Close();
                }
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(19/12/2022)
        /// Function: lấy mã code mới nhất
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<MaxCodeModel> GetMaxCodeAsync(string sql)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryFirstOrDefaultAsync<MaxCodeModel>(sql);
                db.Close();
                return (MaxCodeModel)result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(21/12/2022)
        /// Function: lấy danh sách dữ liệu theo id
        /// </summary>
        /// <param name="sql">chuỗi sql</param>
        /// <param name="parameters">tham số truyền vào</param>
        /// <returns></returns>
        public async Task<List<T>> GetDataByIds(string sql, DynamicParameters parameters = null)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<T>(sql, parameters);
                db.Close();
                return result.ToList<T>();
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: chạy câu truy vấn get
        /// </summary>
        /// <param name="query">câu tuy vấn</param>
        /// <param name="parameters">parameters truyền vào</param>
        /// <returns></returns>
        public async Task<int> DeleteRecord(string query, DynamicParameters parameters = null)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var transaction = db.BeginTransaction();
                int result = 0;
                try
                {
                    result = await db.ExecuteAsync(query, parameters);

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
                db.Close();
                return result;
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy hết dữ liệu trong bảng
        /// </summary>
        /// <returns>danh sách thông tin</returns>
        public virtual async Task<List<T>> GetAllAsync<T>(string sql,DynamicParameters parameters=null)
        {
           
           using(IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryAsync<T>(sql, parameters);
                db.Close();
                return result.ToList();
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(25/10/2022)
        /// Function: Xử lý kiểm tra dữ liệu đã tồn tại hay chưa
        /// </summary>
        /// <param name="sql">câu truy vấn</param>
        /// <param name="parameters">tham số truyền vào</param>
        /// <returns></returns>
        public async Task<dynamic> CheckExists(string sql, DynamicParameters parameters)
        {
            using (IDbConnection db = GetDbConnection())
            {
                db.Open();
                var result = await db.QueryFirstOrDefaultAsync(sql,parameters);
                db.Close();
                return result;
            }
        }
        #endregion

    }
}
