﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WebCommon;

namespace WebDomain
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: base xử lý nghiệp vụ
    /// </summary>
    public interface IBaseService<T>
    {
        #region Methods
        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy tất cả bản ghi trong bảng
        /// </summary>
        /// <returns>danh sách dữ liệu</returns>
        Task<ReponsitoryModel> GetAll();

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Thêm mới 1 bản ghi vào bảng
        /// </summary>
        /// <param name="entity">dữ liệu truyển vào T</param>
        /// <returns></returns>
        Task<ReponsitoryModel> InsertRecord(T entity);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Update 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<ReponsitoryModel> UpdateRecord(T entity);

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xóa 1 hoặc nhiều bản ghi
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        Task<ReponsitoryModel> DeleteRecords(List<Guid> ids);
        #endregion
    }
}
