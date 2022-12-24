using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.AMIS.BL;
using MISA.AMIS.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

namespace MISA.AMIS.Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase
    {
        #region Field
        private readonly IBaseService<T> _baseService;
        #endregion

        #region Contructor
        public BaseController(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region Method
        /// <summary>
        /// Author: Phạm Văn Đạt(21/10/2022)
        /// Function: Lấy tất cả dữ liệu trong bảng
        /// </summary>
        /// <returns>danh sách các bản ghi</returns>
        [HttpGet]
        public virtual async Task<ReponsitoryModel> GettAll()
        {
            return await _baseService.GetAll();
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(13/10/2022)
        /// Function: Xử lý thêm mới bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ReponsitoryModel> InsertRecord([FromBody] T entity)
        {
            return await _baseService.InsertRecord(entity);
        }


        /// <summary>
        /// Author: Phạm Văn Đạt(13/10/2022)
        /// Function: Xử lý thêm mới nhiều bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost("InsertRecords")]
        public async Task<ReponsitoryModel> InsertRecords([FromBody] List<T> entities)
        {
            return await _baseService.InsertRecords(entities);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: Lấy mã code mới nhất
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMaxCode")]
      
        public async Task<ReponsitoryModel> GetMaxCode()
        {
            return await _baseService.GetMaxCode();
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(19/10/2022)
        /// Function: base update record
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<ReponsitoryModel> UpdateRecord([FromBody] T entity)
        {
            return await _baseService.UpdateRecord(entity);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(21/10/2022)
        /// Function: base lấy dữ liệu theo id truyền vào
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost("GetDataByIds")]
        public async Task<ReponsitoryModel> GetDataByIds(List<Guid> ids)
        {
            return await _baseService.GetDataByIds(ids);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(07/12/2022)
        /// Function: Xử lý base phân trang
        /// </summary>
        /// <param name="listFilter">danh sách lọc</param>
        /// <param name="currentPageNumber">trang hiện tại</param>
        /// <param name="pageSize">số bản ghi/trang</param>
        /// <returns></returns>
        [HttpPost("Paging")]
        public async Task<ReponsitoryModel> Paging([FromBody] List<ModelFilter> listFilter,int currentPageNumber = 1, int pageSize = 10)
        {
            return await _baseService.PagingRecords(currentPageNumber, pageSize, listFilter);
        }

        #endregion
    }
}
