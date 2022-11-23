using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.DL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(15/10/2022)
    /// Function: base thao tác với DB
    /// </summary>
    public interface IBaseRepository<T>
    {
        #region Methods
        /// <summary>
        /// Hàm lấy chuổi kết nối 
        /// Author: Phạm Văn Đạt
        /// DateTime: 20:50 10/08/2022
        /// </summary>
        /// <returns></returns>
        DbConnection GetDbConnection();

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy bản ghi theo id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        Task<T> GetById(Guid id, string tableName = null);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý thêm mới 1 bản ghi
        /// </summary>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<int> InsertRecord(string query, DynamicParameters parameters = null);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Update 1 bản ghi
        /// </summary>
        /// <param name="proceduceName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<int> UpdateRecord(string proceduceName, DynamicParameters parameters = null);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý xóa 1 hoặc nhiều bản ghi
        /// </summary>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<int> DeleteRecord(string query, DynamicParameters parameters = null);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý lấy dữ liệu trong bảng
        /// </summary>
        /// <returns></returns>s
        Task<List<T>> GetAllAsync<T>(string sql,DynamicParameters parameters= null);

        /// <summary>
        /// Author: Phạm Văn Đạt(25/10/2022)
        /// Function: Xử lý kiểm tra dữ liệu đã tồn tại hay chưa
        /// </summary>
        /// <param name="sql">câu truy vấn</param>
        /// <param name="parameters">tham số truyền vào</param>
        /// <returns></returns>
        Task<dynamic> CheckExists(string sql, DynamicParameters parameters);
        #endregion
    }
}
