﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.AMIS.BL;
using MISA.AMIS.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication
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

        #endregion
    }
}
